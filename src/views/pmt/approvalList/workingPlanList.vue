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
      <van-row class="body-row">
        <van-col span="24">
          <van-row>
            <div class="pmt-table">
              <van-checkbox-group v-model="isSelectAllItem" ref="checkboxGroup">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <!-- <van-checkbox v-model="checked"></van-checkbox> -->
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.psName") }}</span>
                      </th>
                      <th>
                        <span>{{
                          this.$t("pmt.workPlanTable.fullNumber")
                        }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.dealer") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.shop") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.planFrom") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.planTo") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.mon") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.tue") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.wed") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.thu") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.fri") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.sat") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.workPlanTable.sun") }}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in psHotModelList" :key="index">
                      <td>
                        <van-checkbox
                          v-model="item.checked"
                          :name="item.new_approve_recordId"
                        ></van-checkbox>
                      </td>
                      <td>{{ item.realname }}</td>
                      <td>{{ item.phone }}</td>
                      <td>{{ item.dealer }}</td>
                      <td>{{ item.shopname }}</td>
                      <td>{{ item.periodform }}</td>
                      <td>{{ item.periodto }}</td>
                      <td>{{ item.Mon }}</td>
                      <td>{{ item.Tue }}</td>
                      <td>{{ item.Wed }}</td>
                      <td>{{ item.Thu }}</td>
                      <td>{{ item.Fri }}</td>
                      <td>{{ item.Sat }}</td>
                      <td>{{ item.Sun }}</td>
                    </tr>
                  </tbody>
                </table>
              </van-checkbox-group>
            </div>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <van-popup v-model="showComment">
      <div class="block">
        <van-form ref="">
          <van-field
            required
            :label="this.$t('pmt.absence.Comment')"
            input-align="right"
            label-width="auto"
            :colon="true"
            v-model="comment"
            rows="3"
            autosize
            type="textarea"
            maxlength="200"
            show-word-limit
            :rules="[
              {
                required: true,
                message: this.$t('pmt.commentErrorMessage'),
              },
            ]"
          >
          </van-field>
          <div class="button">
            <van-button
              type="info"
              class="button-login"
              @click="
                () => {
                  this.$throttle.throttle(onClickConfirm());
                }
              "
              >{{ this.$t("pmt.confirmButton") }}</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
    <div class="tab-bar" v-show="status == 1">
      <van-tabbar route>
        <van-button block type="info" @click="onShowCommentPicker(1)">{{
          this.$t("pmt.appovalList.buttonAppove")
        }}</van-button>
        <van-button block type="info" @click="onShowCommentPicker(2)">{{
          this.$t("pmt.appovalList.buttonReject")
        }}</van-button>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import ChangeLang from "@/components/ChangeLang";

import { getapprovedetail } from "@/api/approve";
import { batchrejectflow, batchapproveflow } from "@/api/approve";

import { Toast } from "vant";
export default {
  name: "workingPlanList",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.workPlan.topBarTitle"),
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
      status: 0,

      isSelectAllItem: [],

      showComment: false,
      comment: "",
      clickType: 1,
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
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickLeft() {
      this.$router.go(-1);
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
      this.showComment = false;
      this.comment = "";
      this.clickType = 1;
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        type: this.type,
        recordid: this.Id,
        new_business_primarykey: this.primarykey,
        status: this.status,
      };
      getapprovedetail(data)
        .then((res) => {
          if (res.success) {
            var data = res.data;
            this.psHotModelList = data;
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
      var query_data = {
        approveRecordId: [],

        // approveSuggestion: [],
      };
      this.isSelectAllItem.forEach((element) => {
        query_data.approveRecordId.push(element);
      });
      // console.log(data.slice(0, data.length - 1));
      this.$toast.loading({ duration: 0, forbidClick: true });

      var params = {
        approveSuggestion: this.comment,
      };
      // params.approveSuggestion.push.apply(params.approveSuggestion,data);
      batchrejectflow(params, query_data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.isSelectAllItem = [];
            this.getListData();
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
      // var data = [];
      var data = [];
      this.isSelectAllItem.forEach((element) => {
        data.push(element);
      });
      console.log(data.slice(0, data.length - 1));
      this.$toast.loading({ duration: 0, forbidClick: true });

      var query_data = {
        approveRecordId: data,
      };
      var params = {
        approveSuggestion: this.comment,
      };
      batchapproveflow(params, query_data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.isSelectAllItem = [];
            this.getListData();
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

    onShowCommentPicker(type) {
      if (this.isSelectAllItem.length == 0) {
        this.$toast.fail(this.$t("pmt.selectDataErrorMessage"));
        return false;
      }

      this.clickType = type;
      this.showComment = true;
    },

    onClickConfirm() {
      if (this.comment == "") {
        this.$toast.fail(this.$t("pmt.commentErrorMessage"));
        return false;
      }
      switch (this.clickType) {
        case 1:
          this.onButton_Appove();
          break;
        case 2:
          this.onButton_Reject();
          break;
      }
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

.block {
  width: 8rem;
  .text {
    height: 130px;
    text-align: center;
    margin: 20px 20px;
    .text-item {
      text-align: left;
    }
  }
  .button {
    text-align: center;
    .button-login {
      width: 100%;
    }
  }
  .AccountType {
    padding: 0.5rem;
    // margin: 0.5rem;
  }
}
</style>
<style>
</style>
