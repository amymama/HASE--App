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
          <van-tab :title="this.$t('home.policy.tabsMdTitle')">
            <div class="infog-card form-group">
              <!-- <h2 class="card-title">
                {{ this.$t("home.policy.mdFormValidate") }}
              </h2> -->
              <van-field
                readonly
                v-model="mdFormData.from"
                :label="this.$t('home.policy.mdFormValidateFrom')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="mdFormData.to"
                :label="this.$t('home.policy.mdFormValidateTo')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="mdFormData.basicsalary"
                :label="this.$t('home.policy.mdFormBasicSalary')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="mdFormData.incentive100"
                :label="this.$t('home.policy.mdForm100Incentive')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <div class="mdModelList-table">
                <table>
                  <thead>
                    <tr>
                      <th class="">
                        <span>{{
                          this.$t("home.policy.mdFormTableColumnType")
                        }}</span>
                      </th>
                      <th>
                        <span>{{
                          this.$t("home.policy.mdFormTableColumnTarget")
                        }}</span>
                      </th>
                      <th>
                        <span>{{
                          this.$t("home.policy.mdFormTableColumnAchMin")
                        }}</span>
                      </th>
                      <th>
                        <span>{{
                          this.$t("home.policy.mdFormTableColumnAchMax")
                        }}</span>
                      </th>
                      <th>
                        <span>{{
                          this.$t("home.policy.mdFormTableColumnWeightage")
                        }}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in mdFormData.mdschetitemlist"
                      :key="index"
                    >
                      <td class="">{{ item.targettype }}</td>
                      <td>{{ item.target }}</td>
                      <td>
                        {{ (parseFloat(item.min) * 100).toFixed(0) + "%" }}
                      </td>
                      <td>
                        {{ (parseFloat(item.max) * 100).toFixed(0) + "%" }}
                      </td>
                      <td>
                        {{
                          (parseFloat(item.weightage) * 100).toFixed(0) + "%"
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="md-total">
                        <span>{{
                          this.$t("home.policy.mdFormTableColumnTotal")
                        }}</span>
                      </td>
                      <td>
                        <span>{{
                          (parseFloat(mdFormData.totalincentive) * 100).toFixed(
                            0
                          ) + "%"
                        }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="mdFormData.mtdtotalsellout"
                :label="this.$t('home.policy.mdFormMtdTotalSellout')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="mdFormData.mtdmhsellout"
                :label="this.$t('home.policy.mdFormMtdMhSellout')"
                input-align="right"
                label-width="150px"
              />
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <div class="tab-bar">
        <van-tabbar route>
          <van-button
            block
            square
            type="info"
            color="#407FDC"
            native-type="submit"
            :loading="submitLoading"
            >{{ this.$t("pmt.okButton") }}</van-button
          >
        </van-tabbar>
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
import { postGetMd } from "@/api/policyScheme";
export default {
  name: "tlPolicyScheme",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("home.policy.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      loading: false,
      finished: true,
      submitLoading: false,
      mdFormData: {
        from: "2021-09-01",
        to: "2021-09-30",
        basicsalary: 0,
        multiple: 0,
        incentive100: 0,
        incentiveidr: 0,
        mdschetitemlist: [],
        mtdtotalsellout: "0 (0%)",
        mtdmhsellout: "0 (0%)",
      },
      mdTabsTableList: [],
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
      postGetMd()
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
          this.mdFormData = data;
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
  padding-bottom: 20%;
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

.mdModelList-table {
  width: 100%;
  margin: 0 auto;
  overflow-x: scroll;
  th,
  td {
    text-align: center;
    border: 1px solid #eee;
    padding: 18px;
    white-space: nowrap;
  }
  thead {
    background: #f1f8ff;
    // color: rgb(51, 51, 51);
  }
  tbody {
    background: white;
  }
  .md-total {
    background: #f1f8ff;
  }
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
