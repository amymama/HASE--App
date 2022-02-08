<template>
  <div>
    <SelectShopRow
      v-show="Object.keys(shopItem).length"
      :shopItem="shopItem"
      @select="handleShopSelect"
    />
    <SearchboxList @search="handleSearch" />
    <div class="list-container" v-if="draftList.length > 0">
      <van-checkbox :value="isCheckAll" @click="checkAll" class="check-all">{{
        $t("shopVisitPlan.SelectAll")
      }}</van-checkbox>
      <div
        class="clearfix"
        v-for="(draft, index) in draftList"
        :key="draft.new_asset_posmId + index"
      >
        <van-checkbox
          :value="checkList.includes(draft.new_shop_asset_posm_typeId)"
          @click="checkItem(draft)"
          class="check-item"
        />
        <InOutCard
          class="list-item_card"
          :shopItem="shopItem"
          :detail="draft"
          :actionList="actionList"
        />
      </div>
    </div>
    <van-row class="action-btn" v-if="draftList.length">
      <van-col :span="12">
        <van-button
          :disabled="checkList.length === 0"
          @click="handleDelete"
          block
          type="info"
          :loading="loading"
          >Delete</van-button
        >
      </van-col>
      <van-col :span="12">
        <van-button @click="handleSubmit" block type="info" :loading="loading"
          >Submit</van-button
        >
      </van-col>
    </van-row>

    <van-empty :description="$t('shopCommon.NoMoreData')" v-else></van-empty>
  </div>
</template>
<script>
import SelectShopRow from "@/components/SelectShop";
import SearchboxList from "../components/SearchboxList";
import InOutCard from "../components/InOutCard";
import { getInoutDraft, postSubmitPosm, postDeletePosm } from "@/api/asset";
import { getDict } from "@/api/common";
export default {
  props: {
    shopItem: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    SelectShopRow,
    SearchboxList,
    InOutCard,
  },
  data() {
    return {
      page: 1,
      page_size: 10,
      loading: false,
      draftList: [],
      actionList: [],
      checkList: [],
    };
  },
  watch: {
    shopItem(shop) {
      this.$emit("getShop", shop); // 向父组件index.vue发送shop数据用来做回退操作
      this.init();
    },
  },
  computed: {
    isCheckAll() {
      return this.checkList.length === this.draftList.length;
    },
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
      Promise.all([this.initAction(), this.initDraft()])
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
    initDraft(param = {}) {
      return getInoutDraft({
        page: this.page,
        itemsperpage: this.page_size,
        shop_id: this.shopItem.new_shopid,
        forcast: 0,
        ...param,
      }).then((res) => {
        this.loading = false;
        const { success, data } = res;
        if (success) {
          this.draftList = data;
        }
      });
    },
    handleSearch(param) {
      this.initDraft({
        page: this.page,
        itemsperpage: this.page_size,
        ...param,
      });
    },
    handleShopSelect(shop) {
      this.$router.push({
        name: "PosmInOut",
        query: shop,
      });
    },
    handleSubmit() {
      this.loading = true;
      const result = [];
      this.draftList.forEach((draft) => {
        const {
          option_anount,
          new_shop_asset_posm_typeId,
          new_asset_posm_inout_type,
          new_shop_asset_posmId,
        } = draft;
        result.push({
          new_asset_posm_inout_amount: option_anount,
          new_shop_asset_posm_type_id: new_shop_asset_posm_typeId,
          new_asset_posm_inout_type,
          new_shop_asset_posmId,
          posmtypephoto: draft.picturebyuserli,
        });
      });
      postSubmitPosm(result)
        .then((res) => {
          this.loading = false;
          const { success } = res;
          if (success) {
            this.$toast.success("Success");
            this.$router.push({ name: "PosmList", query: this.shopItem });
          } else {
            this.$toast.fail("Error");
          }
        })
        .catch(() => {
          this.loading = false;
          this.$toast.fail("Error");
        });
      // console.log(this.draftList);
    },
    handleDelete() {
      this.loading = true;
      postDeletePosm(this.checkList)
        .then((res) => {
          const { success } = res;
          if (success) {
            this.initDraft();
            this.checkList.splice(0);
            this.$toast.success("Success");
          } else {
            this.$toast.fail("Error");
          }
        })
        .catch(() => {
          this.$toast.fail("Error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    checkItem(draft) {
      console.log(draft);
      const targetValue = draft.new_shop_asset_posm_typeId;
      const existIndex = this.checkList.findIndex(
        (typeId) => typeId === targetValue
      );
      if (existIndex > -1) {
        this.checkList.splice(existIndex, 1);
      } else {
        this.checkList.push(targetValue);
      }
    },
    checkAll() {
      if (this.isCheckAll) {
        this.checkList.splice(0);
      } else {
        this.checkList.splice(0);
        this.draftList.forEach((item) => {
          this.checkList.push(item.new_shop_asset_posm_typeId);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  padding: 10px;
  height: calc(100vh - 6rem);
  overflow-y: auto;
  .check-all {
    margin-bottom: 20px;
  }
  .check-item {
    float: left;
    margin-right: 15px;
  }
  .list-item_card {
    float: left;
    width: 90%;
  }
}
.action-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>