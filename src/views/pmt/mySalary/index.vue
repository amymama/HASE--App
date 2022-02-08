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
    <van-form @submit="onSubmit" class="incentive">
      <div class="incentive-body">
        <div class="form-group">
          <van-field
            v-model="selectDate"
            is-link
            readonly
            :label="this.$t('pmt.incentive.selectaDate')"
            @click="showDatePicker = true"
            input-align="right"
            label-width="120px"
            :colon="true"
          />
          <van-popup v-model="showDatePicker" position="bottom" round>
            <van-datetime-picker
              v-model="selectDate"
              type="year-month"
              :formatter="formatter"
              @cancel="showDatePicker = false"
              @confirm="onConfirm_Date"
              :minDate="minDate"
              :maxDate="maxDate"
              :confirm-button-text="this.$t('pmt.confirmButton')"
              :cancel-button-text="this.$t('pmt.cancelButton')"
            />
          </van-popup>
        </div>
        <div class="form-group">
          <p class="salary-title">
            {{ this.$t("pmt.mySalary.Timesheet") }}
          </p>
          <div class="work-day">
            <van-field
              v-model="formData.new_standard_wd"
              readonly
              :label="this.$t('pmt.mySalary.StandardWorkingDays')"
              input-align="right"
              label-width="auto"
              :colon="true"
            />
            <van-field
              v-model="formData.new_paid_days"
              readonly
              :label="this.$t('pmt.mySalary.PaidWorkingDays')"
              input-align="right"
              label-width="auto"
              :colon="true"
            />
          </div>
        </div>

        <div class="pmt-table salary-table">
          <table style="width: 100%">
            <thead>
              <tr>
                <th>
                  {{ this.$t("pmt.mySalary.Item") }}
                </th>
                <th>
                  {{ this.$t("pmt.mySalary.Scheme") }}
                </th>
                <th>
                  {{ this.$t("pmt.mySalary.Actual") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in formData.timesheetList" :key="index">
                <td :class="item.ItemClass">{{ item.Item }}</td>
                <td :class="item.SchemeClass">{{ item.Scheme }}</td>
                <td :class="item.ActualClass">
                  {{ item.Actual }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pmt-table salary-table">
          <table style="width: 100%">
            <thead>
              <tr>
                <th colspan="2">
                  {{ this.$t("pmt.mySalary.NoteDetail") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in formData.noteDetailList" :key="index">
                <td :class="item.ItemClass">{{ item.Item }}</td>
                <td :class="item.ActualClass">
                  {{ item.Actual }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </van-form>
    <div class="tab-bar">
      <van-tabbar route>
        <van-button block type="info" @click="onButton_Ok">{{
          this.$t("pmt.okButton")
        }}</van-button>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { mysalary } from "@/api/mySalary";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";
export default {
  name: "mySalary",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.mySalary.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      loading: false,
      finished: false,
      refreshing: false,

      showDatePicker: false,

      selectDate: "",
      minDate: new Date(),
      maxDate: new Date(),

      formData: {
        new_standard_wd: 0,
        new_paid_days: 0,
        timesheetList: [],
        noteDetailList: [],
      },
    };
  },
  created() {
    this.getList();

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

    getSelectData() {},
    onSubmit() {},
    onCancel() {
      this.$router.go(-1);
    },

    formatter(type, val) {
      return val;
    },
    AddUnit(value) {
      var unit = this.$t("pmt.unit");
      return unit + " " + value;
    },
    onConfirm_Date(value) {
         
      this.selectDate =
        value.getFullYear() + "-" + this.formatNumber(value.getMonth());
        console.log(value.getFullYear())
        console.log(this.formatNumber(value.getMonth()))

        console.log(this.selectDate)
      var params = {
        sales_year: value.getFullYear(),
        month: parseInt(this.formatNumber(value.getMonth())),
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      mysalary(params)
        .then((res) => {
          if (res.success) {
            // res.data = {
            //   new_salary_listid: "21d1f322-5552-ec11-82d5-b03bcdd9fc4c",

            //   month: "2021-12-01T08:00:00",

            //   region: "w,e,q",

            //   area: "a",

            //   province: "y,i,o",

            //   district: "j,k,l",

            //   channel: "b,c",

            //   sub_channel: "r,t,y",

            //   dealer: "e,f,g",

            //   shop: "b,c,e,q",

            //   user_code: null,

            //   full_number: null,

            //   user_name: null,

            //   personnel_type: 0,

            //   salary_region: 1,

            //   gener: 0,

            //   classfication: 0,

            //   birthday: "0001-01-01T00:00:00",

            //   long_time_service: null,

            //   entry_date: "0001-01-01T00:00:00",

            //   working_status: 0,

            //   leave_date: "0001-01-01T00:00:00",

            //   new_pit_scheme: 56,

            //   new_basic_salary_scheme: 15,

            //   new_meal_allowance_scheme: 2356,

            //   new_mobile_allowance_scheme: 126,

            //   new_petrol_allowance_scheme: 33,

            //   new_stationary_cost_scheme: 78,

            //   new_responsibility_allowance_scheme: 23,

            //   new_parking_fee_scheme: 12,

            //   new_standard_wd: 26,

            //   new_paid_days: 26,

            //   new_al_paid_after_resignation: 12,

            //   new_actual_basic_salary: 5000,

            //   new_actual_meal_allowance: 200,

            //   new_actual_mobile_allowance: 100,

            //   new_actual_petrol_allowance: 300,

            //   new_actual_stationary_cost: 200,

            //   new_actual_responsibility_allowance: 200,

            //   new_actual_parking_fee: 200,

            //   new_kpi_incentive: 45,

            //   new_hot_model_incentive: 376,

            //   new_irregular_incentive: 872,

            //   new_other_benefit: 67,

            //   new_business_expense_taxable: 34,

            //   new_business_expense_non_taxable: 22,

            //   new_addtional_income_tax: 112,

            //   new_addtional_income_non_tax: 100,

            //   new_encashment_al: 98,

            //   new_actual_overtime_hours: 1400,

            //   new_taxable_overtime: 44,

            //   new_non_taxable_overtime: 7,

            //   new_shui_paid_in_salary: 222,

            //   new_duplicated_shui: 34,

            //   new_adjustment_plus_reason: "test reason plus",

            //   new_total_gross_income: 52,

            //   new_total_taxable_income: 89,

            //   new_basic_salary_insurance: 14,

            //   new_employee_total_shui_105: 58,

            //   new_shui_adjustment_subtract: 90,

            //   new_personal_deduction: 78,

            //   new_number_of_dependant: 34,

            //   new_dependent_unit_deduction: 432,

            //   new_classification_deduction: 0,

            //   new_other_deduction_cost: 67,

            //   new_employee_total_deduction: 56,

            //   new_pit_base_income: 7,

            //   new_pit: 0.3,

            //   new_advance: 4,

            //   new_adjustment_subtract_reason: "test reason subtract",

            //   new_net_take_home: 77777,

            //   new_employer_total_shui_215: 83,

            //   new_employer_shui_adjustment: 79,

            //   new_trade_union_by_employer: 12,

            //   new_accident_insurance: 100,

            //   new_total_service_cost: 212,

            //   new_service_fee: 56,

            //   new_total_cost: 56226,
            // };
            if (res.data != null) {
              this.formData.new_standard_wd = res.data.new_standard_wd;
              this.formData.new_paid_days = res.data.new_paid_days;
              console.log(this.formData)
              this.buildTableData(res.data);
            }

            this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
            return;
          }
          if (res.data == "") {
            return;
          }
          var data = res.data;
          this.tlFormData = data;
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
      this.showDatePicker = false;
    },
    onLoad() {
      this.finished = true;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    getList() {
      this.finished = true;
    },
    onButton_Ok() {
      this.$router.go(-1);
    },
    getActual(value, percentage) {
      return (
        value + " ( " + (parseFloat(percentage) * 100).toFixed(0) + "%" + " )"
      );
    },
    getLocationDate() {
      // :min-date="minDate"
      let nowDate = new Date();
      let nowDateLocation = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() - 1,
      };
      this.minDate = new Date(nowDateLocation.year - 2, nowDateLocation.month);
      this.maxDate = new Date(nowDateLocation.year, nowDateLocation.month);
      this.onConfirm_Date(nowDate);
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
    buildTableData(data) {
      if (data == null) return false;
      this.formData.timesheetList = [];
      this.formData.noteDetailList = [];
      //   var item = {
      //     Item: "",
      //     ItemClass: "",
      //     Scheme: "",
      //     SchemeClass: "",
      //     Actual: "",
      //     ActualClass: "",
      //   };
      //   item.Item = this.$t("pmt.mySalary.Basicsalary");
      //   item.Scheme = data.new_basic_salary_scheme;
      //   item.Actual = data.new_actual_basic_salary;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.Basicsalary"),
        data.new_basic_salary_scheme,
        data.new_actual_basic_salary,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.Mealallowance");
      //   item.Scheme = data.new_meal_allowance_scheme;
      //   item.Actual = data.new_actual_meal_allowance;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.Mealallowance"),
        data.new_meal_allowance_scheme,
        data.new_actual_meal_allowance,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.Mobileallowance");
      //   item.Scheme = data.new_mobile_allowance_scheme;
      //   item.Actual = data.new_actual_mobile_allowance;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.Mobileallowance"),
        data.new_mobile_allowance_scheme,
        data.new_actual_mobile_allowance,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.PetroAllowance");
      //   item.Scheme = data.new_petrol_allowance_scheme;
      //   item.Actual = data.new_actual_petrol_allowance;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.PetroAllowance"),
        data.new_petrol_allowance_scheme,
        data.new_actual_petrol_allowance,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.Stationarycost");
      //   item.Scheme = data.new_stationary_cost_scheme;
      //   item.Actual = data.new_actual_stationary_cost;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.Stationarycost"),
        data.new_stationary_cost_scheme,
        data.new_actual_stationary_cost,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.Reponsibilityallowance");
      //   item.Scheme = data.new_responsibility_allowance_scheme;
      //   item.Actual = data.new_actual_responsibility_allowance;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.Reponsibilityallowance"),
        data.new_responsibility_allowance_scheme,
        data.new_actual_responsibility_allowance,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.Parkingfee");
      //   item.Scheme = data.new_parking_fee_scheme;
      //   item.Actual = data.new_actual_parking_fee;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.Parkingfee"),
        data.new_parking_fee_scheme,
        data.new_actual_parking_fee,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.Overtime");
      //   item.Scheme = "";
      //   item.Actual = data.new_actual_overtime_hours;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.Overtime"),
        "",
        data.new_overtime,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.KPIincentive");
      //   item.Scheme = "";
      //   item.Actual = data.new_kpi_incentive;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.KPIincentive"),
        "",
        data.new_kpi_incentive,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.BusinessExpense");
      //   item.Scheme = "";
      //   item.Actual = data.new_kpi_incentive;
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.BusinessExpense"),
        "",
        data.new_business_expense,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.Adjustment(+)");
      //   item.Scheme = "";
      //   item.Actual = "";
      //   item.ItemClass = "class-yellow";
      //   item.SchemeClass = "class-yellow";
      //   item.ActualClass = "class-yellow";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.Adjustment(+)"),
        "",
        data.new_adjustment_plus,
        "class-yellow",
        "class-yellow",
        "class-yellow"
      );

      //   item.Item = this.$t("pmt.mySalary.TotalIncome");
      //   item.Scheme = "";
      //   item.Actual = "";
      //   item.ItemClass = "class-bule";
      //   item.SchemeClass = "class-bule";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.TotalIncome"),
        "",
        data.new_total_income,
        "class-bule",
        "class-bule",
        "class-white"
      );

      //   item.Item = this.$t("pmt.mySalary.SIHIUI");
      //   item.Scheme = "";
      //   item.Actual = "";
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.SIHIUI"),
        "",
        data.new_si_hi_ui,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.PIT");
      //   item.Scheme = "";
      //   item.Actual = "";
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.PIT"),
        "",
        data.new_pit,
        "",
        "",
        ""
      );

      //   item.Item = this.$t("pmt.mySalary.Adjustment(-)");
      //   item.Scheme = "";
      //   item.Actual = "";
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.Adjustment(-)"),
        "",
        data.new_adjustment_subtract,
        "class-yellow",
        "class-yellow",
        "class-yellow"
      );

      //   item.Item = this.$t("pmt.mySalary.NETTAKEHOME");
      //   item.Scheme = "";
      //   item.Actual = "";
      //   item.ItemClass = "";
      //   item.SchemeClass = "";
      //   item.ActualClass = "";
      //   this.formData.timesheetList.push(item);
      this.buildTimesheetListItem(
        this.$t("pmt.mySalary.NETTAKEHOME"),
        "",
        data.new_net_take_home,
        "class-bule",
        "class-bule",
        "class-white"
      );

      this.buildNoteDetailListItem(
        this.$t("pmt.mySalary.Adjustment(+)"),
        "",
        data.new_adjustment_plus_reason,
        "class-yellow",
        "class-yellow",
        "class-yellow"
      );
      this.buildNoteDetailListItem(
        this.$t("pmt.mySalary.IrregularIncentive"),
        "",
        data.new_irregular_incentive,
        "",
        "",
        ""
      );
      this.buildNoteDetailListItem(
        this.$t("pmt.mySalary.OtherBenefit"),
        "",
        data.new_other_benefit,
        "",
        "",
        ""
      );
      this.buildNoteDetailListItem(
        this.$t("pmt.mySalary.Addtionalincome"),
        "",
        data.new_addtional_income,
        "",
        "",
        ""
      );
      this.buildNoteDetailListItem(
        this.$t("pmt.mySalary.OtherSIHIUI"),
        "",
        data.new_other_shui_plus,
        "",
        "",
        ""
      );
      this.buildNoteDetailListItem(
        this.$t("pmt.mySalary.EncashmentAL"),
        "",
        data.new_encashment_al,
        "",
        "",
        ""
      );
      this.buildNoteDetailListItem(
        this.$t("pmt.mySalary.Adjustment(-)"),
        "",
        data.new_adjustment_subtract_reason,
        "class-yellow",
        "class-yellow",
        "class-yellow"
      );
      this.buildNoteDetailListItem(
        this.$t("pmt.mySalary.EmployeeTotalDeduction"),
        "",
        data.new_employee_total_deduction,
        "",
        "",
        ""
      );
      this.buildNoteDetailListItem(
        this.$t("pmt.mySalary.Advance"),
        "",
        data.new_advance,
        "",
        "",
        ""
      );
    },
    buildTimesheetListItem(
      Item,
      Scheme,
      Actual,
      ItemClass,
      SchemeClass,
      ActualClass
    ) {
      let item = {
        Item: "",
        ItemClass: "",
        Scheme: "",
        SchemeClass: "",
        Actual: "",
        ActualClass: "",
      };
      item.Item = Item;
      item.Scheme = Scheme;
      item.Actual = Actual;
      item.ItemClass = ItemClass;
      item.SchemeClass = SchemeClass;
      item.ActualClass = ActualClass;
      this.formData.timesheetList.push(item);
    },

    buildNoteDetailListItem(
      Item,
      Scheme,
      Actual,
      ItemClass,
      SchemeClass,
      ActualClass
    ) {
      let item = {
        Item: "",
        ItemClass: "",
        Scheme: "",
        SchemeClass: "",
        Actual: "",
        ActualClass: "",
      };
      item.Item = Item;
      item.Scheme = Scheme;
      item.Actual = Actual;
      item.ItemClass = ItemClass;
      item.SchemeClass = SchemeClass;
      item.ActualClass = ActualClass;
      this.formData.noteDetailList.push(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.incentive {
  padding: 5px;
  // background-color: #fff;
  .incentive-body {
    padding-bottom: 20%;
    .salary-table {
      margin-top: 0.5rem;
      tr {
        .class-yellow {
          background-color: #ffffe0;
        }
        .class-bule {
          background-color: #1e90ff;
          color: #ffffff;
          font-size: 26px;
          font-weight: 600;
        }
        .class-white {
          font-size: 26px;
          font-weight: 600;
        }
      }
    }
  }
  .salary-title {
    padding-top: 0.2rem;
    padding-left: 0.3rem;
    font-size: 35px;
    font-weight: 400;
  }
  .work-day {
    padding-top: 0rem;
    padding-left: 0.8rem;
  }
  .actual-Incentive {
    color: red;
    .van-cell__title {
      color: red;
    }
    span {
      color: red;
    }
  }
}
</style>
<style>
.van-field__error-message {
  float: right;
}

.card-lable {
  color: #fff;
}

.actual-Incentive {
  color: red;
}

.serial-number {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: inline-block;
  text-align: center;
  line-height: 0.64rem;
  background: #fff;
  font-size: 0.32rem;
  font-weight: bold;
  top: 0.16rem;
  left: 0.16rem;
  border: 1px solid #000;
}

.list-head {
  background: #2058ab;
  color: #fff;
  text-align: center;
  padding: 10px;
  /* border: 0.1px solid #000; */
  height: 50px;
  text-align: center;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
}

.list-bodyHear {
  /* background: #2058ab; */
  /* color: #fff; */
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  border: 0.1px solid #000;
}

.list-body {
  /* background: #2058ab; */
  /* color: #fff; */
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  text-align: center;
  /* display: -webkit-flex; */
  align-items: center;
  justify-content: center;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  /* border: 0.1px solid #000; */
  /* padding-top: 20px; */
}

.body-row {
  padding: 5px;
}

.form-group {
  margin: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
</style>