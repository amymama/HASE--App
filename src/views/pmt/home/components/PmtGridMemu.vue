<template>
  <div class="memuGrid">
    <van-grid :column-num="columnNumber" :gutter="10">
      <van-grid-item
        class="pmt_guid"
        v-for="(item, index) in memuGridDataSource"
        :key="index"
        :icon="item.icon"
        :text="item.text"
        :to="{ name: item.toUrl, query: item.params }"
        v-action:[item.permission]
      />
    </van-grid>
  </div>
</template>
<script>
export default {
  name: "PmtGridMemu",
  props: {
    templateStyle: String,
    memuGridDataSource: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => [],
    },
    columnNumber: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {};
  },
  methods: {
    //导航栏左侧点击
    onClickLeft() {
      this.$emit("set_onClickLeft");
    },
    //导航栏右侧点击
    onClickRight() {
      this.$emit("set_onClickRight");
    },
  },
};
</script>


<style>
.memuGrid {
  padding-top: 5px;
  margin-bottom: 15%;
}

.pmt_guid .van-grid-item__content {
  color: #00aeef;
  font-size: 24px;
  text-align: center;
  /* background-color: #00aeef; */
}

.pmt_guid .van-grid-item__content .van-grid-item__text {
  /* color: #fff; */
  font-size: 24px;
  text-align: center;
  /* background-color: #00aeef; */
}
</style>
