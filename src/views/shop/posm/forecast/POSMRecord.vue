<template>
  <div class="posm-container">
    <Searchbox @search="handleSearch" :isForecast="true" />
    <van-list
      class="list-container"
      v-model="loading"
      :finished="finished"
      :finished-text="$t('shopCommon.NoMoreData')"
      @load="onLoad"
    >
      <POSMCard
        v-for="(record, index) in recordList"
        :key="record.new_shop_asset_posm_typeId + index"
        :detail="record"
        :actionList="actionList"
        :isForecast="true"
      />
    </van-list>
  </div>
</template>

<script>
import Searchbox from "../components/Searchbox";
import POSMCard from "../components/POSMCard";
import { postPosmRecord } from "@/api/asset";
import { getDict } from "@/api/common";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      page_size: 10,
      recordList: [],
      actionList: [],
      queryParam: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      Promise.all([this.initAction()])
        .then(() => toast.clear())
        .catch(() => toast.clear());
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
    initPosmRecord(param = {}, refresh = false) {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      return postPosmRecord(
        Object.assign(
          { page: this.page, itemsperpage: this.page_size, forcast: 1 },
          param
        )
      )
        .then((res) => {
          const { success, data } = res;
          this.loading = false;
          toast.clear();
          if (success) {
            this.recordList = refresh
              ? data.Items
              : [...this.recordList, ...data.Items];
            this.finished = data.TotalItems === this.recordList.length;
          }
        })
        .catch(() => toast.clear());
    },
    onLoad() {
      this.initPosmRecord({ page: this.page++, ...this.queryParam });
    },
    handleSearch(params) {
      this.queryParam = { ...this.queryParam, ...params };
      this.initPosmRecord({ page: 1, ...this.queryParam }, true);
    },
  },
  components: {
    Searchbox,
    POSMCard,
  },
};
</script>

<style lang="scss" scoped>
.posm-container {
  padding: 10px;
}
</style>