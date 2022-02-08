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
    <van-form @submit="onSubmit" class="incentive">
      <div class="incentive-body">
        <div class="form-group">
          <van-field
            v-model="selectDate"
            is-link
            readonly
            :label="this.$t('pmt.incentive.selectaDate')"
            @click="showDatePicker = true"
            input-align="right"
            label-width="120px"
            :colon="true"
          />
          <van-popup v-model="showDatePicker" position="bottom" round>
            <van-datetime-picker
              v-model="selectDate"
              type="year-month"
              :formatter="formatter"
              @cancel="showDatePicker = false"
              @confirm="onConfirm_Date"
              :minDate="minDate"
              :maxDate="maxDate"
              :confirm-button-text="this.$t('pmt.confirmButton')"
              :cancel-button-text="this.$t('pmt.cancelButton')"
            />
          </van-popup>
        </div>

        <div class="form-group" v-if="this.type != 'MD'">
          <van-field
            class="card-title"
            :label="this.$t('pmt.incentive.totalIncentive')"
            input-align="left"
            label-class="card-lable"
            label-width="120px"
            :colon="true"
          >
            <template #input>
              <span v-text="totalIncentive"></span>
            </template>
          </van-field>
          <div class="info">
            <div class="form-group">
              <van-row class="" style="padding-left: 15px">
                <van-col span="3" style="padding-top: 10px">
                  <b class="serial-number">1</b>
                </van-col>
                <van-col span="21">
                  <van-field
                    :label="this.$t('pmt.incentive.totalSelloutTarget')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="AddUnit(totalsellout.target)"></span>
                    </template>
                  </van-field>
                  <van-field
                    :label="this.$t('pmt.incentive.totalIncentive100')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="AddUnit(totalsellout.incentive100)"></span>
                    </template>
                  </van-field>
                </van-col>
              </van-row>
              <van-row class="">
                <van-col span="24">
                  <van-row style="text-align: center">
                    <van-col span="12" class="list-head">
                      <span>{{
                        this.$t("pmt.incentive.totalListAchievement")
                      }}</span>
                    </van-col>
                    <van-col span="12" class="list-head">
                      <span>{{
                        this.$t("pmt.incentive.totalListIncentive")
                      }}</span>
                    </van-col>
                  </van-row>
                  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      @load="onLoad"
                    >
                      <div
                        class="item"
                        v-for="(item, index) in totalsellout.slablist"
                        :key="index"
                      >
                        <!-- ITEM BEGIN -->
                        <van-row type="flex" justify="center">
                          <van-col span="12" class="list-body">
                            <span>{{ item.achievement }}</span>
                          </van-col>
                          <van-col span="12" class="list-body">
                            <span>{{ item.incentive }}</span>
                          </van-col>
                        </van-row>

                        <!-- ITEM END -->
                      </div>
                    </van-list>
                  </van-pull-refresh>
                </van-col>
              </van-row>

              <van-row class="body-row">
                <van-col span="24">
                  <van-field
                    :label="this.$t('pmt.incentive.totalActualTotal')"
                    input-align="left"
                    label-width="120px"
                    :colon="true"
                  >
                    <template #input>
                      <span
                        v-text="
                          getActual(
                            totalsellout.actual,
                            totalsellout.achievement
                          )
                        "
                      ></span>
                    </template>
                  </van-field>
                </van-col>
                <van-col span="24">
                  <van-field
                    label-class="actual-Incentive"
                    :label="this.$t('pmt.incentive.totalActualIncentive')"
                    input-align="left"
                    label-width="120px"
                    :colon="true"
                  >
                    <template #input>
                      <span
                        class="actual-Incentive"
                        v-text="
                          getActual(
                            totalsellout.incentive,
                            totalsellout.incentiveidr
                          )
                        "
                      ></span>
                    </template>
                  </van-field>
                </van-col>
              </van-row>
            </div>
          </div>
          <div class="info">
            <div class="form-group">
              <van-row class="body-row" style="padding-left: 15px">
                <van-col span="3" style="padding-top: 10px">
                  <b class="serial-number">2</b>
                </van-col>
                <van-col span="21">
                  <van-field
                    :label="this.$t('pmt.incentive.mhSelloutTarget')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="AddUnit(mhsellout.target)"></span>
                    </template>
                  </van-field>
                  <van-field
                    :label="this.$t('pmt.incentive.totalIncentive100')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="AddUnit(mhsellout.incentive100)"></span>
                    </template>
                  </van-field>
                </van-col>
              </van-row>
              <van-row class="body-row">
                <van-col span="24">
                  <van-row style="text-align: center">
                    <van-col span="12" class="list-head">
                      <span>{{
                        this.$t("pmt.incentive.totalListAchievement")
                      }}</span>
                    </van-col>
                    <van-col span="12" class="list-head">
                      <span>{{
                        this.$t("pmt.incentive.totalListIncentive")
                      }}</span>
                    </van-col>
                  </van-row>
                  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      @load="onLoad"
                    >
                      <div
                        class="item"
                        v-for="(item, index) in mhsellout.slablist"
                        :key="index"
                      >
                        <!-- ITEM BEGIN -->
                        <van-row type="flex" justify="center">
                          <van-col span="12" class="list-body">
                            <span>{{ item.achievement }}</span>
                          </van-col>
                          <van-col span="12" class="list-body">
                            <span>{{ item.incentive }}</span>
                          </van-col>
                        </van-row>

                        <!-- ITEM END -->
                      </div>
                    </van-list>
                  </van-pull-refresh>
                </van-col>
              </van-row>
              <van-row class="body-row">
                <van-col span="24">
                  <van-field
                    :label="this.$t('pmt.incentive.mhActualTotal')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span
                        v-text="
                          getActual(mhsellout.actual, mhsellout.achievement)
                        "
                      ></span>
                    </template>
                  </van-field>
                </van-col>
                <van-col span="24">
                  <van-field
                    label-class="actual-Incentive"
                    :label="this.$t('pmt.incentive.totalActualIncentive')"
                    input-align="left"
                    label-width="120px"
                    :colon="true"
                  >
                    <template #input>
                      <span
                        class="actual-Incentive"
                        v-text="
                          getActual(mhsellout.incentive, mhsellout.incentiveidr)
                        "
                      ></span>
                    </template>
                  </van-field>
                </van-col>
              </van-row>
            </div>
          </div>
          <div class="info" v-show="this.type == 'PMT'">
            <div class="form-group">
              <van-row class="body-row" style="padding-left: 15px">
                <van-col span="3" style="padding-top: 10px">
                  <b class="serial-number">3</b>
                </van-col>
                <van-col span="21">
                  <van-field
                    :label="this.$t('pmt.incentive.mhModelIncentive')"
                    input-align="left"
                    label-width="auto"
                    :colon="false"
                  >
                    <template #input> </template>
                  </van-field>
                </van-col>
              </van-row>
              <van-row class="body-row">
                <van-col span="24">
                  <van-row style="text-align: center">
                    <van-col span="12" class="list-head">
                      <span>{{
                        this.$t("pmt.incentive.mhModelListScheme")
                      }}</span>
                    </van-col>
                    <van-col span="12" class="list-head">
                      <span>{{
                        this.$t("pmt.incentive.mhModelListAchievement")
                      }}</span>
                    </van-col>
                  </van-row>
                  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      @load="onLoad"
                    >
                      <div
                        class="item"
                        v-for="(item, index) in mhModelIncentive.slablist"
                        :key="index"
                      >
                        <!-- ITEM BEGIN -->
                        <van-row type="flex" justify="center">
                          <van-col span="12" class="list-body">
                            <span>{{ item.achievement }}</span>
                          </van-col>
                          <van-col span="12" class="list-body">
                            <span>{{ item.incentive }}</span>
                          </van-col>
                        </van-row>

                        <!-- ITEM END -->
                      </div>
                    </van-list>
                  </van-pull-refresh>
                </van-col>
              </van-row>
              <van-row class="body-row">
                <van-col span="20">
                  <van-field
                    label-class="actual-Incentive"
                    :label="this.$t('pmt.incentive.mhModelActualIncentive')"
                    input-align="left"
                    label-width="120px"
                    :colon="true"
                  >
                    <template #input>
                      <span
                        class="actual-Incentive"
                        v-text="mhModelIncentive.mhmodelestimatedincentive"
                      ></span>
                    </template>
                  </van-field>
                </van-col>
                <van-col span="4">
                  <van-button
                    type="info"
                    size="small"
                    :disabled="this.selectDate == ''"
                    :to="{
                      name: 'mhModelDetail',
                      query: {
                        selectDate: this.selectDate,
                      },
                    }"
                    >{{ this.$t("pmt.detailButton") }}</van-button
                  >
                </van-col>
              </van-row>
            </div>
          </div>

          <div class="info" v-show="this.type == 'TL'">
            <div class="form-group">
              <van-row class="body-row" style="padding-left: 15px">
                <van-col span="3" style="padding-top: 10px">
                  <b class="serial-number">3</b>
                </van-col>
                <van-col span="21">
                  <van-field
                    :label="this.$t('pmt.incentive.shopVisitTarget')"
                    input-align="left"
                    label-width="auto"
                    :colon="false"
                  >
                    <template #input>
                      <span v-text="AddUnit(shopvisit.target)"></span>
                    </template>
                  </van-field>
                  <van-field
                    :label="this.$t('pmt.incentive.totalIncentive100')"
                    input-align="left"
                    label-width="auto"
                    :colon="false"
                  >
                    <template #input>
                      <span v-text="AddUnit(shopvisit.incentive100)"></span>
                    </template>
                  </van-field>
                </van-col>
              </van-row>
              <van-row class="body-row">
                <van-col span="24">
                  <van-row style="text-align: center">
                    <van-col span="12" class="list-head">
                      <span>{{
                        this.$t("pmt.incentive.totalListAchievement")
                      }}</span>
                    </van-col>
                    <van-col span="12" class="list-head">
                      <span>{{
                        this.$t("pmt.incentive.totalListIncentive")
                      }}</span>
                    </van-col>
                  </van-row>
                  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      @load="onLoad"
                    >
                      <div
                        class="item"
                        v-for="(item, index) in shopvisit.slablist"
                        :key="index"
                      >
                        <!-- ITEM BEGIN -->
                        <van-row type="flex" justify="center">
                          <van-col span="12" class="list-body">
                            <span>{{ item.achievement }}</span>
                          </van-col>
                          <van-col span="12" class="list-body">
                            <span>{{ item.incentive }}</span>
                          </van-col>
                        </van-row>

                        <!-- ITEM END -->
                      </div>
                    </van-list>
                  </van-pull-refresh>
                </van-col>
              </van-row>
              <van-row class="body-row">
                <van-col span="24">
                  <van-field
                    :label="this.$t('pmt.incentive.TLIncentive')"
                    input-align="left"
                    label-width="120px"
                    :colon="true"
                  >
                    <template #input>
                      <span
                        v-text="
                          getActual(shopvisit.actual, shopvisit.achievement)
                        "
                      ></span>
                    </template>
                  </van-field>
                </van-col>
                <van-col span="24">
                  <van-field
                    label-class="actual-Incentive"
                    :label="this.$t('pmt.incentive.shopVisitActualIncentive')"
                    input-align="left"
                    label-width="120px"
                    :colon="true"
                  >
                    <template #input>
                      <span
                        class="actual-Incentive"
                        v-text="
                          getActual(shopvisit.incentive, shopvisit.incentiveidr)
                        "
                      ></span>
                    </template>
                  </van-field>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>

        <div class="form-group" v-if="this.type == 'MD'">
          <div class="form-guid">
            <van-field
              class="card-title"
              :label="this.$t('pmt.incentive.totalIncentive')"
              input-align="left"
              label-class="card-lable"
              label-width="120px"
              :colon="true"
            >
              <template #input>
                <span v-text="totalIncentive"></span>
              </template>
            </van-field>
            <van-field
              :label="this.$t('pmt.incentive.mdBasicSalary')"
              input-align="left"
              label-width="120px"
              :colon="true"
            >
              <template #input>
                <span v-text="mdSellOut.basicSalary"></span>
              </template>
            </van-field>
            <van-field
              :label="this.$t('pmt.incentive.mdTotalIncentive')"
              input-align="left"
              label-width="120px"
              :colon="true"
            >
              <template #input>
                <span v-text="mdSellOut.totalIncentive100"></span>
              </template>
            </van-field>
            <van-field
              :label="this.$t('pmt.incentive.mdIncentive100')"
              input-align="left"
              label-width="120px"
              :colon="true"
            >
              <template #input>
                <span v-text="mdSellOut.incentive100"></span>
              </template>
            </van-field>

            <div class="infog-card form-group">
              <div class="mdModelList-table">
                <table>
                  <thead>
                    <tr>
                      <th class="">
                        <span>{{ this.$t("pmt.incentive.mdListType") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.incentive.mdListTarget") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.incentive.mdListActual") }}</span>
                      </th>
                      <th>
                        <span>{{ this.$t("pmt.incentive.mdListAch") }}</span>
                      </th>
                      <th>
                        <span>{{
                          this.$t("pmt.incentive.mdListWeightage")
                        }}</span>
                      </th>
                      <th>
                        <span>{{
                          this.$t("pmt.incentive.mdListIncentive")
                        }}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in mdSellOut.slablist"
                      :key="index"
                    >
                      <td class="">{{ item.typeName }}</td>
                      <td>{{ item.target }}</td>
                      <td>
                        {{ item.actual }}
                      </td>
                      <td>
                        {{ item.achievement }}
                      </td>
                      <td>
                        {{ item.weightage }}
                      </td>
                      <td>
                        <span>{{ item.incentive }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <van-row class="body-row" style="">
        <van-col span="24">
          <van-button block type="info" @click="onButton_Ok">{{
            this.$t("pmt.okButton")
          }}</van-button>
        </van-col>
      </van-row> -->
    </van-form>
    <div class="tab-bar">
      <van-tabbar route>
        <van-button block type="info" @click="onButton_Ok">{{
          this.$t("pmt.okButton")
        }}</van-button>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { getPmt, getTl, getMd, getgetMhModellist } from "@/api/myIncentive";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";
export default {
  name: "incentive",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.incentive.topBarMdTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      // topBarRightHtml: '<i class="van-icon van-icon-search"></i>',
      topBarRightHtml: "",

      loading: false,
      finished: false,
      refreshing: false,

      showDatePicker: false,
      type: "PMT",

      selectDate: "",
      totalIncentive: 0,
      defaultData: {
        target: 0,
        actual: 0,
        incentive100: 0,
        incentiveidr: 0,
        incentive: 0,
        slablist: [],
        min: 0,
        max: 0,
        achievement: 0,
        weightage: 0,
        incentiveweightage: 0,
      },
      totalsellout: {
        target: 0,
        actual: 0,
        incentive100: 0,
        incentiveidr: 0,
        incentive: 0,
        slablist: [],
        min: 0,
        max: 0,
        achievement: 0,
        weightage: 0,
        incentiveweightage: 0,
      },
      mhsellout: {
        target: 0,
        actual: 0,
        incentive100: 0,
        incentiveidr: 0,
        incentive: 0,
        slablist: [],
        min: 0,
        max: 0,
        achievement: 0,
        weightage: 0,
        incentiveweightage: 0,
      },
      mhModelIncentive: {
        mhmodelestimatedincentive: 0,
        slablist: [],
      },
      shopvisit: {
        target: 0,
        actual: 0,
        incentive100: 0,
        incentiveidr: 0,
        incentive: 0,
        slablist: [],
        min: 0,
        max: 0,
        achievement: 0,
        weightage: 0,
        incentiveweightage: 0,
      },
      mdSellOut: {
        basicSalary: 0,
        totalIncentive100: 0,
        incentive100: 0,
        slablist: [],
      },

      selectShopId: 0,
      selectShopName: "",
      selectGiftId: 0,
      selectGiftName: "",
      quantity: 0,
      selectGiftCauseId: 0,
      selectGiftCauseName: "",
      receiverName: "",
      receiverPhotoNumber: "",
      receiverAddress: "",
      shopSelectData: [],
      giftNameSelectData: [],
      giftCauseSelectData: [],
      minDate: new Date(),
      maxDate: new Date(),
    };
  },
  created() {
    this.getSelectData();
    this.getList();

    this.type = this.$store.state.position_code;
    console.log(this.type);
    switch (this.type) {
      case "1":
        this.$router.replace({
          name: "psIncentive",
          query: {},
        });
        break;
      case "2":
        this.$router.replace({
          name: "pstlIncentive",
          query: {},
        });
        break;
      case "3":
        this.$router.replace({
          name: "meIncentive",
          query: {},
        });
        break;
      case "4": //METL
        this.$router.replace({
          name: "metlIncentive",
          query: {},
        });
        break;
      case "5":
        break;
      case "6":
        break;
    }

    this.getLocationDate();
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },
    topBarClickLeft() {
      this.$router.go(-1);
    },

    topBarClickRight() {
      console.log("click right");
    },

    getSelectData() {},
    onSubmit() {},
    onCancel() {
      this.$router.go(-1);
    },

    formatter(type, val) {
      return val;
    },
    AddUnit(value) {
      var unit = this.$t("pmt.unit");
      return unit + " " + value;
    },
    onConfirm_Date(value) {
      this.selectDate =
        value.getFullYear() + "-" + (parseInt(value.getMonth()) + 1);
      var params = {
        year: value.getFullYear(),
        month: parseInt(value.getMonth()) + 1,
      };
      switch (this.type) {
        case "PMT":
          this.$toast.loading({ duration: 0, forbidClick: true });
          getPmt(params)
            .then((res) => {
              if (res.success) {
                this.handleHideLoading();
              } else {
                this.$toast.fail(res.message);
                return;
              }
              try {
                if (res.data == "") {
                  return;
                }
                this.totalIncentive = res.data.totalincentive;
                this.totalsellout =
                  res.data.totalsellout != null
                    ? res.data.totalsellout
                    : this.defaultData;
                this.mhsellout =
                  res.data.mhsellout != null
                    ? res.data.mhsellout
                    : this.defaultData;
                this.mhModelIncentive.slablist = [
                  {
                    achievement: "MH Sell-out",
                    incentive:
                      res.data.mhmodelincentivemhsalesachievement != null
                        ? res.data.mhmodelincentivemhsalesachievement
                        : 0,
                  },
                  {
                    achievement: "Total Sell-out",
                    incentive:
                      res.data.mhmodelincentivetotalsalesachievement != null
                        ? res.data.mhmodelincentivetotalsalesachievement
                        : 0,
                  },
                ];
                this.mhModelIncentive.mhmodelestimatedincentive =
                  res.data.mhmodelestimatedincentive;
              } catch (e) {
                this.$toast.fail(e.message);
              }
              this.showDatePicker = false;
            })
            .catch((e) => {
              this.$toast.fail(e.message);
            })
            .finally(() => {
              this.showDatePicker = false;
            });
          break;
        case "TL":
          this.$toast.loading({ duration: 0, forbidClick: true });
          getTl(params)
            .then((res) => {
              if (res.success) {
                this.handleHideLoading();
              } else {
                this.$toast.fail(res.message);
                return;
              }
              try {
                if (res.data == "") {
                  return;
                }
                this.totalIncentive = res.data.totalincentive;
                this.totalsellout =
                  res.data.totalsellout != null
                    ? res.data.totalsellout
                    : this.defaultData;
                this.mhsellout =
                  res.data.mhsellout != null
                    ? res.data.mhsellout
                    : this.defaultData;
                this.shopvisit =
                  res.data.shopvisit != null
                    ? res.data.shopvisit
                    : this.defaultData;
              } catch (e) {
                this.$toast.fail(e.message);
              }
              this.showDatePicker = false;
            })
            .catch((e) => {
              this.$toast.fail(e.message);
            })
            .finally(() => {
              this.showDatePicker = false;
            });
          break;
        case "MD":
          this.$toast.loading({ duration: 0, forbidClick: true });
          getMd(params)
            .then((res) => {
              if (res.success) {
                this.handleHideLoading();
              } else {
                this.$toast.fail(res.message);
                return;
              }
              try {
                if (res.data == "") {
                  return;
                }
                this.totalIncentive = res.data.totalincentive;
                this.mdSellOut = {
                  basicSalary: res.data.basicsalary,
                  incentive100: res.data.incentive100,
                  totalIncentive100: res.data.totalincentive100,
                };
                this.mdSellOut.slablist = [];
                if (res.data.sellout != null) {
                  var sellout = {
                    typeName: "Total Sell-out",
                    target: res.data.sellout.target,
                    actual: res.data.sellout.actual,
                    achievement: res.data.sellout.achievement,
                    weightage: res.data.sellout.weightage,
                    incentive: res.data.sellout.incentive,
                  };
                  this.mdSellOut.slablist.push(sellout);
                }

                if (res.data.mhsellout != null) {
                  var mhsellout = {
                    typeName: "MH Sell-out",
                    target: res.data.mhsellout.target,
                    actual: res.data.mhsellout.actual,
                    achievement: res.data.mhsellout.achievement,
                    weightage: res.data.mhsellout.weightage,
                    incentive: res.data.mhsellout.incentive,
                  };
                  this.mdSellOut.slablist.push(mhsellout);
                }

                if (res.data.keytask != null) {
                  var keytask = {
                    typeName: "Key Task Management",
                    target: "/",
                    actual: "/",
                    achievement: res.data.keytask.achievement,
                    weightage: res.data.keytask.weightage,
                    incentive: res.data.keytask.incentive,
                  };
                  this.mdSellOut.slablist.push(keytask);
                }

                if (res.data.shopvisit != null) {
                  var shopvisit = {
                    typeName: "Shop Visit Ontime",
                    target: res.data.shopvisit.target,
                    actual: res.data.shopvisit.actual,
                    achievement: res.data.shopvisit.achievement,
                    weightage: res.data.shopvisit.weightage,
                    incentive: res.data.shopvisit.incentive,
                  };
                  this.mdSellOut.slablist.push(shopvisit);
                }

                if (res.data.networkefficiency != null) {
                  var networkefficiency = {
                    typeName: "Network Efficiency(Productivity)",
                    target: "/",
                    actual: "/",
                    achievement: res.data.networkefficiency.achievement,
                    weightage: res.data.networkefficiency.weightage,
                    incentive: res.data.networkefficiency.incentive,
                  };
                  this.mdSellOut.slablist.push(networkefficiency);
                }

                if (res.data.pdap != null) {
                  var pdap = {
                    typeName: "Product Display as Planogram",
                    target: res.data.pdap.target,
                    actual: res.data.pdap.actual,
                    achievement: res.data.pdap.achievement,
                    weightage: res.data.pdap.weightage,
                    incentive: res.data.pdap.incentive,
                  };
                  this.mdSellOut.slablist.push(pdap);
                }

                if (res.data.pop != null) {
                  var pop = {
                    typeName: "POP & POSM",
                    target: "/",
                    actual: "/",
                    achievement: res.data.pop.achievement,
                    weightage: res.data.pop.weightage,
                    incentive: res.data.pop.incentive,
                  };
                  this.mdSellOut.slablist.push(pop);
                }

                if (res.data.training != null) {
                  var training = {
                    typeName: "Training",
                    target: res.data.training.target,
                    actual: res.data.training.actual,
                    achievement: res.data.training.achievement,
                    weightage: res.data.training.weightage,
                    incentive: res.data.training.incentive,
                  };
                  this.mdSellOut.slablist.push(training);
                }
              } catch (e) {
                this.$toast.fail(e.message);
              }
              this.showDatePicker = false;
            })
            .catch((e) => {
              this.$toast.fail(e.message);
            })
            .finally(() => {
              this.showDatePicker = false;
            });
          break;
      }
      this.showDatePicker = false;
    },
    onLoad() {
      this.finished = true;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    getList() {
      this.finished = true;
    },
    onButton_Ok() {
      this.$router.go(-1);
    },
    getActual(value, percentage) {
      return (
        value + " ( " + (parseFloat(percentage) * 100).toFixed(0) + "%" + " )"
      );
    },
    getLocationDate() {
      // :min-date="minDate"
      let nowDate = new Date();
      let nowDateLocation = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() - 1,
      };
      this.minDate = new Date(nowDateLocation.year - 3, nowDateLocation.month);
      this.maxDate = new Date(nowDateLocation.year, nowDateLocation.month);
      this.onConfirm_Date(nowDate);
    },
  },
};
</script>

<style lang="scss" scoped>
.incentive {
  padding: 5px;
  // background-color: #fff;
  .incentive-body {
    padding-bottom: 20%;
  }
  .form-group {
    margin: 12px;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
  }
  .card-title {
    background: #2058ab;
    span {
      color: #fff;
    }
    // color: #fff;
    // padding-left: 10px;
  }
  .actual-Incentive {
    color: red;
    .van-cell__title {
      color: red;
    }
    span {
      color: red;
    }
  }
}

.mdModelList-table {
  width: 100%;
  margin: 0 auto;
  overflow-x: scroll;
  th,
  td {
    text-align: center;
    border: 1px solid #eee;
    padding: 18px;
    white-space: nowrap;
  }
  thead {
    background: #f1f8ff;
    // color: rgb(51, 51, 51);
  }
  tbody {
    background: white;
  }
  .md-total {
    background: #f1f8ff;
  }
}
</style>
<style>
.van-field__error-message {
  float: right;
}

.card-lable {
  color: #fff;
}

.actual-Incentive {
  color: red;
}

.serial-number {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: inline-block;
  text-align: center;
  line-height: 0.64rem;
  background: #fff;
  font-size: 0.32rem;
  font-weight: bold;
  top: 0.16rem;
  left: 0.16rem;
  border: 1px solid #000;
}

.list-head {
  background: #2058ab;
  color: #fff;
  text-align: center;
  padding: 10px;
  /* border: 0.1px solid #000; */
  height: 50px;
  text-align: center;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
}

.list-bodyHear {
  /* background: #2058ab; */
  /* color: #fff; */
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  border: 0.1px solid #000;
}

.list-body {
  /* background: #2058ab; */
  /* color: #fff; */
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  text-align: center;
  /* display: -webkit-flex; */
  align-items: center;
  justify-content: center;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  /* border: 0.1px solid #000; */
  /* padding-top: 20px; */
}

.body-row {
  padding: 5px;
}

.form-group {
  margin: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
</style>
