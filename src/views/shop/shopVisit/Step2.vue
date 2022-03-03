<template>
  <div class="flex-layout visit-step2">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar left-arrow @click-left="goBack" title="Display sample" />
      <!-- SHOP HEADER -->
      <shop-header :shopInfo="query" />
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
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="flex-layout__body page-content">
      <!-- STEP1 -->
      <div class="step2-content">
        <!-- PRODUCT SUB-CATEGORY -->
        <div v-if="stepActive == 0">
          <template
            v-if="currentCategory.subList && currentCategory.subList.length > 0"
          >
            <div class="visit-step2-1">
              <div class="display-imgs">
                <upload-imgs
                  folder="VisitDisplaySample"
                  prefix="Display"
                  :max="4"
                  :fileList="currentCategory.new_urllist"
                  :isTakePhoto="true"
                  :hasWallet="true"
                  :walletText="walletText"
                  :showUploader="new_process == 1"
                  @fileUploadOk="handleFileUploadOk"
                  @fileDelete="handleFileDelete"
                />
              </div>
              <div class="display-remark">
                <van-field
                  v-model="currentCategory.new_remark"
                  rows="2"
                  autosize
                  type="textarea"
                  :disabled="new_process != 1"
                  maxlength="200"
                  :placeholder="$t('shopVisit.Remark')"
                  show-word-limit
                />
              </div>
              <div class="action-panel-item action-panel" style="margin-top: 10px">
                <div class="filter-search">
                  <van-search
                    style="padding: 0; border: 1px solid #EEE;"
                    v-model="modelFilter.keyword"
                    placeholder="search" />
                </div>
                <div class="only-continue">
                  <van-icon name="filter-o" @click="$refs.filterModel.show()" />
                </div>
                <div class="pop-guide">
                  <router-link :to="{ name: 'Product' }">POP Guide</router-link>
                </div>
              </div>
              <div class="models-item standard-models">
                <van-row type="flex" align="center">
                  <van-col span="12">
                    <h3>{{ $t("shopVisit.StandardModels") }}</h3>
                  </van-col>
                  <van-col span="12" :style="{ textAlign: 'right', padding: '10px 0' }">
                    <span :class="{ isactive: isSMDisplayed }" @click="handleDisplayed(1)">Displayed Only</span>
                  </van-col>
                </van-row>
                <div class="models-item-con">
                  <div v-for="(sitem, sindex) in currentCategory.subList" :key="sindex">
                    <div
                      class="models-group"
                      v-for="(
                        oitem, oindex
                      ) in sitem.standardmodelsGroup"
                      :key="oindex"
                    >
                      <model-item
                        v-for="(item, index) in oitem.data"
                        :record="item"
                        :key="index"
                        :activeModel="activeModel"
                        :modelFilter="modelFilter"
                        :isSMDisplayed="isSMDisplayed"
                        :isOMDisplayed="isOMDisplayed"
                        @modelSelected="
                          () => handleModelSelected(item, index, oitem.data)
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="models-item other-models">
                <van-row type="flex" align="center">
                  <van-col span="12">
                    <h3>{{ $t("shopVisit.OtherModels") }}</h3>
                  </van-col>
                  <van-col span="12" :style="{ textAlign: 'right', padding: '10px 0' }">
                    <span :class="{ isactive: isOMDisplayed }" @click="handleDisplayed(2)">Displayed Only</span>
                  </van-col>
                </van-row>
                <div class="models-item-con">
                  <div v-for="(sitem, sindex) in currentCategory.subList" :key="sindex">
                    <model-item
                      v-for="(item, index) in sitem.othermodels"
                      :record="item"
                      :key="index"
                      :activeModel="activeModel"
                      :modelFilter="modelFilter"
                      :isSMDisplayed="isSMDisplayed"
                      :isOMDisplayed="isOMDisplayed"
                      @modelSelected="
                        () =>
                          handleModelSelected(
                            item,
                            index,
                            sitem.othermodels
                          )
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
            <filter-model ref="filterModel" :currentCategory="currentCategory" @ok="filterModelOk" />
          </template>
        </div>
        <div v-if="stepActive == 1">
          <div class="visit-step2-1">
            <div class="booth-models">
              <van-cell-group inset @click="handleShowMoveToBooth">
                <van-cell
                  title="Sample not in Booth"
                  :value="$t('shopVisit.MoveTo')"
                  is-link
                />
              </van-cell-group>
              <div class="booth-models__body">
                <template v-for="(item, index) in boothModels">
                  <div
                    class="booth-model-item"
                    :key="index"
                    :class="{
                      listed: item.new_mdm_delisted == 0,
                      delisted: item.new_mdm_delisted == 1,
                    }"
                    v-if="
                      item.new_quantity > 0 &&
                      item.new_product_category_id == currentCategory.new_product_category_id
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
            <div class="booth-models">
              <div
                class="booth-models-record"
                v-for="(item, index) in boothList"
                :key="index"
              >
                <van-cell-group>
                  <van-cell>
                    <template #title>
                      <div class="booth-models__title">
                        <span>{{ item.new_code }}</span>
                        <span>
                          Max:
                          <em>{{ item.new_max_display_quantity }}</em>
                        </span>
                        <span @click="$refs.oodGapItem.show(item)">
                          OOD: <em>{{ item.new_ood_quantity }}</em>
                        </span>
                      </div>
                    </template>
                  </van-cell>
                </van-cell-group>
                <div class="booth-models__body">
                  <template v-for="(item0, index0) in item.list">
                    <div
                      class="booth-model-item"
                      :class="{
                        listed: item0.new_mdm_delisted == 0,
                        delisted: item0.new_mdm_delisted == 1,
                      }"
                      :key="index0"
                    >
                      <van-badge :content="item0.new_quantity">
                        <div class="booth-model-item__inner">
                          <van-icon
                            v-if="!isView"
                            name="clear"
                            @click="
                              handleDeleteBoothModel(item.list, item0, index0)
                            "
                          />
                          <span>{{ item0.new_model_name }}</span>
                        </div>
                      </van-badge>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <move-to-booth
            :boothList="boothList"
            ref="moveToBooth"
            @ok="moveToBoothOk"
          />
          <ood-gap-modal
            ref="oodGapItem"
            :currentCategory="currentCategory"
            :isView="isView"
            :walletText="walletText"
          />
        </div>
      </div>
    </div>
    <!-- FOOTER ACTIONS -->
    <div class="flex-layout__footer">
      <template v-if="new_process == 2">
        <div class="item" v-if="stepActive == 1" @click="stepActive = 0">
          <van-button block square color="#5A9CE0"> Back Firstly </van-button>
        </div>
        <div class="item" v-if="stepActive == 0" @click="stepActive = 1">
          <van-button block square color="#5A9CE0"> Go Secondly </van-button>
        </div>
      </template>
      <template v-if="stepActive == Number(new_process) - 1 && !isView">
        <div class="item">
          <van-button
            square
            block
            color="#407FDC"
            :loading="saveLoading"
            @click="handleSubmit(1)"
          >
            {{ $t("shopCommon.Save") }}
          </van-button>
        </div>
        <div class="item" v-if="stepActive == Number(new_process) - 1">
          <van-button
            square
            block
            color="#2058AB"
            :loading="submitLoading"
            @click="handleSubmit(3)"
          >
            {{ $t("shopCommon.Submit") }}
          </van-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ShopHeader from "./components/ShopHeader";
import ProductCategory from "./components/ProductCategory";
import ShopStatistics from "./components/ShopStatistics";
import MoveToBooth from "./components/MoveToBooth";
import OodGapModal from "./components/OodGapModal";
import ModelItem from "./components/ModelItem";
import UploadImgs from "@/components/UploadImgs";
import FilterModel from "./components/FilterModel.vue";
import { getShopProductCategory } from "@/api/shop";
import {
  getDisplayModels,
  getDisplayBooths,
  postDisplaySampleModeloperation,
  postDisplaySampleBoothoperation,
  getDisplaySampleDetail,
} from "@/api/shopVisit";

export default {
  name: "VisitStep2",
  components: {
    ShopHeader,
    ProductCategory,
    ShopStatistics,
    MoveToBooth,
    ModelItem,
    UploadImgs,
    FilterModel,
    OodGapModal,
  },
  data() {
    return {
      walletText: "",
      isSave: false,
      visitList: [],
      showPopover: false,
      // model filter
      modelFilter: {
        keyword: "",
        new_model_type_filter: "",
        new_mdm_delisted: "",
        new_mdm_brand_name: "",
        new_product_category: '',
        isoos: "",
        ispop: ""
      },
      // step list
      stepActive: 0,
      stepList: [
        this.$t("shopVisit.Firstly"),
        this.$t("shopVisit.Secondley")
      ],
      // product data
      categorys: [],
      currentCategoryIndex: 0,
      currentCategory: {},
      new_max_display_quantity: 0,
      new_ood_quantity: 0,
      // active modal
      activeModel: {
        new_model_id: "",
        new_model_name: "",
        new_model_oos: 0,
        new_model_pop: 0,
        new_model_type: "",
        new_quantity: 0,
      },
      displayList: [],
      // booth list
      boothList: [],
      boothModels: [],
      // action loading
      saveLoading: false,
      submitLoading: false,
      // action opration
      new_operation_type: "",
      new_visit_display_categoryid: "",
      // type
      new_process: null,
      isView: true,
      isSMDisplayed: false,
      isOMDisplayed: false,
    };
  },
  created() {
    this.query = this.$route.query;
    const { new_name, new_code } = this.query;
    this.walletText = [new_code, new_name];
    this.handleGetDetail();
  },
  watch: {
    // AQUA OOS GAP COUNT
    displayList: {
      handler(values) {
        values.map((ditem) => {
          var new_oos_quantity = 0;
          var new_gap_quantity = 0;
          var new_target_quantity = 0;
          var new_actual_quantity = 0;
          var new_hiend_quantity = 0;
          var new_total_quantity = 0;
          if (ditem.subList && ditem.subList.length > 0) {
            ditem.subList.map((item) => {
              var list = [...item.othermodels, ...item.standardmodels];
              if (
                item.standardmodelsGroup &&
                item.standardmodelsGroup.length > 0
              ) {
                item.standardmodelsGroup.map((oitem) => {
                  new_target_quantity += oitem.new_target_quantity;
                  var targetCount = 0;
                  if (oitem.data.length > 0) {
                    oitem.data.map((nitem) => {
                      if (nitem.new_quantity > 0) {
                        targetCount++;
                        new_actual_quantity += nitem.new_quantity;
                      }
                    });
                  }
                  oitem.gap = oitem.new_target_quantity - targetCount;
                  new_gap_quantity += oitem.gap;
                });
              }
              if (list.length > 0) {
                list.map((mitem) => {
                  if (mitem.new_quantity > 0) {
                    if (mitem.new_mdm_position == "01") {
                      new_hiend_quantity += mitem.new_quantity;
                    }
                    new_total_quantity += mitem.new_quantity;
                  }
                  if (mitem.new_model_oos == 1) {
                    new_oos_quantity++;
                  }
                });
              }
            });
          }
          ditem.new_oos_quantity = new_oos_quantity;
          ditem.new_gap_quantity = new_gap_quantity;
          ditem.new_target_quantity = new_target_quantity;
          ditem.new_actual_quantity = new_actual_quantity;
          ditem.new_total_quantity = new_total_quantity;
          ditem.new_hiend_percent = (
            new_hiend_quantity / new_total_quantity
          ).toFixed(4);
        });
      },
      deep: true,
      immediate: true,
    },
    boothList: {
      handler(values) {
        var list = [];
        this.new_max_display_quantity = 0;
        this.new_ood_quantity = 0;
        values &&
          values.length > 0 &&
          values.map((item) => {
            item.new_ood_quantity = 0;
            var ood = 0;
            item.list.map((nitem) => {
              ood += nitem.new_quantity;
              list.push(nitem);
            });
            item.new_ood_quantity = +item.new_max_display_quantity - ood;
            this.new_max_display_quantity += +item.new_max_display_quantity;
            this.new_ood_quantity += +item.new_ood_quantity;
          });
        list.length > 0 &&
          this.boothModels.length > 0 &&
          this.boothModels.map((bitem) => {
            var count = 0;
            list.map((item) => {
              if (bitem.new_model_id == item.new_model_id) {
                count += item.new_quantity;
              }
            });
            bitem.new_quantity = bitem.count - count;
          });
      },
      deep: true,
      immediate: true,
    },
    // ACTIVE MODAL
    activeModel: {
      handler(values) {
        if (values.new_quantity == 0) {
          values.new_model_pop = 0;
        }
      },
      deep: true,
    },
  },
  methods: {
    // displayed show
    handleDisplayed (type) {
      if (type === 1) {
        this.isSMDisplayed = !this.isSMDisplayed
      } else {
        this.isOMDisplayed = !this.isOMDisplayed
      }
    },
    filterModelOk(values) {
      this.modelFilter = Object.assign(this.modelFilter, values)
    },
    // group by
    groupByArr(arr) {
      return [
        {
          new_target_quantity: arr.length || 0,
          gap: 0,
          data: arr
        }
      ]
    },
    // get detail
    handleGetDetail() {
      getDisplaySampleDetail({
        new_visit_total_id: this.query.new_visit_totalid,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          this.handleGetCategory();
          var items = data.Items;
          this.visitList = items;
          this.new_process = 1;
          this.isView = false;
          if (items.new_diaplay_category.length > 0) {
            var new_process = items.new_diaplay_category[0].new_process;
            var new_status = items.new_diaplay_category[0].new_status;
            this.new_process = new_process;
            this.stepActive = new_process == 2 ? 1 : 0;
            this.isView = new_status == 0 ? true : false;
          }
        }
      });
    },
    // Select modal
    handleModelSelected(item, index, arr) {
      if (this.new_process == 1) {
        if (
          item.new_quantity == 1 &&
          this.activeModel.new_model_id == item.new_model_id
        ) {
          item.new_quantity = 0;
        } else {
          item.new_quantity = item.new_quantity > 0 ? item.new_quantity : 1;
        }
        this.activeModel = item;
      }
    },
    // Reset current modal
    resetCurrentModal() {
      this.activeModel = {
        new_model_id: "",
        new_model_name: "",
        new_model_oos: 0,
        new_model_pop: 0,
        new_model_type: "",
        new_quantity: 0,
      };
    },
    // get categorys
    handleGetCategory() {
      getShopProductCategory().then((res) => {
        const { success, data } = res;
        if (success) {
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
          this.handleGetDisplayModels();
          this.handleGetDisplayBooths();
        }
      });
    },
    // CHANGE CATEGORY
    handleChangeCategroy(index) {
      this.currentCategoryIndex = index;
      this.currentCategory = this.displayList[this.currentCategoryIndex];
      this.isSMDisplayed = false
      this.isOMDisplayed = false
      this.modelFilter = {
        keyword: "",
        new_model_type_filter: "",
        new_mdm_delisted: "",
        new_mdm_brand_name: "",
        new_product_category: '',
        isoos: "",
        ispop: ""
      }
      this.stepActive == 0 && this.$refs.filterModel.reset()
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
                  if (nitem.new_product_category_id == mitem.new_product_subcategory_id) {
                    nitem.standardmodels.push({
                      new_productdisplay_class_id: mitem.new_productdisplay_class_id || "",
                      new_model_type_filter: mitem.new_model_type,
                      new_model_type_name: mitem.new_model_type_name,
                      new_mdm_delisted: mitem.new_mdm_delisted,
                      new_mdm_position: mitem.new_mdm_position,
                      new_mdm_position_text: mitem.new_mdm_position_text,
                      new_model_id: mitem.new_model_id,
                      new_model_name: mitem.new_name,
                      new_target_quantity: mitem.new_target_quantity || 0,
                      new_model_oos: mitem.new_model_oos || 0,
                      new_model_pop: mitem.new_model_pop || 0,
                      new_quantity: mitem.new_quantity || 0,
                      new_model_type: 1,
                      new_shop_id: this.query.new_shopid,
                      new_product_category: nitem.new_product_category_id,
                      new_mdm_brand_name: mitem.new_mdm_brand_name
                    });
                  }
                });
                Items.othermodels.map((mitem) => {
                  if ( nitem.new_product_category_id == mitem.new_product_subcategory_id ) {
                    nitem.othermodels.push({
                      new_model_type_filter: mitem.new_model_type,
                      new_model_type_name: mitem.new_model_type_name,
                      new_mdm_delisted: mitem.new_mdm_delisted,
                      new_mdm_position: mitem.new_mdm_position,
                      new_mdm_position_text: mitem.new_mdm_position_text,
                      new_model_id: mitem.new_model_id,
                      new_model_name: mitem.new_name,
                      new_model_oos: mitem.new_model_oos || 0,
                      new_model_pop: mitem.new_model_pop || 0,
                      new_model_type: 2,
                      new_quantity: mitem.new_quantity || 0,
                      new_shop_id: this.query.new_shopid,
                      new_product_category: nitem.new_product_category_id,
                      new_mdm_brand_name: mitem.new_mdm_brand_name
                    });
                  }
                });
                nitem.standardmodelsGroup = this.groupByArr(nitem.standardmodels);
              });
              // get models for detail
              this.visitList.new_diaplay_category.map((mitem) => {
                if (item.new_product_category_id == mitem.new_product_category_id) {
                  item.new_visit_display_categoryid = mitem.new_visit_display_categoryid || "";
                  item.new_remark = mitem.new_remark;
                  item.new_urllist = mitem.new_urllist;
                  item.subList.map((nitem) => {
                    nitem.standardmodels.map((jitem) => {
                      mitem.new_model_records.map((kitem) => {
                        if (jitem.new_model_id == kitem.new_model_id) {
                          jitem.new_model_oos = kitem.new_model_oos;
                          jitem.new_model_pop = kitem.new_model_pop;
                          jitem.new_quantity = kitem.new_quantity;
                        }
                      });
                    });
                    nitem.othermodels.map((jitem) => {
                      mitem.new_model_records.map((kitem) => {
                        if (jitem.new_model_id == kitem.new_model_id) {
                          jitem.new_model_oos = kitem.new_model_oos;
                          jitem.new_model_pop = kitem.new_model_pop;
                          jitem.new_quantity = kitem.new_quantity;
                        }
                      });
                    });
                  });
                }
              });
            }
          });
        }
      });
    },
    // GET DISPLAY BOOTH
    handleGetDisplayBooths() {
      if (this.stepActive == 1) {
        this.$toast.loading({ duration: 0, forbidClick: true });
        getDisplayBooths({
          new_shop_id: this.query.new_shopid,
        })
          .then((res) => {
            const { success, data } = res;
            if (success) {
              var visitList = JSON.parse(JSON.stringify(this.visitList));
              this.boothList = [];
              // get booth list
              data.Items.map((item) => {
                item.list = [];
                item.ood_gap = [];
                visitList.new_modelbooth_records.map((nitem) => {
                  if (item.new_asset_faid == nitem.new_asset_fa_id) {
                    nitem.count = item.new_quantity;
                    item.list.push(nitem);
                  }
                });
                visitList.new_oods.map((nitem) => {
                  if (item.new_asset_faid == nitem.new_asset_fa_id) {
                    item.ood_gap.push(nitem);
                  }
                });
              });
              this.boothList = data.Items;
              // get booth models
              this.boothModels = [];
              visitList.new_diaplay_category.map((item) => {
                if (item.new_model_records.length > 0) {
                  item.new_model_records.map((nitem) => {
                    nitem.count = nitem.new_quantity;
                    this.boothModels.push(nitem);
                  });
                }
              });
            }
            this.$toast.clear();
          })
          .catch(() => {
            this.$toast.clear();
          });
      }
    },
    // show move modal
    handleShowMoveToBooth() {
      if (!this.isView) {
        var list = [];
        this.boothModels.map((item) => {
          if (
            item.new_quantity > 0 && item.new_product_category_id == this.currentCategory.new_product_category_id
          ) {
            list.push(item);
          }
        });
        this.$refs.moveToBooth.show(list);
      }
    },
    // move to booth ok
    moveToBoothOk(values) {
      this.boothList.map((item) => {
        if (item.new_code == values.booth) {
          let list = [...values.models, ...item.list]
          list = list.reduce((obj, item) => {
            let find = obj.find(i => i.new_model_id == item.new_model_id) 
            find ? (find.new_quantity+=item.new_quantity ): obj.push(item)
            return obj  
          }, [])
          item.list = list
        }
      });
    },
    // DELETE MODAL FROM BOOTH
    handleDeleteBoothModel(list, item, index) {
      list.splice(index, 1);
      this.boothModels.map((record) => {
        if (record.new_model_id == item.new_model_id) {
          record.new_quantity += item.new_quantity;
        }
      });
    },
    // SUBMIT FUNCTION
    handleSubmit(type) {
      this.new_operation_type = type;
      if (this.stepActive == 0) {
        this.handleSubmitStep1(type);
      } else if (this.stepActive == 1) {
        this.handleSubmitStep2(type);
      }
    },
    // SUBMIT STEP2-1
    handleSubmitStep1(type) {
      const { new_visit_totalid, new_shopid } = this.query;
      var isFourImg = true;
      var form = {
        new_operation_type: this.new_operation_type,
        new_visit_total_id: new_visit_totalid,
        new_shop_id: new_shopid,
        new_status: "",
        new_displaymodellist: [],
      };
      this.displayList.map((item) => {
        var record = {
          new_modelrecords: [],
          new_actual_quantity: item.new_actual_quantity,
          new_target_quantity: item.new_target_quantity,
          new_total_quantity: item.new_total_quantity,
          new_max_display_quantity: item.new_max_display_quantity,
          new_gap_quantity: item.new_gap_quantity,
          new_ood_quantity: item.new_ood_quantity,
          new_oos_quantity: item.new_oos_quantity,
          new_product_category_id: item.new_product_category_id,
          new_product_display_target: item.new_product_display_target,
          new_product_display_target_code: item.new_product_display_target_code,
          new_shop_id: item.new_shop_id,
          new_visit_total_id: new_visit_totalid,
          new_visit_display_categoryid: item.new_visit_display_categoryid,
          new_hiend_percent: item.new_hiend_percent,
          new_urllist: item.new_urllist,
          new_remark: item.new_remark,
        };
        if (item.subList.length > 0) {
          item.subList.map((iitem) => {
            var irecord = [...iitem.othermodels, ...iitem.standardmodels];
            irecord.length > 0 &&
              irecord.map((mitem) => {
                if (mitem.new_quantity > 0 || mitem.new_model_oos) {
                  record.new_modelrecords.push({
                    new_visit_display_model_recordid: null,
                    new_visit_display_category_id: item.new_visit_display_categoryid || "",
                    new_visit_total_id: new_visit_totalid,
                    new_productdisplay_class_id: mitem.new_productdisplay_class_id,
                    new_model_id: mitem.new_model_id,
                    new_model_name: mitem.new_model_name,
                    new_mdm_position: mitem.new_mdm_position,
                    new_mdm_position_text: mitem.new_mdm_position_text,
                    new_model_oos: mitem.new_model_oos || 0,
                    new_model_pop: mitem.new_model_pop || 0,
                    new_model_type: mitem.new_model_type,
                    new_product_category_id: iitem.new_parentid,
                    new_product_subcategory_id: iitem.new_product_category_id,
                    new_quantity: mitem.new_quantity,
                    new_mdm_delisted: mitem.new_mdm_delisted,
                    new_shop_id: new_shopid,
                  });
                }
              });
          });
        }
        form.new_displaymodellist.push(record);
        if (record.new_modelrecords.length > 0 && record.new_urllist.length === 0) {
          isFourImg = false
        }
      });
      // validate for img length
      if (isFourImg == false && type == 3) {
        this.$toast("At least 1 photos");
        return;
      }
      this.$toast.loading({ duration: 0, forbidClick: true });
      type == 1 ? (this.saveLoading = true) : (this.submitLoading = true);
      postDisplaySampleModeloperation(form)
        .then((res) => {
          this.$toast.clear();
          const { success, data } = res;
          if (success) {
            if (type == 1) {
              this.saveLoading = false;
              this.$toast.success("Save success");
            } else {
              this.submitLoading = false;
              this.new_process = 2;
              this.stepActive = 1;
              this.$toast.success("Submit success");
              this.handleGetDetail();
            }
          } else {
            type == 1
              ? (this.saveLoading = false)
              : (this.submitLoading = false);
            this.$toast.fail("Save error");
          }
        })
        .catch(() => {
          this.$toast.fail("Network error");
          type == 1 ? (this.saveLoading = false) : (this.submitLoading = false);
        });
    },
    // SUBMIT STEP2-2
    handleSubmitStep2(type) {
      const { new_visit_totalid, new_shopid } = this.query;
      var form = {
        new_operation_type: this.new_operation_type,
        new_visit_total_id: new_visit_totalid,
        new_status: "",
        new_boothrecords: [],
        new_oods: [],
        new_shop_total_ood_quantity: this.new_ood_quantity,
        new_shop_totalbooth_max_quantity: this.new_max_display_quantity
      };
      this.boothList.map((item) => {
        if (item.list.length > 0) {
          item.list.map((nitem) => {
            form.new_boothrecords.push({
              new_visit_display_model_boothid: nitem.new_visit_display_model_boothid,
              new_asset_fa_id: item.new_asset_faid,
              new_asset_fa_code: item.new_code,
              new_model_id: nitem.new_model_id,
              new_fa_ood_quantity: item.new_ood_quantity,
              new_fa_max_quantity: item.new_max_display_quantity,
              new_quantity: nitem.new_quantity,
              new_shop_id: new_shopid,
              new_visit_total_id: new_visit_totalid,
              new_model_name: nitem.new_model_name || "",
              new_status: 0,
            });
          });
        }
        if (item.ood_gap.length > 0) {
          item.ood_gap.map((nitem) => {
            form.new_oods.push({
              new_asset_fa_code: nitem.new_asset_fa_code,
              new_asset_fa_id: nitem.new_asset_fa_id,
              new_competitor_name: nitem.new_competitor_name,
              new_competitor_id: nitem.new_competitor_id,
              new_quantity: nitem.new_quantity,
              new_urllist: nitem.new_urllist,
              new_visit_total_id: new_visit_totalid,
              new_shop_id: new_shopid,
            });
          });
        }
      });

      this.$toast.loading({ duration: 0, forbidClick: true });
      type == 1 ? (this.saveLoading = true) : (this.submitLoading = true);
      postDisplaySampleBoothoperation(form)
        .then((res) => {
          this.$toast.clear();
          const { success, data } = res;
          if (success) {
            if (type == 1) {
              this.saveLoading = false;
              this.$toast.success("Save success");
            } else {
              this.isView = true;
              this.submitLoading = false;
              this.$toast.success("Submit success");
              this.isSave = true;
              this.goBack();
            }
          } else {
            type == 1
              ? (this.saveLoading = false)
              : (this.submitLoading = false);
            this.$toast.fail("Save error");
          }
        })
        .catch(() => {
          this.$toast.fail("Network error");
          type == 1 ? (this.saveLoading = false) : (this.submitLoading = false);
        });
    },
    // UPLOAD IMGS
    handleFileUploadOk(file) {
      this.currentCategory.new_urllist.push({
        new_download_url: file.url,
        new_keyword: "",
        new_description: "",
        new_type: "",
        new_filename: file.name,
        new_filesize: 0,
      });
    },
    // DELETE IMG
    handleFileDelete(index) {
      this.currentCategory.new_urllist.splice(index, 1);
    },
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      if (!this.isSave) {
        this.$dialog
          .confirm({
            title: "Tip",
            message: this.$t("shopCommon.LeavePageTip"),
          })
          .then(() => {
            next(true);
          })
          .catch(() => {
            next(false);
          });
      } else {
        next(true);
      }
    }, 200);
  },
};
</script>
<style lang="scss" scoped>
.visit-step2 {
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
  .step2-content {
    background: #f5f5f5;
    .action-panel {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .filter-search{
        flex: 1;
      }
      .only-continue {
        width: 100px;
        text-align: center;
      }
      .pop-guide {
        font-size: 18px;
        color: #1890ff;
        text-align: center;
        a {
          color: #1890ff;
        }
      }
  }
    .models-item {
      margin-bottom: 24px;
      .isactive{
        color: #1890ff;
      }
      .models-item-con {
        background: #fff;
        min-height: 60px;
        margin-top: 12px;
        padding: 10px;
        border-radius: 12px;
        .gap {
          margin-bottom: 10px;
          font-size: $font24;
          text-align: right;
        }
      }
    }
  }
  .visit-step2-1 {
    padding: 16px;
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
          &.delisted {
            .booth-model-item__inner {
              border: 1px solid red;
            }
          }
          .booth-model-item__inner {
            display: flex;
            align-items: center;
            background: #1976d2;
            color: #fff;
            padding: 0 24px;
            height: 60px;
            line-height: 60px;
            border-radius: 30px;
            border: 1px solid #eee;
            i {
              font-size: 42px;
              line-height: 60px;
              margin-left: -12px;
              margin-right: 6px;
              color: rgba($color: #fff, $alpha: 0.7);
            }
          }
        }
      }
    }
    .display-imgs {
      padding: 12px;
      background: #fff;
      margin-bottom: 24px;
    }
  }
  .flex-layout__footer {
    display: flex;
    background: #fff;
    .item {
      flex: 1;
    }
  }
}
</style>
<style lang="scss">
.visit-step2 {
  .step2-content{
    .sun-uploader__preview-image, .sun-upload-icon{
      width: 100px !important;
      height: 100px !important;
    }
  }
}
</style>