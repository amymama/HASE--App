<template>
  <van-popup
    v-model="visible"
    position="right"
    :style="{
      height: '100%',
      width: '100%',
    }"
  >
    <div class="flex-layout">
      <div class="flex-layout__header">
        <van-nav-bar
          title="Model Filter"
          left-arrow
          @click-left="visible = false"
        />
      </div>
      <div class="flex-layout__body">
        <div class="filter-visit">
          <van-form label-width="3.7rem">
            <van-field
              is-link
              readonly
              clickable
              input-align="right"
              :value="new_model_type_filter_text"
              label="GTM Model Type"
              @click="showType = true"
            />
            <van-field
              is-link
              readonly
              clickable
              input-align="right"
              :value="new_mdm_delisted_text"
              label="MDM Status"
              @click="showStatus = true"
            />
            <van-field
              is-link
              readonly
              clickable
              input-align="right"
              :value="new_mdm_brand_name_text"
              label="MDM Brand"
              @click="showBrand = true"
            />
            <van-field
              is-link
              readonly
              clickable
              input-align="right"
              :value="new_product_category_text"
              label="Sub-category"
              @click="showSubcategory = true"
            />
            <van-field
              is-link
              readonly
              clickable
              input-align="right"
              :value="ispop_text"
              label="POP"
              @click="showPOP = true"
            />
            <van-field
              is-link
              readonly
              clickable
              input-align="right"
              :value="isoos_text"
              label="OOS"
              @click="showOOS = true"
            />
          </van-form>
        </div>
      </div>
      <div class="flex-layout__footer">
        <van-row>
          <van-col span="12">
            <van-button block square color="#407FDC" @click="handleReset">
              Reset
            </van-button>
          </van-col>
          <van-col span="12">
            <van-button block square color="#2058AB" @click="handleSubmit">
              {{ $t("shopCommon.Submit") }}
            </van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- MODALS -->
    <!-- Filter type -->
    <van-popup v-model="showType" round position="bottom">
      <van-picker
        title="Select GTM Model Type"
        show-toolbar
        :columns="typeList"
        @confirm="onConfirmType"
        @cancel="showType = false"
      />
    </van-popup>
    <!-- Filter status -->
    <van-popup v-model="showStatus" round position="bottom">
      <van-picker
        title="Select GTM Status"
        show-toolbar
        :columns="statusList"
        @confirm="onConfirmStatus"
        @cancel="showStatus = false"
      />
    </van-popup>
    <!-- Filter brand -->
    <van-popup v-model="showBrand" round position="bottom">
      <van-picker
        title="Select GTM brand"
        show-toolbar
        :columns="brandList"
        @confirm="onConfirmBrand"
        @cancel="showBrand = false"
      />
    </van-popup>
    <!-- SUB CATEGORY -->
    <van-popup v-model="showSubcategory" round position="bottom">
      <van-picker
        title="Select"
        show-toolbar
        :columns="subCateList"
        @confirm="onConfirmSubcategory"
        @cancel="showSubcategory = false"
      />
    </van-popup>
    <!-- POS -->
    <van-popup v-model="showPOP" round position="bottom">
      <van-picker
        title="Select"
        show-toolbar
        :columns="pop_oos_list"
        @confirm="onConfirmPOP"
        @cancel="showPOP = false"
      />
    </van-popup>
    <!-- OOS -->
    <van-popup v-model="showOOS" round position="bottom">
      <van-picker
        title="Select"
        show-toolbar
        :columns="pop_oos_list"
        @confirm="onConfirmOOS"
        @cancel="showOOS = false"
      />
    </van-popup>
  </van-popup>
</template>

<script>
import { getDict } from "@/api/common";

export default {
  name: "FilterModel",
  props: {
    currentCategory: {
      type: Object,
      require: true
    },
  },
  data() {
    return {
      visible: false,
      // form
      showType: false,
      showStatus: false,
      showBrand: false,
      showOOS: false,
      showPOP: false,
      showSubcategory: false,
      pop_oos_list: [
        { text: "ALL", value: "" },
        { text: "YES", value: "1" },
        { text: "NO", value: "0" }
      ],
      statusList: [
        { text: "ALL", value: "" },
        { text: "Continue", value: "0" },
        { text: "Discontinue", value: "1" }
      ],
      brandList: [
        { text: "ALL", value: "" },
        { text: "H", value: "HAIER" }
      ],
      form: {
        new_model_type_filter: "",
        new_mdm_delisted: "",
        new_mdm_brand_name: "",
        new_product_category: '',
        isoos: '',
        ispop: '',
      },
      // select values
      new_model_type_filter_text: "",
      new_mdm_delisted_text: "",
      new_mdm_brand_name_text: "",
      new_product_category_text: '',
      isoos_text: '',
      ispop_text: '',
      // list
      typeList: [],
      subCateList: []
    };
  },
  watch: {
    currentCategory: {
      handler(newValue) {
        this.getSubcategory(newValue);
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    // SHOW MODAL
    show() {
      this.visible = true;
      this.initData();
    },
    reset() {
      this.form = {
        new_model_type_filter: "",
        new_mdm_delisted: "",
        new_mdm_brand_name: "",
        new_product_category: '',
        isoos: '',
        ispop: '',
      }
      this.new_model_type_filter_text = ""
      this.new_mdm_delisted_text = ""
      this.new_mdm_brand_name_text = ""
      this.new_product_category_text = ''
      this.isoos_text = ''
      this.ispop_text = ''
    },
    // get subcategory list
    getSubcategory (currentCate) {
      this.subCateList = []
      if (currentCate && currentCate.subList.length > 0) {
        currentCate.subList.map((item) => {
          this.subCateList.push({
            value: item.new_product_category_id,
            text: item.new_name_en
          })
        })
        this.subCateList.unshift({ text: "ALL", value: "" });
      }
    },
    // Init data for shop
    initData() {
      // SHOP TYPE
      const getType = new Promise((resolve, reject) => {
        getDict({ key: "ModelType" })
          .then((res) => {
            const { data, success } = res;
            if (success) {
              this.typeList = data.Items;
              this.typeList.unshift({ text: "ALL", value: "" });
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });
      this.$toast.loading({ duration: 0, forbidClick: true });
      Promise.all([getType])
        .then(() => {
          this.$toast.clear();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // confirm type
    onConfirmType(record) {
      this.form.new_model_type_filter = record.value;
      this.new_model_type_filter_text = record.text;
      this.showType = false;
    },
    // confirm status
    onConfirmStatus(record) {
      this.form.new_mdm_delisted = record.value;
      this.new_mdm_delisted_text = record.text;
      this.showStatus = false;
    },
    // confirm brand
    onConfirmBrand(record) {
      this.form.new_mdm_brand_name = record.value;
      this.new_mdm_brand_name_text = record.text;
      this.showBrand = false;
    },
    // get subcategory
    onConfirmSubcategory (record) {
      this.form.new_product_category = record.value
      this.new_product_category_text = record.text
      this.showSubcategory = false
    },
    // confirm POP
    onConfirmPOP(record) {
      this.form.ispop = record.value;
      this.ispop_text = record.text
      this.showPOP = false;
    },
    // confirm OOS
    onConfirmOOS(record) {
      this.form.isoos = record.value;
      this.isoos_text = record.text
      this.showOOS = false;
    },
    // filter submit
    handleSubmit() {
      this.$emit("ok", this.form);
      this.visible = false;
    },
    // filter reset
    handleReset() {
      // reset filter value
      this.reset()
      this.$emit("ok", this.form);
      this.visible = false;
    },
  },
};
</script>