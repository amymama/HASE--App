<template>
  <van-popup
    v-model="visible"
    position="right"
    :style="{
      height: '100%',
      width: '100%',
      background: '#F2F2F2',
    }"
  >
    <div class="flex-layout">
      <div class="flex-layout__header">
        <van-nav-bar
          title="OOD GAP Detail"
          right-text="Add"
          left-arrow
          @click-left="visible = false"
          @click-right="addItem"
        />
      </div>
      <div class="flex-layout__body">
        <div class="gap-box" v-if="list">
          <div class="ood-gap-item" v-for="(item, index) in list" :key="index">
            <van-swipe-cell>
              <div class="ood-gap-item__top">
                <div class="item-competitor">
                  <van-field
                    readonly
                    clickable
                    type="text"
                    v-model="item.new_competitor_name"
                    placeholder="Select Competitor"
                    @click="changeItem(item)"
                  />
                </div>
                <van-stepper
                  :disabled="isView"
                  theme="round"
                  button-size="24px"
                  min="0"
                  max="999"
                  :integer="true"
                  v-model.number="item.new_quantity"
                />
              </div>
              <div class="ood-gap-item__bottom">
                <upload-imgs
                  folder="VisitDisplaySample"
                  prefix="Display"
                  :max="4"
                  :fileList="item.new_urllist"
                  :isTakePhoto="true"
                  :hasWallet="true"
                  :walletText="walletText"
                  :showUploader="!isView"
                  @fileUploadOk="(file) => handleFileUploadOk(file, item)"
                  @fileDelete="(index) => handleFileDelete(index, item)"
                />
              </div>
              <template v-if="!isView" #right>
                <van-button
                  style="height: 100%; margin-left: 2px"
                  square
                  type="danger"
                  text="delete"
                  @click="handleDelete(index)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            value-key="new_name"
            :columns="competitorList"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <div class="flex-layout__footer">
        <van-button
          class="Submit-but"
          square
          block
          color="#2058AB"
          @click="visible = false"
        >
          {{ $t("shopCommon.Submit") }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>
<script>
import UploadImgs from "@/components/UploadImgs";
import { getVisitCompetitorList } from "@/api/shopVisit";

export default {
  name: "OodGapModal",
  components: {
    UploadImgs,
  },
  props: {
    currentCategory: {
      type: Object,
      required: true,
    },
    isView: {
      type: Boolean,
      default: false,
    },
    walletText: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      showPicker: false,
      competitorList: [],
      record: {},
      list: [],
      currentItem: {},
    };
  },
  methods: {
    // Show Modal
    show(item) {
      this.visible = true;
      this.record = item;
      this.list = item.ood_gap;
      if (this.list.length == 0) {
        this.addItem();
      }
      this.handleGetCompetitor();
    },
    changeItem(item) {
      if (!this.isView) {
        this.currentItem = item;
        this.showPicker = true;
      }
    },
    handleGetCompetitor() {
      const { new_product_category_id } = this.currentCategory;
      this.$toast.loading({ duration: 0, forbidClick: true });
      getVisitCompetitorList().then((res) => {
        const { success, data } = res;
        if (success) {
          this.$toast.clear();
          // get models
          this.competitorList = [];
          data.Items.map((nitem) => {
            if (nitem.new_product_category_id == new_product_category_id) {
              this.competitorList.push(nitem);
            }
          });
        }
      });
    },
    addItem() {
      if (!this.isView) {
        const { new_asset_faid, new_code } = this.record;
        this.list.push({
          new_urllist: [],
          new_asset_fa_id: new_asset_faid,
          new_asset_fa_code: new_code,
          new_quantity: 0,
          new_competitor_id: "",
          new_competitor_name: "",
        });
      }
    },
    // delete item
    handleDelete(index) {
      this.list.splice(index, 1)
    },
    // UPLOAD IMGS
    handleFileUploadOk(file, item) {
      item.new_urllist.push({
        new_download_url: file.url,
        new_keyword: "",
        new_description: "",
        new_type: "",
        new_filename: file.name,
        new_filesize: 0,
      });
    },
    // DELETE IMG
    handleFileDelete(index, item) {
      item.new_urllist.splice(index, 1);
    },
    onConfirm(value) {
      this.currentItem.new_competitor_id = value.new_competitorid || "";
      this.currentItem.new_competitor_name = value.new_name || "";
      this.showPicker = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.ood-gap-item {
  background: #fff;
  margin-bottom: 15px;
  padding-bottom: 10px;
  .ood-gap-item__top {
    display: flex;
    align-items: center;
    padding-right: 20px;
    .item-competitor {
      flex: 1;
    }
  }
  .ood-gap-item__bottom {
    padding-left: 20px;
  }
}
</style>