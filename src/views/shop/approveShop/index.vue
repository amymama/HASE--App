<template>
  <div class="flex-layout new-shop-list">
    <div class="flex-layout__header">
      <van-nav-bar
        left-arrow
        @click-left="goBack"
        :title="$t('shopMenu.ApproveShop')"
      />
      <van-tabs v-model="active" @change="handleChangeTab" :ellipsis="false">
        <van-tab v-for="(item, index) in tabs" :key="index">
          <template #title>
            {{ item.title }}
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="flex-layout__body">
      <div class="list-fliter">
        <div class="inner-fliter">
          <div
            class="filter-branch van-ellipsis"
            @click="$refs.selectRegion.show()"
          >
            {{ branchName }}
          </div>
          <div class="filter-search">
            <van-search
              clearable
              v-model="queryParams.new_name"
              @click="$refs.searchHistory.handleShow()"
              readonly
              shape="round"
              background="none"
              :placeholder="$t('shopHome.SearchShop')"
            >
              <template #right-icon>
                <van-icon
                  v-if="queryParams.new_name"
                  name="clear"
                  color="#CCC"
                  @click.stop="clearSearch"
                />
              </template>
            </van-search>
          </div>
          <div class="filter-icon" @click="$refs.selectChannel.show()">
            <van-icon name="filter-o" />
          </div>
        </div>
        <van-cell-group size="small">
          <van-cell
            :title="$t('shopApprove.ProcessType')"
            :value="new_process_type_text"
            @click="showType = true"
            is-link
          />
          <van-cell
            v-if="option2.length > 0"
            :title="$t('shopApprove.ApproveResult')"
            :value="new_approve_status_text"
            @click="showStatus = true"
            is-link
          />
        </van-cell-group>
      </div>
      <div class="shop-status-list">
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
          <div
            class="shop-status-item"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="shop-status__header">
              <div
                v-if="item.new_approve_status == 2 || !item.new_approve_status"
                class="shop-status-left wait-approvel"
              >
                {{ $t("shopStatus.WaitApproval") }}
              </div>
              <div
                v-if="item.new_approve_status == 3"
                class="shop-status-left approved"
              >
                {{ $t("shopStatus.Approved") }}
              </div>
              <div
                v-if="item.new_approve_status == 4"
                class="shop-status-left reject"
              >
                {{ $t("shopStatus.Reject") }}
              </div>
              <div class="shop-code">{{ item.new_process_record }}</div>
            </div>
            <div class="shop-status__body">
              <div class="shop-code">
                {{ item.new_shop_code }}
              </div>
              <h2 class="shop-name">
                {{ item.new_shop_name }}
              </h2>
              <div class="shop-tags">
                <van-tag
                  class="shop-tag"
                  round
                  color="#F2F2F2"
                  text-color="#666"
                >
                  {{ item.new_branch_name }}
                </van-tag>
                <van-tag
                  class="shop-tag"
                  round
                  color="#F2F2F2"
                  text-color="#666"
                >
                  {{ item.new_channel_name }}
                </van-tag>
              </div>
              <div class="shop-creator">
                {{ item.new_creator }}
                {{ formatTableDate(item.new_create_time) }}
              </div>
            </div>
            <div class="shop-status__footer">
              <div
                class="shop-action-item"
                v-if="item.new_approve_status == 2 || !item.new_approve_status"
              >
                <van-button
                  round
                  plain
                  size="mini"
                  type="warning"
                  @click="$refs.approvalModal.show(0, item)"
                >
                  {{ $t("shopApprove.REJECT") }}
                </van-button>
              </div>
              <div
                class="shop-action-item"
                v-if="item.new_approve_status == 2 || !item.new_approve_status"
              >
                <van-button
                  round
                  plain
                  size="mini"
                  type="info"
                  @click="$refs.approvalModal.show(1, item)"
                >
                  {{ $t("shopApprove.PASS") }}
                </van-button>
              </div>
              <div class="shop-action-item">
                <van-button
                  round
                  plain
                  size="mini"
                  type="info"
                  @click="handleGetDetail(item)"
                >
                  {{ $t("shopApprove.ShopDetail") }}
                </van-button>
              </div>
              <div class="shop-action-item">
                <van-button
                  round
                  plain
                  size="mini"
                  type="info"
                  @click="$refs.approvalDetail.show(item)"
                >
                  {{ $t("shopApprove.ApproveDetail") }}
                </van-button>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <!-- CHANNEL SELECT -->
    <search-history
      ref="searchHistory"
      searchType="shop"
      @ok="handleSearchOk"
    />
    <filter-branch ref="selectRegion" @ok="handleRegionOk" />
    <filter-channel ref="selectChannel" @ok="handleChannelOk" />
    <!-- Approval Modal -->
    <approval-modal ref="approvalModal" @ok="handleOK" />
    <!-- APPROVAL DETAIL -->
    <approval-detail ref="approvalDetail" />
    <!-- APPROVAL TYPE -->
    <van-popup v-model="showType" round position="bottom">
      <van-picker
        title="Select Shop Status"
        show-toolbar
        :columns="option1"
        @confirm="onConfirmType"
        @cancel="showType = false"
      />
    </van-popup>
    <!-- APPROVAL Status -->
    <van-popup v-model="showStatus" round position="bottom">
      <van-picker
        title="Select Approve Status"
        show-toolbar
        :columns="option2"
        @confirm="onConfirmStatus"
        @cancel="showStatus = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { formatTableDate } from "@/utils";
import { getShopApproveList } from "@/api/shop";
import ApprovalModal from "@/components/ApprovalModal";
import SearchHistory from "@/components/SearchHistory";
import FilterBranch from "@/views/shop/newShop/components/FilterBranch";
import FilterChannel from "@/views/shop/newShop/components/FilterChannel";
import ApprovalDetail from "@/components/ApprovalDetail";

export default {
  name: "ApproveShop",
  components: {
    ApprovalModal,
    FilterBranch,
    FilterChannel,
    SearchHistory,
    ApprovalDetail,
  },
  data() {
    return {
      tabs: [
        { title: this.$t("shopApprove.ToDoList") },
        { title: this.$t("shopApprove.HaveDone") },
      ],
      active: 0,
      // query params
      value: "",
      option1: [
        { text: this.$t("shopStatus.NewShop"), value: "1" },
        { text: this.$t("shopStatus.CloseShop"), value: "2" },
      ],
      option2: [],
      queryParams: {
        new_process_type: "1",
        new_approve_status: "1,2",
      },
      new_process_type_text: this.$t("shopStatus.NewShop"),
      new_approve_status_text: this.$t("shopCommon.All"),
      showType: false,
      showStatus: false,
      list: [],
      branchName: this.$t("shopCommon.All"),
      // load more data
      page_no: 0,
      page_size: 20,
      loading: false,
      finished: false,
      noRes: false,
      error: false,
    };
  },
  created () {
    const { new_process_type } = this.$route.query
    if (new_process_type) {
      this.queryParams.new_process_type = new_process_type
      this.new_process_type_text = new_process_type == '2' ? this.$t("shopStatus.CloseShop") : this.$t("shopStatus.NewShop")
    }
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
    // Change Tab
    handleChangeTab(index) {
      // reset query name
      this.new_process_type_text = this.$t("shopStatus.NewShop");
      this.new_approve_status_text = this.$t("shopCommon.All");
      this.option1 = [
        { text: this.$t("shopStatus.NewShop"), value: "1" },
        { text: this.$t("shopStatus.CloseShop"), value: "2" },
      ];
      // reset query params
      switch (index) {
        case 0:
          this.queryParams = {
            new_process_type: "1",
            new_approve_status: "1,2",
          };
          this.option2 = [];
          break;
        case 1:
          this.queryParams = {
            new_process_type: "1",
            new_approve_status: "3,4",
          };
          this.option2 = [
            { text: this.$t("shopCommon.All"), value: "3,4" },
            { text: this.$t("shopStatus.Approved"), value: "3" },
            { text: this.$t("shopStatus.Reject"), value: "4" },
          ];
          break;
      }
      this.initData();
    },
    // Go new shop detail
    handleGetDetail(item) {
      this.$router.push({
        name: "ShopMasterData",
        query: {
          shop_id: item.new_shop_id,
        },
      });
    },
    // PULL UP LOAD DATA
    onLoad() {
      setTimeout(() => {
        this.page_no++;
        getShopApproveList(
          Object.assign(this.queryParams, {
            itemsperpage: this.page_size,
            page: this.page_no,
          })
        )
          .then((res) => {
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
          })
          .catch(() => {
            this.page_no = 0;
            this.loading = false;
            this.error = true;
          });
      }, 100);
    },
    // Confirm type
    onConfirmType(record) {
      this.queryParams.new_process_type = record.value;
      this.new_process_type_text = record.text;
      this.showType = false;
      this.initData();
    },
    // Confirm Status
    onConfirmStatus(record) {
      this.queryParams.new_approve_status = record.value;
      this.new_approve_status_text = record.text;
      this.showStatus = false;
      this.initData();
    },
    // APPROVAL SUCCESS
    handleOK() {
      this.initData();
    },
    // search ok
    handleSearchOk(key) {
      this.queryParams.new_name = key;
      this.initData();
    },
    // clear search
    clearSearch() {
      this.queryParams.new_name = "";
      this.initData();
    },
    // filter for region
    handleRegionOk(selectedOptions, tabIndex) {
      if (selectedOptions.length > 0) {
        this.queryParams.new_region_id =
          tabIndex >= 0 ? selectedOptions[0].new_sale_regionid : "";
        this.queryParams.new_branch_id =
          tabIndex >= 1 ? selectedOptions[1].new_sale_regionid : "";
        this.branchName = selectedOptions[tabIndex].new_name;
        this.initData();
      }
    },
    // filter for region
    handleChannelOk(values) {
      this.queryParams.new_channel_id = values[1].new_channelid;
      this.queryParams.new_channel_parentid = values[1].new_parentid;
      this.initData();
    },
  },
};
</script>
<style lang="scss" scoped>
.inner-fliter {
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 60px;
  text-align: center;
  background: #fff;
  .filter-branch {
    display: block;
    overflow: hidden;
    max-width: 150px;
    line-height: 30px;
    font-size: $font24;
    color: #666;
  }
  .filter-search {
    flex: 1;
  }
  .filter-icon {
    padding: 0 14px;
    i {
      font-size: $font32;
    }
  }
}
.shop-status-list {
  padding: 24px;
}
.shop-status-item {
  margin-bottom: 32px;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.1);
  .shop-status__header {
    display: flex;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    .shop-status-left {
      width: 250px;
      height: 40px;
      line-height: 40px;
      position: relative;
      background: #aaa;
      color: #fff;
      text-align: center;
      margin-right: 50px;
      font-size: 24px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        right: -39px;
        bottom: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 40px 0 0 40px;
        border-color: transparent transparent transparent #aaa;
      }
      &.draft {
        background: #aaa;
        &::after {
          border-color: transparent transparent transparent #aaa;
        }
      }
      &.wait-approvel {
        background: #ff976a;
        &::after {
          border-color: transparent transparent transparent #ff976a;
        }
      }
      &.approved {
        background: #07c160;
        &::after {
          border-color: transparent transparent transparent #07c160;
        }
      }
      &.reject {
        background: #ee0a24;
        &::after {
          border-color: transparent transparent transparent #ee0a24;
        }
      }
    }
    .shop-code {
      flex: 1;
      line-height: 40px;
      font-size: $font24;
      color: #666;
      margin-left: 12px;
    }
  }
  .shop-status__body {
    background: #fff;
    padding: 20px;
    .shop-name {
      font-size: $font30;
      margin-bottom: 15px;
      margin-top: 10px;
    }
    .shop-tags {
      font-size: 20px;
      .shop-tag {
        margin-right: 12px;
        margin-bottom: 12px;
      }
    }
    .shop-creator {
      line-height: 150%;
      font-size: $font24;
      color: #999;
    }
  }
  .shop-status__footer {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    .shop-action-item {
      margin-left: 10px;
      button {
        padding: 0 20px;
      }
    }
  }
}
</style>
