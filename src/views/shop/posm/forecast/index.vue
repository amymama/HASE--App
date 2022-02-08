<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      :fixed="true"
      @click-left="clickLeft"
    >
      <van-badge
        v-action:PosmForecast:Forecast
        slot="right"
        :content="rightCount"
        @click.native="clickRight"
      >
        <span style="color: #fff">
          {{ rightText }}
        </span>
      </van-badge>
    </van-nav-bar>
    <div class="container page-hasnav">
      <router-view @getShop="getShop" @getCount="getCount"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopItem: {}, // 接收POSMList传来的shop值
      count: 0,
    };
  },
  computed: {
    isForecastList() {
      return this.$route.name === "ForecastList";
    },
    isForecastInOut() {
      return this.$route.name === "ForecastInOut";
    },
    isForecastRecord() {
      return this.$route.name === "ForecastRecord";
    },
    title() {
      return this.$route.meta.title;
    },
    rightText() {
      return this.isForecastList
        ? this.$t("shopPosm.Forecast")
        : this.isForecastInOut
        ? ""
        : "New";
    },
    rightCount() {
      return this.isForecastList && this.count > 0 ? this.count : void 0;
    },
  },
  methods: {
    getCount(count) {
      this.count = count;
    },
    getShop(shop) {
      this.shopItem = shop;
    },
    clickLeft() {
      const route = {};
      switch (this.$route.name) {
        case "ForecastRecord":
          route.name = "ShopHome";
          break;
        case "ForecastHistoryDetail":
        case "ForecastList":
          route.name = "ForecastRecord";
          break;
        case "ForecastInOut":
          route.name = "ForecastList";
          route.query = this.shopItem;
          break;
        default:
          break;
      }
      this.$router.push(route);
    },
    clickRight() {
      const route = {
        name: this.isForecastList ? "ForecastInOut" : "ForecastList",
      };
      if (this.isForecastList) {
        route.query = this.shopItem;
        this.rightCount > 0 && this.$router.push(route);
        return;
      }
      this.$router.push(route);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>