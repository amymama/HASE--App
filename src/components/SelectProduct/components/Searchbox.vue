<template>
  <div style="margin-bottom: 10px">
    <van-row class="search-container" type="flex" align="center">
      <van-col :span="4" class="shop-common">
        <van-icon
          name="apps-o"
          :class="{ 'product-select': isSubCategory }"
          @click="showPopup('product')"
        />
      </van-col>
      <van-col :span="20" class="search-cate clearfix">
        <div
          v-for="category in categoryList.slice(1)"
          :key="category.new_product_category_id"
          class="cate-icon"
          @click="quickSelect(category)"
        >
          <img :src="category.new_icon" :alt="category.new_name_en" />
          <div
            class="circle"
            v-show="
              queryParam.new_category_id === category.new_product_category_id
            "
          ></div>
        </div>
      </van-col>
    </van-row>
    <van-row class="search-container" :gutter="12" type="flex" align="center">
      <van-col :span="24" class="shop-search">
        <van-search
          class="search-ipt"
          shape="round"
          background="transparent"
          @search="handleSearch"
          v-model="queryParam.new_posm_code"
          :placeholder="$t('shopProduct.Placeholder')"
        />
      </van-col>
    </van-row>
    <ProductCategory v-model="productVisible" :categoryList="categoryList" @select="handleSelect" />
  </div>
</template>

<script>
import ProductCategory from "./ProductCategory";
import { getProductCategory } from "@/api/product";

export default {
  data() {
    return {
      subVisible: false,
      productVisible: false,
      select: "",
      queryParam: {
        new_category_id: null,
      },
      categoryList: [],
    };
  },
  computed: {
    // 是否已选中Subcategory
    isSubCategory() {
      return !!this.queryParam.shop;
    },
  },
  components: {
    ProductCategory,
  },
  mounted() {
    this.initProductCategory();
  },
  methods: {
    initProductCategory() {
      getProductCategory().then((res) => {
        const { success, data } = res;
        if (success) {
          this.categoryList = data.Items;
          this.categoryList.unshift({
            new_name_en: "All",
            new_product_category_id: "All",
            children: [], // children中的all会在Category组件中生成
          });
        }
      });
    },
    showPopup(type) {
      this[`${type}Visible`] = true;
    },
    handleSearch() {
      this.$emit("search", this.queryParam);
    },
    handleSelect(selectList) {
      let select1st = selectList[0];
      let select2nd = selectList[1];
      this.queryParam.new_category_id =
        select1st.new_product_category_id !== "All"
          ? select1st.new_product_category_id
          : void 0;
      this.queryParam.new_subcategory_id =
        select2nd.new_product_category_id !== "All"
          ? select2nd.new_product_category_id
          : void 0;
      this.handleSearch();
    },
    quickSelect(category) {
      this.queryParam.new_category_id = category.new_product_category_id;
      this.$emit("search", this.queryParam);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container:nth-child(1) {
  padding: 10px 20px;
  background: #fff;
}
.cate-icon {
  float: left;
  position: relative;
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .circle {
    position: absolute;
    left: 0;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #e47171;
  }
}
.search-container {
  color: #333;
  padding: 10px 0;
  .search-cate {
    min-height: 50px;
    display: flex;
    justify-content: space-between;
  }
  .search-cate_select {
    background-color: #f5f5f5;
  }
  .shop-common {
    text-align: center;
    i {
      vertical-align: middle;
      font-size: 30px;
      font-weight: bold;
    }
  }
}
// 过滤选中样式
.cate-select,
.asset-select {
  color: #007bff;
}
</style>