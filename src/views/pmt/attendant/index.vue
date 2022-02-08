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
    <van-form class="gift-form">
      <div class="attendant">
        <div class="form-group">
          <van-field
            :label="this.$t('pmt.attendant.LastCheckIn/Out')"
            input-align="left"
            label-width="3.7rem"
            :colon="true"
            label-class="lable-title"
          >
            <template #input>
              <span v-text="lastCheckDate"></span>
            </template>
          </van-field>
          <van-field
            :label="this.$t('pmt.attendant.at')"
            input-align="left"
            label-width="3.7rem"
            :colon="true"
            label-class="lable-title"
          >
            <template #input>
              <span v-text="shopAddress"></span>
            </template>
          </van-field>
          <van-row class="body-row" style="">
            <van-col span="18" class="check" style="pading: 10px">
              <van-button
                block
                type="info"
                @click="onButton_CheckIn"
                :disabled="
                  !(this.willchecktype == 1) || this.willchecktype == 3
                "
                >{{ this.$t("pmt.attendant.buttonCheckIn") }}</van-button
              >
            </van-col>
            <van-col span="6" class="check" style="pading: 10px">
              <upload-imgs
                ref="checkIn"
                folder="attendant"
                :max="1"
                :fileList="checkInPhotoList"
                :isTakePhoto="true"
                :showUploader="false"
                @fileUploadOk="handleCheckInFileUploadOk"
              />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="18" class="check" style="pading: 10px">
              <van-button
                block
                type="info"
                @click="onButton_CheckOut"
                :disabled="
                  !(this.willchecktype == 2) || this.willchecktype == 3
                "
                >{{ this.$t("pmt.attendant.buttonCheckOut") }}</van-button
              >
            </van-col>
            <van-col span="6" class="check" style="pading: 10px">
              <upload-imgs
                ref="checkOut"
                folder="attendant"
                :max="1"
                :fileList="checkOutPhotoList"
                :isTakePhoto="true"
                :showUploader="false"
                @fileUploadOk="handleCheckOutFileUploadOk"
              />
            </van-col>
          </van-row>
        </div>
        <div class="form-group">
          <van-row class="attendant-body-row">
            <van-col
              span="24"
              style="
                border-left: 1px solid #dedede;
                border-top: 1px solid #dedede;
              "
            >
              <van-row style="text-align: center" type="flex">
                <van-col span="4" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listName") }}</span>
                </van-col>
                <van-col span="4" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listDate") }}</span>
                </van-col>
                <van-col span="4" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listLeaveFrom") }}</span>
                </van-col>
                <van-col span="3" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listAbsentTime") }}</span>
                </van-col>
                <van-col span="5" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listAppliedDate") }}</span>
                </van-col>
                <van-col span="4" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listStatus") }}</span>
                </van-col>
              </van-row>
              <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div
                  class="item"
                  v-for="(item, index) in applyAbsenceList"
                  :key="index"
                >
                  <!-- ITEM BEGIN -->
                  <van-row type="flex">
                    <van-col span="4" class="list-body">
                      <span>{{ item.name }}</span>
                    </van-col>
                    <van-col span="4" class="list-body">
                      <span>{{ formatterData(item.date) }}</span>
                    </van-col>
                    <van-col span="4" class="list-body">
                      <span>{{ item.leavefrom }}</span>
                    </van-col>
                    <van-col span="3" class="list-body">
                      <span>{{ item.absencetime }}</span>
                    </van-col>
                    <van-col span="5" class="list-body">
                      <span>{{ item.applieddate }}</span>
                    </van-col>
                    <van-col span="4" class="list-body">
                      <span>{{ item.status }}</span>
                    </van-col>
                  </van-row>

                  <!-- ITEM END -->
                </div>
              </van-list>
              <!-- </van-pull-refresh> -->
            </van-col>
            <van-col class="form-group applyAbsenceMessage">
              <p>{{ this.$t("pmt.attendant.applyAbsenceMessage") }}</p>
            </van-col>
            <van-col span="24">
              <van-button
                block
                type="primary"
                v-action:attendantButton:ApplyAbsence
                :to="'/pmt/applyAbsence?lng=' + userlongitude + '&lat=' + userlatitude"
                >{{ this.$t("pmt.attendant.buttonApplyAbsence") }}</van-button
              >
            </van-col>
          </van-row>
        </div>
        <div class="form-group">
          <van-row class="attendant-body-row">
            <van-col
              span="24"
              style="
                border-left: 1px solid #dedede;
                border-top: 1px solid #dedede;
              "
            >
              <van-row style="text-align: center" type="flex">
                <van-col span="4" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listName") }}</span>
                </van-col>
                <van-col span="5" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listDate") }}</span>
                </van-col>
                <van-col span="5" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listOverTime") }}</span>
                </van-col>
                <van-col span="5" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listAppliedDate") }}</span>
                </van-col>
                <van-col span="5" class="list-head">
                  <span>{{ this.$t("pmt.attendant.listStatus") }}</span>
                </van-col>
              </van-row>
              <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div
                  class="item"
                  v-for="(item, index) in applyOverTimeList"
                  :key="index"
                >
                  <!-- ITEM BEGIN -->
                  <van-row type="flex">
                    <van-col span="4" class="list-body">
                      <span>{{ item.name }}</span>
                    </van-col>
                    <van-col span="5" class="list-body">
                      <span>{{ formatterData(item.date) }}</span>
                    </van-col>
                    <van-col span="5" class="list-body">
                      <span>{{ item.overtime }}</span>
                    </van-col>
                    <van-col span="5" class="list-body">
                      <span>{{ item.applieddate }}</span>
                    </van-col>
                    <van-col span="5" class="list-body">
                      <span>{{ item.status }}</span>
                    </van-col>
                  </van-row>

                  <!-- ITEM END -->
                </div>
              </van-list>
              <!-- </van-pull-refresh> -->
            </van-col>
            <van-col class="form-group applyAbsenceMessage">
              <p>{{ this.$t("pmt.attendant.footTitleOverTime") }}</p>
            </van-col>
            <van-col span="24">
              <van-button
                block
                v-action:attendantButton:ApplyOvertime
                type="primary"
                :to="'/pmt/applyOvertime?lng=' + userlongitude + '&lat=' + userlatitude"
                >{{ this.$t("pmt.attendant.buttonApplyOvertime") }}</van-button
              >
            </van-col>
          </van-row>
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

    <van-dialog
      v-model="showCheckInModel"
      :title="this.$t('pmt.attendant.dialogTitle')"
      show-cancel-button
      show-confirm-button
      :confirmButtonText="this.$t('pmt.confirmButton')"
      confirm-button-color="#407FDC"
      :cancelButtonText="this.$t('pmt.cancelButton')"
      cancel-button-color="#2058AB"
      @confirm="onWorkShift_Confirm"
    >
      <van-form class="">
        <div class="form-group">
          <van-field
            v-model="selectShopName"
            is-link
            readonly
            :label="this.$t('pmt.giftRegistration.ShopLable')"
            @click="showShopPicker = true"
            input-align="right"
            label-width="120px"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.attendant.shopErrorMessage'),
              },
            ]"
          />
        </div>
      </van-form>
    </van-dialog>
    <van-popup v-model="showWorkShiftPicker" position="bottom" round>
      <van-picker
        show-toolbar
        :columns="selectWorkShiftOption"
        @cancel="showWorkShiftPicker = false"
        @confirm="onConfirm_WorkShift"
        value-key="text"
        :confirm-button-text="this.$t('pmt.confirmButton')"
        :cancel-button-text="this.$t('pmt.cancelButton')"
      />
    </van-popup>
    <van-popup v-model="showShopPicker" position="bottom" round>
      <van-search
        v-model="searchShopKey"
        :placeholder="this.$t('home.policy.searchTitle')"
        @search="changeShopKey"
      />
      <van-picker
        show-toolbar
        :columns="selectShopOption"
        @cancel="showShopPicker = false"
        @confirm="onConfirm_Shop"
        value-key="shopname"
        :confirm-button-text="this.$t('pmt.confirmButton')"
        :cancel-button-text="this.$t('pmt.cancelButton')"
      />
    </van-popup>
    <div
      v-show="false"
      style="float: left; width: 600px; height: 500px; border: 1px solid gray"
      id="container"
    ></div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { getPmt, getTl, getMd, getMhModellist } from "@/api/myIncentive";
import {
  getLastCheckInfo,
  postApplyAbsence,
  postCheck,
  getShopInfo,
  getTableListAbsence,
  getovertimelist,
} from "@/api/attendant";
import UploadImgs from "@/components/UploadImgs";
import { getPmtSelectData } from "@/api/common";
import { postUserPermission, getUserinfoByToken } from "@/api/user";
//创建地图
var map = new BMap.Map("allmap");

export default {
  name: "attendant",
  components: {
    TopBar,
    UploadImgs,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.attendant.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      // topBarRightHtml: '<i class="van-icon van-icon-search"></i>',
      topBarRightHtml: "",

      loading: false,
      finished: false,
      refreshing: false,

      selectShopId: "",
      selectShopName: "",
      selectShopLng: "",
      selectShopLat: "",

      isCheckIn: true,
      showCheckInModel: false,
      showWorkShiftPicker: false,
      showShopPicker: false,

      position_code: "",
      //0:没有checkIn ； 1 checkIn ；2 checkOut
      checktype: 0,
      willchecktype: 1,
      lastCheckDate: "",
      shopAddress: "",

      userlongitude: 0,
      userlatitude: 0,

      mhModellList: [],
      selectonWorkShiftId: 0,
      selectWorkShiftName: "",
      selectWorkShiftOption: [
        {
          Id: 1,
          text: "Morning Shift",
        },
        {
          Id: 2,
          text: "Middle Shift",
        },
        {
          Id: 3,
          text: "Afternoon Shift",
        },
      ],
      selectShopOption: [],
      applyAbsenceList: [{}, {}, {}],
      checkInPhotoList: [],
      checkOutPhotoList: [],

      applyOverTimeList: [],
      longitude: 0,
      latitude: 0,
      searchShopKey:''
    };
  },
  created() {
    this.selectShopId = this.$store.state.selectShopId;
    this.getList();
    this.getUserInfo();
    // this.test();

    let promise = this.promiseGetCity()
    promise
      .then(this.promiseGetShopInfoByAdress)
      .then(this.promiseGetData)
      .then(() => {});
  },
  methods: {
    topBarClickLeft() {
      this.$router.go(-1);
    },

    // hide loading
    handleHideLoading() {
      this.$toast.clear();
    },

    topBarClickRight() {
      console.log("click right");
    },
    getShopInfoByAdress() {
      var params = {
        longitude: this.longitude,
        latitude: this.latitude,
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      getShopInfo(params)
        .then((res) => {
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var data = res.data;
            // this.checktype = data.checktype;
            // this.lastCheckDate = data.checktime;
            this.shopAddress = data[0].shopname;
            this.handleHideLoading();
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    getData() {
      this.checktype = 0;
      this.lastCheckDate = "";
      // this.shopAddress = "";
      var params = {
        shopId: this.selectShopId,
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      getLastCheckInfo(params)
        .then((res) => {
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var data = res.data;
            this.checktype = data.checktype;
            this.lastCheckDate = data.checktime;
            this.shopAddress = data.address;
            this.handleHideLoading();
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },
    onCancel() {
      this.$router.go(-1);
    },
    onLoad() {
      this.getList();
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.loading = true;
      this.page = 1;
      this.onLoad();
    },
    getList() {
      this.applyAbsenceList = [];
      this.$toast.loading({ duration: 0, forbidClick: true });
      getTableListAbsence()
        .then((res) => {
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var data = res.data;
            this.applyAbsenceList = data.Items;
            this.finished = true;
            this.loading = false;
            this.handleHideLoading();
            // resolve();
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
          // reject();
        })
        .finally(() => {
          this.finished = true;
        });

      this.applyOverTimeList = [];
      this.$toast.loading({ duration: 0, forbidClick: true });
      getovertimelist()
        .then((res) => {
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              return;
            }
            var data = res.data;
            this.applyOverTimeList = data.Items;
            this.finished = true;
            this.loading = false;
            this.handleHideLoading();
            // resolve();
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
          // reject();
        })
        .finally(() => {
          this.finished = true;
        });
    },
    onButton_Ok() {
      this.$router.go(-1);
    },

    onButton_CheckIn() {
      this.isCheckIn = true;
      this.selectonWorkShiftId = 0;
      this.selectWorkShiftName = "";
      // if (this.position_code == "PMT") {
      //   this.selectShopId = "";
      //   this.selectShopName = "";
      //   this.showCheckInModel = true;
      // } else {
      //   this.$refs.checkIn.handleSlectImg();
      // }
      // this.selectShopId = "";
      // this.selectShopName = "";
      this.showCheckInModel = true;
    },

    onButton_CheckOut() {
      const that = this
      this.isCheckIn = false;
      // this.$refs.checkOut.handleSlectImg();
      if (this.selectShopId == 0 || this.selectShopId == undefined)
        return false;
      // this.getCity();
      //测试注释
      this.checkLocationAdress().then((result) => {
        if (result) {
          that.$refs.checkOut.handleSlectImg();
        } else {
          that.$toast.fail(this.$t("pmt.attendant.checkInErrorMessage"));
        }
      })
    },

    onConfirm_WorkShift(value) {
      this.selectonWorkShiftId = value.Id;
      this.selectWorkShiftName = value.text;
      this.showWorkShiftPicker = false;
    },

    onConfirm_Shop(value) {
      if (value == undefined) {
        this.showShopPicker = false;
        return false;
      }
      this.selectShopId = value.shopid;
      this.selectShopName = value.shopname;
      this.selectShopLng = value.longitude;
      this.selectShopLat = value.latiude;
      this.selectShoplongitude = value.longitude; //返回店铺的经纬度
      this.selectShoplatiude = value.latiude;
      this.selectShopDistance = value.distance;
      this.showShopPicker = false;
    },
    onWorkShift_Confirm() {
      if (this.selectShopId == 0 || this.selectShopId == undefined)
        return false;
      // this.getCity();
      const that = this
      this.checkLocationAdress().then((result) => {
        console.log(result)
        if (result) {
          that.$refs.checkIn.handleSlectImg();
        } else {
          that.$toast.fail(`Your location ${that.userlongitude + ',' + that.userlatitude} is ${that.selectShopDistance}m from Shop(${that.selectShopName}) location ${that.selectShoplongitude + ',' + that.selectShoplatiude}`);
        }
      })
    },

    // Upload img
    handleCheckInFileUploadOk(file) {
      this.checkInPhotoList = [];
      this.checkInPhotoList.push({
        new_download_url: file.url,
        new_keyword: "Check In",
        new_description: "Check In",
        new_type: 1,
        new_filename: file.name,
        new_filesize: 0,
      });
      //地点定位 测试是注释
      // var result = true;
      console.log("handleCheckInFileUploadOk");
      const that = this
      this.checkLocationAdress().then((result) => {
        if (result) {
          that.check();
        } else {
          that.$toast.fail(`Your location ${that.userlongitude + ',' + that.userlatitude} is ${that.selectShopDistance}m from Shop(${that.selectShopName}) location ${that.selectShoplongitude + ',' + that.selectShoplatiude}`);
        }
      })
    },

    // Upload img
    handleCheckOutFileUploadOk(file) {
      this.checkOutPhotoList = [];
      this.checkOutPhotoList.push({
        new_download_url: file.url,
        new_keyword: "Check Out",
        new_description: "Check Out",
        new_type: 1,
        new_filename: file.name,
        new_filesize: 0,
      });
      //地点定位 测试时注释
      // var result = this.checkLocationAdress();
      const that = this
      this.checkLocationAdress().then((result) => {
        if (result) {
          that.check();
        } else {
          that.$toast.fail(`Your location ${that.userlongitude + ',' + that.userlatitude} is ${that.selectShopDistance}m from Shop(${that.selectShopName}) location ${that.selectShoplongitude + ',' + that.selectShoplatiude}`);
        }
      })
    },

    // Delete img
    handleFileDelete(dindex) {
      // var index = Number(this.active);
      this.checkInPhotoList.splice(dindex, 1);
    },

    //获取用户当前位置
    promiseGetCity() {
      let _this = this;
      const COORDINATES_WGS84 = 1
      const COORDINATES_BD09 = 5
      return new Promise((resolve, reject) => {
        plus.geolocation.getCurrentPosition(function(location){
          // _this.userlongitude = location.coords.longitude;
          // _this.userlatitude = location.coords.latitude;
          // console.log('Geolocation\nLatitude:' + location.coords.latitude + '\nLongitude:' + location.coords.longitude)
          // resolve()
          const point = new BMap.Point(location.coords.longitude,location.coords.latitude);
          const convertor = new BMap.Convertor();
          convertor.translate([point], COORDINATES_WGS84, COORDINATES_BD09, (data) => {
            console.log(JSON.stringify(data))
            if(data.status === 0) {
              let point = data.points[0]
              _this.userlongitude = point.lng;
              _this.userlatitude = point.lat;
              console.log('Geolocation\nLatitude:' + point.lat + '\nLongitude:' + point.lng)
              resolve()
            } else {
              _this.$toast.fail('Location information is unavailable.');
            }
          })
        }, function(e){
          window.plus.nativeUI.toast('Please open the GPS!')
          reject()
          console.log('Geolocation error: ' + e.message)
        }, {
          provider: 'system',
          // provider: 'baidu',
          // coordsType: 'bd09ll',
          enableHighAccuracy: true
        });
      })
    },

    promiseGetShopInfoByAdress(resolve, reject) {
      console.log("promiseGetShopInfoByAdress");
      var params = {
        longitude: this.userlongitude,
        // longitude: "107.244134872876",
        latitude: this.userlatitude,
        // latitude: "10.6478808048137",
      };
      console.log("longitude", this.userlongitude);
      console.log("latitude", this.userlatitude);
      return getShopInfo(params)
        .then((res) => {
          if (res.success) {
            console.log("message", res.data);
          } else {
            console.log("message", res.message);
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              console.log(" res.data ==");
              return;
            }
            var data = res.data;
            this.baseShopOption = data;
            this.selectShopOption = data;
            console.log(JSON.stringify(data))
            // if (this.selectShopId == "") {
            this.selectShopId = data[0].shopid;
            // this.shopAddress = data[0].shopname;
            this.selectShopName = data[0].shopname;
            this.selectShoplongitude = data[0].longitude; //返回店铺的经纬度
            this.selectShoplatiude = data[0].latiude;
            this.selectShopDistance = data[0].distance;
            this.handleHideLoading();
            // resolve();
          } catch (e) {
            this.$toast.fail(e.message);
            // reject();
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
          // reject();
        })
        .finally(() => {});
    },

    promiseGetData(resolve, reject) {
      console.log(" start  promiseGetData");
      this.checktype = 0;
      this.lastCheckDate = "";
      // this.shopAddress = "";
      var params = {
        shopId: this.selectShopId,
      };
      console.log(" shopId:", this.selectShopId);
      this.$toast.loading({ duration: 0, forbidClick: true });
      getLastCheckInfo(params)
        .then((res) => {
          console.log(6);
          if (res.success) {
            this.$toast.success(res.message);
          } else {
            this.$toast.fail(res.message);
            return;
          }
          // try {
          if (res.data == "") {
            return;
          }
          var data = res.data;
          console.log(JSON.stringify(data))
          this.checktype = data.checktype;
          if (data.willchecktype == 0) {
            this.willchecktype = 1;
          } else {
            this.willchecktype = data.willchecktype;
          }
          this.shopAddress = data.shopname;
          this.lastCheckDate = data.checktime;
          this.checkInPhotoList = [];
          this.checkInPhotoList.push({
            new_download_url: data.imgurl,
            new_keyword: "Check In",
            new_description: "Check In",
            new_type: 1,
            new_filename: 'file',
            new_filesize: 0,
          });
          console.log("data.willchecktype:", data.willchecktype);

          console.log("this.willchecktype:", this.willchecktype);
          this.handleHideLoading();
          // resolve();
        })
        .catch((e) => {
          this.$toast.fail(e.message);
          // reject();
        })
        .finally(() => {});
    },

    getUserInfo() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getUserinfoByToken()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { user_position } = data.Items;
            this.position_code = user_position[0].position_code;
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

    check() {
      console.log("check");
      let checkInPhotoList = this.checkInPhotoList,
          checkOutPhotoList = this.checkOutPhotoList,
          ImgUrl = ''
      if (this.isCheckIn) {
        ImgUrl = checkInPhotoList[0].new_download_url
      } else {
        ImgUrl = checkOutPhotoList[0].new_download_url
      }
      var data = {
        ShopId: this.selectShopId,
        WorkShift: this.selectonWorkShiftId,
        ImgUrl,
        //测试数据固定
        // ImgUrl:
        //   "https://d2gmuflv362wio.cloudfront.net/AEV/UAT/PMTIMG/20211102042817610.jpg",
        Longitude: this.userlongitude,
        Latitude: this.userlatitude,
      };
      console.log("data:", JSON.stringify(data));

      postCheck(data)
        .then((res) => {
          console.log(res.success);
          if (res.success) {
            this.promiseGetData(
              () => {},
              () => {}
            );
            console.log("postCheck");
            this.handleHideLoading();
          } else {
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {
          this.finished = true;
        });
    },

    loadMap() {
      var map = new BMap.Map("container");
      console.log('selectShoplongitude=============='+this.selectShoplongitude)
      console.log('selectShoplatiude=============='+this.selectShoplatiude)
      console.log('userlongitude=================='+this.userlongitude)
      console.log('userlatitude=================='+this.userlatitude)
      // var point = new BMap.Point(this.selectShopLng, this.selectShopLng);
      var point = new BMap.Point(
        this.selectShoplongitude,
        this.selectShoplatiude
      );

      // 创建圆
      var circle = new BMap.Circle(point, 700, {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 0.5,
      });
      map.addOverlay(circle);
      var pt = new BMap.Point(this.userlongitude, this.userlatitude);
      map.centerAndZoom(pt, 15);
      var result = BMapLib.GeoUtils.isPointInPolygon(pt, circle);
      return result;
    },

    //地点定位
    InOrOutPolygon() {
      let selectShopDistance = this.selectShopDistance
      if(selectShopDistance < 1000) {
        return true
      } else {
        return false
      }
      // var map = new BMap.Map("container");
      // console.log('selectShoplongitude=============='+this.selectShoplongitude)
      // console.log('selectShoplatiude=============='+this.selectShoplatiude)
      // console.log('userlongitude=================='+this.userlongitude)
      // console.log('userlatitude=================='+this.userlatitude)
      // // var point = new BMap.Point(this.selectShopLng, this.selectShopLng);
      // var point = new BMap.Point(
      //   this.selectShoplongitude,
      //   this.selectShoplatiude
      // );
      //
      // // 创建圆
      // var circle = new BMap.Circle(point, 700, {
      //   strokeColor: "blue",
      //   strokeWeight: 2,
      //   strokeOpacity: 0.5,
      // });
      // map.addOverlay(circle);
      // var pt = new BMap.Point(this.userlongitude, this.userlatitude);
      // map.centerAndZoom(pt, 15);
      // var result = BMapLib.GeoUtils.isPointInPolygon(pt, circle);
      // return result;
    },

    //check city
    checkLocationAdress() {
      const that = this
      return new Promise((resolve, reject) => {
        let result = that.InOrOutPolygon();
        resolve(result);
        // that.promiseGetCity().then(() => {
        //   let result = false;
        //   result = that.InOrOutPolygon();
        //   resolve(result);
        // });
      })
    },

    formatterData(dateStr) {
      let date = new Date(dateStr);
      return (
        parseInt(date.getMonth()) +
        1 +
        "/" +
        date.getDate() +
        "/" +
        date.getFullYear().toString().substr(2, 2)
      );
    },
    formatterLastDate(dateStr) {
      console.log("dateStr:", dateStr);
      let date = new Date(dateStr);
      return (
        parseInt(date.getMonth()) +
        1 +
        "/" +
        date.getDate() +
        "/" +
        date.getFullYear().toString() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
    //联想搜索
    changeShopKey() {
      this.selectShopOption = [];
      for (const i in this.baseShopOption) {
        if (
          this.baseShopOption[i].shopname
            .toLowerCase()
            .indexOf(this.searchShopKey.toLowerCase()) >= 0
        ) {
          this.selectShopOption.push(this.baseShopOption[i]);
        }
      }
    },

    // test() {
    //   var params = {
    //     longitude: '0',
    //     // longitude: "36.136087352063",
    //     latitude: '0',
    //     // latitude: "120.42341125944",
    //   };
    //   getShopInfo(params)
    //     .then((res) => {
    //       if (res.success) {
    //         console.log("message", res.data);
    //       } else {
    //         console.log("message", res.message);
    //         this.$toast.fail(res.message);
    //         return;
    //       }
    //       try {
    //         if (res.data == "") {
    //           console.log(" res.data ==");
    //           return;
    //         }
    //         var data = res.data;
    //         this.baseShopOption = data;
    //         this.selectShopOption = data;
    //         // if (this.selectShopId == "") {
    //         this.selectShopId = data[0].shopid;
    //         // this.shopAddress = data[0].shopname;
    //         this.selectShoplongitude = data[0].longitude; //返回店铺的经纬度
    //         this.selectShoplatiude = data[0].latiude;
    //         this.handleHideLoading();
    //         // resolve();
    //       } catch (e) {
    //         this.$toast.fail(e.message);
    //         // reject();
    //       }
    //     })
    //     .catch((e) => {
    //       this.$toast.fail(e.message);
    //       // reject();
    //     })
    //     .finally(() => {});
    // },
  },
};
</script>

<style lang="scss" scoped>
.attendant {
  padding-bottom: 20%;
  .form-group {
    margin: 12px;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
  }
  .lable-title {
    font-weight: bold;
  }
  .applyAbsenceMessage {
    color: red;
  }
}

.check {
  padding: 10px;
  height: 150px;
  .check-image {
    height: 100%;
  }
}

.van-field__error-message {
  float: right;
}

.card-lable {
  color: #fff;
}

.model-lable {
  padding-top: 20px;
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
.attendant-body-row {
  .list-head {
    background-color: #07c160;
    color: #fff;
    text-align: center;
    padding: 10px;
    // border: 0.1px solid #000;
    height: 80px;
    text-align: center;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
  }
}

.list-body {
  /* background: #2058ab; */
  /* color: #fff; */
  text-align: center;
  padding: 10px;
  // border: 0.1px solid #000;
  // display: -webkit-flex;
  align-items: center;
  justify-content: center;
  border-collapse: collapse;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
}

.body-row {
  padding: 5px;
}

.top-dropdown {
  border: 1px;
  border-style: dashed;
  width: 100%;
}

.van-dialog__header {
  text-align: left;
  padding: 15px;
  background-color: #2058ab;
  color: white;
}
</style>
<style>
</style>
