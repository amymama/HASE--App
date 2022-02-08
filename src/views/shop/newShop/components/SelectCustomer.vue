<template>
  <div class="select customer">
    <van-popup
      v-model="visible"
      position="right"
      :style="{
        height: '100%',
        width: '100%'
      }"
    >
      <van-nav-bar
        title="Select Customer"
        left-arrow
        @click-left="visible = false"
        @click-right="$refs.filterCustomer.show()"
      >
        <template #right>
          <van-icon
            name="filter-o"
            class="right-icon-filter"/>
        </template>
      </van-nav-bar>
      <div class="customer-list">
        <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
        <van-list
          v-else
          v-model="loading"
          :finished="finished"
          :finished-text="$t('shopCommon.NoMoreData')"
          @load="onLoad"
          :error.sync="error"
          :error-text="$t('shopCommon.RequestErrorText')"
        >
          <van-radio-group v-model="selectUser">
            <van-cell-group>
              <!-- item begin-->
              <van-cell
                v-for="(item, index) in list"
                :key="index"
                :title="item.new_code + '_' + item.new_mdm_accountgroup"
                :label="item.new_name"
                clickable>
                <template #right-icon>
                  <van-radio :name="item.new_code" />
                </template>
              </van-cell>
              <!-- item end -->
            </van-cell-group>
          </van-radio-group>
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
    <filter-customer ref="filterCustomer" @ok="handleOK" />
  </div>
</template>
<script>
import FilterCustomer from './FilterCustomer'
import { getCustomerList } from '@/api/shop'

export default {
  name: 'SelectCustomer',
  components: {
    FilterCustomer
  },
  data() {
    return {
      visible: false,
      selectUser: '',
      // data list
      queryParams: {},
      list: [],
      // load more data
      page_no: 0,
      page_size: 20,
			loading: false,
      finished: false,
      noRes: false,
      error: false
    }
  },
  methods: {
    // Show Modal
    show() {
      this.visible = true
    },
    // Init Data
    initData() {
      this.list = []
      this.page_no = 0
      this.loading = true
      this.finished = false
      this.noRes = false
      this.error = false
      this.onLoad()
    },
    // PULL UP LOAD DATA
    onLoad() {
			setTimeout(() => {
        this.page_no ++
				getCustomerList(Object.assign(this.queryParams, {
          itemsperpage: this.page_size,
          page: this.page_no
				})).then((res) => {
          const { success, data } = res
					if (success) {
            var Items = data.Items || []
            this.loading = false
            this.list = this.list.concat(Items)
						if(this.list.length === 0) {
							this.noRes = true
            }
						if (Items.length < this.page_size) {
							this.finished = true
						}
					}
				}).catch(() => {
          this.page_no = 0
          this.loading = false
          this.error = true
        })
			}, 100)
    },
    // select costomer success
    handleOK (query) {
      this.queryParams = query
      this.initData()
    },
    // Select ok
    onSubmit() {
      if (this.selectUser) {
        var new_customerid = ''
        var new_mdm_accountgroup = ''
        this.list.map((item) => {
          if (item.new_code === this.selectUser) {
            new_customerid = item.new_customerid
            new_mdm_accountgroup = item.new_mdm_accountgroup
          }
        })
        this.$emit('selectCustomerOk', this.selectUser, new_customerid, new_mdm_accountgroup)
      }
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.right-icon-filter{
  font-size: $font32;
}
.customer-list{
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