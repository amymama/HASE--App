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
          <van-tab :title="this.$t('home.policy.tabsPsTitle')">
            <div class="infog-card form-group">
              <van-field
                label-class="totalEstimatedIncentive"
                :label="this.$t('home.policy.pmtFormTotalEstimatedIncentive')"
                input-align="left"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <span
                    class="totalEstimatedIncentive"
                    v-text="tlFormData.TotalEstimatedIncentive"
                  ></span>
                </template>
              </van-field>
            </div>
            <div class="infog-card form-group">
              <!-- <h2 class="card-title">
                {{ this.$t("home.policy.mdFormValidate") }}
              </h2> -->
              <van-field
                readonly
                v-model="tlFormData.from"
                :label="this.$t('home.policy.mdFormValidateFrom')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="tlFormData.to"
                :label="this.$t('home.policy.mdFormValidateTo')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="tlFormData.totalsellout.target"
                :label="this.$t('home.policy.tlFormTotalSellOutTarget')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="tlFormData.totalsellout.incentive100"
                :label="this.$t('home.policy.mdForm100Incentive')"
                input-align="right"
                label-width="150px"
              />
              <van-row style="text-align: center" type="flex" justify="center">
                <van-col span="12" class="list-head">
                  <!-- <van-cell center :title="this.$t('pmt.incentive.mdListType')" /> -->
                  <span>{{
                    this.$t("home.policy.tlFormTableColumnAchievement%")
                  }}</span>
                </van-col>
                <van-col span="12" class="list-head">
                  <span>{{
                    this.$t("home.policy.tlFormTableColumnIncentive%")
                  }}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="item"
                    v-for="(item, index) in tlFormData.totalsellout.slablist"
                    :key="index"
                  >
                    <!-- ITEM BEGIN -->
                    <van-row type="flex" justify="center">
                      <van-col span="12" class="list-body">
                        <span>{{ item.achievement }}</span>
                      </van-col>
                      <van-col span="12" class="list-body">
                        <span>{{ item.incentive }}</span>
                      </van-col>
                    </van-row>

                    <!-- ITEM END -->
                  </div>
                </van-list>
              </van-row>
              <van-field
                readonly
                v-model="tlFormData.totalsellout.actual"
                :label="this.$t('home.policy.tlFormMtdTotal')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="tlFormData.totalsellout.incentive"
                :label="this.$t('home.policy.tlFormMtdMhSellout')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="tlFormData.mhsellout.target"
                :label="this.$t('home.policy.mhFormTotalSellOutTarget')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="tlFormData.mhsellout.incentive100"
                :label="this.$t('home.policy.mdForm100Incentive')"
                input-align="right"
                label-width="150px"
              />
              <van-row style="text-align: center" type="flex" justify="center">
                <van-col span="12" class="list-head">
                  <!-- <van-cell center :title="this.$t('pmt.incentive.mdListType')" /> -->
                  <span>{{
                    this.$t("home.policy.tlFormTableColumnAchievement%")
                  }}</span>
                </van-col>
                <van-col span="12" class="list-head">
                  <span>{{
                    this.$t("home.policy.tlFormTableColumnIncentive%")
                  }}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="item"
                    v-for="(item, index) in tlFormData.mhsellout.slablist"
                    :key="index"
                  >
                    <!-- ITEM BEGIN -->
                    <van-row type="flex" justify="center">
                      <van-col span="12" class="list-body">
                        <span>{{ item.achievement }}</span>
                      </van-col>
                      <van-col span="12" class="list-body">
                        <span>{{ item.incentive }}</span>
                      </van-col>
                    </van-row>

                    <!-- ITEM END -->
                  </div>
                </van-list>
              </van-row>
              <van-field
                readonly
                v-model="tlFormData.mhsellout.actual"
                :label="this.$t('home.policy.mhFormMtdMhModelTotal')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="tlFormData.mhsellout.incentive"
                :label="this.$t('home.policy.tlFormMtdMhSellout')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="tlFormData.shopvisit.target"
                :label="this.$t('home.policy.shopFormTotalSellOutTarget')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="tlFormData.shopvisit.incentive100"
                :label="this.$t('home.policy.mdForm100Incentive')"
                input-align="right"
                label-width="150px"
              />
              <van-row style="text-align: center" type="flex" justify="center">
                <van-col span="12" class="list-head">
                  <!-- <van-cell center :title="this.$t('pmt.incentive.mdListType')" /> -->
                  <span>{{
                    this.$t("home.policy.tlFormTableColumnAchievement%")
                  }}</span>
                </van-col>
                <van-col span="12" class="list-head">
                  <span>{{
                    this.$t("home.policy.tlFormTableColumnIncentive%")
                  }}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="item"
                    v-for="(item, index) in tlFormData.shopvisit.slablist"
                    :key="index"
                  >
                    <!-- ITEM BEGIN -->
                    <van-row type="flex" justify="center">
                      <van-col span="12" class="list-body">
                        <span>{{ item.achievement }}</span>
                      </van-col>
                      <van-col span="12" class="list-body">
                        <span>{{ item.incentive }}</span>
                      </van-col>
                    </van-row>

                    <!-- ITEM END -->
                  </div>
                </van-list>
              </van-row>
              <van-field
                readonly
                v-model="tlFormData.shopvisit.actual"
                :label="this.$t('home.policy.shopFormMtdShopVisit')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="tlFormData.shopvisit.incentive"
                :label="this.$t('home.policy.tlFormMtdMhSellout')"
                input-align="right"
                label-width="150px"
              />
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
import { postGethotmodellist } from "@/api/policyScheme";
export default {
  name: "hotModelPolicy",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("home.policy.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      submitLoading: false,
      tlFormData: {},
      mdTabsTableList: [],
      finished: true,
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
        mock:true
      }
      
      postGethotmodellist(data)
        .then((res) => {
          if (res.success) {
             
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
