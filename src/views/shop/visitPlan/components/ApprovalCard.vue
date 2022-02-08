<template>
  <div
    class="plan-item clearfix"
    @click="
      $router.push({
        name: 'visitPlanDetail',
        query: {
          code: detail.shop_code,
          createTime: detail.new_plan_date,
          createname: detail.submit_user,
          createRole: detail.user_roleids,
        },
      })
    "
  >
    <van-row class="plan-item-header" type="flex" align="center">
      <van-col v-if="detail.new_approve_status" span="8">
        <div class="plan-item-header_left" :class="getClass.class">
          {{ getClass.mainInfo }}
        </div>
      </van-col>
      <van-col
        :span="detail.new_approve_status ? 16 : 24"
        class="plan-item-header_right"
      >
        <p class="word-limit-row_1">
          <a href="javascript:void(0)">
            <span class="title">{{ $t("shopVisitPlan.PlanRecord") }}:</span>
            <span class="info">{{ detail.plan_record }}</span>
          </a>
        </p>
      </van-col>
    </van-row>
    <div class="plan-item-body">
      <van-row class="plan-item-body_info">
        <van-col>
          <p>
            <!-- 要显示角色 -->
            <span class="plan-item-body_label"
              >{{ $t("shopVisitPlan.PlanDate") }}:</span
            >
            <span class="plan-item-body_value">{{
              moment(new Date(detail.new_plan_date)).format("YYYY-MM-DD")
            }}</span>
          </p>
          <p>
            <!-- 要显示角色 -->
            <span class="plan-item-body_label"
              >{{ $t("shopVisitPlan.PlanPerson") }}:</span
            >
            <span class="plan-item-body_value">
              <span>{{ detail.user_role }}</span>
              <span> {{ detail.submit_user }} </span>
            </span>
          </p>
          <p>
            <!-- 要显示角色 -->
            <span class="plan-item-body_label">{{
              $t("shopFA.ShopCode")
            }}</span>
            <span class="plan-item-body_value">{{ detail.shop_code }}</span>
          </p>
          <p>
            <span class="plan-item-body_label">{{
              $t("shopFA.ShopName")
            }}</span>
            <span class="plan-item-body_value">{{ detail.shop_name }}</span>
          </p>
          <p>
            <span class="plan-item-body_label"
              >{{ $t("shopFA.ShopAddress") }}:</span
            >
            <span class="plan-item-body_value">{{
              `${detail.region_name}/${detail.area_name}/${detail.province_name}/${detail.district_name}` ||
              "Null"
            }}</span>
          </p>
          <p>
            <span class="plan-item-body_label"
              >{{ $t("shopVisitPlan.ShopChannel") }}:</span
            >
            <span class="plan-item-body_value">{{
              detail.channel_name || "Null"
            }}</span>
          </p>
        </van-col>
        <!-- <van-col :span="8" style="padding: 10px">
          <div class="plan-item-body_tag" @click="routeTo('approve')">
            {{ $t("shopVisitPlan.ApproveDetail") }}
          </div>
        </van-col> -->
      </van-row>
      <van-row class="plan-item-body_date">
        <van-col>
          <span class="plan-item-body_label"
            >{{ $t("shopPromotion.SubmitDate") }}:</span
          >
          <span class="plan-item-body_value">
            <span> {{ formatTableDate(detail.new_create_time) }}</span>
          </span>
        </van-col>
      </van-row>
      <van-row v-if="!detail.new_approve_status" :gutter="24" type="flex">
        <van-col :span="7">
          <van-button
            size="small"
            style="width: 100%"
            color="#36d982"
            type="primary"
            round
            @click.stop="handleAction(0)"
            v-action:ApprovePlan:pass
            >{{ $t("shopVisitPlan.Pass") }}</van-button
          >
        </van-col>
        <van-col :span="6">
          <van-button
            size="small"
            style="width: 100%"
            color="#ff4940"
            type="primary"
            round
            @click.stop="handleAction(1)"
            v-action:ApprovePlan:reject
            >{{ $t("shopVisitPlan.Reject") }}</van-button
          >
        </van-col>
        <van-col :span="11">
          <van-button
            size="small"
            style="width: 100%"
            round
            icon="eye-o"
            color="#40a9ff"
            plain
            type="primary"
            @click.stop="routeTo('approve')"
          >
            {{ $t("shopApprove.ApproveDetail") }}</van-button
          >
        </van-col>
      </van-row>
      <van-button
        v-else
        class="approve-detail"
        size="small"
        round
        icon="eye-o"
        color="#40a9ff"
        plain
        type="primary"
        @click.stop="routeTo('approve')"
      >
        {{ $t("shopApprove.ApproveDetail") }}</van-button
      >
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { formatTableDate } from "@/utils";
const DEFAULT = "Null";
const STATUS_COLOR = [
  {
    mainInfo: "PD",
    subInfo: "Plan Draft",
    class: "color-476dd5",
    background: "#476dd5",
    color: "#4761d5",
    value: 1,
  },
  {
    mainInfo: "IP",
    subInfo: "In Progress",
    class: "color-40a9ff",
    background: "#40a9ff",
    color: "#fff",
    value: 2,
  },
  {
    mainInfo: "PA",
    subInfo: "Plan Approved",
    class: "color-36d982",
    background: "#36d982",
    color: "#fff",
    value: 3,
  },
  {
    mainInfo: "PR",
    subInfo: "Plan Rejected",
    class: "color-ff4940",
    background: "#ff4940",
    color: "#fff",
    value: 4,
  },
  {
    mainInfo: "PC",
    subInfo: "Plan Cancelled",
    class: "color-a65900",
    background: "#a65900",
    color: "#fff",
    value: 5,
  },
];
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      DEFAULT,
    };
  },
  computed: {
    getClass() {
      const status = this.detail.new_approve_status;
      switch (+status) {
        case 1:
        case 2:
        case 3:
        case 4:
          return STATUS_COLOR[status - 1];
        default:
          return STATUS_COLOR[0];
      }
    },
  },
  methods: {
    formatTableDate,
    moment,
    /**
     * @param {string} type 可选值 plan approve 表示当前跳转页面
     */
    routeTo(type) {
      this.$emit("routeTo", type); // 当用户查看详情时将跳转事件派发给父组件，防止ApproveDetail多次声明
    },
    /**
     * @param {number} type 0 pass 1 reject
     */
    handleAction(type) {
      this.$inputText({
        title: "Approve Reason",
        placeholder: "Please Input Reason",
        required: false,
      })
        .then((reason) => {
          this.$emit("action", { type, reason });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/asset_variable.scss";
.plan-item {
  // height: 300px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.2);
  background-image: linear-gradient(131deg, #4094df 0%, #81cde8 100%);
  overflow: hidden;
  &-header {
    position: relative;
    height: 50px;
    // padding: 10px;
    background-color: #fff;
    &_right,
    &_left {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 5px;
    }
    &_left {
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      font-weight: bold;
      width: 150px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        right: -50px;
        bottom: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 50px 0 0 50px;
        // border-color: transparent transparent transparent transparent;
      }
      p {
        font-size: 16px;
        text-align: center;
      }
    }
    &_right {
      background-color: #fff;
      .title,
      .info {
        font-weight: bold;
        color: #4671d5;
      }
      .title {
        margin-right: 5px;
      }
      .info {
        text-indent: 10px;
      }
    }
  }
  &-body {
    position: relative;
    padding: 5px 10px 15px 10px;
    .approve-detail {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
    &_info {
      margin-bottom: 10px;
      p {
        padding-bottom: 5px;
      }
    }
    &_date {
      margin-bottom: 10px;
    }
    &_label,
    &_value {
      color: #fff;
    }
    &_label {
      font-weight: bold;
    }
    &_value {
      padding-left: 10px;
    }
    &_single {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &_tag {
      padding: 10px;
      margin-bottom: 10px;
      background: #ffbf40;
      color: #fff;
      font-weight: bold;
      border-radius: 35px;
      text-align: center;
    }
    .action-detail {
      margin-top: 10px;
      text-align: right;
    }
  }
}
</style>