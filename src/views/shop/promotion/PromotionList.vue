<template>
  <div>
    <van-tabs v-model="active" @change="tabChange">
      <van-tab v-for="tab in TABS" :key="tab.value" :title="tab.name">
      </van-tab>
    </van-tabs>
    <Searchbox @search="handleSearch" ref="search" />
    <van-empty
      v-if="isEmpty"
      :description="$t('shopCommon.NoMoreData')"
    ></van-empty>
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      :finished-text="$t('shopCommon.NoMoreData')"
      @load="onLoad"
      class="list-container"
    >
      <PromotionCard
        v-for="promotion in promotionList"
        :key="promotion.new_promotionsId"
        :detail="promotion"
        @update="handleUpdate"
        @click.native="
          $router.push({
            name: 'newPromotion',
            query: {
              type: +promotion.new_status === 0 ? 'detail' : 'edit',
              id: promotion.new_promotionsId,
            },
          })
        "
      />
    </van-list>
  </div>
</template>

<script>
import Searchbox from "./components/Searchbox";
import PromotionCard from "./components/PromotionCard";
import { postPromotionList } from "@/api/promotion";
export default {
  data() {
    return {
      TABS: [
        {
          name: this.$t("shopPromotion.MyPromotions"),
          value: 0,
        },
        {
          name: this.$t("shopPromotion.MyShopPromotions"),
          value: 1,
        },
      ],
      active: 0,
      page: 1,
      page_size: 10,
      loading: false,
      finished: false,
      isEmpty: false,
      queryParam: {}, // 保存搜索参数值
      promotionList: [],
    };
  },
  components: {
    Searchbox,
    PromotionCard,
  },
  methods: {
    onLoad() {
      this.initPromotionList({ page: this.page++, ...this.queryParam });
    },
    initPromotionList(param = {}, refresh = false) {
      let toast = this.$toast.loading({
        message: "Loading...",
        duration: 0,
      });
      return postPromotionList({
        page: this.page,
        itemsperpage: this.page_size,
        flag: this.active,
        ...param,
      })
        .then((res) => {
          toast.clear();
          this.loading = false;
          const { success, data } = res;
          if (success) {
            this.promotionList = refresh
              ? data.Items
              : [...this.promotionList, ...data.Items];
            this.finished = data.TotalItems === this.promotionList.length;
            this.isEmpty = this.promotionList.length === 0;
          }
        })
        .catch(() => toast.clear());
    },
    handleUpdate() {
      this.initPromotionList(this.queryParam);
    },
    tabChange(value) {
      this.$refs.search.reset();
      this.initPromotionList({ page: 1, flag: value }, true);
    },
    handleSearch(param) {
      console.log(param);
      this.queryParam = param;
      this.initPromotionList({ page: 1, ...this.queryParam }, true);
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