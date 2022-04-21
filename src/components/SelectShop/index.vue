<template>
  <div>
    <van-row class="area-container" type="flex" align="center">
      <van-col :span="3" class="text-right">
        <van-icon
          name="edit"
          size="40"
          color="#fff"
          @click="!disabled && showShop()"
        />
        <Selectshop
          v-model="shopVisible"
          :placeholder="placeholder"
          @select="handleShopSelect"
        />
      </van-col>
      <van-col :span="19" class="shop-header">
        <p class="shop-header_info shop-header_name word-limit-row_1">
          {{ shopItem.new_name }}
        </p>
        <div class="shop-header_info" style="line-height: 18px">
          <a>{{ shopItem.new_code }}</a>
          <a>{{ shopItem.new_customer_code }}</a>
        </div>
        <p class="shop-header_info select">
          {{ shopItem.new_channel_name }}
        </p>
      </van-col>
      <van-col :span="2" class="shop-icon">
        <van-row style="margin-bottom: 10px">
          <van-col class="text-right">
            <van-icon name="location-o" size="20" @click="handleShowLocation" />
            <ShopPosition ref="shopPos" />
          </van-col>
        </van-row>
        <van-row>
          <van-col class="text-right">
            <van-icon name="info" size="20" />
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Selectshop from "@/components/SelectShop/Selectshop";
import ShopPosition from "@/components/ShopPosition";
import { i18n } from "@/languages";
export default {
  name: "SelectShopRow",
  props: {
    placeholder: {
      type: String,
      default: `${i18n.t("shopPromotion.ShopCode")} ${i18n.t(
        "shopPromotion.ShopName"
      )}`,
    },
    shopItem: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      shopVisible: false,
    };
  },
  components: {
    Selectshop,
    ShopPosition,
  },
  methods: {
    handleShopSelect(shop) {
      this.shopVisible = false;
      this.$emit("select", shop);
    },
    handleShowLocation() {
      console.log(this.shopItem);
      const { new_latitude, new_longitude } = this.shopItem;
      if (new_latitude && new_longitude) {
        this.$refs.shopPos.show();
      } else {
        this.$toast("Longitude and latitude are not maintained");
      }
    },
    showShop() {
      this.shopVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.area-container {
  height: 150px;
  background: #3e86d0;
  padding: 10px;
  .shop-header {
    padding: 0 10px;
    &_info {
      font-size: $font24;
      color: #fff;
      padding: 5px 8px;
      border-radius: 5px;
      word-break: break-all;
      margin-bottom: 10px;
      a {
        color: inherit;
        padding: 5px 8px 5px 0;
      }
    }
    &_name {
      font-weight: bold;
      font-size: $font28;
    }
    .select {
      display: inline-block;
      background: #2058ab;
    }
  }
  .shop-icon {
    color: #fff;
  }
}
.text-right {
  text-align: right;
}
</style>