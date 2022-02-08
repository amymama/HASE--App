<template>
  <div>
    <NavBar />
    <van-tabs class="page-hasnav" v-model="active" @change="tabChange">
      <van-tab :title="$t('shopVisitPlan.TodoList')" :key="0"></van-tab>
      <van-tab :title="$t('shopVisitPlan.HaveDone')" :key="1"></van-tab>
    </van-tabs>
    <Searchbox ref="search" @search="handleSearch" />
    <van-empty
      v-if="isEmpty"
      :description="$t('shopCommon.NoMoreData')"
    ></van-empty>
    <div class="list-container" v-else>
      <van-row
        type="flex"
        align="center"
        :gutter="12"
        style="margin-bottom: 10px"
        v-if="active === 0"
      >
        <van-col>
          <van-checkbox
            class="select-all"
            :value="selectList.length === approvalList.length"
            :disabled="approvalList.length === 0"
            @click="selectAll"
            >{{ $t("shopVisitPlan.SelectAll") }}</van-checkbox
          >
        </van-col>
        <van-col>
          <van-button
            v-action:ApprovePlan:pass
            color="#40a9ff"
            @click="handleAction(0)"
            size="mini"
            >{{ $t("shopVisitPlan.Pass") }}</van-button
          >
        </van-col>
        <van-col>
          <van-button
            v-action:ApprovePlan:reject
            color="#40a9ff"
            @click="handleAction(1)"
            size="mini"
            >{{ $t("shopVisitPlan.Reject") }}</van-button
          >
        </van-col>
      </van-row>
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="$t('shopCommon.NoMoreData')"
        @load="onLoad"
      >
        <van-row
          v-for="approval in approvalList"
          :key="approval.new_approve_recordId"
        >
          <van-col :span="2" v-if="active === 0">
            <van-checkbox
              :value="selectList.includes(approval.new_approve_recordId)"
              @click="checkItem(approval.new_approve_recordId)"
            ></van-checkbox>
          </van-col>
          <van-col :span="active ? 24 : 22">
            <ApprovalCard
              :detail="approval"
              @routeTo="(type) => routeTo(type, approval)"
              @action="(option) => handleItemAction(option, approval)"
            />
          </van-col>
        </van-row>
      </van-list>
    </div>

    <ApproveDetail ref="approve" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Searchbox from "./components/Searchbox";
import ApprovalCard from "./components/ApprovalCard";
import ApproveDetail from "./components/ApproveDetail.vue";
import { postApproveList, postApproveStatus } from "@/api/visitPlan";
export default {
  components: {
    NavBar,
    Searchbox,
    ApprovalCard,
    ApproveDetail,
  },
  data() {
    return {
      active: 0,
      page: 1,
      page_size: 10,
      loading: false,
      finished: false,
      isEmpty: false,
      approveVisible: false,
      approvalList: [],
      selectList: [],
    };
  },
  methods: {
    tabChange(flag) {
      this.approvalList.splice(0);
      this.selectList.splice(0);
      this.$refs.search.clear();
      this.initApprovalList({ page: 1, flag }, true);
    },
    onLoad() {
      this.initApprovalList({ page: this.page++ });
    },
    initApprovalList(param = {}, refresh = false) {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      postApproveList({
        page: this.page,
        itemsperpage: this.page_size,
        flag: this.active,
        ...param,
      })
        .then((res) => {
          toast.clear();
          const { success, data } = res;
          this.loading = false;
          if (success) {
            this.approvalList = refresh
              ? data.Items
              : [...this.approvalList, ...data.Items];
            this.finished = data.TotalItems === this.approvalList.length;
            this.isEmpty = data.TotalItems === 0;
          }
        })
        .catch(() => {
          toast.clear();
        });
    },
    routeTo(type, approval) {
      if (type === "approve") this.$refs.approve.show(approval);
    },
    selectAll() {
      if (this.selectList.length === this.approvalList.length) {
        this.selectList.splice(0);
      } else {
        this.approvalList.forEach((approval) => {
          !this.selectList.includes(approval.new_approve_recordId) &&
            this.selectList.push(approval.new_approve_recordId);
        });
      }
    },
    approveAction(params) {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      postApproveStatus(params)
        .then((res) => {
          const { success } = res;
          if (success) {
            this.$toast.success("Success");
            this.initApprovalList({ page: 1 }, true);
          } else {
            this.$toast.fail("Fail");
          }
        })
        .catch(() => {
          this.$toast.fail("Fail");
        })
        .finally(() => {
          this.selectList.splice(0);
          toast.clear();
        });
    },
    handleSearch(params) {
      const {
        new_shop_code,
        new_area_id,
        new_region_id,
        new_province_id,
        new_district_id,
        user_role,
        new_plan_date_start,
        new_plan_date_end,
        channel_id,
        sub_channel_id,
      } = params;
      const result = {
        shop_code: new_shop_code,
        new_area_id,
        new_region_id,
        new_province_id,
        new_district_id,
        user_role,
        new_plan_date_start,
        new_plan_date_end,
        new_channel_parentid: channel_id,
        new_channel_id: sub_channel_id,
      };
      result.page = 1;
      this.initApprovalList(result, true);
    },
    handleAction(type) {
      if (this.selectList.length === 0) {
        this.$toast.fail("Please Select Plan");
        return;
      }
      const action = type === 0 ? "Pass" : "Reject";
      const result = {
        flag: type,
        approveList: [],
      };
      this.$inputText({
        title: `${action} Reason`,
        placeholder: "Please Input Reason",
        required: false,
      })
        .then((reason) => {
          this.selectList.forEach((followId) =>
            result.approveList.push({
              followId,
              suggest: reason,
            })
          );
          //   发起请求
          this.approveAction(result);
        })
        .catch(() => {});
    },
    /**
     * @param {number} type 0 pass 1 reject
     * @param {string} reason
     * @description 单条数据审批事件
     */
    handleItemAction({ type, reason }, approval) {
      const result = {
        flag: type,
        approveList: [
          {
            followId: approval.new_approve_recordId,
            suggest: reason,
          },
        ],
      };
      this.approveAction(result);
    },
    checkItem(approvalId) {
      let index = this.selectList.findIndex((value) => value === approvalId);
      index > -1
        ? this.selectList.splice(index, 1)
        : this.selectList.push(approvalId);
    },
  },
};
</script>

<style lang="scss" scoped>
.select-all {
  margin-bottom: 10px;
}
.list-container {
  padding: 10px;
}
</style>