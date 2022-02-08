<template>
  <div class="register">
    <!-- <van-nav-bar title="Register" left-arrow fixed @click-left="onClickLeft" /> -->
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="onClickLeft"
    >
    </TopBar>
    <div class="content">
      <van-form label-width="3.5rem" @submit="onSubmit">
        <van-cell-group class="register">
          <van-field
            required
            :label="$t('user.register.fullName')"
            :rules="[
              {
                required: true,
                message: $t('user.register.fullNameErrorMessage'),
              },
            ]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="registerInfo.fullName"
          />
          <van-field
            required
            v-model="registerInfo.selectShopName"
            is-link
            readonly
            :label="this.$t('user.register.shop')"
            @click="showShopPicker = true"
            input-align="right"
            label-width="3.7rem"
            :rules="[
              {
                required: true,
                message: this.$t('user.register.shopErrorMessage'),
              },
            ]"
          />
          <shop-selection
            v-model="showShopPicker"
            @confirm="onConfirm_Shop"
          ></shop-selection>
          <van-field
            required
            v-model="shopInfo.selectDealerName"
            readonly
            :label="this.$t('user.register.dealer')"
            input-align="right"
            label-width="3.7rem"
          />
          <van-field
            required
            :label="$t('user.register.cnic')"
            :rules="[
              {
                required: true,
                message: $t('user.register.cnicErrorMessage'),
              },
            ]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="registerInfo.cnic"
          />
          <van-field
            required
            type="number"
            :label="$t('user.register.mobileNumber')"
            :rules="[
              {
                required: true,
                message: $t('user.register.mobileNumberErrorMessage'),
              },
            ]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="registerInfo.mobileNumber"
          />
          <van-field
            required
            type="password"
            :label="$t('user.register.password')"
            :rules="[
              {
                required: true,
                message: $t('user.register.passwordErrorMessage'),
              },
            ]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="registerInfo.password"
          />
          <van-field
            required
            type="password"
            :label="$t('user.register.confirmPassword')"
            :rules="[
              {
                required: true,
                message: $t('user.register.confirmPasswordErrorMessage'),
              },
              {
                validator: confirmPasswordValidator,
                message: $t('user.register.confirmPasswordMessage'),
              },
            ]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            validate-trigger="onBlur"
            v-model="registerInfo.confirmPassword"
          />
          <van-row
            class="userVerficationCode"
            style="padding: 10px 16px 10px 0"
          >
            <van-col span="24">
              <van-field
                required
                type="number"
                :label="$t('user.register.verficationCode')"
                :rules="[
                  {
                    required: true,
                    message: $t('user.register.verficationCodeErrorMessage'),
                  },
                ]"
                input-align="right"
                label-width="3.7rem"
                :colon="true"
                v-model="registerInfo.verficationCode"
              />
            </van-col>
            <van-col span="3" class="forget_pass_phone_number_button">
              <van-button
                v-show="!isVerificationCode"
                class=""
                type="info"
                size="mini"
                native-type="button"
                @click="onSendVerifyCode()"
              >
                {{ $t("user.register.buttonSend") }}
              </van-button>
              <van-count-down
                :time="time"
                ref="countDown"
                v-show="isVerificationCode"
                @finish="onCountDownFinish"
              >
                <template #default="timeData">
                  <span class="block">{{ timeData.seconds + "s" }}</span>
                </template>
              </van-count-down>
            </van-col>
          </van-row>
          <van-row style="padding: 10px 16px">
            <van-col>
              <van-checkbox
                label-disabled
                icon-size="0.4rem"
                v-model="registerInfo.checked"
                >{{ $t("user.register.messageTop") }}
                <a
                  class="register-file"
                  @click.stop.prevent="readFile($event, 1)"
                  v-text="checkedFirstFileName"
                ></a
                >{{ $t("user.register.messageAnd") }}
                <a
                  class="register-file"
                  @click.stop.prevent="readFile($event, 2)"
                  v-text="checkedLastFileName"
                ></a>
              </van-checkbox>
            </van-col>
          </van-row>
        </van-cell-group>
        <div class="tab-bar">
          <van-tabbar route>
            <van-button
              block
              :loading="submitLoading"
              color="#2058AB"
              native-type="submit"
            >
             {{ $t("user.login.Register") }}
            </van-button>
          </van-tabbar>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar";
import shopSelection from "@/components/ShopSelection";
import { getAllShopList } from "@/api/common";
import { postRegister, postUserSendVerifyCode } from "@/api/user";
export default {
  name: "Register",
  components: {
    TopBar,
    shopSelection,
  },
  data() {
    return {
      topBarTitle: this.$t("user.register.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",
      showShopPicker: false,
      showDealerPicker: false,
      shopSelectData: [],
      shopSaveSelectData: [],
      dealerSelectData: [],
      dealerSaveSelectData: [],

      searchShopKey: "",
      registerInfo: {
        fullName: "",
        mobileNumber: "",
        cnic: "",
        selectShopId: "",
        selectShopName: "",
        verficationCode: "",
        password: "",
        confirmPassword: "",
        checked: false,
      },
      shopInfo: {
        selectDealerId: "",
        selectDealerName: "",
      },
      url1: "",
      url2: "",
      checkedFirstFileName: "<AQUA Sales Parter Service Agreement>",
      checkedLastFileName: "<Privacy Information Protection Policy> ",

      time: 0,
      isVerificationCode: false,
      username: "",
      password: "",
      submitLoading: false,
    };
  },
  created() {
    let registerInfo = localStorage.getItem('registerInfo')
    if (registerInfo) {
      let info = JSON.parse(registerInfo)
      for (let key in info) {
        this[key] = info[key];
      }
    } else {
      this.url1 = "https://tgtmaevportal.haier.net:8405/DownLoad/PMT/File/AQUA_Sales_Partner_Service_Agreement.html?lang=" + this.$store.getters.lang;
      this.url2 = "https://tgtmaevportal.haier.net:8405/DownLoad/PMT/File/Privacy_Information_Protection_Policy.html?lang=" + this.$store.getters.lang;
    }
  },
  computed: {},
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Webview') {
      localStorage.setItem('registerInfo', JSON.stringify(this._data))
    } else {
      localStorage.removeItem('registerInfo')
    }
    next()
  },
  methods: {
    // 点击顶部导航左侧箭头
    onClickLeft() {
      this.$router.go(-1);
    },
    readFile(e, type) {
      e.preventDefault();
      let url = type === 1 ? this.url1 : this.url2;
      let title =
        type === 1
          ? "Sales Parter Service Agreement"
          : "Information Protection Policy";
      this.$router.push({
        name: "Webview",
        query: {
          url: encodeURI(url),
          title: encodeURI(title),
        },
      });
    },
    // 校验密码和确认密码
    confirmPasswordValidator(val) {
      return this.registerInfo.password === val;
    },
    // 点击注册事件
    onSubmit() {
      this.submitLoading = true;
      const registerInfo = this.registerInfo;
      let params = {
        new_pmt_name: registerInfo.fullName,
        mobile_number: registerInfo.mobileNumber,
        new_cnic: registerInfo.cnic,
        shop_id: registerInfo.selectShopId,
        password1: registerInfo.password,
        password2: registerInfo.confirmPassword,
        verify: registerInfo.verficationCode,
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      postRegister(params)
        .then((res) => {
          const { success, data } = res;
          this.$toast.clear();
          if (success) {
            this.onClickLeft();
          } else {
            this.submitLoading = false;
            this.$toast.fail(data.Message);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 选择门店确定
    onConfirm_Shop(value) {
      this.registerInfo.selectShopId = value.id;
      this.registerInfo.selectShopName = value.text;
      this.shopInfo.selectDealerName = value.customer_name;
    },

    // 点击send按钮事件
    onSendVerifyCode() {
      const mobileNumber = this.registerInfo.mobileNumber;
      if (!mobileNumber) {
        return this.$toast.fail(
          this.$t("user.register.mobileNumberErrorMessage")
        );
      }
      const body = {
        mobile: mobileNumber,
        sendtype: 1,
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      postUserSendVerifyCode(body)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.$toast.clear();
            this.time = 60000;
            this.isVerificationCode = true;
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    // 倒计时结束
    onCountDownFinish() {
      this.time = 0;
      this.isVerificationCode = false;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .van-checkbox__label {
  margin-left: 0.4rem;
}
.register {
  background: #fff;
  .content {
    .register-btn {
      padding: 34px;
      font-weight: bold;
    }
    .userPhoto {
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
    }
    .userVerficationCode {
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
    }
    .register-file {
      color: blue;
      text-decoration: underline;
    }
  }
}
</style>
