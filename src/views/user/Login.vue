<template>
  <div class="login">
    <div class="login__header">
      <div class="login__lang" @click="$refs.changeLang.show()">
        <i class="iconfont icon-lang"></i>
        {{ $t("lang") }}
      </div>
      <div class="login__logo">
        <img src="@/assets/images/login_logo.png" alt="HAIER GTM" />
      </div>
    </div>
    <div class="login__body">
      <van-form class="login__form" @submit="onSubmit">
        <van-field
          v-model="username"
          size="large"
          :placeholder="$t('uLogin.UserName')"
          :rules="[{ required: true, message: ' ' }]"
        >
          <template slot="left-icon">
            <i class="iconfont icon-username"></i>
          </template>
        </van-field>
        <van-field
          v-model="password"
          size="large"
          :type="passwordType"
          :right-icon="passwordType == 'password' ? 'closed-eye' : 'eye-o'"
          :placeholder="$t('uLogin.Password')"
          @click-right-icon="togglePwd"
          :rules="[{ required: true, message: ' ' }]"
          autocomplete="off"
        >
          <template slot="left-icon">
            <i class="iconfont icon-password"></i>
          </template>
        </van-field>
        <div class="remember-account">
          <van-checkbox
            v-model="checked"
            shape="square"
            checked-color="#2058AB"
            icon-size=".36rem"
          >
            <span style="color: #999">
              {{ $t("uLogin.RememberPwd") }}
            </span>
          </van-checkbox>
        </div>
        <div class="login-btn">
          <van-button
            block
            round
            :loading="submitLoading"
            size="large"
            color="linear-gradient(to right, #5390ea, #2058AB)"
            native-type="submit"
          >
            {{ $t("uLogin.Login") }}
          </van-button>
        </div>
        <!-- <div class="register">
          //<a @click="onRegister()">{{ $t("user.login.Register") }}</a>
        </div> -->
        <div class="foget_pass">
          <a @click="onForgetPassword()">{{
            $t("user.login.forget_password")
          }}</a>
        </div>
      </van-form>
    </div>

    <!-- footer -->
    <div class="login__footer">
      <login-footer />
    </div>
    <!-- changeLang -->
    <change-lang ref="changeLang" />
    <!-- edite pwd -->
    <change-pwd ref="changePwd" />

    <div class="tab-bar">
      <van-tabbar route>
        <van-button
          block
          :loading="submitLoading"
          type="default"
          size="large"
          @click="onRegister()"
        >
          {{ $t("user.login.Register") }}
        </van-button>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import LoginFooter from "./components/Footer";
import ChangeLang from "@/components/ChangeLang";
import ChangePwd from "@/views/me/components/ChangePwd";

export default {
  name: "Login",
  components: {
    LoginFooter,
    ChangeLang,
    ChangePwd,
  },
  data() {
    return {
      username: "",
      password: "",
      checked: false,
      passwordType: "password",
      submitLoading: false,
    };
  },
  created() {
    // init appbar status
    if (window.plus) {
      plus.navigator.setStatusBarStyle("dark");
    }
  },
  beforeDestroy() {
    // change appbar status
    if (window.plus) {
      plus.navigator.setStatusBarBackground("#2058AB");
      plus.navigator.setStatusBarStyle("light");
    }
  },
  methods: {
    // visible pwd
    togglePwd() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    },
    // submit
    onSubmit() {
      const { username, password } = this;
      this.submitLoading = true;
      this.$store
        .dispatch("user/Login", {
          username,
          password,
        })
        .then((res) => {
          const { success, message, data } = res;
          this.submitLoading = false;
          if (success) {
            // 密码不符合规则
            if (data.CurrentPage == 2) {
              this.$toast.fail(
                "Login failed. The password does not comply with the rules"
              );
              this.$refs.changePwd.show(data.Items.Access_token);
            } else {
              this.$router.replace("/");
            }
          } else {
            this.$toast.fail(message);
          }
        })
        .catch(() => {
          this.submitLoading = false;
          this.$toast.fail("Netwoke error");
        });
    },

    onForgetPassword() {
      this.$router.push({ name: "ForgetPassword" });
    },

    onRegister() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  min-height: 100%;
  background: #fff;
  box-sizing: border-box;
  padding-bottom: 240px;
  position: relative;
  .login__header {
    color: #2058ab;
    .login__lang {
      position: absolute;
      right: 80px;
      top: 60px;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 40px !important;
        margin-right: 10px;
      }
    }
    .login__logo {
      padding: 180px 120px 32px 120px;
      font-size: 90px;
      font-weight: bold;
      text-align: center;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  .login__body {
    border-radius: 32px;
    background: #fff;
    margin: 24px;
    overflow: hidden;
    .iconfont {
      font-size: 34px !important;
      color: #2058ab;
    }
    .remember-account {
      padding: 34px;
      font-size: 28px;
    }
    .login-btn,
    .reg-btn {
      padding: 24px 34px;
      font-weight: bold;
    }
    .foget_pass {
      padding: 24px 34px;
      font-weight: bold;
      text-align: center;
    }

    .foget_pass a {
      color: red;
    }
    .register {
      font-weight: bold;
      text-align: center;
    }
  }
  .login__footer {
    position: absolute;
    color: #fff;
    width: 100%;
    bottom: 34px;
    line-height: 38px;
    font-size: 24px;
    left: 0;
  }
}
</style>
