<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    >
    </TopBar>
    <!-- <van-form @submit="onSubmit" class=""> -->
    <div class="infog-card form-group">
      <van-tabs v-model="active" type="card" @click="onClick()">
        <van-tab>
          <template #title>
            <van-icon name="description" />
            {{ $t("pmt.test.tabTitleTest") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <div
                class="currentItem form-group"
                v-for="item in testList"
                :key="item.Id"
              >
                <van-card
                  :centered="true"
                  :title="item.new_test_name"
                  :desc="
                    getValidate(item.new_validate_from, item.new_validate_to)
                  "
                  :thumb="itemIcon"
                  @click="onClick_Test(item.Id, item.new_test_time, true)"
                >
                  <template #desc>
                    <van-row class="item-desc">
                      <van-col :span="24">
                        <span class="card__desc">{{ item.new_test_code }}</span>
                      </van-col>
                      <van-col :span="24">
                        <span class="card__desc">{{
                          getValidate(
                            item.new_validate_from,
                            item.new_validate_to
                          )
                        }}</span>
                      </van-col>
                    </van-row>
                  </template>
                </van-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab>
          <template #title>
            <van-icon name="todo-list-o" />
            {{ $t("pmt.test.tabTitleComplete") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <div
                class="currentItem form-group"
                v-for="item in completeList"
                :key="item.Id"
              >
                <!-- <span> {{ item}}</span> -->
                <!-- ITEM BEGIN -->
                <van-card
                  :centered="true"
                  :title="item.new_test_name"
                  :desc="
                    getValidate(item.new_validate_from, item.new_validate_to)
                  "
                  :thumb="itemIcon"
                  @click="onClick_Complete(item.Id, item.new_test_time, false)"
                />
                <!-- ITEM END -->
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  postTestList,
  getElearningCourse,
  postElearningCourseFavorite,
  getCourseClicked,
  getTestClicked,
} from "@/api/eLearning";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

// import listItemIcon from '@assets/images/pmt/elearning/course_home_icon@3x.png'
// // import backgroundImage from '@assets/images/elearning/test_bg@3x.png'
// import icon_visitStatistics from "@/assets/images/pmt/icon/visitStatistics.png";

import listItemIcon from "@/assets/images/pmt/e-learning/test_home_icon.png";

import { Toast } from "vant";
export default {
  name: "test",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.test.tabTitleTest"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      itemIcon: listItemIcon,

      active: 0,
      seaarch_Data: "",
      count: 0,

      loading: false,
      finished: false,
      isLoading: false,

      testList: [],
      completeList: [],
      courseFavoriteList: [],

      page: 1,
      page_size: 10,
    };
  },
  created() {},
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickLeft() {
      this.$router.go(-1);
    },

    onClick(value) {
      switch (this.active) {
        case 0:
          this.page = 1;
          this.loading = false;
          this.finished = false;
          this.testList = [];
          this.completeList = [];
          break;
        case 1:
          this.page = 1;
          this.loading = false;
          this.finished = false;
          this.testList = [];
          this.completeList = [];
          break;
      }
    },

    onSearch() {
      this.loading = false;
      this.finished = false;
    },

    onRefresh() {
      this.page = 1;
      this.testList = [];
      this.completeList = [];
      this.courseFavoriteList = [];

      this.isLoading = true;
      this.loading = false;
      this.finished = false;
    },

    onLoad() {
      let params = {
        search_type: this.active + 1,
      };

      var data = Object.assign(
        {
          itemsperpage: this.page_size,
          page: this.page,
        },
        params
      );

      switch (this.active) {
        case 0:
          postTestList(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                debugger;
                // this.testList.push(data);
                // this.testList.push(data);
                if (success && data.Items && data.Items.length > 0) {
                  this.testList = [...this.testList, ...data.Items];
                  console.log("data.Items.length():" + data.Items.length);
                  console.log("this.page_size:" + this.page_size);
                  console.log(
                    "res.Items.length !== this.page_size;:",
                    data.Items.length !== this.page_size
                  );
                  this.page++;
                  this.finished = data.Items.length !== this.page_size;
                } else {
                  this.finished = true;
                }
                this.isLoading = !this.finished;
              } else {
                this.$toast.fail(res.message);
              }
            })
            .catch((error) => {
              this.$toast.fail(error.message);
            })
            .finally(() => {});
          break;

        case 1:
          postTestList(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                if (success && data.Items && data.Items.length > 0) {
                  this.completeList = [...this.completeList, ...data.Items];
                  console.log("data.Items.length():" + data.Items.length);
                  console.log("this.page_size:" + this.page_size);
                  console.log(
                    "res.Items.length !== this.page_size;:",
                    data.Items.length !== this.page_size
                  );
                  this.page++;
                  this.finished = data.Items.length !== this.page_size;
                } else {
                  this.finished = true;
                }
                this.isLoading = !this.finished;
              } else {
                this.$toast.fail(res.message);
              }
            })
            .catch((error) => {
              this.$toast.fail(error.message);
            })
            .finally(() => {});
          // this.finished = true;

          break;
      }
    },

    getValidate(form, to) {
      var formDate = new Date(form);
      // var formDateStr = formDate.toDateString();

      var times =
        formDate.getFullYear() +
        "/" +
        (formDate.getMonth() + 1) +
        "/" +
        formDate.getDate() +
        " " +
        formDate.getHours() +
        ":" +
        formDate.getMinutes();

      // var toDate = new Date(to);
      // var toDateStr = toDate.toDateString();
      // return (
      //   this.$t("pmt.course.ListItemValidate") +
      //   ": " +
      //   formDateStr +
      //   " - " +
      //   toDateStr
      // );
      return times;
    },

    onClick_Test(Id, testTime, isTest) {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var params = {
        new_test_id: Id,
      };
      getTestClicked(params)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.$router.push({
              name: "testDetail",
              query: {
                selectTestId: Id,
                testTime: testTime,
                isTest: isTest,
              },
            });
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

    // to do
    onClick_Complete(Id, testTime, isTest) {
      this.$router.push({
        name: "testDetail",
        query: {
          selectTestId: Id,
          testTime: testTime,
          isTest: isTest,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.currentItem {
  .van-card {
    background-color: white;
    background: no-repeat center/100%
      url("../../../../assets/images/pmt/e-learning/test_bg.png");
    .van-card__thumb {
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      width: 1.56667rem;
      height: 1.56667rem;
      margin: 0.33333rem;
      margin-right: 0.53333rem;
    }
  }
  .van-card__title {
    font-weight: bold;
    color: white;
  }
  .van-card__desc {
    white-space: break-spaces;
    max-height: 100px;
    color: white;
  }
  .card__desc {
    color: white;
  }
  .item-desc {
    padding-top: 10px;
  }
  // white-space: break-spaces;
}
</style>
<style>
</style>
