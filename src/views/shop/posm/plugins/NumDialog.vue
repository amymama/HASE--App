<template>
  <!-- 弹框输入数字 -->
  <van-dialog
    v-model="visible"
    :title="title"
    confirmButtonText="Confirm"
    cancelButtonText="Cancel"
    show-cancel-button
    :before-close="beforeClose"
    confirmButtonColor="#40a9ff"
  >
    <div style="text-align: center; margin: 20px">
      <van-field
        v-model="num"
        :placeholder="i18n.t('select.InputNumber')"
        type="number"
        required
        @focus="handleFocus"
        :error-message="error"
      ></van-field>
    </div>
    <div style="text-align: center; margin: 20px" v-if="forecast">
      <van-field
        v-model="date"
        placeholder="Please Select Date"
        required
        readonly
        @click.native="dateFocus"
        :error-message="dateError"
      ></van-field>
      <van-popup
        get-container="#app"
        v-model="dateVisible"
        position="bottom"
        round
      >
        <van-datetime-picker
          :value="new Date()"
          type="date"
          :min-date="new Date(Date.now() + 24 * 60 * 60 * 1000)"
          title="Please Select Date"
          @confirm="dateConfirm"
          @cancel="dateVisible = false"
        />
      </van-popup>
      <p class="reminder">
        {{i18n.t('shopPosm.ForecastReminder')}}
      </p>
    </div>
  </van-dialog>
</template>

<script>
import moment from "moment";
import { i18n } from "@/languages";
export default {
  data() {
    return {
      i18n,
      max: Number.MAX_SAFE_INTEGER, // 接受
      min: Number.MIN_SAFE_INTEGER, // 接受
      promise: null,
      resolve: null,
      reject: null,
      date: null,
      forecast: false, // 针对Forecast增加时间选择
      visible: false,
      dateVisible: false,
      num: "",
      error: "",
      dateError: "",
      title: i18n.t("select.InputNumber"),
    };
  },
  methods: {
    init(opt) {
      for (let key in opt) {
        this[key] = opt[key];
      }
    },
    clearNum() {
      this.num = "";
      this.error = "";
      this.date = "";
      this.dateError = "";
      this.forecast = false;
      this.title = i18n.t("select.InputNumber");
    },
    showDialog() {
      this.visible = true;
      return (this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      }));
    },
    handleFocus() {
      this.error = "";
    },
    dateFocus() {
      this.dateVisible = true;
    },
    dateConfirm(value) {
      this.date = moment(value).format("YYYY-MM-DD");
      this.dateVisible = false;
    },
    beforeClose(action, done) {
      if (action === "cancel") {
        this.clearNum();
        this.reject();
        done();
      } else {
        const NUM_SUCCESS = this.num >= this.min && this.num <= this.max;
        const DATE_SUCCESS = this.date;
        const NUM_MAX_ERR = this.num.length && this.num > this.max;
        const NUM_MIN_ERR = this.num.length && this.num < this.min;
        if (this.forecast) {
          if (NUM_SUCCESS && DATE_SUCCESS) {
            this.resolve({ num: this.num, date: this.date });
            this.clearNum();
            done();
          } else {
            if (!DATE_SUCCESS) {
              this.dateError = "Please Select Date";
            }
            if (NUM_MAX_ERR) {
              this.error = "Over maximum input";
            } else if (NUM_MIN_ERR) {
              this.error = "Over minimum input";
            } else {
              this.error = i18n.t("select.InputNumber");
            }
            done(false);
          }
        } else {
          if (NUM_SUCCESS) {
            this.resolve({ num: this.num, date: this.date });
            this.clearNum();
            done();
          } else {
            if (NUM_MAX_ERR) {
              this.error = "Over maximum input";
            } else if (NUM_MIN_ERR) {
              this.error = "Over minimum input";
            } else {
              this.error = i18n.t("select.InputNumber");
            }
            done(false);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reminder {
  line-height: 30px;
  margin: 20px;
  color: #e47171;
  text-align: left;
  font-size: 0.3rem;
}
</style>