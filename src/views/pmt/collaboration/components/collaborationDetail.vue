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

    <van-form
      @submit="
        () => {
          this.$throttle.throttle(onClick_Submit());
        }
      "
      class="applyAbsence-form"
    >
      <div class="applyAbsence">
        <div class="applyAbsence-group__header">
          <div class="applyAbsence-group__title">
            {{ this.$t("pmt.workPlanDetail.basicInfo") }}
          </div>
        </div>
        <div class="applyAbsence-form-group">
          <van-field
            required
            readonly
            :label="this.$t('pmt.collaborationDetail.name')"
            :rules="[{ required: true }]"
            input-align="right"
            label-width="auto"
            :colon="true"
            v-model="basicInfoForm.Name"
          />
          <van-field
            v-model="selectSubmitByName"
            is-link
            readonly
            :label="this.$t('pmt.collaborationDetail.submittedBy')"
            @click="
              () => {
                if (!isReadonly) showSubmitByPicker = true;
              }
            "
            input-align="right"
            label-width="auto"
            :rules="[
              {
                required: true,
                message: this.$t(
                  'pmt.collaborationDetail.submittedByErrorMessage'
                ),
              },
            ]"
          />
          <van-popup v-model="showSubmitByPicker" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="submitBySelectData"
              @cancel="showSubmitByPicker = false"
              @confirm="onConfirm_SubmitBy"
              value-key="text"
              :confirm-button-text="this.$t('pmt.confirmButton')"
              :cancel-button-text="this.$t('pmt.cancelButton')"
            />
          </van-popup>
          <van-field
            v-model="selectTypeName"
            is-link
            readonly
            :label="this.$t('pmt.collaborationDetail.type')"
            @click="
              () => {
                if (!isReadonly) showTypePicker = true;
              }
            "
            input-align="right"
            label-width="auto"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.collaborationDetail.typeErrorMessage'),
              },
            ]"
          />
          <van-popup v-model="showTypePicker" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="typeSelectData"
              @cancel="showTypePicker = false"
              @confirm="onConfirm_Type"
              value-key="text"
              :confirm-button-text="this.$t('pmt.confirmButton')"
              :cancel-button-text="this.$t('pmt.cancelButton')"
            />
          </van-popup>
        </div>
        <div class="infog-card form-group">
          <van-field
            v-model="detailInfo.new_title"
            :label="this.$t('pmt.collaboration.ListTitle')"
            input-align="right"
            label-width="120px"
            maxlength="50"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.collaborationDetail.titleErrorMessage'),
              },
            ]"
            :disabled="isReadonly"
          />

          <van-field
            v-model="detailInfo.new_message"
            rows="3"
            autosize
            :placeholder="this.$t('pmt.collaborationDetail.contentMessage')"
            type="textarea"
            input-align="right"
            maxlength="500"
            :disabled="isReadonly"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.collaborationDetail.contentMessage'),
              },
            ]"
          />
          <van-field
            is-link
            readonly
            @click="
              () => {
                if (!isReadonly) showQuestionLevelPicker = true;
              }
            "
            :label="this.$t('pmt.collaborationDetail.questionLevel')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="selectQuestionLevelName"
            :rules="[
              {
                required: true,
                message: this.$t(
                  'pmt.collaborationDetail.questionLevelErrorMessage'
                ),
              },
            ]"
          >
          </van-field>
          <van-field
            v-model="selectShopName"
            is-link
            readonly
            :label="this.$t('pmt.collaborationDetail.shop')"
            @click="
              () => {
                if (!isReadonly) showShopPicker = true;
              }
            "
            input-align="right"
            label-width="120px"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.collaborationDetail.shopErrorMessage'),
              },
            ]"
          />
          <van-popup v-model="showShopPicker" position="bottom" round>
            <van-picker
              show-toolbar
              :columns="shopSelectData"
              @cancel="showShopPicker = false"
              @confirm="onConfirm_Shop"
              value-key="text"
              :confirm-button-text="this.$t('pmt.confirmButton')"
              :cancel-button-text="this.$t('pmt.cancelButton')"
            />
          </van-popup>

          <van-field
            readonly
            is-link
            @click="
              () => {
                if (!isReadonly) showReceiverPicker = true;
              }
            "
            :label="this.$t('pmt.collaborationDetail.receiver')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="selectReceiverName"
            :rules="[
              {
                required: true,
                message: this.$t(
                  'pmt.collaborationDetail.receiverErrorMessage'
                ),
              },
            ]"
          >
          </van-field>
          <van-field
            readonly
            is-link
            @click="
              () => {
                if (!isReadonly) showCCPicker = true;
              }
            "
            :label="this.$t('pmt.collaborationDetail.cc')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="selectCCName"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.collaborationDetail.ccErrorMessage'),
              },
            ]"
          >
          </van-field>
        </div>

        <div class="infog-card form-group">
          <upload-imgs
            ref="collaborationPhoto"
            folder="collaboration"
            :fileList="collaborationPhotoList"
            :showUploader="true"
            @fileUploadOk="handleUserPhotoOk"
            @fileDelete="handleUserPhotoDelete"
            :disabled="isReadonly ? true : false"
          />
        </div>
        <div class="infog-card form-group" v-show="isShowFeedback">
          <van-field
            required
            :label="this.$t('pmt.collaborationDetail.feedback')"
            input-align="right"
            label-width="3.7rem"
            :colon="true"
            v-model="detailInfo.feedback"
            rows="2"
            autosize
            type="textarea"
            maxlength="200"
            show-word-limit
            :rules="[
              {
                required: true,
                message: this.$t(
                  'pmt.collaborationDetail.feedbackErrorMessage'
                ),
              },
            ]"
          >
          </van-field>
        </div>
      </div>

      <van-popup v-model="showQuestionLevelPicker" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="questionLevelSelectData"
          @cancel="showQuestionLevelPicker = false"
          @confirm="onConfirm_QuestionLevel"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <van-popup v-model="showReceiverPicker" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="receiverSelectData"
          @cancel="showReceiverPicker = false"
          @confirm="onConfirm_Receiver"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <van-popup v-model="showCCPicker" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="ccSelectData"
          @cancel="showCCPicker = false"
          @confirm="onConfirm_CC"
          value-key="text"
          :confirm-button-text="this.$t('pmt.confirmButton')"
          :cancel-button-text="this.$t('pmt.cancelButton')"
        />
      </van-popup>

      <div class="tab-bar" v-show="isShowCreate">
        <van-tabbar route>
          <van-button
            block
            type="info"
            @click="
              () => {
                this.$throttle.throttle(onButton_Submit(1));
              }
            "
            >{{ this.$t("pmt.retail.saveButton") }}</van-button
          >
          <van-button block type="info" native-type="submit">{{
            this.$t("pmt.retail.submitButton")
          }}</van-button>
        </van-tabbar>
      </div>
      <div class="tab-bar" v-show="isShowOpen">
        <van-tabbar route>
          <van-button
            block
            type="info"
            @click="
              () => {
                this.$throttle.throttle(onClick_OK());
              }
            "
            >{{ this.$t("pmt.okButton") }}</van-button
          >
        </van-tabbar>
      </div>
      <div class="tab-bar" v-show="isShowClose">
        <van-tabbar route>
          <van-button
            block
            type="info"
            native-type="button"
            @click="
              () => {
                this.$throttle.throttle(onClick_Close());
              }
            "
            >{{ this.$t("pmt.closeButton") }}</van-button
          >
          <van-button
            block
            type="info"
            @click="
              () => {
                this.$throttle.throttle(onClick_OK());
              }
            "
            >{{ this.$t("pmt.cancelButton") }}</van-button
          >
        </van-tabbar>
      </div>
    </van-form>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  getLastCheckInfo,
  postApplyAbsence,
  // getShopInfo,
} from "@/api/attendant";
import UploadImgs from "@/components/UploadImgs";
import { getPmtSelectData, getGetPageSelectData } from "@/api/common";
import { postUserPermission, getUserinfoByToken } from "@/api/user";
import {
  getGetusershopinfo,
  getGetreceiveruseList,
  getGetccuseList,
  postInsertorupdate,
  postGetcollaborationpage,
  getGetcollaborationp,
  postUpdateclose,
} from "@/api/collaboration";

export default {
  name: "collaborationDetail",
  components: {
    TopBar,
    UploadImgs,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.collaborationDetail.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      // topBarRightHtml: '<i class="van-icon van-icon-search"></i>',
      topBarRightHtml: "",

      loading: false,
      finished: false,
      refreshing: false,

      showDatePicker: false,
      showTimePicker: false,
      showAbsentTimePicker: false,

      basicInfoForm: {
        Name: "",
        PersonnelType: "",
        Region: "",
        Branch: "",
        Dealer: "",
        ShopName: "",
      },
      detailForm: {
        selectDate: "",
        selectTime: "",
        AbsentTimeId: 4,
        AbsentTimeText: 4,
        AbsentReason: "",
      },
      absentTimeSelectData: [],
      minDate: new Date(),
      maxDate: new Date(),

      //submit by
      showSubmitByPicker: false,
      submitBySelectData: [],
      selectSubmitByName: "",
      selectSubmitById: "",

      // type
      showTypePicker: false,
      typeSelectData: [],
      selectTypeName: "",
      selectTypeId: "",

      // QuestionLevel
      showQuestionLevelPicker: false,
      questionLevelSelectData: [],
      selectQuestionLevelName: "",
      selectQuestionLevelId: "",

      // shop
      showShopPicker: false,
      selectShopName: "",
      shopSelectData: [],
      selectShopId: "",

      //Receiver
      showReceiverPicker: false,
      selectReceiverName: "",
      receiverSelectData: [],
      selectReceiverId: "",

      //cc
      showCCPicker: false,
      selectCCName: "",
      ccSelectData: [],
      selectCCId: "",

      detailInfo: {
        new_title: "",
        new_message: "",
        new_file_url: "",
        feedback: "",
      },

      // photo
      collaborationPhotoList: [],

      isReadonly: false,
      isShowFeedback: false,
      isShowCreate: true,
      isShowOpen: false,

      isShowClose: false,

      selectCollaborationId: "",
      selectStatus: 0,
    };
  },
  created() {
    this.getSelectData();
    this.getUserInfo();
    // this.getShopInfo();
    this.getLocationDate();

    this.selectCollaborationId = this.$route.query.id;
    this.selectStatus = this.$route.query.new_status;
    if (
      this.selectCollaborationId != "" &&
      this.selectCollaborationId != undefined
    ) {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var qarm = {
        Id: this.selectCollaborationId,
      };
      getGetcollaborationp(qarm)
        .then((res) => {
          if (res.success) {
            this.setDeafultData(res.data);
            this.$toast.clear();
            // this.$router.go(-1);
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
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

    onClick_OK() {
      this.$router.go(-1);
    },

    topBarClickRight() {
      console.log("click right");
    },

    setDeafultData(data) {
      this.basicInfoForm.Name = data.new_user_real_name;
      this.selectSubmitById = data.new_submitted_by;
      this.selectSubmitByName = data.new_submitted_by_name;
      this.selectTypeId = data.new_collaboration_type;
      this.selectTypeName = data.new_collaboration_type_name;
      this.detailInfo.new_title = data.new_title;
      this.detailInfo.new_message = data.new_message;
      this.selectQuestionLevelId = data.new_question_level;
      this.selectQuestionLevelName = data.new_question_level_name;
      this.selectShopId = data.new_shop_id;
      this.selectShopName = data.new_shop_name;
      this.selectReceiverId = data.new_receiver_user_id;
      this.selectReceiverName = data.new_receiver_user_real_name;
      this.selectCCId = data.new_cc_user_id;
      this.selectCCName = data.new_cc_user_real_name;
      this.detailInfo.new_file_url = data.new_file_url;
      this.detailInfo.feedback = data.new_comment;

      this.collaborationPhotoList.push({
        new_download_url: data.new_file_url,
        new_keyword: "collaboration",
        new_description: "collaboration",
        new_type: 1,
        new_filename: "collaboration",
        new_filesize: 0,
      });

      switch (this.selectStatus) {
        case 0:
          this.isReadonly = true;
          this.isShowFeedback = true;
          this.isShowCreate = false;
          this.isShowOpen = false;
          this.isShowClose = true;
          break;
        case 1:
          this.isReadonly = false;
          this.isShowFeedback = false;
          this.isShowCreate = true;
          this.isShowOpen = false;
          this.isShowClose = false;
          break;
        case 2:
          this.isReadonly = true;
          this.isShowFeedback = false;
          this.isShowCreate = false;
          this.isShowOpen = true;
          this.isShowClose = false;

          this.topBarTitle = this.$t(
            "pmt.collaborationDetail.topBarTitleOpenDetail"
          );
          break;
        case 3:
          this.isReadonly = true;
          this.isShowFeedback = true;
          this.isShowCreate = false;
          this.isShowOpen = true;
          this.isShowClose = false;
          break;
      }
    },

    getSelectData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        type: "Collaboration_submitted_by",
      };
      getGetPageSelectData(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.Id = element.EnumValue;
              thiselement.text = element.EnumName;
              this.submitBySelectData.push(thiselement);
            });
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {
          this.$toast.clear();
        });

      data = {
        type: "Collaboration_Type",
      };
      getGetPageSelectData(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.Id = element.EnumValue;
              thiselement.text = element.EnumName;
              this.typeSelectData.push(thiselement);
            });
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});

      //
      data = {
        type: "Collaboration_Question_level",
      };
      getGetPageSelectData(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.Id = element.EnumValue;
              thiselement.text = element.EnumName;
              this.questionLevelSelectData.push(thiselement);
            });
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});

      this.shopSelectData = [];
      this.$toast.loading({ duration: 0, forbidClick: true });
      postUserPermission(data)
        .then((res) => {
          // 绑定表格数据
          if (res.success) {
            var resShop = res.data.shopPermission;
            if (resShop.length > 0) {
              this.selectShopId = resShop[0].new_shop_id;
              this.selectShopName = resShop[0].new_shop_name;

              this.value = resShop[0].new_shop_id;
              this.text = resShop[0].new_shop_name;
              this.GetreceiveruseList();
              this.GetccuseList();
            }
            resShop.forEach((element) => {
              var thiselement = {};
              thiselement.value = element.new_shop_id;
              thiselement.text = element.new_shop_name;

              this.shopSelectData.push(thiselement);
            });
            // this.onSelectShopChange();
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {
          this.handleHideLoading();
        });
    },

    GetreceiveruseList() {
      this.receiverSelectData = [];
      getGetreceiveruseList({
        shopid: this.selectShopId,
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.Id = element.id;
              thiselement.text = element.realname;
              this.receiverSelectData.push(thiselement);
            });
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

    GetccuseList() {
      this.receiverSelectData = [];
      getGetccuseList({
        shopid: this.selectShopId,
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            data.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.Id = element.id;
              thiselement.text = element.realname;
              this.ccSelectData.push(thiselement);
            });
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

    formatter(type, val) {
      return val;
    },

    onButton_Ok() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        LeaveTime:
          this.detailForm.selectDate + " " + this.detailForm.selectTime,
        AbsentTime: parseInt(this.detailForm.AbsentTimeId),
        AbsentReason: this.detailForm.AbsentReason,
      };
      postApplyAbsence(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.$router.go(-1);
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

    onConfirm_SubmitBy(value) {
      this.selectSubmitById = value.Id;
      this.selectSubmitByName = value.text;
      this.showSubmitByPicker = false;
    },
    onConfirm_Type(value) {
      this.selectTypeId = value.Id;
      this.selectTypeName = value.text;
      this.showTypePicker = false;
    },

    onConfirm_QuestionLevel(value) {
      this.selectQuestionLevelId = value.Id;
      this.selectQuestionLevelName = value.text;
      this.showQuestionLevelPicker = false;
    },

    onConfirm_Shop(value) {
      //
      console.log(value);
      this.selectShopId = value.value;
      this.selectShopName = value.text;
      this.showShopPicker = false;
      this.GetreceiveruseList();
      this.GetccuseList();
    },

    onConfirm_Receiver(value) {
      this.selectReceiverId = value.Id;
      this.selectReceiverName = value.text;
      this.showReceiverPicker = false;
    },
    onConfirm_CC(value) {
      this.selectCCId = value.Id;
      this.selectCCName = value.text;
      this.showCCPicker = false;
    },

    getUserInfo() {
      // this.$toast.loading({ duration: 0 });
      this.$toast.loading({ duration: 0, forbidClick: true });
      getUserinfoByToken()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { user_position, user_info } = data.Items;

            this.basicInfoForm.Name = user_info.realname;
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

    getLocationDate() {
      // :min-date="minDate"
      let nowDate = new Date();
      let nowDateLocation = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth(),
        date: nowDate.getDate(),
      };
      this.minDate = new Date(
        nowDateLocation.year,
        nowDateLocation.month,
        nowDateLocation.date
      );
      this.maxDate = new Date(
        nowDateLocation.year,
        nowDateLocation.month,
        nowDateLocation.date + 7
      );
    },

    onClick_Submit() {
      this.onButton_Submit(2);
    },

    onButton_Submit(status) {
      this.setFileUrl();

      var data = {
        Id: this.selectCollaborationId,
        new_shop_id: this.selectShopId,
        new_shop_name: this.selectShopName,
        new_user_real_name: this.basicInfoForm.Name,
        new_submitted_by: this.selectSubmitById,
        new_collaboration_type: this.selectTypeId,
        new_title: this.detailInfo.new_title,
        new_message: this.detailInfo.new_message,
        new_question_level: this.selectQuestionLevelId,
        new_receiver_user_id: this.selectReceiverId,
        new_receiver_user_real_name: this.selectReceiverName,
        new_cc_user_id: this.selectCCId,
        new_cc_user_real_name: this.selectCCName,
        new_status: status, //1：Save草稿,  2：Submit提交
        new_file_url: this.detailInfo.new_file_url,
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      postInsertorupdate(data)
        .then((res) => {
          if (res.success) {
            this.$toast.success(res.message);
            this.$router.go(-1);
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

    // Upload img
    handleUserPhotoOk(file) {
      this.collaborationPhotoList.push({
        new_download_url: file.url,
        new_keyword: "collaboration",
        new_description: "collaboration",
        new_type: 1,
        new_filename: file.name,
        new_filesize: 0,
      });
    },

    setFileUrl() {
      var str = "";
      this.collaborationPhotoList.forEach((element) => {
        str = str + element.new_download_url + ",";
      });
      str = str.slice(0, str.length - 1);
      this.detailInfo.new_file_url = str;
    },

    handleUserPhotoDelete(index) {
      this.collaborationPhotoList.splice(index, 1);
    },

    onClick_Close() {
      if (this.detailInfo.feedback == "") {
        this.$toast.fail(
          this.$t("pmt.collaborationDetail.feedbackErrorMessage")
        );
        return false;
      }
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        Id: this.selectCollaborationId,
        new_comment: this.detailInfo.feedback,
      };
      postUpdateclose(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            // topBarClickLeft() {
            this.$router.go(-1);
            // },
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
  },
};
</script>

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
<style>
.van-field__error-message {
  float: right;
}

.form-group {
  margin: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
</style>