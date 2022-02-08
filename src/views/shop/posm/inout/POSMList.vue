<template>
  <div class="posm-container">
    <SelectShopRow
      v-show="Object.keys(shopItem).length"
      :shopItem="shopItem"
      @select="handleShopSelect"
    />
    <SearchboxList @search="handleSearch" />
    <van-list
      class="list-container"
      v-model="loading"
      :finished="finished"
      :finished-text="$t('shopCommon.NoMoreData')"
      @load="onLoad"
    >
      <POSMListItem
        v-for="posm in posmList"
        :key="posm.new_asset_posmId"
        :posm="posm"
        :shopItem="shopItem"
        :actionList="actionList"
        :callback="afterInputNumber"
      />
    </van-list>
  </div>
</template>

<script>
import SelectShopRow from "@/components/SelectShop";
import SearchboxList from "../components/SearchboxList";
import POSMListItem from "../components/POSMListItem";
import { getShopList } from "@/api/shop";
import { postPosmList, getInoutCount } from "@/api/asset";
import { getEntityConditions, getDict } from "@/api/common";
export default {
  data() {
    return {
      test: 0,
      page: 0,
      page_size: 10,
      loading: false,
      finished: false,
      dialogVisible: false, // 弹框Visible
      shopVisible: false,
      shopItem: {}, // 店铺信息
      subOpts: [],
      posmList: [],
      actionList: [], // 用户操作类型
      queryParam: {}, // 临时保存查询参数
    };
  },
  components: {
    SelectShopRow,
    SearchboxList,
    POSMListItem,
  },
  watch: {
    shopItem(shop) {
      this.$emit("getShop", shop);
    },
  },
  created() {
    this.init();
  },
  methods: {
    afterInputNumber() {
      this.initInoutCount();
      this.onLoad(true);
    },
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      const { query } = this.$route;
      if (Object.keys(query).length > 0) {
        this.shopItem = query;
      }
      Promise.all([this.initAction(), this.initSubcategory()])
        .then(() => {
          toast.clear();
        })
        .catch(() => toast.clear());
    },
    initShop() {
      return getShopList({
        itemsperpage: 10,
        page: 1,
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { length } = data.Items;
            if (length > 0) {
              const randomIndex = Math.floor(Math.random() * length);
              this.shopItem = data.Items[randomIndex];
              this.initInoutCount();
            }
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
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
                name: item.new_name,
                value: item.new_asset_categoryId,
              })
            );
            this.subOpts = subOpts;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    async initPOSMList(param = {}, refresh = false) {
      const callback = () => {
        this.page = refresh ? 1 : this.page + 1;
        let toast = this.$toast.loading({
          message: "Loading...",
          forbidClick: true,
          duration: 0,
        });
        postPosmList(
          Object.assign(
            {
              page: this.page,
              itemsperpage: this.page_size,
              forcast: 0,
              new_shop_id: this.shopItem.new_shopid,
            },
            param
          )
        )
          .then((res) => {
            this.loading = false;
            const { success, data } = res;
            if (success) {
              data.Items.forEach((item) => {
                item.loading = false;
              });
              this.posmList = refresh
                ? data.Items
                : [...this.posmList, ...data.Items];
              this.finished = data.TotalItems === this.posmList.length;
            }
          })
          .finally(() => {
            this.loading = false;
            toast.clear();
          });
      };
      if (this.shopItem.new_shopid) {
        this.initInoutCount();
        callback();
      } else {
        await this.initShop();
        callback();
      }
    },
    initAction() {
      return getDict({ key: "AssetPosmInOutType" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.actionList = data.Items;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initInoutCount() {
      return getInoutCount({
        forcast: 0,
        new_shop_id: this.shopItem.new_shopid,
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            // 派发getCount事件给routerView
            this.$emit("getCount", data);
            return Promise.resolve();
          }
          return Promise.reject();
        })
        .catch(() => Promise.reject());
    },
    onLoad(refresh = false) {
      this.initPOSMList(
        {
          ...this.queryParam,
        },
        refresh
      );
    },
    handleSearch(params) {
      this.queryParam = {
        ...this.queryParam,
        ...params,
      };
      this.initPOSMList({ ...this.queryParam }, true);
    },
    handleShopSelect(shop) {
      this.shopItem = shop;
      this.initInoutCount();
      this.initPOSMList({ new_shop_id: shop.new_shopid }, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  padding: 10px;
}
</style>