<template>
  <div class="flex-layout visit-history">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar left-arrow @click-left="goBack" title="Shop Visit History" />
      <!-- SHOP HEADER -->
      <shop-header :shopInfo="query" />
    </div>
    <div class="flex-layout__body visit-history__content">
      <!-- visit basic -->
      <div class="visit-history-basic"></div>
      <!-- visit steps -->
      <div class="visit-histoty-steps" ref="tabs">
        <van-tabs
          v-if="isShow"
          v-model="active"
          sticky
          :offset-top="offsetTopTabs"
        >
          <van-tab>
            <template #title>
              <span class="tab-index">1</span>
              Inspect FA
            </template>
            <visit-history-step1
              :id="record.new_fa_inspect_id"
              :totalId="record.new_display_id"
            />
          </van-tab>
          <van-tab>
            <template #title>
              <span class="tab-index">2</span>
              Display Models
            </template>
            <visit-history-step2 :totalId="record.new_display_id" />
          </van-tab>
          <van-tab>
            <template #title>
              <span class="tab-index">3</span>
              Competitor QTY
            </template>
            <visit-history-step3
              :id="record.new_competitor_id"
              :totalId="record.new_display_id"
            />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getVisitStepidByTotalid } from "@/api/shopVisit";
import ShopHeader from "./components/ShopHeader";
import VisitHistoryStep1 from "./components/VisitHistoryStep1";
import VisitHistoryStep2 from "./components/VisitHistoryStep2";
import VisitHistoryStep3 from "./components/VisitHistoryStep3";

export default {
  name: "VisitHistory",
  components: {
    ShopHeader,
    VisitHistoryStep1,
    VisitHistoryStep2,
    VisitHistoryStep3,
  },
  data() {
    return {
      record: {},
      isShow: false,
      // router query
      query: {},
      // tabs index
      active: 0,
      // tabs offset
      offsetTopTabs: 0,
    };
  },
  created() {
    this.query = this.$route.query;
    this.handleGetVisitId();
    this.$nextTick(() => {
      this.hangleGetTabsOffsetTop();
    });
  },
  methods: {
    // set tabs offset top
    hangleGetTabsOffsetTop() {
      this.offsetTopTabs = this.$refs.tabs.offsetTop;
    },
    handleGetVisitId() {
      getVisitStepidByTotalid({
        new_visit_total_id: this.query.new_visit_totalid,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          this.isShow = true;
          this.record = data.Items;
        }
      });
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.hangleGetTabsOffsetTop);
  },
};
</script>
<style lang="scss" scoped>
.tab-index {
  display: inline-block;
  background: #2058ab;
  color: #fff;
  width: 32px;
  height: 32px;
  line-height: 32px;
  font-size: 26px;
  text-align: center;
  border-radius: 50%;
}
</style>