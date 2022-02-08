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
          <van-tab :title="this.$t('pmt.policy.tabsSPModelPolicyTitle')">
            <div class="infog-card form-group">
              <!-- <h2 class="card-title">
                {{ this.$t("home.policy.mdFormValidate") }}
              </h2> -->
              <van-field
                readonly
                v-model="psHotModelFormData.from"
                :label="this.$t('home.policy.mdFormValidateFrom')"
                input-align="right"
                label-width="150px"
              />
              <van-field
                readonly
                v-model="psHotModelFormData.to"
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
              </van-field>
            </div>
            <div class="infog-card form-group">
              <van-row class="body-row">
                <van-col span="24">
                  <van-row>
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
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in psHotModelList"
                            :key="index"
                          >
                            <td>{{ item.category }}</td>
                            <td>{{ item["sub-category"] }}</td>
                            <td>{{ item.material }}</td>
                            <td>{{ item.model }}</td>
                            <td>{{ item.brand }}</td>
                            <td>{{ item.incentive }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </van-row>
                </van-col>
              </van-row>
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
import {
  getPmtSelectData,
  postGetCategory,
  postGetSubCategory,
} from "@/api/common";
import ChangeLang from "@/components/ChangeLang";
import { getspmodellist } from "@/api/policyScheme";
export default {
  name: "spModelPolicyScheme",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.policy.tabsSPModelPolicyTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      submitLoading: false,
      tlFormData: {},
      mdTabsTableList: [],
      finished: true,

      psHotModelFormData: {
        from: "",
        to: "",
      },
      selectProductOption: [
        {
          value: "00000000-0000-0000-0000-000000000000",
          text: "All",
        },
      ],
      selectSubOption: [
        {
          value: "00000000-0000-0000-0000-000000000000",
          text: "All",
        },
      ],
      selectProductId: "",
      selectSubId: "",
      psHotModelList: [],
      showModelPicker: false,
      selectModalOption: [],
      basicModalOption: [],
      searchModelKey: "",
    };
  },
  created() {
    this.getSelectData();
    this.getListData();
    this.setDate();
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

    getSelectData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      postGetCategory()
        .then((res) => {
          if (res.success) {
            var data = res.data;
            // var resBranch = res.data;
            data.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.value = element.id;
              thiselement.text = element.text;
              this.selectProductOption.push(thiselement);
            });
            // this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
            return;
          }
          if (res.data == "") {
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    getListData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        CategoryId: this.selectProductId,
        SubCategoryId: this.selectSubId,
        Model: this.selectModalName,
      };
      getspmodellist(data)
        .then((res) => {
          if (res.success) {
            var data = res.data;
            this.psHotModelList = data;
            this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
            return;
          }
          if (res.data == "") {
            return;
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
        parentid: this.selectProductId,
      };
      postGetSubCategory(params)
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
              thiselement.value = element.id;
              thiselement.text = element.text;
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
    },

    handleSelectModel(value) {
      this.showModelPicker = false;
      if (value == undefined) return false;
      // 需要找到相应的model并修改值
      this.selectModalName = value.text;
      this.getListData();
    },

    onSelectSubChange() {
      let qry_where = "and new_status=0";

      if (
        this.selectProductId != null &&
        this.selectProductId != undefined &&
        this.selectProductId != ""
      ) {
        qry_where =
          qry_where + " and new_category_id = '" + this.selectProductId + "'";
      }

      if (
        this.selectSubId != null &&
        this.selectSubId != undefined &&
        this.selectSubId != ""
      ) {
        qry_where =
          qry_where + " and new_subcategory_id = '" + this.selectSubId + "'";
      }

      this.basicModalOption = [];
      this.selectModalOption = [];
      var params = {
        entityName: "new_model",
        fields: "new_modelId,new_name",
        where: qry_where,
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

      this.getListData();
    },

    //modal 数据过滤
    changeModelKey() {
      console.log(this.selectModalOption);
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

    setDate() {
      var now = new Date();
      this.psHotModelFormData.from = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      ).toLocaleDateString();
      this.psHotModelFormData.to = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).toLocaleDateString();
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

.mhModelList-table {
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
