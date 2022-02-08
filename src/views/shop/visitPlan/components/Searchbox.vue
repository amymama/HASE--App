<template>
  <div>
    <van-row class="search-container" :gutter="12" type="flex" align="center">
      <van-col :span="4" class="shop-common word-limit-row_2"
        ><p class="word-limit-row_1" @click="showPopup('area')">
          {{ areaText }}
        </p></van-col
      >
      <van-col :span="16">
        <van-search
          style="padding: 10px 0"
          background="transparent"
          shape="round"
          v-model="queryParam.new_shop_code"
          :placeholder="$t('shopVisitPlan.ShopSearch')"
          @search="handleSearch"
        />
      </van-col>
      <van-col :span="2" class="shop-common">
        <van-icon
          name="filter-o"
          :class="{
            'channel-select': isChannel,
          }"
          @click="showPopup('channel')"
        />
      </van-col>
      <van-col :span="2" class="shop-common">
        <van-icon
          name="more-o"
          @click="moreSearchVisible = !moreSearchVisible"
        />
      </van-col>
    </van-row>
    <div v-show="moreSearchVisible">
      <van-row class="search-item" @click="showPopup('date')">
        <van-col :span="8">{{ $t("shopVisitPlan.PlanMonth") }}</van-col>
        <van-col :span="dateTime ? 15 : 16" class="search-item_res">{{
          dateTime || this.$t("select.SelectYear")
        }}</van-col>
        <van-icon
          v-show="dateTime"
          name="cross"
          @click.stop="reset('dateTime')"
        ></van-icon>
      </van-row>
      <van-row v-if="isApproval" class="search-item" @click="showPopup('role')">
        <van-col :span="8">{{ $t("shopPosm.Role") }}</van-col>
        <van-col :span="roleText ? 15 : 16" class="search-item_res">{{
          roleText || $t("select.SelectTip") + " " + $t("shopPosm.Role")
        }}</van-col>
        <van-icon
          v-show="roleText"
          name="cross"
          @click.stop="reset('user_role')"
        ></van-icon>
      </van-row>
    </div>
    <van-popup v-if="isApproval" v-model="roleVisible" round position="bottom">
      <van-picker
        show-toolbar
        :columns="roleOpts"
        :title="$t('select.SelectTip') + ' ' + $t('shopPosm.Role')"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="roleVisible = false"
        @confirm="(item) => handleSelect(0, item)"
      ></van-picker>
    </van-popup>
    <van-popup v-model="areaVisible" round position="bottom">
      <van-cascader
        v-model="regionBranch"
        :title="$t('select.SelectRegion')"
        :placeholder="$t('select.SelectTip')"
        active-color="#40a9ff"
        :options="areaOpts"
        @close="areaVisible = false"
        @finish="(data) => onFinish(data, 'area')"
      />
    </van-popup>
    <van-popup v-model="channelVisible" round position="bottom">
      <van-cascader
        v-model="channel"
        :title="$t('select.SelectChannel')"
        :placeholder="$t('select.SelectTip')"
        active-color="#40a9ff"
        :options="channelOpts"
        @close="channelVisible = false"
        @finish="(data) => onFinish(data, 'channel')"
      />
    </van-popup>
    <van-calendar
      v-if="isApproval"
      v-model="dateVisible"
      type="range"
      :min-date="new Date(0)"
      :default-date="[new Date()]"
      @confirm="dateConfirm"
    />
    <!-- <van-calendar
      v-else
      :min-date="new Date(0)"
      :default-date="new Date()"
      v-model="dateVisible"
      @confirm="dateConfirm"
    /> -->
    <van-popup v-else v-model="dateVisible" round position="bottom">
      <van-datetime-picker
        :value="new_create_time"
        type="year-month"
        :title="$t('select.SelectYear')"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dateConfirm"
        @cancel="dateVisible = false"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from "moment";
import { getRoleList } from "@/api/shop";
import { getSaleregionTreelist } from "@/api/shop";
import { getChannel } from "@/api/asset";
import { formatData } from "@/utils";
export default {
  data() {
    return {
      minDate: new Date(2000, 0),
      maxDate: new Date(
        moment(Date.now()).year() + 5,
        moment(Date.now()).month(),
        1
      ),
      areaVisible: false, // 选择地区弹出层
      channelVisible: false,
      dateVisible: false,
      roleVisible: false,
      moreSearchVisible: false,
      regionBranch: "",
      channel: "",
      areaOpts: [],
      channelOpts: [
        {
          text: this.$t("shopCommon.All"),
          value: 0,
          children: [{ text: this.$t("shopCommon.All"), value: 0 }],
        },
      ],
      roleOpts: [], // {name,value}
      area: "",
      new_create_time: void 0,
      queryParam: {
        new_shop_code: "",
        new_create_time: void 0,
        new_plan_date_end: void 0,
        new_plan_date_start: void 0,
        user_role: void 0, // Approval时使用
      },
    };
  },
  watch: {
    // 当更多搜索内容关闭时需要将选中内容还原
    /* moreSearchVisible(visible) {
      if (!visible) {
        this.new_create_time = void 0;
        this.queryParam.new_create_time = void 0;
      }
    }, */
  },
  computed: {
    areaText() {
      return this.area || this.$t("shopCommon.All");
    },
    roleText() {
      const role = this.roleOpts.find(
        (item) => item.value === this.queryParam.user_role
      );
      return role && role.text;
    },
    isChannel() {
      return !!this.channel;
    },
    // 是否为审批页面，因为审批页面和Plan列表筛选条件不同
    isApproval() {
      return this.$route.name === "ApprovePlan";
    },
    dateTime() {
      let date;
      console.log(this.queryParam);
      if (this.isApproval) {
        const { new_plan_date_start, new_plan_date_end } = this.queryParam;
        date =
          new_plan_date_start && new_plan_date_end
            ? `${new_plan_date_start} / ${new_plan_date_end}`
            : "";
      } else {
        date = this.new_create_time
          ? moment(this.new_create_time).format("YYYY-MM")
          : "";
      }
      return date;
    },
  },
  methods: {
    reset(type) {
      if (type === "dateTime") {
        if (this.isApproval) {
          this.queryParam.new_plan_date_start = void 0;
          this.queryParam.new_plan_date_end = void 0;
        } else {
          this.new_create_time = void 0;
          this.queryParam.new_create_time = void 0;
        }
      } else {
        this.queryParam[type] = void 0;
      }
      this.handleSearch();
    },
    clear() {
      this.queryParam = {
        new_shop_code: "",
        new_create_time: void 0,
        new_plan_date_end: void 0,
        new_plan_date_start: void 0,
        user_role: void 0, // Approval时使用
        channel_id: void 0,
        sub_channel_id: void 0,
        new_branch_id: void 0,
        new_region_id: void 0,
      };
      this.channel = "";
      this.area = "";
    },
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      /* this.queryParam = {
        new_shop_code: "",
        new_create_time: void 0,
        role 
      }; */
      Promise.all([
        this.initChannel(),
        this.initRegionBranch(),
        this.isApproval ? this.initRole() : Promise.resolve(),
      ])
        .then(() => {
          toast.clear();
        })
        .catch(() => {
          toast.clear();
        });
    },
    // 区域下拉框加载
    initChannel() {
      return getChannel()
        .then((res) => {
          const { data, success } = res;
          if (success) {
            data.Items.forEach((channel) => {
              const children = [{ text: this.$t("shopCommon.All"), value: 0 }];
              channel.children.forEach((channelChild) => {
                children.push({
                  text: channelChild.new_name,
                  value: channelChild.new_channelid,
                });
              });
              this.channelOpts.push({
                text: channel.new_name,
                value: channel.new_channelid,
                children,
              });
            });
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    // 地区一级选择加载
    initRegionBranch() {
      return getSaleregionTreelist()
        .then((res) => {
          const { data, success } = res;
          if (success) {
            this.areaOpts = formatData(data.Items, {
              text: "new_name",
              value: "new_sale_regionid",
            });
            this.areaOpts.unshift({
              text: this.$t("shopCommon.All"),
              value: 0,
              children: [
                {
                  text: this.$t("shopCommon.All"),
                  value: 0,
                  children: [
                    {
                      text: this.$t("shopCommon.All"),
                      value: 0,
                      children: [
                        {
                          text: this.$t("shopCommon.All"),
                          value: 0,
                        },
                      ],
                    },
                  ],
                },
              ],
            });
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    initRole() {
      return getRoleList()
        .then((res) => {
          if (res.success) {
            const roleOpts = [];
            res.data.forEach((item) =>
              roleOpts.push({
                text: item.role_name,
                value: item.id,
              })
            );
            this.roleOpts = roleOpts;
            return Promise.resolve(res);
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    showPopup(type) {
      this[`${type}Visible`] = true;
    },
    handleSelect(type, item) {
      let action, key, visible;
      switch (type) {
        case 0:
          action = "user_role";
          key = "value";
          visible = "roleVisible";
          break;
      }
      this.queryParam[action] = item[key];
      this[visible] = false;
      this.handleSearch();
    },
    handleSearch() {
      this.queryParam.new_create_time = moment(this.new_create_time).format(
        "YYYY-MM-DD"
      );
      this.$emit("search", this.queryParam);
    },
    dateConfirm(date) {
      if (this.isApproval) {
        this.queryParam.new_plan_date_start = moment(date[0]).format(
          "YYYY-MM-DD"
        );
        this.queryParam.new_plan_date_end = moment(date[1]).format(
          "YYYY-MM-DD"
        );
      } else {
        this.queryParam.new_create_time = moment(date).format("YYYY-MM-DD");
      }
      this.new_create_time = date;
      this.handleSearch();
      this.dateVisible = false;
    },
    onFinish({ selectedOptions }, type) {
      this[`${type}Visible`] = false;
      const { length } = selectedOptions;
      if (type === "area")
        this.area = selectedOptions[length - 1].value
          ? selectedOptions[length - 1].text // region
          : selectedOptions[0].text; // branch
      let select1st = selectedOptions[0]; // region channel
      let select2nd = selectedOptions[1]; // area subchannel
      let select3rd = selectedOptions[2]; // province
      let select4th = selectedOptions[3]; // district
      if (!select1st.value && !select2nd.value) {
        this.channel = "";
      }
      if (type === "area") {
        this.queryParam.new_region_id = select1st.value
          ? select1st.value
          : void 0;
        this.queryParam.new_area_id = select2nd.value
          ? select2nd.value
          : void 0;
        this.queryParam.new_province_id = select3rd.value
          ? select3rd.value
          : void 0;
        this.queryParam.new_district_id = select4th.value
          ? select4th.value
          : void 0;
      }
      if (type === "channel") {
        this.queryParam.channel_id = select1st.value ? select1st.value : void 0;
        this.queryParam.sub_channel_id = select2nd.value
          ? select2nd.value
          : void 0;
      }
      this.handleSearch();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 0 10px;
}
.search-container {
  margin: 10px 10px 0 10px;
  .round {
    border-radius: 40px;
  }
  .shop-common {
    text-align: center;
    span {
      font-weight: bold;
    }
    i {
      font-size: $font32;
    }
  }
}
.search-item {
  padding: 10px 20px;
  font-weight: bold;
  &_res {
    padding-right: 10px;
    text-align: right;
    font-weight: normal;
    color: #989898;
  }
}
</style>