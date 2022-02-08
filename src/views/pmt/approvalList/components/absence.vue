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
            {{ this.$t("pmt.absence.BasicInfo") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-field
            required
            readonly
            :label="this.$t('pmt.absence.Name')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.username"
          />
          <van-field
            required
            :label="this.$t('pmt.absence.PersonnelType')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.personneltype"
          />
          <van-field
            readonly
            :label="this.$t('pmt.absence.Region')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.region"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.absence.Area')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.area"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.absence.Dealer')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.dealer"
          >
          </van-field>
          <van-field
            readonly
            :label="this.$t('pmt.absence.ShopName')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="formData.shopname"
          >
          </van-field>
        </div>

        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.absence.Detail") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-form ref="formData" alidate-first label-width="3.7rem">
            <van-field
              required
              readonly
              :label="this.$t('pmt.absence.Date')"
              input-align="right"
              label-width="3.7rem"
              @click="showDatePicker = true"
              :colon="true"
              v-model="formData.date"
            />
            <van-field
              required
              readonly
              :label="this.$t('pmt.absence.Leavefrom')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              v-model="formData.leavefrom"
            >
            </van-field>
            <van-field
              required
              readonly
              :label="this.$t('pmt.absence.AbsentTime')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              v-model="formData.absencetime"
            >
            </van-field>
            <van-field
              required
              readonly
              :label="this.$t('pmt.absence.AbsentReason')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              v-model="formData.reason"
            >
            </van-field>
          </van-form>
        </div>

        <div class="applyAbsence-form-group">
          <van-form ref="formData" alidate-first label-width="3.7rem">
            <van-field
              required
              :label="this.$t('pmt.absence.Comment')"
              input-align="right"
              label-width="3.7rem"
              :colon="true"
              v-model="formData.comment"
              rows="2"
              autosize
              type="textarea"
              maxlength="200"
              show-word-limit
            >
            </van-field>
          </van-form>
        </div>
      </div>
    </van-form>

    <div class="tab-bar" v-show="status == 1">
      <van-tabbar route>
        <van-button block type="info" @click="() => {
              this.$throttle.throttle(onButton_Appove());
            }">{{
          this.$t("pmt.appovalList.buttonAppove")
        }}</van-button>
        <van-button block type="info" @click="() => {
              this.$throttle.throttle(onButton_Reject());
            }">{{
          this.$t("pmt.appovalList.buttonReject")
        }}</van-button>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { postUserPermission, getUserinfoByToken } from "@/api/user";
import ChangeLang from "@/components/ChangeLang";

import { getapprovedetail } from "@/api/approve";
import { batchrejectflow, batchapproveflow } from "@/api/approve";
import { getShopInfo } from "@/api/attendant";

import { Toast } from "vant";
export default {
  name: "absence",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.absence.topBarTitle"),
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

      formData: {
        new_approve_instanceid: "",
        new_business_primarykey: "",
        new_leave_date: "",
        new_absent_time: "",
        date: "",
        leavefrom: "",
        absencetime: "",
        reason: "",
        comment: "",
      },

      basicInfoForm: {
        Name: "",
        PersonnelType: "",
        Region: "",
        Branch: "",
        Dealer: "",
        ShopName: "",
      },

      status:0,
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
      // this.getUserInfo();
      // this.getShopInfo();
    }
  },
  methods: {
    getUserInfo() {
      // this.$toast.loading({ duration: 0 });
      this.$toast.loading({ duration: 0, forbidClick: true });
      getUserinfoByToken()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { user_position, user_info } = data.Items;

            this.basicInfoForm.Name = user_info.username;
            this.basicInfoForm.PersonnelType = user_position[0].position_code;

            this.position_code = user_position[0].position_code;
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

    getShopInfo() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getShopInfo()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.basicInfoForm.Region = data[0].areaname;
            this.basicInfoForm.Branch = data[0].provincename;
            this.basicInfoForm.Dealer = data[0].dealer;
            this.basicInfoForm.ShopName = data[0].shopname;
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
            if (data != null) {
              this.formData = data;
            }
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
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        approveRecordId: [this.Id],
      };
      var params = {
        approveSuggestion: this.formData.comment,
      };
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
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        approveRecordId: [this.Id],
      };
      var params = {
        approveSuggestion: this.formData.comment,
      };
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
