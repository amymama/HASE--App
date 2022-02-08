<template>
  <div>
    <van-nav-bar
      class="plan-nav"
      :title="title"
      left-arrow
      fixed
      @click-left="clickLeft"
    >
      <template #right v-if="planMenu.length">
        <van-icon
          v-if="isPlanList"
          name="bars"
          size="18"
          @click="menuVisible = true"
        />
        <slot name="right" />
      </template>
    </van-nav-bar>
    <van-action-sheet
      v-model="menuVisible"
      :actions="planMenu"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      menuVisible: false,
      routeList: [
        {
          name: this.$t("shopVisitPlan.NewUpdatePlan"),
          value: "visitPlanUpdate", // value为路由的name值
          permission: "NewPlan:Add",
          visible: true,
        },
        {
          name: this.$t("shopVisitPlan.MyShopsPlanView"),
          value: "visitPlanDetail", // value为路由的name值
          permission: "NewPlan:View",
          visible: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["auths"]),
    title() {
      return this.$route.meta.title;
    },
    isPlanList() {
      return this.$route.name === "visitPlanList";
    },
    planMenu() {
      return this.routeList.filter((item) => item.visible);
    },
  },
  mounted() {
    const permissions = this.auths || [];
    if (permissions.length > 0) {
      this.routeList.forEach((route, index) => {
        // permissions.forEach()
        const permission = permissions.findIndex(
          (item) => item.perms === route.permission
        );
        if (permission === -1) {
          route.visible = false;
        }
      });
    }
  },
  methods: {
    clickLeft() {
      const route = {};
      switch (this.$route.name) {
        case "visitPlanList":
          route.name = "ShopHome";
          break;
        case "visitPlanDetail":
        case "visitPlanUpdate":
        case "ApprovePlan":
          this.$router.go(-1);
          return;
        default:
          break;
      }
      this.$router.push(route);
    },
    onSelect(options) {
      this.menuVisible = false;
      this.$router.push({ name: options.value });
    },
    // 获取当月日期集合
    /*  getDays() {
      let days = moment().daysInMonth();
      let startDay = moment().startOf("month");
      this.rightWidth = 56 * days; // 设置右侧宽度
      this.days = [];
      for (var i = 0; i < days; i++) {
        let data = {
          date: moment(startDay)
            .subtract(0 - i, "days")
            .format("YYYY-MM-DD"),
        };
        this.days.push(data);
      }
    }, */
  },
};
</script>

<style lang="scss" scoped>
</style>