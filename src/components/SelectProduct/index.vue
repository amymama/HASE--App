<template>
  <van-popup :value="value" position="right" style="width: 100%; height: 100%">
    <van-nav-bar
      :title="$t('ShopClass.ProductCategory')"
      left-arrow
      @click-left="closePopup"
    ></van-nav-bar>
    <Searchbox @search="handleSearch" />
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="$t('shopCommon.NoMoreData')"
      @load="onLoad"
      class="list-container"
    >
      <ProductCard
        v-for="product in productList"
        :key="product.new_productId"
        :detail="product"
        :levelList="levelList"
      >
        <van-button
          slot="del"
          @touchstart.stop="handleSelect(product)"
          class="product-del"
          size="small"
          round
          icon="plus"
        ></van-button>
      </ProductCard>
    </van-list>
  </van-popup>
</template>

<script>
import Searchbox from "./components/Searchbox";
import ProductCard from "./components/ProductCard";
import { postProductList } from "@/api/product";
import { getDict } from "@/api/common";

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      page_size: 10,
      productList: [],
      modelTypeList: [],
      levelList: [],
      queryParam: {}, // 临时存储查询参数，用来处理分页情况
    };
  },
  components: {
    ProductCard,
    Searchbox,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });

      Promise.all([this.initModelType(), this.initProductLevel()])
        .then(() => toast.clear())
        .catch(() => toast.clear());
    },
    initModelType() {
      return getDict({ key: "ModelType" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.modelTypeList = data.Items;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject())
        .finally(() => {
          this.loading = false;
        });
    },
    initProductLevel() {
      return getDict({ key: "ProductPosition" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.levelList = data.Items;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initProduct(param = {}, refresh = false) {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      if (this.assetposmid) param.assetposmid = this.assetposmid;
      postProductList({
        page: this.page,
        itemsperpage: this.page_size,
        ...param,
      })
        .then((res) => {
          toast.clear();
          this.loading = false;
          const { success, data } = res;
          if (success) {
            this.productList = refresh
              ? data.Items
              : [...this.productList, ...data.Items];
            this.productList.forEach((product) => {
              let model = this.modelTypeList.find(
                (item) => item.value === product.new_model_type
              );
              console.log(model);
              if (model) product.modelName = model.text;
            });
            this.finished = data.TotalItems === this.productList.length;
          }
        })
        .catch(() => toast.clear());
    },
    handleSearch(param) {
      this.queryParam = { ...this.queryParam, ...param };
      this.initProduct({ page: 1, ...this.queryParam }, true);
    },
    handleSelect(product) {
      this.$emit("input", false);
      this.$emit("select", product);
    },
    onLoad() {
      this.initProduct({ page: this.page++, ...this.queryParam });
    },
    closePopup() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  padding: 10px;
}
.product-del {
  position: absolute;
  right: 50px;
  bottom: 100px;
  font-size: 30px;
  font-weight: bold;
  color: #4671d5;
  background-color: #fff;
}
</style>