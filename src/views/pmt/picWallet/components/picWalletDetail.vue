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
            :key="index"
          >
            <van-row>
              <van-col span="12">
                <van-field
                  readonly
                  :colon="true"
                  label-width="auto"
                  input-align="left"
                  :label="$t('pmt.picWalletDetail.SalesYear')"
                  v-model="item.sales_year"
                />
              </van-col>
              <van-col span="12">
                <van-field
                  readonly
                  :colon="true"
                  label-width="auto"
                  input-align="left"
                  :label="$t('pmt.picWalletDetail.Month')"
                  v-model="item.month"
                />
              </van-col>
            </van-row>
            <van-row style="text-align: center" type="flex" justify="center">
              <van-col span="12" class="list-head">
                <!-- <van-cell center :title="this.$t('pmt.incentive.mdListType')" /> -->
                <span>{{ $t("pmt.picWalletDetail.ShopCode") }}</span>
              </van-col>
              <van-col span="12" class="list-head">
                <span>{{ $t("pmt.picWalletDetail.ShopName") }}</span>
              </van-col>
            </van-row>
            <div class="item" v-for="(data, id) in item.shop" :key="id">
              <!-- ITEM BEGIN -->
              <van-row type="flex" justify="center">
                <van-col span="12" class="list-body">
                  <span>{{ data.shop_code }}</span>
                </van-col>
                <van-col span="12" class="list-body">
                  <span>{{ data.shop_name }}</span>
                </van-col>
              </van-row>
              <!-- ITEM END -->
            </div>
            <van-row>
              <van-col span="24">
                <van-field
                  readonly
                  :colon="true"
                  label-width="auto"
                  input-align="left"
                  :label="$t('pmt.picWalletDetail.BarcodeCollectionTarget')"
                  v-model="item.sales_year"
                />
              </van-col>
            </van-row>
            <van-row style="text-align: center" type="flex" justify="center">
              <van-col span="12" class="list-head">
                <!-- <van-cell center :title="this.$t('pmt.incentive.mdListType')" /> -->
                <span>{{ $t("pmt.picWalletDetail.Achievement%") }}</span>
              </van-col>
              <van-col span="12" class="list-head">
                <span>{{
                  $t("pmt.picWalletDetail.Incentive") +
                  "(" +
                  $t("pmt.unit") +
                  ")"
                }}</span>
              </van-col>
            </van-row>
            <div
              class="item"
              v-for="(data2, ind) in item.incentiveslab"
              :key="ind"
            >
              <!-- ITEM BEGIN -->
              <van-row type="flex" justify="center">
                <van-col span="12" class="list-body">
                  <span>{{ data2.achievement }}</span>
                </van-col>
                <van-col span="12" class="list-body">
                  <span>{{ data2.incentive }}</span>
                </van-col>
              </van-row>
              <!-- ITEM END -->
            </div>
            <van-row>
              <van-col span="24">
                <van-field
                  readonly
                  :colon="true"
                  label-width="auto"
                  input-align="left"
                  :label="$t('pmt.picWalletDetail.ActualQuantity')"
                >
                  <template #input>
                    <span
                      class=""
                      v-text="formatter(item.actual_quantity, item.actual_ach)"
                    ></span>
                  </template>
                </van-field>
              </van-col>
              <van-col span="24">
                <van-field
                  readonly
                  :colon="true"
                  label-width="auto"
                  input-align="left"
                  :label="$t('pmt.picWalletDetail.ActualIncentive')"
                >
                  <template #input>
                    <span
                      class="actual_incentive"
                      v-text="item.actual_incentive"
                    ></span>
                  </template>
                </van-field>
              </van-col>
            </van-row>
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

import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

import { getshoppicwalletbalancedetail } from "@/api/picWallet";

import { Toast } from "vant";
export default {
  name: "picWalletDetail",
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
      isLoading: false,

      page: 1,
      page_size: 1000,

      showShopPicker: false,
      selectShopName: "",
      shopSelectData: [],
      selectShopId: 0,

      isSelectAllItem: [],
      detailList: [],
      // detailList: [
      //   {
      //     sales_year: "2021",
      //     month: "11",
      //     barcode_collection_target: 100,
      //     shop: [
      //       {
      //         shop_name: "shop1",
      //         shop_code: "001",
      //       },
      //       {
      //         shop_name: "shop2",
      //         shop_code: "002",
      //       },
      //       {
      //         shop_name: "shop3",
      //         shop_code: "003",
      //       },
      //     ],
      //     incentiveslab: [
      //       {
      //         achievement: "<0%",
      //         incentive: "0",
      //       },
      //       {
      //         achievement: "<0%",
      //         incentive: "0",
      //       },
      //       {
      //         achievement: ">=0%",
      //         incentive: "0+Additional% * 0",
      //       },
      //     ],
      //     actual_quantity: 2,
      //     actual_ach: 54,
      //     actual_incentive: 600,
      //   },
      // ],
    };
  },
  created() {
    this.onClick(1);
  },
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
          this.detailList = [];
          break;
        case 1:
          this.loading = false;
          this.finished = false;
          this.page = 1;
          this.loading = false;
          this.finished = false;
          this.submitList = [];
          this.confirmedList = [];
          this.detailList = [];
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
      getshoppicwalletbalancedetail()
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
    formatter(qut, ach) {
      var str = "";
      str = qut + " (" + ach + "%)";
      return str;
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
.actual_incentive {
  color: red;
}

.list-head {
  background: #4d72ac;
  color: #fff;
  text-align: center;
  padding: 5px;
  border: 0.1px solid #000;
  // height: 80px;
}
.list-head-total {
  background: #4d72ac;
  color: #fff;
  text-align: center;
  padding: 10px;
  border: 0.1px solid #000;
  // height: 80px;
}

.list-body {
  /* background: #2058ab; */
  /* color: #fff; */
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  border: 0.1px solid #000;
  /* padding-top: 20px; */
}

.list-bodyHear {
  /* background: #2058ab; */
  /* color: #fff; */
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  border: 0.1px solid #000;
}
</style>
<style>
/* .approval-item {
  font-size: 25px;
  font-weight: 400;

  padding: 0.1rem 0.4rem;
} */
</style>
