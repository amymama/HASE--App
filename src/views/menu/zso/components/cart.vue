<template>
  <div class="carBox">
    <van-nav-bar @click-left="goBack" left-arrow fixed title="Cart" />
    <!-- nav Bar -->
    <div class="topBox">
      <div class="standardBox">Standard</div>
      <div>
        <van-cell
          :title="$t('Dealer Name')"
          is-link
          :value="selectedDealer.dealerName"
          @click="$refs.dealerSearch.onShow()"
        >
          <!-- <template #icon>
            <i class="iconfont icon-dealer"></i>
          </template> -->
        </van-cell>
        <van-cell
          :title="$t('Ship To')"
          :value="selectedShipTo.partnerName"
          is-link
          @click="$refs.shipToSearch.onShow()"
        >
          <!-- <template #icon>
            <i class="iconfont icon-type"></i>
          </template> -->
        </van-cell>
        <div class="selecAllBox">
          <div class="radioBox">
            <van-checkbox v-model="radio" @click="allRadioClick"
              >All</van-checkbox
            >
          </div>
          <van-cell title="" is-link @click="goBack">
            Continue to Purchase
          </van-cell>
        </div>
      </div>
    </div>
    <!-- list -->
    <div class="shop-status-list" style="height: 90%; overflow: auto">
      <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
      <!-- <van-list
        v-else
        v-model="loading"
        :finished="finished"
        :finished-text="$t('shopCommon.NoMoreData')"
        @load="getDataListCart"
        :error.sync="error"
        :error-text="$t('shopCommon.RequestErrorText')"
      > -->
      <van-swipe-cell
        :right-width="68"
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
        <van-cell-group class="groupBox">
          <div class="radioBoxItem">
            <van-checkbox
              v-model="item.radio"
              @click="radioBoxItemClick(item, index)"
            ></van-checkbox>
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
              <h3>{{ item.new_product_model }}</h3>
              <p class="textBox" style="color: #bcc1c1">
                {{
                  item.new_product_number +
                  "(" +
                  item.new_storage_location +
                  ")"
                }}
              </p>
              <div class="lietItemBox">
                <span calss="textBox itemBox" style="color: #ef9f61"
                  >Stock:{{ item.inventory }}</span
                >
                <span calss="textBox itemNet" style="color: #ef9f61"
                  >Price:${{ item.retailprice }}</span
                >
              </div>
            </div>
          </div>
          <div class="numButtonBox">
            <div class="numButton">
              <van-stepper
                :disabled="isView"
                button-size="24px"
                min="1"
                max="999"
                :integer="true"
                v-model.number="item.new_product_counts"
                @change="numAddClick(item)"
              />
              <!-- @minus="minusNum(item)"  -->
            </div>
          </div>
        </van-cell-group>
        <span slot="right" class="slotGroupBox" @click="deleteClick(item)"
          >Delete</span
        >
      </van-swipe-cell>

      <!-- </van-list> -->
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <!--footer Confirm -->
    <div class="submitBox">
      <div class="submitPrice">
        <p class="text">Total Net Price :${{ totalNetPrice }}</p>
        <p class="text">Total Tax Price :${{ totalTaxPrice }}</p>
        <p class="text">
          Total Price :<span style="color: #fa0e0e; font-weight: 700"
            >${{ totalPrice }}</span
          >
        </p>
      </div>
      <van-button
        class="submitButton"
        color="#407FDC"
        :disabled="confirmDisabled"
        @click="confirmClick"
        >Confirm</van-button
      >
    </div>
    <!-- 弹框 -->
    <dealer-Search
      ref="dealerSearch"
      @ok="handleDealerOk"
      :allList="allDealerList"
    />
    <ship-to ref="shipToSearch" @ok="handleshipToOk" :allList="allShipToList" />
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
    <orderConfirm
      ref="zsoConfirmRef"
      :orderConfirmShow="confirmShow"
      @confirmShowCencel="confirmShowCencel"
      @getDataListCart="getDataListCart"
      :selectedDealer="selectedDealer"
      :selectedShipTo="selectedShipTo"
      :selectedLocation="selectedLocation"
      :list="productGoodsList"
      :totalNetPrice="totalNetPrice"
      :totalTaxPrice="totalTaxPrice"
      :totalPrice="totalPrice"
    />
    <!-- <storage-loction ref="storageLoctionSearch" @ok="handlestorageLoctionOk" /> -->
  </div>
</template>
<script>
import DealerSearch from "./dealer.vue";
import orderConfirm from "./orderConfirm.vue";
import {
  GetDealerList,
  GetPartnerListByDealer,
  GetCartListByDealer,
  UpdateCartProductCounts,
  DeleteCart,
  // ReSubmitOrder,
} from "@/api/order";
import ShipTo from "./shipTo.vue";
import ZsoDetail from "./zsoDetail.vue";
export default {
  components: {
    ZsoDetail,
    DealerSearch,
    ShipTo,
    orderConfirm,
    // StorageLoction,
  },
  data() {
    return {
      confirmDisabled: true,
      selectedLocation: {},
      cartShow: false,
      keyword: "",
      radio: "",
      // page_no: 0,
      // page_size: 20,
      // loading: false,
      // error: false,
      noRes: false,
      // finished: false,
      list: [],
      productGoodsList: [],
      num: 1,
      isView: false,
      selectedDealer: {},
      selectedShipTo: {},
      allDealerList: [],
      allShipToList: [],
      detailShow: false,
      confirmShow: false,
      productDetail: {},
      totalNetPrice: 0,
      totalTaxPrice: 0,
      totalPrice: 0,
    };
  },
  created() {
    this.getDataSelect();
    // this.getDataListCart();
  },
  methods: {
    confirmShowCencel() {
      this.confirmShow = false;
      this.radio=false
    },
    //确认订单
    confirmClick() {
      let show = true;
      this.productGoodsList = [];
      let arr = this.list;
      arr.forEach((item) => {
        if (item.radio) {
          this.productGoodsList.push(item);
        }
      });
      if (this.productGoodsList.length == 0) {
        this.$toast.fail("No commodity is chosen!");
        return false;
      }
      let srr = this.productGoodsList;
      show = srr.every((item) => item.inventory != 0 && item.retailprice != 0);
      if (!show) {
        this.$toast.fail("Commodity is includes Price id 0 or Stock is 0!");
        return false;
      }
      this.confirmShow = show ? true : false;
    },
    //选择商品
    radioBoxItemClick(val, index) {
      let arr = this.list;
      let totalNetPrice = 0;
      let totalTaxPrice = 0;
      let totalPrice = 0;
      let arrRadio = 0;
      arr.forEach((item) => {
        if (item.radio) {
          totalNetPrice += item.netPrice * item.new_product_counts;
          totalTaxPrice += item.taxPrice * item.new_product_counts;
          totalPrice += item.retailprice * item.new_product_counts;
          arrRadio++;
        }
      });
      this.totalNetPrice = totalNetPrice;
      this.totalTaxPrice = totalTaxPrice;
      this.totalPrice = totalPrice;
      this.confirmDisabled = arrRadio > 0 ? false : true; //是否有选择商品
      this.radio = arrRadio == arr.length ? true : false; //是否全选
    },
    //选择全部商品
    allRadioClick() {
      let arr = this.list;
      let totalNetPrice = 0;
      let totalTaxPrice = 0;
      let totalPrice = 0;
      arr.forEach((item) => {
        if (this.radio) {
          item.radio = true;
          this.confirmDisabled = false;
        } else {
          item.radio = false;
          this.confirmDisabled = true;
        }
        if (item.radio) {
          totalNetPrice += item.netPrice * item.new_product_counts;
          totalTaxPrice += item.taxPrice * item.new_product_counts;
          totalPrice += item.retailprice * item.new_product_counts;
        }
      });
      this.totalNetPrice = totalNetPrice;
      this.totalTaxPrice = totalTaxPrice;
      this.totalPrice = totalPrice;
    },
    // minusNum(val){
    //   console.log(val,'qqqqqq')
    // },
    //增加或减少商品件数
    numAddClick(val) {
      this.$toast.loading({ duration: 0 });
      UpdateCartProductCounts({
        new_order_cartId: val.new_order_cartId,
        new_product_counts: val.new_product_counts,
      })
        .then((res) => {
          if (res.success) {
            this.$toast.clear();
            //计算价格
            let arr = this.list;
            let totalNetPrice = 0;
            let totalTaxPrice = 0;
            let totalPrice = 0;
            arr.forEach((item) => {
              if (item.radio) {
                totalNetPrice += item.netPrice * item.new_product_counts;
                totalTaxPrice += item.taxPrice * item.new_product_counts;
                totalPrice += item.retailprice * item.new_product_counts;
              }
            });
            console.log(totalNetPrice, "11111");
            this.totalNetPrice = totalNetPrice;
            this.totalTaxPrice = totalTaxPrice;
            this.totalPrice = totalPrice;
          } else {
            this.$toast.clear();
          }
        })
        .catch((e) => {
          this.$toast.clear();
        });
    },
    //删除购物车商品
    deleteClick(val) {
      this.$toast.loading({ duration: 0 });
      DeleteCart({ new_order_cartId: val.new_order_cartId })
        .then((res) => {
          if (res.success) {
            this.$toast.success("success");
            this.getDataListCart();
          }
        })
        .catch((e) => {
          this.$toast.fail("Network error");
        });
    },
    //查看shangpin详情
    detailShowModel(val) {
      this.detailShow = true;
      this.productDetail = {
        productId: val.new_product_id,
        orderType: "ZSO",
        dealerCode: this.selectedDealer.dealerCode,
        shipToCode: this.selectedShipTo.partnerCode,
        storageLocationName: this.selectedLocation.new_storage_location,
      };
    },
    detailShowModelCencel() {
      this.detailShow = false;
    },
    handleshipToOk(val) {
      this.selectedShipTo = val;
      this.initData();
    },
    initData() {
      this.radio=false
      this.list = [];
      this.getDataListCart();
    },
    //获取购物车数据
    getDataListCart() {
      this.$toast.loading({ message: "Loading...", duration: 0 });
      let parms = {
        new_user_id: this.$store.getters.userInfo.id,
        new_dealer_id: this.selectedDealer.dealerId,
        new_ship_to_id: this.selectedShipTo.partnerId,
        // new_ship_to_id:'a7edd580-3160-4539-baea-ecc03b36b1ce',
        new_order_type: "ZSO",
      };
      GetCartListByDealer(parms)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            console.log("res", res);
            this.list = [];
            // this.list = data.ProductItems;
            let arr = data.ProductItems;
            arr.forEach((item) => {
              const obj = {
                imgUrl: item.imgUrl,
                inventory: item.inventory,
                netPrice: item.netPrice,
                new_order_cartId: item.new_order_cartId,
                new_product_counts: item.new_product_counts,
                new_product_id: item.new_product_id,
                new_product_model: item.new_product_model,
                new_product_number: item.new_product_number,
                new_storage_location: item.new_storage_location,
                retailprice: item.retailprice,
                taxPrice: item.taxPrice,
                taxRate: item.taxRate,
                radio: "",
              };
              this.list.push(obj);
            });
            this.$toast.clear();
            if (this.list.length === 0) {
              this.noRes = true;
            }
          } else {
            this.$toast.clear();
          }
        })
        .catch((e) => {
          this.$toast.clear();
        });
    },
    // 确认dealer
    handleDealerOk(val) {
      this.selectedDealer = val;
      this.getShipTo();
      this.selectedShipTo = {};
      this.initData();
    },
    //dealer Name
    getDataSelect() {
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
    },
    getShipTo() {
      // this.$toast.loading({ message: "Loading...", duration: 0 });
      GetPartnerListByDealer({
        dealer_code: this.selectedDealer.dealerCode,
        type: "SH",
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            var Items = data || [];
            this.allShipToList = this.allShipToList.concat(Items);
            console.log("allShipToList", this.allShipToList);
            if (this.allShipToList.length > 0) {
              this.selectedShipTo = this.allShipToList[0];
              console.log("selectedShipTo", this.selectedShipTo);
            }
            this.getDataListCart();
          }
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.carBox {
  .topBox {
    width: 100%;
    // height: 5rem;
    position: fixed;
    // overflow: hidden;
    top: 1rem;
    z-index: 1;
  }
  .bottomBox {
    height: 0.2rem;
    background-color: #f5f5f5;
  }
  .shop-status-list {
    padding: 18px;
    padding-top: 6.5rem;
    background: #f5f5f5;
    overflow-y: auto;
    clear: both;
  }
  .shop-status-item {
    margin-bottom: 32px;
    border-radius: 20px;
    overflow: hidden;
    // background: #fef9f3;
    background: #fff;
    box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.1);
  }
  .shop-status__header {
    display: flex;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    border-radius: 20px 0 0 0;
    .shop-status-left {
      width: 370px;
      height: 40px;
      line-height: 40px;
      position: relative;
      background: #aaa;
      color: #fff;
      text-align: center;
      margin-right: 50px;
      // border-radius: 20px 0 0 0;
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
  .radioBoxItem {
    z-index: 1;
    width: 0.6rem;
    position: relative;
    top: 1.5rem;
    left: 0.2rem;
  }
  // .groupBox {
  //   // background-color: #fef9f3;
  // }
  .slotGroupBox {
    color: #f5f5f5;
    font-weight: 700;
    height: 6rem;
    line-height: 4rem;
    width: 100%;
    padding-right: 1rem;
    padding-left: 0.4rem;
    background-color: #ff4444;
    display: flex;
    flex-direction: column;
  }
  .listBox {
    margin: 0 0.6rem;
    display: flex;
    // .radioBox {
    //   // z-index: 1;
    //   width: 0.6rem;
    // }
    .listImage {
      margin: 0.3rem 0.3rem 0rem;
    }
    .listDetailBox {
      width: 57%;
      margin: 0rem 0.1rem 0.2rem 0rem;
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
  .numButtonBox {
    width: 100%;
    .numButton {
      float: right;
      margin: 0.2rem 0.4rem;
    }
  }
  .standardBox {
    padding-top: 20px;
    height: 1rem;
    line-height: 1rem;
    background-color: #2058ab;
    color: #ffffff;
    font-size: 0.4rem;
    padding-left: 0.9rem;
  }
  .selecAllBox {
    position: relative;
    .radioBox {
      position: absolute;
      // width: 0.5rem;
      top: 0.3rem;
      left: 0.4rem;
      z-index: 1;
    }
  }

  .submitBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    // height: 2rem;
    background-color: #ffffff;
    display: flex;
    font-size: 0.2rem;
    .submitPrice {
      flex: 2;
      // height: 100%;
      padding: 0.3rem 0.1rem;
      .text {
        margin: 0.1rem;
        font-size: 28px;
      }
    }
    .submitButton {
      flex: 1;
      padding: 0.9rem 0.2rem;
      height: 100%;
    }
  }
}
</style>