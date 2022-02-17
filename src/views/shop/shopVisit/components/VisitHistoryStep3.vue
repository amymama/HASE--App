<template>
  <div class="history-step3">
    <!-- PRODUCT CATEGORY -->
    <product-category
      :list="categorys"
      @changeCategroy="handleChangeCategroy"
    />
    <!-- PIE CHART FOR STEP3 -->
    <competitor-pie-chart
      v-if="
        currentCategory.competitorList &&
        currentCategory.competitorList.length > 0
      "
      :chartData="chartData"
    />
    <van-row style="padding: 5px 20px">
      <van-col span="12">
        AQUA Total:{{ form.new_aqua_quantity || 0 }}
      </van-col>
      <van-col span="12" style="text-align: right">
        SHOP Total:
        {{ form.new_aqua_quantity + form.new_competitor_quantity }}
      </van-col>
    </van-row>
    <div class="competitor-list">
      <!-- COMPETITOR ITEM BEGIN-->
      <template
        v-if="
          currentCategory.competitorList &&
          currentCategory.competitorList.length > 0
        "
      >
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
            <div class="competitor-total">QTY: {{ item.new_quantity }}</div>
          </div>
          <div class="competitor-item-b" v-if="item.new_urllist.length > 0">
            <upload-imgs
              folder="shop"
              :fileList="item.new_urllist"
              :showUploader="false"
            />
          </div>
        </div>
        <!-- COMPETITOR ITEM END-->
      </template>
      <template v-else>
        <van-empty description="No Data" />
      </template>
    </div>
  </div>
</template>

<script>
import ProductCategory from "./ProductCategory";
import CompetitorPieChart from "./CompetitorPieChart";
import UploadImgs from "@/components/UploadImgs";
import { getShopProductCategory } from "@/api/shop";
import {
  getVisitCompetitorDetail,
  getVisitCompetitorAquaQty,
} from "@/api/shopVisit";

export default {
  name: "HistoryStep3",
  components: {
    ProductCategory,
    CompetitorPieChart,
    UploadImgs,
  },
  props: {
    id: {
      type: String,
      require: true,
    },
    totalId: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      new_visit_competitorid: "",
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
        new_competitor_quantity: 0,
        new_aqua_quantity: 0,
      },
    };
  },
  created() {
    this.handlerGetDetail();
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
          }
        });
        this.form.new_aqua_quantity = new_aqua_quantity;
        this.form.new_competitor_quantity = new_competitor_quantity;
      },
      deep: true,
    },
  },
  methods: {
    handleGetAquaQty() {
      getVisitCompetitorAquaQty({
        new_visit_total_id: this.totalId,
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
      this.$toast.loading({ duration: 0, forbidClick: true });
      getShopProductCategory()
        .then((res) => {
          this.$toast.clear();
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
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    // GET COMPETITOR LIST
    handleGetCompetitor() {
      this.list.map((item) => {
        // get data for detail
        item.competitorList = [];
        this.competitorDetail.new_records.map((nitem) => {
          if (item.new_product_category_id == nitem.new_product_category_id) {
            item.competitorList.push({
              new_aqua_quantity: nitem.new_aqua_quantity,
              new_aqua_percent: nitem.new_aqua_percent,
              new_competitor_id: nitem.new_competitorid,
              new_competitor_name: nitem.new_competitor_name,
              new_quantity: nitem.new_quantity,
              new_urllist: nitem.new_urllist,
            });
          }
        });
      });
    },
    // CHANGE PRODUCT CATEGORY
    handleChangeCategroy(index) {
      this.currentCategoryIndex = index;
      this.currentCategory = this.list[this.currentCategoryIndex];
    },
    // Get competior detail
    handlerGetDetail() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getVisitCompetitorDetail({
        new_visit_competitor_id: this.id,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          this.competitorDetail = data.Items;
          this.$toast.clear();
          this.handleGetCategory();
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.history-step3 {
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
        .competitor-total {
          width: 120px;
          padding: 0 24px;
          text-align: right;
        }
      }
      .competitor-item-b {
        margin-top: 15px;
      }
    }
  }
}
</style>