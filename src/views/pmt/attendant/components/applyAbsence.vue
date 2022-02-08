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

    <van-form class="applyAbsence-form">
      <div class="applyAbsence">
        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.applyAbsence.basicInfoTitle") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-field
            required
            readonly
            :label="this.$t('pmt.applyAbsence.basicInfoFormName')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.Name"
          />
          <van-field
            required
            :label="this.$t('pmt.applyAbsence.basicInfoFormPersonnelType')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.PersonnelType"
          />
          <van-field
            readonly
            :label="this.$t('pmt.applyAbsence.basicInfoFormRegion')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.Region"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.applyAbsence.basicInfoFormBranch')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.Branch"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.applyAbsence.basicInfoFormDealer')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.Dealer"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.applyAbsence.basicInfoFormShopName')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.ShopName"
          >
          </van-field>
        </div>

        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.applyAbsence.detailInfoTitle") }}
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
              :label="this.$t('pmt.applyAbsence.detailInfoFormDate')"
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
              :label="this.$t('pmt.applyAbsence.detailInfoFormLeavefrom')"
              :rules="[
                {
                  required: true,
                  message: this.$t(
                    'pmt.applyAbsence.detailInfoFormLeavefromMessage'
                  ),
                },
              ]"
              input-align="right"
              label-width="3.7rem"
              @click="showTimePicker = true"
              :colon="true"
              v-model="detailForm.selectTime"
            >
            </van-field>
            <van-field
              required
              readonly
              :label="this.$t('pmt.applyAbsence.detailInfoFormAbsentTime')"
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
              readonly
              :label="this.$t('pmt.applyAbsence.detailInfoFormAbsentReason')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              @click="showAbsentReasonPicker = true"
              v-model="detailForm.WorkingPlanSettingName"
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

      <van-popup v-model="showAbsentReasonPicker" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="absentReasonSelectData"
          @cancel="showAbsentReasonPicker = false"
          @confirm="onConfirm_AbsentReason"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>
    </van-form>

    <van-popup v-model="showInstruction">
      <div class="block">
        <TopBar
          :topBarTitle="this.$t('pmt.applyAbsence.Instruction')"
          :leftHtml="''"
          :rightHtml="''"
        ></TopBar>
        <div class="pmt-table">
          <table style="width: 100%">
            <thead>
              <tr>
                <th>
                  {{ this.$t("pmt.applyAbsence.ITEM") }}
                </th>
                <th>
                  {{ this.$t("pmt.applyAbsence.Description") }}
                </th>
                <th>
                  {{ this.$t("pmt.applyAbsence.Paid") }}
                </th>
                <th>
                  {{ this.$t("pmt.applyAbsence.Note") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.PH") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.Governmentpolicies") }}</td>
                <td>{{ 1 }}</td>
                <td>{{ this.$t("pmt.applyAbsence.PHNote") }}</td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.UL") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.Unpaidleave") }}</td>
                <td>{{ 0 }}</td>
                <td></td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.AL") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.Annualleave") }}</td>
                <td>{{ 1 }}</td>
                <td>{{ this.$t("pmt.applyAbsence.ALNote") }}</td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.OFF") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.OFFDescription") }}</td>
                <td>{{ 0 }}</td>
                <td></td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.O") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.ODescription") }}</td>
                <td>{{ 0 }}</td>
                <td></td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.P") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.PDescription") }}</td>
                <td>{{ 1 }}</td>
                <td>{{ this.$t("pmt.applyAbsence.PNOTE") }}</td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.S/2") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.S/2Description") }}</td>
                <td>{{ 0.5 }}</td>
                <td></td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.AL/2") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.AL/2Description") }}</td>
                <td>{{ 1 }}</td>
                <td></td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.TNLD") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.TNLDDescription") }}</td>
                <td>{{ 0 }}</td>
                <td>{{ this.$t("pmt.applyAbsence.TNLDNote") }}</td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.applyAbsence.OFF[C]") }}</td>
                <td>{{ this.$t("pmt.applyAbsence.OFF[C]Description") }}</td>
                <td>{{ 0 }}</td>
                <td>{{ this.$t("pmt.applyAbsence.OFF[C]NOTE") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </van-popup>

    <div class="tab-bar">
      <van-tabbar route>
        <van-button
          block
          type="info"
          @click="
            () => {
              this.$throttle.throttle(onButton_Ok());
            }
          "
          >{{ this.$t("pmt.submitButton") }}</van-button
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { getPmt, getTl, getMd, getMhModellist } from "@/api/myIncentive";
import {
  getLastCheckInfo,
  postApplyAbsence,
  getShopInfo,
  getworkingplansettinglist,
} from "@/api/attendant";
import UploadImgs from "@/components/UploadImgs";
import { getPmtSelectData } from "@/api/common";
import { postUserPermission, getUserinfoByToken } from "@/api/user";

export default {
  name: "applyAbsence",
  components: {
    TopBar,
    UploadImgs,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.applyAbsence.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      // topBarRightHtml: '<i class="van-icon van-icon-search"></i>',
      topBarRightHtml: '<i class="van-icon van-icon-info-o"><!----></i>',

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
        WorkingPlanSettingName: "",
        WorkingPlanSettingId: "",
      },
      absentTimeSelectData: [],
      minDate: new Date(),
      maxDate: new Date(),

      showAbsentReasonPicker: false,
      absentReasonSelectData: [],

      showInstruction: false,
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
      this.showInstruction = true;
    },

    getSelectData() {
      this.absentTimeSelectData = [];
      for (var i = 0; i < 9; i++) {
        var optionItem = {};
        optionItem.Id = i * 0.5 + 4;
        optionItem.text = i * 0.5 + 4;
        this.absentTimeSelectData.push(optionItem);
      }

      this.$toast.loading({ duration: 0, forbidClick: true });
      getworkingplansettinglist()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            // this.$router.go(-1);
            data.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.Id = element.Id;
              thiselement.text = element.new_working_plan;
              this.absentReasonSelectData.push(thiselement);
            });
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

    formatter(type, val) {
      return val;
    },

    onButton_Ok() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        LeaveTime:
          this.detailForm.selectDate + " " + this.detailForm.selectTime,
        AbsentTime: this.detailForm.AbsentTimeId,
        // AbsentReason: this.detailForm.AbsentReason,
        WorkingPlanSettingId: this.detailForm.WorkingPlanSettingId,
        WorkingPlanSettingName: this.detailForm.WorkingPlanSettingName,
      };
      postApplyAbsence(data)
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
      console.log(value);
      this.detailForm.selectDate =
        value.getFullYear() +
        "-" +
        (parseInt(value.getMonth()) + 1) +
        "-" +
        value.getDate();

      if (value.getTime() > this.maxDate.getTime()) {
        this.selectDate = this.maxDate.getFullYear() + "-01";
        value = new Date(this.maxDate.getFullYear(), 0, 1);
      }
      this.showDatePicker = false;
    },
    onConfirm_Time(value) {
      this.detailForm.selectTime = value;
      this.showTimePicker = false;
    },
    onConfirm_AbsentTime(value) {
      console.log(value);
      this.detailForm.AbsentTimeId = value.Id;
      this.detailForm.AbsentTimeText = value.text;
      this.showAbsentTimePicker = false;
    },

    onConfirm_AbsentReason(value) {
      this.detailForm.WorkingPlanSettingId = value.Id;
      this.detailForm.WorkingPlanSettingName = value.text;
      this.showAbsentReasonPicker = false;
    },

    getUserInfo() {
      // this.$toast.loading({ duration: 0 });
      this.$toast.loading({ duration: 0, forbidClick: true });
      getUserinfoByToken()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { user_position, user_info } = data.Items;

            this.basicInfoForm.Name = user_info.realname;
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
.block {
  width: 8rem;
  .text {
    height: 130px;
    text-align: center;
    margin: 20px 20px;
    .text-item {
      text-align: left;
    }
  }
  .button {
    text-align: center;
    .button-login {
      width: 100%;
    }
  }
  .AccountType {
    padding: 0.5rem;
    // margin: 0.5rem;
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
