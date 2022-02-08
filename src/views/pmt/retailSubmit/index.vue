<template>
  <div class="retailBox">
    <div v-show="!show">
      <TopBar
        :topBarTitle="this.$t('pmt.retail.titleNewRetail')"
        :leftHtml="topBarLeftHtml"
        :rightHtml="topBarRightHtml"
        @set_onClickLeft="topBarClickLeft"
        v-if="pageType == 1"
      ></TopBar>
      <TopBar
        :topBarTitle="this.$t('pmt.retail.titleEditRetail')"
        :leftHtml="topBarLeftHtml"
        :rightHtml="topBarRightHtml"
        @set_onClickLeft="topBarClickLeft"
        v-if="pageType == 2"
      ></TopBar>
      <TopBar
        :topBarTitle="this.$t('pmt.detailButton')"
        :leftHtml="topBarLeftHtml"
        :rightHtml="topBarRightHtml"
        @set_onClickLeft="topBarClickLeft"
        v-if="pageType == 3"
      ></TopBar>
    </div>
    <div v-show="show">
      <Scan ref="scan" @on_ScanEnd="onScanEnd"></Scan>
    </div>
    <van-form
      @submit="
        () => {
          this.$throttle.throttle(onSubmit());
        }
      "
      class=""
      v-show="!show"
    >
      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.retail") }}
        </h2>
        <van-field
          v-model="formData.retailCode"
          readonly
          :label="this.$t('pmt.retail.retailCode')"
          :placeholder="this.$t('pmt.retail.auto')"
          input-align="right"
          label-width="120px"
        />
        <van-field
          v-model="formData.new_shop_name"
          is-link
          readonly
          :label="this.$t('pmt.retail.shop')"
          @click="showShopPicker = true"
          input-align="right"
          label-width="90px"
          :rules="[]"
        />
        <van-field
          v-model="formData.new_invoice_code"
          input-align="right"
          label-width="90px"
          :label="this.$t('pmt.retail.invoiceCode')"
          :readonly="!editable"
          :rules="[
            {
              required: true,
              message: $t('pmt.retail.requireInvoice'),
            },
          ]"
        />
        <div class="van-cell">
          <upload-imgs
            class="paddingIconU"
            folder="retail"
            :max="1"
            :fileList="potopImageurl"
            @fileUploadOk="handleFileUploadOk"
            @fileDelete="handleFileDelete"
          />
          <!-- v-if="editable" -->
        </div>
        <!-- todo 需要把图片展示做一下 条件 v-if="!editable" -->
        <van-field
          required
          v-model="formData.selectPaymentName"
          is-link
          readonly
          :label="this.$t('pmt.retail.lablePayment')"
          @click="paymentPicker = true"
          input-align="right"
          label-width="90px"
          :rules="[
            {
              required: true,
              message: $t('pmt.retail.paymentMessage'),
            },
          ]"
        />

        <van-popup
          v-model="paymentPicker"
          position="bottom"
          round
          v-if="editable"
        >
          <van-picker
            show-toolbar
            :columns="paymentOptions"
            @cancel="paymentPicker = false"
            @confirm="handlePayment"
            value-key="text"
            :confirm-button-text="this.$t('pmt.confirmButton')"
            :cancel-button-text="this.$t('pmt.cancelButton')"
          >
          </van-picker>
        </van-popup>

        <van-field
          required
          v-if="formData.selectPaymentId == 2"
          v-model="formData.new_voucher"
          label-width="90px"
          :label="this.$t('pmt.retail.lableVoucher')"
          input-align="right"
          :readonly="!editable"
          :rules="[
            {
              required: true,
              message: $t('pmt.retail.voucherMessage'),
            },
          ]"
        />
      </div>

      <van-popup
        v-model="showShopPicker"
        position="bottom"
        round
        v-if="editable"
      >
        <van-search
          v-model="searchShopKey"
          :placeholder="this.$t('home.policy.searchTitle')"
          @search="changeShopKey"
        />
        <van-picker
          show-toolbar
          :columns="shopPermissionOptions"
          @cancel="showShopPicker = false"
          @confirm="handleShopId($event, false)"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>
      <van-popup
        v-model="giftNamePicker"
        position="bottom"
        round
        v-if="editable"
      >
        <van-picker
          show-toolbar
          :columns="giftNameOptions"
          @cancel="giftNamePicker = false"
          @confirm="handleGiftName"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.retail.model") }}
        </h2>
        <div class="van-cell">
          <van-button
            type="info"
            native-type="button"
            icon="plus"
            size="mini"
            @click="addModel"
            style="background: #4d72ac"
            v-if="editable"
            >{{ this.$t("pmt.retail.model") }}</van-button
          >
        </div>
        <div class="van-cell" v-for="(item, i) in addModelList" :key="i">
          <van-swipe-cell>
            <van-field
              v-model="item.new_barcode"
              label-width="60px"
              :label="$t('pmt.retail.barcode')"
              :rules="[
                {
                  required: true,
                  message: $t('pmt.retail.requireBarcode'),
                },
              ]"
              readonly
              @change="onChangeBarcode(i)"
            >
              <template #button v-if="editable">
                <img
                  src="../../../assets/images/tab_bar/scan.png"
                  class="paddingIconP"
                  @click="onstartRecognize(i)"
                />
              </template>
            </van-field>
            <van-field
              v-model="item.new_model_name"
              label-width="60px"
              :label="$t('pmt.model')"
              readonly
            >
            </van-field>
            <!-- :readonly="!editable" -->
            <van-field
              v-model="item.new_unit_price"
              input-align="right"
              label-width="60px"
              :label="$t('pmt.retail.price')"
              type="digit"
              readonly="true"
              :rules="[
                {
                  required: true,
                  message: $t('pmt.retail.requirePrice'),
                },
              ]"
            />
            <van-field
              v-model="item.new_is_mh_name"
              readonly
              :label="$t('pmt.retail.mhModel')"
              input-align="left"
              label-width="80px"
            >
              <template #button> Quantity: {{ item.new_quantity }} </template>
            </van-field>
            <van-field
              v-model="item.new_model_incentive"
              input-align="right"
              label-width="auto"
              :label="$t('pmt.retail.ModelIncentive')"
              type="digit"
              readonly="true"
            />
            <!-- <van-field
              readonly
              :label="$t('pmt.retail.quantity')"
              input-align="right"
              label-width="80px"
            >
              <template #input>
                Quantity: {{ item.new_quantity }}
                <van-stepper
                  v-model="item.new_quantity"
                  min="1"
                  max="200"
                  integer
                  @change="onChangeQuantity"
                  :disabled="!editable"
                />
              </template>
            </van-field> -->

            <template #right v-if="editable">
              <van-button
                square
                @click="deleteModelList(i)"
                :text="$t('pmt.retail.delete')"
                type="danger"
                class="delete-button"
                native-type="button"
              />
            </template>
          </van-swipe-cell>
        </div>
      </div>

      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.retail.consumerInfo") }}
        </h2>
        <van-field
          v-model="formData.new_consumer_name"
          input-align="right"
          label-width="120px"
          :label="$t('pmt.retail.name')"
          :readonly="!editable"
          :rules="[
            {
              required: true,
              message: $t('pmt.retail.requireConsumerName'),
            },
          ]"
        />
        <van-field
          v-model="formData.new_consumer_mobile"
          input-align="right"
          type="number"
          label-width="120px"
          :label="$t('pmt.phoneNumber')"
          :readonly="!editable"
          :rules="[
            {
              required: true,
              message: $t('pmt.retail.requireConsumerMobile'),
            },
          ]"
        />
        <van-field
          v-model="formData.new_consumer_address"
          input-align="right"
          label-width="120px"
          :label="$t('pmt.address')"
          :readonly="!editable"
        />
      </div>

      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.retail.giftInfo") }}
        </h2>
        <div class="van-cell">
          <van-button
            type="info"
            native-type="button"
            icon="plus"
            size="mini"
            @click="addGiftInfo"
            style="background: #4d72ac"
            v-if="editable"
            >{{ this.$t("pmt.retail.gift") }}</van-button
          >
        </div>
        <div class="van-cell" v-for="(item, i) in addDivList" :key="i">
          <van-swipe-cell>
            <van-field
              v-model="item.gift_name"
              is-link
              :label="$t('pmt.retail.giftName')"
              @click="(selectGift = i), (giftNamePicker = true)"
              input-align="right"
              label-width="90px"
              :readonly="!editable"
              :rules="[
                {
                  required: true,
                  message: $t('pmt.retail.requireGiftName'),
                },
              ]"
            />

            <van-field
              name="stepper"
              :label="$t('pmt.retail.giftQuantity')"
              input-align="right"
              label-width="120px"
              v-if="editable"
            >
              <template #input>
                <van-stepper v-model="item.gift_num" />
              </template>
            </van-field>

            <van-field
              name="stepper"
              :label="$t('pmt.retail.giftQuantity')"
              input-align="right"
              label-width="120px"
              v-if="!editable"
              readonly
              v-model="item.gift_num"
            >
            </van-field>

            <template #right v-if="editable">
              <van-button
                square
                @click="deleteGiftList(i)"
                :text="$t('pmt.retail.delete')"
                type="danger"
                class="delete-button"
                native-type="button"
              />
            </template>
          </van-swipe-cell>
        </div>
      </div>

      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.retail.moreInfo") }}
        </h2>
        <van-field
          v-model="moreInfo.new_customer_name"
          readonly
          :label="$t('pmt.retail.dealer')"
          input-align="right"
          label-width="70px"
        />
        <van-field
          v-model="moreInfo.new_real_name"
          readonly
          :label="$t('pmt.retail.createdBy')"
          input-align="right"
          label-width="90px"
        />
        <van-field
          v-model="createOn"
          readonly
          :label="$t('pmt.retail.createDate')"
          input-align="right"
          label-width="90px"
        />
        <van-field
          v-model="moreInfo.new_position_name"
          readonly
          :label="$t('pmt.retail.personnel')"
          input-align="right"
          label-width="70px"
        />
      </div>

      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.retail.amount") }}
        </h2>
        <van-field
          v-model="retailAmount"
          readonly
          :label="$t('pmt.retail.retailSalesAmount')"
          input-align="right"
          label-width="200px"
        />
        <van-field
          v-model="mhModelAmount"
          readonly
          :label="$t('pmt.retail.mhModelSalesAmount')"
          input-align="right"
          label-width="200px"
        />
      </div>

      <!-- 'pmt.retail.commentTitle': 'Comment',
    'pmt.retail.reportTypeLable': 'Report Type',
    'pmt.retail.statusLable': 'Status',
    'pmt.retail.commentLable': 'Comment', -->

      <div class="infog-card form-group" v-show="isShowComment">
        <h2 class="card-title">
          {{ this.$t("pmt.retail.commentTitle") }}
        </h2>
        <van-field
          v-model="commentData.reportType"
          readonly
          :label="$t('pmt.retail.reportTypeLable')"
          input-align="right"
          label-width="200px"
        />
        <van-field
          v-model="commentData.status"
          readonly
          :label="$t('pmt.retail.statusLable')"
          input-align="right"
          label-width="200px"
        />
        <van-field
          v-model="commentData.new_comments"
          readonly
          :label="$t('pmt.retail.commentLable')"
          input-align="right"
          label-width="200px"
        />
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <div class="bottombutton">
        <van-button
          class="button"
          native-type="button"
          @click="
            () => {
              this.$throttle.throttle(onSave());
            }
          "
          type="info"
          v-if="editable"
          >{{ this.$t("pmt.retail.saveButton") }}</van-button
        >
        <van-button
          class="button"
          native-type="submit"
          type="info"
          v-if="editable"
          >{{ this.$t("pmt.submitButton") }}</van-button
        >
      </div>
    </van-form>

    <van-popup v-model="isSubmit" position="bottom" :style="{ height: '30%' }">
      <div class="infog-card form-group">
        <h2 class="card-title" style="background: #bf7d30">
          {{ this.$t("pmt.retail.warning") }}
        </h2>
        <div class="van-cell">{{ messageDialog }}</div>
        <div class="van-cell">
          <van-button
            type="info"
            @click="submitConfirm"
            :disabled="isDisabled"
            class="button-item"
            >{{ this.$t("pmt.retail.complaint") }}
          </van-button>
          <van-button type="info" @click="onClose" class="button-item"
            >{{ this.$t("pmt.cancelButton") }}
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import { Overlay } from "vant";
import UploadImgs from "@/components/UploadImgs";
import Scan from "@/components/Scan";
import { getShopSelectData } from "@/api/giftRegistration";
import {
  retailmobileScanbarcode,
  getusershopinfo,
  getentityconditions,
  saveretailscanbarcode,
  submitretailconfirm,
  submitretailscanbarcode,
  getretailscanbarcode,
  getdropdownoptions,
} from "@/api/retail";
import TopBar from "@/components/TopBar";
Vue.use(Overlay);
export default {
  name: "home",
  components: {
    TopBar,
    UploadImgs,
    Scan,
  },
  computed: {
    retailAmount() {
      let arr = this.addModelList;
      let srr = [];
      arr.forEach((item) => {
        // srr.push(parseInt(item.new_unit_price));//Math.floor(Math.random() * length);
        srr.push(
          Math.floor(
            parseInt(item.new_unit_price) * parseInt(item.new_quantity)
          )
        );
        // }
      });
      let sum = srr.reduce(function (a, b) {
        return parseInt(a) + parseInt(b);
      }, 0);
      return sum;
    },
    mhModelAmount() {
      let arr = this.addModelList;
      let srr = [];
      arr.forEach((item) => {
        if (item.new_key_model) {
          // if (item.new_key_model=='Yes'||item.new_key_model=='yes') {
          // srr.push(item.new_unit_price);
          srr.push(
            Math.floor(
              parseInt(item.new_unit_price) * parseInt(item.new_quantity)
            )
          );
          // }
        }
      });
      let sum = srr.reduce(function (a, b) {
        return parseInt(a) + parseInt(b);
      }, 0);
      return sum;
    },
  },
  data() {
    return {
      giftNamePicker: false,
      topBarHtml: "",
      topBarRight: '<i class="van-icon van-icon-cross"></i>',
      messageDialog: "", //提交验证后是否通过的提示内容
      paramsSubmit: {},
      isDisabled: false,
      isSubmit: false,
      show: false,
      showShopPicker: false,
      potopImageurl: [],
      barcodeImageurl: [], //选择的照片
      giftNameOptions: [], //下来框数据
      selectGift: -1,
      selectModel: -1,
      moreInfo: {},
      addDivList: [
        // { gift_name: "", gift_num: "0" }
      ],
      addModelList: [
        {
          new_model_name: "",
          new_barcode: "",
          new_barcode_imageurl: "",
          new_is_repeat: "",
          new_quantity: 1, //后端默认值1
          new_unit_price: "0",
          new_model_incentive: "0",
          new_key_model: "",

          new_model_id: "",
          new_product_id: "",
          new_model_type: "",
        },
      ],
      addDiv: "",
      shopPermissionOptions: [],
      baseShopOption: [],
      searchShopKey: "",
      shopPermissionObjects: [], // Options用于下拉列表控制，Object用于全局数据控制，shopObj基于shopPermissionObjects
      shopObj: {},
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",
      formData: {
        retailCode: "",
        new_consumer_name: "", // TODO 需确认
        new_consumer_mobile: "", // TODO 需确认
        new_consumer_address: "", // TODO 需确认
        selectPaymentId: 0,
        selectPaymentName: "",
      },
      createOn: "",
      pageType: 1,
      editable: true,

      isShowComment: false,
      commentData: {
        reportType: "",
        status: "",
        new_comments: "",
      },
      requestCount: 0,

      isInstallShopInfo: false,

      // isShowComment: false,
      // commentData: {
      //   reportType: "",
      //   status: "",
      //   new_comments: "",
      // },

      paymentPicker: false,
      paymentOptions: [],
      selectPaymentId: 0,
      selectPaymentName: "",

      isSaveSuccess: true,
    };
  },

  created() {
    this.getOptions(); //下拉框数据
  },
  mounted() {
    // this.$refs.scan.startRecognize();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave:");
    if (this.show) {
      // this.$router.replace("retailSubmit");
      this.show = false;
      this.$refs.scan.closeScan("");
      next(false);
      //这是一个点击事件
    } else {
      next(true); //
    }
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },
    handleFileDelete() {
      if (!this.editable) return false;
      this.potopImageurl = [];
    },
    // 格式化后服务器返回照片
    handleFileUploadOk(file) {
      this.potopImageurl = [];
      this.formData.new_invoice_imageurl = file.url;
      console.log("file.url:", file.url);
      this.potopImageurl.push({
        new_download_url: file.url,
        new_keyword: "retail",
        new_description: "retail",
        new_type: 1,
        new_filename: file.name,
        new_filesize: 0,
      });
    },
    //二维码扫描之后调用
    qrCode(data) {
      console.log("qrCode barcode:", data);
      console.log("this.formData.new_shop_id:", this.formData.new_shop_id);
      console.log(
        "this.formData.new_channel_id:",
        this.formData.new_channel_id
      );
      this.myShowLoading();
      // this.$toast.loading({ duration: 0, forbidClick: true });
      // 二维码扫描之后调用;
      retailmobileScanbarcode({
        barcode: data,
        new_shop_id: this.formData.new_shop_id,
        new_region_id: this.formData.new_region_id,
        new_channel_id: this.formData.new_channel_id,
        // 测试数据
        // barcode: "B30FZ5E5657513188", //??
        // new_shop_id: "23900D2E-4A06-EC11-82C0-8C2281F42D0A",
        // new_channel_id: "AD604A61-31DE-EB11-82B7-899D298B4A13",
      })
        .then((res) => {
          if (res.success === true) {
            console.log("retailmobileScanbarcode", res);
            //获取二维码扫描后的条形码数据
            // this.addModelList.forEach((item) => {
            //   item.new_barcode = data;
            //   item.new_key_model = res.data.new_key_model;
            //   item.new_is_repeat = res.data.is_repeat;
            //   item.new_model_name =
            //     res.data.new_model_name + "(" + res.data.model_brand + ")";
            // });
            this.myHideLoading();
            const item = this.addModelList[this.selectModel];
            item.new_barcode = data;
            item.new_key_model = res.data.new_key_model;
            console.log(res.data.new_key_model, "res.data.new_key_model");
            item.new_is_mh_name = res.data.new_key_model
              ? this.$t("pmt.yes")
              : this.$t("pmt.no");
            item.new_is_repeat = res.data.is_repeat;
            item.new_model_name =
              res.data.new_model_name + "(" + res.data.new_brand_name + ")";

            item.new_unit_price = res.data.price;
            item.new_model_incentive = res.data.new_model_incentive;

            item.new_model_id = res.data.new_model_id;
            item.new_product_id = res.data.new_product_id;
            item.new_model_type = res.data.new_model_type;
          } else {
            this.$toast.fail(res.message);
            const item = this.addModelList[this.selectModel];
            item.new_barcode = "";
            item.new_key_model = null;
            item.new_is_mh_name = "";
            item.new_is_repeat = null;
            item.new_model_name = "";
            item.new_model_id = '';
            item.new_product_id = '';
            item.new_model_type = '';
          }
        })
        .catch(() => {
          this.myHideLoading();
        });
    },
    //删除DivList
    deleteGiftList(i) {
      this.addDivList.splice(i, 1);
    },
    // 删除deleteModelList
    deleteModelList(i) {
      if (this.addModelList.length > 1) this.addModelList.splice(i, 1);
    },
    //保存
    onSave() {
      console.log("onSave:", this.shopObj);
      console.log("onSave:", this.moreInfo);
      if (
        this.formData.new_invoice_code == null ||
        this.formData.new_invoice_code == "" ||
        this.formData.new_invoice_code == undefined
      ) {
        this.$toast.fail(this.$t("pmt.retail.requireInvoice"));
        return false;
      }

      const queryParam = {
        new_retailid: this.formData.new_retailid,
        new_retail_code: this.formData.retailCode,
        new_dealer_id: this.shopObj.new_customer_id, // 因为名字不一样需要单独映射
        new_dealer_code: this.shopObj.new_customer_code, // 因为名字不一样需要单独映射
        new_dealer_name: this.shopObj.new_customer_name, // 因为名字不一样需要单独映射
        new_invoice_code: this.formData.new_invoice_code,
        new_invoice_imageurl: this.formData.new_invoice_imageurl, //照片
        modellist: [...this.addModelList],
        giftlist: [...this.addDivList],
        new_consumer_name: this.formData.new_consumer_name,
        new_consumer_mobile: this.formData.new_consumer_mobile,
        new_consumer_address: this.formData.new_consumer_address,
        // new_operator_type: this.moreInfo.new_personnel_value, // 因为名字不一样需要单独映射

        new_operator_type: this.moreInfo.new_position_value,
        new_payment: this.formData.selectPaymentId,
        new_voucher: this.formData.new_voucher,
      };
      const params = Object.assign(this.shopObj, queryParam);
      // this.$toast.loading({ duration: 0, forbidClick: true });
      this.myShowLoading();
      saveretailscanbarcode(params)
        .then((res) => {
          if (res.success === true) {
            this.$toast.success(this.$t("pmt.success"));
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.myHideLoading();
        });
    },
    //选择礼品
    handleGiftName(value) {
      // this.addDivList.forEach((item) => {
      //   // item.gift_name = value.Id;
      //   item.gift_num = value.text;
      // });
      this.addDivList[this.selectGift].gift_name = value.text;
      this.giftNamePicker = false;
    },
    //选择shop id
    handleShopId(value, isInstallShopInfo) {
      console.log("1");
      console.log(value);
      console.log(isInstallShopInfo);
      this.formData.new_shop_id = value.Id;
      this.formData.new_shop_name = value.text;
      this.formData.new_region_id = value.new_region_id;
      this.showShopPicker = false;
      console.log("2");
      console.log(this.shopPermissionObjects);
      this.shopPermissionObjects.forEach((item) => {
        console.log("3");
        console.log(this.formData.new_shop_id);
        console.log(item.new_shop_id);
        if (this.formData.new_shop_id === item.new_shop_id) {
          console.log("4");
          this.shopObj = item;
          this.formData.new_channel_id = item.new_channel_id;
          console.log(this.formData.new_channel_id, "89");
        }
      });
      console.log("5");
      //根据选择shop id获取more框的信息
      // this.$toast.loading({ duration: 0, forbidClick: true });
      this.myShowLoading();
      getusershopinfo({ new_shopid: this.formData.new_shop_id }).then((res) => {
        if (res.success) {
          this.myHideLoading();
          this.moreInfo = res.data;
          console.log("getusershopinfo:", this.moreInfo);
          console.log("getusershopinfo:", this.moreInfo.new_personnel_value);
        } else {
          this.$toast.fail(res.message);
        }
      });
      // 获取more框的信息中的当前日期
      var nowDate = new Date();
      let date = {
        y: nowDate.getFullYear(),
        m: nowDate.getMonth() + 1,
        d: nowDate.getDate(),
      };
      this.createOn = date.y + "-" + date.m + "-" + date.d;
      this.addModelList = [];
      this.addModel();
      if (isInstallShopInfo) {
        this.handleParas();
      }
    },
    //Submit按钮
    onSubmit() {
      if (this.potopImageurl.length === 0) {
        this.$toast.fail(this.$t("pmt.retail.requirePicture"));
        return;
      }
      //  ;
      const queryParam = {
        new_retailid: this.formData.new_retailid,
        new_retail_code: this.formData.retailCode,
        new_dealer_id: this.shopObj.new_customer_id, // 因为名字不一样需要单独映射
        new_dealer_code: this.shopObj.new_customer_code, // 因为名字不一样需要单独映射
        new_dealer_name: this.shopObj.new_customer_name, // 因为名字不一样需要单独映射
        new_invoice_code: this.formData.new_invoice_code,
        new_invoice_imageurl: this.formData.new_invoice_imageurl, //照片
        modellist: [...this.addModelList],
        giftlist: [...this.addDivList],
        new_consumer_name: this.formData.new_consumer_name,
        new_consumer_mobile: this.formData.new_consumer_mobile,
        new_consumer_address: this.formData.new_consumer_address,
        // new_operator_type: this.moreInfo.new_personnel_value, // 因为名字不一样需要单独映射

        new_operator_type: this.moreInfo.new_position_value,
        new_payment: this.formData.selectPaymentId,
        new_voucher: this.formData.new_voucher,
      };
      //  ;
      // const params = Object.assign(this.shopObj, queryParam);
      // submitretailconfirm(params).then((res) => {
      this.paramsSubmit = Object.assign(this.shopObj, queryParam);
      // this.$toast.loading({ duration: 0, forbidClick: true });
      this.myShowLoading();
      submitretailconfirm(this.paramsSubmit)
        .then((res) => {
          if (res.success === true) {
            if (res.data === 3) {
              this.myHideLoading();
              this.submitConfirm(); //无需弹框直接调用
            } else if (res.data === 2) {
              //data验证是否有重复提交
              this.messageDialog = res.message;
              this.isSubmit = true;
              this.myHideLoading();
            } else {
              //不允许提交
              this.isSubmit = true;
              this.isDisabled = false;
              this.messageDialog = res.message;
              this.myHideLoading();
            }
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch(() => {
          this.myHideLoading();
        });
    },
    //确认可以提交
    submitConfirm() {
      console.log("submitConfirm:", JSON.stringify(this.paramsSubmit));
      // this.$toast.loading({ duration: 0, forbidClick: true });
      this.myShowLoading();
      submitretailscanbarcode(this.paramsSubmit)
        .then((res) => {
          console.log("submitConfirm back:", JSON.stringify(res));
          if (res.success === true) {
            this.onClose();
            this.$toast.success(res.message);
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          } else {
            this.onClose();
            this.$toast.fail(res.message);
          }
        })
        .catch(() => {
          this.myHideLoading();
        });
    },
    // 新增model框
    addModel() {
      //  ;
      let pushDiv = {
        new_barcode: "",
        new_barcode_imageurl: "",
        new_is_repeat: "",
        new_quantity: 1,
        new_unit_price: "0",
        new_model_incentive: "0",
        new_key_model: "",
        new_model_id :'',
        new_product_id : '',
        new_model_type : '',
      };
      this.addModelList.push(pushDiv);
    },
    // 新增GiftInfo框
    addGiftInfo() {
      console.log("addGiftInfo");
      let pushDiv = { gift_name: "", gift_num: 0 };
      this.addDivList.push(pushDiv);
    },
    // GiftInfo加加
    addBoder(i) {
      this.addDivList[i].gift_num++;
    },
    // GiftInfojianjian
    popBoder(i) {
      if (this.addDivList[i].gift_num > 0) {
        this.addDivList[i].gift_num--;
      }
    },
    // 返回上一页
    topBarClickLeft() {
      this.$router.go(-1);
    },
    //获取下拉框
    getOptions() {
      this.shopPermissionOptions = [];
      this.baseShopOption = [];
      // this.$toast.loading({ duration: 0, forbidClick: true });
      this.myShowLoading();
      getShopSelectData()
        .then((res) => {
          if (res.success === true) {
            this.myHideLoading();
            const resShop = res.data.shopPermission;
            this.shopPermissionObjects = resShop;
            resShop.forEach((element) => {
              const thiselement = {};
              thiselement.Id = element.new_shop_id;
              thiselement.text = element.new_shop_name;
              thiselement.new_region_id = element.new_region_id;
              this.shopPermissionOptions.push(thiselement);
              this.baseShopOption.push(thiselement);
            });
            if (this.shopPermissionOptions.length > 0) {
              this.handleShopId(this.shopPermissionOptions[0], true);
            } else {
              this.$toast.fail(this.$t("pmt.retail.noPermission"));
              setTimeout(() => {
                this.$router.go(-1);
              }, 2000);
            }
          }
        })
        .catch(() => {
          this.myHideLoading();
        });
      // gift_name下拉框数据
      this.myShowLoading();
      // this.$toast.loading({ duration: 0, forbidClick: true });
      getentityconditions({
        entityName: "new_dictionary_maintain",
        fields: "new_name",
        where: "and new_type=1",
      })
        .then((res) => {
          if (res.success === true) {
            this.myHideLoading();
            // console.log(res, "1123");
            this.giftNameOptions = [];
            const resShop = res.data;
            resShop.forEach((element) => {
              const thiselement = {};
              thiselement.Id = element.new_name;
              thiselement.text = element.new_name;
              this.giftNameOptions.push(thiselement);
            });
          }
        })
        .catch(() => {
          this.myHideLoading();
        });

      this.$toast.loading({ duration: 0, forbidClick: true });
      getdropdownoptions({
        type: "Payment_Type",
      }).then((res) => {
        if (res.success === true) {
          this.handleHideLoading();
          this.paymentOptions = [];
          const resModel = res.data;
          // this.modelObjects = resModel;
          resModel.forEach((element) => {
            const thisElement = {};
            // thisElement.Id = element.new_model_name;
            // thisElement.text = element.model_brand;
            thisElement.Id = element.EnumValue;
            thisElement.text = element.Desction;
            this.paymentOptions.push(thisElement);
          });
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    onClose() {
      this.isSubmit = false;
    },
    onstartRecognize(i) {
      this.selectModel = i;
      console.log("onstartRecognize");
      this.show = true;
      setTimeout(() => {
        console.log("onstartRecognize2");
        this.$refs.scan.startRecognize();
      }, 500);
      setTimeout(() => {
        console.log("onstartRecognize3");
        this.$refs.scan.startScan();
      }, 1000);
    },
    onScanEnd(data) {
      console.log("onScanEnd");
      console.log(data);
      console.log(data, "获取扫描数据");
      this.show = false;

      if (data.length > 20) {
        this.$toast.fail(this.$t("pmt.retail.scanCodeErrorMessage"));
        return false;
      }

      this.qrCode(data); //调用二维码接口
    },
    myShowLoading() {
      const requestCount = this.requestCount;
      if (requestCount === 0) {
        this.$toast.loading({ duration: 0, forbidClick: true });
      }
      this.requestCount = requestCount + 1;
    },
    myHideLoading() {
      const requestCount = this.requestCount;
      this.requestCount = requestCount - 1;
      if (this.requestCount === 0) {
        this.$toast.clear();
      }
    },
    onChangeBarcode(i) {
      console.log(i);
      this.selectModel = i;
      if (this.addModelList[i].new_barcode.length > 20) {
        this.$toast.fail(this.$t("pmt.retail.scanCodeErrorMessage"));
        return false;
      }
      this.qrCode(this.addModelList[i].new_barcode);
    },
    handleEdit(retailId) {
      // console.log("handleEdit", retailId);
      console.log("this.pageType:", this.pageType);
      // this.$toast.loading({ duration: 0, forbidClick: true });
      this.myShowLoading();
      getretailscanbarcode({
        inputs: retailId,
      })
        .then((res) => {
          if (res.success === true) {
            this.myHideLoading();
            // console.log("handleEdit:", res);
            const data = res.data;

            console.log("editdata:", data);
            this.formData.new_shop_id = data.new_shop_id;
            this.formData.new_shop_name = data.new_shop_name;
            this.formData.new_region_id = data.new_region_id;

            var shopInfo = {
              Id: data.new_shop_id,
              text: data.new_shop_name,
              new_region_id: data.new_region_id,
            };
            this.handleShopId(shopInfo, false);
            // this.formData = data
            //  ;
            this.formData.new_retailid = data.new_retailid;
            this.formData.retailCode = data.new_retail_code;
            this.formData.new_invoice_code = data.new_invoice_code;
            this.formData.new_invoice_imageurl = data.new_invoice_imageurl;
            this.addModelList =
              data.modellist != null ? [...data.modellist] : []; // [...data.modellist];
            this.addDivList = data.giftlist != null ? [...data.giftlist] : []; //[...data.giftlist];
            this.formData.new_consumer_name = data.new_consumer_name; // TODO 需确认
            this.formData.new_consumer_mobile = data.new_consumer_mobile; // TODO 需确认
            this.formData.new_consumer_address = data.new_consumer_address; // TODO 需确认
            // this.$forceUpdate();
            console.log("this.formData:", this.formData);
            console.log("data:", data);
            this.formData.new_operator_type = data.new_position_value;
            this.formData.selectPaymentId = data.new_payment;
            this.formData.selectPaymentName = data.new_payment_name;
            this.formData.new_unit_price = data.price;
            this.formData.new_voucher = data.new_voucher;
            this.formData.new_model_incentive = data.new_model_incentive;

            // invoice 图片显示
            this.potopImageurl.push({
              new_download_url: data.new_invoice_imageurl,
              new_filename: "Invoice",
            });

            // model 图片显示
            this.addModelList.forEach((element) => {
              console.log("element.new_key_model", element.new_key_model);
              element.new_is_mh_name = element.new_key_model
                ? this.$t("pmt.yes")
                : this.$t("pmt.no");
            });

            console.log("CreatedOn");
            var nowDate = new Date(data.CreatedOn);
            let date = {
              y: nowDate.getFullYear(),
              m: nowDate.getMonth() + 1,
              d: nowDate.getDate(),
            };
            this.createOn = date.y + "-" + date.m + "-" + date.d;

            // to do comment
            console.log(data.new_approve_status);
            if (data.new_approve_status != 1) {
              this.isShowComment = true;
            }
            this.commentData.reportType = data.new_submit_type_name;
            this.commentData.status = data.new_approve_status_name;
            this.commentData.new_comments = data.new_comments;
            this.$forceUpdate();
            setTimeout(() => {
              console.log(this.addModelList);
            }, 2000);
          }
        })
        .catch(() => {
          this.myHideLoading();
        });
    },
    handleParas() {
      if (this.$route.params.retailId) {
        this.pageType = this.$route.params.pageType;
        if (this.$route.params.pageType == 3) {
          this.editable = false;
          this.$forceUpdate();
        }
        this.handleEdit(this.$route.params.retailId);
      }
    },
    onChangeQuantity(value) {
      // eslint-disable-next-line no-self-assign
      // this.retailAmount = this.retailAmount;
      // this.mhModelAmount = this.mhModelAmount;
      //  ;
    },

    //联想搜索
    changeShopKey() {
      //  ;
      this.shopPermissionOptions = [];
      for (const i in this.baseShopOption) {
        if (
          this.baseShopOption[i].text
            .toLowerCase()
            .indexOf(this.searchShopKey.toLowerCase()) >= 0
        ) {
          this.shopPermissionOptions.push(this.baseShopOption[i]);
        }
      }
    },

    handlePayment(value) {
      this.paymentPicker = false;
      this.formData.selectPaymentId = value.Id;
      this.formData.selectPaymentName = value.text;
    },
  },
};
</script>

<style lang="scss" scoped>
.retailBox {
  background: #f5f5f5;
  .toptitle {
    margin: 15px;
    font-size: 24px;
    font-weight: 700;
  }
  .navBox {
    margin: 0 20px 0 10px;
  }
  .form-item {
    .item_form_Box {
      display: flex;
      margin-bottom: 10px;
    }
    .item_title_Box {
      width: 30%;
      text-align: right;
      margin: 5px 10px;
      // padding-left: 25px;
      // position: relative;
      overflow: hidden;
      .paddingIconUBox {
        position: relative;
        position: absolute;
        overflow: hidden;
        height: 60px;
        width: 90px;
        top: 255px;
        right: 15px;
        .paddingIconU {
          position: absolute;
          width: 80px;
          height: 11px;
          top: -50px;
          background-color: #f5f5f5;
        }
      }
    }
    .item_input_Box {
      width: 62%;
      height: 70px;

      .paddingIconPi {
        position: absolute;
        // left: 85px;
        // top: -35px;
        padding-left: 90px;
        width: 55px;
        height: 55px;
      }
      .paddingIconP {
        position: absolute;
        right: 40px;
        top: 30px;
        width: 70px;
        height: 45px;
      }
      // .paddingIconUBox {
      //   position: relative;
      //   position: absolute;
      //   overflow: hidden;
      //   height: 60px;
      //   width: 90px;
      //   top: 255px;
      //   right: 15px;
      //   .paddingIconU {
      //     position: absolute;
      //     width: 80px;
      //     height: 11px;
      //     top: -50px;
      //     background-color: #f5f5f5;
      //   }
      // }
      .openModelBox {
        position: relative;
        position: absolute;
        overflow: hidden;
        height: 60px;
        width: 80px;
        top: 410px;
        right: 66px;
        .paddingIconU {
          position: absolute;
          width: 80px;
          height: 11px;
          top: -50px;
          background-color: #f5f5f5;
        }
      }
      .paddingIcon {
        margin-left: 10px;
      }
    }
    .item_input_BoxU {
      width: 85%;
    }
  }
  .bovModelButton {
    padding-top: 10px;
    padding-left: 10px;
  }
  .modelNavBox {
    margin-top: 10px;
    margin: 10px 0px 10px 10px;
    padding: 30px 0px;
    // height: 270px;
    // width: 100%;
    border-color: 1px solid #0000;
    background-color: white;
  }
  .bovGiftInfo {
    margin: 10px 0;
    padding: 20px 0px;
    height: 140px;
    width: 100%;
    border-color: 1px solid #0000;
    background-color: white;
    .item_title_Box {
      width: 25%;
      text-align: left;
      padding-left: 25px;
    }

    .addBoder {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 1px solid black;
      border-radius: 5px;
      text-align: center;
      line-height: 30px;
      margin: 10px;
    }
  }
  .bovConsumerInfo {
    margin: 20px 0 10px 0;
    padding: 20px 0px;
    /*height: 250px;*/
    width: 100%;
    border-color: 1px solid #0000;
    background-color: white;
    .item_title_Box {
      width: 25%;
      text-align: left;
      padding-left: 25px;
    }
    .dividerBottom {
      border: 1px solid #bcbcbc;
      margin-bottom: 20px;
      margin-right: 30px;
      margin-left: 30px;
    }
  }
  .bovMoreInfo {
    margin-top: 10px;
    padding: 20px 0px;
    height: 350px;
    width: 100%;
    border-color: 1px solid #f2f2f2;
    background-color: white;
    .item_title_Box {
      width: 25%;
      padding-left: 25px;
      text-align: left;
    }
    .dividerBottom {
      border: 1px solid #bcbcbc;
      margin-bottom: 20px;
      margin-right: 30px;
      margin-left: 30px;
    }
  }

  .bottombutton {
    width: 100%;
    position: fixed;
    bottom: 0;
    .button {
      width: 50%;
    }
  }
  .bottonText {
    height: 100px;
    padding-bottom: 80px;
  }
  .scan {
    // overflow: hidden;
    width: 20px;
    height: 20px;
  }
  .dividerBottom {
    border: 1px solid #bcbcbc;
    margin-bottom: 20px;
    margin-right: 30px;
    margin-left: 30px;
  }
}
</style>
<style type="text/css">
.sun-uploader .sun-uploader__wrapper .sun-upload-icon {
  width: 1rem !important;
  height: 1rem !important;
}

.paddingIconP {
  width: 1rem !important;
  height: 1rem !important;
}

.button-item {
  width: 50%;
}

.delete-button {
  height: 100%;
}
</style>
