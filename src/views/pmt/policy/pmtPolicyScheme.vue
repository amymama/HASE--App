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
        <van-tabs type="card" @click="onClick">
          <van-tab :title="this.$t('home.policy.tabsPmtPolicySchemeTitle')">
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
                    v-text="pmtFormData.totalestimatedincentive"
                  ></span>
                </template>
              </van-field>
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="pmtFormData.from"
                :label="this.$t('home.policy.mdFormValidateFrom')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="pmtFormData.to"
                :label="this.$t('home.policy.mdFormValidateTo')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <!-- <h2 class="card-title">
                {{ this.$t("home.policy.mdFormValidate") }}
              </h2> -->
              <van-field
                readonly
                v-model="pmtFormData.totalsellout.target"
                :label="this.$t('home.policy.tlFormTotalSellOutTarget')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="pmtFormData.totalsellout.incentive100"
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
                    v-for="(item, index) in pmtFormData.totalsellout.slablist"
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
                v-model="pmtFormData.totalsellout.actual"
                :label="this.$t('home.policy.tlFormMtdTotal')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="pmtFormData.totalsellout.incentive"
                :label="this.$t('home.policy.tlFormMtdMhSellout')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                v-model="pmtFormData.mhsellout.target"
                :label="this.$t('home.policy.mhFormTotalSellOutTarget')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="pmtFormData.mhsellout.incentive100"
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
                    v-for="(item, index) in pmtFormData.mhsellout.slablist"
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
                v-model="pmtFormData.mhsellout.actual"
                :label="this.$t('home.policy.mhFormMtdMhModelTotal')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="pmtFormData.mhsellout.incentive"
                :label="this.$t('home.policy.tlFormMtdMhSellout')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <van-field
                readonly
                :label="this.$t('home.policy.tabsMhModelIncentiveTitle')"
                input-align="right"
                label-width="150px"
              />
              <van-row style="text-align: center" type="flex" justify="center">
                <van-col span="12" class="list-head">
                  <!-- <van-cell center :title="this.$t('pmt.incentive.mdListType')" /> -->
                  <span>{{ this.$t("home.policy.pmtFormScheme") }}</span>
                </van-col>
                <van-col span="12" class="list-head">
                  <span>{{
                    this.$t("home.policy.tlFormTableColumnAchievement%")
                  }}</span>
                </van-col>
              </van-row>
              <van-row>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="item"
                    v-for="(item, index) in pmtFormData.slablist"
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
                  </div>
                </van-list>
              </van-row>
              <van-field
                readonly
                v-model="pmtFormData.mhmodelestimatedincentive"
                :label="this.$t('home.policy.tlFormMtdMhSellout')"
                input-align="right"
                label-width="150px"
              />
            </div>
          </van-tab>
          <van-tab :title="this.$t('home.policy.tabsMhModelIncentiveTitle')">
            <div class="infog-card form-group">
              <!-- <h2 class="card-title">
                {{ this.$t("home.policy.mdFormValidate") }}
              </h2> -->
              <van-field
                readonly
                v-model="mhModalFormData.from"
                :label="this.$t('home.policy.mdFormValidateFrom')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="mhModalFormData.to"
                :label="this.$t('home.policy.mdFormValidateTo')"
                input-align="right"
                label-width="150px"
              />
            </div>
            <div class="infog-card form-group">
              <van-field
                :label="this.$t('pmt.incentiveDetail.productCategory')"
                input-align="left"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <van-dropdown-menu class="mhModel-dropdown">
                    <van-dropdown-item
                      v-model="selectProductId"
                      :options="selectProductOption"
                      @change="onSelectProductChange"
                    />
                  </van-dropdown-menu>
                </template>
              </van-field>
              <van-field
                :label="this.$t('pmt.incentiveDetail.subCategory')"
                input-align="left"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <van-dropdown-menu class="mhModel-dropdown">
                    <van-dropdown-item
                      v-model="selectSubId"
                      :options="selectSubOption"
                      @change="onSelectSubChange"
                    />
                  </van-dropdown-menu>
                </template>
              </van-field>
              <van-field
                is-link
                readonly
                @click="showModelPicker = true"
                :label="this.$t('home.policy.mhFormModel')"
                input-align="left"
                label-width="auto"
                :colon="true"
                v-model="selectModalName"
              >
                <!-- <template #input>
                  <van-dropdown-menu class="mhModel-dropdown">
                    <van-dropdown-item
                      v-model="selectSubId"
                      :options="selectSubOption"
                      @change="onSelectSubChange"
                    />
                  </van-dropdown-menu>
                </template> -->
              </van-field>
            </div>
            <div class="infog-card form-group">
              <van-row class="body-row">
                <van-col span="24">
                  <!-- <van-row
                    style="text-align: center"
                    type="flex"
                    justify="center"
                  >
                    <van-col span="4" class="list-head">
                      <span>{{
                        this.$t("pmt.incentiveDetail.listCategory")
                      }}</span>
                    </van-col>
                    <van-col span="4" class="list-head">
                      <span>{{
                        this.$t("pmt.incentiveDetail.listSubCategory")
                      }}</span>
                    </van-col>
                    <van-col span="4" class="list-head">
                      <span>{{
                        this.$t("pmt.incentiveDetail.listMaterialCode")
                      }}</span>
                    </van-col>
                    <van-col span="3" class="list-head">
                      <span>{{
                        this.$t("pmt.incentiveDetail.listModel")
                      }}</span>
                    </van-col>
                    <van-col span="3" class="list-head">
                      <span>{{
                        this.$t("home.policy.mhTableColumnBrand")
                      }}</span>
                    </van-col>
                    <van-col span="3" class="list-head">
                      <span>{{
                        this.$t("pmt.incentiveDetail.listIncentive")
                      }}</span>
                    </van-col>
                    <van-col span="3" class="list-head">
                      <span>{{
                        this.$t("home.policy.mhTableColumnMtdQty")
                      }}</span>
                    </van-col>
                  </van-row> -->
                  <van-row>
                    <!-- <van-list
                      v-model="loading"
                      :finished="finished"
                      @load="onLoad"
                    >
                      <div
                        class="item"
                        v-for="(item, index) in mhModellList"
                        :key="index"
                      >
                        <van-row type="flex" justify="center">
                          <van-col span="4" class="list-body">
                            <span>{{ item.category }}</span>
                          </van-col>
                          <van-col span="4" class="list-body">
                            <span>{{ item["sub-category"] }}</span>
                          </van-col>
                          <van-col span="4" class="list-body">
                            <span>{{ item.material }}</span>
                          </van-col>
                          <van-col span="3" class="list-body">
                            <span>{{ item.model }}</span>
                          </van-col>
                          <van-col span="3" class="list-body">
                            <span>{{ item.brand }}</span>
                          </van-col>
                          <van-col span="3" class="list-body">
                            <span>{{ item.incentive }}</span>
                          </van-col>
                          <van-col span="3" class="list-body">
                            <span>{{ item.mtdqty }}</span>
                          </van-col>
                        </van-row>
                      </div>
                    </van-list> -->
                    <div class="mhModelList-table">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <span>{{
                                this.$t("pmt.incentiveDetail.listCategory")
                              }}</span>
                            </th>
                            <th>
                              <span>{{
                                this.$t("pmt.incentiveDetail.listSubCategory")
                              }}</span>
                            </th>
                            <th>
                              <span>{{
                                this.$t("pmt.incentiveDetail.listMaterialCode")
                              }}</span>
                            </th>
                            <th>
                              <span>{{
                                this.$t("pmt.incentiveDetail.listModel")
                              }}</span>
                            </th>
                            <th>
                              <span>{{
                                this.$t("home.policy.mhTableColumnBrand")
                              }}</span>
                            </th>
                            <th>
                              <span>{{
                                this.$t("pmt.incentiveDetail.listIncentive")
                              }}</span>
                            </th>
                            <th>
                              <span>{{
                                this.$t("home.policy.mhTableColumnMtdQty")
                              }}</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in mhModellList" :key="index">
                            <td>{{ item.category }}</td>
                            <td>{{ item["sub-category"]  }}</td>
                            <td>{{ item.material }}</td>
                            <td>{{ item.model  }}</td>
                            <td>{{ item.brand  }}</td>
                            <td>{{ item.incentive  }}</td>
                            <td>{{ item.mtdqty  }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </van-row>
                </van-col>
              </van-row>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div class="tab-bar">
        <!-- <van-tabbar route> -->
        <van-button
          style="position: fixed; bottom: 0"
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

      <van-popup v-model="showModelPicker" position="bottom" round>
        <van-search
          v-model="searchModelKey"
          :placeholder="this.$t('pmt.retail.filterOfModel')"
          @search="changeModelKey"
        />
        <van-picker
          show-toolbar
          :columns="selectModalOption"
          @cancel="showModelPicker = false"
          @confirm="handleSelectModel"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        >
        </van-picker>
      </van-popup>
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
import { postGetPmt, postGetMhModelList } from "@/api/policyScheme";

export default {
  name: "pmtPolicyScheme",
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
      finished: false,
      refreshing: false,

      showModelPicker: false,

      submitLoading: false,
      mdFormData: {},
      mdTabsTableList: [],
      pmtFormData: {
        from: "2021-09-01",
        to: "2021-09-30",
        totalsellout: {
          target: 1888208,
          actual: 666,
          incentive100: 5000000,
          incentiveidr: 0,
          incentive: 0,
          slablist: null,
          min: 0,
          max: 0,
          achievement: 0.035271537881419845,
          weightage: 0,
          incentiveweightage: 0,
        },
        mhsellout: {
          target: 22324234,
          actual: 0,
          incentive100: 900000,
          incentiveidr: 0,
          incentive: 0,
          slablist: null,
          min: 0,
          max: 0,
          achievement: 0,
          weightage: 0,
          incentiveweightage: 0,
        },
        slablist: [],
        mhmodelsales: "100%",
        totalsalesamount: "100%",
        totalestimatedincentive: 0,
        mhmodelestimatedincentive: 0,
      },
      mhModalFormData: {
        from: "",
        to: "",
      },
      selectDate: "",
      selectProductId: null,
      selectSubId: null,
      selectModalName: "",
      modalName: "",
      searchModelKey: "",
      mhModellList: [],
      selectProductOption: [
        {
          value: "",
          text: "All",
        },
      ],
      selectSubOption: [
        {
          value: "",
          text: "All",
        },
      ],
      selectModalOption: [],
      basicModalOption: [],
    };
  },
  created() {
    this.getSelectData();
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
      postGetPmt()
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
          this.pmtFormData = data;
          if (
            this.pmtFormData.totalsellout.slablist == null ||
            this.pmtFormData.totalsellout.slablist == undefined
          )
            this.pmtFormData.totalsellout.slablist = [];

          if (
            this.pmtFormData.mhsellout.slablist == null ||
            this.pmtFormData.mhsellout.slablist == undefined
          )
            this.pmtFormData.mhsellout.slablist = [];

          this.pmtFormData.slablist = [
            {
              achievement: this.$t("home.policy.pmtFormMhModelSales"),
              incentive: data.mhmodelsales != null ? data.mhmodelsales : 0,
            },
            {
              achievement: this.$t("home.policy.pmtFormTotalSalesAmount"),
              incentive:
                data.totalsalesamount != null ? data.totalsalesamount : 0,
            },
          ];
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    getSelectData() {
      this.selectProductOption = [
        {
          value: "",
          text: "All",
        },
      ];
      var paramsGift = {
        entityName: "new_product_category",
        fields: "new_product_categoryid,new_name_en",
        where: "and new_parentid is null and new_status=0",
      };

      getPmtSelectData(paramsGift)
        .then((res) => {
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var resBranch = res.data;
            resBranch.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.value = element.new_product_categoryid;
              thiselement.text = element.new_name_en;
              this.selectProductOption.push(thiselement);
            });
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    onSelectProductChange() {
      this.selectSubId = null;
      this.selectSubOption = [
        {
          value: "",
          text: "All",
        },
      ];
      if (
        this.selectProductId == "" ||
        this.selectProductId == undefined ||
        this.selectProductId == null
      )
        return false;
      var params = {
        entityName: "new_product_category",
        fields: "new_product_categoryid,new_name_en",
        where:
          "and new_parentid ='" + this.selectProductId + "' and new_status=0",
      };
      getPmtSelectData(params)
        .then((res) => {
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var resBranch = res.data;
            resBranch.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.value = element.new_product_categoryid;
              thiselement.text = element.new_name_en;
              this.selectSubOption.push(thiselement);
            });
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});

      this.onSelectSubChange();
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },

    onLoad() {
      this.finished = true;
    },

    onSelectSubChange() {
      let qry_where = "and new_status=0";

      if (
        this.selectProductId != null &&
        this.selectProductId != undefined &&
        this.selectProductId != ''
      ) {
        qry_where =
          qry_where + " and new_category_id = '" + this.selectProductId+"'";
      }

      if (
        this.selectSubId != null &&
        this.selectSubId != undefined &&
        this.selectSubId != ''
      ) {
        qry_where = qry_where + " and new_subcategory_id = '" + this.selectSubId+"'";
      }

      this.basicModalOption = [];
      this.selectModalOption = [];
      var params = {
        entityName: "new_model",
        fields: "new_modelId,new_name",
        where: qry_where,
      };
       ;
      getPmtSelectData(params)
        .then((res) => {
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var resBranch = res.data;
            resBranch.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.value = element.new_modelId;
              thiselement.text = element.new_name;
              this.selectModalOption.push(thiselement);
            });
            this.basicModalOption = this.selectModalOption;
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});

      this.getMhModalList();
    },

    onClick(name, title) {
      switch (name) {
        case 0:
          break;
        case 1:
          this.mhModalFormData.from = this.getCurrentMonthFirst();
          this.mhModalFormData.to = this.getCurrentMonthLast();
          // this.selectDate = "";
          // this.selectProductId = null;
          // this.selectSubId = null;
          // this.selectModalName = "";
          // this.modalName = "";
          // this.searchModelKey = "";
          this.onSelectSubChange();
          this.getMhModalList();

          break;
      }
    },
    getMhModalList() {
       ;
      this.$toast.loading({ duration: 0, forbidClick: true });
      var arry = this.mhModalFormData.from.split("-");

      var data = {
        Year: parseInt(arry[0]),
        Month: parseInt(arry[1]),
        ProductCategoryId: this.selectProductId,
        SubCategoryId: this.selectSubId,
        ModelName: this.selectModalName,
      };
      postGetMhModelList(data)
        .then((res) => {
          if (res.success) {
            this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
            return;
          }
          // if (res.data == "") {
          //   return;
          // }

          var data = res.data;
          this.mhModellList = data;
          // this.modelOptions = data;
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    // 第一天
    getCurrentMonthFirst() {
      var date = new Date();
      date.setDate(1);
      var month = parseInt(date.getMonth() + 1);
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return date.getFullYear() + "-" + month + "-" + day;
    },
    //最后一天
    getCurrentMonthLast() {
      var date = new Date();
      var currentMonth = date.getMonth();
      var nextMonth = ++currentMonth;
      var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
      var oneDay = 1000 * 60 * 60 * 24;
      var lastTime = new Date(nextMonthFirstDay - oneDay);
      var month = parseInt(lastTime.getMonth() + 1);
      var day = lastTime.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return date.getFullYear() + "-" + month + "-" + day;
    },

    //modal 数据过滤
    changeModelKey() {
      console.log(this.selectModalOption)
      this.selectModalOption = [];
      for (const i in this.basicModalOption) {
        if (
          this.basicModalOption[i].text
            .toLowerCase()
            .indexOf(this.searchModelKey.toLowerCase()) >= 0
        ) {
          this.selectModalOption.push(this.basicModalOption[i]);
        }
      }
    },
    handleSelectModel(value) {
      this.showModelPicker = false;
      if (value == undefined) return false;
      // 需要找到相应的model并修改值
      this.selectModalName = value.text;
      this.getMhModalList();
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

.list-bodyHear {
  /* background: #2058ab; */
  /* color: #fff; */
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  border: 0.1px solid #000;
}
// .form-group {
//   .totalEstimatedIncentive {
//     color: red;
//   }
// }
.mhModelList-table {
  width: 100%;
  margin: 0 auto;
  overflow-x: scroll;
  th,td {
      text-align: center;
      border: 1PX solid #EEE;
      padding: 18px;
      white-space: nowrap;
    }
    thead{
      background: #F1F8FF;
      // color: rgb(51, 51, 51);
    }
    tbody{
      background: white;
    }
}
</style>
<style> 
.totalEstimatedIncentive {
  color: red;
}
.mhModel-dropdown {
  width: 100%;
}
</style>
