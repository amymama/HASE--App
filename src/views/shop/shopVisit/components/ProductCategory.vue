<template>
  <div class="product-visit-categorys">
    <div class="product-visit-category-item"
      v-for="(item, index) in list"
      :key="index"
      :class="{ 'category-active': activeIndex == index }"
      @click="handleClick(index, item)">
      <img :src="item.new_icon"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProductCategory',
  props: {
    list: {
      type: Array,
      default:() => [],
      require: true
    }
  },
  data () {
    return {
      activeIndex: 0,
    }
  },
  methods: {
    handleClick (index) {
      this.activeIndex = index
      this.$emit('changeCategroy', index)
    }
  }
}
</script>
<style lang="scss" scoped>
  .product-visit-categorys{
    background: #F5F5F5;
    display: flex;
    padding:5px 24px 24px 24px;
    justify-content: space-between;
    .product-visit-category-item{
      background: #FFF;
      text-align: center;
      box-sizing: border-box;
      margin: 0 12px;
      max-width: 64px;
      &.category-active{
        position: relative;
        box-shadow: 0 2px 30px rgba($color: #000000, $alpha: .2);
        &::after{
          position: absolute;
          content: '';
          width: 100%;
          height: 2PX;
          bottom: -16px;
          left: 0;
          background: #169bd5;
        }
      }
      img{
        max-width: 48px;
        height: auto;
      }
    }
  }
</style>