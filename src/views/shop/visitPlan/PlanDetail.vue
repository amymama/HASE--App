<template>
  <div style="height: 100vh">
    <NavBar>
      <div v-if="editable" slot="right">
        <van-button
          class="header-btn_item"
          @click.stop="rightAction(false)"
          color="#ffcb73"
          type="primary"
          size="mini"
          :loading="planLoading"
          loading-text="Save"
          >Save</van-button
        >
        <van-button
          class="header-btn_item"
          @click.stop="rightAction(true)"
          color="#ffcb73"
          type="primary"
          size="mini"
          :loading="planLoading"
          loading-text="Submit"
          >Submit</van-button
        >
      </div>
    </NavBar>
    <SearchboxDetail ref="search" class="page-hasnav" @search="handleSearch" />
    <ActionList :list="actionList" @checkAction="checkAction" />
    <div class="container" ref="outer">
      <!-- 左侧列表 -->
      <div
        class="action-table action-table-shop"
        :class="{
          'action-table-shop_shadow': shadow,
        }"
        ref="list-left"
        :style="{ height: height }"
        @scroll="shopScroll"
        @touchstart="touchStart(false)"
      >
        <van-row type="flex" class="head-container">
          <van-col class="action-table-shop_head action-table_common"
            >Shop Name</van-col
          >
          <van-col class="action-table-shop_head action-table_common"
            >Shop Code</van-col
          >
        </van-row>
        <div style="position: relative">
          <!-- 占位 -->
          <div
            class="action-table-shop_place"
            :style="{ height: placeHeight.shop }"
          ></div>
          <!-- 渲染节点 -->
          <div
            class="action-table-shop_list"
            :style="{ transform: shopOffset }"
          >
            <van-row
              class="shop-row"
              type="flex"
              v-for="shop in shopData"
              :key="shop.new_shopId"
              @click="planClicked(shop)"
            >
              <van-col class="action-table_common action-table-shop_item">
                <p class="word-limit-row_2">{{ shop.shopname }}</p>
              </van-col>
              <van-col
                class="action-table_common action-table-shop_item"
                @click.stop="
                  $router.push({
                    name: 'ShopMasterData',
                    query: { shop_id: shop.new_shopId },
                  })
                "
              >
                <p class="word-limit-row_2">{{ shop.shopcode }}</p>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
      <!-- 右侧列表 -->
      <div
        class="action-table action-table-plan"
        ref="list-right"
        :style="{ width: planWidth, height: height }"
        @scroll="planScroll"
        @touchstart="touchStart(true)"
      >
        <van-row
          type="flex"
          style="flex-wrap: nowrap"
          class="head-container"
          :style="{ transform: `translate3d(${offset.plan}px, 0, 0)` }"
        >
          <van-col
            class="action-table_common action-table-plan_head"
            v-for="day in dayData"
            :key="day.value"
          >
            <p class="action-table-plan_day">{{ day.value }}</p>
          </van-col>
        </van-row>
        <div style="position: relative">
          <!-- 渲染节点 -->
          <div
            class="action-table-plan_list"
            :style="{ transform: planOffset }"
          >
            <van-row
              class="plan-row"
              type="flex"
              v-for="shop in shopData"
              :key="shop.new_shopId"
            >
              <van-col
                class="action-card action-table-plan_item"
                v-for="day in dayData"
                :key="day.value"
              >
                <!-- <span class="visited color_visited">Visited</span> -->
                <van-badge
                  v-if="shop[day] && +shop[day].new_visit_status === 1"
                  content="V"
                  class="action-card_visited"
                ></van-badge>
                <van-button
                  @click.stop="editable && handleDraft(shop, day.text)"
                  class="action-btn"
                  :class="tableBtnClass(shop[day.text])"
                  size="mini"
                  >{{ tableBtnTitle(shop[day.text]) }}</van-button
                >
              </van-col>
            </van-row>
          </div>
          <!-- 占位 -->
          <div
            class="action-table-plan_place"
            :style="{ width: planWidth, height: placeHeight.shop }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _throttle from "lodash.throttle";
import _debounce from "lodash/debounce";
import moment from "moment";
import SearchboxDetail from "./components/SearchboxDetail";
import NavBar from "./components/NavBar";
import ActionList from "./components/ActionList";
import {
  postShopList,
  postPlanList,
  SubmitPlan,
  SavePlan,
  cancelPlan,
} from "@/api/visitPlan";
import { mapState } from "vuex";
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
  props: {
    code: {
      // 计划绑定的shopcode
      type: String,
      default: "",
    },
    createTime: {
      // 计划创建时间
      type: String,
      default: "",
    },
    createname: {
      // 计划创建人
      type: String,
      default: "",
    },
    createRole: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      actionList,
      shopTotals: 0,
      month: void 0,
      year: void 0,
      page: 1,
      page_size: 15,
      leftRight: false, // 左 false 右 true
      initLoading: false,
      hasInit: false,
      loading: false,
      planLoading: false,
      finished: false,
      hasSubmit: false, // 当月是否已提交
      shadow: false, // 是否显示阴影，滚动条在最左边时显示
      days: [],
      shopList: [],
      planList: [],
      tempParam: [], // 保存存在状态的单元格
      unSaveParam: [],
      saveParam: [],
      queryParam: {}, // 请求shopList参数
      placeHeight: {
        // 占位元素高度
        shop: null,
        plan: null,
      },
      startIndex: {
        shop: 0,
        plan: 0,
      },
      endIndex: {
        shop: 0,
        plan: 0,
      },
      offset: {
        shop: 0,
        plan: 0,
      },
      itemHeight: {
        shop: 0,
        plan: 0,
      },
      height: null,
      visibleCount: 0,
      visibleCount_plan: 0,
      planWidth: 0,
    };
  },
  components: {
    SearchboxDetail,
    NavBar,
    ActionList,
  },
  computed: {
    ...mapState({
      roles: (state) => state.user.roles,
    }),
    tableBtnClass() {
      /**
       * @param {object} opt 对应表格数据action[date]
       *        */
      return (opt = {}) => {
        const actionValue = +opt.new_approve_status;
        const action = this.actionList.find(
          (item) => item.value === actionValue
        );
        return action && action.class;
      };
    },
    tableBtnTitle() {
      return (opt = {}) => {
        const actionValue = +opt.new_approve_status;
        const action = this.actionList.find(
          (item) => item.value === actionValue
        );
        return action && action.mainInfo;
      };
    },
    editable() {
      return this.$route.name === "visitPlanUpdate";
    },
    shopOffset() {
      return `translate3d(0, ${this.offset.shop}px, 0)`;
    },
    planOffset() {
      return `translate3d(${this.offset.plan}px, ${this.offset.shop}px, 0)`;
    },
    shopData() {
      return this.shopList.slice(this.startIndex.shop, this.endIndex.shop);
    },
    dayData() {
      return this.days.slice(this.startIndex.plan, this.endIndex.plan);
    },
  },
  created() {
    this.init();
    /**
     * 编辑状态所需要的查询参数
     */
    const plus = window.plus;
    if (plus && plus.screen) {
      plus.screen.lockOrientation("landscape-primary");
    }
    if (this.createname && this.createRole) {
      this.queryParam.new_create_time = this.createTime;
      this.queryParam.createname = this.createname;
      this.queryParam.roleid = this.createRole.toLowerCase();
      this.$nextTick(() => {
        const searchIns = this.$refs.search;
        searchIns.new_create_time = new Date(this.createTime);
        searchIns.queryParam.createname = this.createname;
        searchIns.queryParam.roleid = this.createRole.toLowerCase();
      });
    }
    if (this.createTime) {
      this.queryParam.new_create_time = this.createTime;
      this.$nextTick(() => {
        const searchIns = this.$refs.search;
        searchIns.new_create_time = new Date(this.createTime);
      });
    }
    window.addEventListener("resize", this.initElement);
  },
  destroyed() {
    const plus = window.plus;
    if (plus && plus.screen) {
      plus.screen.lockOrientation("portrait-primary");
    }
    window.removeEventListener("resize", this.initElement);
  },
  methods: {
    async init(shopParam = {}, refresh = false) {
      // this.hasInit = this.hasInit && refresh;
      if (this.hasInit && refresh) {
        this.hasInit = false;
      }
      this.initLoading = true;
      let toast = this.$toast({
        type: "loading",
        message: "Loading",
        duration: 0,
      });
      this.initDays();
      if (refresh) {
        this.saveParam.splice(0);
        this.unSaveParam.splice(0);
      }
      try {
        this.hasSubmit = refresh ? false : this.hasSubmit;
        const {
          createName,
          shopname, // shop
          region, // shop
          branch, //shop
        } = this.queryParam;
        const shopList = await this.initShopList({
          region,
          branch,
          shopname,
          ...shopParam,
        });
        const planList = await this.initPlanList({
          createName,
          ...this.queryParam,
        });
        this.planList = planList;
        this.loading = false;
        this.tempParam.splice(0);
        shopList.forEach((shop) => {
          for (let day of this.days) {
            const date = day.value;
            // shop[day] = null;
            shop[day.text] = {
              new_approve_status: "",
            };
            shop.year = this.year;
            shop.month = this.month;
            for (let planItem of planList) {
              const planMoment = moment(
                new Date(planItem.new_plan_date)
              ).format("YYYY/M/D");
              let planTime = new Date(planMoment).getTime();
              let shopTime = new Date(
                `${this.year}/${this.month}/${date}`
              ).getTime();
              const createTime = new Date(
                planItem.new_plan_date.replace(/\-/g, "/")
              );
              const createDate = moment(createTime).date();
              if (
                planItem.new_shop_code === shop.shopcode &&
                planTime === shopTime
              ) {
                this.hasSubmit =
                  this.hasSubmit || planItem.new_approve_status > 1;
                if (+planItem.new_approve_status === 1)
                  this.tempParam.push({
                    new_shopvisit_planId: planItem.new_shopvisit_planId,
                    new_approve_status: planItem.new_approve_status,
                    new_shop_code: shop.shopcode,
                    new_shop_id: shop.new_shopId,
                    new_plan_date: moment(
                      new Date(planItem.new_plan_date.replace(/\-/g, "/"))
                    )
                      .format("YYYY/MM/DD")
                      .replace(/\//g, "-"),
                    new_customer_id: shop.customerId,
                  });
                // 表示当前日期的数据和当前店铺日期对应
                shop[`action${createDate}`].new_shopvisit_planId =
                  planItem.new_shopvisit_planId;
                shop[`action${createDate}`].new_plan_date =
                  planItem.new_plan_date;
                shop[`action${createDate}`].new_approve_status =
                  planItem.new_approve_status;
                shop[`action${createDate}`].new_visit_status =
                  planItem.new_visit_status;
              }
            }
          }
        });
        this.shopList = refresh ? shopList : [...this.shopList, ...shopList];
        this.finished = this.shopTotals === this.shopList.length;
        !this.hasInit && this.$nextTick(() => this.initElement());
        this.hasInit = true;
        this.initLoading = false;
        toast.clear();
      } catch (err) {
        console.log(err);
        this.page--;
        this.initLoading = false;
        toast.clear();
      }
    },
    // 获取当前月的时间
    initDays() {
      const { new_create_time } = this.queryParam;
      let date;
      date = new Date(
        (new_create_time && new_create_time.replace(/\-/g, "/")) || Date.now()
      );
      let days = moment(date).daysInMonth();
      this.month = moment(date).month() + 1;
      this.year = moment(date).year();
      const res = [];
      for (let i = 0; i < days; i++) {
        const weekday = moment(date)
          .date(i + 1)
          .weekday();
        res.push({
          text: `action${i + 1}`,
          value: i + 1,
          weekday: weekday === 0 || weekday === 6, // 是否为周六周日
        });
      }
      this.days = res;
    },
    initShopList(param = {}) {
      return postShopList({
        page: this.page,
        itemsperpage: this.page_size,
        ...param,
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.shopTotals = data.TotalItems;
            return Promise.resolve(data.Items);
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initPlanList(param = {}) {
      if (!param.roleid) {
        param.roleid = this.roles[0] && this.roles[0].id;
      }
      if (!param.new_create_time)
        param.new_create_time = moment(new Date())
          .format("YYYY/MM/DD")
          .replace(/\//g, "-");
      param.visit_type = [];
      return postPlanList({
        plan_type: [],
        ...param,
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            return Promise.resolve(data);
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    handleSearch(param) {
      this.queryParam = param;
      this.page = 1;
      this.init({ page: 1 }, true);
    },
    /**
     * @description 格式化message作为上传结果提示
     */
    formatMessage(message) {
      return message.replace(/<br\/>/g, "\n");
    },
    /**
     * @param {boolean} flag 表示当前操作类型 true submit false save
     */
    async rightAction(flag) {
      const param = [...this.saveParam, ...this.unSaveParam];
      const ALLOW_SAVE = param.length > 0;
      if (!flag) {
        if (!ALLOW_SAVE) {
          this.$toast.fail("Please select visit plan!");
          return;
        }
      }
      const request = () => {
        const Api = flag ? SubmitPlan : SavePlan;
        const action = flag ? "submit" : "save";
        this.planLoading = true;
        Api(param)
          .then((res) => {
            const { success, message } = res;
            this.planLoading = false;
            if (success) {
              this.init({ page: 1 }, true);
              const mutipleMessage = !!res.message;
              mutipleMessage
                ? this.$dialog.alert({
                    message: this.formatMessage(res.message),
                  })
                : this.$toast.success(`visit plan ${action} success!`);
            } else {
              this.$toast.fail(message);
            }
          })
          .catch(() => (this.planLoading = false));
      };
      const nowMonth = moment(new Date()).month();
      const nowYear = moment(new Date()).year();
      const { new_create_time } = this.queryParam;
      const selectMonth = moment(
        new Date(
          (new_create_time && new_create_time.replace(/\-/g, "/")) || Date.now()
        )
      ).month();
      const selectYear = moment(
        new Date(
          (new_create_time && new_create_time.replace(/\-/g, "/")) || Date.now()
        )
      ).year();
      let isNextMonth; // 判断选中的是否为第二个月
      if (nowMonth < 11) {
        isNextMonth = nowMonth + 1 === selectMonth && nowYear === selectYear;
      } else {
        isNextMonth = selectMonth === 0 && nowYear + 1 === selectYear;
      }
      if (isNextMonth && flag) {
        this.$dialog
          .confirm({
            title: "Tips",
            message: this.$t("shopCommon.PlanTips"),
            confirmButtonText: this.$t("shopCommon.Yes"),
            cancelButtonText: this.$t("shopCommon.No"),
          })
          .then(() => request())
          .catch(() => {});
        return;
      }
      request();
    },
    /* onLoad() {
      this.init({ page: this.page++ });
    }, */
    /**
     * @description 滚动时判断表格是否到达最左边，若到达则隐藏阴影，反之隐藏
     */
    handleScroll: _throttle(function (e) {
      const Ele = e.target;
      const TableEle = Ele.querySelector(".content_table");
      // Ele作为容器元素距离视口左边的距离始终不变
      // 因此只需要获取表格距离左边的距离并于容器进行比对
      // 距离相等则为抵达左
      const EleRect = Ele.getBoundingClientRect();
      const TableRect = TableEle.getBoundingClientRect();
      this.shadow = EleRect.x !== TableRect.x;
    }, 50),
    initElement() {
      const outerEle = this.$refs.outer;
      const outerRect = outerEle.getBoundingClientRect();
      const leftList = this.$refs["list-left"];
      console.log(leftList.offsetWidth);
      this.height = `calc(100vh - ${outerRect.top}px)`; // 容器高度设置
      this.planWidth = `calc(100% - ${leftList.offsetWidth}px)`;
      this.$nextTick(() => {
        this.itemHeight.shop = 80 * (45.5 / 80);
        this.itemHeight.plan = 80 * (45.5 / 80);
        this.placeHeight.shop = this.itemHeight.shop * this.shopList.length;
        const shopVisibleHeight = this.$refs["list-left"].offsetHeight;
        const planVisibleWidth = this.$refs["list-right"].offsetWidth;
        this.visibleCount =
          Math.ceil(shopVisibleHeight / this.itemHeight.shop) + 1;
        this.visibleCount_plan =
          Math.ceil(planVisibleWidth / this.itemHeight.plan) + 1;
        this.endIndex.shop = this.startIndex.shop + this.visibleCount;
        this.endIndex.plan = this.startIndex.plan + this.visibleCount_plan;
      });
    },
    shopScroll(e) {
      const { scrollTop } = e.target;
      const rightList = this.$refs["list-right"];
      if (rightList && !this.leftRight) rightList.scrollTop = scrollTop;
      this.startIndex.shop = Math.floor(scrollTop / this.itemHeight.shop);
      this.endIndex.shop = this.startIndex.shop + this.visibleCount;
      this.offset.shop = scrollTop - (scrollTop % this.itemHeight.shop);
      if (
        this.endIndex.shop > this.shopList.length &&
        this.shopList.length < this.shopTotals
      ) {
        if (this.initLoading) return; // 加锁, 表示init方法还未执行完毕
        this.init({ page: ++this.page });
      }
    },
    planScroll(e) {
      const { scrollTop, scrollLeft } = e.target;
      const leftList = this.$refs["list-left"];
      if (leftList && this.leftRight) leftList.scrollTop = scrollTop;
      this.shadow = this.offset.plan > 0;
      this.startIndex.plan = Math.floor(scrollLeft / this.itemHeight.shop);
      this.offset.plan = scrollLeft - (scrollLeft % this.itemHeight.shop);
      this.endIndex.plan = this.startIndex.plan + this.visibleCount_plan;
    },
    /**
     * @param {array} actionValue
     */
    checkAction(actionValue = []) {
      this.queryParam.plan_type = actionValue;
      this.page = 1;
      this.init({}, true);
    },
    handleDraft(shop, actionDay) {
      console.log(shop);
      // 点击判断是否为第二个月或第二天，如果是可以正常操作，否则提示报错
      const { year, month } = shop;
      const nowYear = moment(Date.now()).year();
      const nowMonth = moment(Date.now()).month() + 1;
      const nowDate = moment(Date.now()).date();
      const date = +actionDay.substring(6);
      const daysInMonth = moment(Date.now()).daysInMonth();
      // T+1日
      const TaddDay = moment(Date.now()).add(1, "d").date();
      // T+1月
      const TaddMonth = moment(Date.now()).add(1, "M").month() + 1;
      const cb = () => {
        if (!shop[actionDay].new_approve_status) {
          shop[actionDay].new_approve_status = 1;
        } else if (+shop[actionDay].new_approve_status === 1) {
          shop[actionDay].new_approve_status = "";
        } else if (shop[actionDay].new_approve_status > 1) {
          this.$dialog
            .confirm({
              title: "Tips",
              message: "Are you sure to cancel the T+1 plan?",
              confirmButtonText: "Confirm",
              cancelButtonText: "Cancel",
            })
            .then(async () => {
              try {
                const { new_shopvisit_planId } = shop[actionDay];
                const result = await cancelPlan({
                  new_shopvisit_planId,
                });
                const { success } = result;
                if (success) {
                  this.$toast.success("Cancel Success");
                  this.init({ page: 1 }, true);
                } else {
                  this.$toast.fail("Cancel Error");
                }
              } catch (err) {
                console.log(err);
                this.$toast.fail("Cancel Error");
              }
            })
            .catch(() => {});
          return;
        }
        const new_plan_date = moment(
          new Date(`${year}/${month}/${date}`)
        ).format("YYYY-MM-DD");
        const { shopcode, new_shopId, branch_id, region_id } = shop;
        const param = {
          new_shop_code: shopcode,
          new_shop_id: new_shopId,
          new_plan_date,
          new_customer_id: shop.customerId,
          branch_id,
          region_id,
        };
        const tempItem = this.tempParam.find(
          (item) =>
            item.new_plan_date === new_plan_date &&
            item.new_shop_code === shopcode
        );
        const unSaveIdx = this.unSaveParam.findIndex(
          (item) =>
            item.new_plan_date === new_plan_date &&
            item.new_shop_code === shopcode
        );
        const saveIdx = this.saveParam.findIndex(
          (item) =>
            item.new_plan_date === new_plan_date &&
            item.new_shop_code === shopcode
        );
        // 1. 当存在new_shopvisit_planId时表示已有状态的移除操作
        if (tempItem && tempItem.new_shopvisit_planId && unSaveIdx === -1) {
          if (parseInt(tempItem.new_approve_status) === 1) {
            param.new_shopvisit_planId = tempItem.new_shopvisit_planId;
            this.unSaveParam.push(param);
          }
        } else if (saveIdx > -1) {
          // 2. saveIdx存在则为取消操作
          this.saveParam.splice(saveIdx, 1);
        } else if (unSaveIdx > -1) {
          this.unSaveParam.splice(unSaveIdx, 1);
        } else {
          this.saveParam.push(param);
        }
        // 将事件派发给父组件，在父组件中进行接口请求
        this.$emit("action", {
          unsave: this.unSaveParam,
          save: this.saveParam,
        });
      };
      // cb end
      if (year !== nowYear || month < nowMonth) {
        this.$toast({
          type: "fail",
          message: "T day only can update T+1 visit plan!",
          className: "message-fail",
        });
        return false;
      }
      // 当前列表提交过(当月已提交)
      // 仅T+1日可删除
      console.log(this.hasSubmit);
      if (this.hasSubmit) {
        // 当年，当月或下一个月
        if (
          year === nowYear &&
          (month === TaddMonth || month === nowMonth) &&
          TaddDay === date
        ) {
          if (month === TaddMonth) {
            this.$toast({
              type: "fail",
              message: "T day only can update T+1 visit plan!",
              className: "message-fail",
            });
          } else {
            cb();
          }
        } else {
          this.$toast({
            type: "fail",
            message: "T day only can update T+1 visit plan!",
            className: "message-fail",
          });
          return false;
        }
      } else {
        // 当前列表未提交过
        // 当月 T+1日可操作
        // T+1月 任何时间都可以提交
        console.log(
          (year === nowYear && month === nowMonth && +date === TaddDay) ||
            (year === nowYear && month === TaddMonth)
        );
        console.log("year", year, nowYear);
        console.log("month", month, nowMonth, TaddMonth);
        console.log("date", date, TaddDay);
        if (
          (year === nowYear && month === nowMonth && +date === TaddDay) ||
          (year === nowYear && month === TaddMonth)
        ) {
          cb();
        } else {
          this.$toast({
            type: "fail",
            message: "T day only can update T+1 visit plan!",
            className: "message-fail",
          });
          return false;
        }
      }
    },
    /**
     ** @description 点击店铺时显示当前店铺计划详情
     */
    planClicked(shop) {
      const planList = this.planList.filter(
        (item) => item.new_shop_code === shop.shopcode
      );
      this.$planInfo({
        shop,
        planList,
      })
        .then(() => {})
        .catch(() => {});
    },
    touchStart(flag) {
      // this.flag = flag;
      this.leftRight = flag;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/variable.scss";
// 计划列表
.container {
  .action-table {
    position: absolute;
    .head-container {
      position: sticky;
      top: 0;
      z-index: 2;
    }
  }
  .action-table-shop_shadow {
    box-shadow: 10px 0 10px rgba($color: #000000, $alpha: 0.2);
  }
  .action-table-shop {
    overflow-y: auto;
    transition: box-shadow 500ms ease;
    &_list {
      will-change: scroll-position;
      // pointer-events: none;
      position: absolute;
      top: 0;
    }
    &_head {
      position: relative;
      font-weight: bold;
      color: #2058ab;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: #2058ab;
      }
    }
    &_item {
      height: 80px;
    }
  }
  .action-table_common {
    width: 200px;
    padding: 10px;
    text-align: center;
    background: #fff;
  }
  .action-table-plan {
    right: 0;
    overflow: auto;
    &_head {
      position: relative;
      font-weight: bold;
      color: #2058ab;
      padding: 10px 0;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: #2058ab;
      }
    }
    &_list {
      will-change: scroll-position;
      // pointer-events: none;
      position: absolute;
      top: 0;
    }
    &_place {
      overflow-x: auto;
    }
    &_day,
    &_item {
      width: 80px;
    }
    &_item {
      // width: 60px;
      height: 80px;
      padding: 10px;
      background-color: transparent;
    }
  }
  .plan-row,
  .shop-row {
    flex-wrap: nowrap;
  }
}
.action-card {
  position: relative;
  &_visited {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
  }
  // 操作按钮
  .action-btn {
    position: relative;
    color: #fff;
    width: 100%;
    height: 100%;
  }
  .visited {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    font-weight: bold;
  }
}
.header-btn_item {
  min-width: 100px;
}
</style>
<style lang="scss">
.message-fail .van-toast__text {
  word-break: break-word;
}
@media screen and (orientation: landscape) {
  html {
    font-size: 200px !important;
  }
}
</style>
