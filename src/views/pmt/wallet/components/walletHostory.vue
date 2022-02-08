<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    >
    </TopBar>
    <!-- <van-form @submit="onSubmit" class=""> -->
    <div class="form-group">
      <van-field
        readonly
        :label="this.$t('pmt.walletHostory.DateFrom')"
        input-align="right"
        label-width="3.7rem"
        :colon="true"
        v-model="formData.period_begin"
        @click="showDatePicker = true"
      >
      </van-field>
      <van-field
        readonly
        :label="this.$t('pmt.walletHostory.DateTo')"
        input-align="right"
        label-width="3.7rem"
        :colon="true"
        v-model="formData.period_end"
        @click="showToDatePicker = true"
      >
      </van-field>
    </div>
    <van-popup v-model="showDatePicker" position="bottom" round>
      <van-datetime-picker
        type="date"
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
        @cancel="showToDatePicker = false"
        @confirm="onConfirm_ToDate"
        :minDate="minDate"
        :maxDate="maxDate"
        :confirm-button-text="this.$t('pmt.confirmButton')"
        :cancel-button-text="this.$t('pmt.cancelButton')"
      />
    </van-popup>
    <div class="form-group walletHostory">
      <div class="walletHostory-top">
        <p class="Balance">
          {{ this.$t("pmt.unit") + " " + this.income }}
        </p>
        <p class="Balance">{{ this.$t("pmt.walletHostory.Income") }}</p>
      </div>
    </div>
    <div class="form-group">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="this.$t('pmt.course.ListItemNoMore')"
          @load="onLoad"
        >
          <div class="pmt-table">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th colspan="3">
                    {{ this.$t("pmt.wallet.buttonWithdrawal") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in walletHostoryList" :key="index">
                  <td>{{ fullData(item.new_withdrawal_date, 0) }}</td>
                  <td>{{ item.new_withdrawal_status }}</td>
                  <td>
                    {{ item.new_withdrawal_amount + " " + $t("pmt.unit") }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
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
import {
  postCourseList,
  getElearningCourse,
  postElearningCourseFavorite,
  getCourseClicked,
} from "@/api/eLearning";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

import {
  getpsandspwalletbalancedetail,
  incentivewithdrawaldetailpage,
} from "@/api/wallet";

import {
  getapprovelist,
  batchrejectflow,
  batchapproveflow,
} from "@/api/approve";

// import listItemIcon from '@assets/images/pmt/elearning/course_home_icon@3x.png'
// // import backgroundImage from '@assets/images/elearning/test_bg@3x.png'
// import icon_visitStatistics from "@/assets/images/pmt/icon/visitStatistics.png";

import { Toast } from "vant";
export default {
  name: "walletHostory",
  components: {
    TopBar,
    ChangeLang,
  },
  computed: {
    walletHostoryTotal() {
      let arr = this.walletHostoryList;
      let srr = [];
      arr.forEach((item) => {
        // srr.push(parseInt(item.new_unit_price));//Math.floor(Math.random() * length);
        srr.push(Math.floor(parseInt(item.new_withdrawal_amount)));
        // }
      });
      let sum = srr.reduce(function (a, b) {
        return parseInt(a) + parseInt(b);
      }, 0);
      return sum;
    },
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.wallet.buttonWithdrawal"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      active: 0,
      seaarch_Data: "",
      count: 0,

      loading: false,
      finished: false,
      isLoading: true,

      page: 1,
      page_size: 1000,

      showShopPicker: false,
      selectShopName: "",
      shopSelectData: [],
      selectShopId: 0,

      isSelectAllItem: [],
      detailList: [],

      showDatePicker: false,
      showToDatePicker: false,
      formData: {
        period_begin: "",
        period_end: "",
      },
      walletHostoryList: [],
      minDate: new Date(),
      maxDate: new Date(),
      income:0
    };
  },
  created() {
    this.setDate();
    this.setPlanPeriod();
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickLeft() {
      this.$router.go(-1);
    },

    onSearch() {
      this.loading = false;
      this.finished = false;
    },

    onRefresh() {
      this.isLoading = true;
      this.page = 1;
      this.loading = false;
      this.finished = false;
      this.walletHostoryList = [];
    },

    onLoad() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        period_begin: this.formData.period_begin, //开始时间，可为空
        period_end: this.formData.period_end, //结束时间，可为空
        orderby: "",
        desc: true,
        mock: false,
        page: this.page, //分页页码，数字类型
        itemsperpage: this.page_size,
      };
      incentivewithdrawaldetailpage(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            if (success && data && data.Items.length > 0) {
              this.income = data.Context
              this.walletHostoryList = [
                ...this.walletHostoryList,
                ...data.Items,
              ];
              this.page++;
              this.finished = data.Items.length !== this.page_size;
              console.log(this.finished);
            } else {
              this.finished = true;
            }
            this.isLoading = !this.finished;
            this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((error) => {
          this.$toast.fail(error.message);
        })
        .finally(() => {});
      // this.finished = true;
    },

    onConfirm_Date(value) {
      //
      this.formData.period_begin =
        value.getFullYear() +
        "-" +
        this.formatNumber(value.getMonth() + 1) +
        "-" +
        this.formatNumber(value.getDate());
      this.showDatePicker = false;
      this.onRefresh();
    },

    onConfirm_ToDate(value) {
      this.formData.period_end =
        value.getFullYear() +
        "-" +
        this.formatNumber(value.getMonth() + 1) +
        "-" +
        this.formatNumber(value.getDate());
      this.showToDatePicker = false;

      this.onRefresh();
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },

    setPlanPeriod() {
      var nowdays = new Date();
      var year = nowdays.getFullYear();
      var month = nowdays.getMonth();
      if (month == 0) {
        month = 12;
        year = year - 1;
      }
      if (month < 10) {
        month = "0" + month;
      }

      var myDate = new Date(year, month, 0);

      this.formData.period_begin =
        year + "-" + this.formatNumber(month) + "-01"; //上个月第一天
      this.formData.period_end =
        year +
        "-" +
        this.formatNumber(month) +
        "-" +
        this.formatNumber(myDate.getDate()); //上个月最后一天
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

    setDate() {
      let nowDate = new Date();
      let nowDateLocation = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth(),
        date: nowDate.getDate(),
      };
      this.minDate = new Date(
        nowDateLocation.year - 2,
        nowDateLocation.month,
        nowDateLocation.date
      );
      this.maxDate = new Date();
      this.onConfirm_Date(nowDate);
    },
  },
};
</script>

<style lang="scss" scoped>
.currentItem {
  .check {
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
  .van-card {
    padding: 0px;
    // background-color: white;
    // background: no-repeat center/100%
    //   url("../../../../assets/images/pmt/e-learning/test_bg.png");
    .van-card__thumb {
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      width: 1.56667rem;
      height: 1.56667rem;
      margin: 0.33333rem;
      margin-right: 0.53333rem;
    }
    .approval-item {
      .van-cell__title {
        font-size: 25px;
        font-weight: 400;
      }
      padding: 0.1rem 0.4rem;
    }
  }
  .van-card__title {
    font-weight: bold;
    color: white;
  }
  .van-card__desc {
    white-space: break-spaces;
    max-height: 100px;
    color: white;
  }

  // white-space: break-spaces;
}
.workPlan {
  padding-bottom: 20%;
  margin: 0.26667 rem;
  border-radius: 0.16 rem;
  overflow: hidden;
  background: #f5f5f5;
}
.walletHostory {
  margin-top: 0.2rem;
  .walletHostory-top {
    text-align: center;
    background-color: white;
    padding: 0.2rem;
    .Balance {
      font-size: 25px;
      font-weight: 600;
    }
  }
  .Notice {
    padding-left: 0.4rem;
    padding-top: 0.2rem;
    font-size: 30px;
    font-weight: 400;
  }
  .message {
    padding: 0.2rem 0.4rem;
    .message-title {
      font-size: 25px;
      font-weight: 400;
    }
    .message-key {
      color: red;
    }
  }
}
</style>
<style>
/* .approval-item {
  font-size: 25px;
  font-weight: 400;

  padding: 0.1rem 0.4rem;
} */
</style>
