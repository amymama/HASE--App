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
                      v-for="(item, index) in formData.workPlanList"
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
                            @change="onSelectWorkPanListChange(item, index)"
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
import UploadImgs from "@/components/UploadImgs";

import {
  getworkingplansettinglist,
  getuseridentityshop,
  insert,
} from "@/api/worlPlan";

export default {
  name: "workPlanCreate",
  components: {
    TopBar,
    UploadImgs,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.createPlan.topBarTitle"),
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
    };
  },
  created() {
    this.setPlanPeriod();
    this.getLocationDate();
    this.getSelectData();
    this.getUserInfo();
    this.setWorkPlanListData();
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
              this.formData.new_effective_from = element.new_effective_from;
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

    onButton_Ok() {
      let isNull = false;
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        new_shop_id: this.basicInfoForm.ShopId,
        new_period_form: this.formData.planPeriodForm,
        new_period_to: this.formData.planPeriodTo,
        new_effective_from: this.formData.new_effective_from,
        Details: [],
      };

      this.formData.workPlanList.forEach((element) => {
        var item = {
          new_workingplansettingId: element.Id,
          new_date_day: element.fullDate,
          new_week_day: element.week,
          new_workingplansetting_name: element.name,
        };
        if (element.Id == "") {
          isNull = true;
          return false;
        }
        data.Details.push(item);
      });
      if (isNull) {
        this.$toast.fail(this.$t("pmt.workPlanDetail.workingPlanErrorMessage"));
        return false;
      }

      insert(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.$toast.success(res.message);
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
      this.formData.workPlanList = [];
      if (day1 - day2 < 0) return false;
      var differDay = Math.abs(day1 - day2) / 1000 / 60 / 60 / 24;

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
      return (
        this.formatNumber(newTime.getMonth() + 1) +
        "-" +
        this.formatNumber(newTime.getDate())
      );
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
      let nowDate = new Date();
      let nowDateLocation = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth(),
        date: nowDate.getDate(),
      };

      this.nowDate =
        nowDate.getFullYear() +
        "-" +
        this.formatNumber(nowDate.getMonth() + 1) +
        "-" +
        this.formatNumber(nowDate.getDate());
    },

    onSelectWorkPanListChange(item, index) {
      const id = item.Id,
        selectWorkPanListOption = this.selectWorkPanListOption;
      let arr = selectWorkPanListOption.filter((itm) => {
        return id === itm.value;
      });
      this.$set(this.formData.workPlanList[index], "name", arr[0].text);
    },

    setPlanPeriod() {
      let Stamp = new Date();
      let num = 7 - Stamp.getDay() + 1;
      Stamp.setDate(Stamp.getDate() + num);
      this.formData.planPeriodForm =
        Stamp.getFullYear() +
        "-" +
        this.formatNumber(Stamp.getMonth() + 1) +
        "-" +
        this.formatNumber(Stamp.getDate());
      this.formData.planPeriodTo = this.fullData(Stamp, 6);
      console.log("planPeriodForm=============" + this.formData.planPeriodForm);
      console.log("planPeriodTo=============" + this.formData.planPeriodTo);
    },

    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
  },
};
</script>

<style lang="scss" scoped>
.applyAbsence-form {
  .applyAbsence {
    padding-bottom: 80%;
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
