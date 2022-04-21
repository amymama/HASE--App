<template>
  <div class="add-container">
    <SelectShopRow
      :disabled="disabled"
      :shopItem="shopItem"
      v-show="selectShopVisible"
      @select="handleShopSelect"
    />
    <van-form
      ref="form"
      class="form-container"
      :class="{
        'form-container_edit': !disabled,
      }"
      validate-trigger="onSubmit"
    >
      <van-cell-group title="Basic">
        <van-field
          input-align="right"
          :placeholder="`${$t('select.SelectTip')} ${$t(
            'shopPromotion.Brand'
          )}`"
          :value="queryParam.new_competitorname"
          readonly
          :disabled="disabled"
          clickable
          :label="$t('shopPromotion.Brand')"
          @click="!disabled && showPopup('brand')"
          :rules="[
            {
              required: true,
              message: `${$t('select.SelectTip')} ${$t('shopPromotion.Brand')}`,
            },
          ]"
        ></van-field>
        <!-- brand -->
        <van-popup v-model="brandVisible" round position="bottom">
          <van-picker
            show-toolbar
            :title="`${$t('select.SelectTip')} ${$t('shopPromotion.Brand')}`"
            :columns="brandOpts"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            @cancel="brandVisible = false"
            @confirm="(item) => handleConfirm('brand', item)"
          ></van-picker>
        </van-popup>
        <van-field
          :placeholder="`${$t('select.SelectTip')} ${$t(
            'shopPromotion.PromotionType'
          )}`"
          label-width="10em"
          input-align="right"
          :value="promotion"
          readonly
          clickable
          :disabled="disabled"
          :label="$t('shopPromotion.PromotionType')"
          @click="!disabled && showPopup('promotion')"
          :rules="[
            {
              required: true,
              message: `${$t('select.SelectTip')} ${$t(
                'shopPromotion.PromotionType'
              )}`,
            },
          ]"
        ></van-field>
        <!-- promotionType -->
        <van-popup v-model="promotionVisible" round position="bottom">
          <van-picker
            show-toolbar
            title="Select Promotion Type"
            :columns="promotionOpts"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            @cancel="promotionVisible = false"
            @confirm="(item) => handleConfirm('promotion', item)"
          ></van-picker>
        </van-popup>
        <van-field
          v-model="queryParam.new_program"
          input-align="right"
          :placeholder="`${$t('select.InputTip')} ${$t(
            'shopPromotion.Program'
          )}`"
          clickable
          :disabled="disabled"
          :label="$t('shopPromotion.Program')"
          :rules="[
            {
              required: true,
              message: `${$t('select.InputTip')} ${$t(
                'shopPromotion.Program'
              )}`,
            },
          ]"
        ></van-field>
        <van-field
          :value="dateRange"
          clickable
          input-align="right"
          readonly
          :disabled="disabled"
          :placeholder="`${$t('select.SelectTip')} ${$t(
            'shopPromotion.ActivePeriod'
          )}`"
          :label="$t('shopPromotion.ActivePeriod')"
          @click="!disabled && showPopup('date')"
          :rules="[
            {
              required: true,
              message: `${$t('select.SelectTip')} ${$t(
                'shopPromotion.ActivePeriod'
              )}`,
            },
          ]"
        ></van-field>
        <van-calendar
          v-model="dateVisible"
          type="range"
          :min-date="new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000)"
          :default-date="[new Date()]"
          color="#4671d5"
          @confirm="dateConfirm"
        />
        <van-field
          v-model="queryParam.new_content"
          input-align="right"
          :placeholder="`${$t('select.InputTip')} ${$t(
            'shopPromotion.Content'
          )}`"
          :label="$t('shopPromotion.Content')"
          :disabled="disabled"
          type="textarea"
          :rules="[
            {
              required: true,
              message: `${$t('select.InputTip')} ${$t(
                'shopPromotion.Content'
              )}`,
            },
          ]"
        ></van-field>
      </van-cell-group>

      <van-cell-group
        :title="$t('shopPromotion.Models')"
        class="model-container"
        :class="{ 'model-error': modelError }"
      >
        <van-row type="flex" class="model-header">
          <van-col :span="6">
            <span class="model-header_model">{{
              $t("shopPromotion.Model")
            }}</span>
            <van-icon
              v-if="!disabled"
              name="add"
              @touchstart="addModel"
            ></van-icon>
          </van-col>
          <van-col :span="6">{{ $t("shopPromotion.Category") }}</van-col>
          <van-col :span="4"></van-col>
          <van-col :span="4" style="font-size: 12px">{{
            $t("shopPromotion.Price")
          }}</van-col>
          <van-col :span="4"></van-col>
        </van-row>
        <van-row
          class="model-body"
          type="flex"
          align="center"
          v-for="(model, index) in modelList"
          :key="model.new_model_id || index"
        >
          <van-col :span="6">
            <span>{{ model.new_model_name }}</span>
            <van-icon
              v-if="!disabled && !isAQUA"
              name="edit"
              style="float: right"
              @touchstart="editName(model)"
            ></van-icon>
          </van-col>
          <van-col :span="6">
            <span v-if="isAQUA">{{ model.new_sub_category_name || "/" }}</span>
            <span v-else>{{ model.new_category_name || "/" }}</span>
            <van-icon
              v-if="!disabled && !isAQUA"
              name="edit"
              style="float: right"
              @click="showPopup('category')"
            ></van-icon>
            <van-popup
              v-if="!isAQUA"
              v-model="categoryVisible"
              round
              position="bottom"
            >
              <van-picker
                show-toolbar
                :title="`${$t('select.SelectTip')} ${$t(
                  'shopMenu.Product'
                )} ${$t('shopPromotion.Category')}`"
                :columns="categoryOpts"
                confirm-button-text="confirm"
                cancel-button-text="cancel"
                @cancel="categoryVisible = false"
                @confirm="(item) => handleConfirm('category', item, model)"
              ></van-picker>
            </van-popup>
          </van-col>
          <van-col :span="4">
            <span v-if="isAQUA">{{ model.new_category_name || "/" }}</span>
          </van-col>
          <van-col :span="4">
            <span>{{ model.new_price }}</span>
            <van-icon
              v-if="!disabled"
              name="edit"
              style="float: right"
              @touchstart="editPrice(model)"
            ></van-icon>
          </van-col>
          <van-col :span="4">
            <van-button
              v-if="!disabled"
              type="info"
              size="mini"
              round
              icon="delete-o"
              @touchstart="delModel(model, index)"
            ></van-button>
          </van-col>
        </van-row>
        <p class="list-none" v-if="modelList.length === 0">No More Data</p>
        <SelectProduct v-model="productVisible" @select="handleProductSelect" />
      </van-cell-group>
      <van-cell-group :title="$t('shopPromotion.Conlcusionfeedback')">
        <van-field
          v-model="queryParam.new_conslusion"
          :disabled="disabled"
          type="textarea"
          :placeholder="`${$t('select.InputTip')} ${$t(
            'shopPromotion.Conlcusionfeedback'
          )}`"
        ></van-field>
      </van-cell-group>
      <van-field
        v-model="fileSuccess"
        :disabled="disabled"
        :rules="[{ required: true, message: $t('select.UploadImage') }]"
      >
        <template #input>
          <UploadImgs
            folder="promotion"
            prefix="PRM"
            :max="4"
            :disabled="disabled"
            :fileList="fileList"
            :walletText="walletText"
            :hasWallet="true"
            @fileUploadOk="handleUpload"
            @fileDelete="handleFileDelete"
          />
        </template>
      </van-field>
    </van-form>
    <van-row :gutter="12" class="action-container" v-if="!disabled">
      <van-col :span="12">
        <van-button
          :loading="loading"
          round
          block
          type="info"
          @click="handleSubmit(2)"
          >Save</van-button
        >
      </van-col>
      <van-col :span="12">
        <van-button
          :loading="loading"
          round
          block
          type="info"
          @click="handleSubmit(0)"
          >Submit</van-button
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
import moment from "moment";
import SelectShopRow from "@/components/SelectShop";
import UploadImgs from "@/components/UploadImgs";
import SelectProduct from "@/components/SelectProduct";
import { getShopList } from "@/api/shop";
import { getProductCategory } from "@/api/product";
import {
  getBrand,
  postAddPromotion,
  getPromotionDetail,
} from "@/api/promotion";
import { getDict } from "@/api/common";
export default {
  props: {
    type: {
      type: String,
      default: "", // 接收页面参数 new_status对应的操作 可选值  edit  detail
    },
    id: {
      type: String,
      default: "", // 接收页面参数 在编辑和查看详情时使用
    },
  },
  components: {
    SelectShopRow,
    SelectProduct,
    UploadImgs,
  },
  data() {
    return {
      fileSuccess: "success",
      loading: false,
      modelError: false,
      productVisible: false,
      brandVisible: false,
      promotionVisible: false,
      dateVisible: false,
      categoryVisible: false,
      shopItem: {},
      queryParam: {
        new_start_time: void 0,
        new_end_time: void 0,
        new_competitorname: void 0,
        new_promotion_type: void 0,
      },
      walletText: [],
      modelList: [], // 用户选中Model
      fileList: [],
      brandOpts: [], // {text,value}
      promotionOpts: [], // {text,value}
      categoryOpts: [], // {text,value}
    };
  },
  created() {
    this.init();
  },
  computed: {
    promotion() {
      const promotion = this.promotionOpts.find(
        (item) => item.value === this.queryParam.new_promotion_type
      );
      return promotion && promotion.text;
    },
    dateRange() {
      const { new_start_time, new_end_time } = this.queryParam;

      return new_start_time && new_end_time
        ? `${new_start_time} / ${new_end_time}`
        : "";
    },
    modelSelect() {
      return this.modelList.length > 0 ? "select" : "";
    },
    editable() {
      return this.type === "edit";
    },
    disabled() {
      return this.type === "detail";
    },
    selectShopVisible() {
      return Object.keys(this.shopItem).length > 0;
    },
    isAQUA() {
      return this.queryParam.new_competitorname === "AQUA";
    },
  },
  methods: {
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });

      // @todo
      const initDetail = this.type ? this.initDetail : () => Promise.resolve();
      const initShop = () => {
        const {
          new_shopid,
          subchannel,
          new_code,
          new_address,
          new_name,
          new_channel_name,
          branchname,
          new_customer_code,
          customername,
        } = this.$route.query;
        if (new_shopid) {
          this.shopItem = {
            new_shopid,
            subchannel,
            new_code,
            new_address,
            new_name,
            new_channel_name,
            branchname,
            new_customer_code,
            customername,
          };
          this.walletText = [new_code, new_name];
          return Promise.resolve();
        } else {
          return this.type ? () => Promise.resolve() : this.initShop();
        }
      };

      Promise.all([
        initDetail(),
        initShop(),
        this.initBrand(),
        this.initPromotionType(),
        this.initProductCategory(),
      ])
        .then(() => toast.clear())
        .catch(() => toast.clear());
    },
    initShop() {
      return getShopList({
        itemsperpage: 10,
        page: 1,
        orderby: "desc",
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { length } = data.Items;
            const randomIndex = Math.floor(Math.random() * length);
            this.shopItem = data.Items[randomIndex];
            const { new_name, new_code } = this.shopItem;
            this.walletText = [new_code, new_name];
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initBrand() {
      return getBrand()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.forEach((brand) => {
              this.brandOpts.push({ text: brand, value: brand });
            });
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initPromotionType() {
      return getDict({ key: "PromotionType" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.Items.forEach((promotion) => {
              const { text, value } = promotion;
              this.promotionOpts.push({
                text,
                value,
              });
            });
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initDetail() {
      return getPromotionDetail({ new_promotionsId: this.id })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const {
              new_competitorname,
              new_program,
              new_content,
              new_conslusion,
              promotion_pictures,
              new_start_time,
              new_end_time,
              new_promotion_type,
              models,
              shop_code,
              shop_name,
              new_shop_id,
              new_channel_name,
              new_customer_code,
            } = data;
            this.modelList = models;
            this.fileList = promotion_pictures;
            // this.fileSuccess = this.fileList.length === 0 ? "" : "success";
            this.queryParam.new_competitorname = new_competitorname;
            this.queryParam.new_program = new_program;
            this.queryParam.new_content = new_content;
            this.queryParam.new_conslusion = new_conslusion;
            this.queryParam.new_start_time = moment(
              new Date(new_start_time)
            ).format("YYYY-MM-DD");
            this.queryParam.new_end_time = moment(
              new Date(new_end_time)
            ).format("YYYY-MM-DD");
            this.queryParam.new_promotion_type = new_promotion_type;
            this.shopItem = {
              new_name: shop_name,
              new_code: shop_code,
              new_customer_code,
              new_channel_name,
              new_shopid: new_shop_id,
            };
            const { new_name, new_code } = this.shopItem;
            this.walletText = [new_code, new_name];
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    // 在brand不为AQUA时获取产品大类
    initProductCategory() {
      return getProductCategory()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.Items.forEach((item) => {
              this.categoryOpts.push({
                text: item.new_name_en,
                value: item.new_name_en,
              });
            });
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    handleShopSelect(shop) {
      this.shopItem = shop;
    },
    handleProductSelect(product) {
      const index = this.modelList.find(
        (item) => item.new_model_id === product.new_modelId
      );
      if (index > -1) {
        return;
      }
      this.modelList.push({
        new_model_id: product.new_modelId,
        new_category_name: product.categorynameen,
        new_sub_category_name: product.categorynameen,
        new_model_name: product.model_name,
        new_price: void 0,
      });
      this.checkModel();
    },
    /**
     * @param {number} type 表示当前操作类型 2 draft 0 submit
     */
    async handleSubmit(type) {
      const actionText = type === 0 ? "Submit" : this.$t("shopStatus.Draft");
      try {
        await this.checkModel();
        await this.$refs.form.validate();
        // modelList参数处理
        this.queryParam.models = this.modelList;
        // 图片参数处理
        this.queryParam.promotion_pictures = [];
        this.queryParam.promotion_pictures = this.fileList;
        this.queryParam.new_shop_id = this.shopItem.new_shopid;
        this.queryParam.new_status = type;
        if (this.type) this.queryParam.new_promotionsId = this.id;
        this.loading = true;
        postAddPromotion(this.queryParam)
          .then((res) => {
            this.loading = false;
            const { success } = res;
            if (success) {
              this.$router.go(-1);
              this.$toast.success(`${actionText} Success`);
            } else {
              this.$toast.fail(`${actionText} Error`);
            }
          })
          .catch(() => {
            this.loading = false;
            this.$toast.fail(`${actionText} Error`);
          });
      } catch (err) {
        console.log("validate error", err);
      }
    },
    handleUpload(file) {
      this.fileSuccess = "success";
      this.fileList.push({
        new_download_url: file.url,
        new_keyword: "",
        new_description: "",
        new_type: "",
        new_filename: file.name,
        new_filesize: 0,
      });
    },
    handleFileDelete(index) {
      this.fileList.splice(index, 1);
      this.fileSuccess = this.fileList.length > 0 ? "success" : "";
    },
    /**
     * @param {string} type 当前操作类型
     * @param {object} item 选中的item
     * @param {model} 操作的model 仅在选择model category时使用
     */
    handleConfirm(type, item, model) {
      let value, key;
      switch (type) {
        case "brand":
          key = "new_competitorname";
          value = item.value;
          this.modelList.splice(0);
          this.modelError = false;
          break;
        case "promotion":
          key = "new_promotion_type";
          value = item.value;
          break;
        case "category":
          model.new_category_name = item.value;
          this[`${type}Visible`] = false;
          return;
        default:
          return;
      }
      this[`${type}Visible`] = false;
      this.queryParam[key] = value;
    },
    addModel() {
      if (this.isAQUA) {
        this.showPopup("product");
      } else {
        if (this.queryParam.new_competitorname) {
          this.modelList.push({
            new_model_id: "",
            new_category_name: void 0,
            new_sub_category_name: void 0,
            new_model_name: void 0,
            new_price: void 0,
          });
        } else {
          this.$toast.fail(
            `${this.$t("select.SelectTip")} ${this.$t("shopPromotion.Brand")}`
          );
        }
      }
    },
    dateConfirm(dateRange) {
      this.queryParam.new_start_time = moment(dateRange[0]).format(
        "YYYY-MM-DD"
      );
      this.queryParam.new_end_time = moment(dateRange[1]).format("YYYY-MM-DD");
      this.dateVisible = false;
    },
    showPopup(type) {
      this[`${type}Visible`] = true;
    },
    editName(model) {
      this.$inputText({ searchModelFlag: !this.isAQUA })
        .then((value) => {
          console.log(this.isAQUA);
          if (!this.isAQUA) {
            if (typeof value === "object") {
              for (let key in model) {
                model[key] = value[key];
              }
            } else {
              model.new_model_name = value;
            }
          } else {
            model.new_model_name = value;
          }
        })
        .catch(() => {});
    },
    editPrice(model) {
      this.$inputNumber({ min: 1 })
        .then(({ num: price }) => {
          model.new_price = price;
          this.checkModel();
        })
        .catch(() => {});
    },
    delModel(model, index) {
      this.$dialog
        .confirm({
          title: "Delete Model",
          message: `Are you sure to delete model ${model.model_name}?`,
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
        })
        .then(() => this.modelList.splice(index, 1))
        .catch(() => {});
    },
    /**
     * @description 检查ModelList长度和用户是否输入price
     */
    checkModel() {
      switch (true) {
        case this.modelList.length === 0:
        case !this.modelList.some((item) => item.new_price > 0):
          this.modelError = true;
          return Promise.reject();
        case !this.modelList.some((item) => !!item.new_model_name):
          this.modelError = true;
          return Promise.reject();
        case !this.modelList.some((item) => !!item.new_category_name):
          this.modelError = true;
          return Promise.reject();
        default:
          this.modelError = false;
          return Promise.resolve();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-container {
  position: relative;
  overflow: hidden;
  .list-none {
    padding: 20px;
    text-align: center;
    color: #ccc;
  }
  .list-error {
    color: #e00a24;
  }
  .form-container_detail {
    height: calc(100vh - 3rem);
  }
  .form-container_edit {
    height: calc(100vh - 4.5rem);
  }
  .form-container {
    overflow-y: auto;
  }
  .action-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 5px;
    margin: 0 10px;
  }
  .model-container {
    border: 1px solid transparent;
    .model-header,
    .model-body {
      padding: 10px;
      text-align: center;
    }
    .model-header {
      font-weight: bold;
      font-size: 25px;
      &_model {
        padding-right: 10px;
      }
    }
  }
  .model-error {
    border: 1px solid #e00a24;
  }
}
</style>