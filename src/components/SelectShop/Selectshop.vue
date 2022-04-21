<template>
  <van-popup :value="value" position="right" style="width: 100%; height: 100%">
    <van-nav-bar
      title="Select Shop"
      left-arrow
      @click-left="closePopup"
    ></van-nav-bar>
    <van-row class="search-container" :gutter="12" type="flex" align="center">
      <van-col :span="4" class="shop-common word-limit-row_2"
        ><span @click="showPopup('branch')">{{ branchText }}</span></van-col
      >
      <van-col :span="16" class="shop-search">
        <van-search
          class="search-ipt"
          shape="round"
          background="transparent"
          v-model="queryParam.new_name"
          :placeholder="placeholder"
          @search="handleSearch"
        />
      </van-col>
      <van-col :span="4" class="shop-common">
        <van-icon name="filter-o" @click="showPopup('channel')" />
      </van-col>
    </van-row>
    <van-list
      class="list-container page-hasnav"
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <ShopCard
        v-for="shop in shopList"
        :key="shop.new_shopid"
        :detail="shop"
        @ok="shopAdded"
      />
    </van-list>
    <van-popup v-model="branchVisible" round position="bottom">
      <van-cascader
        v-model="regionCas"
        :title="$t('select.SelectRegion')"
        :placeholder="$t('select.SelectTip')"
        active-color="#40a9ff"
        :options="branchOpts"
        @change="handleChange"
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
  </van-popup>
</template>

<script>
import { formatData } from "@/utils";
import { getChannel } from "@/api/asset";
import { getSaleregionTreelist, getShopList } from "@/api/shop";
import ShopCard from "./ShopCard";
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ShopCard,
  },
  watch: {
    value(visible) {
      this.queryParam.new_branch_id = this.queryParam.new_region_id = void 0;
      this.branchOpts.splice(1);
      this.branch = "";
      this.regionCas = "";
      visible && this.init();
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      regionCas: "",
      page_size: 10,
      page: 1,
      branchVisible: false,
      channelVisible: false,
      branch: "",
      channel: "",
      shopList: [],
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
      queryParam: {
        new_region_id: null,
        new_branch_id: null,
      },
    };
  },
  computed: {
    branchText() {
      return this.branch || this.$t("shopCommon.All");
    },
  },
  methods: {
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      Promise.all([this.initRegionBranch(), this.initChannel()])
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
    /**
     * @param {boolean} refresh
     */
    initShop(param = {}, refresh = false) {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      return getShopList(
        Object.assign(
          {
            itemsperpage: this.page_size,
            page: this.page,
          },
          param
        )
      )
        .then((res) => {
          const { success, data } = res;
          this.loading = false;
          toast && toast.clear();
          if (success) {
            this.shopList = refresh
              ? data.Items
              : [...this.shopList, ...data.Items];
            this.finished = data.TotalItems === this.shopList.length;
            return Promise.resolve(res);
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          this.loading = false;
          toast && toast.clear();
          return Promise.reject();
        });
    },
    onLoad() {
      this.initShop({ page: this.page++, ...this.queryParam });
    },
    showPopup(type) {
      this[`${type}Visible`] = true;
    },
    closePopup() {
      //   this.visible = false;
      this.$emit("input", false);
    },
    // 地区选择弹框异步加载
    handleChange({ value }) {
      console.log(value);
    },
    handleSearch() {
      this.initShop({ page: 1, ...this.queryParam }, true);
    },
    onFinish({ selectedOptions }, type) {
      this[`${type}Visible`] = false;
      const { length } = selectedOptions;
      this.branch = type === "branch" && selectedOptions[length - 1].text;
      let select1st = selectedOptions[0]; // region channel
      let select2nd = selectedOptions[1]; // branch subchannel
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
        this.queryParam.new_channel_id = !select2nd.value
          ? select2nd.value
          : void 0;
      }
      this.handleSearch();
    },
    shopAdded(shop) {
      this.$emit("select", shop);
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  background: #3e86d0;
  color: #fff;
  padding: 10px;
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
.list-container {
  padding: 10px;
}
</style>
<style>
.shop-search .van-search {
  padding: 0;
}
</style>
