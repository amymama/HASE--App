<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
      @set_onClickRight="topBarClickRight"
    >
    </TopBar>

    <van-form @submit="
        () => {
          this.$throttle.throttle(onButton_Ok());
        }
      " class="applyAbsence-form">
      <div class="applyAbsence">
        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.applyOvertime.basicInfoTitle") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-field
            required
            readonly
            :label="this.$t('pmt.applyOvertime.basicInfoFormName')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.Name"
          />
          <van-field
            required
            :label="this.$t('pmt.applyOvertime.basicInfoFormPersonnelType')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.PersonnelType"
          />
          <van-field
            readonly
            :label="this.$t('pmt.applyOvertime.basicInfoFormArea')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.Region"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.applyOvertime.basicInfoFormProvince')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.Branch"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.applyOvertime.basicInfoFormDealer')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.Dealer"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.applyOvertime.basicInfoFormShopName')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.ShopName"
          >
          </van-field>
        </div>

        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.applyOvertime.detailInfoTitle") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-form
            ref="formData"
            alidate-first
            @submit="onButton_Ok"
            label-width="3.7rem"
          >
            <van-field
              required
              readonly
              :label="this.$t('pmt.applyOvertime.date')"
              input-align="right"
              label-width="3.7rem"
              @click="showDatePicker = true"
              :colon="true"
              :rules="[
                {
                  required: true,
                  message: this.$t(
                    'pmt.applyAbsence.detailInfoFormDateMessage'
                  ),
                },
              ]"
              v-model="detailForm.selectDate"
            />

            <van-field
              required
              readonly
              :label="this.$t('pmt.applyOvertime.overTime')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              @click="showAbsentTimePicker = true"
              v-model="detailForm.AbsentTimeText"
              :rules="[
                {
                  required: true,
                  message: this.$t(
                    'pmt.applyAbsence.detailInfoFormAbsentTimeMessage'
                  ),
                },
              ]"
            >
            </van-field>
            <van-field
              required
              :label="this.$t('pmt.applyOvertime.overtimeReason')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              v-model="detailForm.AbsentReason"
              rows="2"
              autosize
              type="textarea"
              maxlength="200"
              show-word-limit
              :rules="[
                {
                  required: true,
                  message: this.$t(
                    'pmt.applyAbsence.detailInfoFormAbsentReasonMessage'
                  ),
                },
              ]"
            >
            </van-field>
          </van-form>
        </div>
      </div>

      <van-popup v-model="showDatePicker" position="bottom" round>
        <van-datetime-picker
          type="date"
          :formatter="formatter"
          @cancel="showDatePicker = false"
          @confirm="onConfirm_Date"
          :minDate="minDate"
          :maxDate="maxDate"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <van-popup v-model="showTimePicker" position="bottom" round>
        <van-datetime-picker
          type="time"
          :formatter="formatter"
          @cancel="showTimePicker = false"
          @confirm="onConfirm_Time"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <van-popup v-model="showAbsentTimePicker" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="absentTimeSelectData"
          @cancel="showAbsentTimePicker = false"
          @confirm="onConfirm_AbsentTime"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <div class="tab-bar">
        <van-tabbar route>
          <van-button
            block
            native-type="submit"
            type="info"
            >{{ this.$t("pmt.applyOvertime.buttonApply") }}</van-button
          >
        </van-tabbar>
      </div>
    </van-form>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { getPmt, getTl, getMd, getMhModellist } from "@/api/myIncentive";
import {
  getLastCheckInfo,
  postApplyAbsence,
  getShopInfo,
  getovertimelist,
  applyovertime,
} from "@/api/attendant";
import UploadImgs from "@/components/UploadImgs";
import { getPmtSelectData } from "@/api/common";
import { postUserPermission, getUserinfoByToken } from "@/api/user";

export default {
  name: "applyOvertime",
  components: {
    TopBar,
    UploadImgs,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.applyOvertime.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      // topBarRightHtml: '<i class="van-icon van-icon-search"></i>',
      topBarRightHtml: "",

      loading: false,
      finished: false,
      refreshing: false,

      showDatePicker: false,
      showTimePicker: false,
      showAbsentTimePicker: false,

      basicInfoForm: {
        Name: "",
        PersonnelType: "",
        Region: "",
        Branch: "",
        Dealer: "",
        ShopName: "",
      },
      detailForm: {
        selectDate: "",
        selectTime: "",
        AbsentTimeId: 4,
        AbsentTimeText: 4,
        AbsentReason: "",
      },
      absentTimeSelectData: [],
      minDate: new Date(),
      maxDate: new Date(),
    };
  },
  created() {
    this.longitude = this.$route.query.lng;
    this.latitude = this.$route.query.lat;
    this.getSelectData();
    this.getUserInfo();
    this.getShopInfo();
    this.getLocationDate();
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickLeft() {
      this.$router.go(-1);
    },

    topBarClickRight() {
      console.log("click right");
    },

    getSelectData() {
      this.absentTimeSelectData = [];
      for (var i = 0; i <= 16; i++) {
        var optionItem = {};
        optionItem.Id = i * 0.5;
        optionItem.text = i * 0.5;
        this.absentTimeSelectData.push(optionItem);
      }
    },

    formatter(type, val) {
      return val;
    },

    onButton_Ok() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        OvertimeDate:
          this.detailForm.selectDate + " " + this.detailForm.selectTime,
        Overtime: this.detailForm.AbsentTimeId,
        OvertimeReason: this.detailForm.AbsentReason,
      };
      applyovertime(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.$router.go(-1);
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    onConfirm_Date(value) {
      //
      this.detailForm.selectDate =
        value.getFullYear() +
        "-" +
        (parseInt(value.getMonth()) + 1) +
        "-" +
        value.getDate();
      this.showDatePicker = false;
    },
    onConfirm_Time(value) {
      this.detailForm.selectTime = value;
      this.showTimePicker = false;
    },
    onConfirm_AbsentTime(value) {
      this.detailForm.AbsentTimeId = value.Id;
      this.detailForm.AbsentTimeText = value.text;
      this.showAbsentTimePicker = false;
    },

    getUserInfo() {
      // this.$toast.loading({ duration: 0 });
      this.$toast.loading({ duration: 0, forbidClick: true });
      getUserinfoByToken()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { user_position, user_info } = data.Items;

            this.basicInfoForm.Name = user_info.username;
            this.basicInfoForm.PersonnelType = user_position[0].position_code;

            this.position_code = user_position[0].position_code;
            this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    getShopInfo() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      let params = {
        longitude: this.longitude,
        latitude: this.latitude,
      };
      getShopInfo(params)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.basicInfoForm.Region = data[0].areaname;
            this.basicInfoForm.Branch = data[0].provincename;
            this.basicInfoForm.Dealer = data[0].dealer;
            this.basicInfoForm.ShopName = data[0].shopname;
            this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    getLocationDate() {
      // :min-date="minDate"
      let nowDate = new Date();
      let nowDateLocation = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth(),
        date: nowDate.getDate(),
      };
      this.minDate = new Date(
        nowDateLocation.year,
        nowDateLocation.month,
        nowDateLocation.date
      );
      this.maxDate = new Date(
        nowDateLocation.year,
        nowDateLocation.month,
        nowDateLocation.date + 7
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.applyAbsence-form {
  .applyAbsence {
    padding-bottom: 20%;
  }
  padding: 5px;
  background: #f5f5f5;
  .applyAbsence-form-group {
    margin: 12px;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
  }
  .applyAbsence-group__header {
    display: flex;
    align-items: center;
    padding: 0 24px;
    line-height: 64px;
    .applyAbsence-group__title {
      flex: 1;
      font-size: $font28;
      color: #2058ab;
    }
    .applyAbsence-group__value {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        font-size: $font24;
        color: #999;
        line-height: 64px;
      }
      i {
        font-size: 32px;
        line-height: 64px;
        color: #2058ab;
      }
    }
  }
}
</style>
<style>
.van-field__error-message {
  float: right;
}

.form-group {
  margin: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
</style>
