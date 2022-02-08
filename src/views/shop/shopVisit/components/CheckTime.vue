<template>
  <div class="checktime">
    <van-popup
      v-model="visible"
      round
      position="bottom">
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
import moment from 'moment'
export default {
  name: 'CheckTime',
  data() {
    return {
      visible: false,
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  methods: {
    moment,
    // show modal
    show () {
      this.visible = true
    },
    // check time
    onConfirmDate(date) {
      let checkDate = this.moment(date).format('YYYY-MM-DD')
      this.$emit('ok', checkDate)
      this.visible = false
    },
    onCancelDate() {
      this.visible = false
    }
  }
}
</script>