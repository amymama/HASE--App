<template>
  <div class="visitStatisticsBox">
    <TopBar
      :topBarTitle="this.$t('pmt.visitStatistics.title')"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    ></TopBar>
    <div class="date">
      {{ this.$t("pmt.visitStatistics.date") }}:{{ dateOn }}
    </div>

    <div class="navBox">
      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.visitStatistics.basicInfo") }}
        </h2>

        <van-field
          readonly
          input-align="right"
          v-model="formData.UserName"
          label-width="120px"
          :label="this.$t('pmt.visitStatistics.name')"
        />
        <van-field
          readonly
          input-align="right"
          v-model="formData.PositionCode"
          label-width="120px"
          :label="this.$t('pmt.visitStatistics.personnelType')"
        />
        <van-field
          readonly
          input-align="right"
          v-model="formData.AreaName"
          label-width="120px"
          :label="this.$t('pmt.visitStatistics.region')"
        />
        <van-field
          readonly
          input-align="right"
          v-model="formData.ChannelName"
          label-width="120px"
          :label="this.$t('pmt.visitStatistics.branch')"
        />
        <van-field
          readonly
          input-align="right"
          v-model="formData.DealerName"
          label-width="120px"
          :label="this.$t('pmt.visitStatistics.dealer')"
        />
        <!-- <van-field
          readonly
          input-align="right"
          v-model="formData.ShopName"
          label-width="120px"
          :label="this.$t('pmt.visitStatistics.shopName')"
        /> -->
        <van-field
          v-model="formData.ShopName"
          is-link
          readonly
          :label="this.$t('pmt.giftRegistration.ShopLable')"
          @click="showShopPicker = true"
          input-align="right"
          label-width="120px"
          :rules="[
            {
              required: true,
              message: this.$t('pmt.attendant.shopErrorMessage'),
            },
          ]"
        />
      </div>
    </div>
    <div class="navBox">
      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.visitStatistics.detail") }}
        </h2>
        <van-form :model="guestData">
          <van-field
            input-align="right"
            v-model="guestData.new_shop_guest"
            label-width="140px"
            :label="this.$t('pmt.visitStatistics.shopGuest')"
          />
          <van-field
            input-align="right"
            v-model="guestData.new_booth_guest"
            label-width="140px"
            :label="this.$t('pmt.visitStatistics.aquaBoothGuest')"
          />
          <van-field
            input-align="right"
            v-model="guestData.new_purchased_guest"
            label-width="140px"
            :label="this.$t('pmt.visitStatistics.purchasedGuest')"
          />
        </van-form>
      </div>
    </div>
    <van-popup v-model="showShopPicker" position="bottom" round>
      <van-picker
        show-toolbar
        :columns="selectShopOption"
        @cancel="showShopPicker = false"
        @confirm="onConfirm_Shop"
        value-key="ShopName"
        :confirm-button-text="this.$t('pmt.confirmButton')"
        :cancel-button-text="this.$t('pmt.cancelButton')"
      />
    </van-popup>
    <div class="buttonBox">
      <div class="bottombutton">
        <van-button
          :loading="loadingSubmit"
          class="button"
          style="background: #4d72ac"
          @click="
            () => {
              this.$throttle.throttle(onSubmit());
            }
          "
          type="info"
          >{{ this.$t("pmt.visitStatistics.submit") }}</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar";
import {
  addvisitstatistics,
  getuseridentityshop,
  getuseridentityshoplist,
} from "@/api/stockCheck";
export default {
  naem: "visitStatistics",
  components: {
    TopBar,
  },
  computed: {
    dateOn() {
      // 获取当前日期
      var nowDate = new Date();
      let date = {
        y: nowDate.getFullYear(),
        m: nowDate.getMonth() + 1,
        d: nowDate.getDate(),
      };
      return date.y + "-" + date.m + "-" + date.d;
    },
  },
  data() {
    return {
      loadingSubmit: false,
      guestData: {
        new_purchased_guest: "",
        new_booth_guest: "",
        new_shop_guest: "",
      },
      formData: {},
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      showShopPicker: false,
      selectShopOption:[]
    };
  },
  created() {
    this.getData(); //获取数据
    // console.log(this.guestData, "11");
  },
  methods: {
    //提交
    onSubmit() {
      const params = {
        Id: "",
        new_dealer_id: this.formData.DealerId,
        new_dealer_name: this.formData.DealerName,
        new_shop_id: this.formData.ShopId,
        new_shop_code: this.formData.ShopCode,
        new_shop_name: this.formData.ShopName,
        new_shop_guest: this.guestData.new_shop_guest,
        new_booth_guest: this.guestData.new_booth_guest,
        new_purchased_guest: this.guestData.new_purchased_guest,
      };
      // const params = Object.assign(this.formData, Obj);
      // this.loadingSubmit=true
      this.$toast.loading({ duration: 0, forbidClick: true });
      addvisitstatistics(params)
        .then((res) => {
          if (res.success === true) {
            this.$toast.success(res.message);
            setTimeout(() => {
              this.topBarClickLeft();
            }, 1000);
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((error) => {
          this.$toast.fail(error.message);
        })
        .finally(() => {
          this.loadingSubmit = false;
        });
    },
    // 返回上一页
    topBarClickLeft() {
      this.$router.go(-1);
    },

    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    getData() {
      // getuseridentityshop().then((res) => {
      //   if (res.success === true) {
      //     if (res.data) {
      //       this.formData = res.data;
      //       console.log("获取的数据：", res);
      //     }
      //   } else {
      //   }
      // });

      this.$toast.loading({ duration: 0, forbidClick: true });
      getuseridentityshoplist()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.handleHideLoading();
            if (data != null && data.length > 0) {
              this.formData = data[0];
              this.selectShopOption = data;
            }
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
    onConfirm_Shop(value) {
      console.log(value);
      if (value == undefined) {
        this.showShopPicker = false;
        return false;
      }
      this.formData = value;
      this.showShopPicker = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.visitStatisticsBox {
  .date {
    font-weight: 700;
    margin: 10px 20px;
    height: 50px;
    line-height: 50px;
  }
  .buttonBox {
    height: 90px;
    .bottombutton {
      width: 100%;
      position: fixed;
      bottom: 0;
      .button {
        width: 100%;
      }
    }
  }
  .block {
    width: 600px;
    .text {
      height: 130px;
      text-align: center;
      margin: 20px 20px;
      .text-item {
        text-align: left;
      }
    }
    .button {
      text-align: center;
      .button-item {
        width: 90%;
      }
    }
  }
}
</style>