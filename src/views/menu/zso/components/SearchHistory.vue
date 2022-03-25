<template>
  <div class="search-bar">
    <van-popup
      v-model="show"
      :close-on-click-overlay="false"
      :style="{
        width: '100%',
        height: '100%',
      }"
    >
      <!-- Search bar -->
      <div class="search-top">
        <van-search
          v-model="keyword"
          show-action
          autofocus="false"
          placeholder="Please input keywords"
          background="#f2f2f2"
          shape="round"
          @search="onSearch"
          @cancel="onCancel"
        />
      </div>
      <!-- History list -->
      <div class="search-history">
        <div class="search-history-header">
          <span>{{$t('Search History')}}</span>
          <!-- <van-icon name="delete-o" @click="handleDelete" /> -->
        </div>

        <!-- <div class="search-tags">
          <van-button
            class="item-tag"
            v-for="(item, index) in list"
            :key="index"
            round
            plain
            style="color: #666"
            @click="selectTag(item)">
            {{item}}
          </van-button>
        </div> -->
        <div>
          <div class="bottomBox"></div>
          <van-swipe-cell
            class="shop-status-item"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="dealerText" @click="selectHistoryClick(item)">
              <p class="detailTitle">{{ item }}</p>
            </div>
            <div class="bottomBox"></div>
          </van-swipe-cell>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SaveUserSearch, GetUserSearchList } from "@/api/order";
export default {
  name: "SearchHistoy",
  props: {
    searchType: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      keyword: "",
      show: false,
      list: [],
    };
  },
  created() {},
  methods: {
    selectHistoryClick(val) {
      this.keyword = this.keyword + val;
    },
    // Show history
    handleShow() {
      this.show = true;
      this.keyword=''
      //获取历史搜索记录
      GetUserSearchList({ userId: this.$store.getters.userInfo.id })
        .then((res) => {
          if (res.success) {
            this.list = res.data;
          }
        })
        .catch(() => {});
    },
    // clear tag
    // clearTag() {
    //   this.$store.commit("history/CLEAR_HISTORY", {
    //     type: this.searchType,
    //   });
    // },
    // search
    onSearch() {
      this.$emit("ok", this.keyword);
      this.show = false;
    //   this.addTag();
      SaveUserSearch({
        userId: this.$store.getters.userInfo.id,
        userRealname: this.$store.getters.userInfo.realname,
        SearcKeyWord: this.keyword,
      }).then((res) => {
        console.log("333", res);
      });
      // list;
    },
    // search for history tag
    selectTag(val) {
      this.$emit("ok", val);
      this.show = false;
    },
    // clear all history
    // handleDelete() {
    //   this.$dialog
    //     .confirm({
    //       title: "Tip",
    //       message: "Confirm to clear history?",
    //     })
    //     .then(() => {
    //       this.clearTag();
    //     });
    // },
    // Cancel search
    onCancel() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.search-history-header {
  display: flex;
  justify-content: space-between;
  font-size: $font32;
  padding: 30px;
  border-bottom: 1px solid #eee;
  span {
    color: #666;
    font-weight: bold;
  }
  i {
    color: #666;
  }
}
.dealerText {
  margin: 0.3rem;
  .detailTitle {
    margin-bottom: 0.2rem;
  }
}
.search-tags {
  padding: 30px;
  .item-tag {
    margin: 10px;
  }
}
.bottomBox {
  height: 0.2rem;
  background-color: #f5f5f5;
}
</style>