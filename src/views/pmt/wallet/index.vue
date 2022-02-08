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
    <!-- <van-form @submit="onSubmit" class=""> -->
    <div class="infog-card wallet">
      <div class="form-group wallet-top">
        <img class="photo" src="@/assets/images/pmt/icon/wallet_photo.png" />
        <p class="Balance">{{ this.$t("pmt.wallet.Balance") }}</p>
        <p class="Balance">{{ forData.new_balance }}</p>
        <div class="BalanceDetail">
          <!-- <p class="" style="float: right"> -->
          <a style="float: right" @click="onClickDetail()">{{
            $t("pmt.wallet.BalanceDetail")
          }}</a>
          <!-- {{ this.$t("pmt.wallet.BalanceDetail") }}
          </p> -->
        </div>
        <div>
          <van-cell-group>
            <van-cell
              :title="this.$t('pmt.wallet.YesterdayIncome')"
              :value="forData.new_yesterday_income"
            />
          </van-cell-group>
        </div>
      </div>
      <div class="form-group">
        <van-form>
          <van-field
            readonly
            :label="this.$t('pmt.wallet.WithdrawalAmount')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="forData.new_withdrawal_amount"
          >
            <template #input>
              <span
                class="WithdrawalAmount"
                v-text="forData.new_withdrawal_amount"
              ></span>
              <a @click="onClickHistory()">{{ $t("pmt.wallet.History") }}</a>
            </template>
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.wallet.AccumulatedTotal')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="forData.new_accumulated_total"
          />
        </van-form>
      </div>
      <div class="info">
        <div class="form-group">
          <p class="Notice">{{ this.$t("pmt.wallet.Notice") }}</p>
          <div class="message">
            <b class="serial-number">1</b>
            <span class="message-title">{{
              this.$t("pmt.wallet.1messageStart")
            }}</span>
            <span
              class="message-key"
              v-text="
                this.forData.new_min_withdrawal_amount +
                ' ' +
                this.$t('pmt.unit') +
                ' '
              "
            ></span>
            <span class="message-title">{{
              this.$t("pmt.wallet.1messageEnd")
            }}</span>
          </div>

          <div class="message">
            <b class="serial-number">2</b>
            <span class="message-title">{{
              this.$t("pmt.wallet.2messageStart")
            }}</span>
            <span
              class="message-key"
              v-text="
                this.forData.new_task_frequency +
                '-' +
                this.forData.new_task_time
              "
            ></span>
          </div>

          <div class="message">
            <b class="serial-number">3</b>
            <span class="message-title">{{
              this.$t("pmt.wallet.3messageStart")
            }}</span>
            <span
              class="message-key"
              v-text="
                this.forData.new_max_withdrawal_amount +
                ' ' +
                this.$t('pmt.unit') +
                ' '
              "
            ></span>
            <span class="message-title">{{
              this.$t("pmt.wallet.3messageEnd")
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-bar">
      <van-tabbar route>
        <van-button block type="info" @click="onButton_Withdrawal">{{
          this.$t("pmt.wallet.buttonWithdrawal")
        }}</van-button>
      </van-tabbar>
    </div>

    <van-popup v-model="showVerify">
      <div class="block">
        <TopBar
          :topBarTitle="this.$t('pmt.wallet.Verify')"
          :leftHtml="''"
          :rightHtml="''"
        ></TopBar>
        <van-form ref="">
          <van-field
            v-model="userLoginData.username"
            size="small"
            :placeholder="$t('uLogin.UserName')"
            :rules="[{ required: true, message: ' ' }]"
            :label="$t('user.login.userName')"
            readonly="true"
            label-width="auto"
            input-align="right"
          >
          </van-field>
          <van-field
            v-model="userLoginData.password"
            size="small"
            :type="passwordType"
            :right-icon="passwordType == 'password' ? 'closed-eye' : 'eye-o'"
            :placeholder="$t('uLogin.Password')"
            @click-right-icon="togglePwd"
            :rules="[{ required: true, message: ' ' }]"
            autocomplete="off"
            :label="$t('user.login.password')"
            label-width="auto"
            input-align="right"
          >
          </van-field>
          <div class="button">
            <van-button
              type="info"
              class="button-login"
              @click="onClickLogin"
              >{{ this.$t("user.login.login") }}</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>

    <van-popup v-model="showAccountType">
      <div class="block">
        <TopBar
          :topBarTitle="this.$t('pmt.wallet.AccountType')"
          :leftHtml="''"
          :rightHtml="''"
        ></TopBar>
        <van-form ref="">
          <van-radio-group
            class="AccountType"
            v-model="selectWithdrawal"
            :max="1"
          >
            <van-radio
              :key="index"
              :name="item.Id"
              v-for="(item, index) in WithdrawalOption"
              >{{ item.text }}</van-radio
            >
          </van-radio-group>
          <div class="button">
            <van-button
              type="info"
              class="button-login"
              @click="onClickConfirmAccountType"
              >{{ this.$t("pmt.confirmButton") }}</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>

    <van-popup v-model="showFinalConfirm">
      <div class="block">
        <TopBar
          :topBarTitle="this.$t('pmt.wallet.FinalConfirm')"
          :leftHtml="''"
          :rightHtml="''"
        ></TopBar>
        <van-form ref="">
          <van-field
            v-model="submitData.e_wallet_phone_number"
            size="small"
            class=""
            :rules="[{ required: true, message: ' ' }]"
            :label="$t('pmt.wallet.E-walletPhoneNumber')"
            label-width="auto"
            input-align="right"
          >
          </van-field>
          <van-field
            readonly
            v-model="submitData.withdrawal_amount"
            size="small"
            :label="$t('pmt.wallet.WithdrawalAmount')"
            label-width="auto"
            input-align="right"
          >
          </van-field>
          <div class="button">
            <van-button
              type="info"
              class="button-login"
              @click="onClickFinalConfirm"
              >{{ this.$t("pmt.confirmButton") }}</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>

    <van-popup v-model="showFeedback">
      <div class="block">
        <TopBar
          :topBarTitle="this.$t('pmt.wallet.Feedback')"
          :leftHtml="''"
          :rightHtml="''"
        ></TopBar>
        <van-form ref="">
          <div class="message">
            <span class="message-title">{{
              this.$t("pmt.wallet.FeedbackMessageStart")
            }}</span>
            <span
              class="message-key"
              v-text="
                ' ' +
                this.submitData.withdrawal_amount +
                ' ' +
                this.$t('pmt.unit')
              "
            ></span>
            <span class="message-title">{{
              this.$t("pmt.wallet.FeedbackMessageEnd")
            }}</span>
          </div>

          <div class="button">
            <van-button
              type="info"
              class="button-login"
              @click="onClickHistory"
              >{{ this.$t("pmt.wallet.buttonWithdrawalHistory") }}</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>

    <van-popup v-model="showInstruction">
      <div class="block">
        <TopBar
          :topBarTitle="this.$t('pmt.applyAbsence.Instruction')"
          :leftHtml="''"
          :rightHtml="''"
        ></TopBar>
        <div class="pmt-table">
          <table style="width: 100%">
            <thead>
              <tr>
                <th>
                  {{ this.$t("pmt.applyAbsence.ITEM") }}
                </th>
                <th>
                  {{ this.$t("pmt.applyAbsence.Description") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ this.$t("pmt.wallet.Balance") }}</td>
                <td >{{ this.$t("pmt.wallet.BalanceDescription") }}</td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.wallet.IncentiveResource") }}</td>
                <td>{{ this.$t("pmt.wallet.IncentiveResourceDescription") }}</td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.wallet.YesterdayIncome") }}</td>
                <td>{{ this.$t("pmt.wallet.YesterdayIncomeDescription") }}</td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.wallet.WithdrawalAmount") }}</td>
                <td>{{ this.$t("pmt.wallet.WithdrawalAmountDescription") }}</td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.wallet.History") }}</td>
                <td>{{ this.$t("pmt.wallet.HistoryDescription") }}</td>
              </tr>
              <tr>
                <td>{{ this.$t("pmt.wallet.AccumulatedTotal") }}</td>
                <td>{{ this.$t("pmt.wallet.AccumulatedTotalDescription") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { getpagelist } from "@/api/worlPlan";

import { getPmtSelectData, getGetPageSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";
import { postUserPermission, getUserinfoByToken } from "@/api/user";

import {
  getpsandspwalletincentivemodelandwithdrawalsettings,
  withdrawallogin,
  getpsandspwithdrawalrecommendedamount,
  psandspwithdrawal,
} from "@/api/wallet";
import { Toast } from "vant";
export default {
  name: "wallet",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.wallet.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: '<i class="van-icon van-icon-info-o"><!----></i>',

      forData: {
        new_balance: 0, //余额
        new_yesterday_income: 0, //昨日到账激励
        new_withdrawal_amount: 0, //已提取激励
        new_accumulated_total: 0, //总激励
        Id: "00000000-0000-0000-0000-000000000000",
        new_type: 0,
        new_task_frequency: 0, //大周期
        new_task_time: 0, //小周期
        new_min_withdrawal_amount: 0, //设置的最小提取金额
        new_max_withdrawal_amount: 0,
      },

      showVerify: false,
      passwordType: "password",

      userLoginData: {
        username: "",
        password: "",
      },

      showAccountType: false,
      WithdrawalOption: [],

      selectWithdrawal: "",

      showFinalConfirm: false,

      submitData: {
        withdrawal_channel: 0,
        e_wallet_phone_number: "",
        withdrawal_amount: 0,
        retail_model_ids: [],
      },

      showFeedback: false,

      showInstruction: false,
    };
  },
  created() {
    this.getSelectData();
    this.getData();
    this.getUserInfo();
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickLeft() {
      this.$router.go(-1);
    },
    topBarClickRight() {
      this.showInstruction = true;
    },
    formatterStr() {},
    getData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getpsandspwalletincentivemodelandwithdrawalsettings()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.handleHideLoading();
            this.forData = data;
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

    onButton_Withdrawal() {
      this.showVerify = true;
    },

    togglePwd() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    },

    getUserInfo() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getUserinfoByToken()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.handleHideLoading();
            const { user_info } = data.Items;

            this.userLoginData.username = user_info.username;
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
    onClickConfirmAccountType() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getpsandspwithdrawalrecommendedamount()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.handleHideLoading();
            this.showAccountType = false;
            this.showFinalConfirm = true;
            this.submitData.retail_model_ids = [];
            for (var key in data) {
              this.submitData.retail_model_ids.push(key);
              this.submitData.withdrawal_amount += parseInt(data[key]);
            }
            if (
              this.submitData.withdrawal_amount >
              this.forData.new_max_withdrawal_amount
            ) {
              this.submitData.withdrawal_amount =
                this.forData.new_max_withdrawal_amount;
            }
            this.submitData.withdrawal_channel = this.selectWithdrawal;
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {
          this.$toast.clear();
        });
    },
    onClickLogin() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        username: this.userLoginData.username,
        password: this.userLoginData.password,
      };
      withdrawallogin(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.handleHideLoading();
            this.showVerify = false;
            this.showAccountType = true;
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
    getSelectData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        type: "Withdrawal_Channel",
      };
      getGetPageSelectData(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            if (data.length > 0) {
              this.selectWithdrawal = data[0].EnumValue;
              // this.accountTypeData.withdrawal_channel = data[0].EnumValue;
            }
            data.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.Id = element.EnumValue;
              thiselement.text = element.Desction;
              this.WithdrawalOption.push(thiselement);
            });
            console.log(data);

            console.log(this.WithdrawalOption);
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {
          this.$toast.clear();
        });
    },
    onWithdrawalOption(item, index) {
      const id = item.Id,
        selectWorkPanListOption = this.selectWorkPanListOption;
      let arr = selectWorkPanListOption.filter((itm) => {
        return id === itm.value;
      });
      this.$set(this.formData.workPlanList[index], "name", arr[0].text);
    },
    onClickFinalConfirm() {
      console.log(this.submitData);
      this.$toast.loading({ duration: 0, forbidClick: true });
      psandspwithdrawal(this.submitData)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.handleHideLoading();
            this.showAccountType = false;
            this.showFeedback = true;
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {
          this.$toast.clear();
        });
    },
    onClickHistory() {
      this.$router.push({ name: "walletHostory" });
    },
    onClickDetail() {
      // console.log('onClickDetail')

      this.$router.push({ name: "walletDetail" });
    },
  },
};
</script>

<style lang="scss" scoped>
.wallet {
  padding-bottom: 20%;
  margin-top: 0.2rem;
  .wallet-top {
    text-align: center;
    background-color: white;
    .photo {
      padding: 0.5rem;
    }
    .Balance {
      font-size: 40px;
      font-weight: 600;
    }
    .BalanceDetail {
      padding-right: 0.2rem;
      font-size: 25px;
      font-weight: 400;
      background-color: white;
      margin: 12px;
      border-radius: 0.16rem;
      overflow: hidden;
    }
    .YesterdayIncome {
    }
  }
  .Notice {
    padding-left: 0.4rem;
    padding-top: 0.2rem;
    font-size: 30px;
    font-weight: 400;
  }
  .message {
    padding: 0.2rem 0.4rem;
    .message-title {
      font-size: 25px;
      font-weight: 400;
    }
    .message-key {
      color: red;
    }
  }
}
.item-arrow {
  vertical-align: middle;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}

.serial-number {
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;
  text-align: center;
  line-height: 0.5rem;
  background: #fff;
  font-size: 0.32rem;
  font-weight: bold;
  top: 0.15rem;
  left: 0.15rem;
  border: 1px solid #000;
}

.block {
  width: 8rem;
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
    .button-login {
      width: 100%;
    }
  }
  .AccountType {
    padding: 0.5rem;
    // margin: 0.5rem;
  }
}
.WithdrawalAmount {
  padding-right: 0.5rem;
}

.block {
  width: 8rem;
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
    .button-login {
      width: 100%;
    }
  }
  .AccountType {
    padding: 0.5rem;
    // margin: 0.5rem;
  }
}
</style>
<style>
</style>
