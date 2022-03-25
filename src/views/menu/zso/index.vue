<template>
  <div class="zsoListBox">
    <div class="top">
      <div class="topBox">
        <!-- 搜索 -->
        <van-nav-bar left-arrow @click-left="goBack">
          <div slot="title" style="padding-right: 22px">
            <van-field
              readonly
              v-model="filterParams.searchValue"
              clearable
              style="height: 0.8rem; border-radius: 20px; line-height: 0.4rem"
              :placeholder="$t('Enter Product Name/Code/Model')"
              @click="$refs.searchHistory.handleShow()"
            />
          </div>
          <div slot="right">
            <span
              style="color: #ffffff"
              v-show="filterParams.searchValue ? true : false"
              @click="searchCancel"
              >Cancel</span
            >
            <span @click="clickright">
              <img
                style="float: right; width: 0.6rem"
                src="../../../assets/images/icon/cart.png"
              />
              <span
                v-show="cartCount == 0 ? false : true"
                style="
                  float: right;
                  position: relative;
                  left: 0.7rem;
                  top: -0.1rem;
                  height: 0.4rem;
                  line-height: 0.4rem;
                  width: 0.3rem;
                  background: red;
                  border-radius: 0.1rem;
                  color: #ffffff;
                  font-size: 12px;
                "
                >{{ cartCount }}</span
              >
            </span>
          </div>
        </van-nav-bar>
        <!-- 查询 -->
        <div class="searchColor">
          <van-cell-group>
            <!-- <template #icon>
              <i class="iconfont icon-dealer"></i>
            </template> -->
            <van-field
              v-model="selectedDealer.dealerName"
              input-align="right"
              :label="$t('Dealer Name')"
              readonly
              is-link
              @click="$refs.dealerSearch.onShow()"
            />
            <van-field
              v-model="selectedShipTo.partnerName"
              input-align="right"
              :label="$t('Ship To')"
              readonly
              is-link
              @click="$refs.shipToSearch.onShow()"
            />
            <van-field
              v-model="selectedLocation.locationName"
              input-align="right"
              label-width="110"
              :label="$t('Storage Location')"
              readonly
              is-link
              @click="$refs.storageLoctionSearch.onShow()"
            />
            <!-- <template #icon>
              <i class="iconfont icon-type"></i>
            </template> -->
          </van-cell-group>
        </div>
        <!-- 图片分类 -->
        <div class="imgBox">
          <div v-for="(itemImg, indexImg) in categoryList" :key="indexImg">
            <div class="imgitem" @click="imgClick(itemImg)">
              <img :src="itemImg.iconPath" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div style="clear: both"></div> -->
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

          <div class="listBox" @click="detailShowModel(item)">
            <div class="listImage">
              <van-image
                width="2.2rem"
                height="1.3rem"
                fit="cover"
                :src="item.imgUrl ? item.imgUrl.split(',')[0] : ''"
              />
            </div>
            <div class="listDetailBox">
              <h3>{{ item.productModel }}</h3>
              <div style="display: flex">
                <p class="textBox">{{ item.productNumber }}</p>
                <p class="textBox" style="padding-left: 0.4rem">BKCR</p>
              </div>
              <div class="lietItemBoxNumber">
                <div class="itemBoxNumber">
                  <div>{{ $t("Stock") }}</div>
                  <div class="itemMargin">{{ item.stock }}</div>
                </div>
                <div class="itemBoxNumber">
                  <div>{{ $t("Net Price") }}</div>
                  <div class="itemMargin" style="color: #0000ff">
                    SAR:{{ item.netPrice }}
                  </div>
                </div>
                <div class="itemBoxNumber discount">
                  <div>{{ $t("Discount") }}</div>
                  <div class="itemMargin">
                    {{ item.discountPrice ? item.discountPrice : "0%" }}
                    <span class="itemMarginOff">OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="addCartButton">
            <van-button
              size="mini"
              style="padding: 0rem 0.3rem"
              color="#407FDC"
              @click="addCartClick(item)"
            >
              {{ $t("Add to Cart") }}
            </van-button>
          </div>
        </van-swipe-cell>
      </van-list>
    </div>
    <!-- addCart弹框 -->
    <van-action-sheet v-model="addToCartShow" :title="cartParams.productModel">
      <div class="addToCartBox">
        <div class="lietItemBox" style="color: #a2a8b2">
          <span calss="textBox itemBox">{{ cartParams.productNumber }}</span>
          <span calss="textBox itemNet"
            >{{ $t("Stock") }}:{{ cartParams.stock }}</span
          >
        </div>
        <div class="numButton">
          <van-stepper
            :disabled="isView"
            button-size="24px"
            min="1"
            max="999"
            :integer="true"
            v-model.number="num"
          />
        </div>
        <div class="addCartFooter">
          <van-button class="cancel" @click="onaddCartCancel" type="danger"
            >Cancel</van-button
          >
          <van-button class="addCart" :loading="addLoading"  @click="addCartOk" type="info"
            >Ok</van-button
          >
        </div>
      </div>
    </van-action-sheet>
    <search-history
      ref="searchHistory"
      searchType="shop"
      @ok="handleSearchOk"
    />
    <dealer-Search
      ref="dealerSearch"
      :allList="allDealerList"
      @ok="handleDealerOk"
    />
    <ship-to ref="shipToSearch" :allList="allShipToList" @ok="handleshipToOk" />
    <storage-loction
      ref="storageLoctionSearch"
      :allList="allStorageList"
      @ok="handlestorageLoctionOk"
    />
    <ZsoDetail
      ref="zsodetailRef"
      v-if="detailShow"
      :detailShow="detailShow"
      @detailShowModelCencel="detailShowModelCencel"
      :productDetail="productDetail"
      :selectedDealer="selectedDealer"
      :selectedShipTo="selectedShipTo"
      :selectedLocation="selectedLocation"
    />
  </div>
</template>
<script>
import SearchHistory from "./components/SearchHistory.vue";
import DealerSearch from "./components/dealer.vue";
import ShipTo from "./components/shipTo.vue";
import StorageLoction from "./components/storageLoction.vue";
import ZsoDetail from "./components/zsoDetail.vue";
import {
  GetCartCount,
  zsoGetProductList,
  GetCategoryList,
  GetDealerList,
  GetPartnerListByDealer,
  GetStorageLocationList,
  OrderCartAddCart,
} from "@/api/order";
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
      productDetail: {},
      detailShow: false,
      allDealerList: [],
      allShipToList: [],
      allStorageList: [],
      categoryList: [],
      num: 1,
      isView: false,
      addToCartShow: false,
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
      selectedShipTo: {
        partnerCode: "",
        partnerName: "",
        partnerId: "",
      },
      selectedLocation: {},
      selectedPartner: {},
      selectedCategory: {},
      selectedProduct: {},
      selectedSubCatrgory: "",
      cartParams: {}, // 加入购物车的参数，传递至详情页用
      // productNumber: 0, // 加购商品数
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
      addLoading:false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    searchCancel() {
      this.filterParams.searchValue = "";
      this.initData();
    },
    //查看shangpin详情
    detailShowModel(val) {
      this.detailShow = true;
      this.productDetail = {
        productId: val.productId,
        orderType: "ZSO",
        dealerCode: this.selectedDealer.dealerCode,
        shipToCode: this.selectedShipTo.partnerCode,
        storageLocationName: this.selectedLocation.locationName,
      };
      console.log(val, "2223", this.cartParams);
      // this.$refs.zsodetailRef.onShow();
    },
    detailShowModelCencel() {
      this.detailShow = false;
    },
    //确认加入购物车
    addCartOk() {
      this.addLoading=true
      let that = this;
      if (this.num == 0) {
        that.$toast.fail("The quantity cannot be 0");
        return false;
      }
      this.$toast.loading({ duration: 0 });
      OrderCartAddCart({
        new_user_id: this.$store.getters.userInfo.id,
        new_user_realname: this.$store.getters.userInfo.realname,
        new_dealer_code: this.selectedDealer.dealerCode,
        new_dealer_id: this.selectedDealer.dealerId,
        new_dealer_name: this.selectedDealer.dealerName,
        new_ship_to_code: this.selectedShipTo.partnerCode,
        new_ship_to_id: this.selectedShipTo.partnerId,
        new_ship_to_name: this.selectedShipTo.partnerName,
        new_product_id: this.cartParams.productId,
        new_product_number: this.cartParams.productNumber,
        new_product_model: this.cartParams.productModel,
        new_product_counts: this.num, //加入购物车商品的数量
        new_order_type: "ZSO",
        new_storage_location: this.selectedLocation.locationCode,
      })
        .then((res) => {
          console.log("加入购物车", res, res.success);
          if (res.success) {
            // this.$toast.clear();
            that.$toast.success("succes");
            this.addLoading=false
            this.getCartCountNumber();
            that.onaddCartCancel();
          } else {
            // that.$toast.clear();
            that.$toast.fail(res.message);
            this.addLoading=false
          }
        })
        .catch((e) => {
          that.$toast.fail("Network error");
            this.addLoading=false
        })
    },
    //获取商品件数
    getCartCountNumber() {
      GetCartCount({
        new_user_id: this.$store.getters.userInfo.id,
        new_dealer_id: this.selectedDealer.dealerId,
        new_ship_to_id: this.selectedShipTo.partnerId,
        new_order_type: "ZSO",
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.cartCount = data;
          }
        })
        .catch(() => {});
    },
    addCartClick(val) {
      this.addToCartShow = true;
      this.cartParams = val;
      console.log("val::", val);
    },
    onaddCartCancel() {
      this.addToCartShow = false;
    },
    imgClick(val) {
      this.selectedCategory = val;
      console.log(this.selectedCategory, "1212");
      this.initData();
    },
    initData() {
      this.list = [];
      this.page_no = 0;
      this.loading = true;
      this.finished = false;
      this.noRes = false;
      this.error = false;
      this.onLoad();
    },
    onLoad() {
      // setTimeout(() => {
      this.page_no++;
      zsoGetProductList(
        Object.assign(
          {
            // hasStock: true,
            userId: this.$store.getters.userInfo.id,
            dealerCode: this.selectedDealer.dealerCode,
            shipToCode: this.selectedShipTo.partnerCode,
            catalogueId: this.selectedCategory.categoryId, //catalogueId
            subCatalogueId: this.selectedCategory.catalogueType, //产品0大类1小类
            storageLocation: this.selectedLocation.locationCode,
            // orderby: "",
            searchValue: this.filterParams.searchValue, //关键字搜索
            orderType: "ZSO",
            // subCatalogueId: this.state.selectedSubCatrgory,
          },
          {
            itemsperpage: this.page_size,
            page: this.page_no,
          }
        )
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
      // }, 100);
    },
    setShowSearch() {
      this.showSearchHistory = true;
    },
    //跳转到购物车
    clickright() {
      this.$router.push("/zso/cart");
    },
    // clear search
    clearSearch() {
      this.filterParams.searchValue = "";
      this.filterParams.searchCode = "";
      this.initData();
    },
    handleSearchOk(key) {
      this.filterParams.searchValue = key;
      this.filterParams.searchCode = key;
      this.initData();
    },
    // 确认dealer
    handleDealerOk(val) {
      this.selectedDealer = val;
      this.getShipTo();
      this.selectedShipTo = {};
      this.initData();
    },
    // 关闭dealer
    handleshipToOk(val) {
      this.selectedShipTo = val;
      this.initData();
    },
    handlestorageLoctionOk(val) {
      this.selectedLocation = val;
      this.initData();
    },
    getData() {
      GetCategoryList({ userId: this.$store.getters.userInfo.id }).then(
        (res) => {
          if (res.success) {
            this.categoryList = res.data;
          }
        }
      );
      //dealer Name
      GetDealerList({ userId: this.$store.getters.userInfo.id })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            var Items = data || [];
            this.allDealerList = this.allDealerList.concat(Items);
            if (this.allDealerList.length > 0) {
              this.selectedDealer = this.allDealerList[0];
              this.getShipTo();
            }
          }
        })
        .catch(() => {});
      GetStorageLocationList()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            var Items = data || [];
            this.allStorageList = this.allStorageList.concat(Items);
            if (this.allStorageList.length > 0) {
              this.selectedLocation = this.allStorageList[0];
            }
          }
        })
        .catch(() => {});
    },
    getShipTo() {
      GetPartnerListByDealer({
        dealer_code: this.selectedDealer.dealerCode,
        type: "SH",
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            var Items = data || [];
            this.allShipToList = [];
            this.allShipToList = this.allShipToList.concat(Items);
            console.log("allShipToList", this.allShipToList);
            if (this.allShipToList.length > 0) {
              this.selectedShipTo = this.allShipToList[0];
              console.log("selectedShipTo", this.selectedShipTo);
            }
            this.initData();
            this.getCartCountNumber();
          }
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.zsoListBox {
  .top {
    height: 7rem;
    .topBox {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 1;
    }
  }
  .searchColor {
    background-color: #2058ab;
  }
  .lietItemBox {
    margin: 0.2rem 0;
    display: flex;
    justify-content: space-between;
    .itemBox {
      flex: 1;
    }
    .itemNet {
      flex: 1;
    }
  }
  .listBox {
    display: flex;
    .listImage {
      flex: 1;
      margin: 0.8rem 0.2rem 0.1rem 0.3rem;
    }
    .lietItemBoxNumber {
      // float: left;
      width: 100%;
      display: flex;
      .discount {
        margin-left: 0.5rem;
      }
      .itemBoxNumber {
        // flex: 1;
        width: 32%;
        .itemMargin {
          margin: 0.1rem 0 0.3rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          .itemMarginOff {
            width: 0.2rem;
            height: 0.7rem;
            background: #ff976a;
            color: #f5f5f5;
            font-weight: 700;
          }
        }
      }
    }
    .listDetailBox {
      flex: 3;
      margin: 0.4rem 0.5rem 0rem 0rem;
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
    // height: 70%;
    padding: 18px;
    background: #f5f5f5;
    // overflow: auto;
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
      border-radius: 20px 0 0 0;
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
  .addToCartBox {
    margin: 0.2rem 0.5rem;
  }
  .numButton {
    margin: 0.8rem;
    text-align: center;
  }
  .addCartFooter {
    display: flex;
    margin: 0.4rem 0.7rem;
    justify-content: space-between;
    .addCart {
      width: 47%;
      margin-left: 0.4rem;
    }
    .cancel {
      width: 47%;
    }
  }
  .imgBox {
    background-color: #f4f4f4;
    height: 1.3rem;
    display: flex;
    padding: 0.2rem 0.3rem;
    display: flex;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
    .imgitem {
      margin: 0.1rem 0.1rem;
    }
    img {
      width: 0.8rem;
      height: 1.1rem;
    }
  }
}
</style>