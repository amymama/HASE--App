<template>
<div class="model-record">
  <div class="model-item"
    :class="{
      'count': record.new_quantity > 0,
      'listed': record.new_mdm_delisted == 0,
      'delisted': record.new_mdm_delisted == 1,
    }">
    <div class="van-badge model-num" v-if="record.new_quantity > 0">
      {{ record.new_quantity }}
    </div>
    <div class="c-badge model-h" v-if="record.new_mdm_position == '01'">
      <img src="@/assets/images/shop/badge/h.png">
    </div>
    {{ record.new_model_name }}
  </div>
  <div
      class="record-oos"
      :class="{ isoos: record.new_model_oos == 1 }">
      OOS
    </div>
    <div
      class="record-pop"
      :class="{ ispop: record.new_model_pop == 1 }">
      POP
    </div>
</div>
</template>

<script>

export default {
  name: 'ModelItem',
  props: {
    record: {
      type: Object,
      require: true
    },
    activeModel: {
      type: Object,
      require: true
    },
    modelStatus: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .model-record{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .record-oos, .record-pop{
    background: #f2f2f2;
    height: 64px;
    line-height: 64px;
    border: 1PX solid #e2e2e2;
    border-radius: 8px;
    padding: 0 18px;
    font-size: 20px;
    margin: 0 12px;
  }
  .isoos, .ispop{
    background: #1976d2;
    border: 1PX solid #0866be;
    color: #FFF;
  }
  .model-item{
    background: #f2f2f2;
    flex: 1;
    height: 64px;
    padding: 0 18px;
    line-height: 32px;
    border: 1PX solid #e2e2e2;
    border-radius: 8px;
    margin: 15px 32px 15px 0;
    font-size: 22px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.count{
      background: #1976d2;
      border: 1PX solid #1976d2;
      color: #FFF;
    }
    &.active{
      background: #024f97;
      border: 1PX solid #0866be;
      color: #FFF;
    }
    &.delisted{
      border: 1PX solid red;
    }
    .c-badge{
      width: 24px;
      height: 24px;
      position: absolute;
      z-index: 1;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .model-num{
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      z-index: 2;
    }
    .model-h{
      left: 0;
      bottom: 0;
    }
    .model-s{
      width: 50px;
      height: 20px;
      line-height: 20px;
      right: 0;
      bottom: 0;
      text-align: center;
      background: #1381e8;
      color: #FFF;
      border-radius: 5px;
      font-size: 18px;
    }
  }
</style>