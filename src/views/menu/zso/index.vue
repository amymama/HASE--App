<template>
  <div>
    <!-- 搜索 -->
    <div class="filter-search searchColor">
      <span
        style="position: relative; left: 0.2rem; top: 0.5rem"
        @click="clickLeft"
      >
        <img
          style="float: left; width: 0.25rem"
          src="../../../assets/images/icon/previous_white.png"
        />
      </span>
      <van-search
        clearable
        style="padding-left: 0.6rem; padding-right: 1.3rem"
        v-model="filterParams.searchValue"
        @click="$refs.searchHistory.handleShow()"
        background="none"
        shape="round"
        :placeholder="$t('Enter Product Name/Code/Model')"
      >
      </van-search>
      <span
        style="position: relative; right: 0.2rem; bottom: 1rem"
        @click="clickright"
      >
        <img
          style="float: right; width: 0.6rem"
          src="../../../assets/images/icon/cart.png"
        />
      </span>
    </div>
    <!-- 查询 -->
    <div class="searchColor">
      <van-cell-group>
        <van-cell
          :title="$t('Dealer Name')"
          is-link
          @click="$refs.dealerSearch.onShow()"
        >
          <template #icon>
            <i class="iconfont icon-dealer"></i>
          </template>
        </van-cell>
        <van-cell
          :title="$t('Ship To')"
          is-link
          @click="$refs.shipToSearch.onShow()"
        >
          <template #icon>
            <i class="iconfont icon-type"></i>
          </template>
        </van-cell>
        <van-cell
          :title="$t('Storage Location')"
          is-link
          @click="$refs.storageLoctionSearch.onShow()"
        >
          <template #icon>
            <i class="iconfont icon-type"></i>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 图片分类 -->
    </div>
    <!-- 分类 -->
    <!-- list -->
    <div class="shop-status-list">
      <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
      <van-list
        v-else
        v-model="isLoading"
        :finished="finished"
        :finished-text="$t('shopCommon.NoMoreData')"
        @load="onLoad"
        :error.sync="error"
        :error-text="$t('shopCommon.RequestErrorText')"
      >
      </van-list>
    </div>
    <!-- 弹框 -->
    <search-history
      ref="searchHistory"
      searchType="shop"
      @ok="handleSearchOk"
    />
    <dealer-Search ref="dealerSearch" @ok="handleDealerOk" />
    <ship-to ref="shipToSearch" @ok="handleshipToOk" />
    <storage-loction ref="storageLoctionSearch" @ok="handlestorageLoctionOk" />
  </div>
</template>
<script>
import SearchHistory from "@/components/SearchHistory";
import DealerSearch from "./components/dealer.vue";
import ShipTo from "./components/shipTo.vue";
import StorageLoction from "./components/storageLoction.vue";
export default {
  components: {
    SearchHistory,
    DealerSearch,
    ShipTo,
    StorageLoction
  },
  data() {
    return {
      actions: [],
      mode: "dark",
      cartCount: 0,
      showSearchHistory: false, //搜索弹框
      showSearchDealer: false,
      showSearchPartner: false,
      showSearchLocation: false,
      showCategory: false,
      showDetail: false,
      selectedDealer: {},
      selectedPartner: {},
      selectedLocation: {},
      selectedCategory: {},
      selectedProduct: {},
      selectedSubCatrgory: "",
      cartParams: {}, // 加入购物车的参数，传递至详情页用
      productNumber: 0, // 加购商品数
      productNumberDefault: 1, // 默认加购商品数
      isSubCategory: false,
      partnerList: [],
      categorys: [],
      selectedProId: {},
      proDataBlob: {},
      //   proDataSource: new ListView.DataSource({
      //     rowHasChanged: (row1, row2) => row1 !== row2,
      //   }),
      isLoading: false,
      refreshing: false,
      submitting: false,
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 10,
      height: "100vh",
      showAddModal: false, // 是否弹出加入购物车弹窗
      filterParams: {
        UserId: this.$store.getters.userInfo.id,
        RealName: this.$store.getters.userInfo.realname,
        searchValue: "",
      },
      hasCate: false,
      error: false,
      finished: false,
      noRes: true,
    };
  },
  methods: {
    onLoad() {},
    setShowSearch() {
      this.showSearchHistory = true;
    },
    //跳转到购物车
    clickright() {},
    clickLeft() {
      this.$router.push("/menu");
    },
    // clear search
    clearSearch() {
      this.filterParams.searchValue = "";
      this.filterParams.searchCode = "";
      //   this.initData();
    },
    handleSearchOk(key) {
      this.filterParams.searchValue = key;
      this.filterParams.searchCode = key;
      //   this.initData();
    },
    // 确认dealer
    handleDealerOk(selectedOptions, tabIndex) {
      if (selectedOptions.length > 0) {
        // this.selectedDealer.id =
        //   tabIndex >= 0 ? selectedOptions[0].new_sale_regionid : "";
        // this.selectedDealer.id =
        //   tabIndex >= 1 ? selectedOptions[1].new_sale_regionid : "";
        // this.branchName = selectedOptions[tabIndex].new_name;
        // this.initData();
      }
    },
    // 关闭dealer
    // onCancel() {},
    // onSelect() {},
    handleshipToOk(selectedOptions, tabIndex){},
    handlestorageLoctionOk(selectedOptions, tabIndex){},
  },
};
</script>
<style>
.searchColor {
  background-color: #2058ab;
}
</style>