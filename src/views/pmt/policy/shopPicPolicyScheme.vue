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
    <van-form @submit="onSubmit" class="">
      <div class="infog-card form-group policy">
        <van-tabs type="card">
          <van-tab :title="this.$t('pmt.policy.tabsShopPICPolicyTitle')">
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="meFormData.from"
                :label="this.$t('home.policy.mdFormValidateFrom')"
                input-align="right"
                label-width="auto"
              />
              <van-field
                readonly
                v-model="meFormData.to"
                :label="this.$t('home.policy.mdFormValidateTo')"
                input-align="right"
                label-width="auto"
              />
            </div>
            <div class="infog-card form-group">
              <van-row style="text-align: center" type="flex" justify="center">
                <van-col span="12" class="list-head">
                  <!-- <van-cell center :title="this.$t('pmt.incentive.mdListType')" /> -->
                  <span>{{ this.$t("pmt.policy.shopPicFormShopCode") }}</span>
                </van-col>
                <van-col span="12" class="list-head">
                  <span>{{ this.$t("pmt.policy.shopPicFormShopName") }}</span>
                </van-col>
              </van-row>
              <van-row>
                <div
                  v-for="(shopPicItem, index2) in meFormData.items"
                  :key="index2"
                >
                  <div
                    class="item"
                    v-for="(item, index) in shopPicItem.shoplist"
                    :key="index"
                  >
                    <van-row type="flex" justify="center">
                      <van-col span="12" class="list-body">
                        <span>{{ item.shopcode }}</span>
                      </van-col>
                      <van-col span="12" class="list-body">
                        <span>{{ item.shopname }}</span>
                      </van-col>
                    </van-row>
                  </div>

                  <van-field
                    readonly
                    v-model="shopPicItem.target"
                    :label="$t('pmt.policy.shopPicFormBarcodeCollectionTarget')"
                    input-align="right"
                    label-width="auto"
                  />
                  <van-row
                    style="text-align: center"
                    type="flex"
                    justify="center"
                  >
                    <van-col span="12" class="list-head">
                      <span>{{
                        $t("home.policy.tlFormTableColumnAchievement%")
                      }}</span>
                    </van-col>
                    <van-col span="12" class="list-head">
                      <span>{{
                        $t("pmt.incentive.totalListIncentive") +
                        "(" +
                        $t("pmt.unit") +
                        ")"
                      }}</span>
                    </van-col>
                  </van-row>
                  <van-row>
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      @load="onLoad"
                    >
                      <div
                        class="item"
                        v-for="(item, index) in shopPicItem.slablist"
                        :key="index"
                      >
                        <van-row type="flex" justify="center">
                          <van-col span="12" class="list-body">
                            <span>{{ item.achievement }}</span>
                          </van-col>
                          <van-col span="12" class="list-body">
                            <span>{{ item.incentive }}</span>
                          </van-col>
                        </van-row>
                      </div>
                    </van-list>
                  </van-row>
                  <van-field
                    readonly
                    v-model="shopPicItem.mtd"
                    :label="$t('pmt.policy.shopPicFormMTDQuantity')"
                    input-align="right"
                    label-width="auto"
                  />
                  <van-field
                    readonly
                    v-model="shopPicItem.estimatedincentive"
                    :label="$t('home.policy.tlFormMtdMhSellout')"
                    input-align="right"
                    label-width="auto"
                  />
                </div>
              </van-row>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <div class="tab-bar">
        <!-- <van-tabbar route> -->
        <van-button
          block
          square
          type="info"
          color="#407FDC"
          native-type="submit"
          :loading="submitLoading"
          >{{ this.$t("pmt.okButton") }}</van-button
        >
        <!-- </van-tabbar> -->
      </div>
    </van-form>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  getShopSelectData,
  postSubmitGitRegister,
} from "@/api/giftRegistration";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";
import { getPS, postGetshoppic } from "@/api/policyScheme";
export default {
  name: "shopPicPolicyScheme",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.policy.tabsShopPICPolicyTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",
      loading: false,

      submitLoading: false,
      tlFormData: {},
      mdTabsTableList: [],
      finished: true,

      meFormData: {
        from: "",
        to: "",
        items: [
          {
            estimatedincentive: "0",
            mtd: "0",
            shoplist: [
              {
                shopcode: "",
                shopname: "",
              },
            ],
            slablist: [],
            target: "0",
            targettype: "",
          },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    topBarClickLeft() {
      this.$router.go(-1);
    },

    topBarClickRight() {
      console.log("click right");
    },

    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },
    onSubmit() {
      this.$router.go(-1);
    },

    getData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        //   mock:true
      };
      postGetshoppic(data)
        .then((res) => {
          if (res.success) {
            this.meFormData = res.data;
            this.meFormData = res.data;

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
    },
  },
};
</script>

<style lang="scss" scoped>
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
.policy {
  background-color: #f5f5f5;
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
</style>
<style>
/*.van-field__error-message {*/
/*  float: right;*/
/*}*/

/*.form-group {*/
/*  margin: 12px;*/
/*  border-radius: 12px;*/
/*  overflow: hidden;*/
/*  background: #fff;*/
/*}*/
</style>
<style>
.totalEstimatedIncentive {
  color: red;
}
.mhModel-dropdown {
  width: 100%;
}
</style>
