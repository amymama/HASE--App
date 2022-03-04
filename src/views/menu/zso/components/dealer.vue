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
        :title="$t('Dealer Name')"
      />
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
      <div class="detailTitleBox">
        <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
        <van-list
          v-else
          v-model="loading"
          :finished="finished"
          :finished-text="$t('shopCommon.NoMoreData')"
          @load="getDataDealer"
          :error.sync="error"
          :error-text="$t('shopCommon.RequestErrorText')"
        >
          <van-swipe-cell
            class="shop-status-item"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="dealerText">
              <p class="detailTitle">MKT-Bathtowel Gray:Premium WH</p>
              <p>Price:$0</p>
            </div>
            <div class="bottomBox"></div>
          </van-swipe-cell>
        </van-list>
      </div>
    </van-popup>
  </div>
</template>
<script>
// import { orderGetDealerList } from "@/api/shop";
import { getShopListBySelf, postShopOperation } from "@/api/shop";
import { orderGetDealerList } from "@/api/order";
export default {
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
  created() {
    // this.getData();
  },
  methods: {
    getDataDealer() {
      setTimeout(() => {
        this.page_no++;
        getShopListBySelf(
          Object.assign(
            {},
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
      }, 100);
    },
    onSearch() {},
    onShow() {
      this.dealerShow = true;
    },
    onCancel() {
      this.dealerShow = false;
    },
    // getData() {
    //   orderGetDealerList({ userId: this.$store.getters.userInfo.id })
    //     .then((res) => {
    //       const { success, data } = res;
    //       console.log(data);
    //       if (success) {
    //       }
    //     })
    //     .catch((error) => {});
    // },
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