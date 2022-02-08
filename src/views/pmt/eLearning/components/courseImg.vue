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
      <div v-if="fileType == 'image'" class="image-body">
        <van-image :src="imageUrl" @click="onClick_prevImage(0)" />
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
    <!-- pic prev -->
    <prev-imgs ref="prevImgs" :imgs="prevImageList" />
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  postElearningCourseFavorite,
  getCourseFinished,
} from "@/api/eLearning";
import PrevImgs from "@/components/PrevImgs";

export default {
  name: "courseImg",
  components: {
    TopBar,
    PrevImgs,
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
    this.imageUrl = this.$route.query.file_url;
    this.prevImageList.push(this.$route.query.file_url);
    this.handleHideLoading();
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

    onClick_prevImage(index) {
      this.$refs.prevImgs.show(index);
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
