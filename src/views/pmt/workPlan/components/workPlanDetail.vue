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
        <van-field
          readonly
          :label="this.$t('pmt.workPlanDetail.date')"
          :rules="[{ required: true }]"
          input-align="right"
          label-width="3.7rem"
          :colon="true"
          v-model="nowDate"
        />
        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.workPlanDetail.basicInfo") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-field
            required
            readonly
            :label="this.$t('pmt.workPlanDetail.name')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.UserName"
          />
          <van-field
            required
            readonly
            :label="this.$t('pmt.workPlanDetail.personnelType')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.PositionCode"
          />
          <van-field
            readonly
            :label="this.$t('pmt.workPlanDetail.province')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.ProvinceName"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.workPlanDetail.dealer')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.DealerName"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.workPlanDetail.shopName')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.ShopName"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.workPlanDetail.pstl')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="basicInfoForm.PSTLRealName"
          >
          </van-field>
        </div>

        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.workPlanDetail.detail") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-field
            readonly
            :label="this.$t('pmt.workPlanDetail.planPeriodForm')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.planPeriodForm"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.workPlanDetail.planPeriodTo')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.planPeriodTo"
          >
          </van-field>
          <van-row>
            <van-col span="24">
              <div>
                <table class="pmt-table">
                  <thead>
                    <tr>
                      <th>
                        <span>{{ this.$t("pmt.workPlanDetail.date") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanDetail.weekDay") }}</span>
                      </th>
                      <th>
                        <span>{{
                          this.$t("pmt.workPlanDetail.workingPlan")
                        }}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in this.formData.workPlanList"
                      :key="index"
                    >
                      <td>{{ item.date }}</td>
                      <td>{{ item.week }}</td>
                      <td>
                        <van-dropdown-menu class="top-dropdown">
                          <van-dropdown-item

                            :default:index="1"
                            v-model="item.Id"
                            :options="selectWorkPanListOption"
                            @change="onSelectWorkPanListChange(item)"
                          />
                        </van-dropdown-menu>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </van-col>
          </van-row>
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
      <van-popup v-model="showToDatePicker" position="bottom" round>
        <van-datetime-picker
          type="date"
          :formatter="formatter"
          @cancel="showToDatePicker = false"
          @confirm="onConfirm_ToDate"
          :minDate="minDate"
          :maxDate="maxDate"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>
    </van-form>

    <div class="tab-bar">
      <van-tabbar route>
        <van-button block type="info" @click="topBarClickLeft">{{
          this.$t("pmt.okButton")
        }}</van-button>
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
} from "@/api/attendant";
import UploadImgs from "@/components/UploadImgs";
import { getPmtSelectData } from "@/api/common";
import { postUserPermission, getUserinfoByToken } from "@/api/user";

import {
  getworkingplansettinglist,
  getuseridentityshop,
  insert,
  getworkingplandetail,
} from "@/api/worlPlan";

export default {
  name: "workPlanDetail",
  components: {
    TopBar,
    UploadImgs,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.workPlanDetail.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      // topBarRightHtml: '<i class="van-icon van-icon-search"></i>',
      topBarRightHtml: "",

      loading: false,
      finished: false,
      refreshing: false,

      showDatePicker: false,
      showToDatePicker: false,
      showTimePicker: false,
      showAbsentTimePicker: false,

      basicInfoForm: {
        UserName: "",
        PositionCode: "",
        ProvinceName: "",
        DealerName: "",
        ShopName: "",
        PSTLRealName: "",
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

      nowDate: "",
      formData: {
        new_effective_from: "",
        planPeriodForm: "",
        planPeriodTo: "",
        workPlanList: [],
      },
      selectWorkPanListOption: [],

      id: "",
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getLocationDate();

    this.getUserInfo();

    this.getFormData();
    this.getSelectData();
    
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
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        effectiveFrom: this.nowDate,
      };
      getworkingplansettinglist(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.forEach((element) => {
              var thiselement = {};
              thiselement.value = element.Id;
              thiselement.text = element.new_working_plan;

              this.selectWorkPanListOption.push(thiselement);
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
    onConfirm_Date(value) {
      //
      this.formData.planPeriodForm =
        value.getFullYear() +
        "-" +
        this.formatNumber(value.getMonth() + 1) +
        "-" +
        this.formatNumber(value.getDate());
      this.showDatePicker = false;
      if (
        this.formData.planPeriodTo != "" &&
        this.formData.planPeriodForm != ""
      ) {
        this.setWorkPlanListData();
      }
    },

    onConfirm_ToDate(value) {
      //
      this.formData.planPeriodTo =
        value.getFullYear() +
        "-" +
        this.formatNumber(value.getMonth() + 1) +
        "-" +
        this.formatNumber(value.getDate());
      this.showToDatePicker = false;

      if (
        this.formData.planPeriodTo != "" &&
        this.formData.planPeriodForm != ""
      ) {
        this.setWorkPlanListData();
      }
    },

    setWorkPlanListData() {
      var str1 = this.formData.planPeriodTo;
      var str2 = this.formData.planPeriodForm;
      var day1 = new Date(str1);
      var day2 = new Date(str2);
      console.log("day1:" + day1);
      console.log("day2:" + day2);
      console.log(day1 - day2);
      this.formData.workPlanList = [];
      if (day1 - day2 < 0) return false;
      var differDay = Math.abs(day1 - day2) / 1000 / 60 / 60 / 24;

      //   if (differDay < 0) return false;
      console.log(differDay);
      for (var i = 0; i <= differDay; i++) {
        var item = {
          fullDate: this.fullData(str2, i),
          date: this.addDate(str2, i),
          week: this.setWeek(str2, i),
          Id: "",
          name: "",
        };
        this.formData.workPlanList.push(item);
      }
    },
    fullData(time, day) {
      var timestamp = Date.parse(new Date(time));
      timestamp = timestamp / 1000;
      timestamp += 86400 * day; //加一天
      var newTime = new Date(timestamp * 1000);
      return (
        newTime.getFullYear() +
        "-" +
        this.formatNumber(newTime.getMonth() + 1) +
        "-" +
        this.formatNumber(newTime.getDate())
      );
    },
    addDate(time, day) {
      //加一天
      var timestamp = Date.parse(new Date(time));
      timestamp = timestamp / 1000;
      timestamp += 86400 * day; //加一天
      var newTime = new Date(timestamp * 1000);
      console.log(parseInt(newTime.getMonth() + 1) + "-" + newTime.getDate());
      return this.formatNumber(newTime.getMonth() + 1) + "-" + this.formatNumber(newTime.getDate());
    },
    setWeek(time, day) {
      var timestamp = Date.parse(new Date(time));
      timestamp = timestamp / 1000;
      timestamp += 86400 * day; //加一天
      var newTime = new Date(timestamp * 1000);
      var week = newTime.getDay();
      var str = "";
      switch (week) {
        case 0:
          str = this.$t("pmt.workPlanTable.sun");
          break;
        case 1:
          str = this.$t("pmt.workPlanTable.mon");
          break;
        case 2:
          str = this.$t("pmt.workPlanTable.tue");
          break;
        case 3:
          str = this.$t("pmt.workPlanTable.wed");
          break;
        case 4:
          str = this.$t("pmt.workPlanTable.thu");
          break;
        case 5:
          str = this.$t("pmt.workPlanTable.fri");
          break;
        case 6:
          str = this.$t("pmt.workPlanTable.sat");
          break;
      }
      return str;
    },

    getUserInfo() {
      // this.$toast.loading({ duration: 0 });
      this.$toast.loading({ duration: 0, forbidClick: true });
      getuseridentityshop()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            if (data != null) this.basicInfoForm = data;
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

      this.nowDate =
        nowDate.getFullYear() + "-" + this.formatNumber(nowDate.getMonth() + 1);
      console.log(this.nowDate);
      this.minDate = new Date(
        nowDateLocation.year,
        nowDateLocation.month,
        nowDateLocation.date + 7
      );
      this.maxDate = new Date(
        nowDateLocation.year,
        nowDateLocation.month,
        nowDateLocation.date + 14
      );
    },

    onSelectWorkPanListChange(value, item) {
      console.log(value);
      console.log(item);
    },

    getFormData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        id: this.id,
      };
      getworkingplandetail(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.formData.planPeriodForm = this.fullData(
              data.new_period_form,
              0
            );
            this.formData.planPeriodTo = this.fullData(data.new_period_to, 0);
            this.formData.new_effective_from = data.new_effective_from;

            data.Details.forEach((element) => {
              var item = {
                fullDate: element.new_date_day,
                date: this.addDate(element.new_date_day, 0),
                week: element.new_week_day,
                Id: element.new_workingplansettingId,
                name: element.new_workingplansetting_name,
              };
              this.formData.workPlanList.push(item);
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
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
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
