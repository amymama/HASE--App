<template>
  <!-- POSM列表搜索框 -->
  <van-row class="search-container" :gutter="12" type="flex" align="center">
    <van-col :span="3" class="shop-common">
      <van-icon name="apps-o" :class="{ 'cate-select': isSubCategory }" @click="showPopup('sub')" />
    </van-col>
    <van-col :span="isInOutPage ? 18 : 15" class="shop-search">
      <van-search
        class="search-ipt"
        shape="round"
        background="transparent"
        @search="handleSearch"
        v-model="queryParam.new_posm_code"
        :placeholder="$t('shopPosm.SearchPosm')"
      />
    </van-col>
    <van-col v-if="!isInOutPage" :span="3" class="shop-common">
      <van-icon :class="{ sort: sortFlag }" name="sort" @click="showPopup('sort')"></van-icon>
    </van-col>
    <van-col v-if="!isInOutPage" :span="3" class="shop-common">
      <van-icon
        name="filter-o"
        :class="{
          'asset-select': isAsset,
        }"
        @click="showPopup('asset')"
      />
    </van-col>
    <van-action-sheet
      :description="`POSM ${$t('shopPosm.Subcategory')}`"
      style="height: 40%"
      :close-on-click-action="true"
      v-model="subVisible"
      :actions="subOpts"
      @select="(item) => handleSelect(0, item)"
    />
    <van-action-sheet
      :description="$t('shopPosm.SortType')"
      :close-on-click-action="true"
      v-model="sortVisible"
      :actions="sortOpts"
      @select="(item) => handleSelect(1, item)"
    ></van-action-sheet>
    <van-action-sheet
      style="height: 40%"
      :description="$t('select.SelectAssetType')"
      :close-on-click-action="true"
      v-model="assetVisible"
      :actions="assetOpts"
      @select="(item) => handleSelect(2, item)"
    />
  </van-row>
</template>

<script>
import { getEntityConditions } from "@/api/common";
export default {
  data() {
    return {
      asset: "",
      sort: void 0,
      subVisible: false,
      assetVisible: false,
      sortVisible: false,
      queryParam: {
        new_asset_categoryId: void 0,
        new_asset_type_id: void 0,
        stock_order: void 0,
        time_order: void 0
      },
      subOpts: [],
      assetOpts: [],
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    // 是否已选中asset
    isAsset() {
      return !!this.queryParam.new_asset_type_id;
    },
    // 是否已选中Subcategory
    isSubCategory() {
      return !!this.queryParam.new_asset_categoryId;
    },
    // 是否选中排序
    sortFlag() {
      const sort = this.sortOpts.find((item) => item.value === this.sort);
      return !!sort;
    },
    sortOpts() {
      const stockColor = this.queryParam.stock_order === 1 ? '#3e86d0' : '#000'
      const timeColor = this.queryParam.time_order === 1 ? '#3e86d0' : '#000'
      return [
        {
          name: `${this.$t("shopPosm.StockSort")}(${this.$t("shopPosm.DefaultSort")})`,
          value: 0,
          order: 1,
          color: stockColor
        },
        {
          name: this.$t("shopPosm.CreateDateSort"),
          value: 1,
          order: 1,
          color: timeColor
        },
      ]
    },
    isInOutPage() {
      return this.$route.name === "PosmInOut";
    },
  },
  methods: {
    showPopup(type) {
      this[`${type}Visible`] = true;
    },
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      this.shopItem = this.$route.query;
      Promise.all([this.initSubcategory(), this.initAssetType()])
        .then(() => toast.clear())
        .catch(() => toast.clear());
    },
    initSubcategory() {
      return getEntityConditions({
        entityName: "new_asset_category",
        fields: "new_asset_categoryId, new_name",
        wheres: {
          new_asset_category_parent: 1, // 获取POSM subcategory
        },
      })
        .then((res) => {
          if (res.success) {
            const subOpts = [];
            res.data.forEach((item) =>
              subOpts.push({
                name: item.new_name,
                value: item.new_asset_categoryId,
              })
            );
            subOpts.unshift({ name: "All", value: void 0 });
            this.subOpts = subOpts;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    // 初始化AssetType下拉列表选项 new_asset_type, 可直接调用获取列表接口
    initAssetType() {
      return getEntityConditions({
        entityName: "new_asset_type",
        fields: "new_asset_typeId, new_name",
      })
        .then((res) => {
          if (res.success) {
            const assetOpts = [];
            res.data.forEach((item) =>
              assetOpts.push({
                name: item.new_name,
                value: item.new_asset_typeId,
              })
            );
            assetOpts.unshift({ name: "All", value: void 0 });
            this.assetOpts = assetOpts;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    onFinish({ selectedOptions }, type) {
      this[`${type}Visible`] = false;
      let select1st = selectedOptions[0];
      let select2nd = selectedOptions[1];
      if (type === "area") {
        this.queryParam.new_region_name =
          select1st.value !== "All" ? select1st.text : void 0;
        this.queryParam.new_channel_name =
          select2nd.value !== "All" ? select2nd.text : void 0;
      }
      if (type === "asset") {
        this.queryParam.new_branch =
          select1st.value !== "All" ? select1st.text : void 0;
        this.queryParam.new_sub_channel_name =
          select2nd.value !== "All" ? select2nd.text : void 0;
      }
      this.handleSearch();
    },
    handleSearch() {
      const param = {
        ...this.queryParam,
        new_posm_code: this.queryParam.new_posm_code || void 0,
      };
      this.$emit("search", param);
    },
    handleSelect(type, item) {
      let action;
      switch (type) {
        case 0:
          action = "new_asset_categoryId";
          break;
        case 1:
          action = item.value === 0 ? "stock_order" : "time_order";
          this.sort = item.value;
          this.queryParam.stock_order = item.value === 0 ? item.order : void 0;
          this.queryParam.time_order = item.value === 0 ? void 0 : item.order;
          if (item.value === void 0) {
            this.queryParam.stock_order = void 0;
            this.queryParam.time_order = void 0;
          }
          this.handleSearch();
          return;
        case 2:
          action = "new_asset_type_id";
          break;
        default:
          break;
      }
      this.queryParam[action] = item.value;
      this.handleSearch();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  color: #333;
  padding: 10px 0;
  .word-limit-row_2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .shop-common {
    text-align: center;
    i {
      font-size: 30px;
    }
    p {
      font-size: 14px;
    }
  }
  .sort {
    color: #3e86d0;
  }
}
// 过滤选中样式
.cate-select,
.asset-select {
  color: #007bff;
}
</style>