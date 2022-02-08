<template>
  <div>
    <NavBar />
    <Searchbox class="page-hasnav" @search="handleSearch" />
    <van-tabs v-model="active" @change="tabChange">
      <van-tab
        v-for="tab in TABS"
        :key="tab.value"
        :title="tab.name"
        :name="tab.value"
      ></van-tab>
    </van-tabs>
    <van-empty
      v-if="isNull"
      :description="$t('shopCommon.NoMoreData')"
    ></van-empty>
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="$t('shopCommon.NoMoreData')"
      @load="onLoad"
      v-else
      class="list-container"
    >
      <PlanCard
        v-for="plan in planList"
        :key="plan.planId"
        @routeTo="(type) => routeTo(type, plan)"
        :detail="plan"
      />
      <ApproveDetail ref="approve" />
    </van-list>
  </div>
</template>

<script>
import moment from "moment";
import Searchbox from "./components/Searchbox";
import PlanCard from "./components/PlanCard";
import ApproveDetail from "./components/ApproveDetail";
import NavBar from "./components/NavBar";
import { postPlanList } from "@/api/visitPlan";
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: false,
      finished: false,
      isNull: false, // 是否显示空数据缺省图
      page: 1,
      page_size: 10,
      active: 0, // tab选中值
      loadTime: 0, // 加载次数计数，若大于1则不使用接口加载
      planListTemp: [], // 临时保存所有的计划用来做分页处理，若接口返回值小于page_size数量则不使用该字段存储数据
      planList: [],
      TABS: [
        {
          name: this.$t("shopStatus.Draft"),
          value: 0,
          type: [1], // plan_type 每个tab代表的数据类型
        },
        {
          name: this.$t("shopStatus.Submited"),
          value: 1,
          type: [2], // plan_type 每个tab代表的数据类型
        },
        {
          name: this.$t("shopStatus.Approved"),
          value: 2,
          type: [3, 4, 5], // plan_type 每个tab代表的数据类型
        },
      ],
      shopList: [],
      queryParam: {},
    };
  },
  computed: {
    ...mapState({ roles: (state) => state.user.roles }),
    PLAN_TYPE() {
      const tab = this.TABS.find((item) => item.value === this.active);
      return tab.type;
    },
  },
  components: {
    Searchbox,
    PlanCard,
    ApproveDetail,
    NavBar,
  },
  methods: {
    async onLoad() {
      if (this.loadTime === 0) {
        // 获取所有数据拿到第一页
        await this.initPlanList(this.queryParam);
      } else {
        // 做分页处理
        const { length } = this.planList;
        this.planList = [
          ...this.planList,
          ...this.planListTemp.slice(length, length + this.page_size),
        ];
      }

      this.finished = this.planListTemp.length === this.planList.length;
    },
    // 清除分页参数
    clearPageParam() {
      this.planListTemp.splice(0);
      this.planList.splice(0);
      this.loading = true;
      this.finished = false;
      this.isNull = false;
      this.loadTime = 0;
    },
    initPlanList(param = {}) {
      this.loadTime++;
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      param.roleid = this.roles[0] && this.roles[0].id;
      // if (!param.new_create_time)
      // param.new_create_time = moment(new Date()).format("YYYY-MM-DD");
      param.visit_type = [];
      return postPlanList({
        plan_type: this.PLAN_TYPE,
        ...param,
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            if (data.length === 0) {
              this.isNull = true;
              return;
            }
            this.isNull = false;
            const result = [];
            for (let planItem of data) {
              const planMoment = moment(
                new Date(planItem.new_plan_date)
              ).format("YYYY-MM-DD");
              const {
                new_shop_code,
                new_shop_name,
                new_create_time,
                new_approve_status,
                rolename,
                createname,
                plan_code,
                new_shopvisit_planId,
                channel_name,
                employcode,
              } = planItem;
              result.push({
                shop_code: new_shop_code,
                shop_name: new_shop_name,
                new_create_time: moment(new Date(new_create_time)).format(
                  "YYYY-MM-DD"
                ),
                new_plan_date: planMoment,
                new_approve_status,
                user_role: rolename,
                employee_code: employcode,
                submit_user: createname,
                visit_plan_number: plan_code,
                planId: new_shopvisit_planId,
                new_shopvisit_planId,
                channel_name,
              });
            }
            this.planListTemp = result;
            this.planList = this.planListTemp.slice(0, this.page_size) || [];
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          toast.clear();
        });
    },
    routeTo(type, plan) {
      if (type === "plan") {
        console.log(this.active);
        const routeName =
          this.active > 1 ? "visitPlanDetail" : "visitPlanUpdate";
        const query = { createTime: plan.new_plan_date };
        this.$router.push({
          name: routeName,
          query,
        });
      }
      if (type === "approve") this.$refs.approve.show(plan);
    },
    tabChange() {
      // Plan_type在接口请求时通过计算属性添加
      this.clearPageParam();
      this.onLoad();
    },
    handleSearch(param) {
      this.queryParam = {
        ...this.queryParam,
        ...param,
      };
      this.clearPageParam();
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  margin-top: 20px;
  padding: 10px;
}
</style>