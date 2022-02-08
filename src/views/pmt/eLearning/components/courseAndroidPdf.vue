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
    <div class="course-body">
      <div class="pdf">
        <div class="pdfNoPage">
          <div class="pdf-box">
            <pdf
              ref="pdf"
              v-for="i in numPages"
              :key="i"
              :src="pdfUrl"
              :page="i"
              @page-loaded="pageLoaded"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="tab-bar">
        <van-tabbar route>
          <van-button
            block
            square
            type="info"
            icon="sign"
            color="#407FDC"
            v-show="isShowComplete"
            @click="onClick_complete"
            >{{ this.$t("pmt.course.buttonComplete") }}</van-button
          >
          <van-button
            block
            square
            type="info"
            :icon="this.isFavorite ? 'star' : 'star-o'"
            color="#2058AB"
            @click="topBarClickRight"
            >{{ this.$t("pmt.course.buttonFavorite") }}</van-button
          >
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  postElearningCourseFavorite,
  getCourseFinished,
} from "@/api/eLearning";
import pdf from "vue-pdf";

export default {
  name: "courseAndroidPdf",
  components: {
    TopBar,
    pdf,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.course.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "<i class='van-icon van-icon-star-o'></i>",

      selectCourseId: "",
      isFavorite: false,

      fileType: "",
      current: "",
      file_url: "",

      pdfUrl: "",
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      numPages: 0,
      isLoading: true,

      imageUrl: "",
      prevImageList: [],
      isShowComplete: false,
      videoModel: null,
    };
  },
  created() {
    this.selectCourseId = this.$route.query.selectCourseId;
    this.isFavorite = this.$route.query.isFavorite;
    this.topBarRightHtml = this.isFavorite
      ? "<i class='van-icon van-icon-star'></i>"
      : "<i class='van-icon van-icon-star-o'></i>";
    // console.log('this.$route.params.selectCourseId',this.$route.params.selectCourseId)
    this.file_url = this.$route.query.file_url;
    this.fileType = this.$route.query.file_type;
    console.log("this.$route.query.file_type", this.$route.query.file_type);
    console.log("this.$route.query.file_url", this.$route.query.file_url);
    this.pdfUrl = this.$route.query.file_url;
    this.getNumPages(this.file_url);
    this.setCompleteTime()
  },
  computed: {
    // player() {
    //   return this.$refs.videoPlayer.player;
    // },
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },
    //
    topBarClickLeft() {
      this.$router.go(-1);
    },

    topBarClickRight() {
      if (this.selectCourseId == "") return false;

      this.$toast.loading({ duration: 0, forbidClick: true });
      var parmas = {
        id: this.selectCourseId,
      };
      postElearningCourseFavorite(parmas)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.$toast.success(res.message);
            this.isFavorite = !this.isFavorite;
            this.topBarRightHtml = this.isFavorite
              ? "<i class='van-icon van-icon-star'></i>"
              : "<i class='van-icon van-icon-star-o'></i>";
            // this.courseCurrentList.push(data);
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

    onClick_complete() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var parmas = {
        new_course_id: this.selectCourseId,
      };
      getCourseFinished(parmas)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.$toast.success(res.message);
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

    getNumPages(url) {
      // var loadingTask = pdf.createLoadingTask(url);
      // console.log("loadingTask:", loadingTask);
      let loadingTask = pdf.createLoadingTask(url)
      loadingTask.promise.then(pdf => {
        this.numPages = pdf.numPages
      }).catch(err => {
        console.error('pdf 加载失败', err);
      })
      // var loadingTask = pdf.createLoadingTask(url);
      // console.log("loadingTask:", loadingTask);
      // loadingTask.promise.then((pdf) => {
      //   console.log("pdf.numPages:", pdf.numPages);
      //   // console.log(this.numPages);
      //   // this.url = loadingTask;
      //   // this.prevImageList.push(url);
      //   this.numPages = pdf.numPages;
      // });
      // .catch((err) => {
      //   console.log(err);
      // });
    },
    pageLoaded(num) {
      if (num === this.numPages) {
        this.handleHideLoading();
      }
    },

    setCompleteTime() {
      setTimeout(() => {
        this.isShowComplete = true
      }, 180000); //isShowComplete
    },
  },

  beforeDestroy() {
    // if (this.player) {
    //   this.player.dispose();
    // }
  },
};
</script>

<style lang="scss" scoped>
.image-body {
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.course-body {
  padding-bottom: 20%;
}
</style>
<style>
</style>
