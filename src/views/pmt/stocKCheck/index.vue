<template>
  <div class="stocKCheckBox">
    <TopBar
      :topBarTitle="this.$t('pmt.stocKCheck.title')"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    ></TopBar>
    <van-tabs type="card">
      <!-- model -->
      <van-tab :title="this.$t('pmt.stocKCheck.product')">
        <div class="navBox">
          <div class="infog-card form-group">
            <h2 class="card-title">
              {{ this.$t("pmt.stocKCheck.stockCheckDate") }}
            </h2>
            <van-field
              readonly
              v-model="formData.stockCheckDate"
              label-width="160px"
              input-align="right"
              :label="this.$t('pmt.stocKCheck.stockCheckDate')"
            />
            <van-field
              v-model="formData.new_location_name"
              is-link
              readonly
              :label="this.$t('pmt.stocKCheck.storageLocation')"
              @click="modelPicker = true"
              input-align="right"
              label-width="120px"
              :rules="[
                {
                  required: true,
                  message: this.$t(
                    'pmt.salesForecast.stocKCheckStorageLocation'
                  ),
                },
              ]"
            />
            <van-popup v-model="modelPicker" position="bottom" round>
              <van-picker
                show-toolbar
                :columns="modelOptions"
                @cancel="modelPicker = false"
                @confirm="onConfirmModelOptions"
                value-key="text"
                :confirm-button-text="this.$t('pmt.confirmButton')"
                :cancel-button-text="this.$t('pmt.cancelButton')"
              />
            </van-popup>
          </div>
        </div>
        <div class="navBox">
          <div class="infog-card form-group">
            <h2 class="card-title">
              {{ this.$t("pmt.stocKCheck.modelList") }}
            </h2>

            <div class="buttonAdd">
              <van-button
                style="background: #4d72ac"
                type="info"
                size="mini"
                @click="showAddModel"
                >{{ this.$t("pmt.salesForecast.addModel") }}</van-button
              >
            </div>
            <div v-for="(item, i) in modelList" :key="i">
              <van-swipe-cell>
                <!-- v-model="item.new_model_name" -->
                <!-- :label="$t('pmt.salesForecast.modelName')" -->
                <van-field
                  name="stepper"
                  :label="item.new_model_name"
                  input-align="right"
                  label-width="120px"
                >
                  <!-- :label="$t('pmt.salesForecast.quantity')" -->
                  <template #input>
                    <van-stepper v-model="item.new_stock_qty" />
                  </template>
                </van-field>
                <template #right>
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
          <div class="buttonBox">
            <div class="bottombutton">
              <van-button
                :loading="loadingSubmit"
                class="button"
                @click="
                  () => {
                    this.$throttle.throttle(onSubmit());
                  }
                "
                type="info"
                style="background: #4d72ac"
                >{{ this.$t("pmt.salesForecast.submit") }}</van-button
              >
              <van-button
                class="button"
                @click="() => {
                    this.$throttle.throttle(onCancel());
                  }"
                type="info"
                style="background: #4d72ac"
                >{{ this.$t("pmt.salesForecast.oncancelBotton") }}</van-button
              >
            </div>
          </div>
        </div>
      </van-tab>
      <!-- gift -->
      <van-tab :title="this.$t('pmt.stocKCheck.gift')">
        <div class="navBox">
          <div class="infog-card form-group">
            <h2 class="card-title">
              {{ this.$t("pmt.stocKCheck.stockCheckDate") }}
            </h2>
            <van-field
              input-align="right"
              readonly
              v-model="formData.stockCheckDate"
              label-width="160px"
              :label="this.$t('pmt.stocKCheck.stockCheckDate')"
            />
            <van-field
              v-model="formData.giftStorageLocation"
              is-link
              readonly
              :label="this.$t('pmt.stocKCheck.storageLocation')"
              @click="giftPicker = true"
              input-align="right"
              label-width="120px"
              :rules="[
                {
                  required: true,
                  message: this.$t(
                    'pmt.salesForecast.stocKCheckStorageLocation'
                  ),
                },
              ]"
            />
            <van-popup v-model="giftPicker" position="bottom" round>
              <van-picker
                show-toolbar
                :columns="giftOptions"
                @cancel="giftPicker = false"
                @confirm="onConfirm_gift"
                value-key="text"
                :confirm-button-text="this.$t('pmt.confirmButton')"
                :cancel-button-text="this.$t('pmt.cancelButton')"
              />
            </van-popup>
          </div>
        </div>
        <div class="navBox">
          <div class="infog-card form-group">
            <h2 class="card-title">
              {{ this.$t("pmt.stocKCheck.giftList") }}
            </h2>
            <div class="buttonAdd">
              <van-button
                style="background: #4d72ac"
                type="info"
                size="mini"
                @click="AddGiftModel"
                >{{ this.$t("pmt.stocKCheck.addGif") }}</van-button
              >
            </div>
            <div v-for="(item, index) in giftList" :key="index">
              <van-swipe-cell>
                <!-- :label="$t('pmt.salesForecast.quantity')" -->
                <van-field
                  name="stepper"
                  :label="item.new_model_name"
                  input-align="right"
                  label-width="120px"
                >
                  <template #input>
                    <van-stepper v-model="item.new_stock_qty" />
                  </template>
                </van-field>
                <template #right>
                  <van-button
                    square
                    @click="deleteGiftList(index)"
                    :text="$t('pmt.retail.delete')"
                    type="danger"
                    class="delete-button"
                  />
                </template>
              </van-swipe-cell>
            </div>
          </div>
          <div class="buttonBox">
            <div class="bottombutton">
              <van-button
                :loading="loadingSubmit"
                style="background: #4d72ac"
                class="button"
                @click="() => {
                    this.$throttle.throttle(onSubmitGift());
                  }"
                type="info"
                >{{ this.$t("pmt.salesForecast.submit") }}</van-button
              >
              <van-button
                style="background: #4d72ac"
                class="button"
                @click="() => {
                    this.$throttle.throttle(onCancelGift());
                  }"
                type="info"
                >{{ this.$t("pmt.salesForecast.oncancelBotton") }}</van-button
              >
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- model -->
    <van-popup v-model="show">
      <van-form ref="addModelRef">
        <div class="block">
          <TopBar
            :topBarTitle="this.$t('pmt.salesForecast.addModel')"
            :leftHtml="topBarHtml"
            :rightHtml="topBarRight"
            @set_onClickRight="onClose"
          ></TopBar>
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
          <!-- <van-field
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
              message: this.$t('pmt.giftRegistration.GiftMessage'),
            },
          ]"
        /> -->
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
            v-model="formData.modelQuantity"
            label-width="120px"
            :label="this.$t('pmt.salesForecast.quantity')"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.salesForecast.inputQuantity'),
              },
            ]"
          />
          <!-- <van-field
          input-align="right"
          type="number"
          v-model="formData.modelPrice"
          label-width="120px"
          :label="this.$t('pmt.salesForecast.price')"
        /> -->

          <div class="button" style="background: #4d72ac">
            <van-button
              style="background: #4d72ac; font-size: 22px"
              type="info"
              @click="submitAdd"
              class="button-item"
              >{{ this.$t("pmt.salesForecast.add") }}</van-button
            >
          </div>
        </div>
      </van-form>
    </van-popup>
    <!-- gift -->
    <van-popup v-model="showAddGift">
      <div class="block">
        <TopBar
          :topBarTitle="this.$t('pmt.stocKCheck.addGif')"
          :leftHtml="topBarHtml"
          :rightHtml="topBarRight"
          @set_onClickRight="onClose"
        ></TopBar>
        <van-form ref="addGiftRef">
          <van-field
            v-model="formData.gift"
            is-link
            readonly
            :label="this.$t('pmt.stocKCheck.gift')"
            @click="addgifyPicker = true"
            input-align="right"
            label-width="120px"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.salesForecast.selectGift'),
              },
            ]"
          />
          <!-- formData.quantity -->
          <van-field
            input-align="right"
            type="number"
            v-model="formData.giftQuantity"
            label-width="120px"
            :label="this.$t('pmt.salesForecast.quantity')"
            :rules="[
              {
                required: true,
                message: this.$t('pmt.salesForecast.inputQuantity'),
              },
            ]"
          />
          <div class="button">
            <van-button
              style="background: #4d72ac; font-size: 22px"
              type="info"
              @click="submitAddGift"
              class="button-item"
              >{{ this.$t("pmt.salesForecast.add") }}</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
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
    <!-- 选择Gift -->
    <van-popup v-model="addgifyPicker" position="bottom" round>
      <van-picker
        show-toolbar
        :columns="giftAddOptions"
        @cancel="addgifyPicker = false"
        @confirm="onConfirm_GiftName"
        value-key="text"
        :confirm-button-text="this.$t('pmt.confirmButton')"
        :cancel-button-text="this.$t('pmt.cancelButton')"
      />
    </van-popup>
    <!-- 选择Model弹框 -->
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
    <!--  -->
    <!-- <van-popup v-model="showModelPicker" position="bottom" round>
      <van-search
        v-model="searchModelKey"
        :placeholder="this.$t('pmt.retail.filterOfModel')"
        @change="changeModelKey"
      />
      <van-picker
        show-toolbar
        :columns="modelFilteredOptions"
        @cancel="showModelPicker = false"
        @confirm="handleSelectModel"
        value-key="text"
        :confirm-button-text="this.$t('pmt.confirmButton')"
        :cancel-button-text="this.$t('pmt.cancelButton')"
      >
      </van-picker>
    </van-popup> -->
  </div>
</template>
<script>
import {
  getstoragelocationlistbyproduct,
  getstoragelocationlistbygift,
  salseforecastGetaddsource,
  stockcheckaddmodelbyproduct,
  getstockchecklistbyproduct, //modelList
  getStockchecklistbygift, //giftList
  getentityconditions,
  stockcheckaddmodelbygift,
  stockchecksubmitproduct,
  stockchecksubmitgift,
} from "@/api/stockCheck";
import TopBar from "@/components/TopBar";
import testVue from "../eLearning/components/test.vue";
export default {
  naem: "stocKCheck",
  components: {
    TopBar,
  },
  data() {
    return {
      loadingSubmit: false,
      searchModelKey: "",
      modelFilteredOptions: [],
      // selectGift: -1,
      // selectModel: -1,
      modelList: [],
      giftList: [],
      modelId: "",
      giftId: "",
      getaddsource: [],
      getaddsourceOptions: [],
      giftOptions: [],
      modelOptions: [],
      getaddmodel: [],
      getaddmodelOptions: [],
      modelFilteredOptionsCategoryid: [],
      showAddGift: false,
      show: false,
      modelMoPicker: false,
      modelPicker: false,
      giftPicker: false,
      addgifyPicker: false,
      giftNamePicker: false,
      getaddsourcePicker: false,
      giftMessagePicker: false,
      giftAddOptions: [], //下拉框数据
      formData: {
        new_location_name: "",
        stockCheckDate: "",
        giftQuantity: "",
        modelQuantity: "",
        giftStorageLocation: "",
        category: "",
        model: "",
      },
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",
      topBarHtml: "",
      topBarRight: '<i class="van-icon van-icon-cross"></i>',
    };
  },
  created() {
    this.getOptions(); //下拉框数据
  },
  methods: {
    //删除GiftList
    deleteGiftList(index) {
      console.log(index, "index");
      if (this.giftList.length > 0) this.giftList.splice(index, 1);
    },
    //删除ModelList删除不提交
    deleteModelList(i) {
      console.log(i, "i");
      if (this.modelList.length > 0) this.modelList.splice(i, 1);
    },
    // 新增ModelList
    submitAdd() {
      // 新增
      this.$refs.addModelRef.validate().then(() => {
        const params = {
          new_sub_category_id: this.formData.sub_category_id,
          // new_sub_category_name: this.formData.sub_category_name,
          new_mdm_brand_name: this.formData.mdm_brand_name,
          new_mdm_brand: this.formData.mdm_brand,
          new_sub_category_name: this.formData.sub_category_name,
          new_location_name: this.formData.new_location_name,
          new_category_id: this.formData.categoryId,
          new_category_name: this.formData.category,
          new_stock_type: 1, //1=Model,2=Gift
          new_model_name: this.formData.model,
          new_model_id: this.formData.modelId,
          new_stock_qty: this.formData.modelQuantity, //
        };
        this.modelList.push(params);
        console.log(this.modelList, "modelListmodelListmodelListmodelList");
        this.show = false;
      });
    },
    // 新增GiftList
    submitAddGift() {
      // 新增
      this.$refs.addGiftRef.validate().then(() => {
        const params = {
          new_model_name: this.formData.gift,
          new_stock_type: 2, //1=Model,2=Gift
          new_stock_qty: this.formData.giftQuantity, //
          new_shop_id: this.formData.giftStorageLocationId, //
        };
        this.giftList.push(params);
        this.showAddGift = false;
      });
    },
    //提交//Model
    onSubmit() {
      this.Submit();
    },
    //gift提交
    onSubmitGift() {
      this.Submit();
    },
    //model
    Submit() {
      if (this.modelList.length === 0 && this.giftList.length === 0) {
        this.$toast.fail(this.$t("pmt.competitorSales.inputNull"));
        return false;
      }
      // if (this.giftList.length === 0) {
      //   this.$toast.fail(this.$t("pmt.competitorSales.inputNull"));
      //   return false;
      // }
      // this.loadingSubmit = true;
      this.$toast.loading({ duration: 0, forbidClick: true });
      stockchecksubmitproduct(this.modelList)
        .then((res) => {
          if (res.success === true) {
            this.SubmitGift();
          } else {
            this.$toast.fail(res.data.Message);
          }
        })
        .catch((error) => {
          this.$toast.fail(error.message);
        })
        .finally(() => {
          this.loadingSubmit = false;
        });
    },
    // gift
    SubmitGift() {
      // 提交成功后退出页面
      stockchecksubmitgift(this.giftList)
        .then((res) => {
          if (res.success === true) {
            this.$toast.success(res.message);
            setTimeout(() => {
              this.topBarClickLeft();
            }, 1000);
          } else {
            this.$toast.fail(res.data.Message);
          }
        })
        .catch((error) => {
          this.$toast.fail(error.message);
        })
        .finally(() => {
          this.loadingSubmit = false;
        });
    },
    AddGiftModel() {
      this.showAddGift = true;
      this.formData.gift = "";
      this.formData.giftQuantity = "";
    },
    showAddModel() {
      this.show = true;
      this.formData.model = "";
      this.formData.modelQuantity = "";
      this.formData.category = "";
      // this.formData.modelPicker = "";
    },
    //选择框确认键Model category
    getaddsourceConfirm(value) {
      this.formData.model = "";
      this.formData.modelId = "";
      this.formData.categoryId = value.Id;
      this.formData.category = value.text;
      this.getaddsourcePicker = false;
      this.modelFilteredOptionsCategoryid = [];
      this.getaddmodelOptions.forEach((item) => {
        if (value.Id == item.categoryid) {
          this.modelFilteredOptionsCategoryid.push(item);
        }
      });
      this.changeModelKey();
    },
    //联想搜索
    changeModelKey() {
      //  ;
      this.modelFilteredOptions = [];
      for (const i in this.modelFilteredOptionsCategoryid) {
        if (
          this.modelFilteredOptionsCategoryid[i].text
            .toLowerCase()
            .indexOf(this.searchModelKey.toLowerCase()) >= 0
        ) {
          this.modelFilteredOptions.push(
            this.modelFilteredOptionsCategoryid[i]
          );
        }
      }
    },
    ////??选择框确认键Model  location//根据选择的new_location_name
    onConfirmModelOptions(value) {
      this.modelList = [];
      this.formData.new_location_nameId = value.new_shopId;
      this.formData.new_location_name = value.text;
      this.modelPicker = false;
      console.log(value.text, "modelList:", this.formData.new_location_name);
      // 获取modelList
      getstockchecklistbyproduct({
        new_location_name: this.formData.new_location_name,
      }).then((res) => {
        if (res.success === true) {
          console.log("modelList:", res.data);
          this.modelList = res.data;
        }
      });
    },
    // getModelList() {
    //   this.modelList = [];
    //   getstockchecklistbyproduct({
    //     new_location_name: this.formData.new_location_name,
    //   }).then((res) => {
    //     if (res.success === true) {
    //       this.modelList = res.datagetGiftList;
    //     }
    //   });
    // },
    // getGiftList() {
    //   this.giftList = [];
    //   // 获取giftList
    //   getStockchecklistbygift({
    //     new_shop_id: this.formData.giftStorageLocationId,
    //   }).then((res) => {
    //     console.log("获取gift列表");
    //     this.giftList = res.data;
    //   });
    // },
    //选择model
    modelMoConfirm(value) {
      // console.log(value, "value", this.getaddmodel);
      this.formData.model = value.text;
      this.formData.modelId = value.Id;
      this.getaddmodel.forEach((item) => {
        if (this.formData.modelId === item.modelid) {
          this.formData.mdm_brand_name = item.mdmbrandname;
          this.formData.mdm_brand = item.mdmbrand;
          this.formData.sub_category_id = item.subcategoryid;
          // this.formData.sub_category_name = item.mdmsubcategorycode;
          this.formData.sub_category_name = item.new_subcategory_name;
          // this.formData.sub_category_code=item.
          console.log(
            "选择model:",
            item,
            item.sub_category_name,
            item.new_subcategory_name
          );
        }
      });
      this.modelMoPicker = false;
    },
    //选择Gift location
    onConfirm_gift(value) {
      this.giftList = [];
      this.formData.giftStorageLocation = value.text;
      this.formData.giftStorageLocationId = value.Id;
      this.giftPicker = false;
      // 获取giftList
      getStockchecklistbygift({
        new_shop_id: this.formData.giftStorageLocationId,
      }).then((res) => {
        console.log("获取gift列表");
        res.data.forEach((item) => {
          const obj = {
            new_model_name: item.new_model_name,
            new_stock_type: 2, //1=Model,2=Gift
            new_stock_qty: item.new_stock_qty, //
            new_shop_id: item.new_shop_id, //
          };
          this.giftList.push(obj);
        });
      });
    },

    //选择Gift
    onConfirm_GiftName(value) {
      this.formData.gift = value.text;
      this.formData.giftId = value.Id;
      this.addgifyPicker = false;
    },
    // 返回上一页
    topBarClickLeft() {
      this.$router.go(-1);
    },
    //关闭模态框
    onClose() {
      this.show = false;
      this.showAddGift = false;
    },
    //获取下拉框数据
    getOptions() {
      // Storage Location(model)
      getstoragelocationlistbyproduct().then((res) => {
        if (res.success === true) {
          this.modelOptions = [];
          const resShop = res.data;
          resShop.forEach((element) => {
            const thiselement = {};
            thiselement.Id = element.new_shopId;
            thiselement.text = element.new_name;
            this.modelOptions.push(thiselement);
          });

          this.onConfirmModelOptions(this.modelOptions[0]);
          console.log("this.formData.new_location_name:", resShop[0]);
        }
      });
      //Storage Location(gift)
      getstoragelocationlistbygift().then((res) => {
        console.log(res, "Storage Location");
        if (res.success === true) {
          this.giftOptions = [];
          const resShop = res.data;
          resShop.forEach((element) => {
            const thiselement = {};
            thiselement.Id = element.new_shopId;
            thiselement.text = element.new_name;
            this.giftOptions.push(thiselement);
          });
          this.onConfirm_gift(this.giftOptions[0]);
        }
      });
      // salseforecast Model 和 category
      salseforecastGetaddsource().then((res) => {
        console.log(res, "Storage Location");
        if (res.success === true) {
          this.getaddsourceOptions = [];
          this.getaddmodelOptions = [];
          const resShop = res.data.categorysource;
          // this.getaddsource = res.data.categorysource;
          this.getaddmodel = res.data.modelsource;
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
      //Gift
      // gift_name下拉框数据
      getentityconditions({
        entityName: "new_dictionary_maintain",
        fields: "new_dictionary_maintainId,new_name",
        where: "and new_type=1 and statecode=0",
      }).then((res) => {
        if (res.success === true) {
          this.giftAddOptions = [];
          const resShop = res.data;
          resShop.forEach((element) => {
            const thiselement = {};
            thiselement.Id = element.new_dictionary_maintainId;
            thiselement.text = element.new_name;
            this.giftAddOptions.push(thiselement);
          });
        }
      });

      // 获取当前日期
      var nowDate = new Date();
      let date = {
        y: nowDate.getFullYear(),
        m: nowDate.getMonth() + 1,
        d: nowDate.getDate(),
      };
      this.formData.stockCheckDate = date.y + "-" + date.m + "-" + date.d;
    },
    //onCancel
    onCancel() {
      //取消退出页面
      this.topBarClickLeft();
    },
    //??
    onCancelGift() {
      //取消退出页面
      this.topBarClickLeft();
    },
  },
};
</script>
<style lang="scss" scoped>
.stocKCheckBox {
  .buttonAdd {
    margin: 20px;
  }
  .buttonBox {
    height: 90px;
    .bottombutton {
      width: 100%;
      position: fixed;
      bottom: 0;
      .button {
        width: 50%;
      }
    }
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
</style>
