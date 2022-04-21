<template>
  <div class="zsoDetailBox">
    <!-- navBar -->
    <van-nav-bar
      left-arrow
      @click-left="goBack"
      :title="$t('Product detail')"
    />
    <div style="height: 100%; overflow: auto">
      <!-- 轮播图 -->
      <div class="imageBox">
        <van-swipe class="my-swipe" :autoplay="3000">
          <van-swipe-item v-for="(img, imgIndex) in top_image" :key="imgIndex">
            <van-image :src="img" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="detailTitleBox">
        <van-cell>
          <p>{{ TechDetail.modelName }}</p>
          <div class="detailTitle">
            <span
              >{{ $t("Price") }}:{{ $t("SAR")
              }}{{ TechDetail.retailPrice }}</span
            >
            <span>{{ $t("Stock") }}:{{ TechDetail.stock }}</span>
          </div>
        </van-cell>
      </div>
      <div class="bottomBox"></div>
      <!--  tabs-->
      <van-tabs v-model="active" swipeable>
        <van-tab :title="$t('Product Details')">
          <div v-for="(itemImg, itemImgIndex) in Detail" :key="itemImgIndex">
            <van-image :src="itemImg" />
          </div>
        </van-tab>
        <van-tab :title="$t('Technical Details')">
          <van-cell
            ><p style="color: #1989fa">{{ $t("Basic") }}</p></van-cell
          >
          <div class="listDetailBox">
            <div class="lietItemBox">
              <span calss="textBox itemBox">{{ $t("Product Number") }}</span>
              <span calss="textBox itemNet">{{
                TechDetail.productNumber
              }}</span>
            </div>
            <div class="lietItemBox">
              <span calss="textBox itemBox">{{ $t("Order Type") }}</span>
              <span calss="textBox itemNet">{{ TechDetail.orderType }}</span>
            </div>
            <div class="lietItemBox">
              <span calss="textBox itemBox">{{ $t("Storage Location") }}</span>
              <span calss="textBox itemNet">{{
                TechDetail.storageLocation
              }}</span>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('POP')">
          <div v-for="(itemImg, itemImgIndex) in pop" :key="itemImgIndex">
            <van-image :src="itemImg" />
          </div>
        </van-tab>
      </van-tabs>
      <br />
      <br />
      <br />
      <br />
    </div>
    <!-- footer -->
    <div class="footerButton">
      <div class="buttonBox" @click="clickright">
        <img src="../../../../assets/images/icon/cartBlue_icon.png" />
      </div>
      <!-- <div class="buttonBox" @click="liekClick">
        <img src="../../../../assets/images/icon/like_icon@2x.png" />
      </div> -->
      <div class="buttonBox">
        <van-button
          class="buttonBoxbun"
          @click="addCartClick"
          size="samll"
          type="info"
          >{{ $t("Add to Cart") }}</van-button
        >
      </div>
    </div>
    <!-- addCart弹框 -->
    <van-action-sheet v-model="addToCartShow" :title="TechDetail.modelName">
      <div class="addToCartBox">
        <div class="lietItemBox" style="color: #a2a8b2">
          <span calss="textBox itemBox">{{ TechDetail.productNumber }}</span>
          <span calss="textBox itemNet"
            >{{ $t("Stock") }}:{{ TechDetail.stock }}</span
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
          <van-button class="cancel" @click="onaddCartCancel" type="danger">{{
            $t("Cancel")
          }}</van-button>
          <van-button class="addCart" @click="addCartOk" type="info">{{
            $t("Ok")
          }}</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { GetProductDetail, OrderCartAddCart } from "@/api/order";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      productDetail: (state) => state.order.productDetail,
    }),
  },
  data() {
    return {
      addToCartShow: false,
      active: "1",
      TechDetail: {},
      pop: [],
      Detail: [],
      top_image: [],
      isView: false,
      num: 1,
      selectedLocation:{}
    };
  },
  created() {
    this.onShow();
  },
  methods: {
    onShow() {
      this.$toast.loading({ duration: 0, forbidClick: true, mask: true });
      this.selectedLocation=this.productDetail.selectedLocation
      const prams = {
        productId: this.productDetail.productId,
        orderType: "ZSO",
        dealerCode: this.productDetail.selectedDealer.dealerCode,
        shipToCode: this.productDetail.selectedShipTo.partnerCode,
        storageLocationName: this.productDetail.selectedLocation.locationCode,
      };
      GetProductDetail(prams)
        .then((res) => {
          if (res.success) {
            this.TechDetail = res.data.TechDetail;
            this.pop = res.data.POP;
            this.Detail = res.data.Detail;
            this.top_image = res.data.top_image;
            console.log(this.top_image);
            this.$toast.clear();
          }
        })
        .catch((e) => {
          this.$toast.clear();
        });
    },
    //收藏
    liekClick() {},
    //确认加入购物车
    addCartOk() {
      let that = this;
      if (this.num == 0) {
        that.$toast.fail("The quantity cannot be 0");
        return false;
      }
      this.$toast.loading({ duration: 0, forbidClick: true, mask: true });
      OrderCartAddCart({
        new_user_id: this.$store.getters.userInfo.id,
        new_user_realname: this.$store.getters.userInfo.realname,
        new_product_id: this.TechDetail.productId,
        new_product_number: this.TechDetail.productNumber,
        new_product_model: this.TechDetail.productModel,
        new_product_counts: this.num, //加入购物车商品的数量
        new_order_type: "ZSO",
        new_dealer_code: this.productDetail.selectedDealer.dealerCode,
        new_dealer_id: this.productDetail.selectedDealer.dealerId,
        new_dealer_name: this.productDetail.selectedDealer.dealerName,
        new_ship_to_code: this.productDetail.selectedShipTo.partnerCode,
        new_ship_to_id: this.productDetail.selectedShipTo.partnerId,
        new_ship_to_name: this.productDetail.selectedShipTo.partnerName,
        new_storage_location: this.productDetail.selectedLocation.locationCode,
      })
        .then((res) => {
          console.log("加入购物车", res, res.success);
          if (res.success) {
            // this.$toast.clear();
            that.$toast.success("succes");
            that.onaddCartCancel();
          } else {
            // that.$toast.clear();
            that.$toast.fail("Network error");
          }
        })
        .catch((e) => {
          that.$toast.fail("Network error");
        });
    },
    addCartClick() {
      this.addToCartShow = true;
    },
    onaddCartCancel() {
      this.addToCartShow = false;
    },
    //跳转到购物车
    clickright() {
      this.$router.push("/zso/cart");
      this.$store.commit("order/zsoselectedLocation", {
        selectedLocation: this.selectedLocation,
         selectedDealer: this.productDetail.selectedDealer,
        selectedShipTo: this.productDetail.selectedShipTo,
      });

    },
  },
};
</script>
<style lang="scss" scoped>
.zsoDetailBox {
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: auto;
    text-align: center;
    // background-color: #39a9ed;
  }
  .imageBox {
    width: 100%;
    height: 5rem;
    overflow: hidden;
  }
  .detailTitleBox {
    .detailTitle {
      display: flex;
      justify-content: space-between;
    }
  }
  .bottomBox {
    height: 0.4rem;
    background-color: #f5f5f5;
  }
  .footerButton {
    background-color: #ffffff;
    width: 100%;
    // height: 1rem;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .buttonBox {
      text-align: center;
      flex: 1;
      img {
        width: 0.7rem;
        padding-bottom: 0.2rem;
      }
    }
    .buttonBoxbun {
      width: 100%;
      height: 100%;
    }
  }
  .listDetailBox {
    margin: 0rem 0.4rem;
    .lietItemBox {
      margin: 0.4rem 0;
      display: flex;
      justify-content: space-between;
      .itemBox {
        flex: 2;
      }
      .itemNet {
        flex: 1;
      }
    }
  }
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
}
</style>