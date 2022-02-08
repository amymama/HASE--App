<template>
  <div class="new-shop-list">
    <!-- TOP BAR -->
    <van-nav-bar
      left-arrow
      @click-left="goBack"
      title="Approve Shop List"
    />
    <div class="list-fliter">
      <van-search v-model="value" :placeholder="$t('shopHome.SearchShop')" />
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="queryParams.new_process_type"
          :options="option1"
          @change="changeStatus" />
        <van-dropdown-item
          v-model="queryParams.new_approve_status"
          :options="option2"
          @change="changeStatus" />
      </van-dropdown-menu>
    </div>
    <div class="shop-status-list">
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
        <div
          class="shop-status-item"
          v-for="(item, index) in list"
          :key="index">
          <div class="shop-status">
            <div class="shop-status-left draft" v-if="item.new_approve_status == 1">Draft</div>
            <div class="shop-status-left wait-approvel" v-if="item.new_approve_status == 2">Wait Approval</div>
            <div class="shop-status-left approved" v-if="item.new_approve_status == 3">Approved</div>
            <div class="shop-status-left reject" v-if="item.new_approve_status == 4">Reject</div>
            <div class="shop-code">{{ item.new_process_record }}</div>
          </div>
          <div class="shop-status-footer">
            <h2 class="shop-name">{{ item.new_shop_name }}</h2>
            <div class="shop-region-channel">
              <van-tag class="shop-tag" round plain type="primary">{{ item.new_branch_name }}</van-tag>
              <van-tag class="shop-tag" round plain type="primary">{{ item.new_channel_name }}</van-tag>
            </div>
            <p>{{ item.new_creator }} Create By {{ item.new_create_time }}</p>
            <div class="shop-actions">
              <div class="shop-action-item" v-if="!item.new_approve_status">
                <van-button
                  round
                  plain
                  size="mini"
                  type="info"
                  @click="$refs.approvalModal.show(1, item)"
                >
                  Pass
                </van-button>
              </div>
              <div class="shop-action-item" v-if="!item.new_approve_status">
                <van-button
                  round
                  plain
                  size="mini"
                  type="warning"
                  @click="$refs.approvalModal.show(0, item)">
                  Reject
                </van-button>
              </div>
              <div class="shop-action-item">
                <van-button
                  round
                  plain
                  size="mini"
                  type="info"
                  @click="handleGetDetail(item)"
                >
                  Shop Detail
                </van-button>
              </div>
              <div class="shop-action-item">
                <van-button
                  round
                  plain
                  size="mini"
                  type="warning"
                  @click="$refs.approvalDetail.show(item)">
                  Approval Detail
                </van-button>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- CHANNEL SELECT -->
    <search-history ref="searchHistory" searchType="shop" @ok="handleSearchOk"/>
    <!-- Approval Modal -->
    <approval-modal ref="approvalModal" @ok="handleOK" />
    <!-- APPROVAL DETAIL -->
    <approval-detail ref="approvalDetail" />
  </div>
</template>
<script>
import { getShopApproveList } from '@/api/shop'
import TabBar from '@/components/TabBar'
import ApprovalModal from '@/components/ApprovalModal'
import SearchHistory from '@/components/SearchHistory'
import ApprovalDetail from '@/components/ApprovalDetail'

export default {
  name: 'ApproveShop',
  components: {
    TabBar,
    ApprovalModal,
    SearchHistory,
    ApprovalDetail
  },
  data() {
    return {
      value: '',
      option1: [
        { text: this.$t('shopStatus.NewShop'), value: 1 },
        { text: this.$t('shopStatus.CloseShop'), value: 2 }
      ],
      option2: [
        { text: this.$t('shopCommon.All'), value: null },
        { text: this.$t('shopStatus.Draft'), value: '1' },
        { text: this.$t('shopStatus.WaitApproval'), value: '2' },
        { text: this.$t('shopStatus.Approved'), value: '3' },
        { text: this.$t('shopStatus.Reject'), value: '4' }
      ],
      // data list
      queryParams: {
        new_process_type: 1,
        new_approve_status: null
      },
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
    // new shop
    onClickRight () {
      this.$router.push({ name: 'NewShop' })
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
    // Go new shop detail
    handleGetDetail (item) {
      if (item.new_approve_status == 1 || item.new_approve_status == 4) {
        this.$router.push({
          name: 'NewShop',
          query: {
            shop_id: item.new_shopid
          }
        })
      } else {
        this.$router.push({
          name: 'ShopMasterData',
          query: {
            shop_id: item.new_shopid
          }
        })
      }
    },
    // PULL UP LOAD DATA
    onLoad() {
			setTimeout(() => {
        this.page_no ++
				getShopApproveList(Object.assign(this.queryParams, {
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
              console.log('nores')
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
    // Filter - Change data
    changeStatus () {
      this.initData()
    },
    // APPROVAL SUCCESS
    handleOK () {
      this.initData()
    }
  }
}
</script>
<style lang="scss" scoped>
.shop-status-list{
  padding: 24px;
}
.shop-status-item{
  margin-bottom: 32px;
  box-shadow: 0 5px 30px rgba($color: #000000, $alpha: .1);
  border-radius: 10px;
  overflow: hidden;
  .shop-status{
    display: flex;
    background: #F5F5F5;
    .shop-status-left{
      width: 160px;
      height: 40px;
      line-height: 40px;
      position: relative;
      background: #AAA;
      color: #FFF;
      text-align: center;
      margin-right: 50px;
      &::after{
        content: '';
        display: block;
        position: absolute;
        right: -39px;
        bottom: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 40px 0 0 40px;
        border-color: transparent transparent transparent #AAA;
      }
      &.draft{
        background: #AAA;
        &::after{
          border-color: transparent transparent transparent #AAA;
        }
      }
      &.wait-approvel{
        background: #ff976a;
        &::after{
          border-color: transparent transparent transparent #ff976a;
        }
      }
      &.approved{
        background: #07c160;
        &::after{
          border-color: transparent transparent transparent #07c160;
        }
      }
      &.reject{
        background: #ee0a24;
        &::after{
          border-color: transparent transparent transparent #ee0a24;
        }
      }
    }
    .shop-code{
      flex: 1;
      line-height: 40px;
      font-size: $font24;
      padding-left: 20px;
      color: #666;
    }
  }
  .shop-status-footer{
    background: #FFF;
    padding: 20px;
    h2{
      font-size: $font30;
      margin-bottom: 15px;
    }
    .shop-region-channel{
      font-size: 20px;
      .shop-tag{
        margin-right: 12px;
        margin-bottom: 12px;
      }
    }
    p{
      line-height: 150%;
      font-size: $font24;
      color: #999;
    }
  }
  .shop-actions{
    display: flex;
    margin-top: 12px;
    justify-content: flex-end;
    .shop-action-item{
      margin-left: 12px;
      button{
        padding: 0 24px;
      }
    }
  }
}
</style>