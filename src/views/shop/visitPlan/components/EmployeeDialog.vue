<template>
  <!-- 弹框输入数字 -->
  <van-dialog
    :value="value"
    :title="$t('shopVisitPlan.Employee')"
    confirmButtonText="Confirm"
    cancelButtonText="Cancel"
    show-cancel-button
    :before-close="beforeClose"
    confirmButtonColor="#40a9ff"
  >
    <div style="text-align: center; margin: 20px">
      <van-field
        v-model="employee"
        :placeholder="$t('shopVisitPlan.Employee')"
        required
        @focus="handleFocus"
        :error-message="error"
      ></van-field>
    </div>
  </van-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      employee: "",
      error: "",
    };
  },
  methods: {
    clearInput() {
      this.employee = "";
      this.error = "";
    },
    handleFocus() {
      this.error = "";
    },
    beforeClose(action, done) {
      if (action === "cancel") {
        this.clearInput();
        this.$emit("input", false);
        done();
      } else {
        if (this.employee) {
          this.$emit("ok", this.employee);
          this.clearInput();
          done();
          this.$emit("input", false);
          return;
        }
        this.error = this.$t("shopVisitPlan.Employee");
        done(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>