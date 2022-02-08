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
      <div>
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          name="videoPlayer"
          id="video"
          :playsinline="true"
          :globalOptions="globalSetting"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @waiting="onPlayerWaiting($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @statechanged="playerStateChanged($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @ready="playerReadied"
        ></video-player>
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
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
//
// import pdf from "vue-pdf";

export default {
  name: "courseVideo",
  components: {
    TopBar,
    videoPlayer,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.course.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "<i class='van-icon van-icon-star-o'></i>",

      selectCourseId: "",
      isFavorite: false,

      fileType: "",

      player: null,
      current: "",
      file_url: "",
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: false,
        loop: true, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "xxxxxx.mp4", // url地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },

      isShowComplete: false,
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
    this.playerOptions.sources[0].src = this.$route.query.file_url;
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

    onClick(value) {
      switch (value) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
      }
    },
    // 播放回调
    onPlayerPlay(player) {
      console.log("player play!", player);
      const videoPlayer = this.$refs.videoPlayer.player;
      videoPlayer.play();
    },

    // 暂停回调
    onPlayerPause(player) {
      console.log("player pause!", player);
    },

    // 视频播完回调
    onPlayerEnded($event) {
      console.log(player);
    },
    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting(player) {
      let time = localStorage.getItem("cacheTime");
      if (player.cache_.currentTime - Number(time) > 0.1) {
        this.current = Number(time);
        this.playerReadied(player);
      } else {
        this.current = player.cache_.currentTime;
      }
    },

    // 已开始播放回调
    onPlayerPlaying($event) {
      // console.log(player)
    },

    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata($event) {
      // console.log(player)
    },

    // // 当前播放位置发生变化时触发。
    onPlayerTimeupdate(player) {
      //   this.playTime = player.cache_.currentTime;
      //   let playTime = player.cache_.currentTime;
      //   setTimeout(function () {
      //     localStorage.setItem("cacheTime", playTime);
      //   }, 500);
      //   let time = localStorage.getItem("cacheTime");
      //   if (player.cache_.currentTime - Number(time) > 2) {
      //     this.current = Number(time);
      //     this.playerReadied(player);
      //   } else {
      //     this.current = player.cache_.currentTime;
      //   }
    },

    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },

    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },

    //播放状态改变回调
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      // console.log('example player 1 readied', player);
      player.currentTime(this.current);
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
