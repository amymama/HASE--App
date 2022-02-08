<template>
  <div class="aqua-filter-mouth">
    <div class="current-mouth">
      <van-cell
        @click="visible = true"
        icon="clock-o"
        :title="currentMonth"
        is-link />
    </div>
    <van-popup position="bottom" v-model="visible">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="slect month"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmDate"
        @cancel="visible = false"
      />
    </van-popup>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'AquaClass',
  data() {
    return {
      visible: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      currentMonth: ''
    }
  },
  created () {
    this.currentDate = new Date(this.moment().subtract(1, 'months').format('YYYY-MM'))
    this.getFilterData()
  },
  methods: {
    moment,
    getFilterData() {
      this.currentMonth = this.moment(this.currentDate).format('YYYY-MM')
      this.$emit('ok', this.currentMonth.split('-'))
    },
    onConfirmDate () {
      this.getFilterData()
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.aqua-filter-mouth{
  background: #FFF;
  border-bottom: 2PX solid #EEE;
  .current-mouth-box{
    background: #FFF;
    padding: 24px;
  }
}
</style>