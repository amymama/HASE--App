<template>
  <van-popup :value="value" position="right" style="width: 100%; height: 100%">
    <van-nav-bar
      :title="$t('ShopClass.ProductCategory')"
      left-arrow
      @click-left="closePopup"
    ></van-nav-bar>
    <van-row class="select-container">
      <van-col :span="isSelected ? 12 : 24" class="select-item">
        <van-cell
          clickable
          v-for="category in categoryList"
          :key="category.new_product_category_id"
          :title="category.new_name_en"
          is-link
          @click="handleSelect(category, 0)"
          :class="{
            'cell-select': select1st === category.new_product_category_id,
          }"
        >
          <div slot="icon" class="cate-icon">
            <img
              v-if="category.new_icon"
              :src="category.new_icon"
              :alt="category.new_name_en"
            />
          </div>
        </van-cell>
      </van-col>
      <van-col v-if="isSelected" :span="12" class="select-item">
        <van-cell
          v-for="subCategory in select[0].children"
          :key="subCategory.new_product_category_id"
          clickable
          :title="subCategory.new_name_en"
          :class="{
            'cell-select': select2nd === subCategory.new_product_category_id,
          }"
          @click="handleSelect(subCategory, 1)"
        ></van-cell>
      </van-col>
    </van-row>
  </van-popup>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    categoryList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      select: [],
    };
  },
  watch: {
    select(selected) {
      const { length } = selected;
      if (length === 2) {
        this.$emit("input", false);
        this.$emit("select", selected);
      }
    },
  },
  computed: {
    // 当前是否已选中
    isSelected() {
      return this.select.length > 0;
    },
    select1st() {
      return this.select[0] && this.select[0].new_product_category_id;
    },
    select2nd() {
      return this.select[1] && this.select[1].new_product_category_id;
    },
  },
  methods: {
    closePopup() {
      if (this.select.length === 1) this.select.splice(0);
      this.$emit("input", false);
    },
    /**
     * @param {object} category 当前点击的category对象
     * @param {index} index 对应的当前操作的列表层级，第一层级为0，第二层级为1
     */
    handleSelect(category, index) {
      if (index === 0) {
        const existFlag = !!category.children.find(
          (item) => item.new_product_category_id === "All"
        );
        !existFlag &&
          category.children.unshift({
            new_product_category_id: "All",
            new_name_en: "All",
          });
        this.select.splice(1);
      }
      this.select.splice(index, 1, category);
    },
  },
};
</script>

<style lang="scss" scoped>
.cell-select {
  background-color: #f2f3f5;
}
.cate-icon {
  width: 50px;
  height: 50px;
  img {
    width: 100%;
  }
}
.select-container {
  position: relative;
  height: calc(100% - 95px);
  .select-item {
    transition: all 300ms ease;
  }
  .select-item:nth-child(1) {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    overflow-y: auto;
    box-shadow: 10px 0 10px rgb(0 0 0 / 30%);
  }
  .select-item:nth-child(2) {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>