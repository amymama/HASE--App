<template>
  <div class="checktime">
    <van-popup :value="value" position="bottom" @click-overlay="onCancelDate">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="Select date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmDate"
        @cancel="onCancelDate"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "CheckTime",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    minDate: {
      type: Date,
      default: () => new Date(),
    },
    maxDate: {
      type: Date,
      default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  },
  data() {
    return {
      show: true,
      currentDate: new Date(),
    };
  },
  methods: {
    moment,
    // 显示日期
    handleShow() {
      this.$emit("input", this.value);
    },
    // 选择日期
    onConfirmDate(date) {
      let checkDate = this.moment(date).format("YYYY-MM-DD"); // 当前选择日期
      this.$emit("ok", checkDate);
      this.showDate = false;
      this.$emit("input", false);
    },
    onCancelDate() {
      this.$emit("input", false);
    },
  },
};
</script>