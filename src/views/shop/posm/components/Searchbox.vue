<template>
  <div style="margin-bottom: 10px">
    <van-row class="search-container" :gutter="12" type="flex" align="center">
      <van-col :span="4" class="shop-common word-limit-row_2">
        <p class="word-limit-row_1" @click="showPopup('branch')">
          {{ branchText }}
        </p>
      </van-col>
      <van-col :span="16">
        <van-search
          style="padding: 10px 0"
          background="transparent"
          shape="round"
          v-model="queryParam.shopname"
          :placeholder="`${$t('shopFA.ShopName')} / ${$t(
            'shopFA.ShopCode'
          )} / ${$t('shopPosm.POSMCode')}`"
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
      <van-row class="search-item" @click="showPopup('role')">
        <van-col :span="8">{{ $t("shopPosm.Role") }}</van-col>
        <van-col :span="queryParam.role_name ? 15 : 16" class="search-item_res">
          {{
            queryParam.role_name ||
            $t("select.SelectTip") + " " + $t("shopPosm.Role")
          }}
        </van-col>
        <van-icon
          v-show="queryParam.role_name"
          name="cross"
          @click.stop="reset('role_name')"
        ></van-icon>
      </van-row>
      <!-- <van-row class="search-item" @click="showPopup('person')">
      <van-col :span="8">Person</van-col>
      <van-col :span="16" class="search-item_res">{{
        queryParam.person || "Please Select Person"
      }}</van-col>
      </van-row>-->
      <van-row class="search-item" @click="showPopup('date')">
        <van-col :span="8">{{ $t("shopPosm.CreateDate") }}</van-col>
        <van-col :span="dateRange ? 15 : 16" class="search-item_res">
          {{ dateRange || $t("select.SelectDate") }}
        </van-col>
        <van-icon
          v-show="dateRange"
          name="cross"
          @click.stop="reset('range')"
        ></van-icon>
      </van-row>
      <van-row
        class="search-item"
        @click="showPopup('forecast')"
        v-if="isForecast"
      >
        <van-col :span="8">{{ $t("shopPosm.ForecastDate") }}</van-col>
        <van-col :span="forecastDate ? 15 : 16" class="search-item_res">
          {{ forecastDate || $t("select.SelectDate") }}
        </van-col>
        <van-icon
          v-show="forecastDate"
          name="cross"
          @click.stop="reset('forecast')"
        ></van-icon>
      </van-row>
    </div>

    <van-dropdown-menu active-color="#40a9ff">
      <van-dropdown-item
        @change="dropChange"
        v-model="queryParam.new_asset_type_id"
        :options="assetOpts"
      />
      <van-dropdown-item
        @change="dropChange"
        v-model="queryParam.new_asset_subcategory_id"
        :options="subOpts"
      />
      <van-dropdown-item
        @change="dropChange"
        v-model="queryParam.posm_inout_type"
        :options="statusOpts"
      />
      <van-dropdown-item
        @change="dropChange"
        v-model="queryParam.new_status"
        :options="filterOpts"
      />
    </van-dropdown-menu>
    <!-- 以下为弹框部分 -->
    <van-popup v-model="branchVisible" round position="bottom">
      <van-cascader
        v-model="region"
        :title="$t('select.SelectRegion')"
        :placeholder="$t('select.SelectTip')"
        active-color="#40a9ff"
        :options="branchOpts"
        @close="branchVisible = false"
        @finish="(data) => onFinish(data, 'branch')"
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
      v-model="dateVisible"
      type="range"
      :min-date="new Date(0)"
      :default-date="[new Date()]"
      @confirm="confirm"
    />
    <van-calendar
      v-if="isForecast"
      type="range"
      :min-date="new Date(0)"
      :default-date="[new Date()]"
      v-model="forecastVisible"
      @confirm="forecastConfirm"
    />
    <van-popup v-model="roleVisible" round position="bottom">
      <van-picker
        show-toolbar
        :title="$t('select.SelectTip') + ' ' + $t('shopPosm.Role')"
        :columns="roleOpts"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="roleVisible = false"
        @confirm="(item) => handleSelect(0, item)"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { getEntityConditions, getDict } from "@/api/common";
import { getRoleList } from "@/api/shop";
import { getChannel } from "@/api/asset";
import { getSaleregionTreelist } from "@/api/shop";
import { formatData } from "@/utils";
import moment from "moment";
export default {
  props: {
    isForecast: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      region: "",
      channel: "",
      currentDate: new Date(),
      branchVisible: false, // 选择地区弹出层
      roleVisible: false, // role弹出层
      // personVisible: false, // person弹出层
      dateVisible: false, // 时间范围弹出层
      forecastVisible: false, //forecast 时间弹出层
      channelVisible: false,
      moreSearchVisible: false,
      roleOpts: [],
      // personOpts: [], // {name,value}
      assetOpts: [], //  {text,value}
      subOpts: [], // {text,value}
      statusOpts: [], // {text,value}
      filterOpts: [
        {
          text: "All",
          value: void 0,
        },
        {
          text: this.$t("shopVisitPlan.Submitted"),
          value: 0,
        },
        {
          text: this.$t("shopVisitPlan.Draft"),
          value: 2,
        },
      ],
      branchOpts: [
        {
          text: "All",
          value: 0,
          children: [{ text: "All", value: 0 }],
        },
      ],
      channelOpts: [
        {
          text: "All",
          value: 0,
          children: [{ text: "All", value: 0 }],
        },
      ],
      branch: "",
      queryParam: {
        // name: "",
        role_name: void 0,
        // person: "",
        // region: "",
        // new_asset_type_id: "",
        // new_asset_subcategory_id: "",
        // posm_inout_type: "",
        start_time: void 0,
        end_time: void 0,
        new_forcast_start_date: void 0,
        new_forcast_end_date: void 0,
        new_status: void 0,
      },
    };
  },
  watch: {
    // 当更多搜索内容关闭时需要将选中内容还原
    moreSearchVisible(visible) {
      if (!visible) {
        this.queryParam.role_name = void 0;
        this.queryParam.start_time = void 0;
        this.queryParam.end_time = void 0;
        this.queryParam.new_forcast_start_date = void 0;
        this.queryParam.new_forcast_end_date = void 0;
      }
    },
  },
  computed: {
    branchText() {
      return this.branch || this.$t("shopCommon.All");
    },
    dateRange() {
      const { start_time, end_time } = this.queryParam;

      return start_time && end_time ? `${start_time} / ${end_time}` : "";
    },
    forecastDate() {
      const { new_forcast_start_date, new_forcast_end_date } = this.queryParam;

      return new_forcast_start_date && new_forcast_end_date
        ? `${new_forcast_start_date} / ${new_forcast_end_date}`
        : "";
    },
    // 是否已选中Channel
    isChannel() {
      return !!this.channel;
    },
  },
  methods: {
    reset(type) {
      if (type === "range") {
        this.queryParam.start_time = void 0;
        this.queryParam.end_time = void 0;
      } else if (type === "forecast") {
        this.queryParam.new_forcast_start_date = void 0;
        this.queryParam.new_forcast_end_date = void 0;
      } else {
        this.queryParam[type] = void 0;
      }
      this.handleSearch();
    },
    confirm(dateRange) {
      this.queryParam.start_time = moment(dateRange[0]).format("YYYY-MM-DD");
      this.queryParam.end_time = moment(dateRange[1]).format("YYYY-MM-DD");
      this.handleSearch();
      this.dateVisible = false;
    },
    forecastConfirm(dateRange) {
      this.queryParam.new_forcast_start_date = moment(dateRange[0]).format(
        "YYYY-MM-DD"
      );
      this.queryParam.new_forcast_end_date = moment(dateRange[1]).format(
        "YYYY-MM-DD"
      );
      this.handleSearch();
      this.forecastVisible = false;
    },
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      Promise.all([
        this.initStatus(),
        this.initRole(),
        // this.initPerson(),
        this.initAssetType(),
        this.initSubcategory(),
        this.initChannel(),
        this.initRegion(),
      ])
        .then(() => toast.clear())
        .catch(() => toast.clear());
    },
    initStatus() {
      return getDict({ key: "AssetPosmInOutType" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const statusOpts = [];
            data.Items.forEach((status) => {
              statusOpts.push({
                text: status.text,
                value: status.value,
              });
            });
            statusOpts.unshift({ text: "All", value: void 0 });
            this.statusOpts = statusOpts;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    // 区域下拉框加载
    initChannel() {
      return getChannel()
        .then((res) => {
          const { data, success } = res;
          if (success) {
            data.Items.forEach((channel) => {
              const children = [{ text: "All", value: 0 }];
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
    initRegion() {
      return getSaleregionTreelist()
        .then((res) => {
          const { data, success } = res;
          if (success) {
            this.branchOpts = formatData(data.Items, {
              text: "new_name",
              value: "new_sale_regionid",
            });
            this.branchOpts.unshift({
              text: this.$t("shopCommon.All"),
              value: 0,
              children: [
                {
                  text: this.$t("shopCommon.All"),
                  value: 0,
                  
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
    // 初始化Role下拉列表选项
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
    // 初始化AssetType下拉列表选项 new_asset_type, 可直接调用获取列表接口
    initAssetType() {
      return getEntityConditions({
        entityName: "new_asset_type",
        fields: "new_asset_typeId, new_name",
      })
        .then((res) => {
          if (res.success) {
            const assetOpts = [];
            res.data.forEach((item) =>
              assetOpts.push({
                text: item.new_name,
                value: item.new_asset_typeId,
              })
            );
            assetOpts.unshift({ text: "All", value: void 0 });
            this.assetOpts = assetOpts;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    initSubcategory() {
      return getEntityConditions({
        entityName: "new_asset_category",
        fields: "new_asset_categoryId, new_name",
        wheres: {
          new_asset_category_parent: 1, // 获取POSM subcategory
        },
      })
        .then((res) => {
          if (res.success) {
            const subOpts = [];
            res.data.forEach((item) =>
              subOpts.push({
                text: item.new_name,
                value: item.new_asset_categoryId,
              })
            );
            subOpts.unshift({ text: "All", value: void 0 });
            this.subOpts = subOpts;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    showPopup(type) {
      console.log(type);
      this[`${type}Visible`] = true;
    },
    handleSelect(type, item) {
      let action, visible;
      switch (type) {
        case 0:
          action = "role_name";
          visible = "roleVisible";
          break;
        /* case 1:
          action = "person";
          break; */
        default:
          break;
      }
      this[visible] = false;
      this.queryParam[action] = item.text;
      this.handleSearch();
    },
    handleSearch() {
      this.$emit("search", this.queryParam);
    },
    dropChange() {
      this.$emit("search", this.queryParam);
    },
    onFinish({ selectedOptions }, type) {
      this[`${type}Visible`] = false;
      const { length } = selectedOptions;
      if (type === "branch")
        this.branch = selectedOptions[length - 1].value
          ? selectedOptions[length - 1].text // region
          : selectedOptions[0].text; // branch
      let select1st = selectedOptions[0];
      let select2nd = selectedOptions[1];
      if (type === "branch") {
        this.queryParam.new_region_id = select1st.value
          ? select1st.value
          : void 0;
        this.queryParam.new_branch_id = select2nd.value
          ? select2nd.value
          : void 0;
      }
      if (type === "channel") {
        this.queryParam.new_channel_id = select2nd.value
          ? select2nd.value
          : select1st.value
          ? select1st.value
          : void 0;
        /* this.queryParam.new_sub_channel_name =  */
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
.search-container {
  margin-top: 10px;
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
  margin-bottom: 10px;
  font-weight: bold;
  &_res {
    padding-right: 10px;
    text-align: right;
    font-weight: normal;
    color: #989898;
  }
}
.channel-select {
  color: #007bff;
}
</style>
