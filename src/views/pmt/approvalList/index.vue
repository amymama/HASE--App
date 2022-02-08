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

    <div class="infog-card form-group workPlan">
      <van-tabs v-model="active" type="card" @click="onClick()">
        <van-tab>
          <template #title>
            <van-icon name="description" />
            {{ $t("pmt.workPlan.tabTitleSubmitted") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-checkbox-group v-model="isSelectAllItem" ref="checkboxGroup">
              <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="this.$t('pmt.course.ListItemNoMore')"
                @load="onLoad"
              >
                <div
                  class="currentItem form-group"
                  v-for="item in submitList"
                  :key="item.peta_rn"
                >
                  <van-row type="flex">
                    <van-col span="2" class="check">
                      <van-checkbox
                        v-model="item.checked"
                        :name="item.recordid"
                        @change="onClick_SubmitCheck(item)"
                      ></van-checkbox>
                    </van-col>
                    <van-col span="22">
                      <van-card
                        class="van-card"
                        :centered="true"
                        @click="
                          onClick_ListItem(
                            item.recordid,
                            item.new_business_primarykey,
                            item.type
                          )
                        "
                      >
                        <template #title>
                          <van-row type="flex">
                            <van-col span="23">
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.type"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemType')"
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.personnel_name"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemPersonnel')"
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.dealer_name"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemDealer')"
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.shop_name"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemShop')"
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.submitted_by"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="
                                  $t('pmt.appovalList.listItemSubmittedBy')
                                "
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.created_on"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemOn')"
                              />
                            </van-col>
                            <van-col span="1" class="item-arrow">
                              <van-icon name="arrow" />
                            </van-col>
                          </van-row>
                        </template>
                      </van-card>
                    </van-col>
                  </van-row>
                </div>
              </van-list>
            </van-checkbox-group>
          </van-pull-refresh>
        </van-tab>
        <van-tab>
          <template #title>
            <van-icon name="todo-list-o" />
            {{ $t("pmt.workPlan.tabTitleConfirmed") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <van-checkbox-group
                v-model="isSelectAllItem"
                ref="checkboxGroup2"
              >
                <div
                  class="currentItem form-group"
                  v-for="item in confirmedList"
                  :key="item.Id"
                >
                  <!-- <span> {{ item}}</span> -->
                  <!-- ITEM BEGIN -->
                  <van-row type="flex">
                    <van-col span="2" class="check">
                      <van-checkbox
                        v-model="item.checked"
                        :name="item.recordid"
                        @change="onClick_SubmitCheck(item)"
                      ></van-checkbox>
                    </van-col>
                    <van-col span="22">
                      <van-card
                        class="van-card"
                        :centered="true"
                        @click="
                          onClick_ListItem(
                            item.recordid,
                            item.new_business_primarykey,
                            item.type
                          )
                        "
                      >
                        <template #title>
                          <van-row type="flex">
                            <van-col span="23">
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.type"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemType')"
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.personnel_name"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemPersonnel')"
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.dealer_name"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemDealer')"
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.shop_name"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemShop')"
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.submitted_by"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="
                                  $t('pmt.appovalList.listItemSubmittedBy')
                                "
                              />
                              <!-- </van-col> -->
                              <!-- <van-col span="24"> -->
                              <van-field
                                readonly
                                class="approval-item"
                                v-model="item.created_on"
                                :colon="true"
                                label-width="auto"
                                input-align="right"
                                :label="$t('pmt.appovalList.listItemOn')"
                              />
                            </van-col>
                            <van-col span="1" class="item-arrow">
                              <van-icon name="arrow" />
                            </van-col>
                          </van-row>
                        </template>
                      </van-card>
                    </van-col>
                  </van-row>
                  <!-- ITEM END -->
                </div>
              </van-checkbox-group>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
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
    <div class="tab-bar" v-show="this.active == 0">
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
import {
  postCourseList,
  getElearningCourse,
  postElearningCourseFavorite,
  getCourseClicked,
} from "@/api/eLearning";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

import {
  getapprovelist,
  batchrejectflow,
  batchapproveflow,
} from "@/api/approve";

// import listItemIcon from '@assets/images/pmt/elearning/course_home_icon@3x.png'
// // import backgroundImage from '@assets/images/elearning/test_bg@3x.png'
// import icon_visitStatistics from "@/assets/images/pmt/icon/visitStatistics.png";

import { Toast } from "vant";
export default {
  name: "approvalList",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.appovalList.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      active: 0,
      seaarch_Data: "",
      count: 0,

      loading: false,
      finished: false,
      isLoading: true,

      page: 1,
      page_size: 1000,
      submitList: [],
      confirmedList: [],
      openList: [],
      closedList: [],

      showShopPicker: false,
      selectShopName: "",
      shopSelectData: [],
      selectShopId: 0,

      isSelectAllItem: [],

      showComment: false,
      comment: "",
      clickType: 1,
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
      this.showComment = false;
      this.comment = "";
      this.clickType = 1;
      this.isSelectAllItem = [];
      switch (this.active) {
        case 0:
          this.loading = false;
          this.finished = false;
          this.page = 1;
          this.loading = false;
          this.finished = false;
          this.submitList = [];
          this.confirmedList = [];
          break;
        case 1:
          this.loading = false;
          this.finished = false;
          this.page = 1;
          this.loading = false;
          this.finished = false;
          this.submitList = [];
          this.confirmedList = [];
          break;
      }
    },

    onSearch() {
      this.loading = false;
      this.finished = false;
    },

    onRefresh() {
      this.page = 1;
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.submitList = [];
      this.confirmedList = [];
    },

    onLoad() {
      var data = {
        status: this.active + 1,
        itemsperpage: this.page_size,
        page: this.page,
      };
      switch (this.active) {
        case 0:
          getapprovelist(data)
            .then((res) => {
              const { success, data } = res;

              if (success) {
                if (success && data.Items && data.Items.length > 0) {
                  this.submitList = [...this.submitList, ...data.Items];
                  this.page++;
                  console.log(data.Items.length);
                  this.finished = data.Items.length !== this.page_size;
                  console.log(this.finished);
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
          // this.finished = true;
          break;

        case 1:
          getapprovelist(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                if (success && data.Items && data.Items.length > 0) {
                  this.confirmedList = [...this.confirmedList, ...data.Items];
                  this.page++;
                  this.finished = data.Items.length !== this.page_size;
                  console.log(this.finished);
                } else {
                  this.finished = true;
                }
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

    topBarClickRight() {
      this.$router.push({
        name: "collaborationDetail",
        query: {},
      });
    },

    onClick_ListItem(Id, primarykey, type) {
      switch (type) {
        case "Retail":
          this.$router.push({
            name: "retailDetail",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
              status: this.active + 1,
            },
          });
          break;
        case "SP Register":
          this.$router.push({
            name: "spRegister",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
              status: this.active + 1,
            },
          });
          break;
        case "Absence":
          this.$router.push({
            name: "absence",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
              status: this.active + 1,
            },
          });
          break;
        case "Overtime":
          this.$router.push({
            name: "overtimeList",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
              status: this.active + 1,
            },
          });
          break;
        case "Working Plan":
          this.$router.push({
            name: "workingPlanList",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
              status: this.active + 1,
            },
          });
          break;
        case "Complaint Order":
          this.$router.push({
            name: "complaint",
            query: {
              Id: Id,
              primarykey: primarykey,
              type: type,
              status: this.active + 1,
            },
          });
          break;
      }
    },

    onConfirm_Shop(value) {
      //
      console.log(value);
      this.selectShopId = value.Id;
      this.selectShopName = value.text;
      this.showShopPicker = false;
    },
    onClick_SubmitCheck(data) {
      console.log(data);
    },

    onButton_Reject() {
      // var data = [];
      var data = {
        approveRecordId: [],
      };
      console.log(this.isSelectAllItem);
      this.isSelectAllItem.forEach((element) => {
        data.approveRecordId.push(element);
      });
      this.$toast.loading({ duration: 0, forbidClick: true });

      var params = {
        approveSuggestion: this.comment,
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      batchrejectflow(params, data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.isSelectAllItem = [];
            this.onClick(1);
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

    onButton_Appove() {
      // var data = [];
      var data = {
        approveRecordId: [],
      };
      this.isSelectAllItem.forEach((element) => {
        data.approveRecordId.push(element);
      });
      this.$toast.loading({ duration: 0, forbidClick: true });

      var params = {
        approveSuggestion: this.comment,
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      // var params = {
      //   approveSuggestion: data.slice(0, data.length - 1),

      //   // approveSuggestion: [],
      // };
      // params.approveSuggestion.push.apply(params.approveSuggestion,data);
      batchapproveflow(params, data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.isSelectAllItem = [];
            this.onClick(1);
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
  .check {
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
  .van-card {
    padding: 0px;
    // background-color: white;
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
    .approval-item {
      padding: 0.1rem 0.4rem;
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
  margin: 0.26667 rem;
  border-radius: 0.16 rem;
  overflow: hidden;
  background: #f5f5f5;
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

.item-arrow {
  vertical-align: middle;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}
</style>
<style>
</style>
