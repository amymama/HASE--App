<template>
  <div class="page">
    <!-- <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
    >
    </TopBar> -->

    <div class="pmt-body">
      <van-row class="top-row top-content">
        <van-col span="24">
          <van-dropdown-menu class="top-dropdown">
            <van-dropdown-item
              :default:index="1"
              v-model="selectShopId"
              :options="selectShopOption"
              @change="onSelectShopChange"
            />
          </van-dropdown-menu>
        </van-col>
      </van-row>
      <van-row class="top-row top-content">
        <van-col span="5" class="top-header">
          <span>{{ this.$t("pmt.topContentSell") }}</span>
        </van-col>
        <van-col span="19">
          <P class="top-title"
            >{{ this.$t("pmt.topContentToday") }} {{ this.$t("pmt.unit") }}
            {{ sellOutToday }}</P
          >
          <P class="top-title"
            >{{ this.$t("pmt.topContentYesterday") }} {{ this.$t("pmt.unit") }}
            {{ sellOutYesterday }}</P
          >
          <P class="top-title"
            >{{ this.$t("pmt.topContentMonth") }} {{ this.$t("pmt.unit") }}
            {{ sellOutMonth }}</P
          >
        </van-col>
      </van-row>
      <div class="form-group">
        <PmtGridMemu
          :memuGridDataSource="memuGridDataSource"
          :columnNumber="columnNumber"
        >
        </PmtGridMemu>
      </div>
    </div>

    <tab-bar />
  </div>
</template>
<script>
import TabBar from "@/components/TabBar";
import TopBar from "@/components/TopBar";
import PmtGridMemu from "./components/PmtGridMemu";
import ChangeLang from "@/components/ChangeLang";

import { getPmtSellOut } from "@/api/pmtHomePage";
import { postUserPermission, getUserinfoByToken } from "@/api/user";

import icon_attendant from "@/assets/images/pmt/icon/attendant.png";
import icon_competitorSales from "@/assets/images/pmt/icon/competitorSales.png";
// import icon_complaint from "@/assets/images/pmt/icon/complaint.png";
import icon_eLearning from "@/assets/images/pmt/icon/eLearning.png";
import icon_giftRegistration from "@/assets/images/pmt/icon/giftRegistration.png";
import icon_guestSurvey from "@/assets/images/pmt/icon/guestSurvey.png";
import icon_incentive from "@/assets/images/pmt/icon/incentive.png";
import icon_invoiceSubmit from "@/assets/images/pmt/icon/invoiceSubmit.png";
import icon_manual from "@/assets/images/pmt/icon/manual.png";
import icon_myRetail from "@/assets/images/pmt/icon/myRetail.png";
import icon_policyScheme from "@/assets/images/pmt/icon/policyScheme.png";
import icon_salesForecast from "@/assets/images/pmt/icon/salesForecast.png";
import icon_stockCheck from "@/assets/images/pmt/icon/stockCheck.png";
import icon_visitStatistics from "@/assets/images/pmt/icon/visitStatistics.png";

import icon_ApprovalList from "@/assets/images/pmt/icon/Approval List.png";
import icon_Collaboration from "@/assets/images/pmt/icon/Collaboration.png";
import icon_CompetitorPrice from "@/assets/images/pmt/icon/Competitor Price.png";
import icon_MySalary from "@/assets/images/pmt/icon/My Salary.png";
import icon_PICWallet from "@/assets/images/pmt/icon/PIC Wallet.png";
import icon_Wallet from "@/assets/images/pmt/icon/Wallet.png";
import icon_WorkingPlan from "@/assets/images/pmt/icon/Working Plan.png";

let scan = null;
export default {
  name: "PmtHome",
  components: {
    TabBar,
    TopBar,
    PmtGridMemu,
    ChangeLang,
  },
  data() {
    return {
      // eslint-disable-next-line no-undef
      topBarTitle: this.$t("pmt.topBarTitle"),
      topBarLeftHtml: "<span></span>",
      topBarRightHtml: '<i class="van-icon van-icon-search"></i>',
      memuGridDataSource: [
        {
          icon: icon_invoiceSubmit,
          text: this.$t("pmt.menu.InvoiceSubmit"),
          toUrl: "retailInvoice",
          permission: "pmtMenu:retailInvoice",
        },
        {
          icon: icon_incentive,
          text: this.$t("pmt.menu.retailSubmit"),
          toUrl: "retailSubmit",
          permission: "pmtMenu:retailSubmit",
        },
        {
          icon: icon_manual,
          text: this.$t("pmt.menu.Manual"),
          toUrl: "retailBarcode",
          permission: "pmtMenu:Manual",
        },
        {
          icon: icon_attendant,
          text: this.$t("pmt.menu.Attendant"),
          toUrl: "attendant",
          permission: "pmtMenu:Attendant",
        },
        {
          icon: icon_incentive,
          text: this.$t("pmt.menu.Incentive"),
          toUrl: "Incentive",
          permission: "pmtMenu:Incentive",
        },
        {
          icon: icon_myRetail,
          text: this.$t("pmt.menu.MyRetail"),
          toUrl: "retailList",
          permission: "pmtMenu:MyRetail",
        },
        {
          icon: icon_policyScheme,
          text: this.$t("pmt.menu.PolicyScheme"),
          toUrl: "psPolicyScheme",
          permission: "pmtMenu:PolicyScheme",
        },
        {
          icon: icon_competitorSales,
          text: this.$t("pmt.menu.CompetitorSales"),
          toUrl: "competitorSales",
          permission: "pmtMenu:CompetitorSales",
        },
        {
          icon: icon_eLearning,
          text: this.$t("pmt.menu.eLearning"),
          toUrl: "eLearning",
          permission: "pmtMenu:eLearning",
        },
        {
          icon: icon_stockCheck,
          text: this.$t("pmt.menu.StockCheck"),
          toUrl: "stocKCheck",
          permission: "pmtMenu:StockCheck",
        },
        {
          icon: icon_WorkingPlan,
          text: this.$t("pmt.menu.workingPlan"),
          toUrl: "workPlan",
          permission: "pmtMenu:workingPlan",
        },
        {
          icon: icon_guestSurvey,
          text: this.$t("pmt.menu.GuestSurvey"),
          toUrl: "guestSurvey",
          permission: "pmtMenu:GuestSurvey",
        },
        {
          icon: icon_visitStatistics,
          text: this.$t("pmt.menu.VisitStatistics"),
          toUrl: "visitStatistics",
          permission: "pmtMenu:VisitStatistics",
        },
        {
          icon: icon_giftRegistration,
          text: this.$t("pmt.menu.GiftRegistration"),
          toUrl: "Gift_Registration",
          permission: "pmtMenu:giftRegistration",
        },
        {
          icon: icon_attendant,
          text: this.$t("pmt.menu.mySalary"),
          toUrl: "mySalary",
          permission: "pmtMenu:mySalary",
        },
        {
          icon: icon_CompetitorPrice,
          text: this.$t("pmt.menu.competitorPrice"),
          toUrl: "competitorPrice",
          permission: "pmtMenu:CompetitorPrice",
        },
        {
          icon: icon_Collaboration,
          text: this.$t("pmt.menu.collaboration"),
          toUrl: "collaboration",
          permission: "pmtMenu:collaboration",
        },
        {
          icon: icon_Wallet,
          text: this.$t("pmt.menu.wallet"),
          toUrl: "wallet",
          permission: "pmtMenu:wallet",
        },
        {
          icon: icon_PICWallet,
          text: this.$t("pmt.menu.picWallet"),
          toUrl: "picWallet",
          permission: "pmtMenu:picWallet",
        },
        {
          icon: icon_ApprovalList,
          text: this.$t("pmt.menu.approvalList"),
          toUrl: "approvalList",
          permission: "pmtMenu:approvalList",
        },
      ],
      position_code: "PMT",
      columnNumber: 3,
      selectShopId: "",
      selectShopOption: [],
      sellOutToday: "",
      sellOutYesterday: "",
      sellOutMonth: "",
    };
  },
  created() {
    this.selectShopId = this.$store.state.selectShopId;
    this.getSelectData();
    this.getUserInfo();
  },
  methods: {
    topBarClickLeft() {
      console.log("click left");
    },

    topBarClickRight() {
      console.log("click right");
    },

    getUserInfo() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getUserinfoByToken()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { user_position } = data.Items;
            this.position_code = user_position[0].position_value;
            let item = {};
            console.log(user_position);
            switch (this.position_code) {
              case "1":
                item = this.memuGridDataSource[4];
                item.toUrl = "psPolicyScheme";

                this.memuGridDataSource.splice(4, 1, item);
                break;
              case "2":
                item = this.memuGridDataSource[4];
                item.toUrl = "pstlPolicyScheme";

                this.memuGridDataSource.splice(4, 1, item);
                break;
              case "3":
                item = this.memuGridDataSource[4];
                item.toUrl = "mePolicyScheme";

                this.memuGridDataSource.splice(4, 1, item);
                break;
              case "4":
                item = this.memuGridDataSource[4];
                item.toUrl = "metlPolicyScheme";

                this.memuGridDataSource.splice(4, 1, item);
                break;
              case "5":
                item = this.memuGridDataSource[4];
                item.toUrl = "spModelPolicyScheme";

                this.memuGridDataSource.splice(4, 1, item);
                break;
              case "6":
                item = this.memuGridDataSource[4];
                item.toUrl = "shopPicPolicyScheme";

                this.memuGridDataSource.splice(4, 1, item);
                break;
            }

            this.$store.state.position_code = this.position_code;
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((error) => {
          this.$toast.fail(error.message);
        })
        .finally(() => {
          this.handleHideLoading();
        });
    },

    getSelectData() {
      this.selectShopOption = [];
      var data = {};
      this.$toast.loading({ duration: 0, forbidClick: true });
      postUserPermission(data)
        .then((res) => {
          // 绑定表格数据
          if (res.success) {
            var resShop = res.data.shopPermission;
            if (resShop.length > 0) {
              this.selectShopId = resShop[0].new_shop_id;
              this.value = resShop[0].new_shop_id;
              this.text = resShop[0].new_shop_name;
            }
            resShop.forEach((element) => {
              var thiselement = {};
              thiselement.value = element.new_shop_id;
              thiselement.text = element.new_shop_name;

              this.selectShopOption.push(thiselement);
            });
            this.onSelectShopChange();
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {
          this.handleHideLoading();
        });
    },

    onSelectShopChange() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      this.$store.state.selectShopId = this.selectShopId;
      var qarams = {
        new_shop_id: this.selectShopId,
      };
      getPmtSellOut(qarams)
        .then((res) => {
          // 绑定表格数据
          if (res.success) {
            this.sellOutToday = res.data.TodaySellout;
            this.sellOutYesterday = res.data.YesterSellout;
            this.sellOutMonth = res.data.MonthSellout;
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.handleHideLoading();
        });
    },

    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },
  },
};
</script>
<style>
.top-row {
  padding-top: 10px;
}
.pmt-body {
  overflow: auto;
  /* background-color: #fff; */
}

/* .top-content {
  color: #fff;
  font-size: 24px;
  text-align: right;
  background-color: #2058ab;
} */

/* .top-content .top-title {
  color: #fff;
  font-size: 0.35rem;
  text-align: left;
  background-color: #2058ab;
  padding: 10px;
} */

.top-dropdown .van-dropdown-menu__bar {
  color: #fff;
  text-align: center;
  background-color: #2058ab;
}
.top-dropdown .van-dropdown-menu__bar .van-dropdown-menu__title {
  color: #fff;
}

.form-group {
  /* margin: 12px; */
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
}
</style>

<style lang="less">
.top-content {
  color: #fff;
  font-size: 24px;
  text-align: right;
  background-color: #2058ab;
  .top-header {
    color: #fff;
    font-size: 0.35rem;
    text-align: left;
    background-color: #2058ab;
    padding: 10px;
    font-weight: bold;
  }
  .top-title {
    color: #fff;
    font-size: 0.35rem;
    text-align: left;
    background-color: #2058ab;
    padding: 10px;
  }
}
</style>
