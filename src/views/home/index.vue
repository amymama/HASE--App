/* eslint-disable vue/valid-v-bind */
<template>
  <div class="page-hastab app-home">
    <!-- 轮播图  -->
    <div>
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image width="100%" height="100%" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- Announcement -->
    <div>
      <div class="home-notice">
        <notice />
      </div>
      <annoucement />
    </div>

    <!-- To-do Task -->
    <div class="form-group">
      <van-collapse v-model="activeNames">
        <van-collapse-item
          name="1"
          title-class="collapse-title"
          :title="this.$t('home.lable.toDoTask')"
        >
          <template #right-icon>
            <van-icon name="wap-nav" />
            <van-badge>
              <div class="child" />
            </van-badge>
          </template>
          <div class="to-do-list">
            <shop-todo-list />
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <tab-bar />
  </div>
</template>
<script>
import TabBar from "@/components/TabBar";
import Annoucement from "./components/Annoucement";
import ShopTodoList from "./components/ShopTodoList";
import Notice from "./components/Notice";
import homePage from "@/assets/images/home/icon/homePage.png";

export default {
  name: "AppHome",
  components: {
    TabBar,
    Annoucement,
    ShopTodoList,
    Notice
  },
  data() {
    return {
      images: [homePage],
      activeNames: ["1"]
    };
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    }
  },
};
</script>
<style lang="scss" scoped>
.app-home {
  background: #f5f5f5;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: auto;
    text-align: center;
    // background-color: #39a9ed;
  }
  .policy-scheme {
    margin: 10px;
  }
  .form-group {
    margin: 12px;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    .to-do-list {
      background-color: #f5f5f5;
    }
    .to-do-list-item {
      // text-align: center;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      padding: 0px;
      // border: 1px solid;
      margin-bottom: 5px;

      .lable-title-shop {
        padding-left: 0rem;
        padding-right: 0rem;
        height: 1.75rem;
        text-align: center;
        // padding-top: 30px;
        background-color: #00ee00;
        color: white;
      }
      .lable-title-pmt {
        padding-left: 0rem;
        padding-right: 0rem;
        height: 100%;
        text-align: center;
        // padding-top: 30px;
        background-color: #00bfff;
        color: white;
      }
    }

    .van-cell__title {
      font-weight: bold;
    }
  }
}
</style>
<style>
.collapse-title {
  font-weight: bold;
  color: #0000cd;
}
</style>
