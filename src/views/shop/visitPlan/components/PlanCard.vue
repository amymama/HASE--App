<template>
  <div class="plan-item" @click="routeTo('plan')">
    <van-row class="plan-item-header" type="flex" align="center">
      <van-col span="8">
        <div class="plan-item-header_left" :class="getClass.class">
          {{ getClass.mainInfo }}
        </div>
      </van-col>
      <van-col span="16" class="plan-item-header_right">
        <a href="javascript:void(0)">
          <span class="title">{{ $t("shopVisitPlan.PlanRecord") }}:</span>
          <span class="info">{{ detail.visit_plan_number }}</span>
        </a>
      </van-col>
    </van-row>
    <div class="plan-item-body">
      <van-row style="margin-bottom: 10px">
        <van-col>
          <p>
            <span class="plan-item-body_label"
              >{{ $t("shopVisitPlan.PlanDate") }}:</span
            >
            <span class="plan-item-body_value">{{
              detail.new_plan_date || DEFAULT
            }}</span>
          </p>
          <p>
            <span class="plan-item-body_label"
              >{{ $t("shopVisitPlan.PlanPerson") }}:</span
            >
            <span class="plan-item-body_value"
              >{{ detail.submit_user || DEFAULT }} ({{
                detail.user_role || DEFAULT
              }})</span
            >
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
          <!--  <p>
            <span class="plan-item-body_label">{{
              $t("shopFA.ShopAddress")
            }}</span>
            <span class="plan-item-body_value">{{ detail.shop_code }}</span>
          </p> -->
        </van-col>
      </van-row>
      <van-row>
        <van-col>
          <span class="plan-item-body_label">{{ $t("shopFA.Channel") }}:</span>
          <span class="plan-item-body_value">{{ detail.channel_name }}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col>
          <span class="plan-item-body_label"
            >{{ $t("shopPromotion.SubmitDate") }}:</span
          >
          <span class="plan-item-body_value">
            {{ detail.new_create_time || "null" }}
          </span>
        </van-col>
      </van-row>
      <van-row :gutter="12" style="margin-top: 10px">
        <!-- <van-col :span="12">
          <van-button
            size="small"
            style="width: 100%"
            round
            icon="eye-o"
            color="#40a9ff"
            plain
            type="primary"
            @click="routeTo('plan')"
          >
            {{ $t("shopVisitPlan.PlanDetail") }}</van-button
          >
        </van-col> -->
        <van-col :span="24" v-if="detail.new_approve_status > 1">
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
            {{ $t("shopVisitPlan.ApproveDetail") }}</van-button
          >
          <!--  <div class="plan-item-body_tag" @click="routeTo('approve')">
            {{ $t("shopVisitPlan.ApproveDetail") }}
          </div> -->
        </van-col>
      </van-row>
    </div>
    <!-- <div class="plan-item-header">
          <div class="plan-item-header_left"></div>
          <div class="plan-item-header_right">
            <span>FA Code</span>
          </div>
        </div>
        <div class="plan-item-body"></div> -->
  </div>
</template>

<script>
import bus from "@/utils/busEvent";
const DEFAULT = "Null";
const STATUS_COLOR = [
  {
    mainInfo: "PD",
    subInfo: "Plan Draft",
    class: "color-default",
    background: "transparent",
    color: "#4761d5",
    value: 1,
  },
  {
    mainInfo: "IP",
    subInfo: "In Progress",
    class: "color-476dd5",
    background: "#476dd5",
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
      inspectStatus: [],
    };
  },
  mounted() {
    bus.$on("inspectStatus", (status) => {
      this.inspectStatus = status;
    });
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
    /**
     * @param {string} type 可选值 plan approve 表示当前跳转页面
     */
    routeTo(type) {
      this.$emit("routeTo", type); // 当用户查看详情时将跳转事件派发给父组件，防止ApproveDetail多次声明
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
    &_left,
    &_right {
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
    }
    &_right {
      background-color: #fff;
      .title,
      .info {
        font-weight: bold;
        color: #4671d5;
      }
      .info {
        text-indent: 10px;
      }
    }
  }
  &-body {
    position: relative;
    padding: 5px 10px 15px 10px;
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
    .btn-detail {
      position: absolute;
      right: 30px;
      bottom: 5px;
      text-align: right;
      a {
        color: #fff;
      }
    }
  }
}
</style>