<template>
  <div class="flex-layout shop-visit visit-step-home">
    <div class="flex_layout__header">
      <!-- TOP BAR -->
      <van-nav-bar
        left-arrow
        @click-left="goBack"
        title="New Shop Visit "
        right-text=" My Visits"
        @click-right="onClickRight"
      />
      <!-- SHOP HEADER -->
      <shop-header :shopInfo="query"/>
    </div>
    <div class="flex-layout__body page-content">
      <div class="shop-visit-steps">
        <div class="step-content">
          <!-- STEP ITEM BEGIN-->
          <div class="step-item" v-for="(item, index) in list" :key="index">
            <div class="step-item-header">
              <div class="step-num">
                STEP
                <span>{{ item.new_step }}</span>
              </div>
              <div class="step-info">
                <h2 class="step-title">
                  {{ $t('lang') == 'en-US' ? item.new_name : item.new_name_local }}
                </h2>
                <p class="step-desc">
                  {{ $t('lang') == 'en-US' ? item.new_description : item.new_description_local }}
                </p>
              </div>
              <div
                @click.stop="handleGoVisit(item)"
                class="step-status"
                :class="
                  item.new_stepstatus.new_visit_status == 0 ? 'step-status-submited' :
                  item.new_stepstatus.new_visit_status == 1 ? 'step-status-disable' :
                  item.new_stepstatus.new_visit_status == 2 ? 'step-status-draft' :
                  item.new_stepstatus.new_visit_status == 3 ? 'step-status-notstart' : ''
                ">
                  {{ item.new_stepstatus.new_visit_status_text }}
                  <van-icon name="arrow" />
              </div>
            </div>
            <div class="step-item-footer">
              <div v-if="item.new_otherlatest">
                <p>Latest:{{ item.new_otherlatest.username }}{{ item.new_otherlatest.userroles }}</p>
                <p>{{ item.new_otherlatest.stepname }}</p>
              </div>
              <div style="color: #999" v-else>
                Have not any submitted recorded
              </div>
            </div>
          </div>
          <!-- STEP ITEM END -->
        </div>
      </div>
    </div>
    <div class="flex-layout__footer" v-if="canSubmit">
      <van-button
        square
        block
        color="#2058AB"
        :loading="submitLoading"
        @click="handleSubmit()">
        {{ $t('shopCommon.Submit') }}
      </van-button>
    </div>
  </div>
</template>

<script>
import _throttle from "lodash.throttle"
import ShopHeader from './components/ShopHeader'
import {
  getVisitStepBySelf,
  getVisitTotalBySelf,
  postStartShopVisitTotal,
  postSubmitShopVisitTotal,
  postCopyVisitStep
} from '@/api/shopVisit'

export default {
  name: 'ShopVisit',
  components: {
    ShopHeader
  },
  data() {
    return {
      new_visit_total_id: '',
      query: {},
      list: [],
      canSubmit: false,
      submitLoading: false
    }
  },
  created () {
    this.query = this.$route.query
    if (this.query.new_visit_totalid) {
      this.new_visit_total_id = this.query.new_visit_totalid
      this.handleGetSteps()
    } else {
      this.handleGetVisitTotal()
    }
  },
  methods: {
    // Visit History
    onClickRight () {
      this.handleGoVisitHistory()
    },
    // GET VISIT TOTAL
    handleGetVisitTotal () {
      this.$toast.loading({ duration: 0 })
      getVisitTotalBySelf({
        new_shop_id: this.query.new_shopid
      }).then((res) => {
        const { success, data } = res
        if (success) {
          if (data.Items) {
            this.new_visit_total_id = data.Items
          }
          this.handleGetSteps()
        }
      })
    },
    // GO TO VISIT HISTORY
    handleGoVisitHistory () {
      this.$router.push({
        name: 'MyVisitHistory'
      })
    },
    // Get step list
    handleGetSteps () {
      getVisitStepBySelf({
        new_shop_id: this.query.new_shopid,
        new_visit_total_id: this.new_visit_total_id
      }).then((res) => {
        const { success, data } = res
        if (success) {
          this.$toast.clear()
          this.list = data
          this.canSubmit = true
          this.list.map((item) => {
            if (item.new_stepstatus.new_visit_status != 0) {
              this.canSubmit = false
            }
          })
        }
      })
    },
    // Visit record step
    handleGoVisit: _throttle(function (record) {
      if (record.new_otherlatest && !record.new_stepstatus.new_step_id) {
        this.$dialog.confirm({
          title: 'Tip',
          message: this.$t('shopVisit.VistStartTip'),
          cancelButtonText: this.$t('shopVisit.CopyLatestData'),
          confirmButtonText: this.$t('shopVisit.NewBlankData')
        })
        .then(() => {
          this.handleNewData(record)
        })
        .catch(() => {
          this.handleCopyData(record)
        })
      } else {
        this.handleNewData(record)
      }
    }, 1500, {
      leading: true,
      trailing: false
    }),
    // NEW BLANK DATA
    handleNewData (record) {
      this.$toast.loading({ duration: 0, forbidClick: true })
      if (this.new_visit_total_id) {
        this.$toast.clear()
        this.$router.push({
          name: `ShopVisitStep${record.new_step}`,
          query: Object.assign(this.query, {
            new_visit_totalid: this.new_visit_total_id,
            new_step_id: record.new_stepstatus.new_step_id || ''
          })
        })
      } else {
        const {
          new_shopid,
          new_customer_id,
          new_customer_code,
          new_shop_class,
          new_shop_status,
          new_code,
        } = this.query
        postStartShopVisitTotal({
          new_shop_id: new_shopid,
          new_customer_id: new_customer_id,
          new_shop_class: new_shop_class,
          new_shop_status: new_shop_status,
          new_visit_total_id: '',
          new_shop_code: new_code,
          new_customer_code: new_customer_code
        }).then((res) => {
          const { success, data } = res
          if (success) {
            this.$toast.clear()
            var id = data.Items
            this.$router.push({
              name: `ShopVisitStep${record.new_step}`,
              query: Object.assign(this.query, {
                new_visit_totalid: id
              })
            })
          }
        }).catch(() => {
          this.$toast.clear()
        })
      }
    },
    handleCopyData (record) {
      const {
        new_shopid,
        new_shop_class,
      } = this.query
      this.$toast.loading({ duration: 0, forbidClick: true })
      postCopyVisitStep({
        new_step: record.new_step,
        new_visit_step_id: record.new_otherlatest.stepid,
        new_visit_total_id: record.new_otherlatest.new_visit_total_id,
        new_shop_id: new_shopid,
        new_shop_class: new_shop_class || '',
        new_visit_nowtotal_id: this.new_visit_total_id
      }).then((res) => {
        const { success, data } = res
        if (success) {
          this.$toast.success('Copy success')
          this.handleGetVisitTotal()
        } else {
          this.$toast.fail('Copy fail')
        }
      }).catch(() => {
        this.$toast.fail('Network error')
      })
    },
    // SUBMIT DATA
    handleSubmit () {
      this.$toast.loading({ duration: 0, forbidClick: true })
      this.submitLoading = true
      postSubmitShopVisitTotal({
        new_visit_total_id: this.new_visit_total_id,
        new_shop_class: this.query.new_shop_class || ''
      }).then((res) => {
        this.submitLoading = false
        const { success, message } = res
        if (success) {
          this.$toast.success('Submit success')
          this.canSubmit = false
        } else {
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.shop-visit{
  .shop-visit-steps{
    .step-content{
      padding: 24px;
      padding-left: 64px;
      box-sizing: border-box;
      .step-item{
        margin-bottom: 32px;
        .step-item-header{
          display: flex;
          background: #169bd5;
          height: 120px;
          align-items: center;
          border-radius: 24px;
          color: #FFF;
          .step-num{
            background: #027db4;
            border-radius: 50%;
            font-size: 20px;
            width: 60px;
            height: 60px;
            line-height: 30px;
            padding: 10px;
            text-align: center;
            color: #FFF;
            border: 5px solid #FFF;
            margin-left: -40px;
            span{
              display: block;
              font-size: $font32;
            }
          }
          .step-info{
            flex: 1;
            box-sizing: border-box;
            padding: 0 12px;
            .step-title{
              font-size: $font28;
              margin-bottom: 10px;
            }
            .step-desc{
              font-size: 20px;
            }
          }
          .step-status{
            width: 120px;
            height: 120px;
            text-align: center;
            font-size: $font24;
            line-height: 120px;
            color: #FFF;
            border-radius: 24px;
            box-shadow:0 2px 24px rgba($color: #000000, $alpha: .1);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .step-status-submited {
            background: #2fb2da;
          }
          .step-status-disable{
            background: #5c7a81;
          }
          .step-status-draft{
            background: #24c02c;
          }
          .step-status-notstart{
            background: #db1849;
          }
        }
        .step-item-footer{
          box-sizing: border-box;
          width: 94%;
          margin-left: 3%;
          line-height: 40px;
          background: #FFF;
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 22px;
          overflow: hidden;
          span{
            color: #169bd5;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>