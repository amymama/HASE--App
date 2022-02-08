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
    <!-- <van-form @submit="onSubmit" class=""> -->

    <div class="infog-card form-group workPlan">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="this.$t('pmt.course.ListItemNoMore')"
          @load="onLoad"
        >
          <div
            class="currentItem form-group"
            v-for="(item, index) in detailList"
            :key="item.new_retailmodelId"
          >
            <van-card class="van-card" :centered="true">
              <template #title>
                <!-- <van-row> -->
                <!-- <van-col span="24"> -->
                <van-field
                  readonly
                  class="approval-item"
                  :colon="false"
                  label-width="auto"
                  input-align="right"
                  :label="item.new_barcode"
                />
                <!-- </van-col> -->
                <!-- <van-col span="24"> -->
                  <van-field
                    readonly
                    class="approval-item"
                    v-model="item.new_retail_code"
                    :colon="true"
                    label-width="auto"
                    input-align="right"
                    :label="$t('pmt.walletDetail.RetailCode')"
                  />
                <!-- </van-col>
                <van-col span="24"> -->
                  <van-field
                    readonly
                    class="approval-item"
                    v-model="item.new_model_incentive"
                    :colon="true"
                    label-width="auto"
                    input-align="right"
                    :label="$t('pmt.walletDetail.Incentive')"
                  />
                <!-- </van-col>
                <van-col span="24"> -->
                  <van-field
                    readonly
                    class="approval-item"
                    v-model="item.new_quantity"
                    :colon="true"
                    label-width="auto"
                    input-align="right"
                    :label="$t('pmt.retail.quantity')"
                  />
                <!-- </van-col>
                <van-col span="24"> -->
                  <van-field
                    readonly
                    class="approval-item"
                    v-model="item.new_model_name"
                    :colon="true"
                    label-width="auto"
                    input-align="right"
                    :label="$t('pmt.retail.model')"
                  />
                <!-- </van-col>
                <van-col span="24"> -->
                  <van-field
                    readonly
                    class="approval-item"
                    v-model="item.new_category_name"
                    :colon="true"
                    label-width="auto"
                    input-align="right"
                    :label="$t('pmt.incentiveDetail.listCategory')"
                  />
                <!-- </van-col>
                <van-col span="24"> -->
                  <van-field
                    readonly
                    class="approval-item"
                    v-model="item.new_approve_date"
                    :colon="true"
                    label-width="auto"
                    input-align="right"
                    :label="$t('pmt.walletDetail.ApprovedOn')"
                  />
                <!-- </van-col>
                <van-col span="24"> -->
                  <van-field
                    readonly
                    class="approval-item"
                    v-model="item.new_submit_type"
                    :colon="true"
                    label-width="auto"
                    input-align="right"
                    :label="$t('pmt.collaborationDetail.type')"
                  />
                <!-- </van-col> -->
                <!-- </van-col> -->
                <!-- </van-row> -->
              </template>
            </van-card>
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

import { getpsandspwalletbalancedetail } from "@/api/wallet";

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
  name: "walletDetail",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.walletDetail.topBarTitle"),
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
      detailList: [
        // {
        //   new_retailmodelId: "b56d8323-d650-ec11-82d2-82994da045ea",
        //   new_barcode: null,
        //   new_retail_code: "R-AEV-GTS007855-211129000001",
        //   new_model_incentive: 700,
        //   new_quantity: 2,
        //   new_withdrawal_status: 0,
        //   new_model_name: null,
        //   new_category_name: null,
        //   new_approve_date: "2021-11-29T08:00:00",
        //   new_submit_type: "Barcode Scan",
        // },
      ],
    };
  },
  created() {},
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickLeft() {
      this.$router.go(-1);
    },

    onClick(value) {
      switch (this.active) {
        case 0:
          this.loading = false;
          this.finished = false;
          this.page = 1;
          this.loading = false;
          this.finished = false;
          this.submitList = [];
          this.confirmedList = [];
          break;
        case 1:
          this.loading = false;
          this.finished = false;
          this.page = 1;
          this.loading = false;
          this.finished = false;
          this.submitList = [];
          this.confirmedList = [];
          break;
      }
    },

    onSearch() {
      this.loading = false;
      this.finished = false;
    },

    onRefresh() {
      this.page = 1;
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.detailList = [];
    },

    onLoad() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getpsandspwalletbalancedetail()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            if (success && data.length > 0) {
              this.detailList = [...this.detailList, ...data];
              this.page++;
              this.finished = data.length !== this.page_size;
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

    getValidate(form, to) {
      var formDate = new Date(form);
      var formDateStr = formDate.toDateString();

      var toDate = new Date(to);
      var toDateStr = toDate.toDateString();
      return (
        this.$t("pmt.course.ListItemValidate") +
        ": " +
        formDateStr +
        " - " +
        toDateStr
      );
    },

    topBarClickRight() {
      this.$router.push({
        name: "collaborationDetail",
        query: {},
      });
    },

    onClick_ListItem(Id, primarykey, type) {
      switch (type) {
        case "Retail":
          this.$router.push({
            name: "retailDetail",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
            },
          });
          break;
        case "SP Register":
          this.$router.push({
            name: "spRegister",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
            },
          });
          break;
        case "Absence":
          this.$router.push({
            name: "absence",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
            },
          });
          break;
        case "Overtime":
          this.$router.push({
            name: "overtimeList",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
              status: this.active + 1,
            },
          });
          break;
        case "Working Plan":
          this.$router.push({
            name: "workingPlanList",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
              status: this.active + 1,
            },
          });
          break;
        case "Complaint Order":
          this.$router.push({
            name: "complaint",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
            },
          });
          break;
      }
    },

    onConfirm_Shop(value) {
      //
      console.log(value);
      this.selectShopId = value.Id;
      this.selectShopName = value.text;
      this.showShopPicker = false;
    },
    onClick_SubmitCheck(data) {
      console.log(data);
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
</style>
<style>
/* .approval-item {
  font-size: 25px;
  font-weight: 400;

  padding: 0.1rem 0.4rem;
} */
</style>
