<template>
  <div class="select-productcates">
    <van-popup
      v-model="visible"
      position="right"
      :style="{
        height: '100%',
        width: '100%'
      }"
    >
      <van-nav-bar
        title="Select Product Category"
        left-arrow
        @click-left="visible = false"
      />
      <div class="modal-list">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :error.sync="error"
          error-text="The request failed, click to reload"
        >
          <van-checkbox-group v-model="selectProductCates">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in productCategorys"
                clickable
                :key="index"
                :title="item.new_name_en"
                @click="toggle(index)"
              >
                <template #right-icon>
                  <van-checkbox
                    shape="square"
                    :name="item.new_product_categoryid"
                    ref="checkboxes" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-list>
      </div>
      <div class="action-footer">
        <van-button
          block
          type="info"
          @click="onSubmit">
          OK
        </van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getEntityConditions } from '@/api/common'

export default {
  name: 'SelectProduct',
  data() {
    return {
      visible: false,
      productCategorys: [],
      selectProductCates: [],
      // data load status
      loading: false,
      finished: false,
      error: false
    }
  },
  methods: {
    // Show Modal
    show(values) {
      this.visible = true
      this.selectProductCates = values
    },
    // Toggle Checkbox
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    // load data
    onLoad() {
			setTimeout(() => {
        getEntityConditions({
          entityName: 'new_product_category',
          fields: 'new_product_categoryid,new_code,new_name_en,new_parentid,new_mdm_del_flag',
          wheres: {
            new_parentid: 'is null',
            new_mdm_del_flag: '0',
            new_status: '0'
          }
        }).then((res) => {
          const { data, success } = res
          if (success) {
            this.productCategorys = data
            this.loading = false
            this.finished = true
          } 
        }).catch(() => {
          this.loading = false
          this.error = true
        })
			}, 100)
    },
    // Select ok
    onSubmit() {
      // product values
      var productValues = []
      this.productCategorys.map((item) => {
        if (this.selectProductCates.indexOf(item.new_product_categoryid) != -1) {
          productValues.push(item.new_name_en)
        }
      })
      this.$emit('selectProductOk', this.selectProductCates, productValues.join('/'))
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-list{
  height: calc(100% - 220px);
  overflow-y: scroll;
}
.action-footer{
  padding: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -2px 20px rgba($color: #000000, $alpha: .1);
  border-top: 1PX solid #E2E2E2;
}
</style>