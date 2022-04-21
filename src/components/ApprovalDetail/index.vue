<template>
  <van-popup
    v-model="visible"
    position="right"
    :overlay="false"
    :style="{
      height: '100%',
      width: '100%',
    }"
  >
    <div class="approval-detail">
      <!-- TOP BAR -->
      <van-nav-bar
        left-arrow
        fixed
        @click-left="visible = false"
        :title="$t('shopApprove.ApproveDetail')"
      />
      <div class="approval-group">
        <div class="approval-group__header">
          {{ $t("shopApprove.ApprovalProcessBasicData") }}
        </div>
        <div class="approval-group__body">
          <van-cell-group size="small">
            <van-cell
              class="record-number"
              :title="$t('shopApprove.ProcessNumber')"
              :value="record.new_process_record"
              v-if="record.new_process_record"
            />
            <van-cell
              :title="$t('shopApprove.ShopName')"
              :value="record.new_name"
            />
            <van-cell
              :title="$t('shopApprove.ShopCode')"
              :value="record.new_code"
            />
            <van-cell
              :title="$t('shopApprove.CreatorName')"
              :value="record.new_creator"
            />
            <van-cell
              :title="$t('shopApprove.CreateDate')"
              :value="formatTableDate(record.new_create_time)"
            />
          </van-cell-group>
        </div>
      </div>
      <div class="approval-group">
        <div class="approval-group__header">
          {{ $t("shopApprove.ProcessApproveHistory") }}
        </div>
        <div class="approval-group__body">
          <van-steps
            direction="vertical"
            :active="active.value"
            :active-icon="active.icon"
            :active-color="active.color"
          >
            <van-step v-for="(item, index) in list" :key="index">
              <div class="approve-node">{{ item.approve_node }}</div>
              <h3 class="approve-name">{{ item.approver_name }}</h3>
              <div class="approve-status">
                <span v-if="item.new_approve_status == '3'">
                  {{ $t("shopApprove.PASS") }}
                </span>
                <span v-else-if="item.new_approve_status == '4'">
                  {{ $t("shopApprove.REJECT") }}
                </span>
                <span v-else>
                  {{ $t("shopApprove.WaitApproval") }}
                </span>
                <span v-if="item.new_approval_date">
                  ({{ formatTableDate(item.new_approval_date) }})
                </span>
              </div>
            </van-step>
          </van-steps>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { getApproveNodeHistory } from "@/api/shop";
import { formatTableDate } from "@/utils";
export default {
  name: "ApprovalDetail",
  data() {
    return {
      visible: false,
      record: {},
      list: [],
      active: {
        value: 0,
        icon: "warning",
        color: "#ff976a",
      },
    };
  },
  methods: {
    formatTableDate,
    // SHOW MODAL
    show(item) {
      this.visible = true;
      this.record = item;
      this.handleGetDetail(item);
    },
    // GET DETAIL
    handleGetDetail(record) {
      this.$toast.loading({ duration: 0 });
      this.list = [];
      getApproveNodeHistory(null, {
        new_business_primarykey: record.new_shop_id,
        new_flow_type: record.new_process_type,
        new_process_num: record.new_process_num
      })
        .then((res) => {
          this.$toast.clear();
          const { success, data } = res;
          if (success) {
            this.list = data;
            var status = 2;
            data.map((item, index) => {
              if (item.new_approve_status) {
                this.active.value = index;
                status = item.new_approve_status;
              }
            });
            // set current approval node
            switch (status) {
              case 3:
                this.active.icon = "checked";
                this.active.color = "#07c160";
                break;
              case 4:
                this.active.icon = "clear";
                this.active.color = "red";
                break;
              case 2:
                this.active.icon = "warning";
                this.active.color = "#ff976a";
                break;
            }
          }
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.approval-detail {
  min-height: 100%;
  background: #f2f2f2;
  padding: 108px 24px 24px 24px;
  .approval-group {
    overflow: hidden;
    margin-bottom: 12px;
    .approval-group__header {
      font-size: $font32;
      line-height: 80px;
      color: #999;
    }
    .approval-group__body {
      border-radius: 12px;
      overflow: hidden;
      .approve-node {
        margin-bottom: 6px;
        font-size: $font24;
      }
      .approve-name {
        font-size: $font28;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
<style lang="scss">
.record-number {
  .van-cell__title {
    flex: 1;
    white-space: nowrap;
  }
  .van-cell__value {
    flex: 2;
  }
}
</style>