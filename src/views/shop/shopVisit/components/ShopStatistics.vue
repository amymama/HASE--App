<template>
  <div class="shop-statistics">
    <div class="shop-statistics-item">
      <span class="statistics-num color-danger">
        {{ record.new_target_quantity || 0 }}
      </span>
      <span class="statistics-title">Target<br />QTY</span>
    </div>
    <div class="shop-statistics-item">
      <span class="statistics-num color-danger">
        {{ record.new_actual_quantity || 0 }}
      </span>
      <span class="statistics-title">Actual<br />QTY</span>
    </div>
    <div class="shop-statistics-item">
      <span class="statistics-num color-danger">
        {{ record.new_gap_quantity || 0 }}
      </span>
      <span class="statistics-title">GAP<br />QTY</span>
    </div>
    <div class="shop-statistics-item">
      <span class="statistics-num color-danger">
        {{ record.new_total_quantity || 0 }}
      </span>
      <span class="statistics-title">Total<br />QTY</span>
    </div>
    <div class="shop-statistics-item">
      <span class="statistics-num color-danger">
        {{ record.new_oos_quantity || 0 }}
      </span>
      <span class="statistics-title">OOS</span>
    </div>
    <div class="shop-statistics-item">
      <span class="statistics-num">
        {{ new_max_display_quantity || 0 }}
      </span>
      <span class="statistics-title">MAX<br />Display</span>
    </div>
    <div class="shop-statistics-item">
      <span class="statistics-num color-danger">
        {{ new_ood_quantity || 0 }}
      </span>
      <span class="statistics-title">OOD</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShopStatistics",
  props: {
    record: {
      type: Object,
      require: true,
    },
    new_max_display_quantity: {
      type: Number,
      default: 0,
    },
    new_ood_quantity: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    handleClick(index) {
      this.activeIndex = index;
      this.$emit("changeCategroy", index);
    },
  },
};
</script>
<style lang="scss" scoped>
// shop-statistics
.shop-statistics {
  display: flex;
  background: #fff;
  .shop-statistics-item {
    height: 100%;
    padding: 12px 0;
    flex: 1;
    text-align: center;
    overflow: hidden;
    border: 1px solid #fff;
    box-sizing: border-box;
    margin-left: -1px;
    justify-content: center;
    align-items: center;
    span {
      display: block;
    }
    .statistics-desc {
      font-size: 20px;
      color: #fff;
      margin-bottom: 8px;
    }
    .statistics-num {
      font-weight: bold;
      font-size: 36px;
    }
    .statistics-title {
      font-size: 18px;
      white-space: nowrap;
      color: #999;
    }
    &.statistics-text {
      background: #169bd5;
    }
  }
}
</style>