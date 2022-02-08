<template>
  <van-dialog
    v-model="visible"
    :title="title"
    show-cancel-button
    @confirm="handleSubmit">
    <van-form
      ref="formData"
      alidate-first
      @submit="submit">
      <van-field
        v-model="form.approveSuggestion"
        rows="2"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="remark"
        show-word-limit
      />
    </van-form>
  </van-dialog>
</template>
<script>
import { postApproveFlow, postRejectFlow } from '@/api/shop'

export default {
  name: 'ApprovalModal',
  data() {
    return {
      visible: false,
      title: '',
      form: {
        approveRecordId: '',
        approveSuggestion: ''
      },
      type: ''
    }
  },
  methods: {
    // show model
    show (type, record) {
      this.visible = true
      this.type = type
      this.form.approveRecordId = record.new_approve_recordid
      // 0-reject 1-pass
      switch (type) {
        case 0:
          this.title = this.$t('shopApprove.REJECT')
          console.log(this.title)
          break
        case 1:
          this.title = this.$t('shopApprove.PASS')
      }
    },
    handleSubmit () {
      this.$refs.formData.submit()
    },
    // submit
    submit() {
      // 0-reject 1-pass
      switch (this.type) {
        case 0:
          this.handleReject()
          break
        case 1:
          this.handlePass()
      }
    },
    // pass
    handlePass () {
      this.$toast.loading({ duration: 0, forbidClick: true })
      postApproveFlow(null, this.form).then((res) => {
        const { success, message } = res
        if (success) {
          this.$toast.success('Approval success')
          this.$emit('ok')
        } else {
          this.$toast.fail(message)
        }
      }).catch(() => {
        this.$toast.fail('Network error')
      })
    },
    // reject
    handleReject () {
      this.$toast.loading({ duration: 0, forbidClick: true })
      postRejectFlow(null, this.form).then((res) => {
        const { success, message } = res
        if (success) {
          this.$toast.success('Reject success')
          this.$emit('ok')
        } else {
          this.$toast.fail(message)
        }
      }).catch(() => {
        this.$toast.fail('Network error')
      })
    }
  }
}
</script>