<template>
  <van-popup
    v-model="visible"
    position="right"
    :style="{ height: '100%', width: '100%' }"
  >
    <van-nav-bar
      title="Change Password"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="password"
        label-width="3.4rem"
        type="password"
        label="Old Password"
        placeholder="Please input old password"
        :rules="[{ required: true, message: 'Please input old password' }]"
      />
      <van-field
        v-model="newPassword"
        label-width="3.4rem"
        type="password"
        label="New Password"
        placeholder="Please input new password"
        :rules="[
          { required: true, message: 'Please input new password' },
          { pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()。【】，_+`\-={}: |、（）《》——：:\'<>?？,.\/]).{10,20}$/, message: 'The password must contain at least one alphanumeric special character of 10 characters' }
        ]"
      />
      <van-field
        v-model="newPasswordConfirm"
        label-width="3.4rem"
        type="password"
        label="Confirm Password"
        placeholder="Please confirm old password"
        :rules="[
          { required: true, message: 'Please confirm new password' },
          { pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()。【】，_+`\-={}: |、（）《》——：:\'<>?？,.\/]).{10,20}$/, message: 'The password must contain at least one alphanumeric special character of 10 characters' }
        ]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          :loading="submitLoading"
          color="linear-gradient(to right, #528de4, #2058AB)"
          native-type="submit">
          {{ $t('shopCommon.Save') }}
        </van-button>
      </div>
    </van-form>
  </van-popup>
</template>
<script>
import { postChangePwdByOld } from '@/api/user'

export default {
  name: 'ChangePassword',
  data() {
    return {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
      token: '',
      visible: false,
      submitLoading: false
    }
  },
  methods: {
    // show
    show(token) {
      this.visible = true
      if (token) {
        this.token = token
      }
    },
    onClickLeft() {
      this.visible = false
    },
    // Change Password
    onSubmit() {
      const headers = this.token ? { Authorization: `Bearer ${this.token}` } : null
      // password validation
      if (this.newPassword != this.newPasswordConfirm) {
        this.$toast('Two passwords are different')
        return false
      }
      // submit
      this.submitLoading = true
      postChangePwdByOld({
        psw1: this.newPassword.trim(),
        psw2: this.newPassword.trim(),
        oldpsw: this.password.trim()
      }, headers).then((res) => {
        this.submitLoading = false
        const { success, message } = res
        if (success) {
          this.$toast.success('Modification succeeded, please login again');
          setTimeout(() => {
            this.$store.dispatch('user/Logout').then(() => {
              this.siginOutLoading = false
              window.location.reload()
            })
          }, 500)
        } else {
          this.$toast.fail(message)
        }
      }).catch(() => {
        this.submitLoading = false
        this.$toast('Network error')
      })
    }
  }
}
</script>