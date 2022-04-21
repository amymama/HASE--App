<template>
  <div style="display: inline-block; text-align: center" v-clickOut="showInput">
    <div
      class="num-container_show"
      v-if="totalVisible && numVisible"
      @touchstart="showNum"
    >
      <van-icon class="num-common" name="cross"></van-icon>
      <span class="num-common">{{ value }}</span>
    </div>
    <div class="num-container" v-else>
      <div class="num-minus" @touchstart="compute('minus')">
        <van-icon name="minus"></van-icon>
      </div>
      <div class="num-info" @touchstart="inputNum">
        <span>{{ value }}</span>
      </div>
      <div class="num-plus" @touchstart="compute('plus')">
        <van-icon name="plus"></van-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    totalVisible: {
      // 总数预览
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      numVisible: true,
    };
  },
  methods: {
    /**
     * @param {string} type plus/minus
     */
    compute(type) {
      let num = this.value;
      type === "plus" ? num++ : num--;
      this.$emit("input", num);
    },
    inputNum() {
      this.$inputNumber()
        .then(({ num }) => this.$emit("input", +num))
        .catch(() => {});
    },
    showInput() {
      this.numVisible = true;
    },
    showNum() {
      this.numVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$border-color: #333;
.num-container,
.num-container_show {
  //   border: 1px solid $border-color;
  box-shadow: 0 0 10px 0 rgba($color: #222428, $alpha: 0.3);
  background: #fff;
  border-radius: 10px;
}
.num-common {
  vertical-align: middle;
}
.num-container {
  width: 300px;
  display: flex;
  overflow: hidden;

  .num-plus,
  .num-minus,
  .num-info {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .num-plus,
  .num-minus {
    flex-grow: 1;
  }
  /* .num-plus:active {
    background: #f00;
  } */
  .num-info {
    width: 100px;
    max-width: 100px;
    overflow: hidden;
    // border-left: 1px solid $border-color;
    // border-right: 1px solid $border-color;
  }
}
.num-container_show {
  display: inline-block;
  min-width: 50px;
  padding: 0 10px;
  height: 50px;
  line-height: 50px;
}
</style>