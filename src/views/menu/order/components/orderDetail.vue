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
      <van-nav-bar left-arrow @click-left="onCancel" title="Order detail" />
      <van-cell-group size="small">
        <van-field
          input-align="right"
          readonly
          v-model="formDataDetail.new_dealer_name"
          :label="$t('Dealer Name')"
        />
        <van-field
          input-align="right"
          readonly
          v-model="formDataDetail.new_order_user_no"
          :label="$t('Po Number')"
        />
        <van-field
          input-align="right"
          readonly
          v-model="formDataDetail.new_order_auto_no"
          :label="$t('GTM Order No')"
        />
        <van-field
          input-align="right"
          readonly
          v-model="formDataDetail.new_order_sap_no"
          :label="$t('ZSO No')"
        />
        <van-field
          input-align="right"
          readonly
          v-model="formDataDetail.new_order_amount"
          label-width="150"
          :label="$t('Total Invoice Value')"
        />

        <van-field
          input-align="right"
          readonly
          v-model="formDataDetail.new_payer_name"
          :label="$t('Payer')"
        />
        <van-field
          input-align="right"
          readonly
          v-model="formDataDetail.new_bill_to_name"
          :label="$t('Bill To')"
        />
        <van-field
          input-align="right"
          readonly
          v-model="formDataDetail.new_ship_to_name"
          :label="$t('Ship To')"
        />

        <van-field input-align="right" readonly v-model="name" label="DN" />
        <van-field
          input-align="right"
          readonly
          v-model="name"
          label="INVOICED"
        />

        <van-cell>
          <div class="bottomBox">
            <div class="bottomBoxLeft">
              <div>
                <h4>HWM-T140N2:twin tuble/14KG</h4>
              </div>
              <div style="padding-top:0.3rem">
                <span>CAABX0E00</span>
                <span style="padding-left:0.6rem">Invoice <span style="color:#100aff;padding-left:0.2rem">RS.THB 30800.00</span></span>
              </div>
            </div>
            <div class="bottomBoxRight">X5</div>
          </div>
        </van-cell>
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script>
import { GetOrderDetail } from "@/api/order";
import cart from "../../zso/components/cart.vue";
export default {
  components: { cart },
  data() {
    return {
      dealerShow: false,
      name: "",
      formDataDetail: {
        new_dealer_name: "",
        new_bill_to_name: "",
        new_payer_name: "",
        new_ship_to_name: "",
        new_order_user_no: "",
        new_order_auto_no: "",
        new_order_sap_no: "",
        new_order_amount: "",
      },
    };
  },
  methods: {
    onShow(new_order_summaryId) {
      this.dealerShow = true;
      this.$toast.loading({ duration: 0,forbidClick:true,mask:true });
      GetOrderDetail({ new_order_summaryId: new_order_summaryId })
        .then((res) => {
          if (res.success) {
            this.formDataDetail.new_dealer_name = res.data.new_dealer_name;
            this.formDataDetail.new_bill_to_name = res.data.new_bill_to_name;
            this.formDataDetail.new_payer_name = res.data.new_payer_name;
            this.formDataDetail.new_ship_to_name = res.data.new_ship_to_name;
            this.formDataDetail.new_order_user_no = res.data.new_order_user_no;
            this.formDataDetail.new_order_user_no = res.data.new_order_user_no;
            this.formDataDetail.new_order_sap_no = res.data.new_order_sap_no;
            this.formDataDetail.new_order_amount = res.data.new_order_amount;
          }
          this.$toast.clear();
        })
        .catch((e) => {
          this.$toast.clear();
        });
    },
    onCancel() {
      this.dealerShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>