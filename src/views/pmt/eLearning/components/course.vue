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
      <van-search v-model="seaarch_Data" placeholder="" @search="onSearch" />
    </div>
    <div class="infog-card form-group">
      <van-tabs v-model="active" type="card" @click="onClick()">
        <van-tab>
          <template #title>
            <van-icon name="description" />
            {{ $t("pmt.course.tabTitleCurrent") }}
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
                v-for="item in courseCurrentList"
                :key="item.Id"
              >
                <van-card
                  :centered="true"
                  :title="item.new_course_name"
                  :desc="
                    getValidate(item.new_validate_from, item.new_validate_to)
                  "
                  :thumb="itemIcon"
                  @click="
                    onClick_Current(
                      item.new_file_url,
                      item.Id,
                      item.is_favorite
                    )
                  "
                />
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab>
          <template #title>
            <van-icon name="todo-list-o" />
            {{ $t("pmt.course.tabTitlePrevious") }}
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
                v-for="item in coursePreviousList"
                :key="item.Id"
              >
                <!-- <span> {{ item}}</span> -->
                <!-- ITEM BEGIN -->
                <van-card
                  :centered="true"
                  :title="item.new_course_name"
                  :desc="
                    getValidate(item.new_validate_from, item.new_validate_to)
                  "
                  :thumb="itemIcon"
                  @click="
                    onClick_Current(
                      item.new_file_url,
                      item.Id,
                      item.is_favorite
                    )
                  "
                />
                <!-- ITEM END -->
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab>
          <template #title>
            <van-icon name="like-o" />
            {{ $t("pmt.course.tabTitleFavorite") }}
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
                v-for="item in courseFavoriteList"
                :key="item.Id"
              >
                <!-- <span> {{ item}}</span> -->
                <!-- ITEM BEGIN -->
                <van-card
                  :centered="true"
                  :title="item.new_course_name"
                  :desc="
                    getValidate(item.new_validate_from, item.new_validate_to)
                  "
                  :thumb="itemIcon"
                  @click="
                    onClick_Current(
                      item.new_file_url,
                      item.Id,
                      item.is_favorite
                    )
                  "
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
  postCourseList,
  getElearningCourse,
  postElearningCourseFavorite,
  getCourseClicked,
} from "@/api/eLearning";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

// import listItemIcon from '@assets/images/pmt/elearning/course_home_icon@3x.png'
// // import backgroundImage from '@assets/images/elearning/test_bg@3x.png'
// import icon_visitStatistics from "@/assets/images/pmt/icon/visitStatistics.png";
import listItemIcon from "@/assets/images/pmt/e-learning/course_home_icon.png";

import { Toast } from "vant";
export default {
  name: "course",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.course.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      itemIcon: listItemIcon,

      active: 0,
      seaarch_Data: "",
      count: 0,

      loading: false,
      finished: false,
      isLoading: false,

      courseCurrentList: [],
      coursePreviousList: [],
      courseFavoriteList: [],
      osName: '',
    };
  },
  created() {
    if(plus){
      this.osName = plus.os.name
    }
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
          break;
        case 1:
          this.loading = false;
          this.finished = false;
          break;
        case 2:
          this.loading = false;
          this.finished = false;
          break;
      }
    },

    onSearch() {
      this.loading = false;
      this.finished = false;
    },

    onRefresh() {
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
    },

    onLoad() {
      let data = {
        searchtype: this.active + 1,
        new_course_name: this.seaarch_Data,
      };
      switch (this.active) {
        case 0:
          postCourseList(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                debugger;

                this.courseCurrentList = data;
                // this.courseCurrentList.push(data);
                // this.courseCurrentList.push(data);

                this.finished = true;
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
          postCourseList(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                // this.courseCurrentList.push(data);
                this.coursePreviousList = data;
                this.finished = true;
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

        case 2:
          postCourseList(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                // this.courseCurrentList.push(data);
                this.courseFavoriteList = data;
                this.finished = true;
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

    onClick_Current(url, Id, isFavorite) {
      this.$toast.loading({ duration: 0, forbidClick: true });
      // url =
      //   "https://d2gmuflv362wio.cloudfront.net/HSI/UAT/common/test_vidio.mp4";
      // url =
      //   "C:/Users/Administrator/Desktop/Quotation for 黄叶昕.pdf";
      var fileType = this.matchFileSuffixType(url);
      var params = {
        new_course_id: Id,
      };
      getCourseClicked(params)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            let lastName = ""
            if(fileType==='pdf'){
              lastName = this.osName === 'iOS' ? 'courseIOSPdf' : 'courseAndroidPdf'
            }
            else if(fileType==='image'){
              lastName = "courseImg"
            }
            else if(fileType==='video'){
              lastName = "courseVideo"
            }
            console.log(lastName)
            this.$router.push({
              name: lastName,
              query: {
                file_url: url,
                file_type: fileType,
                selectCourseId: Id,
                isFavorite: isFavorite,
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
  // white-space: break-spaces;
}
</style>
<style>
</style>
