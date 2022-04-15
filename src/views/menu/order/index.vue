<template>
  <div class="orderBox">
    <div class="top">
      <div class="topBox">
        <van-nav-bar
          left-arrow
          @click-left="goRouterLeft"
          :title="$t('Order List')"
        />
        <!-- Search bar -->
        <div class="search-top-orderlist">
          <van-search
            v-model="keyword"
            :placeholder="$t('Please input keywords')"
            background="none"
            shape="round"
            show-action
            @search="onSearchOrderList"
            @cancel="onCancelOrderList"
          />
        </div>
      </div>
    </div>
    <!-- tabs -->
    <div class="oederListBox">
      <van-tabs v-model="active" swipeable @change="tabsChange">
        <van-tab :title="$t('Success')">
          <!-- list 1 -->
          <div class="shop-status-list">
            <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
            <van-list
              v-else
              v-model="loading"
              :finished="finished"
              :finished-text="$t('NoMoreData')"
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
                  @click="orderDetailShow(item.new_order_summaryId)"
                >
                  <div class="box">
                    <h4 class="text">
                      {{ $t("Dealer Name") }}:{{ item.new_dealer_name }}
                    </h4>
                    <p class="text">{{ $t("ZSO") }}</p>
                    <p class="text">
                      {{ $t("Total Price") }}:{{ item.new_order_amount }}
                    </p>

                    <div
                      class="prouctTitleBox"
                      v-for="(orderItem, orderIndex) in item.OrderdGoodsList"
                      :key="orderIndex"
                    >
                      <h3 class="text">{{ orderItem.new_product_model }}</h3>
                      <div class="text">
                        {{ orderItem.new_product_number }} 
                        <span style="padding-left: 0.2rem">invoice</span>
                        <span style="color: #5151ff; padding-left: 0.2rem"
                          >{{ $t("SAR") }}.{{ orderItem.new_sales_price }}</span
                        >
                      </div>
                      <div class="prouctNumberBox">
                        X{{ orderItem.new_sales_counts }}
                      </div>
                    </div>
                  </div>
                </div>
              </van-swipe-cell>
            </van-list>
          </div>
        </van-tab>
        <van-tab :title="$t('Pending')">
          <!-- list2-->
          <div class="shop-status-list">
            <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
            <van-list
              v-else
              v-model="loading"
              :finished="finished"
              :finished-text="$t('NoMoreData')"
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
                    @click="orderDetailShow(item.new_order_summaryId)"
                  >
                    <h3 class="text">
                      {{ $t("Dealer Name") }}:{{ item.new_dealer_name }}
                    </h3>
                    <p class="text">{{ $t("Zso") }}</p>
                    <p class="text">
                      {{ $t("Total Price") }}:{{ item.new_order_amount }}
                    </p>
                    <div
                      class="prouctTitleBox"
                      v-for="(orderItem, orderIndex) in item.OrderdGoodsList"
                      :key="orderIndex"
                    >
                      <h3 class="text">{{ orderItem.new_product_model }}</h3>
                      <div class="text">
                        {{ orderItem.new_product_number }} 
                        <span style="padding-left: 0.2rem">invoice</span>
                        <span style="color: #5151ff; padding-left: 0.2rem"
                          >{{ $t("SAR") }}.{{ orderItem.new_sales_price }}</span
                        >
                      </div>
                      <div class="prouctNumberBox">
                        X{{ orderItem.new_sales_counts }}
                      </div>
                    </div>
                  </div>
                  <div class="buttonBox">
                    <!-- :loading="resubmitLoading" -->
                    <van-button
                      type="info"
                      size="small"
                      @click="resubmitShow(item.new_order_summaryId)"
                      >{{ $t("Resubmit") }}</van-button
                    >
                    <!-- @click="resubmitClick(item.new_order_summaryId)" -->
                  </div>
                </div>
              </van-swipe-cell>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-action-sheet v-model="resubmitIsShow" :title="$t('Confirm')">
      <div class="addToCartBox">
        <div class="lietItemBox">
          <!-- <span calss="textBox itemBox">{{ cartParams.productNumber }}</span>
        <span calss="textBox itemNet"
          >{{ $t("Stock") }}:{{ cartParams.stock }}</span
        > -->
          {{ $t("Confirm the submission of the order?") }}
        </div>
        <div class="addCartFooter">
          <van-button class="cancel" @click="resubmitCancel" type="danger"
            >Cancel</van-button
          >
          <van-button
            class="addCart"
            :loading="resubmitLoading"
            @click="resubmitClick"
            type="info"
            >Ok</van-button
          >
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { GetOrderList, ReSubmitOrder } from "@/api/order";
export default {
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
      resubmitLoading: false,
      resubmitIsShow: false,
      orderSummaryId: "",
    };
  },
  methods: {
    orderDetailShow(id) {
      this.$router.push({
        name: "orderDetail",
        params: {
          id: id,
        },
      });
    },
    resubmitClick() {
      this.$toast.loading({ duration: 0, forbidClick: true, mask: true });
      this.resubmitLoading = true;
      ReSubmitOrder({ orderId: this.orderSummaryId })
        .then((res) => {
          console.log(res, "ss");
          if (res.success) {
            this.$toast.success(res.message);
            this.resubmitLoading = false;
            this.initDataOrderList();
          } else {
            this.$toast.fail("Network error");
            this.resubmitLoading = false;
          }
        })
        .catch((e) => {
          this.$toast.fail("Network error");
          this.resubmitLoading = false;
        });
    },
    resubmitShow(id) {
      console.log("11");
      this.resubmitIsShow = true;
      this.orderSummaryId = id;
    },
    resubmitCancel() {
      this.resubmitIsShow = false;
    },
    tabsChange(val) {
      console.log(val);
      this.keyword = "";
      this.orderState = val == 0 ? 1 : 2;
      this.initDataOrderList();
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
    initDataOrderList() {
      this.list = [];
      this.page_no = 0;
      this.loading = true;
      this.finished = false;
      this.noRes = false;
      this.error = false;
      this.onLoad();
    },
    goRouterLeft() {
      this.$router.push("/menu");
    },
    onSearchOrderList() {
      this.initDataOrderList();
    },
    onCancelOrderList() {
      this.initDataOrderList();
    },
  },
};
</script>
<style lang="scss" scoped>
.orderBox {
  // width: 100%;
  // height: 100%;
  // overflow: hidden;
  .top {
    height: 3rem;
    width: 100%;
  }
  .topBox {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    .search-top-orderlist {
      background: #f5f5f5;
    }
  }
  // .oederListBox {
  // overflow: auto;
  // height: 90%;
  // }
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
    .prouctTitleBox {
      margin: 0.6rem 0.5rem;
      position: relative;
      .prouctNumberBox {
        position: absolute;
        left: 7rem;
        bottom: 0rem;
      }
    }
    .buttonBox {
      position: absolute;
      left: 7rem;
      top: 0.9rem;
    }
  }
  .lietItemBox {
    text-align: center;
    font-size: 28px;
    margin: 0.9rem;
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