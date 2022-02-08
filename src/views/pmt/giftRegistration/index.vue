<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
      @set_onClickRight="topBarClickRight"
    >
    </TopBar>
    <van-form
      @submit="
        () => {
          this.$throttle.throttle(onSubmit());
        }
      "
      class=""
    >
      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.shop") }}
        </h2>
        <van-field
          v-model="selectShopName"
          is-link
          readonly
          :label="this.$t('pmt.giftRegistration.ShopLable')"
          @click="showShopPicker = true"
          input-align="right"
          label-width="120px"
          :rules="[
            {
              required: true,
              message: this.$t('pmt.giftRegistration.ShopMessage'),
            },
          ]"
        />
        <van-popup v-model="showShopPicker" position="bottom" round>
          <van-picker
            show-toolbar
            :columns="shopSelectData"
            @cancel="showShopPicker = false"
            @confirm="onConfirm_Shop"
            value-key="text"
            :confirm-button-text="this.$t('pmt.confirmButton')"
            :cancel-button-text="this.$t('pmt.cancelButton')"
          />
        </van-popup>
      </div>

      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.giftRegistration.GiftTitle") }}
        </h2>
        <van-field
          v-model="selectGiftName"
          is-link
          readonly
          :label="this.$t('pmt.giftRegistration.GiftLable')"
          @click="showGiftPicker = true"
          input-align="right"
          label-width="120px"
          :rules="[
            {
              required: true,
              message: this.$t('pmt.giftRegistration.GiftMessage'),
            },
          ]"
        />
        <van-popup v-model="showGiftPicker" position="bottom" round>
          <van-picker
            show-toolbar
            :columns="giftNameSelectData"
            @cancel="showGiftPicker = false"
            @confirm="onConfirm_Gift"
            value-key="text"
            :confirm-button-text="this.$t('pmt.confirmButton')"
            :cancel-button-text="this.$t('pmt.cancelButton')"
          />
        </van-popup>
        <van-field
          name="stepper"
          :label="this.$t('pmt.giftRegistration.GiftQuantityLable')"
          input-align="right"
          label-width="120px"
        >
          <template #input>
            <van-stepper v-model="quantity" />
          </template>
        </van-field>
        <van-field
          v-model="selectGiftCauseName"
          is-link
          readonly
          :label="this.$t('pmt.giftRegistration.GiftCauseLable')"
          @click="showGiftCausePicker = true"
          input-align="right"
          label-width="120px"
          :rules="[
            {
              required: true,
              message: this.$t('pmt.giftRegistration.GiftCauseMessage'),
            },
          ]"
        />
        <van-popup v-model="showGiftCausePicker" position="bottom" round>
          <van-picker
            show-toolbar
            :columns="giftCauseSelectData"
            @cancel="showGiftCausePicker = false"
            @confirm="onConfirm_GiftCause"
            value-key="text"
            :confirm-button-text="this.$t('pmt.confirmButton')"
            :cancel-button-text="this.$t('pmt.cancelButton')"
          />
        </van-popup>
      </div>

      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.giftRegistration.ReceiverTitle") }}
        </h2>
        <van-field
          v-model="receiverName"
          :label="this.$t('pmt.giftRegistration.ReceiverNameLable')"
          input-align="right"
          label-width="120px"
          :rules="[
            {
              required: true,
              message: this.$t('pmt.giftRegistration.ReceiverNameMessage'),
            },
          ]"
        />
        <van-field
          v-model="receiverPhotoNumber"
          :label="this.$t('pmt.giftRegistration.ReceiverPhoneNumberLable')"
          type="tel"
          clearable
          input-align="right"
          label-width="120px"
          :rules="[
            {
              required: true,
              message: this.$t(
                'pmt.giftRegistration.ReceiverPhoneNumberMessage'
              ),
            },
          ]"
        />
        <van-field
          v-model="receiverAddress"
          rows="3"
          autosize
          :label="this.$t('pmt.giftRegistration.ReceiverAddressLable')"
          type="textarea"
          input-align="right"
        />
      </div>

      <div class="tab-bar">
        <van-tabbar route>
          <van-button
            block
            square
            type="info"
            color="#407FDC"
            native-type="submit"
            >{{ this.$t("pmt.submitButton") }}</van-button
          >
          <van-button
            block
            square
            type="info"
            color="#2058AB"
            @click="onCancel"
            >{{ this.$t("pmt.cancelButton") }}</van-button
          >
        </van-tabbar>
      </div>
    </van-form>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  getShopSelectData,
  postSubmitGitRegister,
  getcauses,
  getgifts,
} from "@/api/giftRegistration";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";
export default {
  name: "gift_Registration",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.giftRegistration.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "", //<i class="van-icon van-icon-search"></i>

      showShopPicker: false,
      showGiftPicker: false,
      showGiftCausePicker: false,

      selectShopId: 0,
      selectShopName: "",
      selectGiftId: 0,
      selectGiftName: "",
      quantity: 0,
      selectGiftCauseId: 0,
      selectGiftCauseName: "",
      receiverName: "",
      receiverPhotoNumber: "",
      receiverAddress: "",
      shopSelectData: [],
      giftNameSelectData: [],
      giftCauseSelectData: [],
    };
  },
  created() {
    this.getSelectData();
    if (this.shopSelectData.length > 0) {
      this.onConfirm_Shop(this.shopSelectData[0]);
    }
  },
  methods: {
    topBarClickLeft() {
      this.$router.go(-1);
    },

    topBarClickRight() {
      console.log("click right");
    },

    getSelectData() {
      this.shopSelectData = [];
      var data = {};
      postUserPermission(data)
        .then((res) => {
          if (res.success) {
            // this.shopSelectData = res.data.shopPermission;
            var resShop = res.data.shopPermission;
            resShop.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.Id = element.new_shop_id;
              thiselement.text = element.new_shop_name;
              thiselement.test = "test";
              this.shopSelectData.push(thiselement);
            });
            if (this.shopSelectData.length > 0) {
              this.onConfirm_Shop(this.shopSelectData[0]);
            }
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});

      this.giftNameSelectData = [];

      getgifts()
        .then((res) => {
          //  ;
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var resBranch = res.data;
            resBranch.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.id = element.id;
              thiselement.text = element.text;
              this.giftNameSelectData.push(thiselement);
            });
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        });

      this.giftCauseSelectData = [];
      getcauses()
        .then((res) => {
          //  ;
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var resBranch = res.data;
            resBranch.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.id = element.id;
              thiselement.text = element.text;
              this.giftCauseSelectData.push(thiselement);
            });
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        });
    },

    onConfirm_Shop(value) {
      //
      console.log(value);
      this.selectShopId = value.Id;
      this.selectShopName = value.text;
      this.showShopPicker = false;
    },
    onConfirm_Gift(value) {
      console.log(value);
      // this.selectGiftId = value.Id;
      this.selectGiftName = value.text;
      this.showGiftPicker = false;
    },
    onConfirm_GiftCause(value) {
      console.log(value);
      // this.selectGiftCauseId = value.Id;
      this.selectGiftCauseName = value.text;
      this.showGiftCausePicker = false;
    },
    onSubmit() {
      var data = {
        new_shop_id: this.selectShopId,
        new_gift_name: this.selectGiftName,
        new_gift_cause: this.selectGiftCauseName,
        new_gift_qty: this.quantity,
        new_receiver_name: this.receiverName,
        new_receiver_mobile: this.receiverPhotoNumber,
        new_receiver_address: this.receiverAddress,
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      postSubmitGitRegister(data)
        .then((res) => {
          if (res.success) {
            this.$toast.success(res.message);
            this.$router.go(-1);
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },
    onCancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<style>
/*.van-field__error-message {*/
/*  float: right;*/
/*}*/

/*.form-group {*/
/*  margin: 12px;*/
/*  border-radius: 12px;*/
/*  overflow: hidden;*/
/*  background: #fff;*/
/*}*/
</style>
