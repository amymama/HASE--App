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
      <!-- FORM -->
      <van-form class="login__form" @submit="onSubmit">
        <van-field
          v-model="username"
          size="large"
          class="field-item"
          :border="false"
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
          class="field-item"
          :border="false"
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
        <div class="login-forget">
          <!-- <router-link :to="{ name: 'ForgetPassword' }">Forgot Password?</router-link> -->
        </div>
        <div class="login-btn">
          <van-button
            block
            :loading="submitLoading"
            size="large"
            color="#0a3c78"
            native-type="submit"
          >
            {{ $t("uLogin.Login") }}
          </van-button>
        </div>
        <div class="login-policy">
          <van-checkbox checked-color="#03a9f4" icon-size=".32rem" v-model="checked"/>
          <span class="login-policy__text" @click="$refs.Policy.show()">I have checked & agreed with &lt;<i>Privacy Information Protection Policy</i>&gt;</span>
        </div>
      </van-form>
      <div class="login-register-box" >
          <van-divider :style="{ color: '#FFF', fontSize: '14px' }">No Account? Register Now!</van-divider>
          <van-grid :column-num="2" :border="false">
            <van-grid-item
              v-for="(item, index) in registerList"
              :key="index"
              :icon="item.icon"
              :text="item.name"
              :to="{ name: item.routeName }"
            />
          </van-grid>
      </div>
    </div>
    <!-- changeLang -->
    <change-lang ref="changeLang" />
    <!-- edite pwd -->
    <change-pwd ref="changePwd" />
    <privacy-policy ref="Policy"/>
  </div>
</template>
<script>
import ChangeLang from "@/components/ChangeLang";
import ChangePwd from "@/views/me/components/ChangePwd";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import icon_internal from "@/assets/images/user/register_icon1.png";
import icon_partner from "@/assets/images/user/register_icon2.png";

export default {
  name: "Login",
  components: {
    ChangeLang,
    ChangePwd,
    PrivacyPolicy
  },
  data() {
    return {
      username: "",
      password: "",
      checked: false,
      passwordType: "password",
      submitLoading: false,
      registerList: [
        {
          icon: icon_internal,
          name: 'Internal',
          routeName: ""
        },
        {
          icon: icon_partner,
          name: 'Partner',
          routeName: ""
        }
      ]
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
    // Login APP
    onSubmit() {
      if (this.checked) {
        const { username, password } = this;
        this.submitLoading = true;
        this.$store.dispatch("user/Login", {
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
      } else {
        this.$toast("Please agree with Privacy Policy firstly!")
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  min-height: 100%;
  background-image: linear-gradient(to bottom, #2c85ee, #114c92);
  box-sizing: border-box;
  position: relative;
  color: #FFF;
  padding-bottom: 240px;
  .login__header {
    color: #2058ab;
    .login__lang {
      position: absolute;
      right: 80px;
      top: 60px;
      display: flex;
      align-items: center;
      color: #FFF;
      .iconfont {
        font-size: 40px !important;
        margin-right: 10px;
        color: #FFF;
      }
    }
    .login__logo {
      padding: 180px 150px 32px 150px;
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
    padding: 42px;
    overflow: hidden;
    .field-item{
      background: #0a3c78;
      margin-top: 32px;
      border-radius: 12px;
    }
    .iconfont {
      font-size: 34px !important;
      color: #FFF;
    }
    .login-forget{
      padding: 24px 0;
      text-align: right;
      color: #FFF;
      font-size: 18px;
      a{
        color: #FFF;
      }
    }
    .login-policy{
      display: flex;
      padding: 24px 0;
      font-size: 18px;
      .login-policy__text{
        margin-left: 15px;
        i{
          text-decoration: underline;
          font-style: italic;
        }
      }
    }
    .login-btn{
      font-weight: bold;
      font-size: 34px;
      border-radius: 12px;
      overflow: hidden;
    }
  }
  .login-register-box{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
<style lang="scss">
  .login__body .van-field__control{
    color: #FFF !important;
  }
  .login-register-box{
    .van-grid-item__content{
      background: none;
      color: #FFF;
    }
    .van-grid-item__text{
      color: #FFF;
    }
  }
</style>
