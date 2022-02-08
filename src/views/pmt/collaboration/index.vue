<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
      @set_onClickRight="topBarClickRight"
    >
    </TopBar>
    <!-- <van-form @submit="onSubmit" class=""> -->
    <div class="infog-card form-group">
      <!-- <h2 class="card-title">
        {{ this.$t("pmt.shop") }}
      </h2> -->
      <van-field
        v-model="selectShopName"
        is-link
        readonly
        label=""
        @click="showShopPicker = true"
        input-align="right"
        label-width="120px"
        :rules="[
          {
            required: true,
            message: this.$t('pmt.giftRegistration.ShopMessage'),
          },
        ]"
      />
      <van-popup v-model="showShopPicker" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="shopSelectData"
          @cancel="showShopPicker = false"
          @confirm="onConfirm_Shop"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>
    </div>
    <div class="infog-card form-group workPlan">
      <van-tabs v-model="active" type="card" @click="onClick()">
        <van-tab>
          <template #title>
            <!-- <van-icon name="description" /> -->
            {{ $t("pmt.collaboration.toDoList") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <div class="currentItem" v-for="item in toDoList" :key="item.Id">
                <van-card
                  :centered="true"
                  @click="onClick_ListItem(item.Id, 0)"
                >
                  <template #title>
                    <!-- <van-row>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_title"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListTitle')"
                        />
                      <!-- </van-col>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_question_level_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListQuestionLevel')"
                        />
                      <!-- </van-col>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_user_real_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListFrom')"
                        />
                      <!-- </van-col>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_cc_user_real_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListCCTo')"
                        />
                      <!-- </van-col>
                    </van-row> -->
                  </template>
                </van-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab>
          <template #title>
            <!-- <van-icon name="todo-list-o" /> -->
            {{ $t("pmt.collaboration.draft") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <div class="currentItem" v-for="item in drafList" :key="item.Id">
                <!-- <span> {{ item}}</span> -->
                <!-- ITEM BEGIN -->
                <van-card
                  :centered="true"
                  @click="onClick_ListItem(item.Id, 1)"
                >
                  <template #title>
                    <!-- <van-row>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_title"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListTitle')"
                        />
                      <!-- </van-col>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_question_level_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListQuestionLevel')"
                        />
                      <!-- </van-col>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_user_real_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListFrom')"
                        />
                      <!-- </van-col>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_cc_user_real_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListCCTo')"
                        />
                      <!-- </van-col>
                    </van-row> -->
                  </template>
                </van-card>
                <!-- ITEM END -->
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab>
          <template #title>
            <!-- <van-icon name="like-o" /> -->
            {{ $t("pmt.collaboration.open") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <div class="currentItem" v-for="item in openList" :key="item.Id">
                <!-- <span> {{ item}}</span> -->
                <!-- ITEM BEGIN -->
                <van-card
                  :centered="true"
                  @click="onClick_ListItem(item.Id, 2)"
                >
                  <template #title>
                    <!-- <van-row>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_title"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListTitle')"
                        />
                      <!-- </van-col>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_question_level_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListQuestionLevel')"
                        />
                      <!-- </van-col>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_user_real_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListFrom')"
                        />
                      <!-- </van-col>
                      <van-col span="24"> -->
                        <van-field
                          readonly
                          v-model="item.new_cc_user_real_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListCCTo')"
                        />
                      <!-- </van-col>
                    </van-row> -->
                  </template>
                </van-card>
                <!-- ITEM END -->
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab>
          <template #title>
            <!-- <van-icon name="like-o" /> -->
            {{ $t("pmt.collaboration.closed") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <div
                class="currentItem"
                v-for="item in closedList"
                :key="item.Id"
              >
                <!-- <span> {{ item}}</span> -->
                <!-- ITEM BEGIN -->
                <van-card
                  :centered="true"
                  @click="onClick_ListItem(item.Id, 3)"
                >
                  <template #title>
                    <van-row>
                      <van-col span="24">
                        <van-field
                          readonly
                          v-model="item.new_title"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListTitle')"
                        />
                      </van-col>
                      <van-col span="24">
                        <van-field
                          readonly
                          v-model="item.new_question_level_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListQuestionLevel')"
                        />
                      </van-col>
                      <van-col span="24">
                        <van-field
                          readonly
                          v-model="item.new_user_real_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListFrom')"
                        />
                      </van-col>
                      <van-col span="24">
                        <van-field
                          readonly
                          v-model="item.new_cc_user_real_name"
                          :colon="true"
                          label-width="160px"
                          input-align="left"
                          :label="$t('pmt.collaboration.ListCCTo')"
                        />
                      </van-col>
                    </van-row>
                  </template>
                </van-card>
                <!-- ITEM END -->
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <div class="tab-bar">
      <van-tabbar route>
        <van-button block type="info" @click="onButton_Create">{{
          this.$t("pmt.workPlan.buttonCreate")
        }}</van-button>
      </van-tabbar>
    </div> -->
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  postCourseList,
  getElearningCourse,
  postElearningCourseFavorite,
  getCourseClicked,
} from "@/api/eLearning";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

import {
  postGettodolistpage,
  postGetcollaborationpage,
} from "@/api/collaboration";

// import listItemIcon from '@assets/images/pmt/elearning/course_home_icon@3x.png'
// // import backgroundImage from '@assets/images/elearning/test_bg@3x.png'
// import icon_visitStatistics from "@/assets/images/pmt/icon/visitStatistics.png";

import { Toast } from "vant";
export default {
  name: "collaboration",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.collaboration.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: '<i class="van-icon van-icon-plus"><!----></i>',

      active: 0,
      seaarch_Data: "",
      count: 0,

      loading: false,
      finished: true,
      isLoading: false,

      courseCurrentList: [],
      coursePreviousList: [],
      courseFavoriteList: [],

      page: 1,
      page_size: 10,
      toDoList: [],
      drafList: [],
      openList: [],
      closedList: [],

      showShopPicker: false,
      selectShopName: "",
      shopSelectData: [],
      selectShopId: "",
    };
  },
  created() {
    this.getSelectData();
  },
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
          this.loading = false;
          this.finished = false;
          this.page = 1;
          this.page_size = 10;
          this.toDoList = [];
          this.drafList = [];
          this.openList = [];
          this.closedList = [];
          break;
        case 1:
          this.loading = false;
          this.finished = false;
          this.page = 1;
          this.page_size = 10;
          this.toDoList = [];
          this.drafList = [];
          this.openList = [];
          this.closedList = [];
          break;
        case 2:
          this.loading = false;
          this.finished = false;
          this.page = 1;
          this.page_size = 10;
          this.toDoList = [];
          this.drafList = [];
          this.openList = [];
          this.closedList = [];
          break;
        case 3:
          this.loading = false;
          this.finished = false;
          this.page = 1;
          this.page_size = 10;
          this.toDoList = [];
          this.drafList = [];
          this.openList = [];
          this.closedList = [];
          break;
      }
    },

    onSearch() {
      this.loading = false;
      this.finished = false;
      this.page = 1;
      this.page_size = 10;
    },

    onRefresh() {
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.page = 1;
      this.page_size = 10;
      this.toDoList = [];
      this.drafList = [];
      this.openList = [];
      this.closedList = [];
    },

    onLoad() {
      var data = {
        new_status: this.active,
        orderby: "",
        desc: true,
        itemsperpage: this.page_size,
        page: this.page,
        new_shop_id: this.selectShopId,
      };
      switch (this.active) {
        case 0:
          postGettodolistpage(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                if (success && data.Items && data.Items.length > 0) {
                  this.toDoList = [...this.toDoList, ...data.Items];
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

        case 1:
          postGetcollaborationpage(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                if (success && data.Items && data.Items.length > 0) {
                  this.drafList = [...this.drafList, ...data.Items];
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

        case 2:
          postGetcollaborationpage(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                if (success && data.Items && data.Items.length > 0) {
                  this.openList = [...this.openList, ...data.Items];
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
        case 3:
          postGetcollaborationpage(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                if (success && data.Items && data.Items.length > 0) {
                  this.closedList = [...this.closedList, ...data.Items];
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
                // this.loading = false;
                console.log("his.isLoading :", this.isLoading);
              } else {
                this.$toast.fail(res.message);
              }
            })
            .catch((error) => {
              this.$toast.fail(error.message);
            })
            .finally(() => {});
          break;
      }
    },

    getValidate(form, to) {
      var formDate = new Date(form);
      var formDateStr = formDate.toDateString();

      var toDate = new Date(to);
      var toDateStr = toDate.toDateString();
      return (
        this.$t("pmt.course.ListItemValidate") +
        ": " +
        formDateStr +
        " - " +
        toDateStr
      );
    },

    topBarClickRight() {
      this.$router.push({
        name: "collaborationDetail",
        query: {},
      });
    },

    onClick_ListItem(Id, index) {
      this.$router.push({
        name: "collaborationDetail",
        query: {
          new_status: this.active,
          id: Id,
        },
      });
    },

    matchFileSuffixType(fileName) {
      // 后缀获取
      var suffix = "";
      // 获取类型结果
      var result = "";
      try {
        var flieArr = fileName.split(".");
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = "";
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false;
        return result;
      }
      // 图片格式
      var imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
      // 进行图片匹配
      result = imglist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = "image";
        return result;
      }

      // 匹配 pdf
      var pdflist = ["pdf"];
      result = pdflist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = "pdf";
        return result;
      }

      // 匹配 视频
      var videolist = ["mp4"];
      result = videolist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = "video";
        return result;
      }
      // 其他 文件类型
      result = "other";
      return result;
    },

    onConfirm_Shop(value) {
      //
      console.log(value);
      this.selectShopId = value.value;
      this.selectShopName = value.text;
      this.showShopPicker = false;
      
      this.onClick(1);
    },

    getSelectData() {
      this.shopSelectData = [];
      var data = {};
      this.$toast.loading({ duration: 0, forbidClick: true });
      postUserPermission(data)
        .then((res) => {
          // 绑定表格数据
          if (res.success) {
            var resShop = res.data.shopPermission;
            if (resShop.length > 0) {
              this.selectShopId = resShop[0].new_shop_id;
              // this.value = resShop[0].new_shop_id;
              this.selectShopName = resShop[0].new_shop_name;
              this.onClick(1);
            }
            resShop.forEach((element) => {
              var thiselement = {};
              thiselement.value = element.new_shop_id;
              thiselement.text = element.new_shop_name;

              this.shopSelectData.push(thiselement);
            });
            // this.onSelectShopChange();s
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {
          this.handleHideLoading();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.currentItem {
  .van-card {
    // background-color: white;
    // background: no-repeat center/100%
    //   url("../../../../assets/images/pmt/e-learning/test_bg.png");
    .van-card__thumb {
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      width: 1.56667rem;
      height: 1.56667rem;
      margin: 0.33333rem;
      margin-right: 0.53333rem;
    }
    .approval-item {
      padding: 0.1rem 0.4rem;
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
  .van-cell{
    padding: 0.2rem 0.4rem
  }

  // white-space: break-spaces;
}
.workPlan {
  padding-bottom: 20%;
}
</style>
<style>
</style>
