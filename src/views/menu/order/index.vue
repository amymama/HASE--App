<template>
  <div class="orderBox">
    <van-nav-bar left-arrow @click-left="goBack" :title="$t('Order List')" />
    <!-- Search bar -->
    <div class="search-top">
      <van-search
        v-model="keyword"
        show-action
        autofocus="false"
        placeholder="Please input keywords"
        background="#f2f2f2"
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <!-- tabs -->
    <van-tabs v-model="active" swipeable>
      <van-tab title="Success">
        <!-- list 1 -->
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
            </van-swipe-cell>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="Pending"> <!-- list2-->内容 1</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getShopListBySelf, postShopOperation } from "@/api/shop";
export default {
  data() {
    return {
      active: "1",
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
    onSearch() {},
    onCancel() {},
    onLoad() {
      setTimeout(() => {
        this.page_no++;
        getShopListBySelf(
          Object.assign({}, {
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
  },
};
</script>