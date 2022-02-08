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
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="this.$t('pmt.course.ListItemNoMore')"
          @load="onLoad"
        >
          <div
            class="currentItem form-group"
            v-for="item in guestSurveyList"
            :key="item.Id"
          >
            <!-- :desc="getValidate(item.createdon)" -->
            <van-card
              :centered="true"
              :title="item.new_survey_name"
              :thumb="itemIcon"
              @click="onClick_guestSurvey(item.new_guest_surveyid)"
            >
            </van-card>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { postSurveysList } from "@/api/guestSurvey";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

import listItemIcon from "@/assets/images/pmt/e-learning/test_home_icon.png";

import { Toast } from "vant";
export default {
  name: "guestSurvey",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.gusestSurvey.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      itemIcon: listItemIcon,

      active: 0,
      seaarch_Data: "",
      count: 0,

      loading: false,
      finished: false,
      isLoading: false,

      guestSurveyList: [],

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
          this.guestSurveyList = [];
          this.completeList = [];
          break;
        case 1:
          this.page = 1;
          this.loading = false;
          this.finished = false;
          this.guestSurveyList = [];
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
      this.guestSurveyList = [];
      this.completeList = [];
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
    },

    onLoad() {
      var data = Object.assign({
        itemsperpage: this.page_size,
        page: this.page,
      });
      postSurveysList(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            if (success && data.Items && data.Items.length > 0) {
              this.guestSurveyList = [...this.guestSurveyList, ...data.Items];
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
    },

    getValidate(createdon) {
      var formDate = new Date(createdon);

      var times = formDate.getFullYear() + "/" + (formDate.getMonth() + 1);
      return times;
    },

    onClick_guestSurvey(Id) {
      this.$router.push({
        name: "guestSurveyDetail",
        query: {
          selectGuestSurveyId: Id,
        },
      });
      // this.$toast.loading({ duration: 0, forbidClick: true });
      // var params = {
      //   new_sharing_id: Id,
      // };
      // getSharingClicked(params)
      //   .then((res) => {
      //     const { success, data } = res;
      //     if (success) {

      //     } else {
      //       this.$toast.fail(res.message);
      //     }
      //   })
      //   .catch((error) => {
      //     this.$toast.fail(error.message);
      //   })
      //   .finally(() => {
      //     this.handleHideLoading();
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.currentItem {
  .van-card {
    background-color: #2058ab;

    background: no-repeat center/100%
      url("../../../assets/images/pmt/e-learning/test_bg.png");
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
