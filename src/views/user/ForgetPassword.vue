<template>
  <div class="forget">
    <van-nav-bar
      :title="$t('user.login.forget_password')"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="content">
      <van-form label-width="3.5rem" @submit="onSubmit">
        <van-field
          class="forget_pass_lable"
          v-model="password"
          :label="$t('user.login.new_password')"
          :placeholder="$t('user.login.new_password_placeholder')"
          type="password"
          :rules="[
            { required: true, message: $t('user.login.new_password_message') },
          ]"
        />
        <van-field
          class="forget_pass_lable"
          v-model="password1"
          :label="$t('user.login.confirm_password')"
          :placeholder="$t('user.login.confirm_password_placeholder')"
          type="password"
          :rules="[
            {
              required: true,
              message: $t('user.login.confirm_password_message'),
              validator: validatePass2,
            },
          ]"
        />
        <div class="van-multi-ellipsis--l3 forget_pass_massgae">
          {{ $t("user.login.forget_password_message") }}
        </div>
        <van-row>
          <van-col span="19 ">
            <van-field
              class="forget_pass_lable"
              v-model="phoneNumber"
              :label="$t('user.login.phone_number')"
              type="number"
            >
            </van-field
          ></van-col>
          <van-col span="5" class="forget_pass_phone_number_button">
            <van-button
              v-show="!isVerificationCode"
              class=""
              type="info"
              size="mini"
              native-type="button"
              @click="onSendVerifyCode()"
            >
              {{ $t("user.login.phone_number_button") }}
            </van-button>
            <van-count-down
              :time="time"
              ref="countDown"
              v-show="isVerificationCode"
              @finish="onCountDownFinish()"
            >
              <template #default="timeData">
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </van-count-down>
          </van-col>
        </van-row>
        <van-field
          class="forget_pass_lable"
          v-model="verificationCode"
          :label="$t('user.login.Verification_Code')"
        />

        <div class="register-btn">
          <van-button
            block
            :loading="submitLoading"
            color="#2058AB"
            native-type="submit"
          >
            {{ $t("user.login.Confirm_button") }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import ChangeLang from "@/components/ChangeLang";
import {
  postUserSendVerifyCode,
  postUserChangePasswordConfirm,
} from "@/api/user";
export default {
  name: "ForgetPassword",
  components: {
    ChangeLang,
  },
  data() {
    return {
      id: "",
      username: "",
      password: "",
      password1: "",
      phoneNumber: "",
      verificationCode: "",
      isVerificationCode: false,
      submitLoading: false,
      time: 60 * 1000,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    validatePass2(value) {

      if (value === "") {
        return false;
      } else if (value !== this.password) {
        return false;
      } else {
        return true;
      }
    },

    onCountDownFinish() {
      this.isVerificationCode = false;
    },

    reset() {
      this.$refs.countDown.reset();
    },

    onSendVerifyCode() {
      const phoneNumber = this.phoneNumber;
      if (!phoneNumber) {
        return this.$toast.fail(
          this.$t("user.register.mobileNumberErrorMessage")
        );
      }
      var queryData = {
        mobile: phoneNumber,
        sendtype: 3,
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      postUserSendVerifyCode(queryData)
        .then((res) => {
          const { success, message } = res;
          if (success) {
            this.$toast.clear();
            this.reset();
            this.isVerificationCode = true;
          } else {
            this.$toast.fail(message);
          }
        })
        .catch((error) => {
          this.$toast.fail(error.message);
        });
    },

    //
    onSubmit() {
      var queryData = {
        id: this.id,
        psw1: this.password,
        psw2: this.password1,
        mobile: this.phoneNumber,
        verify: this.verificationCode,
      };
      this.submitLoading = true;
      postUserChangePasswordConfirm(queryData)
        .then((res) => {
          const { success, message } = res;
          if (success) {
            this.$router.go(-1);
          } else {
            this.$toast.fail(message);
          }
          this.submitLoading = false;
        })
        .catch((error) => {
          this.$toast.fail($t("user.login.Error_Message"));
        })
        .finally(() => {
          this.submitLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.forget {
  background: #fff;
  .content {
    padding-top: 90px;
    .forget_pass_lable {
      font-size: 1em;
      font-weight: bold;
    }
    .forget_pass_massgae {
      padding: 34px;
      // font-weight: bold;
    }
    .forget_pass_phone_number_button {
      padding-top: 23px;
      padding-right: 10px;
      // padding-bottom: 34px;

      // font-weight: bold;
    }
  }
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 80px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  background-color: #2058ab;
}
</style>
