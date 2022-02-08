<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    >
    </TopBar>
    <!-- <van-form @submit="onSubmit" class=""> -->
    <div class="infog-card workPlan">
      <van-tabs v-model="active" type="card" @click="onClick()">
        <van-tab>
          <template #title>
            <!-- <van-icon name="description" /> -->
            {{ $t("pmt.workPlan.tabTitleSubmitted") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <div
                class="workPlanItem form-group"
                v-for="item in submitList"
                :key="item.Id"
              >
                <van-card
                  class="van-card"
                  :centered="true"
                  :desc="
                    getValidate(item.new_validate_from, item.new_validate_to)
                  "
                  @click="onClick_ListItem(item.Id)"
                  is-link
                >
                  <template #title>
                    <van-row type="flex">
                      <van-col span="23">
                        <!-- <van-col span="24"> -->
                        <van-field
                          readonly
                          :colon="true"
                          label-width="auto"
                          input-align="left"
                          :label="$t('pmt.workPlan.confirmedListPeriod')"
                        >
                          <template #input>
                            <span
                              class="totalEstimatedIncentive"
                              v-text="
                                getValidate(
                                  item.new_period_form,
                                  item.new_period_to
                                )
                              "
                            ></span>
                          </template>
                        </van-field>
                        <!-- </van-col> -->
                        <!-- <van-col span="24"> -->
                        <van-field
                          readonly
                          :colon="true"
                          label-width="auto"
                          input-align="left"
                          :label="$t('pmt.workPlan.confirmedListShop')"
                          v-model="item.new_shop_name"
                        />
                        <!-- </van-col> -->
                        <van-col span="14">
                          <van-field
                            readonly
                            :colon="true"
                            label-width="auto"
                            input-align="left"
                            :label="$t('pmt.workPlan.confirmedListSubmittedBy')"
                            v-model="item.new_user_name"
                          />
                        </van-col>
                        <van-col span="10">
                          <van-field
                            readonly
                            :colon="true"
                            label-width="auto"
                            input-align="left"
                            :label="$t('pmt.workPlan.confirmedListOn')"
                            v-model="item.CreatedOn"
                          />
                        </van-col>
                      </van-col>
                      <van-col span="1" class="item-arrow">
                        <van-icon name="arrow" />
                      </van-col>
                    </van-row>
                  </template>
                </van-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab>
          <template #title>
            <!-- <van-icon name="todo-list-o" /> -->
            {{ $t("pmt.workPlan.tabTitleConfirmed") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <div
                class="workPlanItem form-group"
                v-for="item in confirmedList"
                :key="item.Id"
              >
                <!-- <span> {{ item}}</span> -->
                <!-- ITEM BEGIN -->
                <van-card
                  class="van-card"
                  :centered="true"
                  :desc="
                    getValidate(item.new_validate_from, item.new_validate_to)
                  "
                  @click="onClick_ListItem(item.Id)"
                  is-link
                >
                  <template #title>
                    <van-row type="flex">
                      <van-col span="23">
                        <!-- <van-col span="24"> -->
                        <van-field
                          readonly
                          :colon="true"
                          label-width="auto"
                          input-align="left"
                          :label="$t('pmt.workPlan.confirmedListPeriod')"
                        >
                          <template #input>
                            <span
                              class="totalEstimatedIncentive"
                              v-text="
                                getValidate(
                                  item.new_period_form,
                                  item.new_period_to
                                )
                              "
                            ></span>
                          </template>
                        </van-field>
                        <!-- </van-col> -->
                        <!-- <van-col span="24"> -->
                        <van-field
                          readonly
                          :colon="true"
                          label-width="auto"
                          input-align="left"
                          :label="$t('pmt.workPlan.confirmedListShop')"
                          v-model="item.new_shop_name"
                        />
                        <!-- </van-col> -->
                        <van-col span="14">
                          <van-field
                            readonly
                            :colon="true"
                            label-width="auto"
                            input-align="left"
                            :label="$t('pmt.workPlan.confirmedListSubmittedBy')"
                            v-model="item.new_user_name"
                          />
                        </van-col>
                        <van-col span="10">
                          <van-field
                            readonly
                            :colon="true"
                            label-width="auto"
                            input-align="left"
                            :label="$t('pmt.workPlan.confirmedListOn')"
                            v-model="item.CreatedOn"
                          />
                        </van-col>
                      </van-col>
                      <van-col span="1" class="item-arrow">
                        <van-icon name="arrow" />
                      </van-col>
                    </van-row>
                  </template>
                </van-card>
                <!-- ITEM END -->
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab>
          <template #title>
            <!-- <van-icon name="like-o" /> -->
            {{ $t("pmt.workPlan.tabTitleRejected") }}
          </template>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="this.$t('pmt.course.ListItemNoMore')"
              @load="onLoad"
            >
              <div
                class="workPlanItem"
                v-for="item in rejectedList"
                :key="item.Id"
              >
                <!-- <span> {{ item}}</span> -->
                <!-- ITEM BEGIN -->
                <van-card
                  class="van-card"
                  :centered="true"
                  :desc="
                    getValidate(item.new_validate_from, item.new_validate_to)
                  "
                  @click="onClick_ListItem(item.Id)"
                  is-link
                >
                  <template #title>
                    <van-row type="flex">
                      <van-col span="23">
                        <!-- <van-col span="24"> -->
                        <van-field
                          readonly
                          :colon="true"
                          label-width="auto"
                          input-align="left"
                          :label="$t('pmt.workPlan.confirmedListPeriod')"
                        >
                          <template #input>
                            <span
                              class="totalEstimatedIncentive"
                              v-text="
                                getValidate(
                                  item.new_period_form,
                                  item.new_period_to
                                )
                              "
                            ></span>
                          </template>
                        </van-field>
                        <!-- </van-col> -->
                        <!-- <van-col span="24"> -->
                        <van-field
                          readonly
                          :colon="true"
                          label-width="auto"
                          input-align="left"
                          :label="$t('pmt.workPlan.confirmedListShop')"
                          v-model="item.new_shop_name"
                        />
                        <!-- </van-col> -->
                        <van-col span="14">
                          <van-field
                            readonly
                            :colon="true"
                            label-width="auto"
                            input-align="left"
                            :label="$t('pmt.workPlan.confirmedListSubmittedBy')"
                            v-model="item.new_user_name"
                          />
                        </van-col>
                        <van-col span="10">
                          <van-field
                            readonly
                            :colon="true"
                            label-width="auto"
                            input-align="left"
                            :label="$t('pmt.workPlan.confirmedListOn')"
                            v-model="item.CreatedOn"
                          />
                        </van-col>
                      </van-col>
                      <van-col span="1" class="item-arrow">
                        <van-icon name="arrow" />
                      </van-col>
                    </van-row>
                  </template>
                </van-card>
                <!-- ITEM END -->
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <div class="tab-bar">
      <van-tabbar route>
        <van-button block type="info" @click="onButton_Create">{{
          this.$t("pmt.workPlan.buttonCreate")
        }}</van-button>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { getpagelist } from "@/api/worlPlan";

import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

// import listItemIcon from '@assets/images/pmt/elearning/course_home_icon@3x.png'
// // import backgroundImage from '@assets/images/elearning/test_bg@3x.png'
// import icon_visitStatistics from "@/assets/images/pmt/icon/visitStatistics.png";

import { Toast } from "vant";
export default {
  name: "workPlan",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.workPlan.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      active: 0,
      seaarch_Data: "",
      count: 0,

      loading: false,
      finished: false,
      isLoading: false,

      courseCurrentList: [],
      coursePreviousList: [],
      courseFavoriteList: [],

      page: 1,
      page_size: 1000,
      submitList: [],
      confirmedList: [],
      rejectedList: [],
    };
  },
  created() {
    this.onClick(0);
  },
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
          this.submitList = [];
          this.confirmedList = [];
          this.rejectedList = [];
          this.loading = false;
          this.finished = false;
          this.page = 1;
          break;
        case 1:
          this.submitList = [];
          this.confirmedList = [];
          this.rejectedList = [];
          this.loading = false;
          this.finished = false;
          this.page = 1;
          break;
        case 2:
          this.submitList = [];
          this.confirmedList = [];
          this.rejectedList = [];
          this.loading = false;
          this.finished = false;
          this.page = 1;
          break;
      }
    },

    onSearch() {
      this.loading = false;
      this.finished = false;
    },

    onRefresh() {
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.page = 1;
      this.submitList = [];
      this.confirmedList = [];
      this.rejectedList = [];
    },

    onLoad() {
      let data = {
        new_status: this.active + 2,
        itemsperpage: this.page_size,
        page: this.page,
      };
      switch (this.active) {
        case 0:
          getpagelist(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                // this.submitList.push({
                //   Id: "c8aedb37-3536-ec11-82cb-c9a326b2b137", //主键id
                //   new_shop_id: "1ed361a6-662d-ec11-82c9-aa4b481a8eee", //门店id
                //   new_user_id: "ded1d0e1-e41a-4092-a836-83967836882f", //提交用户id
                //   new_period_form: "2021-10-26T07:56:07", // Plan Period开始日期
                //   new_period_to: "2021-10-26T07:56:07", //Plan Period结束日期
                //   new_status: 1, //Plan Period结束日期
                //   new_user_name: "admin", //提交人名称
                //   new_user_type: 2, //提交人类型
                //   personnel_ype: "PSTL", //personnel ype
                //   new_status_name: null, //状态名称
                //   new_province_name: null, //province name
                //   new_dealer_name: "LUHUR SAHTIAN", //客户名称
                //   new_shop_name: "SENTRAL ELEKTRONIK GIANYAR2", //店铺名称
                //   Details: [],
                // });
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
          getpagelist(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                // this.confirmedList.push({
                //   Id: "c8aedb37-3536-ec11-82cb-c9a326b2b137", //主键id
                //   new_shop_id: "1ed361a6-662d-ec11-82c9-aa4b481a8eee", //门店id
                //   new_user_id: "ded1d0e1-e41a-4092-a836-83967836882f", //提交用户id
                //   new_period_form: "2021-10-26T07:56:07", // Plan Period开始日期
                //   new_period_to: "2021-10-26T07:56:07", //Plan Period结束日期
                //   new_status: 1, //Plan Period结束日期
                //   new_user_name: "admin", //提交人名称
                //   new_user_type: 2, //提交人类型
                //   personnel_ype: "PSTL", //personnel ype
                //   new_status_name: null, //状态名称
                //   new_province_name: null, //province name
                //   new_dealer_name: "LUHUR SAHTIAN", //客户名称
                //   new_shop_name: "SENTRAL ELEKTRONIK GIANYAR2", //店铺名称
                //   Details: [],
                // });
                if (success && data.Items && data.Items.length > 0) {
                  this.confirmedList = [...this.confirmedList, ...data.Items];
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

        case 2:
          getpagelist(data)
            .then((res) => {
              const { success, data } = res;
              if (success) {
                // this.rejectedList.push({
                //   Id: "c8aedb37-3536-ec11-82cb-c9a326b2b137", //主键id
                //   new_shop_id: "1ed361a6-662d-ec11-82c9-aa4b481a8eee", //门店id
                //   new_user_id: "ded1d0e1-e41a-4092-a836-83967836882f", //提交用户id
                //   new_period_form: "2021-10-26T07:56:07", // Plan Period开始日期
                //   new_period_to: "2021-10-26T07:56:07", //Plan Period结束日期
                //   new_status: 1, //Plan Period结束日期
                //   new_user_name: "admin", //提交人名称
                //   new_user_type: 2, //提交人类型
                //   personnel_ype: "PSTL", //personnel ype
                //   new_status_name: null, //状态名称
                //   new_province_name: null, //province name
                //   new_dealer_name: "LUHUR SAHTIAN", //客户名称
                //   new_shop_name: "SENTRAL ELEKTRONIK GIANYAR2", //店铺名称
                //   Details: [],
                // });
                if (success && data.Items && data.Items.length > 0) {
                  this.rejectedList = [...this.rejectedList, ...data.Items];
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

          break;
      }
    },

    getValidate(form, to) {
      var dateForm = form;

      var newDateForm = /\d{4}-\d{1,2}-\d{1,2}/g.exec(dateForm);

      var dateTo = to;

      var newDateTo = /\d{4}-\d{1,2}-\d{1,2}/g.exec(dateTo);

      // var formDate = new Date(form);
      // var formDateStr = formDate.toDateString();

      // var toDate = new Date(to);
      // var toDateStr = toDate.toDateString();
      return newDateForm + " ~ " + newDateTo;
    },

    onButton_Create() {
      this.$router.push({
        name: "workPlanCreate",
        query: {},
      });
    },
    onClick_ListItem(id) {
      this.$router.push({
        name: "workPlanDetail",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.workPlanItem {
  .van-card {
    background-color: white;
    padding: 0px;
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
  margin-top: 0.2rem;
}
.item-arrow {
  vertical-align: middle;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
</style>
<style>
</style>
