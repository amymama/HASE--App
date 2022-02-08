<template>
  <div class="retailBox">
    <TopBar
      :topBarTitle="this.$t('pmt.retail.retailList')"
      @set_onClickLeft="topBarClickLeft"
      @set_onClickRight="topBarClickRight"
    ></TopBar>

    <van-popup
      v-model="showCalenderStart"
      position="bottom"
      round
      safe-area-inset-bottom
    >
      <van-datetime-picker
        v-model="formData.new_start_submit_date_obj"
        type="date"
        :title="this.$t('pmt.Select')"
        :minDate="minDate"
        @confirm="onConfirmStartDate"
        @cancel="showCalenderStart = false"
      />
    </van-popup>

    <van-popup v-model="showCalenderSEnd" position="bottom" round>
      <van-datetime-picker
        v-model="formData.new_end_submit_date_obj"
        type="date"
        :title="this.$t('pmt.Select')"
        :minDate="minDate"
        @confirm="onConfirmEndDate"
        @cancel="showCalenderSEnd = false"
      />
    </van-popup>

    <van-form class="">
      <div class="infog-card form-group">
        <van-search
          v-model="quickSearchKey"
          placeholder="search"
          class="search-itm"
          @change="getFilteredRetailList"
        />
        <van-field
          v-model="formData.new_shop_name"
          is-link
          readonly
          :label="this.$t('pmt.retail.shop')"
          @click="showShopPicker = true"
          input-align="right"
          label-width="90px"
          :rules="[]"
        />
      </div>

      <van-popup v-model="showShopPicker" position="bottom" round>
        <van-search
          v-model="searchShopKey"
          :placeholder="this.$t('home.policy.searchTitle')"
          @search="changeShopKey"
        />
        <van-picker
          show-toolbar
          :columns="shopPermissionOptions"
          @cancel="showShopPicker = false"
          @confirm="selectedShopId"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <van-popup
        v-model="showFilters"
        position="top"
        :style="{ height: '80%' }"
      >
        <van-form @submit="onSubmitFilters" class="">
          <div class="infog-card form-group">
            <h2 class="card-title">
              {{ this.$t("pmt.retail.Filter") }}
            </h2>
            <van-field
              v-model="formData.new_invoice_code"
              input-align="right"
              label-width="90px"
              :label="$t('pmt.retail.invoiceCode')"
            >
            </van-field>

            <van-field
              v-model="formData.new_is_complaint_name"
              is-link
              readonly
              :label="this.$t('pmt.retail.ComplaintOrder')"
              @click="showComplaintPicker = true"
              input-align="right"
              label-width="120px"
              :rules="[]"
            />

            <van-popup v-model="showComplaintPicker" position="bottom" round>
              <van-picker
                show-toolbar
                :columns="complaintOptions"
                @cancel="showComplaintPicker = false"
                @confirm="handleComplaintPicker"
                value-key="text"
                :confirm-button-text="this.$t('pmt.confirmButton')"
                :cancel-button-text="this.$t('pmt.cancelButton')"
              />
            </van-popup>

            <van-field
              v-model="formData.new_model_name"
              input-align="right"
              label-width="90px"
              :label="$t('pmt.model')"
            >
            </van-field>

            <van-field
              :label="this.$t('pmt.incentiveDetail.productCategory')"
              input-align="right"
              label-width="120px"
              :colon="false"
              v-model="formData.new_category_name"
              is-link
              readonly
              @click="showCategoryPicker = true"
              :rules="[]"
            >
            </van-field>

            <van-popup v-model="showCategoryPicker" position="bottom" round>
              <van-picker
                show-toolbar
                :columns="selectProductOption"
                @cancel="showCategoryPicker = false"
                @confirm="onSelectProductChange"
                value-key="text"
                :confirm-button-text="this.$t('pmt.confirmButton')"
                :cancel-button-text="this.$t('pmt.cancelButton')"
              />
            </van-popup>

            <van-field
              :label="this.$t('pmt.incentiveDetail.subCategory')"
              input-align="right"
              label-width="120px"
              :colon="false"
              v-model="formData.new_sub_category_name"
              is-link
              readonly
              @click="showSubCategoryPicker = true"
              :rules="[]"
            >
            </van-field>

            <van-popup v-model="showSubCategoryPicker" position="bottom" round>
              <van-picker
                show-toolbar
                :columns="selectSubOption"
                @cancel="showSubCategoryPicker = false"
                @confirm="onSelectSubChange"
                value-key="text"
                :confirm-button-text="this.$t('pmt.confirmButton')"
                :cancel-button-text="this.$t('pmt.cancelButton')"
              />
            </van-popup>

            <van-field
              v-model="formData.new_is_mh_name"
              is-link
              readonly
              :label="this.$t('pmt.retail.mhModel')"
              @click="showMhModelPicker = true"
              input-align="right"
              label-width="120px"
              :rules="[]"
            />

            <van-popup v-model="showMhModelPicker" position="bottom" round>
              <van-picker
                show-toolbar
                :columns="complaintOptions"
                @cancel="showMhModelPicker = false"
                @confirm="handleMhModelPicker"
                value-key="text"
                :confirm-button-text="this.$t('pmt.confirmButton')"
                :cancel-button-text="this.$t('pmt.cancelButton')"
              />
            </van-popup>

            <van-cell
              :title="this.$t('pmt.retail.StartSubmittedDate')"
              :value="formData.new_start_submit_date"
              @click="showCalenderStart = true"
            />

            <van-cell
              :title="this.$t('pmt.retail.EndSubmittedDate')"
              :value="formData.new_end_submit_date"
              @click="showCalenderSEnd = true"
            />

            <van-field
              name="radio"
              :label="this.$t('pmt.retail.SalesAmount')"
              label-width="120px"
            >
              <template #input>
                <van-field
                  v-model="formData.new_sales_amount_from"
                  label=""
                  placeholder="0"
                  label-width="15px"
                />
                <van-field
                  v-model="formData.new_sales_amount_to"
                  label=""
                  placeholder="Max"
                  label-width="15px"
                />
              </template>
            </van-field>

            <div class="bottombutton">
              <van-col span="12">
                <van-button
                  class="button"
                  native-type="submit"
                  type="info"
                  style="background: #4d72ac; width: 100%"
                  >{{ this.$t("pmt.okButton") }}</van-button
                >
              </van-col>
              <van-col span="12">
                <van-button
                  class="button"
                  native-type="button"
                  type="info"
                  style="background: #4d72ac; width: 100%"
                  @click="onclickReset"
                  >{{ this.$t("pmt.reset") }}</van-button
                >
              </van-col>
            </div>
          </div>
        </van-form>
      </van-popup>

      <div class="infog-card form-group">
        <van-tabs
          v-model="selectedStatus"
          @change="onChangeStatus"
          @load="loading"
        >
          <van-tab :name="1" :title="this.$t('pmt.retail.Draft')">
            <br />
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              class="list-container"
              :finished-text="$t('pmt.retail.NoMoreData')"
            >
              <RetailCard
                v-for="rt in filteredRetailList"
                type="detail"
                :key="rt.peta_rn"
                :detail="rt"
                @handleRouter="handleRouter"
                @onChangeStatus="onChangeStatus"
              />
            </van-list>
          </van-tab>
          <van-tab
            :name="2"
            :title="this.$t('pmt.retail.Submitted')"
            @load="loading"
          >
            <br />
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              class="list-container"
              :finished-text="$t('pmt.retail.NoMoreData')"
            >
              <RetailCard
                v-for="rt in filteredRetailList"
                type="detail"
                :key="rt.peta_rn"
                :detail="rt"
                @handleRouter="handleRouter"
                @onChangeStatus="onChangeStatus"
              />
            </van-list>
          </van-tab>
          <van-tab
            :name="3"
            :title="this.$t('pmt.retail.Approved')"
            @load="loading"
          >
            <br />
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              class="list-container"
              :finished-text="$t('pmt.retail.NoMoreData')"
            >
              <RetailCard
                v-for="rt in filteredRetailList"
                type="detail"
                :key="rt.peta_rn"
                :detail="rt"
                @handleRouter="handleRouter"
                @onChangeStatus="onChangeStatus"
              />
            </van-list>
          </van-tab>
          <van-tab
            :name="4"
            :title="this.$t('pmt.retail.Rejected')"
            @load="loading"
          >
            <br />
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              class="list-container"
              :finished-text="$t('pmt.retail.NoMoreData')"
            >
              <RetailCard
                v-for="rt in filteredRetailList"
                type="detail"
                :key="rt.peta_rn"
                :detail="rt"
                @handleRouter="handleRouter"
                @onChangeStatus="onChangeStatus"
              />
            </van-list>
          </van-tab>
        </van-tabs>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
    </van-form>
  </div>
</template>
<script>
import Vue from "vue";
import { Overlay } from "vant";
import TopBar from "@/components/TopBar";
import { getShopSelectData } from "../../../api/giftRegistration";
import RetailCard from "./components/RetailCard";
import { getretaillistpage } from "../../../api/retail";
import { getPmtSelectData } from "../../../api/common";

Vue.use(Overlay);
export default {
  name: "home",
  components: {
    RetailCard,
    TopBar,
  },
  computed: {},
  data() {
    return {
      formData: {
        // searchKey: "",
        new_shop_name: "",
        new_shop_id: "",
        new_invoice_code: "",
        new_is_complaint: null,
        new_is_complaint_name: "",
        new_category_id: "",
        new_sub_category_id: "",
        new_is_mh: null,
        new_start_submit_date: null,
        new_end_submit_date: null,
        new_sales_amount_from: null,
        new_sales_amount_to: null,
        new_model_name: "", // 仅用于显示
        new_category_name: "", // 仅用于显示
        new_sub_category_name: "", // 仅用于显示
        new_is_mh_name: "", // 仅用于显示
        new_start_submit_date_obj: null,
        new_end_submit_date_obj: null,
      },
      showShopPicker: false,
      retailList: [],
      filteredRetailList: [],
      page: 1,
      page_size: 10,
      shopPermissionOptions: [],
      loading: false,
      finished: false,
      selectedStatus: 1,
      showFilters: false,
      showComplaintPicker: false,
      complaintOptions: [
        { id: "Yes", text: "Yes", key: true },
        { id: "No", text: "No", key: false },
      ],
      selectProductOption: [],
      selectSubOption: [],
      showCategoryPicker: false,
      showSubCategoryPicker: false,
      showMhModelPicker: false,
      showCalenderStart: false,
      showCalenderSEnd: false,
      quickSearchKey: "",
      minDate: new Date("2021-01-01"), //设定日期最早日期

      searchShopKey: "",
      baseShopOption:[],
    };
  },

  beforeCreate() {
    // this.getOptions(); //下拉框数据
  },
  mounted() {},
  methods: {
    getOptions() {
      this.shopPermissionOptions = [];
      this.baseShopOption = []
      getShopSelectData().then((res) => {
        if (res.success === true) {
          const resShop = res.data.shopPermission;
          this.shopPermissionObjects = resShop;
          resShop.forEach((element) => {
            const thiselement = {};
            thiselement.Id = element.new_shop_id;
            thiselement.text = element.new_shop_name;
            this.shopPermissionOptions.push(thiselement);
            this.baseShopOption.push(thiselement);
          });
          if (this.shopPermissionOptions.length > 0) {
            this.selectedShopId(this.shopPermissionOptions[0]);
          } else {
            this.$toast.fail(this.$t("pmt.retail.noPermission"));
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        }
      });

      const paramsProduct = {
        entityName: "new_product_category",
        fields: "new_product_categoryid,new_name_en",
        where: "and new_parentid is null and new_status=0",
      };
      getPmtSelectData(paramsProduct)
        .then((res) => {
          // eslint-disable-next-line no-empty
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data === "") {
              return;
            }
            const resBranch = res.data;
            resBranch.forEach((element) => {
              const thiselement = {};
              thiselement.id = element.new_product_categoryid;
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
    //选择shop id
    selectedShopId(value) {
      this.formData.new_shop_id = value.Id;
      this.formData.new_shop_name = value.text;
      this.showShopPicker = false;
      this.page = 1;
      this.retailList = [];
      this.initRetailList({ page: this.page++ });
    },
    topBarClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      if (this.shopPermissionOptions.length === 0) {
        this.getOptions();
      } else {
        this.initRetailList({ page: this.page++ });
      }
    },
    initRetailList(param = {}, refresh = false) {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getretaillistpage(
        Object.assign(
          {
            itemsperpage: this.page_size,
            page: this.page,
            new_shop_id: this.formData.new_shop_id,
            new_approve_status: this.selectedStatus,
            new_invoice_code: this.formData.new_invoice_code,
            new_is_complaint: this.formData.new_is_complaint,
            new_category_id: this.formData.new_category_id,
            new_sub_category_id: this.formData.new_sub_category_id,
            new_is_mh: this.formData.new_is_mh,
            new_start_submit_date: this.formData.new_start_submit_date,
            new_end_submit_date: this.formData.new_end_submit_date,
            new_sales_amount_start: this.formData.new_sales_amount_from,
            new_sales_amount_end: this.formData.new_sales_amount_to,
            new_model_name: this.formData.new_model_name,
          },
          param
        )
      )
        .then((res) => {
          //  
          this.loading = false;
          const { success, data } = res;
          if (success && data.Items) {
            this.$toast.clear();
            // && data.Items.length > 0
            this.retailList = refresh
              ? data.Items
              : [...this.retailList, ...data.Items];
            console.log("data.Items.length():" + data.Items.length);
            console.log("this.page_size:" + this.page_size);
            console.log(
              "res.Items.length !== this.page_size;:",
              data.Items.length !== this.page_size
            );
            this.finished = data.Items.length !== this.page_size;
            this.getFilteredRetailList();
          } else {
            this.finished = true;
            this.$toast.clear();
          }
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
          this.finished = true;
          this.$toast.clear();
        })
        .finally(() => {});
    },
    onSubmit() {},
    searchKey() {},
    onChangeStatus() {
      // this.loading = true;
      console.log(this.selectedStatus);
      this.retailList = [];
      this.filteredRetailList = [];
      this.page = 1;
      this.initRetailList({ page: this.page++ });
    },
    topBarClickRight() {
      this.showFilters = true;
    },
    handleComplaintPicker(value) {
      this.formData.new_is_complaint = value.key;
      this.formData.new_is_complaint_name = value.id;
      this.showComplaintPicker = false;
    },
    onSelectProductChange(value) {
      this.formData.new_category_id = value.id;
      this.formData.new_category_name = value.text;
      this.showCategoryPicker = false;
      this.formData.new_sub_category_id = null;
      this.selectSubOption = [];
      if (
        this.formData.new_category_id === "" ||
        this.formData.new_category_id === undefined ||
        this.formData.new_category_id === null
      )
        return false;
      const params = {
        entityName: "new_product_category",
        fields: "new_product_categoryid,new_name_en",
        where:
          "and new_parentid ='" +
          this.formData.new_category_id +
          "' and new_status=0",
      };
      getPmtSelectData(params)
        .then((res) => {
          // eslint-disable-next-line no-empty
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data === "") {
              return;
            }
            const resBranch = res.data;
            resBranch.forEach((element) => {
              const thiselement = {};
              thiselement.id = element.new_product_categoryid;
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
    },
    onSelectSubChange(value) {
      this.formData.new_sub_category_id = value.id;
      this.formData.new_sub_category_name = value.text;
      this.showSubCategoryPicker = false;
    },
    handleMhModelPicker(value) {
      this.formData.new_is_mh = value.key;
      this.formData.new_is_mh_name = value.id;
      this.showMhModelPicker = false;
    },
    onConfirmStartDate() {
      // console.log(value);
      this.formData.new_start_submit_date =
        this.formData.new_start_submit_date_obj.getFullYear() +
        "-" +
        (this.formData.new_start_submit_date_obj.getMonth() + 1) +
        "-" +
        this.formData.new_start_submit_date_obj.getDate();
      this.showCalenderStart = false;
    },
    onConfirmEndDate() {
      this.formData.new_end_submit_date =
        this.formData.new_end_submit_date_obj.getFullYear() +
        "-" +
        (this.formData.new_end_submit_date_obj.getMonth() + 1) +
        "-" +
        this.formData.new_end_submit_date_obj.getDate();
      this.showCalenderSEnd = false;
    },
    onSubmitFilters() {
      // this.loading = true;
      console.log(this.selectedStatus);
      this.retailList = [];
      this.page = 1;
      this.initRetailList({ page: this.page++ });
      this.showFilters = false;
    },
    onclickReset() {
      // this.formData = {}
      this.formData.new_invoice_code = "";
      this.formData.new_is_complaint = null;
      this.formData.new_is_complaint_name = "";
      this.formData.new_category_id = "";
      this.formData.new_sub_category_id = "";
      this.formData.new_is_mh = null;
      this.formData.new_start_submit_date = null;
      this.formData.new_end_submit_date = null;
      this.formData.new_sales_amount_from = null;
      this.formData.new_sales_amount_to = null;
      this.formData.new_model_name = "";
      this.formData.new_category_name = "";
      this.formData.new_sub_category_name = "";
      this.formData.new_is_mh_name = "";
    },
    getFilteredRetailList() {
       ;
      // console.log(`1`);
      if (!this.retailList || this.retailList.length === 0) {
        this.filteredRetailList = this.retailList;
        return;
      }
      // console.log(`2`);
      console.log(this.retailList);
      if (!this.quickSearchKey || this.quickSearchKey === "") {
        this.filteredRetailList = this.retailList;
        return;
      }
      // console.log(`3`);
      this.filteredRetailList = [];
      for (const i in this.retailList) {
        if (this.retailList[i].new_retail_code.includes(this.quickSearchKey)) {
          this.filteredRetailList.push(this.retailList[i]);
        }
      }
      this.$forceUpdate();
      // console.log(`4`);
    },
    handleRouter(item) {
      console.log("handleRouter", item);
      if (!item || !item.new_approve_status || !item.new_submit_type) return;
      //  
      console.log(item.new_submit_type);
      switch (item.new_submit_type) {
        case 1:
          if (item.new_approve_status === 1 || item.new_approve_status === 4)
            this.$router.push({
              name: "retailSubmit",
              params: { retailId: item.new_retailId, pageType: 2 },
            });
          else
            this.$router.push({
              name: "retailSubmit",
              params: { retailId: item.new_retailId, pageType: 3 },
            });
          break;
        case 2:
          if (item.new_approve_status === 1 || item.new_approve_status === 4)
            this.$router.push({
              name: "retailBarcode",
              params: { retailId: item.new_retailId, pageType: 2 },
            });
          else
            this.$router.push({
              name: "retailBarcode",
              params: { retailId: item.new_retailId, pageType: 3 },
            });
          break;
        case 3:
          console.log(item.new_approve_status);
          if (item.new_approve_status === 1 || item.new_approve_status === 4)
            this.$router.push({
              name: "retailInvoice",
              params: { retailId: item.new_retailId, pageType: 2 },
            });
          else
            this.$router.push({
              name: "retailInvoice",
              params: { retailId: item.new_retailId, pageType: 3 },
            });
          break;
      }
    },

    //联想搜索
    changeShopKey() {
      //  ;
      this.shopPermissionOptions = [];
      for (const i in this.baseShopOption) {
        if (
          this.baseShopOption[i].text
            .toLowerCase()
            .indexOf(this.searchShopKey.toLowerCase()) >= 0
        ) {
          this.shopPermissionOptions.push(
            this.baseShopOption[i]
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
<style type="text/css"></style>
