<template>
  <div class="salesForecastBox">
    <TopBar
      :topBarTitle="this.$t('pmt.salesForecast.title')"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    ></TopBar>
    <div class="date">{{ this.$t("pmt.salesForecast.date") }}:{{ dateOn }}</div>
    <div class="navBox">
      <div class="infog-card form-group">
        <h2 class="card-title">{{ this.$t("pmt.salesForecast.basicInfo") }}</h2>
        <van-field
          v-model="formData.shopName"
          is-link
          readonly
          :label="this.$t('pmt.salesForecast.shopName')"
          @click="showNamePicker = true"
          input-align="right"
          label-width="120px"
          :rules="[
            {
              required: true,
              message: this.$t('pmt.giftRegistration.GiftMessage'),
            },
          ]"
        />
        <van-popup v-model="showNamePicker" position="bottom" round>
          <van-picker
            show-toolbar
            :columns="shopNameOptions"
            @cancel="showNamePicker = false"
            @confirm="onConfirm_ShopName"
            value-key="text"
            :confirm-button-text="this.$t('pmt.confirmButton')"
            :cancel-button-text="this.$t('pmt.cancelButton')"
          />
        </van-popup>
        <van-field
          readonly
          v-model="formData.dealer"
          label-width="120px"
          :label="this.$t('pmt.salesForecast.dealer')"
        />
        <van-field
          readonly
          input-align="right"
          v-model="formData.submitterName"
          label-width="120px"
          :label="this.$t('pmt.salesForecast.submitterName')"
        />
        <van-field
          input-align="right"
          readonly
          v-model="formData.personnelType"
          label-width="120px"
          :label="this.$t('pmt.salesForecast.personnelType')"
        />
      </div>
    </div>
    <div class="navBox">
      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.salesForecast.forecastSummary") }}
        </h2>
        <van-field
          readonly
          input-align="right"
          v-model="formData.currentWeeksActual"
          label-width="140PX"
          :label="this.$t('pmt.salesForecast.currentWeeksActual')"
        />
        <van-field
          input-align="right"
          readonly
          v-model="formData.weekPeriod"
          label-width="140PX"
          :label="this.$t('pmt.salesForecast.weekPeriod')"
        />
        <van-field
          input-align="right"
          readonly
          v-model="totalSalesForecast"
          label-width="140PX"
          :label="this.$t('pmt.salesForecast.totalSalesForecast')"
        />
      </div>
    </div>
    <div class="navBox">
      <div class="infog-card form-group">
        <h2 class="card-title">
          {{ this.$t("pmt.salesForecast.modelList") }}
        </h2>
        <div class="buttonAdd">
          <van-button
            @click="showAddModel"
            style="background: #4d72ac"
            type="info"
            size="mini"
            >{{ this.$t("pmt.salesForecast.addModel") }}</van-button
          >
        </div>
        <div v-for="(item, i) in modelList" :key="i">
          <van-swipe-cell>
            <div>
              <van-field
                input-align="right"
                v-model="item.ModelName"
                label-width="140PX"
                :label="$t('pmt.salesForecast.modelName')"
              />
              <van-field
                name="stepper"
                :label="$t('pmt.giftRegistration.GiftQuantityLable')"
                input-align="right"
                label-width="120px"
              >
                <template #input>
                  <van-stepper v-model="item.ForecastQty" />
                </template>
              </van-field>
              <van-field
                input-align="right"
                type="number"
                v-model="item.ForecastPrice"
                label-width="140PX"
                :label="$t('pmt.salesForecast.unitPrice')"
              />

              <!--            <div class="modelPush"></div>-->
            </div>
            <template #left>
              <van-button
                square
                @click="deleteModelList(i)"
                :text="$t('pmt.retail.delete')"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <div class="bottombutton">
        <van-button
          style="background: #4d72ac"
          class="button"
          @click="
            () => {
              this.$throttle.throttle(onSubmit());
            }
          "
          type="info"
          >{{ this.$t("pmt.salesForecast.submit") }}</van-button
        >
        <van-button
          style="background: #4d72ac"
          class="button"
          @click="
            () => {
              this.$throttle.throttle(onCancel());
            }
          "
          type="info"
          >{{ this.$t("pmt.salesForecast.oncancelBotton") }}</van-button
        >
      </div>
    </div>
    <van-popup v-model="show">
      <TopBar
        :topBarTitle="this.$t('pmt.salesForecast.addModel')"
        :leftHtml="topBarHtml"
        :rightHtml="topBarRight"
        @set_onClickRight="onClose"
      ></TopBar>
      <div class="block">
        <van-form ref="addModelRef">
          <van-field
            v-model="formData.category"
            is-link
            readonly
            :label="this.$t('pmt.salesForecast.category')"
            @click="getaddsourcePicker = true"
            input-align="right"
            label-width="120px"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.salesForecast.selectCategory'),
              },
            ]"
          />
          <van-field
            v-model="formData.model"
            is-link
            readonly
            :label="this.$t('pmt.salesForecast.model')"
            @click="modelMoPicker = true"
            input-align="right"
            label-width="120px"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.salesForecast.selectModel'),
              },
            ]"
          />
          <van-field
            input-align="right"
            type="number"
            v-model="formData.quantity"
            label-width="120px"
            :label="this.$t('pmt.salesForecast.quantity')"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.salesForecast.inputQuantity'),
              },
            ]"
          />

          <van-field
            input-align="right"
            type="number"
            v-model="formData.unitPrice"
            label-width="120px"
            :label="$t('pmt.salesForecast.unitPrice')"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.salesForecast.UnitPrice'),
              },
            ]"
          />
          <div class="button" style="background: #4d72ac">
            <van-button
              style="background: #4d72ac; font-size: 22px"
              type="info"
              @click="submitAdd"
              class="button-item"
              >{{ this.$t("pmt.salesForecast.add") }}</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
    <!-- 选择Model -->
    <van-popup v-model="modelMoPicker" position="bottom" round>
      <van-search
        v-model="searchModelKey"
        :placeholder="this.$t('pmt.retail.filterOfModel')"
        @change="changeModelKey"
      />
      <van-picker
        show-toolbar
        :columns="modelFilteredOptions"
        @cancel="modelMoPicker = false"
        @confirm="modelMoConfirm"
        value-key="text"
        :confirm-button-text="this.$t('pmt.confirmButton')"
        :cancel-button-text="this.$t('pmt.cancelButton')"
      />
    </van-popup>
    <!-- 选择catoty -->
    <van-popup v-model="getaddsourcePicker" position="bottom" round>
      <van-picker
        show-toolbar
        :columns="getaddsourceOptions"
        @cancel="getaddsourcePicker = false"
        @confirm="getaddsourceConfirm"
        value-key="text"
        :confirm-button-text="this.$t('pmt.confirmButton')"
        :cancel-button-text="this.$t('pmt.cancelButton')"
      />
    </van-popup>
  </div>
</template>
<script>
import {
  salseforecastGetaddsource,
  salseforecastCreate,
  getsalesforecastinfo,
} from "@/api/stockCheck";
import TopBar from "@/components/TopBar";
export default {
  naem: "salesForecast",
  components: {
    TopBar,
  },
  computed: {
    totalSalesForecast: {
      get() {
        // console.log(this.modelList,'12111')
        let arr = this.modelList;
        let srr = [];
        arr.forEach((item) => {
          if (item.ForecastPrice !== "") {
            srr.push(
              Math.floor(
                parseInt(item.ForecastPrice) * parseInt(item.ForecastQty)
              )
            );
          }
        });
        let sum = srr.reduce(function (a, b) {
          return parseInt(a) + parseInt(b);
        }, 0);
        return sum;
      },
      set(value) {
        let sum = value;
      },
    },
    dateOn() {
      // 获取当前日期
      var nowDate = new Date();
      let date = {
        y: nowDate.getFullYear(),
        m: nowDate.getMonth() + 1,
        d: nowDate.getDate(),
      };
      return date.y + "-" + date.m + "-" + date.d;
    },
  },
  data() {
    return {
      loadingSubimt: false,
      searchModelKey: "",
      modelFilteredOptions: [],
      shoplist: [],
      modelList: [],
      getaddmodelOptions: [],
      getaddsourceOptions: [],
      getaddmodelOptionsCategoryid: [],
      quantity: "",
      modelMoPicker: false,
      getaddsourcePicker: false,
      show: false,
      showNamePicker: false,
      shopNameOptions: [], //下拉框数据
      formData: {
        unitPrice: "",
        quantity: "",
      },
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",
      topBarHtml: "",
      topBarRight: '<i class="van-icon van-icon-cross"></i>',
    };
  },
  created() {
    this.getData(); //下拉框数据
  },
  methods: {
    //删除ModelList删除不提交
    deleteModelList(i) {
      console.log(i, "i");
      if (this.modelList.length > 0) this.modelList.splice(i, 1);
    },
    showAddModel() {
      this.show = true;
      this.formData.category = "";
      this.formData.model = "";
      this.formData.quantity = "";
      this.formData.unitPrice = "";
    },
    //Cancel
    onCancel() {
      this.topBarClickLeft(); //点击取消返回上一页
    },
    //提交
    onSubmit() {
      if (this.modelList.length == 0) {
        this.$toast.fail(this.$t("pmt.competitorSales.inputNull"));
        return false;
      }
      // this.loadingSubimt = true;
      this.$toast.loading({ duration: 0, forbidClick: true });
      salseforecastCreate({
        ShopId: this.formData.shopName_id, //选择的shopid
        // ForecastPeriod: "string",//暂时不用传
        modelList: [...this.modelList],
      })
        .then((res) => {
          if (res.success === true) {
            this.$toast.success(res.message);
            setTimeout(() => {
              this.topBarClickLeft();
            }, 1000);
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch((error) => {
          this.$toast.fail(error.message);
        })
        .finally(() => {
          this.loadingSubimt = false;
        });
    },
    //新增modelList
    submitAdd() {
      this.$refs.addModelRef.validate().then(() => {
        let pushModel = {
          // this.formData.categoryId
          // this.formData.category
          ModelId: this.formData.modelId,
          ModelName: this.formData.model,
          ForecastQty: this.formData.quantity,
          ForecastPrice: this.formData.unitPrice,
        };
        this.modelList.push(pushModel);
        this.show = false;
      });
    },
    //选择框shopName确认键
    onConfirm_ShopName(value) {
      this.formData.shopName = value.text;
      this.formData.shopName_id = value.Id;
      this.shopList.forEach((item) => {
        if (this.formData.shopName_id == item.shopid) {
          this.formData.dealer = item.dealer; //根据SHOPName选择的改变
          // this.formData.submitterName=item.realname //???
        }
      });
      this.showNamePicker = false;
    },
    //选择框确认键Model category
    getaddsourceConfirm(value) {
       ;
      this.formData.model = "";
      this.formData.modelId = "";
      this.formData.categoryId = value.Id;
      this.formData.category = value.text;
      this.getaddsourcePicker = false;
      this.getaddmodelOptionsCategoryid = [];
      this.getaddmodelOptions.forEach((item) => {
        if (value.Id == item.categoryid) {
          this.getaddmodelOptionsCategoryid.push(item);
        }
      });
      this.changeModelKey();
    },
    //联想搜索
    changeModelKey() {
      //  ;
      this.modelFilteredOptions = [];
      for (const i in this.getaddmodelOptionsCategoryid) {
        if (
          this.getaddmodelOptionsCategoryid[i].text
            .toLowerCase()
            .indexOf(this.searchModelKey.toLowerCase()) >= 0
        ) {
          this.modelFilteredOptions.push(this.getaddmodelOptionsCategoryid[i]);
        }
      }
    },
    //选择model
    modelMoConfirm(value) {
      this.formData.model = value.text;
      this.formData.modelId = value.Id;
      console.log("选择model");
      this.modelMoPicker = false;
    },
    // 返回上一页
    topBarClickLeft() {
      this.$router.go(-1);
    },
    onClose() {
      this.show = false;
    },
    //获取数据
    getData() {
      // salseforecast Model 和 category下拉框数据
      salseforecastGetaddsource().then((res) => {
        console.log(res, "Storage Location");
        if (res.success === true) {
          this.getaddsourceOptions = [];
          this.getaddmodelOptions = [];
          const resShop = res.data.categorysource;
          resShop.forEach((element) => {
            const thiselement = {};
            thiselement.Id = element.categoryid;
            thiselement.text = element.categoryname;
            this.getaddsourceOptions.push(thiselement);
          });
          const modelOptionArr = res.data.modelsource;
          modelOptionArr.forEach((element) => {
            const thiselement = {};
            thiselement.Id = element.modelid;
            thiselement.text = element.modelname;
            thiselement.categoryid = element.categoryid;

            this.getaddmodelOptions.push(thiselement);
          });
        }
      });
      //获取当前登录的门店信息
      getsalesforecastinfo().then((res) => {
        if (res.success === true) {
          this.shopNameOptions = [];
          this.formData.dealer = res.data.basicinfo.shoplist[0].dealer; //根据SHOPName选择的改变
          // this.formData.submitterName = res.data.basicinfo.shoplist[0].username;
          this.formData.submitterName = res.data.basicinfo.shoplist[0].realname; //
          this.formData.personnelType =
            res.data.basicinfo.shoplist[0].personneltype;
          this.formData.currentWeeksActual =
            res.data.forecastsummary.currentweekactual;
          this.formData.weekPeriod = res.data.forecastsummary.weekperiod;
          this.shopList = res.data.basicinfo.shoplist; //获取登陆用户的所有门店信息
          let arr = res.data.basicinfo.shoplist;
          arr.forEach((item) => {
            const thiselement = {};
            thiselement.Id = item.shopid;
            thiselement.text = item.shopname;
            this.shopNameOptions.push(thiselement);
            this.onConfirm_ShopName(this.shopNameOptions[0]);
          });
        }
        console.log("获取数据aa：", res.data, res.data.basicinfo.shoplist);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.salesForecastBox {
  background-color: #f5f5f5;

  .date {
    font-weight: 700;
    margin: 10px 20px;
    height: 50px;
    line-height: 50px;
  }
  .buttonAdd {
    margin: 20px;
  }
  .buttonBox {
    height: 90px;
    background-color: #f5f5f5;
    .bottombutton {
      width: 100%;
      position: fixed;
      bottom: 0;
      .button {
        width: 50%;
      }
    }
  }
  .modelPush {
    height: 10px;
    background-color: #f5f5f5;
    border-radius: 10px;
  }
  .block {
    width: 600px;
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
      .button-item {
        width: 100%;
      }
    }
  }
}
.form-group {
  padding-bottom: 0.1rem;
}
.delete-button {
  height: 100%;
}
</style>