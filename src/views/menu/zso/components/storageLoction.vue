<template>
  <div class="search-bar">
    <van-popup
      v-model="dealerShow"
      :close-on-click-overlay="false"
      :style="{
        width: '100%',
        height: '100%',
      }"
    >
      <van-nav-bar
        left-arrow
        @click-left="onCancel"
        :title="$t('Storage Loction')"
      />
      <!-- Search bar -->
      <div class="search-top">
        <!-- <van-search
          v-model="keyword"
          show-action
          autofocus="false"
          placeholder="Please input keywords"
          background="#f2f2f2"
          shape="round"
          @search="onSearch"
          @cancel="onCancel"
        /> -->
        <van-field
          v-model="keyword"
          autofocus="false"
          placeholder="Please input keywords"
          background="#f2f2f2"
          shape="round"
          action
          clearable
          @input="onSearchChange"
        />
      </div>

      <div class="detailTitleBox">
        <div class="bottomBox"></div>
        <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
        <!-- <van-list
          v-else
          v-model="loading"
          :finished="finished"
          :finished-text="$t('shopCommon.NoMoreData')"
          @load="getDataStorage"
          :error.sync="error"
          :error-text="$t('shopCommon.RequestErrorText')"
        > -->
        <van-swipe-cell
          class="shop-status-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <div @click="selectedDealer(item, index)">
            <div class="dealerText">
              <p class="detailTitle">{{ item.locationName }}</p>
              <p>{{ item.locationCode }}</p>
            </div>
            <div class="bottomBox"></div>
          </div>
        </van-swipe-cell>
        <!-- </van-list> -->
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getShopListBySelf, postShopOperation } from "@/api/shop";

export default {
  props: {
    allList: {
      type: Array,
    },
  },
  data() {
    return {
      dealerShow: false,
      keyword: "",
      page_no: 0,
      page_size: 20,
      loading: false,
      error: false,
      noRes: false,
      finished: false,
      list: [],
    };
  },
  methods: {
    selectedDealer(val) {
      console.log(val, "111");
      this.$emit("ok", val);
      this.onCancel();
    },
    onShow() {
      this.dealerShow = true;
      this.list = this.allList;
    },
    onSearchChange(value) {
      console.log("value2223", value);
      this.list = this.allList;
      if (this.list.length > 0) {
        const _list = [];
        this.list.map((item) => {
          if (
            typeof value === "string" &&
            item.locationName &&
            item.locationCode
          ) {
            const _key = String(value).toLowerCase();
            if (
              item.locationName.toLowerCase().includes(_key) ||
              item.locationCode.toLowerCase().includes(_key)
            ) {
              _list.push(item);
            }
          }
        });
        this.list = [..._list];
      }
    },
    onCancel() {
      this.dealerShow = false;
      this.keyword = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.detailTitleBox {
  .bottomBox {
    height: 0.2rem;
    background-color: #f5f5f5;
  }
  .dealerText {
    margin: 0.3rem;
    .detailTitle {
      margin-bottom: 0.2rem;
    }
  }
}
</style>