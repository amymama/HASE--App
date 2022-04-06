<template>
  <div class="carBox">
    <van-nav-bar @click-left="goLeft" left-arrow :title="$t('Cart')" />
    <!-- nav Bar -->
    <div class="topBox">
      <div class="standardBox">{{ $t("Standard") }}</div>
      <div class="searchBox">
        <div class="searchInputBox">
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
          <div class="selecAllBox">
            <div class="radioBox">
              <van-checkbox v-model="radio" @click="allRadioClick">{{
                $t("All")
              }}</van-checkbox>
            </div>
            <van-cell title="" is-link @click="goBack">
              {{ $t("Continue to Purchase") }}
            </van-cell>
          </div>
        </div>
      </div>
    </div>
    <!-- list -->
    <div class="scollrBox">
      <div class="shop-status-list">
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
                <div class="lietItemBoxNumber">
                  <div class="itemBoxNumber">
                    <div>{{ $t("Stock") }}</div>
                    <div class="itemMargin" style="color: #ef9f61">
                      {{ item.inventory }}
                    </div>
                  </div>
                  <div class="itemBoxNumber">
                    <div>{{ $t("Net Price") }}</div>
                    <div class="itemMargin" style="color: #ef9f61">
                      {{ $t("SAR") }}:{{ item.retailprice }}
                    </div>
                  </div>
                  <div class="itemBoxNumber discount">
                    <div>{{ $t("Discount") }}</div>
                    <div class="itemMargin" style="color: #ef9f61">
                      <!-- {{ item.discountPrice}} -->
                      {{ item.discountPrice ? item.discountPrice : "0%" }}
                      <span class="itemMarginOff">OFF</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="listDetailBox">
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
                <span calss="textBox itemNet" style="color: #ef9f61"
                  >${{ item.discountPrice?item.discountPrice:0 }} OFF</span
                >
              </div>
            </div> -->
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
          <span slot="right" class="slotGroupBox" @click="deleteClick(item)">{{
            $t("Delete")
          }}</span>
        </van-swipe-cell>
        <!-- </van-list> -->
      </div>
    </div>
    <!--footer Confirm -->
    <div class="submitBox">
      <div class="submitPrice">
        <p class="text">
          {{ $t("Total Net Price") }} :{{ $t("SAR") }}
          {{ priceSwitch(totalNetPrice) }}
        </p>
        <p class="text">
          {{ $t("Total Tax Price") }} :{{ $t("SAR") }}
          {{ priceSwitch(totalTaxPrice) }}
        </p>
        <p class="text">
          {{ $t("Total Price") }} :<span
            style="color: #fa0e0e; font-weight: 700"
            >{{ $t("SAR") }} {{ priceSwitch(totalPrice) }}</span
          >
        </p>
      </div>
      <van-button
        class="submitButton"
        color="#407FDC"
        :disabled="confirmDisabled"
        @click="confirmClick"
        >{{ $t("Confirm") }}</van-button
      >
    </div>
    <!-- 弹框 -->
    <dealer-Search
      ref="dealerSearch"
      @ok="handleDealerOk"
      :allList="allDealerList"
    />
    <ship-to ref="shipToSearch" @ok="handleshipToOk" :allList="allShipToList" />
    <!-- <ZsoDetail
      ref="zsodetailRef"
      v-if="detailShow"
      :detailShow="detailShow"
      @detailShowModelCencel="detailShowModelCencel"
      :productDetail="productDetail"
      :selectedDealer="selectedDealer"
      :selectedShipTo="selectedShipTo"
      :selectedLocation="selectedLocation"
    /> -->
    <!-- <storage-loction ref="storageLoctionSearch" @ok="handlestorageLoctionOk" /> -->
  </div>
</template>
<script>
import DealerSearch from "./dealer.vue";
import {
  GetDealerList,
  GetPartnerListByDealer,
  GetCartListByDealer,
  UpdateCartProductCounts,
  DeleteCart,
} from "@/api/order";
import ShipTo from "./shipTo.vue";
import { mapState } from "vuex";
// import ZsoDetail from "./zsoDetail.vue";
export default {
  components: {
    // ZsoDetail,
    DealerSearch,
    ShipTo,
    // StorageLoction,
  },
  computed: {
    ...mapState({
      zsoselectedLocation: (state) => state.order.zsoselectedLocation,
    }),
  },
  data() {
    return {
      discountPrice: "",
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
      // detailShow: false,
      // confirmShow: false,
      productDetail: {},
      totalNetPrice: 0,
      totalTaxPrice: 0,
      totalPrice: 0,
    };
  },
  created() {
    this.getDataSelect();
    this.selectedLocation = this.zsoselectedLocation.selectedLocation
    console.log(this.zsoselectedLocation.selectedLocation,'zsoselectedLocation')
    // this.getDataListCart();
  },
  methods: {
    goLeft() {
      this.$router.push("/zso");
    },
    // confirmShowCencel() {
    //   // this.confirmShow = false;
    //   this.$router.push("/orderConfirm");
    //   // this.radio=false
    // },
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
      // this.confirmShow = show ? true : false;
      if (show) {
        this.$router.push("/orderConfirm");
        this.$store.commit("order/orderConfirmData", {
          selectedDealer: this.selectedDealer,
          selectedShipTo: this.selectedShipTo,
          selectedLocation: this.selectedLocation,
          productGoodsList: this.productGoodsList,
          totalNetPrice: this.totalNetPrice,
          totalTaxPrice: this.totalTaxPrice,
          totalPrice: this.totalPrice,
        });
      }
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
      this.$toast.loading({ duration: 0, forbidClick: true, mask: true });
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
      this.$toast.loading({ duration: 0, forbidClick: true, mask: true });
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
      console.log(this.selectedLocation,'this.selectedLocationthis.selectedLocationthis.selectedLocation')
      this.$router.push("/zsoDetail");
      this.$store.commit("order/productDetail", {
        productId: val.new_product_id,
        orderType: "ZSO",
        selectedDealer: this.selectedDealer,
        selectedShipTo: this.selectedShipTo,
        selectedLocation: this.selectedLocation,
      });
    },
    handleshipToOk(val) {
      this.selectedShipTo = val;
      this.initData();
    },
    initData() {
      this.$toast.loading({ duration: 0, forbidClick: true, mask: true });
      this.radio = false;
      this.list = [];
      this.getDataListCart();
    },
    //获取购物车数据
    getDataListCart() {
      let parms = {
        new_user_id: this.$store.getters.userInfo.id,
        new_dealer_id: this.selectedDealer.dealerId,
        new_ship_to_id: this.selectedShipTo.partnerId,
        // new_ship_to_id:'a7edd580-3160-4539-baea-ecc03b36b1ce',
        new_order_type: "ZSO",
      };
      GetCartListByDealer(parms)
        .then((res) => {
            console.log("res11", res);
          if (res.success) {
            if(res.data==null||res.data.ProductItems==[]){
            this.$toast.fail("No goods");
              return false
            }
            this.list = [];
            // this.list = data.ProductItems;
            console.log("res222", res);
            let arr = res.data.ProductItems;
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
                discountPrice: item.discountPrice,
              };
              this.list.push(obj);
            });
            this.$toast.clear();
            if (this.list.length === 0) {
              this.noRes = true;
            }
          } else {
            this.$toast.fail("Network error11");
          }
        })
        .catch((e) => {
          this.$toast.fail("Network error22");
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
      this.$toast.loading({ duration: 0, forbidClick: true, mask: true });
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
            this.allShipToList = [];
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
    //价格处理
    priceSwitch(x) {
      //强制保留两位小数
      var f = parseFloat(x);
      if (isNaN(f)) return false;
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf(".");
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length < rs + 1 + 2) {
        s += "0";
      }
      //每三位用一个逗号隔开
      var leftNum = s.split(".")[0];
      var rightNum = "." + s.split(".")[1];
      var result;
      //定义数组记录截取后的价格
      var resultArray = new Array();
      if (leftNum.length > 3) {
        var i = true;
        while (i) {
          resultArray.push(leftNum.slice(-3));
          leftNum = leftNum.slice(0, leftNum.length - 3);
          if (leftNum.length < 4) {
            i = false;
          }
        }
        //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
        var sortArray = new Array();
        for (var i = resultArray.length - 1; i >= 0; i--) {
          sortArray.push(resultArray[i]);
        }
        result = leftNum + "," + sortArray.join(",") + rightNum;
      } else {
        result = s;
      }
      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.carBox {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  .topBox {
    width: 100%;
    height: 100%;
    flex: 1;
    background: #f5f5f5;
    // height:28%;
    // position: fixed;
    // // overflow: hidden;
    // top: 1rem;
    // z-index: 1;
  }
  .scollrBox {
    flex: 3;
    overflow: auto !important;
    //   height: 50%;
    // padding-top: 6rem;
    //   padding-bottom: 3.5rem;
    //   width: 100%;
    //   overflow-x: hidden;
  }
  .searchBox {
    width: 100%;
    background-color: #f5f5f5;
    margin-bottom: 0.2rem;
  }
  .searchInputBox {
    margin: 0 0.2rem;
    overflow: hidden;
    border-radius: 20px;
  }
  .shop-status-list {
    padding: 18px;
    // margin-top: 6.5rem;
    // height: 30%;
    // overflow: auto
  }
  .shop-status-item {
    margin-bottom: 32px;
    border-radius: 20px;
    overflow: hidden;
    // background: #fef9f3;
    background: #fff;
    box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.1);
  }
  .radioBoxItem {
    z-index: 1;
    width: 0.6rem;
    position: relative;
    top: 1.5rem;
    left: 0.2rem;
  }
  .slotGroupBox {
    color: #f5f5f5;
    font-weight: 700;
    // height: 6rem;
    line-height: 4rem;
    width: 100%;
    padding-right: 1rem;
    padding-left: 0.4rem;
    background-color: #ff4444;
    display: flex;
    flex-direction: column;
  }
  .listBox {
    margin: 0 0 0 0.6rem;
    display: flex;
    // .radioBox {
    //   // z-index: 1;
    //   width: 0.6rem;
    // }
    .listImage {
      margin: 0.3rem 0.3rem 0rem;
    }
    .listDetailBox {
      width: 65%;
      // margin: 0rem 0.1rem 0.2rem 0rem;
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
    padding-top: 10px;
    height: 1rem;
    line-height: 1rem;
    // background-color: #2058ab;
    // color: #ffffff;
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
        margin: 0.1rem 0;
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
  .submitBox {
    width: 100%;
    // position: fixed;
    // bottom: 0;
    // height: 3.3rem;
    // flex: 1;
    background-color: #ffffff;
    font-size: 0.3rem;
    .submitPrice {
      width: 100%;
      margin: 0.3rem 0.3rem 0;
      .text {
        margin: 0.1rem;
        font-size: 30px;
      }
    }
    .submitButton {
      width: 100%;
    }
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-radius: 20px 0 0 20px;
    overflow: hidden;
  }
  .van-swipe-cell__right {
    border-radius: 0 20px 0;
    overflow: hidden;
  }
  .shop-status-item van-swipe-cell .groupBox .van-swipe-cell,
  .van-swipe-cell__wrapper,
  .van-cell-group {
    border-radius: 20px !important;
    overflow: hidden;
  }
}
</style>