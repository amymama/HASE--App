<template>
  <div class="zsoListBox">
    <!-- 搜索 -->
    <div class="filter-search searchColor">
      <span
        style="position: relative; left: 0.2rem; top: 0.5rem"
        @click="goBack"
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
          value=""
          :title="$t('Ship To')"
          is-link
          @click="$refs.shipToSearch.onShow()"
        >
          <template #icon>
            <i class="iconfont icon-type"></i>
          </template>
        </van-cell>
        <van-cell
          value=""
          :title="$t('Storage Location')"
          is-link
          @click="$refs.storageLoctionSearch.onShow()"
        >
          <template #icon>
            <i class="iconfont icon-type"></i>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 图片分类 -->
    <!-- list -->
    <div class="shop-status-list">
      <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        :finished-text="$t('shopCommon.NoMoreData')"
        @load="onLoad"
        :error.sync="error"
        :error-text="$t('shopCommon.RequestErrorText')"
      >
        <van-swipe-cell
          class="shop-status-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="shop-status__header">
            <div class="shop-status-left approved">
              <!-- {{ $t("shopStatus.Approved") }} -->
            </div>
            <div class="shop-code"></div>
          </div>

          <div class="listBox" @click="$refs.zsodetailRef.onShow()">
            <div class="listImage">
              <van-image
                width="2.2rem"
                height="1.3rem"
                fit="cover"
                :src="
                  item.new_dowmload_url
                    ? item.new_dowmload_url.split(',')[0]
                    : ''
                "
              />
            </div>
            <div class="listDetailBox">
              <h3>MKT-BathTowel Gray:Premium WH</h3>
              <p class="textBox">TD0037148</p>
              <div class="lietItemBox">
                <span calss="textBox itemBox">BKCR</span>
                <span calss="textBox itemNet">Net Price</span>
              </div>
              <div class="lietItemBox">
                <span calss="textBox itemBox">Stock:{{ index }}</span>
                <span calss="textBox itemNet" style="color: #0000ff">$ 0</span>
              </div>
            </div>
          </div>
          <div class="addCartButton">
            <van-button size="mini" style="padding: 0 0.3rem" color="#407FDC">
              Add to Cart
            </van-button>
          </div>
        </van-swipe-cell>
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
    <ZsoDetail ref="zsodetailRef" />
  </div>
</template>
<script>
import SearchHistory from "@/components/SearchHistory";
import DealerSearch from "./components/dealer.vue";
import ShipTo from "./components/shipTo.vue";
import StorageLoction from "./components/storageLoction.vue";
import ZsoDetail from "./components/zsoDetail.vue";

import { getShopListBySelf, postShopOperation } from "@/api/shop";
import { orderGetDealerList, zsoGetProductList } from "@/api/order";
export default {
  components: {
    SearchHistory,
    DealerSearch,
    ShipTo,
    StorageLoction,
    ZsoDetail,
  },
  data() {
    return {
      actions: [],
      list: [],
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
      loading: false,
      refreshing: false,
      submitting: false,
      //   pageTotal: 1,
      //   pageCurrent: 1,
      //   pageSize: 10,

      page_no: 0,
      page_size: 20,
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
      noRes: false,
    };
  },
  created() {
    this.onLoad();
    // this.getData();
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.page_no++;
        getShopListBySelf(
          Object.assign(this.selectedDealer, {
            itemsperpage: this.page_size,
            page: this.page_no,
          })
        )
          .then((res) => {
            const { success, data } = res;
            if (success) {
              var Items = data.Items || [];
              this.loading = false;
              this.list = this.list.concat(Items);
              if (this.list.length === 0) {
                this.noRes = true;
              }
              if (Items.length < this.page_size) {
                this.finished = true;
              }
            }
          })
          .catch(() => {
            this.page_no = 0;
            this.loading = false;
            this.error = true;
          });
      }, 100);
    },
    setShowSearch() {
      this.showSearchHistory = true;
    },
    //跳转到购物车
    clickright() {
      this.$router.push("/zso/cart");
    },
    // clickLeft() {
    //   this.$router.push("/menu");
    // },
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
    handleshipToOk(selectedOptions, tabIndex) {},
    handlestorageLoctionOk(selectedOptions, tabIndex) {},
    // getData() {},
  },
};
</script>
<style lang="scss" scoped>
.zsoListBox {
  .searchColor {
    background-color: #2058ab;
  }
  .listBox {
    display: flex;
    .listImage {
      margin: 0.8rem 0.3rem 0.3rem;
    }
    .listDetailBox {
      margin: 0.4rem 0.1rem 0.2rem 0rem;
      .lietItemBox {
        margin: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        .itemBox {
          flex: 2;
        }
        .itemNet {
          flex: 1;
        }
      }
      .textBox {
        margin: 0.2rem 0;
      }
    }
  }
  .addCartButton {
    float: right;
    margin-bottom: 0.3rem;
    margin-right: 0.3rem;
  }

  .shop-status-list {
    padding: 24px;
    background: #f5f5f5;
  }
  .shop-status-item {
    margin-bottom: 32px;
    border-radius: 20px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.1);
    .shop-status__header {
      display: flex;
      overflow: hidden;
      border-bottom: 1px solid #eee;
      .shop-status-left {
        width: 370px;
        height: 40px;
        line-height: 40px;
        position: relative;
        background: #aaa;
        color: #fff;
        text-align: center;
        margin-right: 50px;
        font-size: 24px;
        &::after {
          content: "";
          display: block;
          position: absolute;
          right: -39px;
          bottom: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 40px 0 0 40px;
          border-color: transparent transparent transparent #aaa;
        }
        &.draft {
          background: #aaa;
          &::after {
            border-color: transparent transparent transparent #aaa;
          }
        }
        &.wait-approvel {
          background: #ff976a;
          &::after {
            border-color: transparent transparent transparent #ff976a;
          }
        }
        &.approved {
          background: #07c160;
          &::after {
            border-color: transparent transparent transparent #07c160;
          }
        }
        &.reject {
          background: #ee0a24;
          &::after {
            border-color: transparent transparent transparent #ee0a24;
          }
        }
      }
      .shop-code {
        flex: 1;
        line-height: 40px;
        font-size: $font24;
        color: #666;
      }
    }
    .shop-status__body {
      background: #fff;
      padding: 20px;
      .shop-name {
        font-size: $font30;
        margin-bottom: 15px;
        margin-top: 10px;
      }
      .shop-tags {
        font-size: 20px;
        .shop-tag {
          margin-right: 12px;
          margin-bottom: 12px;
        }
      }
      .shop-creator {
        line-height: 150%;
        font-size: $font24;
        color: #999;
      }
    }
    .shop-status__footer {
      padding: 20px;
      display: flex;
      justify-content: flex-end;
      .shop-action-item {
        margin-left: 10px;
        button {
          padding: 0 20px;
        }
      }
    }
    .delete-button {
      height: 100%;
      margin-left: 3px;
    }
  }
}
</style>