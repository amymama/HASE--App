<template>
  <div class="confirmBox">
    <van-popup
      v-model="orderConfirmShow"
      :close-on-click-overlay="false"
      :style="{
        width: '100%',
        height: '100%',
      }"
    >
      <!-- navBar -->
      <div class="top"></div>
      <div class="topBox">
        <van-nav-bar
          left-arrow
          @click-left="onCancel"
          :title="$t('Order Confirm')"
        />
      </div>
      <van-cell-group>
        <!-- input -->
        <van-field
          v-model="formData.orderType"
          input-align="right"
          label-width="150"
          clearable
          label="Order Type"
          placeholder=""
          readonly
          @click-right-icon="$toast('question')"
        />
        <van-field
          input-align="right"
          label-width="150"
          v-model="formData.dealerName"
          clearable
          placeholder=""
          label="Dealer"
          readonly
        />
        <van-field
          v-model="formData.creditBalance"
          input-align="right"
          clearable
          placeholder=""
          label="Current AR Balance"
          label-width="150"
          readonly
        />
        <van-field
          v-model="formData.billToName"
          input-align="right"
          clearable
          placeholder=""
          label="Bill To"
          is-link
          label-width="150"
          readonly
          @click="billToShow"
        />
        <van-field
          input-align="right"
          v-model="formData.payerName"
          clearable
          placeholder=""
          label="Payer"
          label-width="150"
          is-link
          readonly
          @click="payerShowClick"
        />
        <!-- v-model="" -->
        <van-field
          input-align="right"
          clearable
          placeholder=""
          label-width="150"
          readonly
          label="Select Delivery Address"
        />
        <van-field
          v-model="formData.CompanyName"
          clearable
          input-align="right"
          placeholder=""
          label="Company Name"
          label-width="150"
        />
        <van-field
          v-model="formData.STREET"
          clearable
          placeholder=""
          input-align="right"
          label="Street"
          label-width="150"
        />
        <van-field
          v-model="formData.HOUSE_NUMBER"
          clearable
          placeholder=""
          input-align="right"
          label="House Number"
          label-width="150"
        />
        <van-field
          v-model="formData.STREET2"
          clearable
          placeholder=""
          input-align="right"
          label="Street2"
          label-width="150"
        />
        <!-- <div style="float:left"> -->
        <van-field
          v-model="formData.POST_CODE"
          clearable
          placeholder=""
          input-align="right"
          label="Postal Code"
          label-width="150"
        />
        <van-field
          v-model="formData.CITY"
          clearable
          placeholder=""
          input-align="right"
          label="City"
          label-width="150"
        />
        <!-- </div> -->
        <van-field
          v-model="formData.Phone"
          clearable
          placeholder=""
          input-align="right"
          label="Phone"
          label-width="150"
        />
        <van-field
          v-model="formData.DeliveryDate"
          clearable
          placeholder=""
          input-align="right"
          label="Delivery Date"
          label-width="150"
          is-link
          @click="currentDateClick"
          readonly
        />
        <!-- <van-field
          v-model="username"
          clearable
          placeholder=""
          input-align="right"
          label="Dealer Pickup by themselves"
          label-width="185"
        /> -->
        <van-cell title="Dealer Pickup by themselves">
          <van-checkbox
            v-model="isLogisticShow"
            @change="isLogisticClick"
          ></van-checkbox>
        </van-cell>
        <!-- <van-cell title="Foc.inv">
          <van-checkbox v-model="isLogisticShow"></van-checkbox>
        </van-cell> -->
        <van-field
          v-show="isLogisticShow"
          v-model="formData.logisticVendorName"
          clearable
          placeholder=""
          input-align="right"
          label="Logistic vendor"
          label-width="150"
          is-link
          readonly
          @click="onLogisticShow"
        />
        <van-field
          v-model="formData.text"
          clearable
          placeholder=""
          input-align="right"
          label="Text"
          label-width="150"
        />
        <van-field
          v-model="formData.poNumber"
          clearable
          placeholder=""
          input-align="right"
          label="PO Number"
          label-width="150"
        />
        <van-field
          v-model="formData.userRealname"
          clearable
          placeholder=""
          input-align="right"
          label="Sale Agent"
          label-width="150"
          readonly
        />
        <van-field
          v-model="username"
          clearable
          placeholder=""
          input-align="right"
          label="Photos"
          label-width="150"
          is-link
          readonly
        />
      </van-cell-group>
      <!-- 商品 list-->
      <div class="shop-status-list">
        <van-swipe-cell
          class="shop-status-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <van-cell-group class="groupBox">
            <div class="listBox">
              <div class="listImage">
                <van-image
                  width="2.2rem"
                  height="1.3rem"
                  fit="cover"
                  :src="item.imgUrl ? item.imgUrl.split(',')[0] : ''"
                />
              </div>
              <div class="listDetailBox">
                <h3>{{ item.new_product_model }}</h3>
                <p class="textBox" style="color: #bcc1c1">
                  {{
                    item.new_product_number +
                    "(" +
                    item.new_storage_location +
                    ")"
                  }}
                </p>
                <div class="lietItemBox">
                  <span calss="textBox itemBox" style="color: #ef9f61"
                    >Stock:{{ item.inventory }}</span
                  >
                  <span calss="textBox itemNet" style="color: #ef9f61"
                    >Price:${{ item.retailprice }}</span
                  >
                </div>
                <div class="lietItemBox">X{{ item.new_product_counts }}</div>
              </div>
            </div>
            <!-- <div class="numButtonBox">
                <div class="numButton">
                  <van-stepper
                    :disabled="isView"
                    button-size="24px"
                    min="1"
                    max="999"
                    :integer="true"
                    v-model.number="item.new_product_counts"
                    @change="numAddClick(item)"
                  />
                </div>
              </div> -->
          </van-cell-group>
          <!-- <span slot="right" class="slotGroupBox" @click="deleteClick(item)"
            >Delete</span
          > -->
        </van-swipe-cell>
      </div>
      <!--footer Confirm -->
      <div class="submitBox">
        <div class="submitPrice">
          <p class="text">Total Net Price :${{ totalNetPrice }}</p>
          <p class="text">Total Tax Price :${{ totalTaxPrice }}</p>
          <p class="text">
            Total Price :<span style="color: #fa0e0e; font-weight: 700"
              >${{ totalPrice }}</span
            >
          </p>
        </div>
        <van-button class="submitButton" color="#407FDC" @click="checkOutClick"
          >Check Out</van-button
        >
      </div>
    </van-popup>
    <!-- 弹框 -->
    <van-popup
      position="bottom"
      v-model="LogisticsListShow"
      :style="{
        width: '100%',
      }"
    >
      <van-picker
        show-toolbar
        :columns="LogisticsList"
        @cancel="onLogisticsCancel"
        @confirm="onLogisticsConfirm"
        value-key="text"
        :confirm-button-text="$t('pmt.confirmButton')"
        :cancel-button-text="$t('pmt.cancelButton')"
      />
    </van-popup>
    <van-popup
      position="bottom"
      v-model="ShipToShow"
      :style="{
        width: '100%',
      }"
    >
      <van-picker
        show-toolbar
        :columns="allShipToList"
        @cancel="onShipToCancel"
        @confirm="onShipToConfirm"
        value-key="text"
        :confirm-button-text="$t('pmt.confirmButton')"
        :cancel-button-text="$t('pmt.cancelButton')"
      />
    </van-popup>
    <van-popup
      position="bottom"
      v-model="payerShow"
      :style="{
        width: '100%',
      }"
    >
      <van-picker
        show-toolbar
        :columns="allShipToList"
        @cancel="onPayerCancel"
        @confirm="onPayerConfirm"
        value-key="text"
        :confirm-button-text="$t('pmt.confirmButton')"
        :cancel-button-text="$t('pmt.cancelButton')"
      />
    </van-popup>
    <van-popup
      position="bottom"
      v-model="currentDateShow"
      :style="{
        width: '100%',
      }"
    >
      <!-- v-model="currentDate" -->
      <van-datetime-picker
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmDate"
        @cancel="onCancelDate"
      />
    </van-popup>
  </div>
</template>
<script>
import moment from "moment";
import {
  GetDearlerCreditLimitFrom,
  GetLogisticsList,
  SubmitOrder,
  GetPartnerListByDealer,
} from "@/api/order";
export default {
  props: {
    totalNetPrice: {
      type: Number,
    },
    totalTaxPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    orderConfirmShow: {
      type: Boolean,
    },
    selectedLocation: {
      type: Object,
    },
    selectedShipTo: {
      type: Object,
    },
    selectedDealer: {
      type: Object,
    },
    list: {
      type: Array,
    },
  },
  watch: {
    orderConfirmShow: {
      handler(val) {
        console.log(val, "valvalvalvalvalvalval", this.list);
        this.formData.shipToId = this.selectedShipTo.partnerId;
        this.formData.shipToCode = this.selectedShipTo.partnerCode;
        this.formData.shipToName = this.selectedShipTo.partnerName;
        this.formData.dealerId = this.selectedDealer.dealerId;
        this.formData.dealerCode = this.selectedDealer.dealerCode;
        this.formData.dealerName = this.selectedDealer.dealerName;
        let arr = this.list;
        this.formData.productGoodsList = [];
        arr.forEach((item) => {
          const obj = {
            cartId: item.new_order_cartId,
            productId: item.new_product_id,
            productNum: item.new_product_number,
            productModel: item.new_product_model,
            salesCount: item.new_product_counts,
            salesPrice: item.retailprice,
            stroageLocation: item.new_storage_location,
          };
          this.formData.productGoodsList.push(obj);
        });
        console.log(
          this.formData.productGoodsList,
          "this.formData.productGoodsList"
        );
        // this.formData.stroageLocation=this.selectedLocation.new_storage_location
        if (val) {
          this.onShow();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      username: "",
      currentDateShow: false,
      minDate: new Date(),
      maxDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 3000),
      isLogisticShow: false,
      formData: {
        orderType: "ZSO",
        userId: this.$store.getters.userInfo.id,
        userRealname: this.$store.getters.userInfo.realname,
        dealerId: "",
        dealerCode: "",
        dealerName: "",
        shipToId: "",
        shipToCode: "",
        shipToName: "",
        billToId: "",
        billToCode: "",
        billToName: "",
        payerId: "",
        payerCode: "",
        payerName: "",
        logisticVendorName: "",
        logisticVendorCode: "",
        text: "",
        poNumber: "",
        pickupByThemselve: 0, //0：未选中，1：已选中,
        orderAmount: this.totalPrice,
        orderTax: this.totalTaxPrice,
        orderNetAmount: this.totalNetPrice,
        productCount: 0,
        creditBalance: 0,
        CompanyName: "",
        STREET: "",
        STREET2: "",
        HOUSE_NUMBER: "",
        POST_CODE: "",
        Phone: "",
        DeliveryDate: "",
        STREET3: "", //暂时不传
        stroageLocation: "", //暂时不传
        plant: "", //暂时不用传
        CITY: "",
        // VDATU: "string",
        // NAME1: "string",
        // VSNMR_V: "string",
        productGoodsList: [
          {
            cartId: "",
            productId: "",
            productNum: "",
            productModel: "",
            salesCount: 0,
            salesPrice: 0,
            stroageLocation: "",
          },
        ],
        Base64ImageList: [], //最多5张图片
      },
      LogisticsList: [], //下拉选项
      LogisticsListShow: false,
      ShipToShow: false,
      payerShow: false,
      allShipToList: [], //下拉选项
    };
  },
  methods: {
    //下单
    checkOutClick() {
      SubmitOrder(this.formData)
        .then((res) => {
          if (res.success) {
            this.$toast.success("success");
            this.onCancel();
            this.$emit("getDataListCart");
          } else {
            this.$toast.fail("Network error");
          }
        })
        .catch((e) => {
          this.$toast.fail("Network error");
        });
    },
    //获取数据
    onShow() {
      GetPartnerListByDealer({
        dealer_code: this.selectedDealer.dealerCode,
        type: "SH",
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            var Items = data || [];
            // this.allShipToList = this.allShipToList.concat(Items);
            console.log("allShipToList", this.allShipToList);
            Items.forEach((item) => {
              this.allShipToList.push({
                text: item.partnerName,
                value: item.partnerCode,
                id: item.partnerId,
              });
            });
          }
        })
        .catch(() => {});
      //下拉框数据
      GetLogisticsList()
        .then((res) => {
          if (res.success) {
            let arr = res.data;
            arr.forEach((item) => {
              this.LogisticsList.push({
                text: item.logisticsName,
                value: item.logisticsCode,
              });
            });
          }
        })
        .catch((e) => {});
      GetDearlerCreditLimitFrom({
        // dearlerCode: this.selectedDealer.dealerCode,
        dearlerCode: "6000050431",
      })
        .then((res) => {
          if (res.success) {
            this.formData.creditBalance = res.data[0].creditBalance;
          }
          console.log(res, "resres");
        })
        .catch((e) => {});
    },
    //关闭弹框
    onCancel() {
      this.$emit("confirmShowCencel");
    },
    //选择器弹框
    onLogisticShow() {
      this.LogisticsListShow = true;
    },
    onLogisticsCancel() {
      this.LogisticsListShow = false;
    },
    onLogisticsConfirm(type, item) {
      this.formData.logisticVendorCode = type.value;
      this.formData.logisticVendorName = type.text;
      this.LogisticsListShow = false;
      console.log(type, item);
    },
    onShipToCancel() {
      this.ShipToShow = false;
    },
    onShipToConfirm(val) {
      console.log(val, "billto");
      this.formData.billToCode = val.value;
      this.formData.billToName = val.text;
      this.formData.billToId = val.id;
      this.ShipToShow = false;
    },
    billToShow() {
      this.ShipToShow = true;
    },
    payerShowClick() {
      this.payerShow = true;
    },
    onPayerCancel() {
      this.payerShow = false;
    },
    onPayerConfirm(val) {
      this.formData.payerCode = val.value;
      this.formData.payerName = val.text;
      this.formData.payerId = val.id;
      this.payerShow = false;
    },
    isLogisticClick(val) {
      this.formData.pickupByThemselve = val ? 1 : 0;
    },
    onConfirmDate(date) {
      console.log(date, "date");
      this.formData.DeliveryDate = moment(date).format("YYYY-MM-DD");
      // this.formData.DeliveryDate = moment(date).format("YYYY-MM-DD hh:mm:ss");
      this.currentDateShow = false;
    },
    onCancelDate() {
      this.currentDateShow = false;
    },
    currentDateClick() {
      this.currentDateShow = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.confirmBox {
  .top {
    // height: 1.5rem;
    overflow: hidden;
  }
  .topBox {
    width: 100%;
    // height: 5rem;
    position: sticky;
    top: 0rem;
    z-index: 1;
  }
  .bottomBox {
    height: 0.2rem;
    background-color: #f5f5f5;
  }
  .shop-status-list {
    padding: 18px;
    background: #f5f5f5;
  }
  .shop-status-item {
    margin-bottom: 32px;
    border-radius: 20px;
    overflow: hidden;
    background: #fef9f3;
    box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.1);
  }
  .groupBox {
    background-color: #fef9f3;
  }
  .slotGroupBox {
    color: #f5f5f5;
    font-weight: 700;
    height: 6rem;
    line-height: 4rem;
    width: 100%;
    padding-right: 1rem;
    padding-left: 0.4rem;
    background-color: #ff4444;
    display: flex;
    flex-direction: column;
  }
  .listBox {
    margin: 0 0.6rem;
    display: flex;
    .listImage {
      margin: 0.8rem 0.3rem 0.3rem;
    }
    .listDetailBox {
      width: 57%;
      margin: 0.4rem 0.1rem 0.2rem 0rem;
      .lietItemBox {
        margin: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        .itemBox {
          flex: 2;
        }
        .itemNet {
          flex: 1;
        }
      }

      .textBox {
        margin: 0.2rem 0;
      }
    }
  }
  .submitBox {
    width: 100%;
    position: sticky;
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