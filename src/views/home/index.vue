<template>
  <div class="page-hastab app-home">
    <!-- Swiper  -->
    <div class="swiper-box">
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image width="100%" height="100%" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="home-page-inner">
      <!-- Announcement -->
      <div class="home-announcement">
        <div class="home-notice">
          <notice />
        </div>
        <annoucement />
      </div>

      <!-- Tools -->
      <div class="home-tools">
        <div class="home-tools-item"
          v-action:homePageButton:ModelPolicy>
          <img src="@/assets/images/home/dollar.png">
          <div class="home-tools-item__text">Model Policy</div>
        </div>
        <div class="home-tools-item"
          v-action:homePageButton:PolicyScheme>
          <img src="@/assets/images/home/dollar.png">
          <div class="home-tools-item__text">Policy Scheme</div>
        </div>
      </div>

      <!-- Dashboard -->
      <div class="home-dashboard" v-action:shopMenu:Report>
        <router-link to="shop/report?tab=0" class="home-dashboard-item ff">
          <img src="@/assets/images/home/chart_bar.png">
          <div class="home-dashboard-item__text">
            <h2>Dashboard</h2>
            <p>FF</p>
          </div>
        </router-link>
        <router-link to="shop/report?tab=1" class="home-dashboard-item hi">
          <img src="@/assets/images/home/chart_line.png">
          <div class="home-dashboard-item__text">
            <h2>Dashboard</h2>
            <p>Hi Shop</p>
          </div>
        </router-link>
      </div>

      <!-- To Do List -->
      <div class="home-todolist">
        <todo-list />
      </div>
    </div>
    <tab-bar />
  </div>
</template>
<script>
import _throttle from "lodash.throttle";
import TabBar from "@/components/TabBar";
import Annoucement from "./components/Annoucement";
import TodoList from "./components/TodoList";
import Notice from "./components/Notice";
import homePage from "@/assets/images/home/icon/homePage.png";

export default {
  name: "AppHome",
  components: {
    TabBar,
    Annoucement,
    TodoList,
    Notice
  },
  data() {
    return {
      images: [homePage],
      position_code: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // Hide Loading
    handleHideLoading() {
      this.$toast.clear();
    },

    // Get User Position Value
    getUserInfo() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      this.$store.dispatch('user/GetInfo').then((res) => {
        const { success, data } = res;
        if (success) {
          const { user_position } = data.Items;
          this.position_code = user_position[0].position_value;
        } else {
          this.$toast.fail(res.message);
        }
      }).catch(() => {
        this.handleHideLoading();
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.app-home {
  background: #f5f5f5;
  .home-page-inner{
    padding: 0 24px;
    margin-bottom: 24px;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: auto;
    text-align: center;
  }
  .attendant-box{
    padding:0 32px;
    margin-top: -60px;
    position: relative;
    z-index: 999;
    .attendant-inner{
      background-image: linear-gradient(to top, #2d619d, #67aced);
      padding: 0 32px;
      height: 120px;
      border-radius: 60px;
      display: flex;
      align-items: center;
      img{
        display: block;
        width: 64px;
        height: 64px;
      }
      span{
        display: block;
        flex: 1;
        margin-left: 24px;
        color: #FFF;
        font-size: $font30;
      }
    }
  }

  .home-notice{
    border-bottom: 1PX solid #E2E2E2;
    margin-top: 24px;
  }

  .home-tools{
    background: #FFF;
    padding: 6px 24px;
    .home-tools-item{
      height: 86px;
      background-image: linear-gradient(to top, #2f73bf, #1c86f1);
      display: flex;
      border-radius: 8px;
      align-items: center;
      padding: 0 24px;
      font-size: $font28;
      color: #FFF;
      margin: 24px 0;
      img{
        display: block;
        width: 42px;
        height: 42px;
        margin-right: 12px;
      }
      .home-tools-item__text{
        flex: 1;
        text-align: center;
      }
    }
  }

  .home-dashboard{
    display: flex;
    .home-dashboard-item{
      flex: 1;
      display: flex;
      align-items: center;
      margin: 24px;
      padding: 24px 12px;
      box-sizing: border-box;
      border-radius: 12px;
      &.ff{
        background: #89caef;
      }
      &.hi{
        background: #a8e1c3;
      }
      img{
        display: block;
        width: 64px;
        height: 64px;
        margin-right: 12px;
      }
      .home-dashboard-item__text{
        line-height: 42px;
        h2{
          font-size: $font28;
          color: #c831c5;
        }
      }
    }
  }
}
</style>
<style>
.collapse-title {
  font-weight: bold;
  color: #0000cd;
}
.home-todolist__title i{
  min-width: 0.64rem;
}
</style>
