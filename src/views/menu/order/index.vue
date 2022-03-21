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
    <van-tabs v-model="active" swipeable @change="tabsChange">
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
              <div
                class="detailBox"
                @click="$refs.orderDetailShow.onShow(item.new_order_summaryId)"
              >
                <div class="box">
                  <h4 class="text">Dealer Name:{{ item.new_dealer_name }}</h4>
                  <p class="text">ZSO</p>
                  <p class="text">Total Price:{{item.new_order_amount}}</p>
                </div>
              </div>
            </van-swipe-cell>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="Pending">
        <!-- list2-->
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
              <div class="detailBox">
                <div
                  class="box"
                  @click="
                    $refs.orderDetailShow.onShow(item.new_order_summaryId)
                  "
                >
                  <h4 class="text">Dealer Name:{{ item.new_dealer_name }}</h4>
                  <p class="text">Zso</p>
                  <p class="text">Total Price:{{item.new_order_amount}}</p>
                </div>
                <div class="buttonBox">
                  <van-button
                    type="info"
                    size="mini"
                    @click="resubmitClick(item.new_order_summaryId)"
                    >Resubmit</van-button
                  >
                </div>
              </div>
            </van-swipe-cell>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <orderDetail ref="orderDetailShow" />
  </div>
</template>
<script>
import { GetOrderList, ReSubmitOrder } from "@/api/order";
import orderDetail from "./components/orderDetail.vue";
export default {
  components: {
    orderDetail,
  },
  data() {
    return {
      active: 0,
      orderState: 1,
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
    resubmitClick(id) {
      this.$toast.loading({ duration: 0 });
      ReSubmitOrder({ orderId: id })
        .then((res) => {
          console.log(res, "ss");
          if (res.success) {
            this.$toast.success("Success");
            // this.$toast.clear();
          } else {
            this.$toast.fail("Network error");
          }
        })
        .catch((e) => {
          this.$toast.fail("Network error");
        });
    },
    tabsChange(val) {
      this.keyword = "";
      this.orderState = val == 0 ? 1 : 2;
      this.initData();
    },
    onLoad() {
      setTimeout(() => {
        this.page_no++;
        GetOrderList(
          Object.assign(
            {
              userId: this.$store.getters.userInfo.id,
              orderState: this.orderState,
              // orderState: 2,
              searchValue: this.keyword,
              // orderby: "string",
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
      }, 100);
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
    onSearch() {
      this.initData();
    },
    onCancel() {
      this.initData();
    },
  },
};
</script>
<style lang="scss" scoped>
.shop-status-list {
  padding: 20px;
  background: #f5f5f5;
}
.shop-status-item {
  margin-bottom: 32px;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.1);
}
.detailBox {
  margin: 0.5rem 0.3rem;
  position: relative;
  .text {
    margin: 0.3rem;
  }
  .buttonBox {
    position: absolute;
    left: 7.2rem;
    bottom: 0rem;
  }
}
</style>