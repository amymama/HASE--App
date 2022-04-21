<template>
  <div class="history-step1">
    <van-empty v-if="list.length == 0" :description="$t('shopCommon.NoData')" />
    <div class="step1-item" v-for="(item, index) in list" :key="index">
      <h2 class="item-asset-code">
        <van-image
          width=".7rem"
          height=".7rem"
          style="margin-right: 12px"
          :src="item.new_fa_url"
          @click="viewShopImgs(item)"
        />
        <router-link
          :to="{
            name: 'newFA',
            query: {
              id: item.new_asset_fa_id,
              facode: item.new_asset_fa_code,
            },
          }"
        >
          {{ item.new_code }}
        </router-link>
      </h2>
      <div class="item-asset-imgs">
        <upload-imgs :fileList="item.new_urllist" :showUploader="false" />
      </div>
      <div class="item-asset-status">
        <van-row type="flex">
          <van-col :span="20">
            <van-radio-group
              v-model="item.new_fa_status"
              direction="horizontal"
              disabled
            >
              <van-radio class="fa-status-item" :name="1">{{
                $t("shopVisit.Good")
              }}</van-radio>
              <van-radio class="fa-status-item" :name="2">{{
                $t("shopVisit.NeedFix")
              }}</van-radio>
              <van-radio class="fa-status-item" :name="3">{{
                $t("shopVisit.Scrap")
              }}</van-radio>
              <van-radio class="fa-status-item" :name="4">{{
                $t("shopVisit.Lost")
              }}</van-radio>
            </van-radio-group>
          </van-col>
          <van-col :span="4">
            <van-tag type="primary" v-if="item.new_byscan">by scan</van-tag>
          </van-col>
        </van-row>
      </div>
      <div class="item-asset-remark">
        <van-field
          disabled
          v-model="item.new_remark"
          rows="2"
          autosize
          type="textarea"
          maxlength="200"
          show-word-limit
        />
      </div>
    </div>
    <!-- STEP1 ITEM END -->
    <!-- PREV IMGS -->
    <prev-imgs ref="prevImgs" :imgs="imgs" />
  </div>
</template>
<script>
import { getFainspectDetail } from "@/api/shopVisit";
import UploadImgs from "@/components/UploadImgs";
import PrevImgs from "@/components/PrevImgs";

export default {
  name: "VisitStep1",
  components: {
    UploadImgs,
    PrevImgs,
  },
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      query: {},
      new_visit_fa_inspectid: "",
      list: [],
      imgs: [],
    };
  },
  created() {
    this.handleGetDetail();
  },
  methods: {
    // PREV SHOP IMGS
    viewShopImgs(record) {
      this.imgs = record.new_fa_url ? [record.new_fa_url] : [];
      if (this.imgs.length > 0) {
        this.$refs.prevImgs.show(0);
      } else {
        this.$toast("No image!");
      }
    },
    // get shop asset detail
    handleGetDetail() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getFainspectDetail({
        new_visit_fa_inspect_id: this.id,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          this.$toast.clear();
          const items = data.Items;
          this.list = [];
          items.new_itemlist.map((item) => {
            this.list.push({
              new_urllist: item.new_item_urllist,
              new_fa_url:
                item.new_fa_urllist.length > 0
                  ? item.new_fa_urllist[0].new_download_url
                  : "",
              new_asset_fa_id: item.new_asset_fa_id,
              new_code: item.new_asset_fa_code,
              new_fa_status: item.new_fa_status,
              new_byscan: item.new_byscan,
              new_remark: item.new_remark,
            });
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.history-step1 {
  .step1-item {
    background: #fff;
    padding: 24px;
    padding-right: 8px;
    margin-bottom: 24px;
    .item-asset-code {
      display: flex;
      align-items: center;
      font-size: $font28;
      color: #169bd5;
      margin-bottom: 24px;
      font-weight: bold;
      a {
        color: #169bd5;
      }
    }
    .item-asset-imgs {
      margin-bottom: 24px;
    }
    .item-asset-status {
      margin-bottom: 24px;
      .fa-status-item {
        font-size: $font24;
        margin-bottom: 12px;
        margin-right: 6px;
      }
    }
    .item-asset-remark {
      border: 1px solid #eee;
    }
  }
}
</style>