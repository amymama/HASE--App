<template>
  <div class="confirmBox">
    <div class="fatherBox">
      <!-- navBar -->
      <div class="scollrBox">
        <!-- <div class="topBox"> -->
        <van-nav-bar
          fixed
          left-arrow
          @click-left="goBack"
          :title="$t('Order Confirm')"
        />
        <!-- </div> -->
        <!-- <van-cell-group class="inputBox"> -->
        <div>
          <div class="inputBox_item">
            <!-- input -->
            <van-field
              v-model="formData.orderType"
              input-align="right"
              clearable
              :label="$t('Order Type')"
              placeholder=""
              readonly
              @click-right-icon="$toast('question')"
            />
            <van-field
              input-align="right"
              v-model="formData.dealerName"
              clearable
              placeholder=""
              :label="$t('Dealer')"
              readonly
            />
            <van-field
              v-model="formData.creditBalance"
              input-align="right"
              clearable
              placeholder=""
              :label="$t('Current AR Balance')"
              readonly
              label-width="150"
            />
            <van-field
              v-model="formData.billToName"
              input-align="right"
              clearable
              :placeholder="$t('Please input Bill To')"
              :label="$t('Bill To')"
              is-link
              readonly
              @click="billToShow"
            />
            <van-field
              input-align="right"
              v-model="formData.payerName"
              clearable
              :placeholder="$t('Please input Payer')"
              :label="$t('Payer')"
              is-link
              readonly
              @click="payerShowClick"
            />
          </div>
          <!-- v-model="" -->
          <!-- <van-field
            input-align="right"
            clearable
            placeholder=""
            readonly
            :label="$t('Select Delivery Address')"
            label-width="200"
          /> -->
          <div class="inputBox_item" style="margin-top: 0.4rem">
            <van-cell>
              <h3>{{ $t("Select Delivery Address") }}</h3>
            </van-cell>
            <van-field
              v-model="formData.CompanyName"
              clearable
              input-align="right"
              :placeholder="$t('Please input Company Name')"
              label-width="130"
              :label="$t('Company Name')"
            />
            <van-field
              v-model="formData.STREET"
              clearable
              :placeholder="$t('Please input Street')"
              input-align="right"
              :label="$t('Street')"
            />
            <van-field
              v-model="formData.STREET2"
              clearable
              :placeholder="$t('Please input Street2')"
              input-align="right"
              :label="$t('Street2')"
            />
            <van-field
              v-model="formData.HOUSE_NUMBER"
              clearable
              :placeholder="$t('Please input House Number')"
              input-align="right"
              :label="$t('House Number')"
              label-width="130"
            />

            <!-- <div style="float:left"> -->
            <van-field
              v-model="formData.POST_CODE"
              clearable
              :placeholder="$t('Please input Postal Code')"
              input-align="right"
              :label="$t('Postal Code')"
            />

            <!-- </div> -->
            <van-field
              v-model="formData.CITY"
              clearable
              :placeholder="$t('Please input City')"
              input-align="right"
              :label="$t('City')"
            />
            <van-field
              v-model="formData.Phone"
              clearable
              :placeholder="$t('Please input Phone')"
              input-align="right"
              :label="$t('Phone')"
            />
            <van-field
              v-model="formData.DeliveryDate"
              clearable
              :placeholder="$t('Please selecet Delivery Date')"
              input-align="right"
              :label="$t('Delivery Date')"
              is-link
              @click="currentDateClick"
              readonly
              label-width="120"
            />
            <van-cell :title="$t('Dealer Pickup by themselves')">
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
              :placeholder="$t('Please selecet Logistic vendor')"
              input-align="right"
              :label="$t('Logistic vendor')"
              label-width="130"
              is-link
              readonly
              @click="onLogisticShow"
            />
            <van-field
              v-model="formData.text"
              clearable
              :placeholder="$t('Please input Text')"
              input-align="right"
              :label="$t('Text')"
            />
            <van-field
              v-model="formData.poNumber"
              clearable
              :placeholder="$t('Please input PO Number')"
              input-align="right"
              :label="$t('PO Number')"
              readonly
            />
            <van-field
              v-model="formData.userRealname"
              clearable
              :placeholder="$t('Please input Sale Agent')"
              input-align="right"
              :label="$t('Sale Agent')"
              readonly
            />
            <van-field
              v-model="username"
              clearable
              placeholder=""
              input-align="right"
              :label="$t('Photos')"
              readonly
            />
            <div class="vanPhotos">
              <upload-imgs
                ref="uploader"
                folder="asset"
                prefix="POSMIO"
                class="paddingIconU"
                :max="4"
                :fileList="potopImageurl"
                @fileUploadOk="handleFileUploadOk"
                @fileDelete="handleFileDelete"
              />
              <!-- @fileDelete="handleFileDelete" -->
            </div>
          </div>
        </div>
        <!-- </van-cell-group> -->

        <!-- 商品 list-->
        <div class="shop-status-list">
          <van-swipe-cell
            class="shop-status-item"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="groupBox">
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
                          <div class="stocklistBox">
                  <div class="textbox" style="color: #bcc1c1">
                    {{
                      item.new_product_number +
                      "(" +
                      item.new_storage_location +
                      ")"
                    }}
                  </div>
                  <div class="stockBox">
                    <span style="font-weight:700;"
                      >{{ $t("Stock") }}
                      <span style="color: #ef9f61" >
                        {{ item.inventory }}
                      </span>
                    </span>
                  </div>
                </div>
                  <!-- <p class="textBox" style="color: #bcc1c1">
                    {{
                      item.new_product_number +
                      "(" +
                      item.new_storage_location +
                      ")"
                    }}
                  </p> -->
                  <div class="lietItemBoxNumber">
                    <!-- <div class="itemBoxNumber">
                      <div>{{ $t("Stock") }}</div>
                      <div class="itemMargin" style="color: #ef9f61">
                        {{ item.inventory }}
                      </div>
                    </div> -->
                    <div class="itemBoxNumber">
                      <div style="font-weight:700;">{{ $t("Net Price") }}</div>
                      <div class="itemMargin" style="color: #ef9f61">
                        {{ $t("SAR") }}:{{ item.retailprice }}
                      </div>
                    </div>
                    <div class="itemBoxNumber discount">
                      <div style="font-weight:700;">{{ $t("Discount") }}</div>
                      <div class="itemMargin" style="color: #ef9f61">
                        {{ item.discountPrice ? item.discountPrice : "0%" }}
                        <span class="itemMarginOff">OFF</span>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="lietItemBox">
                    <span calss="textBox itemBox" style="color: #ef9f61"
                      >Stock:{{ item.inventory }}</span
                    >
                    <span calss="textBox itemNet" style="color: #ef9f61"
                      >Price:${{ item.retailprice }}</span
                    >
                  </div> -->
                  <div class="lietItemBox">X{{ item.new_product_counts }}</div>
                </div>
              </div>
            </div>
          </van-swipe-cell>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <!--footer Confirm -->
      <div class="submitBox">
        <div class="submitPrice">
          <p class="text">
            {{$t('Total Net Price')}} :{{ $t("SAR") }} {{ priceSwitch(totalNetPrice) }}
          </p>
          <p class="text">
            {{$t('Total Tax Price')}} {{ $t("SAR") }} {{ priceSwitch(totalTaxPrice) }}
          </p>
          <p class="text">
            {{$t('Total Price')}} :<span style="color: #fa0e0e; font-weight: 700"
              >{{ $t("SAR") }} {{ priceSwitch(totalPrice) }}</span
            >
          </p>
        </div>
        <van-button
          class="submitButton"
          :loading="checkoutLoading"
          color="#407FDC"
          @click="checkOutClick"
          >{{$t('Check Out')}}</van-button
        >
      </div>
    </div>
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
      <change-avatar ref="changeAvatar" />
    </van-popup>
  </div>
</template>
<script>
import moment from "moment";
import UploadImgs from "@/components/UploadImgs";
import ChangeAvatar from "../../../me/components/CorpperAvatar.vue";
import {
  GetDearlerCreditLimitFrom,
  GetLogisticsList,
  SubmitOrder,
  GetPartnerListByDealer,
} from "@/api/order";
import { mapState } from "vuex";
export default {
  components: {
    ChangeAvatar,
    UploadImgs,
  },
  data() {
    return {
      potopImageurl: [],
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
        billToName: "", //默认值
        payerId: "",
        payerCode: "",
        payerName: "", //默认值
        logisticVendorName: "",
        logisticVendorCode: "",
        text: "",
        poNumber: this.$store.getters.userInfo.username,
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
        Base64ImageList: [
          // "hhttp://d2gmuflv362wio.cloudfront.net/HASE/UAT/asset/POSMIO_20220318103513800_55GNfi.jpg",
        ], //最多5张图片
      },
      LogisticsList: [], //下拉选项
      LogisticsListShow: false,
      ShipToShow: false,
      payerShow: false,
      allShipToList: [], //下拉选项

      totalNetPrice: 0,
      totalTaxPrice: 0,
      totalPrice: 0,
      list: [],
      checkoutLoading: false,
    };
  },
  computed: {
    ...mapState({
      orderConfirmData: (state) => state.order.orderConfirmData,
    }),
  },
  created() {
    this.onShow();
  },
  methods: {
    // 格式化后服务器返回照片
    handleFileUploadOk(file) {
      // this.formData.Base64ImageList = [];
      let imageurl = file.url;
      console.log("file.url:", file.url);
      this.potopImageurl.push({
        new_download_url: file.url,
        new_keyword: "retail",
        new_description: "retail",
        new_type: 1,
        new_filename: file.name,
        new_filesize: 0,
      });
      this.formData.Base64ImageList.push(file.base64);
      console.log("file.base64", file.base64);
      // console.log(" this.potopImageurl:", this.potopImageurl);
    },
    // Delete img
    handleFileDelete(dindex) {
      this.formData.Base64ImageList.splice(dindex, 1);
      this.potopImageurl.splice(dindex, 1);
    },
    //下单
    checkOutClick() {
      this.$toast.loading({ duration: 0,forbidClick:true,mask:true });
      this.checkoutLoading = true;
      console.log(JSON.stringify(this.formData), "下单");
      SubmitOrder(this.formData)
        .then((res) => {
          if (res.success) {
            this.$toast.success("success");
            this.checkoutLoading = false;
            this.$router.push({ name: "Order" });
          } else {
            this.$toast.fail("Network error");
            this.checkoutLoading = false;
          }
        })
        .catch((e) => {
          this.$toast.fail("Network error");
          this.checkoutLoading = false;
        });
    },
    //获取数据
    onShow() {
      this.$toast.loading({ duration: 0,forbidClick:true,mask:true });
      this.checkoutLoading=true
      console.log(this.orderConfirmData);
      const {
        selectedDealer,
        selectedShipTo,
        selectedLocation,
        productGoodsList,
        totalNetPrice,
        totalTaxPrice,
        totalPrice,
      } = this.orderConfirmData;
      this.formData.shipToId = selectedShipTo.partnerId;
      this.formData.shipToCode = selectedShipTo.partnerCode;
      this.formData.shipToName = selectedShipTo.partnerName;
      this.formData.dealerId = selectedDealer.dealerId;
      this.formData.dealerCode = selectedDealer.dealerCode;
      this.formData.dealerName = selectedDealer.dealerName;
      this.totalNetPrice = totalNetPrice;
      this.totalTaxPrice = totalTaxPrice;
      this.totalPrice = totalPrice;
      this.formData.orderNetAmount = totalNetPrice;
      this.formData.orderTax = totalTaxPrice;
      this.formData.orderAmount = totalPrice;
      this.selectedDealer = selectedDealer;
      this.selectedShipTo = selectedShipTo;
      this.selectedLocation = selectedLocation;
      let arr = productGoodsList;
      this.list = productGoodsList;
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
      //下拉框数据
      GetPartnerListByDealer({
        dealer_code: this.selectedDealer.dealerCode,
        type: "SH",
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
          this.$toast.clear();
          this.checkoutLoading=false
            var Items = data || [];
            // this.allShipToList = this.allShipToList.concat(Items);
            console.log("allShipToList", this.allShipToList);
            Items.forEach((item) => {
              this.allShipToList.push({
                text: item.partnerName,
                value: item.partnerCode,
                id: item.partnerId,
              });
              //Dealer有值默认为Dealer,无值默认为第一个
              this.formData.billToName = this.formData.dealerName
                ? this.formData.dealerName
                : this.allShipToList[0].text;
              this.formData.billToCode = this.formData.dealerName
                ? this.formData.dealerName
                : this.allShipToList[0].value;
              this.formData.billToId = this.formData.dealerName
                ? this.formData.dealerName
                : this.allShipToList[0].id;
              this.formData.payerName = this.formData.dealerName
                ? this.formData.dealerName
                : this.allShipToList[0].text;
              this.formData.payerCode = this.formData.dealerName
                ? this.formData.dealerName
                : this.allShipToList[0].value;
              this.formData.payerId = this.formData.dealerName
                ? this.formData.dealerName
                : this.allShipToList[0].id;
            });
          } else {
            this.$toast.clear();
          this.checkoutLoading=false
          }
        })
        .catch(() => {
          this.$toast.clear();
          this.checkoutLoading=false
        });
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
        dearlerCode: this.selectedDealer.dealerCode,
        // dearlerCode: "6000050431",
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
    // onCancel() {
    //   this.$emit("confirmShowCencel");
    // },
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
          //价格处理
      priceSwitch(x) {
        //强制保留两位小数
        var f = parseFloat(x);
        if (isNaN(f)) return false;
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length < (rs + 1) + 2) {
            s += '0';
        }
        //每三位用一个逗号隔开
        var leftNum=s.split(".")[0];
        var rightNum="."+s.split(".")[1];
        var result;
        //定义数组记录截取后的价格
        var resultArray=new Array();
        if(leftNum.length>3){
            var i=true;
            while (i){
                resultArray.push(leftNum.slice(-3));
                leftNum=leftNum.slice(0,leftNum.length-3);
                if(leftNum.length<4){
                    i=false;
                }
            }
            //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
            var sortArray=new Array();
            for(var i=resultArray.length-1;i>=0;i--){
                sortArray.push(resultArray[i]);
            }
            result=leftNum+","+sortArray.join(",")+rightNum;
        }else {
            result=s;
        }
        return result;
    }
  },
};
</script>
<style lang="scss" scoped>
.confirmBox {
  background: #f5f5f5;
  .fatherBox {
    // position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .vanPhotos {
    width: 100%;
    margin: 0.3rem;
    padding-bottom: 0.3rem;
  }
  .scollrBox {
    height: 60%;
    width: 100%;
    overflow-y: auto !important;
    overflow-x: hidden;
    padding-top: 1.3rem;
    // clear: both;
  }
  // .topBox {
  //   width: 100%;
  //   position: fixed;
  //   // position: absolute;
  //   top: 0;
  // }
  .inputBox_item {
    border-radius: 20px;
    overflow: hidden;
    margin: 10px 20px;
    background: #ffffff;
    box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.1);
  }
  // .bottomBox {
  //   height: 0.2rem;
  //   background-color: #f5f5f5;
  // }
  .shop-status-list {
    padding-top: 1rem;
    padding: 18px;
    background: #f5f5f5;
  }
  .shop-status__header {
    display: flex;
    overflow: hidden;
    border-radius: 20px 0 0 0;
    border-bottom: 1px solid #eee;
    .shop-status-left {
      width: 370px;
      height: 40px;
      line-height: 40px;
      position: relative;
      background: #aaa;
      color: #fff;
      text-align: center;
      margin-right: 50px;
      font-size: 24px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        right: -39px;
        bottom: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 40px 0 0 40px;
        border-color: transparent transparent transparent #aaa;
      }
      &.draft {
        background: #aaa;
        &::after {
          border-color: transparent transparent transparent #aaa;
        }
      }
      &.wait-approvel {
        background: #ff976a;
        &::after {
          border-color: transparent transparent transparent #ff976a;
        }
      }
      &.approved {
        background: #07c160;
        &::after {
          border-color: transparent transparent transparent #07c160;
        }
      }
      &.reject {
        background: #ee0a24;
        &::after {
          border-color: transparent transparent transparent #ee0a24;
        }
      }
    }
    .shop-code {
      flex: 1;
      line-height: 40px;
      font-size: $font24;
      color: #666;
    }
  }
  .shop-status-item {
    margin-bottom: 32px;
    border-radius: 20px;
    // overflow: hidden;
    // background: #fef9f3;
    background: #ffffff;
    box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.1);
  }
  // .groupBox {
  //   // background-color: #fef9f3;
  // }
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
    margin: 0 0 0 0.6rem;
    display: flex;
    .listImage {
      margin: 0.8rem 0.3rem 0.3rem;
    }
    .listDetailBox {
      width: 65%;
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
      .stocklistBox{
        display: flex;
        margin: 0.1rem 0;
      }
      .textbox{
        flex: 1;
      }
      .stockBox {
        padding-left: 0.2rem;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .lietItemBoxNumber {
    // float: left;
    width: 100%;
    display: flex;
    .discount {
      margin-left: 0.5rem;
    }
    .itemBoxNumber {
      // flex: 1;
      width: 50%;
      .itemMargin {
        margin: 0.1rem 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        .itemMarginOff {
          width: 0.2rem;
          height: 0.7rem;
          background: #ff976a;
          color: #f5f5f5;
          font-weight: 700;
        }
      }
    }
  }
  .submitBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    font-size: 0.3rem;
    .submitPrice {
      width: 100%;
      margin: 0.3rem 0.3rem 0;
      .text {
        margin: 0.1rem;
        font-size: 30px;
      }
    }
    .submitButton {
      width: 100%;
    }
  }
  .van-cell__title,
  .van-cell__value {
    min-width: 70%;
  }
}
</style>