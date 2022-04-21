<template>
  <div>
    <Searchbox ref="search" @search="handleSearch" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="pull-container">
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
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Searchbox from "./components/Searchbox";
import ProductCard from "./components/ProductCard";
import { postProductList } from "@/api/product";
import { getDict } from "@/api/common";

export default {
  name: 'ProductList',
  props: {
    assetposmid: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      page_size: 10,
      modelTypeList: [],
      productList: [],
      levelList: [],
      queryParam: {}, // 临时存储查询参数，用来处理分页情况
    };
  },
  components: {
    ProductCard,
    Searchbox,
  },
  created() {
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
          this.refreshing = false;
          const { success, data } = res;
          if (success) {
            this.productList = refresh
              ? data.Items
              : [...this.productList, ...data.Items];
            this.productList.forEach((product) => {
              let model = this.modelTypeList.find(
                (item) => item.value === product.new_model_type
              );
              if (model) product.modelName = model.text;
            });
            this.finished = data.TotalItems === this.productList.length;
          }
        })
        .catch((err) => toast.clear());
    },
    handleSearch(param) {
      this.queryParam = { ...this.queryParam, ...param };
      this.initProduct({ page: 1, ...this.queryParam }, true);
    },
    onLoad() {
      this.initProduct({ page: this.page++, ...this.queryParam });
    },
    onRefresh() {
      this.refreshing = true
      this.$refs.search.handleSearch()
    }
  },
};
</script>

<style lang="scss" scoped>
.pull-container {
  min-height: 80%;
  padding: 10px 0;
  .list-container {
    padding: 0 10px;
  }
}
</style>