<template>
  <div style="padding: 10px">
    <Searchbox @search="handleSearch" />
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      class="list-container"
      :finished-text="$t('shopCommon.NoMoreData')"
    >
      <FACard
        v-for="fa in faList"
        type="edit"
        :key="fa.new_asset_faId"
        :detail="fa"
      />
    </van-list>
  </div>
</template>

<script>
import Searchbox from "./components/Searchbox.vue";
import FACard from "./components/FACard.vue";
import qrMixin from "@/mixins/qrcode";
import { postMineFA } from "@/api/asset";
export default {
  mixins: [qrMixin],
  components: {
    Searchbox,
    FACard,
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      page_size: 10,
      faList: [],
      queryParam: {},
    };
  },
  methods: {
    initFA(param = {}, refresh = false) {
      let toast = this.$toast.loading({
        message: "Loading...",
        duration: 0,
      });
      postMineFA(
        Object.assign(
          {
            itemsperpage: this.page_size,
            page: this.page,
          },
          param
        )
      )
        .then((res) => {
          toast.clear();
          this.loading = false;
          const { success, data } = res;
          if (success) {
            const qrSource = ["new_code", "new_shopcode"]; // 生成QR的源数据
            this.faList = refresh
              ? this.generateQR(data.Items, qrSource)
              : this.generateQR([...this.faList, ...data.Items], qrSource);
            this.finished = data.TotalItems === this.faList.length;
          }
        })
        .catch(() => {
          toast.clear();
          this.loading = false;
        });
    },
    onLoad() {
      this.initFA({ page: this.page++ });
    },
    handleSearch(params) {
      this.queryParam = { ...this.queryParam, ...params };
      this.initFA({ page: 1, ...this.queryParam }, true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/asset_variable.scss";
$leftTriangle: #ccc;
.list-container {
  margin-top: 10px;
}
</style>