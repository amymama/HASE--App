<template>
  <div class="search-bar">
    <!-- <van-popup
      v-model="dealerShow"
      :close-on-click-overlay="false"
      :style="{
        width: '100%',
        height: '100%',
      }"
    > -->
      <van-nav-bar left-arrow @click-left="goBack" title="Order detail" />
      <!-- <van-cell-group size="small"> -->
      <div class="cardBagBox">
        <div class="cardBox">
          <van-field
            input-align="right"
            readonly
            v-model="formDataDetail.dealerName"
            :label="$t('Dealer Name')"
          />
          <van-field
            input-align="right"
            readonly
            v-model="formDataDetail.gtmPoNumber"
            :label="$t('Po Number')"
          />
          <van-field
            input-align="right"
            readonly
            v-model="formDataDetail.appOrder"
            :label="$t('GTM Order No')"
            label-width="150"
          />
          <van-field
            input-align="right"
            readonly
            v-model="formDataDetail.zsoNo"
            :label="$t('ZSO No')"
          />
          <van-field
            input-align="right"
            readonly
            v-model="formDataDetail.TotalInvoiveValue"
            label-width="150"
            :label="$t('Total Invoice Value')"
          />
        </div>
        <div class="cardBox">
          <van-field
            input-align="right"
            readonly
            v-model="formDataDetail.payerName"
            :label="$t('Payer')"
          />
          <van-field
            input-align="right"
            readonly
            v-model="formDataDetail.billToName"
            :label="$t('Bill To')"
          />
          <van-field
            input-align="right"
            readonly
            v-model="formDataDetail.shipToName"
            :label="$t('Ship To')"
          />
        </div>
        <div class="cardBox">
          <div v-for="(item, index) in orderDNsList" :key="index">
            <van-collapse v-model="activeNames" accordion>
              <div v-for="(dnItem, dnIndex) in item.DNItems" :key="dnIndex">
                <van-collapse-item :title="item.itemCode" :name="index">
                  <template #title>
                    <div class="dnTitleBox">
                      <div>{{ item.itemCode }}</div>
                      <div>{{ item.dnNum }}</div>
                      <div>{{ item.dnDate }}</div>
                    </div>
                  </template>
                  <van-cell :value="dnItem.dnDate">
                  <!-- <van-cell value="2022-03-31"> -->
                    <template #title>
                      <div class="dnTitleBox">
                        <div>{{ dnItem.itemCode }}</div>
                        <div>{{ dnItem.invoiceNum }}</div>
                        <!-- <div>5555</div> -->
                      </div>
                    </template>
                  </van-cell>
                </van-collapse-item>
              </div>
            </van-collapse>
          </div>
        </div>
        <div class="cardBox" v-show="orderGoodsList.length>0">
          <van-cell>
            <div
              class="bottomBox"
              v-for="(item, index) in orderGoodsList"
              :key="index"
            >
              <div class="bottomBoxLeft">
                <div>
                  <h4>{{ item.orderProductModel }}</h4>
                </div>
                <div style="padding-top: 0.3rem">
                  <div>{{ item.orderProductNum }}</div>
                  <div style="padding-top: 0.3rem">
                    Invoice
                    <span style="color: #100aff; padding-left: 0.2rem"
                      >RS.THB {{ item.invoice }}</span
                    >
                  </div>
                  <!-- <div style="padding-top: 0.3rem;display:flex;justify-content: space-between;">
                    <div>{{ item.deliveryStatus }}aa</div>
                    <div>{{ item.rejectReason }}bb</div>
                  </div> -->
                  <div style="padding-top: 0.3rem;width:100%;display:flex;justify-content: space-between;" v-show="item.deliveryStatus">
                    <div style="width:35%">{{$t('Delivery Status')}}</div>
                    <div style="width:65%;padding-left:0.2rem;"
                      >{{ item.deliveryStatus }}</div
                    >
                  </div>
                  <div style="padding-top: 0.3rem;width:100%;display:flex;justify-content: space-between;" v-show="item.rejectReason">
                    <div style="width:35%">{{$t('Reject Reason')}}</div>
                    <div style="width:65%;padding-left:0.2rem;"
                      >{{ item.rejectReason }}</div
                    >
                  </div>
                </div>
              </div>
              <div class="bottomBoxRight">X{{ item.count }}</div>
            </div>
          </van-cell>
        </div>
      </div>
      <!-- </van-cell-group> -->
    <!-- </van-popup> -->
  </div>
</template>
<script>
import { GetOrderDetail } from "@/api/order";
import cart from "../../zso/components/cart.vue";
export default {
  components: { cart },
  data() {
    return {
      // dealerShow: false,
      name: "",
      formDataDetail: {
        dealerName: "",
        billToName: "",
        payerName: "",
        shipToName: "",
        gtmPoNumber: "",
        zsoNo: "",
        TotalInvoiveValue: "",
        appOrder: "",
      },
      orderGoodsList: [],
      orderDNsList: [],
      activeNames: "0",
    };
  },
  created(){
     this.onShow()
  },
  methods: {
    onShow() {
      this.$toast.loading({ duration: 0, forbidClick: true, mask: true });
      console.log('this.$route.params.id',this.$route.params.id)
      GetOrderDetail({ new_order_summaryId: this.$route.params.id })
        .then((res) => {
          if (res.success) {
            this.formDataDetail.dealerName = res.data.dealerName;
            this.formDataDetail.billToName = res.data.billToName;
            this.formDataDetail.payerName = res.data.payerName;
            this.formDataDetail.shipToName = res.data.shipToName;
            this.formDataDetail.gtmPoNumber = res.data.gtmPoNumber;
            this.formDataDetail.appOrder = res.data.appOrder;
            this.formDataDetail.zsoNo = res.data.zsoNo;
            this.formDataDetail.TotalInvoiveValue = res.data.TotalInvoiveValue;
            this.orderGoodsList = res.data.orderGoodsList;
            this.orderDNsList = res.data.orderDNs;
            this.$toast.clear();
          } else {
            this.$toast.clear();
          }
        })
        .catch((e) => {
          this.$toast.clear();
        });
    },
    onCancel() {
      // this.dealerShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-bar {
  .cardBagBox {
    background-color: #f1f1f1;
    padding: 0.2rem 0.3rem;
  }
  .cardBox {
    // background-color: #f1f1f1;
    border-radius: 20px;
    overflow: hidden;
    margin: 0.3rem 0;
  }
  .bottomBox {
    margin: 0.2rem;
    width: 100%;
    display: flex;
    .bottomBoxLeft {
      width: 90%;
    }
    .bottomBoxRight {
      width: 10%;
      padding-top: 0.5rem;
    }
  }
  .dnTitleBox {
    display: flex;
    justify-content: space-between;
  }
}
</style>