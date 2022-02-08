<template>
  <van-popup
    v-model="visible"
    position="right"
    :style="{ height: '100%', width: '100%' }"
  >
    <van-nav-bar
      title="Filter Shop"
      left-arrow
      @click-left="visible = false"
    />
    <div class="filter-customer">
      <van-form @submit="onSubmit">
        <van-field
          v-model="queryParams.new_name"
          label="Name"
          placeholder="Please input customer name"
        />
        <van-field
          v-model="queryParams.new_code"
          label="Code"
          placeholder="Please input customer code"
        />
        <div style="margin: 16px;">
          <van-button
            round block
            type="info"
            native-type="submit">
            {{ $t('shopCommon.Submit') }}
          </van-button>
        </div>
      </van-form>
    </div>
  </van-popup>
</template>
<script>
export default {
  name: 'FilterCustomer',
  data() {
    return {
      visible: false,
      queryParams: {
        new_name: '',
        new_code: ''
      }
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    // Change Password
    onSubmit() {
      this.$emit('ok', this.queryParams)
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.right-icon-filter{
  font-size: $font32;
}
</style>