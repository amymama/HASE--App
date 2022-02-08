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
    <van-form class="incentive">
      <div class="incentive-body">
        <div class="info">
          <div class="form-group">
            <div class="">
              <van-field
                class="card-title"
                :label="this.$t('pmt.retailDetail.RetailCode')"
                input-align="right"
                label-class="card-lable"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <span v-text="formData.new_retail_code"></span>
                </template>
              </van-field>
              <van-field
                :label="this.$t('pmt.complaint.Photo')"
                input-align="right"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <upload-imgs
                    ref="checkOut"
                    folder="retail"
                    :max="1"
                    :fileList="photoList"
                    :isTakePhoto="true"
                    :showUploader="false"
                  />
                </template>
              </van-field>
              <van-field
                :label="this.$t('pmt.complaint.Shop')"
                input-align="right"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <span v-text="formData.new_shop_name"></span>
                </template>
              </van-field>
              <van-field
                :label="this.$t('pmt.complaint.InvoiceCode')"
                input-align="right"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <span v-text="formData.new_invoice_code"></span>
                </template>
              </van-field>
              <van-field
                :label="this.$t('pmt.complaint.Payment')"
                input-align="right"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <span v-text="formData.new_payment_name"></span>
                </template>
              </van-field>
            </div>
            <div class="form-group">
              <van-field
                :label="this.$t('pmt.complaint.Voucher')"
                input-align="right"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <span v-text="formData.new_voucher"></span>
                </template>
              </van-field>
            </div>
          </div>
          <div
            class="form-group"
            v-for="(item, index) in this.formData.modellist"
            :key="index"
          >
            <van-row>
              <van-col span="24">
                <van-field
                  :label="$t('pmt.complaint.Barcode')"
                  input-align="right"
                  label-width="auto"
                  :colon="true"
                >
                  <template #input>
                    <span v-text="item.new_barcode"></span>
                  </template>
                </van-field>
              </van-col>
              <van-col span="12">
                <van-field
                  :label="$t('pmt.complaint.Model')"
                  input-align="right"
                  label-width="auto"
                  :colon="true"
                >
                  <template #input>
                    <span v-text="item.new_model_name"></span>
                  </template>
                </van-field>
              </van-col>
              <van-col span="12">
                <van-field
                  :label="$t('pmt.complaint.Quantity')"
                  input-align="right"
                  label-width="auto"
                  :colon="true"
                >
                  <template #input>
                    <span v-text="item.new_quantity"></span>
                  </template>
                </van-field>
              </van-col>
              <van-col span="24">
                <van-field
                  :label="$t('pmt.complaint.Price')"
                  input-align="right"
                  label-width="auto"
                  :colon="true"
                >
                  <template #input>
                    <span v-text="item.new_unit_price"></span>
                  </template>
                </van-field>
              </van-col>
              <van-col span="12">
                <van-field
                  :label="$t('pmt.complaint.KeyModel')"
                  input-align="right"
                  label-width="auto"
                  :colon="true"
                >
                  <template #input>
                    <span v-text="item.new_key_model"></span>
                  </template>
                </van-field>
              </van-col>
              <van-col span="12">
                <van-field
                  :label="$t('pmt.complaint.ModelIncentive')"
                  input-align="right"
                  label-width="auto"
                  :colon="true"
                >
                  <template #input>
                    <span v-text="item.new_model_incentive"></span>
                  </template>
                </van-field>
              </van-col>
            </van-row>
          </div>
          <div class="applyAbsence-form">
            <div class="applyAbsence-group__header">
              <div class="applyAbsence-group__title">
                {{ this.$t("pmt.retailDetail.GiftInfo") }}
              </div>
            </div>
            <div
              class="applyAbsence-form-group"
              v-for="(item, index) in this.formData.giftlist"
              :key="index"
            >
              <van-form ref="formData" alidate-first label-width="3.7rem">
                <van-field
                  required
                  readonly
                  :label="$t('pmt.retailDetail.GiftName')"
                  input-align="right"
                  label-width="3.7rem"
                  :colon="true"
                  v-model="item.gift_name"
                />
                <van-field
                  required
                  readonly
                  :label="$t('pmt.retailDetail.GiftQuantity')"
                  input-align="right"
                  label-width="3.7rem"
                  :colon="true"
                  v-model="item.gift_num"
                >
                </van-field>
              </van-form>
            </div>
          </div>

          <div class="applyAbsence-form">
            <div class="applyAbsence-group__header">
              <div class="applyAbsence-group__title">
                {{ this.$t("pmt.complaint.ConsumerInfo") }}
              </div>
            </div>
            <div class="applyAbsence-form-group">
              <van-form ref="formData" alidate-first label-width="3.7rem">
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.complaint.Name')"
                  input-align="right"
                  label-width="3.7rem"
                  @click="showDatePicker = true"
                  :colon="true"
                  v-model="formData.new_consumer_name"
                />
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.complaint.MobileNumber')"
                  input-align="right"
                  label-width="3.7rem"
                  @click="showTimePicker = true"
                  :colon="true"
                  v-model="formData.new_consumer_mobile"
                >
                </van-field>
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.complaint.Address')"
                  input-align="right"
                  label-width="3.7rem"
                  :colon="true"
                  v-model="formData.new_consumer_address"
                >
                </van-field>
              </van-form>
            </div>

            <div class="applyAbsence-group__header">
              <div class="applyAbsence-group__title">
                {{ this.$t("pmt.complaint.MoreInfo") }}
              </div>
            </div>
            <div class="applyAbsence-form-group">
              <van-form ref="formData" alidate-first label-width="3.7rem">
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.complaint.Dealer')"
                  input-align="right"
                  label-width="3.7rem"
                  @click="showDatePicker = true"
                  :colon="true"
                  v-model="formData.new_dealer_name"
                />
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.complaint.CreatedBy')"
                  input-align="right"
                  label-width="3.7rem"
                  @click="showTimePicker = true"
                  :colon="true"
                  v-model="formData.new_user_name"
                >
                </van-field>
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.complaint.CreateDate')"
                  input-align="right"
                  label-width="3.7rem"
                  :colon="true"
                  v-model="formData.new_created_on"
                >
                </van-field>
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.complaint.Personnel')"
                  input-align="right"
                  label-width="3.7rem"
                  :colon="true"
                  v-model="formData.new_operator_type_name"
                >
                </van-field>
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.complaint.Status')"
                  input-align="right"
                  label-width="3.7rem"
                  :colon="true"
                  v-model="formData.new_approve_status_name"
                >
                </van-field>
              </van-form>
            </div>
          </div>

          <div class="applyAbsence-form">
            <div class="applyAbsence-form-group">
              <van-form ref="formData" alidate-first label-width="3.7rem">
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.retailDetail.RetailSalesAmount')"
                  input-align="right"
                  label-width="4.7rem"
                  :colon="true"
                  v-model="formData.new_invoice_total_sell_out"
                />
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.retailDetail.KeyModelSalesAmount')"
                  input-align="right"
                  label-width="4.7rem"
                  :colon="true"
                  v-model="formData.new_invoice_key_sell_out"
                >
                </van-field>
              </van-form>
            </div>
          </div>
          <div class="applyAbsence-form">
            <div class="applyAbsence-form-group">
              <van-form ref="formData" alidate-first label-width="3.7rem">
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.retailDetail.ReportType')"
                  input-align="right"
                  label-width="4.7rem"
                  :colon="true"
                  v-model="formData.new_submit_type_name"
                />
                <van-field
                  required
                  readonly
                  :label="this.$t('pmt.retailDetail.Status')"
                  input-align="right"
                  label-width="4.7rem"
                  :colon="true"
                  v-model="formData.new_approve_status_name"
                >
                </van-field>
                <van-field
                  required
                  :label="this.$t('pmt.absence.Comment')"
                  input-align="right"
                  label-width="3.7rem"
                  :colon="true"
                  v-model="formData.new_comments"
                  rows="2"
                  autosize
                  type="textarea"
                  maxlength="200"
                  show-word-limit
                >
                  <!-- :rules="[
                {
                  required: true,
                  message: this.$t(
                    'pmt.applyAbsence.detailInfoFormAbsentReasonMessage'
                  ),
                },
              ]" -->
                </van-field>
              </van-form>
            </div>
          </div>
        </div>
      </div>
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
import { getPmt, getTl, getMd, getgetMhModellist } from "@/api/myIncentive";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

import { getapprovedetail } from "@/api/approve";
import { batchrejectflow, batchapproveflow } from "@/api/approve";
import { getShopInfo } from "@/api/attendant";
import UploadImgs from "@/components/UploadImgs";
export default {
  name: "retailDetail",
  components: {
    TopBar,
    ChangeLang,
    UploadImgs,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.retailDetail.topBarTitle"),
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
        new_retail_code: "",
        new_shop_name: "",
        new_invoice_code: "",
        new_invoice_imageurl: "",
        new_payment_name: "",
        new_voucher: "",
        modellist: [],
        new_consumer_name: "",
        new_consumer_mobile: "",
        new_consumer_address: "",
        new_dealer_name: "",
        new_user_name: "",
        new_created_on: "",
        new_operator_type_name: "",
        new_submit_type_name: "",
        new_approve_status_name: "",
        new_approve_date: "",
        new_comments: "",
        retail_original: {},
        giftlist: [],
      },
      approveSuggestion: "",

      photoList: [],
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
            this.photoList.push({
              new_download_url: this.formData.new_invoice_imageurl,
              new_keyword: "complaint",
              new_description: "complaint",
              new_type: 1,
              new_filename: "complaint",
              new_filesize: 0,
            });
            // this.photoList.push(this.formData.new_invoice_imageurl);
            // this.getShopInfo();
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
        approveSuggestion: this.formData.new_comments,
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
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        approveRecordId: [this.Id],

        // approveSuggestion: [],
      };
      var params = {
        approveSuggestion: this.formData.new_comments,
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
  color: #000;
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