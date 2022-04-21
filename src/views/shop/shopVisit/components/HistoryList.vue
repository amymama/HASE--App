<template>
  <div class="history-list">
    <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      :finished-text="$t('shopCommon.NoMoreData')"
      @load="onLoad"
      :error.sync="error"
      :error-text="$t('shopCommon.RequestErrorText')"
    >
      <van-cell-group>
        <van-swipe-cell
          class="history-item"
          v-for="item in list"
          :key="item.new_visit_totalid"
        >
          <van-cell @click.stop="handleGoDetail(item)" :title="item.new_code">
            <template #right-icon>
              <van-tag
                class="visit-status"
                v-if="item.new_status == 2"
                type="warning"
              >
                {{ $t("shopStatus.Draft") }}
              </van-tag>
              <van-tag
                class="visit-status"
                v-if="item.new_status == 0"
                type="success"
              >
                {{ $t("shopStatus.Submited") }}
              </van-tag>
            </template>
            <template #label>
              <div style="color: #666;" class="shop-name">{{ item.new_shop_name }}</div>
              <p style="color: #666">
                Region: 
                {{ item.new_region_name }}
                <span v-if="item.new_area_name">/</span>
                {{ item.new_area_name }}
                <span v-if="item.new_province_name">/</span>
                {{ item.new_province_name }}</p>
              <p style="color: #666">Channel: {{ item.new_channel_name }}</p>
              <p>Create Person: {{ item.new_creator }}</p>
              <p v-if="item.new_status == 0">Submit Date: {{ formatTableDate(item.new_submit_time) }}</p>
              <p v-else>Create Date: {{ formatTableDate(item.new_create_time) }}</p>
            </template>
          </van-cell>
          <template v-if="item.new_status == 2 && isMy" #right>
            <van-button
              @click="handleDelete(item)"
              square
              icon="delete-o"
              text="Delete"
              type="danger"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import {
  getVisitTotalListBySelf,
  getVisitTotalList,
  postDeleteShopVisitTotal,
} from "@/api/shopVisit";
import { formatTableDate } from "@/utils";
export default {
  name: "VisitHistory",
  props: {
    queryParams: {
      type: Object,
      default: {},
    },
    isMy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      // load more data
      page_no: 0,
      page_size: 10,
      loading: false,
      finished: false,
      noRes: false,
      error: false,
    };
  },
  methods: {
    formatTableDate,
    // Init Data
    initData() {
      this.list = [];
      this.page_no = 0;
      this.loading = true;
      this.finished = false;
      this.noRes = false;
      this.error = false;
      this.onLoad();
    },
    // PULL UP LOAD DATA
    onLoad() {
      setTimeout(() => {
        this.page_no++;
        var p = null;
        if (this.isMy) {
          p = getVisitTotalListBySelf(
            Object.assign(this.queryParams, {
              itemsperpage: this.page_size,
              page: this.page_no,
            })
          );
        } else {
          p = getVisitTotalList(
            Object.assign(this.queryParams, {
              itemsperpage: this.page_size,
              page: this.page_no,
            })
          );
        }
        p.then((res) => {
          const { success, data } = res;
          if (success) {
            var Items = data.Items || [];
            this.loading = false;
            this.list = this.list.concat(Items);
            if (this.list.length === 0) {
              this.noRes = true;
            }
            if (Items.length < this.page_size) {
              this.finished = true;
            }
          }
        }).catch(() => {
          this.page_no = 0;
          this.loading = false;
          this.error = true;
        });
      }, 100);
    },
    // detail
    handleGoDetail(item) {
      var query = {
        new_channel_name: item.new_channel_name || "",
        new_code: item.new_shop_code,
        new_customer_code: item.new_customer_code || "",
        new_name: item.new_shop_name,
        new_shop_class: item.new_shop_class || "",
        new_shopid: item.new_shop_id,
        new_visit_totalid: item.new_visit_totalid,
      };
      switch (item.new_status) {
        case 2:
          // record draft
          this.$router.push({
            name: "ShopVisit",
            query: query,
          });
          break;
        case 0:
          // record submited
          this.$router.push({
            name: "ShopVisitHistoryDetail",
            query: query,
          });
          break;
      }
    },
    // delete record
    handleDelete(record) {
      this.$dialog
        .confirm({
          title: "Tip",
          message: "Are you sure to delete this record?",
        })
        .then(() => {
          this.$toast.loading({ duration: 0, forbidClick: true });
          postDeleteShopVisitTotal({
            new_status: record.new_status,
            new_visit_total_id: record.new_visit_totalid,
          })
            .then((res) => {
              const { success, message } = res;
              if (success) {
                this.$toast.success("Delete success");
                this.initData();
              } else {
                this.$toast.fail(message);
              }
            })
            .catch(() => {
              this.$toast.error("Network error");
            });
        })
        .catch(() => {
          console.log("cancel");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.history-item {
  .shop-name{
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .visit-status {
    height: 36px;
  }
  .delete-button {
    margin-left: 3px;
    height: 100%;
  }
}
</style>