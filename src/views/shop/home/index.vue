<template>
  <div class="page page-hastab page-hasnav shop-home">
    <!-- TOP BAR -->
    <van-nav-bar
      fixed
      z-index="2"
      title="HI SHOP"
      :right-text="$t('shopVisit.VisitHistory')"
      @click-right="onClickRight"
    />
    <!-- HI-SHOP MENU  -->
    <div class="hi-home-menu">
      <van-swipe :loop="false" :show-indicators="false">
        <van-swipe-item>
          <van-grid :column-num="4" :border="false" style="position: relative">
            <van-grid-item
              v-for="(item, index) in menuList"
              :key="index"
              :icon="item.icon"
              :text="item.name"
              :to="{ name: item.routeName }"
              :badge="item.count"
              v-action:[item.permission]
            />
            <div class="arrow-right" v-if="subMenus.length > 0">
              <van-icon name="arrow" color="#ccc" />
              <van-icon name="arrow" color="#ccc" />
            </div>
          </van-grid>
        </van-swipe-item>
        <van-swipe-item v-if="subMenus.length > 0">
          <van-grid :column-num="4" :border="false">
            <van-grid-item
              v-for="(item, index) in subMenus"
              :key="index"
              :icon="item.icon"
              :text="item.name"
              :to="{ name: item.routeName }"
              :badge="item.count"
              v-action:[item.permission]
            />
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- SHOP VISIT LIST -->
    <div class="hi-home-shoplist">
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
        <div
          class="filter-sort"
          :class="queryParams.orderby == 'desc' ? 'desc' : 'asc'"
          @click="toggoleSort"
        >
          {{ $t("shopCommon.Update") }}
          <div class="filter-sort-icon"></div>
        </div>
        <div class="filter-icon" @click="$refs.selectChannel.show()">
          <van-icon name="filter-o" />
        </div>
      </div>
      <div class="total-shohp" :style="{ marginBottom: '10px', color: '#666' }">
        Total: <span :style="{ color: '#2196f3', fontWeight: 'bold' }">{{ totalShop }}</span> Shops
      </div>
      <div class="inner-list">
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
          <div class="item" v-for="item in list" :key="item.new_shopid">
            <!-- ITEM BEGIN -->
            <div class="shop-item">
              <div class="shop-level">{{ item.new_shop_class || "N/A" }}</div>
              <div class="shop-visit" @click="handleToVisit(item)"><van-icon name="arrow" /></div>
              <div class="shop-tools" @click="showQucikTools(item)">
                <van-icon name="plus" />
              </div>
              <div class="shop-item-innter">
                <div class="shop-pics" @click="viewShopImgs(item)">
                  <div class="shop-status">
                    <div class="shop-status-box">
                      <div
                        class="shop-status-item opened"
                        v-if="item.new_shop_status == 1"
                      >
                        {{ $t("shopStatus.Opened") }}
                      </div>
                      <div
                        class="shop-status-item closed"
                        v-if="item.new_shop_status == 2"
                      >
                        {{ $t("shopStatus.Closed") }}
                      </div>
                      <div
                        class="shop-status-item jonined"
                        v-if="item.new_aqua_enterin"
                      >
                        {{ $t("shopStatus.Joined") }}
                      </div>
                      <div
                        class="shop-status-item visit"
                        v-if="item.new_whether_visit"
                      >
                        {{ $t("shopStatus.Visit") }}
                      </div>
                    </div>
                  </div>
                  <van-tag
                    v-if="item.new_shop_type"
                    class="shop-type"
                    mark
                    type="primary"
                  >
                    {{ item.new_shop_type }}
                  </van-tag>
                  <van-image
                    width="3.5rem"
                    height="3.5rem"
                    fit="cover"
                    :src="
                      item.new_dowmload_url
                        ? item.new_dowmload_url.split(',')[0]
                        : ''
                    "
                  />
                </div>
                <div class="shop-info">
                  <h2 class="name van-ellipsis">{{ item.new_name }}</h2>
                  <p class="van-ellipsis">{{ item.new_local_shop_name }}</p>
                  <p>{{ item.new_code }}</p>
                  <p>
                    <span style="margin-right: 10px">
                      {{ item.new_customer_code }}</span
                    >
                    <van-tag round type="primary">
                      <div class="van-ellipsis channel">
                        {{ item.new_channel_name }}
                      </div>
                    </van-tag>
                  </p>
                  <div class="total-detail">
                    <div class="total-item">
                      <span
                        >{{
                          item.new_display_radio
                            ? (item.new_display_radio * 100).toFixed(2)
                            : 0
                        }}%</span
                      >
                      {{ $t("shopHome.DisplayRatio") }}
                    </div>
                    <div class="total-item">
                      <span>{{ item.new_display_rank || 0 }}</span>
                      {{ $t("shopHome.DisplayRank") }}
                    </div>
                  </div>
                  <div class="submitor">
                    <div class="van-ellipsis" v-if="item.new_visit_submitor">
                      <span>{{ item.new_visit_submitor }}</span>
                      {{ formatTableDate(item.new_visit_submit_time) }}
                    </div>
                    <div v-else>{{$t('shopCommon.HaveNotAnyVisitRecords')}}</div>
                  </div>
                </div>
              </div>
              <div class="shop-item-footer">
                <div class="shop-map">
                  <img src="@/assets/images/shop/map.jpg" />
                </div>
                <div class="shop-address">
                  <div class="van-ellipsis">{{ item.new_address }}</div>
                  <div class="van-ellipsis">{{ item.new_address_detail }}</div>
                </div>
                <router-link
                  class="shop-card"
                  :to="{ name: 'ShopCard', query: item }"
                >
                  <img src="@/assets/images/shop/shopcard.png" />
                </router-link>
              </div>
            </div>
            <!-- ITEM END -->
          </div>
        </van-list>
      </div>
    </div>
    <!-- PREV IMGS -->
    <prev-imgs ref="prevImgs" :imgs="imgs" />
    <!-- TOOLS -->
    <van-action-sheet v-model="visible" title="Select Quick Tool">
      <div class="quick-menu">
        <van-grid :column-num="4" :border="false">
          <van-grid-item
            :icon="quickmenus[0].icon"
            :text="quickmenus[0].name"
            @click="handleCloseShop"
            v-action:Shop:Close
          />
          <template v-for="(item, index) in quickmenus">
            <van-grid-item
              v-if="item.routeName"
              :key="index"
              :icon="item.icon"
              :text="item.name"
              :to="{ name: item.routeName, query: { ...record } }"
            />
          </template>
        </van-grid>
      </div>
    </van-action-sheet>
    <!-- BRANCH SELECT -->
    <!-- CHANNEL SELECT -->
    <search-history
      ref="searchHistory"
      searchType="shop"
      @ok="handleSearchOk"
    />
    <filter-branch ref="selectRegion" @ok="handleRegionOk" />
    <filter-channel ref="selectChannel" @ok="handleChannelOk" />
    <!-- TAB-BAR -->
    <tab-bar />
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
import PrevImgs from "@/components/PrevImgs";
import SearchHistory from "@/components/SearchHistory";
import FilterBranch from "../newShop/components/FilterBranch";
import FilterChannel from "../newShop/components/FilterChannel";
import { getShopList, postCloseShop, getTodoListCount } from "@/api/shop";
import icon_shop from "@/assets/images/shop/icon/shop.png";
import icon_closeShop from "@/assets/images/shop/icon/ashop_close.png";
import icon_fa from "@/assets/images/shop/icon/fa.png";
import icon_Promotion from "@/assets/images/shop/icon/promotion.png";
import icon_plan from "@/assets/images/shop/icon/plan.png";
import icon_posm from "@/assets/images/shop/icon/posm.png";
import icon_product from "@/assets/images/shop/icon/product.png";
import icon_aplan from "@/assets/images/shop/icon/aplan.png";
import icon_ashop from "@/assets/images/shop/icon/ashop.png";
import { formatTableDate } from "@/utils";
import { mapGetters } from "vuex";

export default {
  name: "HiShop",
  components: {
    TabBar,
    PrevImgs,
    SearchHistory,
    FilterBranch,
    FilterChannel,
  },
  data() {
    return {
      // top menus
      menus: [
        {
          icon: icon_shop,
          name: this.$t("shopMenu.NewShop"),
          routeName: "NewShopList",
          permission: "shopMenu:NewShop",
        },
        {
          icon: icon_plan,
          name: this.$t("shopMenu.NewPlan"),
          routeName: "visitPlan",
          permission: "shopMenu:NewPlan",
        },
        {
          icon: icon_fa,
          name: this.$t("shopMenu.NewFA"),
          routeName: "MyFA",
          permission: "shopMenu:NewFA",
        },
        {
          icon: icon_Promotion,
          name: this.$t("shopMenu.NewPromotion"),
          routeName: "promotion",
          permission: "shopMenu:NewPromotion",
        },
        {
          icon: icon_ashop,
          name: this.$t("shopMenu.ApproveShop"),
          routeName: "ApproveShop",
          permission: "shopMenu:ApproveShop",
        },
        {
          icon: icon_aplan,
          name: this.$t("shopMenu.ApprovePlan"),
          routeName: "ApprovePlan",
          permission: "shopMenu:ApprovePlan",
        },
        {
          icon: icon_posm,
          name: this.$t("shopMenu.PosmInOut"),
          routeName: "PosmRecord",
          permission: "shopMenu:PosmInOut",
        },
        {
          icon: icon_product,
          name: this.$t("shopMenu.Product"),
          routeName: "Product",
          permission: "shopMenu:Product",
        },
        {
          icon: icon_posm,
          name: this.$t("shopMenu.PosmForecast"),
          routeName: "ForecastRecord",
          permission: "shopMenu:PosmForecast",
        },
      ],
      subMenus: [],
      // select quick tools
      record: {},
      visible: false,
      // data list
      queryParams: {
        orderby: "desc",
      },
      list: [],
      totalShop: 0,
      // load more data
      page_no: 0,
      page_size: 10,
      loading: false,
      finished: false,
      noRes: false,
      error: false,
      // prev imgs
      imgs: [],
      branchName: this.$t("shopCommon.All"),
    };
  },
  computed: {
    ...mapGetters(["auths"]),
    menuList() {
      const result = [];
      for (let menu of this.menus) {
        const exist = this.auths.find((item) => item.perms === menu.permission);
        if (exist) {
          result.length < 8 ? result.push(menu) : this.subMenus.push(menu);
        }
      }
      return result;
    },
    quickmenus() {
      return [
        {
          icon: icon_closeShop,
          name: "Close Shop",
        },
        {
          icon: icon_fa,
          name: "New FA",
          routeName: "newFA",
        },
        {
          icon: icon_Promotion,
          name: "New Promotion",
          routeName: "newPromotion",
        },
        {
          icon: icon_posm,
          name: "Posm IN/OUT",
          routeName: "PosmList",
        },
      ];
    },
  },
  created() {
    this.handleGetTodo();
  },
  methods: {
    formatTableDate,
    // SHOP VISIT
    handleToVisit (item) {
      if (item.new_shop_status == '2') {
        this.$toast("Shop Already Closed, can not visit shop")
      } else {
        this.$router.push({
          name: 'ShopVisit',
          query: item
        })
      }
    },
    // GET SHOP MODULE TODO LIST
    handleGetTodo() {
      getTodoListCount().then((res) => {
        const { success, data } = res;
        if (success) {
          this.menus.map((item) => {
            switch (item.routeName) {
              case "ApproveShop":
                item.count =
                  data.NewShopQty > 0 || data.CloseShopQty > 0
                    ? data.NewShopQty + data.CloseShopQty
                    : null;
                break;
              case "ApprovePlan":
                item.count = data.VisitPlanQty > 0 ? data.VisitPlanQty : null;
                break;
              default:
                item.count = null;
                break;
            }
          });
        }
      });
    },
    // VISIT HISTORY
    onClickRight() {
      this.$router.push({ name: "VisitHistory" });
    },
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
    // SEARCH SORT
    toggoleSort() {
      this.queryParams.orderby =
        this.queryParams.orderby == "desc" ? "asc" : "desc";
      this.initData();
    },
    // PREV SHOP IMGS
    viewShopImgs(record) {
      this.imgs = record.new_dowmload_url
        ? record.new_dowmload_url.split(",")
        : [];
      if (this.imgs.length > 0) {
        this.$refs.prevImgs.show(0);
      } else {
        this.$toast("No image!");
      }
    },
    // PULL UP LOAD DATA
    onLoad() {
      setTimeout(() => {
        this.page_no++;
        getShopList(
          Object.assign(this.queryParams, {
            itemsperpage: this.page_size,
            page: this.page_no,
          })
        )
          .then((res) => {
            const { success, data } = res;
            if (success) {
              this.totalShop = data.TotalItems
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
    // search ok
    handleSearchOk(key) {
      this.queryParams.new_name = key;
      this.queryParams.new_code = key;
      this.initData();
    },
    // clear search
    clearSearch() {
      this.queryParams.new_name = "";
      this.queryParams.new_code = "";
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
    // show tools
    showQucikTools(record) {
      this.visible = true;
      this.record = record;
    },
    // close shop
    handleCloseShop() {
      const { new_shopid, new_shop_status } = this.record;
      if (new_shop_status == 2) {
        this.$toast.fail("Already closed");
      } else {
        this.$dialog
          .confirm({
            title: "Tip",
            message: "Are you sure to close the shop?",
          })
          .then(() => {
            this.$toast.loading({ duration: 0, forbidClick: true });
            this.closeLoading = true;
            postCloseShop(null, {
              shopid: new_shopid,
            })
              .then((res) => {
                this.closeLoading = false;
                const { success, message } = res;
                if (success) {
                  this.$toast.success("Close success");
                  this.visible = false;
                  this.initData();
                } else {
                  this.$toast.fail(message);
                }
              })
              .catch(() => {
                this.$toast.fail("Network error");
                this.closeLoading = false;
              });
          })
          .catch(() => {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  padding-top: 90px;
  background: #f5f5f5;
}
.hi-home-menu {
  background: #fff;
}
.hi-home-shoplist {
  padding: 12px 24px;
  .inner-fliter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 60px;
    text-align: center;
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
    .filter-sort {
      position: relative;
      padding-right: 40px;
      &::after {
        content: "";
        right: 15px;
        top: 50%;
        margin-top: -12px;
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 8px 10px 8px;
      }
      &::before {
        content: "";
        right: 15px;
        bottom: 50%;
        margin-bottom: -12px;
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 8px 0 8px;
      }
      &.desc::after {
        border-color: transparent transparent #007bff transparent;
      }
      &.desc::before {
        border-color: #aaa transparent transparent transparent;
      }
      &.asc::after {
        border-color: transparent transparent #aaa transparent;
      }
      &.asc::before {
        border-color: #007bff transparent transparent transparent;
      }
    }
    .filter-icon {
      padding: 0 14px;
      i {
        font-size: $font32;
      }
    }
  }
  .shop-item {
    position: relative;
    margin-bottom: 30px;
    .shop-level,
    .shop-visit,
    .shop-tools {
      position: absolute;
      text-align: center;
      border-radius: 50%;
      z-index: 1;
    }
    .shop-type {
      position: absolute;
      right: 12px;
      top: 20px;
      font-size: 16px;
      z-index: 1;
    }
    .shop-level {
      width: 48px;
      height: 48px;
      line-height: 48px;
      background: #fff;
      font-size: $font24;
      font-weight: bold;
      top: 12px;
      left: 12px;
      z-index: 1;
    }
    .shop-visit {
      width: 42px;
      height: 42px;
      line-height: 42px;
      border: 1PX solid #fff;
      top: 80px;
      right: 20px;
      box-sizing: border-box;
      i {
        line-height: 42px;
        color: #fff;
        font-weight: bold;
      }
    }
    .shop-tools {
      width: 42px;
      height: 42px;
      line-height: 42px;
      background: #fff;
      top: 150px;
      right: 20px;
      i {
        line-height: 42px;
        color: #1989fa;
        font-weight: bold;
      }
    }
    .shop-item-innter {
      display: flex;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.2);
      background-image: linear-gradient(131deg, #4094df 0%, #81cde8 100%);
      .shop-pics {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 10px;
        overflow: hidden;
        background: #ccc;
        position: relative;
        .shop-status {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          z-index: 1;
          .shop-status-box {
            display: flex;
            .shop-status-item {
              font-size: 18px;
              flex: 1;
              background: #333;
              color: #fff;
              text-align: center;
              box-sizing: border-box;
              padding: 6px 2px;
              white-space: nowrap;
              &.opened {
                background: #64bbe3;
              }
              &.closed {
                background: red;
              }
              &.jonined {
                background: #70b603;
              }
              &.visit {
                background: #f59a23;
              }
            }
          }
        }
      }
      .shop-info {
        flex: 1;
        box-sizing: border-box;
        padding: 6px 10px;
        padding-bottom: 0;
        overflow: hidden;
        position: relative;
        h2 {
          font-size: $font24;
          margin-bottom: 5px;
          color: #fff;
        }
        p {
          margin-bottom: 5px;
          font-size: 18px;
        }
        .channel {
          max-width: 200px;
        }
        .total-detail {
          display: flex;
          width: 88%;
          margin-top: 0;
          .total-item {
            flex: 1;
            text-align: center;
            padding: 4px 0;
            color: #fff;
            font-size: 18px;
            white-space: nowrap;
            span {
              display: block;
              font-size: $font28;
              font-weight: bold;
            }
          }
        }
        .submitor{
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          box-sizing: border-box;
          padding:6px 10px;
          background: rgba($color: #1f1972, $alpha: .2);
          font-size: 18px;
          color: #FFF;
        }
      }
    }
    .shop-item-footer {
      width: 90%;
      margin: 0 auto;
      background: #fff;
      border-radius: 0 0 10px 10px;
      box-shadow: 0 5px 25px rgba($color: #000000, $alpha: 0.2);
      padding: 12px;
      position: relative;
      display: flex;
      align-items: center;
      .shop-map{
        img{
          display: block;
          width: 34px;
          height: 34px;
        }
      }
      .shop-address{
        flex: 1;
        overflow: hidden;
        margin-left: 10px;
        margin-right: 10px;
        color: #999;
        line-height: 160%;
        font-size: 18px;
      }
      span {
        font-weight: bold;
        color: #2058ab;
      }
      .shop-card {
        img {
          display: block;
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}
.arrow-right {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 50px;
  animation: fadeInOut 1500ms ease 0s 3;
  opacity: 0;
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>
<style lang="scss">
.shop-home {
  .van-search__content {
    background: #fff;
  }
}
.hi-home-menu,
.quick-menu {
  .van-grid-item__content {
    padding-left: 2px;
    padding-right: 2px;
    justify-content: start;
  }
  .van-grid-item__text {
    text-align: center;
    word-break: break-word;
  }
}
</style>
