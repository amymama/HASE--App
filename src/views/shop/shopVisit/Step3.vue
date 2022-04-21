<template>
  <div class="flex-layout visit-step3">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar
        left-arrow
        @click-left="goBack"
        :title="$t('shopVisit.CompetitorQTY')"
      />
      <!-- SHOP HEADER -->
      <shop-header :shopInfo="query" />
    </div>
    <div class="flex-layout__body page-content">
      <!-- STEP3 -->
      <div class="step3-content">
        <!-- PRODUCT CATEGORY -->
        <product-category
          :list="categorys"
          @changeCategroy="handleChangeCategroy"
        />
        <!-- PIE CHART FOR STEP3 -->
        <competitor-pie-chart :chartData="chartData" />
        <van-row style="padding: 5px 20px">
          <van-col span="12">
            HAIER Total:{{ form.new_aqua_quantity || 0 }}
          </van-col>
          <van-col span="12" style="text-align: right">
            SHOP Total:
            {{ form.new_aqua_quantity + form.new_competitor_quantity }}
          </van-col>
        </van-row>
        <div class="competitor-list">
          <!-- COMPETITOR ITEM BEGIN-->
          <div
            class="competitor-item"
            v-for="(item, index) in currentCategory.competitorList"
            :key="index"
          >
            <div class="competitor-item-t">
              <div class="competitor-name">
                <van-button size="small" block color="#169bd5">
                  {{ item.new_competitor_name }}
                </van-button>
              </div>
              <div class="competitor-total">
                <van-stepper
                  v-model="item.new_quantity"
                  theme="round"
                  button-size="24px"
                  min="0"
                  max="999"
                  :disabled="isView"
                  :integer="true"
                />
              </div>
              <div class="take-photos" @click="takePhoto(item)">
                <van-icon name="photograph" />
                <p>Camera</p>
              </div>
            </div>
            <div class="competitor-item-b" v-show="item.showCamera">
              <upload-imgs
                folder="VisitCompetitor"
                prefix="CMP"
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
          </div>
          <!-- COMPETITOR ITEM END-->
        </div>
      </div>
    </div>
    <!-- BUTTON ACTIONS -->
    <div class="flex-layout__footer" v-if="!isView">
      <van-row>
        <van-col span="12">
          <van-button
            block
            square
            color="#407FDC"
            :loading="saveLoading"
            @click="handleSubmit(1)"
          >
            {{ $t("shopCommon.Save") }}
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button
            block
            square
            color="#2058AB"
            :loading="submitLoading"
            @click="handleSubmit(3)"
          >
            {{ $t("shopCommon.Submit") }}
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import ShopHeader from "./components/ShopHeader";
import ProductCategory from "./components/ProductCategory";
import CompetitorPieChart from "./components/CompetitorPieChart";
import UploadImgs from "@/components/UploadImgs";
import { getShopProductCategory } from "@/api/shop";
import {
  getVisitCompetitorList,
  getVisitCompetitorDetail,
  postSaveVisitCompetitor,
  getVisitCompetitorAquaQty,
} from "@/api/shopVisit";

export default {
  name: "VisitStep3",
  components: {
    ShopHeader,
    ProductCategory,
    CompetitorPieChart,
    UploadImgs,
  },
  data() {
    return {
      walletText: "",
      isSave: false,
      query: {},
      categorys: [],
      currentCategoryIndex: 0,
      currentCategory: [],
      // data-competitor
      list: [],
      competitorDetail: null,
      // data-chart
      chartData: [],
      // form
      form: {
        new_records: [],
        new_operation_type: 0,
        new_visit_competitorid: "",
        new_code: "",
        new_competitor_quantity: 0,
        new_aqua_quantity: 0,
        new_aqua_percent: 0,
        new_quantity: 0,
        new_shop_id: "",
        new_visit_total_id: "",
        new_name: "",
        new_status: "",
      },
      // action loading
      saveLoading: false,
      submitLoading: false,
      isView: true,
    };
  },
  created() {
    this.query = this.$route.query;
    const { new_shopid, new_name, new_code, new_visit_totalid, new_step_id } =
      this.query;
    this.walletText = [new_code, new_name];
    this.form.new_visit_competitorid = new_step_id || "";
    this.form.new_shop_id = new_shopid;
    this.form.new_visit_total_id = new_visit_totalid;
    if (this.form.new_visit_competitorid) {
      this.handlerGetDetail();
    } else {
      this.isView = false;
      this.handleGetCategory();
    }
  },
  watch: {
    currentCategory: {
      handler(values) {
        this.chartData = [];
        if (values.competitorList.length > 0) {
          this.chartData = [
            {
              name: "HAIER",
              value: values.new_aqua_quantity || 0,
            },
          ];
          values.competitorList.map((item) => {
            this.chartData.push({
              name: item.new_competitor_name,
              value: item.new_quantity,
            });
          });
        }
      },
      deep: true,
    },
    list: {
      handler(values) {
        var new_aqua_quantity = 0;
        var new_competitor_quantity = 0;
        values.map((item) => {
          new_aqua_quantity += item.new_aqua_quantity;
          if (item.competitorList.length > 0) {
            var c_quantity = 0;
            item.competitorList.map((nitem) => {
              if (nitem.new_quantity > 0) {
                c_quantity += nitem.new_quantity;
                new_competitor_quantity += nitem.new_quantity;
              }
            });
            item.new_competitor_quantity = c_quantity;
            item.new_aqua_percent = (
              item.new_aqua_quantity /
              (item.new_competitor_quantity + item.new_aqua_quantity)
            ).toFixed(4);
          }
        });
        this.form.new_aqua_quantity = new_aqua_quantity;
        this.form.new_competitor_quantity = new_competitor_quantity;
        this.form.new_aqua_percent = (
          new_aqua_quantity /
          (new_aqua_quantity + new_competitor_quantity)
        ).toFixed(4);
      },
      deep: true,
    },
  },
  methods: {
    // TAKE PHOTO
    takePhoto(item) {
      item.showCamera = !item.showCamera;
    },
    handleGetAquaQty() {
      getVisitCompetitorAquaQty({
        new_visit_total_id: this.query.new_visit_totalid,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          this.list.map((item) => {
            data.Items.map((nitem) => {
              if (
                item.new_product_category_id === nitem.new_product_category_id
              ) {
                item.new_aqua_quantity = nitem.new_total_quantity;
              }
            });
          });
        }
      });
    },
    // GET PRODUCT CATEGORY
    handleGetCategory() {
      getShopProductCategory().then((res) => {
        const { success, data } = res;
        if (success) {
          this.categorys = data.Items;
          this.list = [];
          this.categorys.map((item) => {
            this.list.push({
              new_product_category_id: item.new_product_category_id,
              new_aqua_quantity: 0,
              new_competitor_quantity: 0,
              competitorList: [],
            });
          });
          this.currentCategory = this.list[0];
          this.handleGetCompetitor();
          this.handleGetAquaQty();
        }
      });
    },
    // CHANGE PRODUCT CATEGORY
    handleChangeCategroy(index) {
      this.currentCategoryIndex = index;
      this.currentCategory = this.list[this.currentCategoryIndex];
    },
    // GET COMPETITOR LIST
    handleGetCompetitor() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getVisitCompetitorList().then((res) => {
        const { success, data } = res;
        if (success) {
          this.$toast.clear();
          this.list.map((item) => {
            // get models
            data.Items.map((nitem) => {
              if (
                item.new_product_category_id === nitem.new_product_category_id
              ) {
                item.competitorList.push({
                  new_aqua_quantity: nitem.new_aqua_quantity || 0,
                  new_aqua_percent: 0,
                  new_competitor_id: nitem.new_competitorid,
                  new_competitor_name: nitem.new_name,
                  new_quantity: 0,
                  new_urllist: [],
                  showCamera: false,
                });
              }
            });
            // get data for detail
            if (this.competitorDetail) {
              item.competitorList.map((mitem) => {
                this.competitorDetail.new_records.map((nitem) => {
                  if (mitem.new_competitor_id == nitem.new_competitor_id) {
                    mitem.new_aqua_quantity = nitem.new_aqua_quantity;
                    mitem.new_aqua_percent = nitem.new_aqua_percent;
                    mitem.new_quantity = nitem.new_quantity;
                    mitem.new_urllist = nitem.new_urllist;
                  }
                });
              });
            }
          });
        }
      });
    },
    // Get competior detail
    handlerGetDetail() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getVisitCompetitorDetail({
        new_visit_competitor_id: this.form.new_visit_competitorid,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          const items = data.Items;
          this.isView = items.new_status == 0 ? true : false;
          this.$toast.clear();
          this.competitorDetail = data.Items;
          this.handleGetCategory();
        }
      });
    },
    handleSubmit(type) {
      // operation type
      if (type == 1) {
        this.form.new_operation_type = this.form.new_visit_competitorid ? 2 : 1;
      } else {
        this.form.new_operation_type = 3;
      }
      // competitor records
      var records = [];
      this.list.map((item) => {
        if (item.competitorList.length > 0) {
          item.competitorList.map((nitem) => {
            records.push({
              new_shop_id: this.query.new_shopid,
              new_visit_total_id: this.query.new_visit_totalid,
              new_visit_competitor_id: this.form.new_visit_competitorid,
              new_visit_competitor_recordid: "",
              new_product_category_id: item.new_product_category_id,
              new_aqua_quantity: item.new_aqua_quantity,
              new_aqua_percent: item.new_aqua_percent,
              new_competitor_id: nitem.new_competitor_id,
              new_competitor_name: nitem.new_competitor_name,
              new_urllist: nitem.new_urllist,
              new_quantity: nitem.new_quantity,
            });
          });
        }
      });
      this.form.new_records = records;
      // show loading and submit form data
      type == 1 ? (this.saveLoading = true) : (this.submitLoading = true);
      this.$toast.loading({ duration: 0, forbidClick: true });
      postSaveVisitCompetitor(this.form).then((res) => {
        this.$toast.clear();
        const { success, data } = res;
        if (success) {
          if (type == 1) {
            this.saveLoading = false;
            this.$toast.success("Save success");
            if (data.Items) {
              this.form.new_visit_competitorid = data.Items;
            }
          } else {
            this.isView = true;
            this.submitLoading = false;
            this.$toast.success("Submit success");
            this.isSave = true;
            this.goBack();
          }
        } else {
          type == 1 ? (this.saveLoading = false) : (this.submitLoading = false);
          this.$toast.fail("Save error");
        }
      });
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
.visit-step3 {
  .step3-content {
    background: #f5f5f5;
    .competitor-list {
      border-radius: 24px;
      overflow: hidden;
      margin: 24px 0;
      .competitor-item {
        background: #fff;
        padding: 24px;
        border-bottom: 1px solid #eeeeee;
        .competitor-item-t {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          .competitor-name {
            padding-right: 24px;
            overflow: hidden;
            flex: 1;
          }
          .competitor-total-qty {
            padding: 0 24px;
          }
          .take-photos {
            margin-left: 32px;
            text-align: center;
            padding: 0 12px;
            p {
              font-size: 18px;
              color: #666;
            }
            i {
              font-size: 40px;
              color: #2058ab;
            }
          }
        }
        .competitor-item-b {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>