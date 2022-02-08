<template>
  <div class="model-record" v-if="filterItem(record)">
    <div class="model-item"
      :class="{
        active:
          activeModel.new_model_id == record.new_model_id &&
          record.new_quantity > 0,
        count: record.new_quantity > 0,
        listed: record.new_mdm_delisted == 0,
        delisted: record.new_mdm_delisted == 1,
      }"
      @click="handleClick"
    >
      <div class="model-name">{{ record.new_model_name }}</div>
      <div class="model-type"
        v-if="record.new_model_type_name"
        :class="{
          cr: record.new_model_type_filter == '1',
          cb: record.new_model_type_filter == '2',
          cl: record.new_model_type_filter == '3',
        }">
        {{ record.new_model_type_name }}
      </div>
      <div class="van-badge model-num" v-if="record.new_quantity > 0">
        {{ record.new_quantity }}
      </div>
      <div class="c-badge model-h" v-if="record.new_mdm_position == '01'">
        <img src="@/assets/images/shop/badge/h.png" />
      </div>
    </div>
    <div
      class="record-oos"
      @click="handleChangeC(record, 'oos')"
      :class="{ isoos: record.new_model_oos == 1 }">
      OOS
    </div>
    <div
      class="record-pop"
      @click="handleChangeC(record, 'pop')"
      :class="{ ispop: record.new_model_pop == 1 }">
      POP
    </div>
    <div class="record-count">
      <van-stepper
        v-model="record.new_quantity"
        theme="round"
        button-size="20px"
        min="0"
        max="999"
        :integer="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelItem",
  props: {
    record: {
      type: Object,
      require: true,
    },
    activeModel: {
      type: Object,
      require: true,
    },
    modelFilter: {
      type: Object,
      require: true,
    },
    isSMDisplayed: {
      type: Boolean,
      default: false
    },
    isOMDisplayed: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("modelSelected");
    },
    // 选择OOS POP
    handleChangeC(record, type) {
      if (type == 'oos') {
        record.new_model_oos = record.new_model_oos ? 0  : 1
      } else if(type == 'pop') {
        record.new_model_pop = record.new_model_pop ? 0  : 1
      }
    },
    // 参数过滤
    filterItem(record) {
      const {
        keyword,
        new_mdm_delisted,
        new_model_type_filter,
        new_mdm_brand_name,
        new_product_category,
        isoos,
        ispop,
      } = this.modelFilter;
      let pass = true;
      if (keyword && record.new_model_name.indexOf(keyword.toUpperCase()) == -1) {
        pass = false;
      }
      if (new_model_type_filter && new_model_type_filter != record.new_model_type_filter) {
        pass = false;
      }
      if (new_mdm_delisted && new_mdm_delisted != record.new_mdm_delisted) {
        pass = false;
      }
      if (new_mdm_brand_name && new_mdm_brand_name != record.new_mdm_brand_name) {
        pass = false;
      }
      if (new_product_category && new_product_category != record.new_product_category) {
        pass = false;
      }
      if (isoos && isoos != record.new_model_oos) {
        pass = false;
      }
      if (ispop && ispop != record.new_model_pop) {
        pass = false;
      }
      if (this.isSMDisplayed && record.new_quantity == 0 && record.new_model_type == '1') {
        pass = false
      }
      if (this.isOMDisplayed && record.new_quantity == 0 && record.new_model_type == '2') {
        pass = false
      }
      return pass;
    },
  },
};
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
  margin: 0 5px;
}
.isoos, .ispop{
  background: #1976d2;
  border: 1PX solid #0866be;
  color: #FFF;
}
.record-count{
  margin-left: 5px;
}
.model-item {
  background: #f2f2f2;
  width: 260px;
  height: 64px;
  padding: 0 18px;
  line-height: 32px;
  border: 1PX solid #e2e2e2;
  border-radius: 8px;
  margin: 15px 5px;
  font-size: 22px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.count {
    background: #1976d2;
    border: 1PX solid #1976d2;
    color: #fff;
  }
  &.active {
    background: #024f97;
    border: 1PX solid #0866be;
    color: #fff;
  }
  &.delisted {
    border: 1PX solid red;
  }
  .c-badge {
    width: 24px;
    height: 24px;
    position: absolute;
    z-index: 1;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .model-type{
    color: #FFF;
    height: 18px;
    font-size: 18px;
  }
  .model-name{
    white-space: nowrap;
  }
  .model-num {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    z-index: 2;
  }
  .model-h {
    left: 0;
    bottom: 0;
  }
  .model-type {
    padding: 0 5px;
    z-index: 1;
    width: auto;
    line-height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    font-size: 18px;
    white-space: nowrap;
    &.cr{
      color:red;
    }
    &.cb{
      color: #6fb5f7;
    }
    &.cl{
      color: #AAA;
    }
  }
}
</style>