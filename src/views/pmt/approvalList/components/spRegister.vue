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

    <van-form class="applyAbsence-form">
      <div class="applyAbsence">
        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.spRegister.ShopInfo") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-field
            required
            readonly
            :label="this.$t('pmt.spRegister.Province')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.provincename"
          />
          <van-field
            required
            :label="this.$t('pmt.spRegister.Channel')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.PersonnelType"
          />
          <van-field
            readonly
            :label="this.$t('pmt.spRegister.Account')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.Region"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.spRegister.Dealer')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.Branch"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.spRegister.Shop')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.Dealer"
          >
          </van-field>
          <van-field
            readonly
            required
            :label="this.$t('pmt.spRegister.ShopSP')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.ShopName"
          >
          </van-field>
        </div>

        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.spRegister.Detail") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-form
            ref="formData"
            alidate-first
            @submit="onButton_Ok"
            label-width="3.7rem"
          >
            <van-field
              required
              readonly
              :label="this.$t('pmt.spRegister.FullName')"
              input-align="right"
              label-width="3.7rem"
              @click="showDatePicker = true"
              :colon="true"
              v-model="formData.fullName"
            />
            <van-field
              required
              readonly
              :label="this.$t('pmt.spRegister.PersonnelType')"
              input-align="right"
              label-width="3.7rem"
              @click="showTimePicker = true"
              :colon="true"
              v-model="formData.personneltype"
            >
            </van-field>
            <van-field
              required
              readonly
              :label="this.$t('pmt.spRegister.CNIC')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              v-model="formData.cnic"
            >
            </van-field>
            <van-field
              required
              readonly
              :label="this.$t('pmt.spRegister.MobileNumber')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              @click="showAbsentReasonPicker = true"
              v-model="formData.mobilenumber"
            >
            </van-field>
            <van-field
              required
              readonly
              :label="this.$t('pmt.spRegister.RegisteredDate')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              @click="showAbsentReasonPicker = true"
              v-model="formData.registereddate"
            >
            </van-field>
          </van-form>
        </div>
      </div>

      <van-popup v-model="showDatePicker" position="bottom" round>
        <van-datetime-picker
          type="date"
          :formatter="formatter"
          @cancel="showDatePicker = false"
          @confirm="onConfirm_Date"
          :minDate="minDate"
          :maxDate="maxDate"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <van-popup v-model="showTimePicker" position="bottom" round>
        <van-datetime-picker
          type="time"
          :formatter="formatter"
          @cancel="showTimePicker = false"
          @confirm="onConfirm_Time"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <van-popup v-model="showAbsentTimePicker" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="absentTimeSelectData"
          @cancel="showAbsentTimePicker = false"
          @confirm="onConfirm_AbsentTime"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <van-popup v-model="showAbsentReasonPicker" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="absentReasonSelectData"
          @cancel="showAbsentReasonPicker = false"
          @confirm="onConfirm_AbsentReason"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>
    </van-form>

    <div class="tab-bar" v-show="status == 1">
      <van-tabbar route>
        <van-button
          block
          type="info"
          @click="
            () => {
              this.$throttle.throttle(onButton_Appove());
            }
          "
          >{{ this.$t("pmt.appovalList.buttonAppove") }}</van-button
        >
        <van-button
          block
          type="info"
          @click="
            () => {
              this.$throttle.throttle(onButton_Reject());
            }
          "
          >{{ this.$t("pmt.appovalList.buttonReject") }}</van-button
        >
      </van-tabbar>
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

import { getapprovedetail } from "@/api/approve";
import { batchrejectflow, batchapproveflow } from "@/api/approve";
import { getShopInfo } from "@/api/attendant";

// import listItemIcon from '@assets/images/pmt/elearning/course_home_icon@3x.png'
// // import backgroundImage from '@assets/images/elearning/test_bg@3x.png'
// import icon_visitStatistics from "@/assets/images/pmt/icon/visitStatistics.png";

import { Toast } from "vant";
export default {
  name: "spRegister",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.spRegister.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "", //<i class="van-icon van-icon-plus"><!----></i>,

      active: 0,
      seaarch_Data: "",
      count: 0,

      loading: false,
      finished: false,
      isLoading: false,

      psHotModelList: [],
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
      selectShopId: 0,

      Id: "",
      primarykey: "",
      type: "",

      isSelectAllItem: [],

      formData: {},
      approveSuggestion: "",

      status:0
    };
  },
  created() {
    this.Id = this.$route.query.Id;
    this.primarykey = this.$route.query.primarykey;
    this.type = this.$route.query.type;

    this.status = this.$route.query.status;

    if (this.Id == "" && this.primarykey == "" && this.type == "") {
      // eslint-disable-next-line no-empty
    } else {
      this.getListData();
    }
  },
  methods: {
    getShopInfo() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getShopInfo()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.formData.Region = data[0].areaname;
            this.formData.Branch = data[0].provincename;
            this.formData.Dealer = data[0].dealer;
            this.formData.ShopName = data[0].shopname;
            this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },
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

    onLoad() {},

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

    onConfirm_Shop(value) {
      //
      console.log(value);
      this.selectShopId = value.Id;
      this.selectShopName = value.text;
      this.showShopPicker = false;
    },

    getListData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        type: this.type,
        recordid: this.Id,
        new_business_primarykey: this.primarykey,
      };
      getapprovedetail(data)
        .then((res) => {
          if (res.success) {
            var data = res.data;
            this.formData = data;
            this.getShopInfo();
            this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
            return;
          }
          if (res.data == "") {
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    onButton_Reject() {
      console.log(this.isSelectAllItem);
      // var data = [];
      //   var data = "";
      //   this.isSelectAllItem.forEach((element) => {
      //     // data.push(element);
      //     data = data + element + ",";
      //     console.log(element);
      //   });
      //   console.log(data.slice(0, data.length - 1));
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        approveRecordId: [this.Id],

        // approveSuggestion: [],
      };
      var params = {
        approveSuggestion: this.approveSuggestion,
      };
      // params.approveSuggestion.push.apply(params.approveSuggestion,data);
      batchrejectflow(params, data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.isSelectAllItem = [];
            this.getListData();
            this.$toast.success(res.message);
            this.topBarClickLeft();
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

    onButton_Appove() {
      console.log(this.isSelectAllItem);
      //   var data = [];
      //     this.isSelectAllItem.forEach((element) => {
      //       data.push(element);
      //       data = data + element + ",";
      //       console.log(element);
      //     });
      //   console.log(data.slice(0, data.length - 1));
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        approveRecordId: [this.Id],

        // approveSuggestion: [],
      };
      var params = {
        approveSuggestion: this.approveSuggestion,
      };
      // params.approveSuggestion.push.apply(params.approveSuggestion,data);
      batchapproveflow(params, data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.isSelectAllItem = [];
            this.getListData();
            this.$toast.success(res.message);
            this.topBarClickLeft();
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
.currentItem {
  .van-card {
    background-color: white;
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
.workPlan {
  padding-bottom: 20%;
}
</style>
<style lang="scss" scoped>
.applyAbsence-form {
  .applyAbsence {
    padding-bottom: 20%;
  }
  padding: 5px;
  background: #f5f5f5;
  .applyAbsence-form-group {
    margin: 12px;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
  }
  .applyAbsence-group__header {
    display: flex;
    align-items: center;
    padding: 0 24px;
    line-height: 64px;
    .applyAbsence-group__title {
      flex: 1;
      font-size: $font28;
      color: #2058ab;
    }
    .applyAbsence-group__value {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        font-size: $font24;
        color: #999;
        line-height: 64px;
      }
      i {
        font-size: 32px;
        line-height: 64px;
        color: #2058ab;
      }
    }
  }
}
</style>
