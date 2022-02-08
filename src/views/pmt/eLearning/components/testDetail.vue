<template>
  <div>
    <TopBar
      :topBarTitle="topBarTitle"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    >
    </TopBar>
    <div class="infog-card form-group" v-show="isTest">
      <van-count-down class="testTime" :time="testTime" @finish="timeFinish" />
    </div>
    <div class="" v-for="(item, index) in testQuestionOption">
      <div class="infog-card form-group question">
        <div v-if="item.new_question_type == 1">
          <h2 class="card-title">
            {{ item.new_question_desc }}
          </h2>
          <van-row>
            <van-radio-group
              v-model="testAnswerOption[index].new_question_options_id"
              :disabled="isSubmit"
            >
              <van-col
                class="question-answer"
                :span="24"
                v-for="option in item.ElearningOptions"
              >
                <van-radio :name="option.Id">
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
              v-model="testAnswerOption[index].selectData"
              :disabled="isSubmit"
            >
              <van-col
                class="question-answer"
                :span="24"
                v-for="option in item.ElearningOptions"
              >
                <van-checkbox :name="option.Id" shape="square">
                  {{ option.new_option_desc }}
                </van-checkbox>
              </van-col>
            </van-checkbox-group>
            <!-- <van-radio-group v-model="testAnswerOption[index].selectData">
              <van-col
                class="question-answer"
                :span="24"
                v-for="option in item.ElearningOptions"
              >
                <van-radio :name="option.Id">
                  {{ option.new_option_desc }}
                </van-radio>
              </van-col>
            </van-radio-group> -->
          </van-row>
        </div>
        <div v-if="item.new_question_type == 3">
          <h2 class="card-title">
            {{ item.new_question_desc }}
          </h2>
          <van-row>
            <!-- <span>{{ testAnswerOption[index] }}</span> -->
            <van-radio-group
              v-model="testAnswerOption[index].new_question_options_id"
              :disabled="isSubmit"
            >
              <van-col
                class="question-answer"
                :span="24"
                v-for="(option, i) in item.ElearningOptions"
                v-show="i < 2"
              >
                <van-radio :name="option.Id">
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
              v-model="testAnswerOption[index].new_comments_answer"
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
    <div>
      <div class="tab-bar">
        <van-tabbar route>
          <van-button
            block
            square
            type="info"
            color="#407FDC"
            @click="onClick_submit"
            :disabled="isSubmitButton"
            >{{ $t("pmt.submitButton") }}</van-button
          >
          <van-button
            block
            square
            type="info"
            color="#2058AB"
            @click="onClick_cancel"
            >{{ $t("pmt.cancelButton") }}</van-button
          >
        </van-tabbar>
      </div>
      <!-- <van-row class="body-row" style="">
        <van-col span="12">
          <van-button
            block
            square
            type="info"
            color="#407FDC"
            @click="onClick_submit"
            :disabled="isSubmitButton"
            >{{ $t("pmt.submitButton") }}</van-button
          >
        </van-col>
        <van-col span="12">
          <van-button
            block
            square
            type="info"
            color="#2058AB"
            @click="onClick_cancel"
            >{{ $t("pmt.cancelButton") }}</van-button
          >
        </van-col>
      </van-row> -->
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {
  postElearningCourseFavorite,
  postQuestionPage,
  postAddTestRecord,
} from "@/api/eLearning";
import { postUserPermission } from "@/api/user";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";

export default {
  name: "testDetail",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.test.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",

      selectTestId: "",

      testQuestionOption: [],
      testAnswerOption: [],

      testTime: 10 * 1000 * 60,

      isSubmit: false,
      isSubmitButton: false,

      isTest: false,
    };
  },
  created() {
    this.selectTestId = this.$route.query.selectTestId;
    this.isTest = JSON.parse(this.$route.query.isTest);
    this.getTestData();
  },
  methods: {
    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickLeft() {
      debugger;
      this.$router.go(-1);
    },
    onClick_cancel() {
      this.$router.go(-1);
    },

    getTestData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var parmas = {
        new_test_id: this.selectTestId,
        is_record: true,
      };
      postQuestionPage(parmas)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            if (data.testQuestion.Items.length == 0) return false;
            if (this.isTest) {
              this.testAnswerOption = [];
              this.testQuestionOption = data.testQuestion.Items;
              this.testQuestionOption.forEach((element) => {
                var answerOption = {
                  new_question_type: element.new_question_type,
                  new_test_id: this.selectTestId,
                  new_test_question_id: element.Id,
                  new_question_options_id: "",
                  selectData: [],
                  new_comments_answer: "",
                };
                this.testAnswerOption.push(answerOption);
              });
              
              if (data.test.new_test_time != null) {
                this.testTime = parseInt(data.test.new_test_time) * 1000 * 60;
              }
            } else {
              this.isSubmit = true;
              this.isSubmitButton = true;
              this.testAnswerOption = [];
              this.testQuestionOption = data.testQuestion.Items;

              this.testQuestionOption.forEach((element) => {
                var answerOption = {
                  new_question_type: element.new_question_type,
                  new_test_id: this.selectTestId,
                  new_test_question_id: element.Id,
                  new_question_options_id: "",
                  selectData: [],
                  new_comments_answer: "",
                };
                switch (element.new_question_type) {
                  case 1:
                    element.ElearningOptions.forEach((item) => {
                      if (item.is_user_select) {
                        answerOption.new_question_options_id = item.Id;
                      }
                    });
                    break;
                  case 2:
                    element.ElearningOptions.forEach((item) => {
                      if (item.is_user_select) {
                        answerOption.selectData.push(item.Id);
                      }
                    });
                    break;
                  case 3:
                    element.ElearningOptions.forEach((item) => {
                      if (item.is_user_select) {
                        answerOption.new_question_options_id = item.Id;
                      }
                    });
                    break;
                  case 4:
                    answerOption.new_comments_answer =
                      element.new_comments_answer;
                    break;
                }

                this.testAnswerOption.push(answerOption);
              });
              this.testTime = parseInt(data.test.new_test_time) * 1000 * 60;
            }

            // this.testTime = 1 * 1000 * 60;

            this.$toast.success(res.message);
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((error) => {
          this.testAnswerOption = [];
          this.testQuestionOption = [];
          this.$toast.fail(error.message);
        })
        .finally(() => {
          // this.handleHideLoading();
        });
    },

    onClick_submit() {
      setTimeout(() => {
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
      }, 200);
    },

    submitData() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      var data = [];
      this.testAnswerOption.forEach((element) => {
        if (element.new_question_type == 2) {
          element.selectData.forEach((item) => {
            var option = {
              new_question_type: element.new_question_type,
              new_test_id: this.selectTestId,
              new_test_question_id: element.new_test_question_id,
              new_question_options_id: item,
            };
            data.push(option);
          });
        } else {
          data.push(element);
        }
      });
      postAddTestRecord(data)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.isSubmit = true;
            this.isSubmitButton = true;
            this.$toast.success(res.message);
            this.onClick_cancel();
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

    timeFinish() {
      this.isSubmit = true;
      this.submitData();
    },
  },
  beforeRouteLeave(to, from, next) {
    console.log(this.isTest);
    if (this.isTest) {
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
.testTime {
  font-size: 0.6rem;
  line-height: inherit;
  padding: 0.14rem;
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
