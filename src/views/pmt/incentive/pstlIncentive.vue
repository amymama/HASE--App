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

          <van-field
            v-model="formData.totalincentive"
            readonly
            :label="this.$t('pmt.incentive.totalIncentive')"
            input-align="right"
            label-width="120px"
            :colon="true"
          />
        </div>

        <div>
          <div class="form-group">
            <van-field
              class="card-title"
              :label="this.$t('pmt.incentive.TotalKPIIncentive')"
              input-align="left"
              label-class="card-lable"
              label-width="auto"
              :colon="true"
            >
              <template #input>
                <span v-text="formData.totalkpiincentive"></span>
              </template>
            </van-field>
          </div>

          <div class="info">
            <div class="form-group">
              <van-row class="" style="padding-left: 15px">
                <van-col span="2" style="padding-top: 10px">
                  <b class="serial-number">1</b>
                </van-col>
                <van-col span="22">
                  <van-field
                    :label="this.$t('pmt.incentive.totalSelloutTarget')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="AddUnit(formData.items[0].target)"></span>
                      <!-- <span v-text="formData.totalkpiincentive"></span> -->
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[0].slablist"
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
                      <span v-text="formData.items[0].mtd"></span>
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
                        v-text="formData.items[0].estimatedincentive"
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
                <van-col span="2" style="padding-top: 10px">
                  <b class="serial-number">2</b>
                </van-col>
                <van-col span="22">
                  <van-field
                    :label="this.$t('pmt.incentive.KeyModelSalesTarget')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="AddUnit(formData.items[1].target)"></span>
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[1].slablist"
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
                    :label="this.$t('pmt.incentive.ActualKeyModelTotal')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[1].mtd"></span>
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
                        v-text="formData.items[1].estimatedincentive"
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
                <van-col span="2" style="padding-top: 10px">
                  <b class="serial-number">3</b>
                </van-col>
                <van-col span="22">
                  <van-field
                    :label="this.$t('pmt.incentive.ShopVisitCoverageTarget')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[2].target"></span>
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[2].slablist"
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
                    :label="this.$t('pmt.incentive.ActualShopVisit')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[2].mtd"></span>
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
                        v-text="formData.items[2].estimatedincentive"
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
                <van-col span="2" style="padding-top: 10px">
                  <b class="serial-number">4</b>
                </van-col>
                <van-col span="22">
                  <van-field
                    :label="this.$t('pmt.incentive.DisplayShare')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span></span>
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[3].slablist"
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
                    :label="this.$t('pmt.incentive.ActualDisplayShare')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[3].mtd"></span>
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
                        v-text="formData.items[3].estimatedincentive"
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
                <van-col span="2" style="padding-top: 10px">
                  <b class="serial-number">5</b>
                </van-col>
                <van-col span="22">
                  <van-field
                    :label="this.$t('pmt.incentive.TrainingNewPSTraining')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span></span>
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[4].slablist"
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
                    :label="this.$t('pmt.incentive.ActualNewPSTraining')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span></span>
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
                        v-text="formData.items[4].estimatedincentive"
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
                <van-col span="2" style="padding-top: 10px">
                  <b class="serial-number">6</b>
                </van-col>
                <van-col span="22">
                  <van-field
                    :label="this.$t('pmt.incentive.TrainingPSTrainingClass')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span></span>
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[5].slablist"
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
                    :label="this.$t('pmt.incentive.ActualPSTrainingClass')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[5].mtd"></span>
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
                        v-text="formData.items[5].estimatedincentive"
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
                <van-col span="2" style="padding-top: 10px">
                  <b class="serial-number">7</b>
                </van-col>
                <van-col span="22">
                  <van-field
                    :label="this.$t('pmt.incentive.TrainingSPTrainingClass')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span></span>
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[6].slablist"
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
                    :label="this.$t('pmt.incentive.ActualSPTrainingClass')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[6].mtd"></span>
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
                        v-text="formData.items[6].estimatedincentive"
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
                <van-col span="2" style="padding-top: 10px">
                  <b class="serial-number">8</b>
                </van-col>
                <van-col span="22">
                  <van-field
                    :label="this.$t('pmt.incentive.RecruitingBaseCity')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span></span>
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[7].slablist"
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
                    :label="this.$t('pmt.incentive.ActualRecruitingBaseCity')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[7].mtd"></span>
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
                        v-text="formData.items[6].estimatedincentive"
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
                <van-col span="2" style="padding-top: 10px">
                  <b class="serial-number">9</b>
                </van-col>
                <van-col span="22">
                  <van-field
                    :label="this.$t('pmt.incentive.RecruitingOtherProvince')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span></span>
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[8].slablist"
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
                    :label="
                      this.$t('pmt.incentive.ActualRecruitingOtherProvince')
                    "
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[8].mtd"></span>
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
                        v-text="formData.items[8].estimatedincentive"
                      ></span>
                    </template>
                  </van-field>
                </van-col>
              </van-row>
            </div>
          </div>

          <div class="info">
            <div class="form-group">
              <van-field
                class="card-title"
                :label="this.$t('pmt.incentive.TotalHotModelIncentive')"
                input-align="left"
                label-class="card-lable"
                label-width="auto"
                :colon="true"
              >
                <template #input>
                  <span v-text="formData.totalkpiincentive"></span>
                </template>
              </van-field>
            </div>
            <div class="form-group">
              <van-row class="body-row" style="padding-left: 15px">
                <van-col span="24">
                  <van-field
                    :label="this.$t('pmt.incentive.HotModelQuantityTarget')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[9].target"></span>
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
                        this.$t("pmt.incentive.totalListIncentive")+'('+this.$t("pmt.unit")+")"
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
                        v-for="(item, index) in formData.items[9].slablist"
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
                    :label="this.$t('pmt.incentive.ActualHotModelQuantity')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span v-text="formData.items[9].estimatedincentive"></span>
                    </template>
                  </van-field>
                </van-col>
                <van-col span="24">
                  <van-field
                    label-class="actual-Incentive"
                    :label="this.$t('pmt.incentive.totalActualIncentive')"
                    input-align="left"
                    label-width="auto"
                    :colon="true"
                  >
                    <template #input>
                      <span
                        class="actual-Incentive"
                        v-text="formData.items[9].estimatedincentive"
                      ></span>
                    </template>
                  </van-field>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </div>
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
import { getPmt, getTl, getMd, getpstl } from "@/api/myIncentive";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";
export default {
  name: "pstlIncentive",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.incentive.PSTLIncentive"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
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

      formData: {
        totalincentive: "0",
        totalkpiincentive: "0",
        items: [
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
          {
            targettype: "",
            target: "0",
            mtd: "0 (0%)",
            estimatedincentive: "0",
            slablist: [],
          },
        ],
      },
    };
  },
  created() {
    this.getSelectData();
    this.getList();

    this.type = this.$store.state.position_code;

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
      this.selectDate = value.getFullYear() + "-" + this.formatNumber(value.getMonth() + 1);
      if (value.getTime() > this.maxDate.getTime()) {
        this.selectDate = this.maxDate.getFullYear() + '-01'
        value = new Date(this.maxDate.getFullYear(), 0)
      }
      var params = {
        year: value.getFullYear(),
        month: this.formatNumber(value.getMonth()),
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      getpstl(params)
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
            // this.formData = res.data;
            this.formData.month = res.data.month;
            this.formData.totalincentive = res.data.totalincentive;
            this.formData.totalkpiincentive = res.data.totalkpiincentive;
            console.log(res.data.items)
            if (res.data.items != null) {
              this.formData.items = res.data.items;
            }
            console.log(this.formData.items)
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
      this.minDate = new Date(nowDateLocation.year - 2, nowDateLocation.month);
      this.maxDate = new Date(nowDateLocation.year, nowDateLocation.month);
      this.onConfirm_Date(nowDate);
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
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
    .info {
      background: #f5f5f5;
    }
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
