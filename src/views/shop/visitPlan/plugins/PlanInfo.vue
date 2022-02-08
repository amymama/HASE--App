<template>
  <!-- 弹框输入数字 -->
  <van-popup v-model="visible" position="right" class="info-container">
    <van-nav-bar
      title="Plan Info"
      left-arrow
      @click-left="closePopup"
    ></van-nav-bar>
    <div class="info-common">
      <van-cell-group :title="i18n.t('shopFA.ShopInfo')">
        <van-cell :title="i18n.t('shopFA.ShopName')" :value="shop.shopname" />
        <van-cell :title="i18n.t('shopFA.ShopCode')" :value="shop.shopcode" />
        <van-cell :title="i18n.t('shopPosm.Region')" :value="shop.region" />
        <van-cell :title="i18n.t('shopFA.Area')" :value="shop.branch" />
        <van-cell :title="i18n.t('shopFA.Province')" :value="shop.province" />
        <van-cell :title="i18n.t('shopFA.District')" :value="shop.district" />
        <van-cell :title="i18n.t('shopVisitPlan.Employee')" value="内容" />
      </van-cell-group>
    </div>
    <div v-if="planList.length" class="info-common">
      <van-cell-group
        :title="plan.plan_code"
        v-for="plan in planList"
        :key="plan.new_shopvisit_planId"
      >
        <!-- <div class="info-common_title">
          {{ i18n.t("shopVisitPlan.PlanRecord") }}: {{ plan.plan_code }}
        </div> -->
        <van-cell
          :title="i18n.t('shopVisitPlan.CreatorName')"
          :value="plan.createname"
        />
        <van-cell
          :title="i18n.t('shopVisitPlan.PlanDate')"
          :value="plan.new_plan_date"
        />
        <van-cell
          :title="i18n.t('shopVisitPlan.ProcessStatus')"
          :value="tableBtnTitle(plan)"
        />
        <van-cell
          :title="i18n.t('shopVisitPlan.VisitStatus')"
          :value="+plan.new_visit_status ? 'Visited' : 'Not Visit'"
        />
      </van-cell-group>
    </div>
    <van-empty v-else description="No Plan"></van-empty>
  </van-popup>
</template>

<script>
import { i18n } from "@/languages";
const actionList = [
  {
    mainInfo: "PD",
    subInfo: "Plan Draft",
    class: "action-btn_draft",
    value: 1,
    span: 4,
  },
  {
    mainInfo: "IP",
    subInfo: "In Progress",
    class: "action-btn_primary",
    value: 2,
    span: 4,
  },
  {
    mainInfo: "PA",
    subInfo: "Plan Approved",
    class: "action-btn_approved",
    value: 3,
    span: 5,
  },
  {
    mainInfo: "PR",
    subInfo: "Plan Rejected",
    class: "action-btn_rejected",
    value: 4,
    span: 5,
  },
  {
    mainInfo: "PC",
    subInfo: "Plan Cancelled",
    class: "action-btn_cs",
    value: 5,
    span: 6,
  },
];
export default {
  data() {
    return {
      i18n,
      actionList,
      promise: null,
      resolve: null,
      reject: null,
      visible: false,
      shop: {}, // 当前店铺信息对象
      planList: [], // 店铺计划数组
    };
  },
  computed: {
    tableBtnTitle() {
      return (opt = {}) => {
        const actionValue = +opt.new_approve_status;
        const action = this.actionList.find(
          (item) => item.value === actionValue
        );
        return action && `${action.mainInfo}(${action.subInfo})`;
      };
    },
  },
  methods: {
    init(opt) {
      for (let key in opt) {
        this[key] = opt[key];
      }
    },
    showDialog() {
      this.visible = true;
      return (this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      }));
    },
    closePopup() {
      this.visible = false;
      this.resolve();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/asset_variable.scss";
.info-container {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
}
.info-common {
  border-radius: 5px;
}
</style>