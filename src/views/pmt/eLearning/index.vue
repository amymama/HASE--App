<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    >
    </TopBar>
    <van-form @submit="onSubmit" class="">
      <div class="infog-card form-group e-learing">
        <van-image
          width="100%"
          height="100%"
          :src="courseImage"
          @click="onClick(1)"
        />
      </div>
      <div class="infog-card form-group">
        <van-image
          width="100%"
          height="100%"
          :src="testImage"
          @click="onClick(2)"
        />
      </div>
      <div class="infog-card form-group">
        <van-image
          width="100%"
          height="100%"
          :src="sharinngImage"
          @click="onClick(3)"
        />
      </div>
    </van-form>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  getShopSelectData,
  postSubmitGitRegister,
} from "@/api/giftRegistration";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

import course from "@/assets/images/pmt/e-learning/u2134.png";
import test from "@/assets/images/pmt/e-learning/u2135.png";
import sharing from "@/assets/images/pmt/e-learning/u2136.png";

export default {
  name: "eLearning",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.eLearning.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      courseImage: course,
      testImage: test,
      sharinngImage: sharing,
    };
  },
  created() {},
  methods: {
    topBarClickLeft() {
      this.$router.go(-1);
    },

    onClick(value) {
      switch (value) {
        case 1:
          this.$router.push("course");
          break;
        case 2:
          this.$router.push("test");
          break;
        case 3:
          this.$router.push("experience");
          break;
      }
    },

    onSubmit(){

    }
  },
};
</script>

<style lang="scss" scoped>
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
