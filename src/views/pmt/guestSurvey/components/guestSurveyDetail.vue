<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    >
    </TopBar>
    <div class="guestSurvey" v-for="(item, index) in guestQuestionOption.question_list">
      <div class="infog-card form-group question">
        <div v-if="item.new_question_type == 1">
          <h2 class="card-title">
            {{ item.new_question_desc }}
          </h2>
          <van-row>
            <van-radio-group
              v-model="guestAnswerOption[index].select_options_id"
              :disabled="isSubmit"
            >
              <van-col
                class="question-answer"
                :span="24"
                v-for="option in item.option_list"
              >
                <van-radio :name="option.new_guest_suvey_optionsid">
                  {{ option.new_option_desc }}
                </van-radio>
              </van-col>
            </van-radio-group>
          </van-row>
        </div>
        <div v-if="item.new_question_type == 2">
          <h2 class="card-title">
            {{ item.new_question_desc }}
          </h2>
          <van-row>
            <van-checkbox-group
              v-model="guestAnswerOption[index].selectData"
              :disabled="isSubmit"
            >
              <van-col
                class="question-answer"
                :span="24"
                v-for="option in item.option_list"
              >
                <van-checkbox
                  :name="option.new_guest_suvey_optionsid"
                  shape="square"
                >
                  {{ option.new_option_desc }}
                </van-checkbox>
              </van-col>
            </van-checkbox-group>
          </van-row>
        </div>
        <div v-if="item.new_question_type == 3">
          <h2 class="card-title">
            {{ item.new_question_desc }}
          </h2>
          <van-row>
            <!-- <span>{{ guestAnswerOption[index] }}</span> -->
            <van-radio-group
              v-model="guestAnswerOption[index].select_options_id"
              :disabled="isSubmit"
            >
              <van-col
                class="question-answer"
                :span="24"
                v-for="(option, i) in item.option_list"
                v-show="i < 2"
              >
                <van-radio :name="option.new_guest_suvey_optionsid">
                  {{ option.new_option_desc }}
                </van-radio>
              </van-col>
            </van-radio-group>
          </van-row>
        </div>
        <div v-if="item.new_question_type == 4">
          <h2 class="card-title">
            {{ item.new_question_desc }}
          </h2>
          <van-row>
            <van-field
              v-model="guestAnswerOption[index].new_comments_answer"
              input-align="left"
              label-width="3.7rem"
              :colon="true"
              rows="2"
              autosize
              type="textarea"
              maxlength="200"
              show-word-limit
              :disabled="isSubmit"
            >
            </van-field>
          </van-row>
        </div>
      </div>
    </div>
    <div class="tab-bar">
      <van-tabbar route>
        <van-button
          block
          square
          type="info"
          color="#407FDC"
          @click="
            () => {
              this.$throttle.throttle(onClick_submit());
            }
          "
          :disabled="isSubmitButton"
          >{{ $t("pmt.submitButton") }}</van-button
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { postSurvey, postSubmitSurvey } from "@/api/guestSurvey";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

export default {
  name: "guestSurveyDetail",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.gusestSurveyDetail.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      selectGuestSurveyId: "",

      guestQuestionOption: [],
      guestAnswerOption: [],

      isSubmit: false,
      isSubmitButton: false,

      isTest: false,

      isSubmitEnd: false,
    };
  },
  created() {
    this.selectGuestSurveyId = this.$route.query.selectGuestSurveyId;
    // this.isTest = JSON.parse(this.$route.query.isTest);
    this.getData();
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickLeft() {
      this.$router.go(-1);
    },
    onClick_cancel() {
      this.$router.go(-1);
    },

    getData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var parmas = {
        new_guest_surveyid: this.selectGuestSurveyId,
      };
      postSurvey(parmas)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            // if (this.isTest) {
            this.guestAnswerOption = [];
            this.guestQuestionOption = data;
            this.guestQuestionOption.question_list.forEach((element) => {
              var answerOption = {
                new_guestSurvey_id: this.selectGuestSurveyId,
                new_question_desc: element.new_question_desc,
                new_guest_survey_questionid:
                  element.new_guest_survey_questionid,
                new_question_type: element.new_question_type,

                select_options_id: "",
                selectData: [],
                new_comments_answer: "",
              };

              if (element.new_question_type == 4) {
                answerOption.select_options_id =
                  element.option_list[0].new_guest_suvey_optionsid;
              }

              this.guestAnswerOption.push(answerOption);
            });
          }
        })
        .catch((error) => {
          this.guestAnswerOption = [];
          this.guestQuestionOption = [];
          this.$toast.fail(error.message);
        })
        .finally(() => {
          this.handleHideLoading();
        });
    },

    onClick_submit() {
      this.$dialog
        .confirm({
          title: this.$t("pmt.test.leaveTitle"),
          message: this.$t("pmt.test.submitMessage"),
        })
        .then(() => {
          this.submitData();
        })
        .catch(() => {
          return false;
        });
    },

    submitData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = {
        new_guest_surveyid: null,
        questions: [],
      };
      console.log(this.guestAnswerOption);
      //  ;
      let option = {};
      this.guestAnswerOption.forEach((element) => {
        switch (element.new_question_type) {
          case 1:
            option = {
              new_guest_survey_questionid: null,
              options: [
                {
                  new_guest_suvey_optionsid: element.select_options_id,
                  new_selected_qty: 1,
                  new_comments_split: "",
                },
              ],
            };
            break;
          case 2:
            option = {
              new_guest_survey_questionid: null,
              options: [],
            };

            element.selectData.forEach((multipleItem) => {
              var multipleOption = {
                new_guest_suvey_optionsid: multipleItem,
                new_selected_qty: 1,
                new_comments_split: "",
              };
              option.options.push(multipleOption);
            });
            break;
          case 3:
            option = {
              new_guest_survey_questionid: null,
              options: [
                {
                  new_guest_suvey_optionsid: element.select_options_id,
                  new_selected_qty: 1,
                  new_comments_split: "",
                },
              ],
            };
            break;
          case 4:
            console.log(element);
            option = {
              new_guest_survey_questionid: null,
              options: [
                {
                  new_guest_suvey_optionsid: element.select_options_id,
                  new_selected_qty: 0,
                  new_comments_split: element.new_comments_answer,
                },
              ],
            };
            break;
        }

        data.questions.push(option);
      });
      postSubmitSurvey(data)
        .then((res) => {
          const { success, data } = res;
          //  ;
          if (success) {
            this.isSubmit = true;
            this.isSubmitButton = true;
            this.$toast.success(res.message);
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((error) => {
          this.$toast.fail(error.message);
        })
        .finally(() => {
          // this.handleHideLoading();
        });
    },

    timeFinish() {
      this.isSubmit = true;
      this.submitData();
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSubmit && !this.isSubmitButton) {
      setTimeout(() => {
        this.$dialog
          .confirm({
            title: this.$t("pmt.test.leaveTitle"),
            message: this.$t("pmt.test.leaveMessage"),
          })
          .then(() => {
            next(true);
          })
          .catch(() => {
            next(false);
          });
      }, 200);
    } else {
      next(true);
    }
  },
};
</script>

<style lang="scss" scoped>
.image-body {
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.question {
  .question-answer {
    padding: 15px;
    padding-left: 30px;
  }
}
.guestSurvey{
  margin-bottom: 20%;
}
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
