<template>
  <van-popup
    v-model="visible"
    position="right"
    style="width: 100%; height: 100%"
  >
    <van-nav-bar
      :title="$t('shopVisitPlan.ApproveDetail')"
      left-arrow
      @click-left="closePopup"
    ></van-nav-bar>
    <div class="approval-detail">
      <div class="approval-group">
        <div class="approval-group__header">
          {{ $t("shopVisitPlan.ProcessBasicData") }}
        </div>
        <div class="approval-group__body">
          <van-cell-group size="small">
            <van-cell
              :title="`${$t('shopVisitPlan.VisitPlanNumber')}: ${
                basicData.visit_plan_number
              }`"
            ></van-cell>
            <van-cell
              :title="$t('shopFA.ShopCode')"
              :value="basicData.shop_code"
            ></van-cell>
            <van-cell
              :title="$t('shopFA.ShopName')"
              :value="basicData.shop_name"
            ></van-cell>
            <van-cell
              :title="$t('shopVisitPlan.PlanDate')"
              :value="basicData.new_plan_date"
            ></van-cell>
            <van-cell
              :title="$t('shopVisitPlan.CreatorCode')"
              :value="basicData.employee_code"
            ></van-cell>
            <van-cell
              :title="$t('shopVisitPlan.CreatorName')"
              :value="basicData.submit_user"
            ></van-cell>
            <van-cell
              :title="$t('shopVisitPlan.CreatorRole')"
              :value="basicData.user_role"
            ></van-cell>
            <van-cell
              :title="$t('shopPosm.CreateDate')"
              :value="formatTableDate(basicData.new_create_time)"
            ></van-cell>
          </van-cell-group>
        </div>
      </div>
      <div class="approval-group">
        <div class="approval-group__header">
          {{ $t("shopVisitPlan.ProcessApproveHistory") }}
        </div>
        <div class="approval-group__body">
          <van-steps
            direction="vertical"
            :active="active.value"
            :active-icon="active.icon"
            :active-color="active.color"
          >
            <van-step v-for="(item, index) in historyList" :key="index">
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
      <!-- <van-cell-group :title="$t('shopVisitPlan.ProcessApproveHistory')">
        <ApproveTable :list="historyList" v-if="historyList.length" />
        <van-empty v-else></van-empty>
      </van-cell-group> -->
    </div>
  </van-popup>
</template>

<script>
import ApproveTable from "./ApproveTable";
import { postApprovalHistory } from "@/api/visitPlan";
import { v4 as uuidV4 } from "uuid";
import { formatTableDate } from "@/utils";
export default {
  components: {
    ApproveTable,
  },
  data() {
    return {
      visible: false,
      basicData: {},
      historyList: [],
      active: {
        value: 0,
        icon: "warning",
        color: "#ff976a",
      },
    };
  },
  methods: {
    formatTableDate,
    show(approval) {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      this.visible = true;
      console.log(approval);
      this.basicData = approval;
      postApprovalHistory({
        new_business_primarykey: this.basicData.new_shopvisit_planId,
      })
        .then((res) => {
          toast.clear();
          const { success, data } = res;
          this.loading = false;
          if (success) {
            data.forEach((item, index) => {
              item.id = uuidV4();
              if (item.new_approve_status) {
                this.active.value = index;
                status = item.new_approve_status;
              }
            });
            switch (+status) {
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
            this.historyList = data;
          }
        })
        .catch((err) => {
          toast.clear();
        });
    },
    closePopup() {
      this.visible = false;
      this.historyList.splice(0);
    },
  },
};
</script>

<style lang="scss" scoped>
.approval-detail {
  min-height: 100%;
  background: #f2f2f2;
  padding: 0 24px 24px 24px;
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