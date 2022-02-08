<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    >
    </TopBar>
    <div class="infog-card form-group">
      <h2 class="card-title">
        {{ new_sharing_name }}
      </h2>
      <div>
        <!-- <van-button @click="testClick">test</van-button> -->
        <van-image width="100%" height="100%" :src="new_file_url" @click="onClick_prevImage"/>
      </div>
    </div>
    <div>
      <!-- <div class="tab-bar">
        <van-tabbar route>
          <van-button
            block
            square
            type="info"
            color="#407FDC"
            @click="onClick_submit"
            :disabled="isSubmitButton"
            >{{ $t("pmt.submitButton") }}</van-button
          >
          <van-button
            block
            square
            type="info"
            color="#2058AB"
            @click="onClick_cancel"
            >{{ $t("pmt.cancelButton") }}</van-button
          >
        </van-tabbar>
      </div> -->
    </div>
    <!-- pic prev -->
    <prev-imgs ref="prevImgs" :imgs="imageList" />
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  postElearningCourseFavorite,
  getCourseFinished,
  getSharing,
} from "@/api/eLearning";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";
import PrevImgs from "@/components/PrevImgs";
export default {
  name: "experienceDetail",
  components: {
    TopBar,
    ChangeLang,
    PrevImgs,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.experience.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      selectExperienceId: "",

      new_sharing_name: "",
      new_file_url: "",
      imageList: [],
    };
  },
  created() {
    this.selectExperienceId = this.$route.query.selectExperienceId;
    this.getTestData();
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickLeft() {
      this.$router.go(-1);
    },

    getTestData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var parmas = {
        id: this.selectExperienceId,
      };
      getSharing(parmas)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            debugger;
            this.new_sharing_name = data.new_sharing_name;
            this.new_file_url = data.new_file_url;
            this.imageList.push(this.new_file_url);
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

    onClick_prevImage() {
      this.$refs.prevImgs.show(0);
    },
  },

  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style lang="scss" scoped>
.image-body {
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
</style>
<style>
/*.van-field__error-message {*/
/*  float: right;*/
/*}*/

/*.form-group {*/
/*  margin: 12px;*/
/*  border-radius: 12px;*/
/*  overflow: hidden;*/
/*  background: #fff;*/
/*}*/
</style>
