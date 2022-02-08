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
    <div>
      <van-row class="body-row" style="margin: 0.16rem 0">
        <van-button
          style="margin-left: 0.16rem"
          v-action:homePageButton:PolicyScheme
          type="info"
          size="small"
          @click="
            () => {
              this.$throttle.throttle(onButton_PolicyScheme());
            }
          "
          >{{ this.$t("home.button.PolicyScheme") }}</van-button
        >
        <van-button
          style="margin-left: 0.16rem"
          v-action:homePageButton:ModelPolicy
          type="info"
          size="small"
          @click="
            () => {
              this.$throttle.throttle(onButton_ModelPolicy());
            }
          "
          >{{ this.$t("home.button.ModelPolicy") }}</van-button
        >
      </van-row>
    </div>
    <!-- Announcement -->
    <div>
      <div class="home-notice">
        <notice />
      </div>
      <annoucement />
    </div>

    <!-- Attendant -->
    <div class="form-group">
      <van-cell
        title-class="collapse-title"
        :title="this.$t('pmt.menu.Attendant')"
        is-link
        to="pmt/attendant"
      />
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
            <van-badge :content="toDoTaskListCount">
              <div class="child" />
            </van-badge>
          </template>
          <div class="to-do-list">
            <!-- <van-cell title="test" label="item.sub" to="pmt/visitStatistics" /> -->
            <van-cell
              is-link
              class="to-do-list-item"
              v-for="(item, index) in toDoTaskList"
              :key="index"
            >
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <van-row type="flex" class="todo-item">
                  <van-col span="6">
                    <van-cell
                      center
                      class="lable-title-pmt"
                      :title="$t('home.lable.toDoTaskItemPmt')"
                    />
                  </van-col>
                  <van-col span="16">
                    <van-cell
                      v-if="item.tp == 1"
                      :title="$t('home.lable.toDoTaskItemCompetitorPrice')"
                      to="pmt/competitorPrice"
                    />
                    <van-cell
                      v-if="item.tp == 2"
                      :title="$t('home.lable.toDoTaskItemStockCheck')"
                      to="pmt/stocKCheck"
                    />
                    <van-cell
                      v-if="item.tp == 3"
                      :title="item.nm"
                      :label="item.sub"
                      :to="{
                        name: 'testDetail',
                        query: {
                          selectTestId: item.id,
                          testTime: 150,
                          isTest: true,
                        },
                      }"
                    />
                    <van-cell
                      v-if="item.tp == 4"
                      :title="$t('home.lable.toDoTaskItemCompetitorsSellOut')"
                      to="pmt/competitorSales"
                    />
                    <van-cell
                      v-if="item.tp == 5"
                      :title="$t('home.lable.toDoTaskItemVisitStatistics')"
                      to="pmt/visitStatistics"
                    />
                    <van-cell
                      v-if="item.tp == 6"
                      :title="item.nm"
                      to="pmt/workPlan"
                    />

                    <van-cell
                      v-if="item.tp == 7"
                      :title="$t('home.lable.toDoTaskItemApprovalList')"
                      :label="item.sub"
                      to="pmt/approvalList"
                    />
                    <van-cell
                      v-if="item.tp == 8"
                      :title="$t('home.lable.toDoTaskItemCollaboration')"
                      :label="item.sub"
                      to="pmt/collaboration"
                    />

                    <!-- <van-cell :title="$t('pmt.menu.Attendant')" label="11111" /> -->
                  </van-col>
                </van-row>
              </template>
            </van-cell>
            <!-- shop module todo list -->
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
import ChangeLang from "@/components/ChangeLang";
import { postGetToDo } from "@/api/homePage";
import { getUserinfoByToken } from "@/api/user";
import Vue from "vue";

export default {
  name: "AppHome",
  components: {
    TabBar,
    Annoucement,
    ShopTodoList,
    Notice,
    ChangeLang,
  },
  data() {
    return {
      images: [homePage],
      activeNames: ["1"],
      toDoTaskList: [],
      toDoTaskListCount: 0,
      position_code: "PMT",
    };
  },
  created() {
    this.GetToDoTaskList();
    this.getUserInfo();
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    onButton_PolicyScheme() {
      switch (this.position_code) {
        case "1":
          this.$router.push("psPolicyScheme");
          break;
        case "2":
          this.$router.push("pstlPolicyScheme");
          break;
        case "3":
          this.$router.push("mePolicyScheme");
          break;
        case "4":
          this.$router.push("metlPolicyScheme");
          break;
        case "5":
          this.$router.push("spModelPolicyScheme");
          break;
        case "6":
          this.$router.push("shopPicPolicyScheme");
          break;
      }
    },

    // to do
    onButton_ModelPolicy() {
      switch (this.position_code) {
        case "5":
          this.$router.push("spModelPolicyScheme");
          break;
        case "1":
          this.$router.push("psHotModelPolicyScheme");
          break;
      }
    },

    GetToDoTaskList() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      postGetToDo()
        .then((res) => {
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var data = res.data;
            this.toDoTaskList = data;
            this.toDoTaskListCount = data.length;
            this.handleHideLoading();
          } catch (e) {
            this.$toast.fail(e.message);
            this.handleHideLoading();
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
          this.handleHideLoading();
        })
        .finally(() => {
          this.handleHideLoading();
        });
    },

    getUserInfo() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getUserinfoByToken()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { user_position } = data.Items;
            this.position_code = user_position[0].position_value;
            this.$store.state.position_code = this.position_value;
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((error) => {
          this.$toast.fail(error.message);
        })
        .finally(() => {
          this.handleHideLoading();
        });
    },
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
