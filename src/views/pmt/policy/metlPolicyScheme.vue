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
          <van-tab :title="this.$t('pmt.policy.tabsMetltlTitle')">
            <div class="infog-card form-group">
              <van-field
                label-class="totalEstimatedIncentive"
                :label="this.$t('pmt.policy.pstlFormTotalEstimatedIncentive')"
                input-align="left"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <span
                    class="totalEstimatedIncentive"
                    v-text="metlFormData.totalestimatedsoincentive"
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
                v-model="metlFormData.from"
                :label="this.$t('home.policy.mdFormValidateFrom')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="metlFormData.to"
                :label="this.$t('home.policy.mdFormValidateTo')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="metlFormData.items[0].target"
                :label="this.$t('home.policy.tlFormTotalSellOutTarget')"
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
                    this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
                  }}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="item"
                    v-for="(item, index) in metlFormData.items[0].slablist"
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
                v-model="metlFormData.items[0].mtd"
                :label="this.$t('home.policy.tlFormMtdTotal')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="metlFormData.items[0].estimatedincentive"
                :label="this.$t('home.policy.tlFormMtdMhSellout')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="metlFormData.items[1].target"
                :label="this.$t('pmt.policy.meFormProductDisplay')"
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
                    this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
                  }}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="item"
                    v-for="(item, index) in metlFormData.items[1].slablist"
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
            </div>

            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="metlFormData.items[2].target"
                :label="this.$t('pmt.policy.pstlFormShopVisitCoverageTarget')"
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
                    this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
                  }}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="item"
                    v-for="(item, index) in metlFormData.items[2].slablist"
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
                v-model="metlFormData.items[2].mtd"
                :label="this.$t('home.policy.shopFormMtdShopVisit')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="metlFormData.items[2].estimatedincentive"
                :label="this.$t('home.policy.tlFormMtdMhSellout')"
                input-align="right"
                label-width="150px"
              />
            </div>

            <div class="infog-card form-group">
              <h2 class="card-title">
                {{ this.$t("pmt.policy.meFormDisplayShare") }}
              </h2>
              <van-row style="text-align: center" type="flex" justify="center">
                <van-col span="12" class="list-head">
                  <!-- <van-cell center :title="this.$t('pmt.incentive.mdListType')" /> -->
                  <span>{{
                    this.$t("home.policy.tlFormTableColumnAchievement%")
                  }}</span>
                </van-col>
                <van-col span="12" class="list-head">
                  <span>{{
                    this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
                  }}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="item"
                    v-for="(item, index) in metlFormData.items[3].slablist"
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
            </div>

            <div class="infog-card form-group">
              <h2 class="card-title">
                {{ this.$t("pmt.policy.meTLFormReport") }}
              </h2>
              <van-row style="text-align: center" type="flex" justify="center">
                <van-col span="12" class="list-head">
                  <!-- <van-cell center :title="this.$t('pmt.incentive.mdListType')" /> -->
                  <span>{{
                    this.$t("home.policy.tlFormTableColumnAchievement%")
                  }}</span>
                </van-col>
                <van-col span="12" class="list-head">
                  <span>{{
                    this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
                  }}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="item"
                    v-for="(item, index) in metlFormData.items[4].slablist"
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
import { getPS, postGetmetl } from "@/api/policyScheme";
export default {
  name: "metlPolicyScheme",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.policy.tabsMetltlTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",
      loading: false,

      submitLoading: false,
      tlFormData: {},
      mdTabsTableList: [],
      finished: true,

      metlFormData: {},
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
      };
      postGetmetl(data)
        .then((res) => {
          if (res.success) {
             ;
            this.metlFormData = res.data;
            this.metlFormData = res.data;

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
