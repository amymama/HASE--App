<template>
  <div>
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
          v-model="queryParam.new_shopname"
          :placeholder="`${$t('shopFA.ShopName')} / ${$t(
            'shopFA.ShopCode'
          )} / ${$t('shopFA.FACode')}`"
          @search="handleSearch"
        />
      </van-col>
      <van-col :span="2" class="shop-common">
        <van-icon
          class="filter-icon"
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
      <van-row class="search-item" @click="showPopup('sub')">
        <van-col :span="8">{{ $t("shopFA.FASubcategory") }}</van-col>
        <van-col
          :span="queryParam.new_asset_sub_category_name ? 15 : 16"
          class="search-item_res"
          >{{
            queryParam.new_asset_sub_category_name ||
            $t("select.SelectSubcategory")
          }}</van-col
        >
        <van-icon
          v-show="queryParam.new_asset_sub_category_name"
          name="cross"
          @click.stop="reset('new_asset_sub_category_name')"
        ></van-icon>
      </van-row>
      <van-row class="search-item" @click="showPopup('asset')">
        <van-col :span="8">{{ $t("shopFA.AssetType") }}</van-col>
        <van-col
          :span="queryParam.new_asset_typename ? 15 : 16"
          class="search-item_res"
          >{{
            queryParam.new_asset_typename || $t("select.SelectAssetType")
          }}</van-col
        >
        <van-icon
          v-show="queryParam.new_asset_typename"
          name="cross"
          @click.stop="reset('new_asset_typename')"
        ></van-icon>
      </van-row>
      <van-row
        class="search-item"
        v-if="showInspection"
        @click="showPopup('inspection')"
      >
        <van-col :span="10">{{ $t("shopFA.FAInspectionStatus") }}</van-col>
        <van-col :span="inspectText ? 13 : 14" class="search-item_res">{{
          inspectText || $t("select.SelectInspect")
        }}</van-col>
        <van-icon
          v-show="queryParam.new_fa_status"
          name="cross"
          @click.stop="reset('new_fa_status')"
        ></van-icon>
      </van-row>
    </div>

    <van-popup
      get-container="#app"
      v-model="branchVisible"
      round
      position="bottom"
    >
      <van-cascader
        v-model="regionBranch"
        :title="$t('select.SelectRegion')"
        :placeholder="$t('select.SelectTip')"
        active-color="#40a9ff"
        :options="branchOpts"
        @close="branchVisible = false"
        @finish="(data) => onFinish(data, 'branch')"
      />
    </van-popup>
    <van-popup
      get-container="#app"
      v-model="channelVisible"
      round
      position="bottom"
    >
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
    <!-- <van-action-sheet
      style="height: 40%"
      :close-on-click-action="true"
      v-model="subVisible"
      :actions="subOpts"
      
      @select="(item) => handleSelect(0, item)"
    /> -->
    <van-popup
      get-container="#app"
      v-model="subVisible"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="subOpts"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="subVisible = false"
        @confirm="(item) => handleSelect(0, item)"
      ></van-picker>
    </van-popup>
    <van-popup
      get-container="#app"
      v-model="assetVisible"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="assetOpts"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="assetVisible = false"
        @confirm="(item) => handleSelect(1, item)"
      ></van-picker>
    </van-popup>
    <van-popup
      get-container="#app"
      v-model="inspectionVisible"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="inspectionOpts"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="inspectionVisible = false"
        @confirm="(item) => handleSelect(2, item)"
      ></van-picker>
    </van-popup>
    <!-- <van-action-sheet
      :close-on-click-action="true"
      v-model="inspectionVisible"
      :actions="inspectionOpts"
      get-container="#app"
      @select="(item) => handleSelect(2, item)"
    /> -->
  </div>
</template>

<script>
import bus from "@/utils/busEvent";
import { getEntityConditions, getDict } from "@/api/common";
import { getChannel } from "@/api/asset";
import { mapMutations, mapState } from "vuex";
import { getSaleregionTreelist } from "@/api/shop";
import { formatData } from "@/utils";
export default {
  props: {
    search: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {
      branchVisible: false, // 选择地区弹出层
      subVisible: false, // sub Category弹出层
      assetVisible: false, // Asset Type 弹出层
      inspectionVisible: false, // inspection 弹出层
      channelVisible: false,
      moreSearchVisible: false,
      regionBranch: "",
      channel: "",
      subOpts: [], // {name,value}
      assetOpts: [], // {name,value}
      inspectionOpts: [], // {name,value}
      branchOpts: [],
      channelOpts: [
        {
          text: this.$t("shopCommon.All"),
          value: 0,
          children: [{ text: this.$t("shopCommon.All"), value: 0 }],
        },
      ],
      branch: "",
      queryParam: {
        new_shopname: "",
        new_asset_sub_category_name: "",
        new_asset_typename: "",
        new_region_name: "",
        new_fa_status: void 0,
      },
    };
  },
  watch: {
    // 当更多搜索内容关闭时需要将选中内容还原
    /*  moreSearchVisible(visible) {
      if (!visible) {
        this.queryParam.new_asset_sub_category_name = "";
        this.queryParam.new_asset_typename = "";
        this.queryParam.new_region_name = "";
        this.queryParam.new_shopname = "";
        this.queryParam.new_fa_status = void 0;
      }
    }, */
  },
  computed: {
    ...mapState({
      query: (state) => state.query,
    }),
    branchText() {
      return this.branch || this.$t("shopCommon.All");
    },
    inspectText() {
      const { new_fa_status } = this.queryParam;
      const inspect = this.inspectionOpts.find(
        (item) => item.value == new_fa_status
      );
      return inspect && inspect.text;
    },
    showInspection() {
      return this.$route.name === "faLatest";
    },
    isChannel() {
      return !!this.channel;
    },
  },
  methods: {
    ...mapMutations(["setQuery"]),
    reset(type) {
      this.queryParam[type] = void 0;
      this.handleSearch();
    },
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      Promise.all([
        this.initChannel(),
        this.initSubCategory(),
        this.initAssetType(),
        this.initRegionBranch(),
        this.showInspection ? this.initInspection() : Promise.resolve(),
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
    // 初始化SubCategory下拉列表选项 new_asset_category
    initSubCategory() {
      return getEntityConditions({
        entityName: "new_asset_category",
        fields: "new_asset_categoryId, new_name, new_isbooth",
        wheres: {
          new_asset_category_parent: 0,
        }, // 筛选FA条件
      })
        .then((res) => {
          if (res.success) {
            const subOpts = [];
            res.data.forEach((item) =>
              subOpts.push({
                text: item.new_name,
                value: item.new_name,
              })
            );
            this.subOpts = subOpts;
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
                value: item.new_name,
              })
            );
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
    initInspection() {
      return getDict({ key: "FaInspectType" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const inspectionOpts = [];
            data.Items.forEach((item, index) =>
              inspectionOpts.push({
                text: item.text,
                value: item.value,
                index,
              })
            );
            this.inspectionOpts = inspectionOpts;
            this.inspectionOpts.unshift({
              name: "All",
              value: void 0,
            });
            bus.$emit("inspectStatus", inspectionOpts);
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
    handleSelect(type, item) {
      let action, visible;
      switch (type) {
        case 0:
          action = "new_asset_sub_category_name";
          visible = "subVisible";
          break;
        case 1:
          action = "new_asset_typename";
          visible = "assetVisible";
          break;
        case 2:
          action = "new_fa_status";
          visible = "inspectionVisible";
      }
      this[visible] = false;
      this.queryParam[action] = item.value;
      this.handleSearch();
    },
    handleSearch() {
      /**
       * @description queryParam对应字段
       * @param {*} new_shopname
       * @param {*} new_asset_sub_category_name
       * @param {*} new_asset_typename
       * @param {*} new_region_name
       * @param {*} new_fa_status
       * @param {*} new_branch
       * @param {*} new_channel_name
       * @param {*} new_sub_channel_name
       */
      this.$emit("search", this.queryParam);
    },
    onFinish({ selectedOptions }, type) {
      this[`${type}Visible`] = false;
      const { length } = selectedOptions;
      if (type === "branch")
        this.branch = selectedOptions[length - 1].value
          ? selectedOptions[length - 1].text // region
          : selectedOptions[0].text; // branch
      let select1st = selectedOptions[0]; // region channel
      let select2nd = selectedOptions[1]; // branch subchannel
      if (type === "branch") {
        this.queryParam.new_region_name = select1st.value
          ? select1st.text
          : void 0;
        this.queryParam.branch = select2nd.value ? select2nd.text : void 0;
      }
      if (type === "channel") {
        this.queryParam.new_channel_name = select1st.value
          ? select1st.text
          : void 0;
        this.queryParam.new_sub_channel_name = select2nd.value
          ? select2nd.text
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
  font-weight: bold;
  &_res {
    padding-right: 10px;
    text-align: right;
    font-weight: normal;
    color: #989898;
  }
}
</style>
