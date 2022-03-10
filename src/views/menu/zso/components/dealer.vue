<template>
  <div class="search-bar">
    <van-popup
      v-model="dealerShow"
      :close-on-click-overlay="false"
      :style="{
        width: '100%',
        height: '100%',
      }"
    >
      <van-nav-bar
        left-arrow
        @click-left="onCancel"
        :title="$t('Dealer Name')"
      />
      <!-- Search bar -->
      <div class="search-top">
        <van-field
          v-model="keyword"
          autofocus="false"
          placeholder="Please input keywords"
          background="#f2f2f2"
          shape="round"
          action
          clearable
          @input="onSearchChange"
        />
        <div class="bottomBox"></div>

        <!-- @search="onSearch" @cancel="onCancel" -->
      </div>
      <div class="detailTitleBox">
        <div class="bottomBox"></div>
        <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
        <van-swipe-cell
          class="shop-status-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="dealerTextBox" @click="selectedDealer(item)">
            <div class="dealerText">
              <p class="detailTitle">{{ item.dealerName }}</p>
              <p>{{ item.dealerCode }}</p>
            </div>
            <div class="bottomBox"></div>
          </div>
        </van-swipe-cell>
      </div>
    </van-popup>
  </div>
</template>
<script>
// import { orderGetDealerList } from "@/api/shop";
import { getShopListBySelf, postShopOperation } from "@/api/shop";
import { orderGetDealerList, GetDealerList } from "@/api/order";
export default {
  props: {
    allList: {
      type: Array,
    },
  },
  data() {
    return {
      dealerShow: false,
      keyword: "",
      page_no: 0,
      page_size: 20,
      loading: false,
      error: false,
      noRes: false,
      finished: false,
      list: [],
      // allList: [],
    };
  },
  methods: {
    selectedDealer(val) {
      console.log(val, "111");
      this.$emit("ok", val);
      this.onCancel();
    },
    onSearchChange(value) {
      console.log("value2223", value);
      this.list = this.allList;
      if (this.list.length > 0) {
        const _list = [];
        this.list.map((item) => {
          if (typeof value === "string" && item.dealerName && item.dealerCode) {
            const _key = String(value).toLowerCase();
            if (
              item.dealerName.toLowerCase().includes(_key) ||
              item.dealerCode.toLowerCase().includes(_key)
            ) {
              _list.push(item);
            }
          }
        });
        this.list = [..._list];
        console.log("dealer22", this.list);
      }
    },
    onShow() {
      this.dealerShow = true;
      this.list = this.allList;
      console.log(this.list,'list')
    },
    onCancel() {
      this.dealerShow = false;
      this.keyword = "";
    },
    // getDataDealer() {
    //   this.$toast.loading({ duration: 0 });
    //   GetDealerList({ userId: this.$store.getters.userInfo.id })
    //     .then((res) => {
    //       const { success, data } = res;
    //       // this.loading = true;
    //       if (success) {
    //         var Items = data || [];
    //         // this.loading = false;
    //         this.$toast.clear();
    //         this.allList = this.allList.concat(Items);
    //         this.list = this.allList;
    //         if (this.allList.length === 0) {
    //           this.noRes = true;
    //         }
    //       }
    //     })
    //     .catch(() => {
    //       this.page_no = 0;
    //       // this.loading = false;
    //       // this.error = true;
    //       this.$toast.clear();
    //     });
    // },
  },
};
</script>
<style lang="scss" scoped>
.detailTitleBox {
  .bottomBox {
    height: 0.2rem;
    background-color: #f5f5f5;
  }
  .dealerText {
    margin: 0.3rem;
    .detailTitle {
      margin-bottom: 0.2rem;
    }
  }
}
.search-top {
  background-color: #f5f5f5;
}
</style>