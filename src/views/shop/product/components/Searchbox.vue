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
      <van-col :span="22" class="shop-search">
        <van-search
          shape="round"
          background="transparent"
          @search="handleSearch"
          v-model="queryParam.queryparmary"
          :placeholder="$t('shopProduct.Placeholder')"
        />
      </van-col>
      <van-col :span="2" class="shop-common">
        <van-icon name="more-o" @click="moreSearchVisible = !moreSearchVisible" />
      </van-col>
    </van-row>
    <div v-show="moreSearchVisible">
      <van-row class="search-item" @click="showPopup('model')">
        <van-col :span="8">GTM Model Type</van-col>
        <van-col
          :span="queryParam.modelType ? 15 : 16"
          class="search-item_res"
        >{{ queryParam.modelType || "Please Select ModelType" }}</van-col>
        <van-icon v-show="queryParam.modelType" name="cross" @click.stop="reset('modelType')"></van-icon>
      </van-row>
      <van-row class="search-item" @click="showPopup('asset')">
        <van-col :span="8">MRP(VND)</van-col>
        <van-col :span="queryParam.new_asset_typename ? 15 : 16" class="search-item_res">
          <van-row>
            <van-col @click="inputPrice(false)" :span="16" style="text-align: right">
              {{ queryParam.minPrice || "Min Price" }}
              <van-icon
                v-show="queryParam.minPrice >= 0"
                name="cross"
                @click.stop="queryParam.minPrice = void 0"
              ></van-icon>
            </van-col>
            <van-col style="text-align: center" :span="2">To</van-col>
            <van-col @click="inputPrice(true)" :span="6" style="text-align: left">
              {{ queryParam.maxPrice || "Max Price" }}
              <van-icon
                v-show="queryParam.maxPrice >= 0"
                name="cross"
                @click.stop="queryParam.maxPrice = void 0"
              ></van-icon>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <ProductCategory v-model="productVisible" :categoryList="categoryList" @select="handleChoose" />
    <van-popup get-container="#app" v-model="modelVisible" round position="bottom">
      <van-picker
        show-toolbar
        :columns="modelOpts"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="modelVisible = false"
        @confirm="(item) => handleSelect(0, item)"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import ProductCategory from "./ProductCategory";
import { getProductCategory } from "@/api/product";
import { getDict } from "@/api/common";
export default {
  data() {
    return {
      subVisible: false,
      productVisible: false,
      moreSearchVisible: false,
      modelVisible: false,
      select: "",
      modelType: "",
      queryParam: {
        new_category_id: null,
        queryparmary: void 0,
        minPrice: void 0,
        maxPrice: void 0,
        modelType: void 0,
      },
      modelOpts: [],
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
    this.initModelType();
  },
  methods: {
    reset(type) {
      this.queryParam[type] = void 0;
      this.handleSearch();
    },
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
    initModelType() {
      getDict({ key: "ModelType" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const opts = [];
            data.Items.forEach((item) => {
              opts.push({
                text: item.text,
                value: item.value,
              });
            });
            this.modelOpts = opts;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { });
    },
    /**
     * @param {boolean} max true 最大值 false 最小值
     */
    inputPrice(max) {
      const options = {
        min: 0,
      };
      if (max) options.min = this.queryParam.minPrice || 0;
      this.$inputNumber(options)
        .then(({ num }) => {
          console.log(num);
          if (max) {
            this.queryParam.maxPrice = num;
          } else {
            this.queryParam.minPrice = num;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showPopup(type) {
      this[`${type}Visible`] = true;
    },
    handleSearch() {
      this.$emit("search", this.queryParam);
    },
    handleChoose(selectList) {
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
    handleSelect(type, item) {
      let action, visible;
      switch (type) {
        case 0:
          action = "modelType";
          visible = "modelVisible";
          break;
      }
      this[visible] = false;
      this.queryParam[action] = item.value;
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
  margin-right: 15px;
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
    // display: flex;
    // justify-content: space-between;
    min-height: 50px;
  }
  .search-cate_select {
    background-color: #f5f5f5;
  }
  .shop-common {
    text-align: center;
    span {
      font-weight: bold;
    }
    i {
      font-size: $font32;
    }
  }
}
// 过滤选中样式
.cate-select,
.asset-select {
  color: #007bff;
}
.search-item {
  padding: 10px 20px;
  font-weight: bold;
  &_res {
    padding-right: 10px;
    text-align: right;
    font-weight: normal;
    color: #989898;
  }
}
</style>
<style>
.shop-search .van-search {
  padding: 0;
}
</style>