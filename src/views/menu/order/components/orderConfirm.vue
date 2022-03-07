<template>
  <div class="zsoDetailBox">
    <van-popup
      v-model="orderConfirmShow"
      :close-on-click-overlay="false"
      :style="{
        width: '100%',
        height: '100%',
      }"
    >
      <!-- navBar -->
      <van-nav-bar
        left-arrow
        @click-left="onCancel"
        :title="$t('Order Confirm')"
      />
      <van-cell-group>
        <!-- required -->
        <van-field
          v-model="username"
          clearable
          label="Order Type"
          placeholder=""
          @click-right-icon="$toast('question')"
        />
        <van-field v-model="username" clearable placeholder="" label="Dealer" />
        <van-field
          v-model="username"
          clearable
          placeholder=""
          label="Current AR Balance"
        />
        <van-field
          v-model="username"
          clearable
          placeholder=""
          label="Bill To"
        />
        <van-field
          v-model="username"
          clearable
          placeholder=""
          label="Payer"
        />
        <van-field v-model="username" clearable placeholder="" label="Payer" />
        <van-field
          v-model="username"
          clearable
          placeholder=""
          label="Select Delivery Address"
        />
        <van-field
          v-model="username"
          clearable
          placeholder=""
          label="Company Name text"
        />
        <van-field
          v-model="username"
          clearable
          placeholder=""
          label="Select Delivery Address"
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderConfirmShow: false,
      username:'lll'
    };
  },
  methods: {
    onCancel() {
      this.orderConfirmShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>