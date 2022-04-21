<template>
  <van-row type="flex" justify="center" :gutter="12" class="action-container">
    <van-col
      class="action-item"
      v-for="item in list"
      :key="item.value"
      :span="item.span"
    >
      <van-button
        size="mini"
        @click="checkAction(item)"
        class="action-btn"
        :class="item.class"
      >
        <span>{{ item.subInfo }}</span>
        <div v-show="select.includes(item.value)" class="checked"></div>
      </van-button>
    </van-col>
  </van-row>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      select: [],
    };
  },
  methods: {
    checkAction(action) {
      const index = this.select.findIndex((value) => value === action.value);
      index > -1
        ? this.select.splice(index, 1)
        : this.select.push(action.value);
      this.$emit("checkAction", this.select);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/asset_variable.scss";
.action-container {
  margin-bottom: 10px;
  .action-item {
    text-align: center;
  }
}
.action-btn {
  position: relative;
  text-align: center;
  color: #fff;
}
.checked {
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffbf40;
}
</style>