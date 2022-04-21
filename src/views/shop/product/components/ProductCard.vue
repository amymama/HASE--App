<template>
  <div class="product">
    <van-card
      :title="detail.product_code"
      @click="
        $router.push({
          name: 'ProductDetail',
          query: { id: detail.new_modelId, model: detail.model_name },
        })
      "
    >
      <van-image
        width="100%"
        height="100%"
        slot="thumb"
        fit="cover"
        src=""
      ></van-image>
      <p slot="desc">{{ detail.new_material_description }}</p>
      <div slot="price">
        <p>{{ detail.model_code }}</p>
        <van-tag :type="tagType" v-if="detail.new_model_type">{{
          detail.modelName
        }}</van-tag>
      </div>
      <div slot="num">
        <p class="price-num">{{ detail.new_mrp_pmt || "null" }}</p>
        <p class="price-title">MRP(VND)</p>
      </div>
    </van-card>
    <div class="product-tag" v-if="detail.product_position">
      <div class="product-tag_triangle" :class="`product-tag_${level}`"></div>
      <p class="product-tag_text">{{ level }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
    levelList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    level() {
      let level = this.levelList.find(
        (item) => item.value === this.detail.product_position
      );
      return level && level.text.substring(0, 1);
    },
    tagType() {
      switch (+this.detail.new_model_type) {
        case 1:
          return "primary";
        case 2:
          return "success";
        case 3:
          return "warning";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  position: relative;
  margin-bottom: 30px;
  &-tag {
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    &_triangle {
      border: 30px solid;
      transform: rotate(135deg) translate(-40px, 1px);
    }
    &_text {
      position: absolute;
      right: 3px;
      top: 3px;
      color: #fff;
      font-weight: bold;
    }
    &_H {
      border-color: transparent #476dd5 transparent transparent;
    }
    &_M {
      border-color: transparent #36da82 transparent transparent;
    }
    &_L {
      border-color: transparent #ff4940 transparent transparent;
    }
  }
  .price-num {
    color: #e47171;
    text-align: center;
  }
  .price-title {
    font-weight: bold;
  }
}
</style>
<style lang="scss">
.product .van-card {
  border-radius: 10px;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.2);
}
</style>