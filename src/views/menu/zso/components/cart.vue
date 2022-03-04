<template>
  <div class="carBox">
    <van-nav-bar @click-left="goBack" left-arrow title="Cart" />
    <div class="standardBox">Standard</div>
    <!-- select -->
    <div>
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
      <div class="selecAllBox">
        <div class="radioBox">
          <van-checkbox v-model="radio">All</van-checkbox>
        </div>
        <van-cell title="" is-link @click="goBack">
          Continue to Purchase
        </van-cell>
      </div>
    </div>
    <!-- Confirm -->
    <div class="submitBox">
      <div class="submitPrice">
        <p class="text">Total Net Price :$0.00</p>
        <p class="text">Total Tax Price :$0.00</p>
        <p class="text">
          Tatal Price :<span style="color: #fa0e0e; font-weight: 700"
            >$0.00</span
          >
        </p>
      </div>
      <van-button class="submitButton" color="#407FDC" @click="confirmClick"
        >Confirm</van-button
      >
    </div>
    <dealer-Search ref="dealerSearch" @ok="handleDealerOk" />
    <ship-to ref="shipToSearch" @ok="handleshipToOk" />
    <storage-loction ref="storageLoctionSearch" @ok="handlestorageLoctionOk" />
  </div>
</template>
<script>
import DealerSearch from "./dealer.vue";
import ShipTo from "./shipTo.vue";
import StorageLoction from "./storageLoction.vue";
export default {
  components: {
    DealerSearch,
    ShipTo,
    StorageLoction,
  },
  data() {
    return {
      cartShow: false,
      keyword: "",
      radio: "",
    };
  },
  methods: {
    onCancel() {},
    confirmClick() {},
  },
};
</script>
<style lang="scss" scoped>
.carBox {
  .standardBox {
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
      top: 0.3rem;
      left: 0.4rem;
      z-index: 1;
    }
  }
  .submitBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    display: flex;
    font-size: 0.2rem;
    .submitPrice {
      flex: 2;
      padding: 0.3rem 0.1rem;
      .text {
        margin: 0.1rem;
      }
    }
    .submitButton {
      flex: 1;
      padding: 1rem 0.2rem;
    }
  }
}
</style>