<template>
  <div class="history-step2">
    <div class="step2-content">
      <!-- PRODUCT CATEGORY -->
      <product-category
        :list="categorys"
        @changeCategroy="handleChangeCategroy"
      />
      <!-- SHOP STATISTICS -->
      <shop-statistics
        :record="currentCategory"
        :new_max_display_quantity="new_max_display_quantity"
        :new_ood_quantity="new_ood_quantity"
      />
      <!-- ACTION-STEPS -->
      <div class="action-steps">
        <div
          class="action-step-item"
          :class="{ 'action-step-item-active': index == stepActive }"
          v-for="(item, index) in stepList"
          :key="index"
          @click="stepActive = index"
        >
          {{ item }}
        </div>
      </div>
      <!-- PRODUCT SUB-CATEGORY -->
      <div v-if="stepActive == 0">
        <div
          class="visit-step2-1"
          v-if="currentCategory.subList && currentCategory.subList.length > 0"
        >
          <div class="models-item standard-models">
            <h3>Standard Models</h3>
            <div class="models-item-con">
              <div v-for="(sitem, sindex) in currentCategory.subList">
                <model-item
                  v-for="(item, index) in sitem.standardmodels"
                  :record="item"
                  :key="index"
                />
              </div>
            </div>
          </div>
          <div class="models-item other-models">
            <h3>Other Models</h3>
            <div class="models-item-con">
              <div v-for="(sitem, sindex) in currentCategory.subList">
                <model-item
                  v-for="(item, index) in sitem.othermodels"
                  :record="item"
                  :key="index"
                />
              </div>
            </div>
          </div>
          <div
            class="display-imgs"
            v-if="currentCategory.new_urllist.length > 0"
          >
            <upload-imgs
              folder="VisitDisplaySample"
              :max="4"
              :fileList="currentCategory.new_urllist"
              :showUploader="false"
            />
          </div>
          <div class="display-remark" v-if="currentCategory.new_remark">
            <van-field
              v-model="currentCategory.new_remark"
              rows="2"
              autosize
              disabled
              type="textarea"
              maxlength="200"
              show-word-limit
            />
          </div>
        </div>
      </div>
      <div v-if="stepActive == 1">
        <div class="visit-step2-1">
          <div class="booth-models">
            <van-cell title="Sample not in Booth" />
            <div class="booth-models__body">
              <template v-for="(item, index) in boothModels">
                <div
                  class="booth-model-item"
                  :key="index"
                  v-if="
                    item.new_quantity > 0 &&
                    item.new_product_category_id ==
                      currentCategory.new_product_category_id
                  "
                >
                  <van-badge :content="item.new_quantity">
                    <div class="booth-model-item__inner">
                      <span>{{ item.new_model_name }}</span>
                    </div>
                  </van-badge>
                </div>
              </template>
            </div>
          </div>
          <div class="booth-models" v-if="boothList.length > 0">
            <div class="booth-models-record"
              v-for="(item, index) in boothList"
              :key="index">
              <van-cell-group>
                <van-cell>
                  <template #title>
                    <div class="booth-models__title">
                      <span>{{ item.new_code }}</span>
                      <span>
                        Max: <em>{{ item.new_fa_max_quantity }}</em>
                      </span>
                      <span @click="$refs.oodGapItem.show(item)">
                        OOD: <em>{{ item.new_fa_ood_quantity }}</em>
                      </span>
                    </div>
                  </template>
                </van-cell>
              </van-cell-group>
              <div class="booth-models__body">
                <template v-for="(item0, index0) in item.data">
                  <div class="booth-model-item" :key="index0">
                    <van-badge :content="item0.new_quantity">
                      <div class="booth-model-item__inner">
                        <span>{{ item0.new_model_name }}</span>
                      </div>
                    </van-badge>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <ood-gap-modal
          ref="oodGapItem"
          :currentCategory="currentCategory"
          :isView="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCategory from "./ProductCategory";
import ShopStatistics from "./ShopStatistics";
import UploadImgs from "@/components/UploadImgs";
import ModelItem from "./ModelItemDetail";
import OodGapModal from "./OodGapModal";
import { getShopProductCategory } from "@/api/shop";
import { getDisplaySampleDetail, getDisplayModels } from "@/api/shopVisit";

export default {
  name: "VisitStep2",
  components: {
    ProductCategory,
    ShopStatistics,
    UploadImgs,
    ModelItem,
    OodGapModal
  },
  props: {
    totalId: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      stepActive: 0,
      stepList: ["Firstly display models", "Secondly move models to booth"],
      visitList: [],
      categorys: [],
      currentCategoryIndex: 0,
      currentSubCategoryIndex: 0,
      currentCategory: {},
      currentSubCategory: {},
      // step2
      boothList: [],
      boothModels: [],
      // base
      new_max_display_quantity: 0,
      new_ood_quantity: 0,
    };
  },
  created() {
    this.query = this.$route.query;
    this.handleGetDetail();
  },
  methods: {
    // group by gap qty
    groupByArr(arr) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.new_asset_fa_code]) {
          dest.push({
            new_code: ai.new_asset_fa_code,
            new_asset_fa_id: ai.new_asset_fa_id,
            new_fa_ood_quantity: ai.new_fa_ood_quantity,
            new_fa_max_quantity: ai.new_fa_max_quantity,
            data: [ai],
            ood_gap: []
          });
          map[ai.new_asset_fa_code] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.new_code == ai.new_asset_fa_code) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    // get detail
    handleGetDetail() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getDisplaySampleDetail({
        new_visit_total_id: this.query.new_visit_totalid,
      })
        .then((res) => {
          this.$toast.clear();
          const { success, data } = res;
          if (success) {
            var items = data.Items;
            this.visitList = items;
            this.handleGetCategory();
            this.new_max_display_quantity = items.total.new_shop_totalbooth_max_quantity || 0
            this.new_ood_quantity = items.total.new_shop_total_ood_quantity || 0
          }
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    // GET DISPLAY MODALS
    handleGetDisplayModels() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getDisplayModels({
        new_shop_id: this.query.new_shopid,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          this.$toast.clear();
          var Items = data.Items;
          // get category models
          this.displayList.map((item) => {
            if (item.subList.length > 0) {
              item.subList.map((nitem) => {
                Items.standardmodels.map((mitem) => {
                  if (
                    nitem.new_product_category_id ===
                    mitem.new_product_subcategory_id
                  ) {
                    nitem.new_target_quantity = mitem.new_target_quantity || 0;
                  }
                });
              });
            }
          });
        }
      });
    },
    // get categorys
    handleGetCategory() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getShopProductCategory().then((res) => {
        const { success, data } = res;
        if (success) {
          this.$toast.clear();
          this.categorys = data.Items;
          this.displayList = [];
          this.categorys.map((item) => {
            var new_sub_list = [];
            if (item.children.length > 0) {
              item.children.map((subitem) => {
                new_sub_list.push({
                  new_parentid: subitem.new_parentid,
                  new_product_category_id: subitem.new_product_category_id,
                  new_code: "",
                  new_name_en: subitem.new_name_en,
                  standardmodels: [],
                  othermodels: [],
                });
              });
            }
            this.displayList.push({
              new_visit_display_categoryid: "",
              new_code: "",
              new_target_quantity: 0,
              new_actual_quantity: 0,
              new_gap_quantity: 0,
              new_total_quantity: 0,
              new_max_display_quantity: 0,
              new_ood_quantity: 0,
              new_oos_quantity: 0,
              new_hiend_percent: 0,
              new_product_category_id: item.new_product_category_id,
              new_product_display_target: "",
              new_product_display_target_code: "",
              new_shop_id: this.query.new_shopid,
              new_visit_total_id: this.query.new_visit_total_id,
              new_urllist: [],
              new_remark: "",
              new_name: item.new_name_en,
              new_status: 0,
              subList: new_sub_list,
            });
          });
          this.currentCategory = this.displayList[this.currentCategoryIndex];
          this.currentSubCategory =
            this.displayList[this.currentCategoryIndex].subList[
              this.currentSubCategoryIndex
            ];
          this.handleGetStepDetail();
          this.handleGetBooths();
          this.handleGetDisplayModels();
        }
      });
    },
    handleGetStepDetail() {
      this.displayList.map((item) => {
        this.visitList.new_diaplay_category.map((vitem) => {
          if (item.new_product_category_id == vitem.new_product_category_id) {
            item.new_target_quantity = vitem.new_target_quantity;
            item.new_actual_quantity = vitem.new_actual_quantity;
            item.new_total_quantity = vitem.new_total_quantity;
            item.new_gap_quantity = vitem.new_gap_quantity;
            item.new_max_display_quantity = vitem.new_max_display_quantity;
            item.new_ood_quantity = vitem.new_ood_quantity;
            item.new_oos_quantity = vitem.new_oos_quantity;
            item.new_urllist = vitem.new_urllist;
            item.new_remark = vitem.new_remark;
            if (item.subList.length > 0) {
              item.subList.map((nitem) => {
                vitem.new_model_records.map((mitem) => {
                  if (
                    nitem.new_product_category_id ===
                    mitem.new_product_subcategory_id
                  ) {
                    if (mitem.new_model_type == 1) {
                      nitem.standardmodels.push(mitem);
                    } else {
                      nitem.othermodels.push(mitem);
                    }
                  }
                });
              });
            }
          }
        });
      });
    },
    // get booths
    handleGetBooths() {
      this.boothList = this.groupByArr(this.visitList.new_modelbooth_records);
      // get booth models
      var visitList = JSON.parse(JSON.stringify(this.visitList));
      this.boothModels = [];
      visitList.new_diaplay_category.map((item) => {
        if (item.new_model_records.length > 0) {
          item.new_model_records.map((nitem) => {
            nitem.count = nitem.new_quantity;
            this.boothModels.push(nitem);
          });
        }
      });
      // Sample not in Booth
      var list = [];
      this.boothList.length > 0 && this.boothList.map((item) => {
        item.data.map((nitem) => {
          list.push(nitem);
        });
        if (visitList.new_oods.length > 0) {
          visitList.new_oods.map((nitem) => {
            if (item.new_asset_fa_id == nitem.new_asset_fa_id) {
              item.ood_gap.push(nitem);
            }
          });
        }
      });
      if (list.length > 0 && this.boothModels.length > 0) {
        this.boothModels.map((bitem) => {
          var count = 0;
          list.map((item) => {
            if (bitem.new_model_id == item.new_model_id) {
              count += item.new_quantity;
            }
          });
          bitem.new_quantity = bitem.count - count;
        });
      }
    },
    // CHANGE CATEGORY
    handleChangeCategroy(index) {
      this.currentCategoryIndex = index;
      this.currentSubCategoryIndex = 0;
      this.currentCategory = this.displayList[this.currentCategoryIndex];
      this.currentSubCategory =
        this.displayList[this.currentCategoryIndex].subList[
          this.currentSubCategoryIndex
        ];
    },
    // CHANGE SUB-CATEGORY
    handleChangeSubcate(type, len) {
      if (type === "left") {
        this.currentSubCategoryIndex > 0 ? this.currentSubCategoryIndex-- : 0;
      } else {
        this.currentSubCategoryIndex < len
          ? this.currentSubCategoryIndex++
          : len;
      }
      this.currentSubCategory =
        this.currentCategory.subList[this.currentSubCategoryIndex];
    },
  },
};
</script>
<style lang="scss" scoped>
.history-step2 {
  .action-steps {
    display: flex;
    .action-step-item {
      flex: 1;
      background: #a4e3ff;
      color: #333;
      height: 60px;
      line-height: 60px;
      margin-right: 29px;
      position: relative;
      text-indent: 6px;
      white-space: nowrap;
      &::after {
        content: "";
        background: #027db4;
        position: absolute;
        right: -29px;
        top: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 30px 0 30px 30px;
        border-color: transparent transparent transparent #a4e3ff;
      }
      &:last-child {
        &::after {
          background: none;
        }
      }
    }
    .action-step-item-active {
      background: #027db4;
      color: #fff;
      &::after {
        background: #a4e3ff;
        border-color: transparent transparent transparent #027db4;
      }
    }
  }
  .display-imgs {
    padding: 12px;
    background: #fff;
    margin-bottom: 24px;
  }
  // PRODUCT SUB-CATEGORY
  .subcate-change {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .subcate-change__arrow {
      padding: 15px;
    }
    .arrow-left {
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 18px 24px 18px 0;
      border-color: transparent #169bd5 transparent transparent;
    }
    .arrow-right {
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 18px 0 18px 24px;
      border-color: transparent transparent transparent #169bd5;
    }
    .subcate-change__name {
      flex: 1;
      text-align: center;
      font-size: $font32;
    }
    .subcate-change__total {
      padding: 0 12px;
      span {
        color: #027db4;
      }
    }
  }
  .visit-step2-1 {
    padding: 16px;
  }
  .models-item {
    margin-bottom: 24px;
    .models-item-con {
      background: #fff;
      min-height: 60px;
      margin-top: 12px;
      padding: 10px;
      border-radius: 12px;
      font-size: 0;
      .gap {
        margin-bottom: 10px;
        font-size: $font24;
        text-align: right;
      }
    }
  }

  .booth-models {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
    .booth-models__title {
      display: flex;
      justify-content: space-between;
      color: #1976d2;
      font-size: $font24;
      em {
        font-style: normal;
        font-weight: bold;
        font-size: $font28;
        color: #ee0a24;
      }
    }
    .booth-models__body {
      min-height: 60px;
      padding: 24px 12px;
      .booth-model-item {
        display: inline-block;
        margin-right: 24px;
        margin-bottom: 24px;
        .booth-model-item__inner {
          display: flex;
          align-items: center;
          background: #1976d2;
          color: #fff;
          padding: 0 24px;
          height: 60px;
          line-height: 60px;
          border-radius: 30px;
        }
      }
    }
  }
}
</style>