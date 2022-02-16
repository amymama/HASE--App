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
          v-model="queryParam.shop_name"
          :placeholder="`${$t('shopFA.ShopName')}/${$t('shopFA.ShopCode')}`"
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
      <van-row class="search-item" @click="showPopup('brand')">
        <van-col :span="8">{{ $t("shopPromotion.Brand") }}</van-col>
        <van-col
          :span="queryParam.new_competitorname ? 15 : 16"
          class="search-item_res"
          >{{
            queryParam.new_competitorname ||
            `${$t("select.SelectTip")} ${$t("shopPromotion.Brand")}`
          }}</van-col
        >
        <van-icon
          v-show="queryParam.new_competitorname"
          name="cross"
          @click.stop="reset('new_competitorname')"
        ></van-icon>
      </van-row>
      <van-row class="search-item" @click="showPopup('promotion')">
        <van-col :span="8">{{ $t("shopPromotion.PromotionType") }}</van-col>
        <van-col :span="promotion ? 15 : 16" class="search-item_res">{{
          promotion ||
          `${$t("select.SelectTip")} ${$t("shopPromotion.PromotionType")}`
        }}</van-col>
        <van-icon
          v-show="queryParam.new_promotion_type"
          name="cross"
          @click.stop="reset('new_promotion_type')"
        ></van-icon>
      </van-row>
      <van-row class="search-item" @click="showPopup('status')">
        <van-col :span="8">{{ $t("shopPosm.Status") }}</van-col>
        <van-col :span="status ? 15 : 16" class="search-item_res">{{
          status || $t("select.SelectTip") + " " + " Status"
        }}</van-col>
        <van-icon
          v-show="queryParam.new_status >= 0"
          name="cross"
          @click.stop="reset('new_status')"
        ></van-icon>
      </van-row>
      <van-row class="search-item" @click="inputCreator">
        <van-col :span="8">{{ $t("shopVisitPlan.CreatorName") }}</van-col>
        <van-col
          :span="queryParam.creator_name ? 15 : 16"
          class="search-item_res"
          >{{
            queryParam.creator_name ||
            `${$t("select.InputTip")} ${$t("shopVisitPlan.CreatorName")}`
          }}</van-col
        >
        <van-icon
          v-show="queryParam.creator_name"
          name="cross"
          @click.stop="handleEmployee()"
        ></van-icon>
      </van-row>
      <van-row class="search-item" @click="showPopup('date')">
        <van-col :span="8">{{ $t("shopPromotion.SubmitDate") }}</van-col>
        <van-col :span="dateRange ? 15 : 16" class="search-item_res">{{
          dateRange || $t("select.SelectDate")
        }}</van-col>
        <van-icon
          v-show="dateRange"
          name="cross"
          @click.stop="reset('range')"
        ></van-icon>
      </van-row>
    </div>
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
    <!-- brand -->
    <van-popup v-model="brandVisible" round position="bottom">
      <van-picker
        show-toolbar
        :title="`${$t('select.SelectTip')} ${$t('shopPromotion.Brand')}`"
        :columns="brandOpts"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="brandVisible = false"
        @confirm="(item) => handleConfirm('brand', item)"
      ></van-picker>
    </van-popup>
    <!-- promotionType -->
    <van-popup v-model="promotionVisible" round position="bottom">
      <van-picker
        show-toolbar
        :title="`${$t('select.SelectTip')} ${$t(
          'shopPromotion.PromotionType'
        )}`"
        :columns="promotionOpts"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="promotionVisible = false"
        @confirm="(item) => handleConfirm('promotion', item)"
      ></van-picker>
    </van-popup>
    <!-- status -->
    <van-popup v-model="statusVisible" round position="bottom">
      <van-picker
        show-toolbar
        :title="$t('select.SelectTip') + ' ' + ' Status'"
        :columns="statusOpts"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="statusVisible = false"
        @confirm="(item) => handleConfirm('status', item)"
      ></van-picker>
    </van-popup>
    <van-calendar
      v-model="dateVisible"
      type="range"
      :min-date="new Date(0)"
      :default-date="[new Date()]"
      @confirm="dateConfirm"
    />
  </div>
</template>

<script>
import { getDict } from "@/api/common";
import { getBrand } from "@/api/promotion";
import { getChannel } from "@/api/asset";
import { getSaleregionTreelist } from "@/api/shop";
import { formatData } from "@/utils";
import moment from "moment";
export default {
  data() {
    return {
      region: "",
      channel: "",
      branchVisible: false, // 选择地区弹出层
      // personVisible: false, // person弹出层
      dateVisible: false, // 时间弹出层
      channelVisible: false,
      moreSearchVisible: false,
      brandVisible: false,
      promotionVisible: false,
      statusVisible: false,
      brandOpts: [], // {text,value}
      promotionOpts: [], // {text,value}
      statusOpts: [
        {
          text: this.$t("shopStatus.Draft"),
          value: 2,
        },
        {
          text: this.$t("shopStatus.Submited"),
          value: 0,
        },
      ],
      // personOpts: [], // {name,value}
      branchOpts: [
        {
          text: this.$t("shopCommon.All"),
          value: 0,
          children: [{ text: this.$t("shopCommon.All"), value: 0 }],
        },
      ],
      channelOpts: [
        {
          text: this.$t("shopCommon.All"),
          value: 0,
          children: [{ text: this.$t("shopCommon.All"), value: 0 }],
        },
      ],
      branch: "",
      queryParam: {
        start_time: void 0,
        end_time: void 0,
        new_competitorname: void 0,
        new_promotion_type: void 0,
        new_status: void 0,
        creator_name: void 0,
      },
    };
  },
  watch: {
    // 当更多搜索内容关闭时需要将选中内容还原
    /* moreSearchVisible(visible) {
      if (!visible) {
        for (let key in this.queryParam) {
          this.queryParam[key] = void 0;
        }
      }
    }, */
  },
  computed: {
    branchText() {
      return this.branch || this.$t("shopCommon.All");
    },
    dateRange() {
      const { start_time, end_time } = this.queryParam;

      return start_time && end_time ? `${start_time} / ${end_time}` : "";
    },
    // 是否已选中Channel
    isChannel() {
      return !!this.channel;
    },
    promotion() {
      const promotion = this.promotionOpts.find(
        (item) => item.value === this.queryParam.new_promotion_type
      );
      return promotion && promotion.text;
    },
    status() {
      const status = this.statusOpts.find(
        (item) => item.value === this.queryParam.new_status
      );
      return status && status.text;
    },
  },
  methods: {
    reset(type) {
      if (!type) {
        this.queryParam = {
          start_time: void 0,
          end_time: void 0,
          new_competitorname: void 0,
          new_promotion_type: void 0,
          new_status: void 0,
          creator_name: void 0,
        };
        this.branch = void 0;
        this.moreSearchVisible = false;
      } else {
        if (type === "range") {
          this.queryParam.start_time = void 0;
          this.queryParam.end_time = void 0;
        } else {
          this.queryParam[type] = void 0;
        }
        this.handleSearch();
      }
    },
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      Promise.all([
        this.initChannel(),
        this.initRegion(),
        this.initBrand(),
        this.initPromotionType(),
      ])
        .then(() => toast.clear())
        .catch(() => toast.clear());
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
    initBrand() {
      return getBrand()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.forEach((brand) => {
              this.brandOpts.push({ text: brand, value: brand });
            });
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initPromotionType() {
      return getDict({ key: "PromotionType" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.Items.forEach((promotion) => {
              const { text, value } = promotion;
              this.promotionOpts.push({
                text,
                value,
              });
            });
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    showPopup(type) {
      this[`${type}Visible`] = true;
    },
    inputCreator() {
      this.$inputText()
        .then((creator) => {
          this.handleEmployee(creator);
        })
        .catch(() => {});
    },
    handleEmployee(creator) {
      this.queryParam.creator_name = creator;
      this.handleSearch();
    },
    handleSearch() {
      console.log(this.queryParam);
      this.$emit("search", this.queryParam);
    },
    handleConfirm(type, item) {
      let value, key;
      switch (type) {
        case "brand":
          key = "new_competitorname";
          value = item.value;
          break;
        case "status":
          key = "new_status";
          value = item.value;
          break;
        case "promotion":
          key = "new_promotion_type";
          value = item.value;
          break;
        default:
          return;
      }
      this[`${type}Visible`] = false;
      this.queryParam[key] = value;
      this.handleSearch();
    },
    dateConfirm(dateRange) {
      this.queryParam.start_time = moment(dateRange[0]).format("YYYY-MM-DD");
      this.queryParam.end_time = moment(dateRange[1]).format("YYYY-MM-DD");
      this.dateVisible = false;
      this.handleSearch();
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
      if (!select1st.value && !select2nd.value) this.channel = "";
      if (type === "branch") {
        this.queryParam.new_region_id = select1st.value
          ? select1st.value
          : void 0;
        this.queryParam.new_branch_id = select2nd.value
          ? select2nd.value
          : void 0;
      }
      if (type === "channel") {
        this.queryParam.new_channel_parentid = select1st.value
          ? select1st.value
          : void 0;
        this.queryParam.new_channel_id = select2nd.value
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
