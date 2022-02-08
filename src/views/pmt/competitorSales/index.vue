<template>
  <div class="competitorSalesBox">
    <TopBar
      :topBarTitle="this.$t('pmt.competitorSales.title')"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    ></TopBar>
    <div class="date">
      {{ this.$t("pmt.visitStatistics.date") }}:{{ dateOn }}
    </div>

    <div class="infog-card form-group">
      <h2 class="card-title">
        {{ this.$t("pmt.competitorSales.basicInfo") }}
      </h2>
      <van-field
        v-model="formData.name"
        readonly
        :label="this.$t('pmt.competitorSales.name')"
        input-align="right"
        label-width="120px"
      />
      <!-- <van-divider /> -->
      <van-field
        readonly
        v-model="formData.personnelType"
        input-align="right"
        label-width="120px"
        :label="this.$t('pmt.competitorSales.personnelType')"
      />
      <van-field
        readonly
        v-model="formData.region"
        input-align="right"
        label-width="120px"
        :label="this.$t('pmt.competitorSales.region')"
      />
      <van-field
        readonly
        v-model="formData.new_area_name"
        input-align="right"
        label-width="120px"
        :label="this.$t('pmt.competitorSales.branch')"
      />
      <van-field
        readonly
        v-model="formData.dealer"
        input-align="right"
        label-width="120px"
        :label="this.$t('pmt.competitorSales.dealer')"
      />
      <van-field
        v-model="formData.shopName"
        is-link
        readonly
        :label="this.$t('pmt.competitorSales.shopName')"
        @click="showShopPicker = true"
        input-align="right"
        label-width="120px"
        :rules="[]"
      />
    </div>

    <div class="infog-card form-group">
      <h2 class="card-title">
        {{ this.$t("pmt.competitorSales.detail") }}
      </h2>
      <van-cell
        :title="this.$t('pmt.competitorSales.periodFrom')"
        :value="formData.periodFrom"
        @click="showPeriodFrom = true"
        is-link
      />
      <!--  -->
      <van-cell
        :title="this.$t('pmt.competitorSales.periodTo')"
        :value="formData.periodTo"
        @click="showPeriodTo = true"
        is-link
      />
    </div>
    <van-form>
      <van-tabs type="card">
        <!-- category -->
        <van-tab :title="this.$t('pmt.competitorSales.category')">
          <!-- 动态图片 -->
          <div class="form-group infog-card">
            <div class="listLabelImg">
              <div
                class="listLabelImg-item"
                v-for="(item, i) in categoryBrandList"
                :key="i"
              >
                <div :class="[idx === i ? 'discolour' : '']">
                  <img
                    @click="handelImg(item, i)"
                    style="height: 45px; width: 35px"
                    v-if="item.new_icon"
                    :src="item.new_icon"
                  />
                </div>
              </div>
            </div>

            <div class="listLabel">
              <div style="text-algin: center">
                {{ $t("pmt.competitorSales.Brand") }}
              </div>
              <div style="text-algin: center">
                {{ $t("pmt.competitorSales.sellOut") }}
              </div>
            </div>
            <!-- 表格category -->
            <div v-for="(item, i) in categoryBrandList" :key="i">
              <!-- <div
                v-if="new_product_categoryId === item.new_product_categoryId"
              > -->
              <div v-for="(name, i) in item.BrandList" :key="i">
                <van-field
                  v-if="new_product_categoryId === item.new_product_categoryId"
                  @change="changeBrandList(item.BrandList)"
                  :readonly="isBrand"
                  input-align="right"
                  type="number"
                  v-model="name.new_value"
                  label-width="120px"
                  :label="name.new_name"
                />
                <div class="borderBottom"></div>
              </div>
              <!-- </div> -->
            </div>
          </div>
          <div class="bottombutton">
            <van-button
              style="background: #4d72ac"
              :loading="bottonLoding"
              class="button"
              native-type="submit"
              @click="
                () => {
                  this.$throttle.throttle(onSubmit());
                }
              "
              type="info"
              >{{ $t("pmt.submitButton") }}</van-button
            >
            <van-button
              style="background: #4d72ac"
              class="button"
              native-type="button"
              @click="
                () => {
                  this.$throttle.throttle(onCancel());
                }
              "
              type="info"
              >{{ $t("pmt.salesForecast.oncancelBotton") }}</van-button
            >
          </div>
        </van-tab>
        <!-- total -->
        <!-- <van-tab :title="this.$t('pmt.competitorSales.total')" v-show="false">
          <div class="navBox">
            <div class="form-group infog-card">
              <div class="listLabel">
                <div style="text-algin: center">
                  {{ this.$t("pmt.competitorSales.Brand") }}
                </div>
                <div style="text-algin: center">
                  {{ this.$t("pmt.competitorSales.sellOut") }}
                </div>
              </div>
              <div v-for="(item, i) in total" :key="i">
                <van-field
                  @change="changeTotalList"
                  :readonly="isTotal"
                  input-align="right"
                  type="number"
                  v-model="item.new_row_value"
                  label-width="120px"
                  :label="item.new_row_name"
                />
                <div class="borderBottom"></div>
              </div>
            </div>
            <div class="bottombutton">
              <van-button
                style="background: #4d72ac"
                :loading="bottonLoding"
                class="button"
                native-type="submit"
                @click="onTotalSubmit"
                type="info"
                >{{ this.$t("pmt.submitButton") }}</van-button
              >
              <van-button
                style="background: #4d72ac"
                class="button"
                native-type="button"
                @click="onTotalancel"
                type="info"
                >{{ this.$t("pmt.salesForecast.oncancelBotton") }}</van-button
              >
            </div>
          </div>
        </van-tab> -->
      </van-tabs>
    </van-form>
    <!-- 弹出层 -->
    <!-- type="range"  max-range="30"-->
    <van-calendar
      v-model="showPeriodFrom"
      v-if="!periodFromReadonly"
      @confirm="onPeriodFromConfirm"
      :max-date="maxDate"
      :min-date="minDate"
      is-link
    />
    <!-- range-prompt='' -->
    <van-calendar
      is-link
      v-model="showPeriodTo"
      v-if="!periodToReadonly"
      @confirm="onPeriodToConfirm"
      :max-date="maxPeriodTo"
      :min-date="minPeriodTo"
    />
    <van-popup v-model="showShopPicker" position="bottom" round>
      <van-picker
        show-toolbar
        :columns="shopPermissionOptions"
        @cancel="showShopPicker = false"
        @confirm="handleShopId"
        value-key="text"
        :confirm-button-text="this.$t('pmt.confirmButton')"
        :cancel-button-text="this.$t('pmt.cancelButton')"
      />
    </van-popup>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import TopBar from "@/components/TopBar";
// import { getUserinfoByToken } from "@/api/user";
import {
  getentityconditions, //品牌
  competitorsalesAddvisitstatistics, //提交
  getsalescategorybrandlist, //品牌对应列表
  getusershopinfo, //ShopName下拉框
  getdefaultperiodfromdate,
} from "@/api/stockCheck";
import { postUserPermission, getUserinfoByToken } from "@/api/user";
export default {
  name: "competitorSales",
  components: {
    TopBar,
  },
  data() {
    return {
      bottonLoding: false,
      isBrand: false,
      isTotal: false, //判断是否有值
      new_product_categoryId: "",
      new_name_en: "",
      categoryBrandList: [], //所以分类和品牌
      minPeriodTo: new Date(2010, 0, 1),
      maxPeriodTo: new Date(),
      dateBloom: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      idx: "",
      position_code: "",
      total: [], //所有品牌
      brand: [], //对应的品牌
      new_row_name: "", //类别名称
      new_icon: [], //所有类别
      basicInfoData: [], //basicInfo数据
      shopPermissionOptions: [], //下拉框数据
      showShopPicker: false,
      showPeriodFrom: false,
      showPeriodTo: false,
      formData: {
        periodFrom: "",
        periodTo: "",
      },
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",
      periodFromReadonly: false,
      periodToReadonly: false,
    };
  },
  computed: {
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
  created() {
    this.getData();
  },
  methods: {
    changeBrandList(BrandList) {
      this.isTotal = true;
      this.handleCalculateTotal();
    },
    changeTotalList() {
      this.isBrand = true;
    },
    //giftti提交
    onTotalSubmit() {
      this.onSubmit();
    },
    //model提交
    onSubmit() {
      if (this.formData.periodFrom == "" || this.formData.periodTo == "") {
        this.$toast.fail(this.$t("pmt.salesForecast.FromTo"));
        return false;
      } else {
        const arr = [];
        //分类品牌
        this.categoryBrandList.forEach((item) => {
          item.BrandList.forEach((item2) => {
            if (item2.new_value) {
              item.new_value = Number(item.new_value);
              console.log(item2.new_value, "aaawww");
              //
              const obj = {
                new_row_type: item.new_name_en, //refr分类名称
                new_row_name: item2.new_name,
                new_row_value: item2.new_value, //
              };
              arr.push(obj);
            }
          });
        });
        const srr = [];
        //total
        this.total.forEach((item) => {
          if (item.new_row_value !== "") {
            item.new_row_value = Number(item.new_row_value);
            console.log(item.new_row_value, "aaawww");
            const obj = {
              new_row_type: item.new_row_type, //refr分类名称
              new_row_name: item.new_row_name,
              new_row_value: item.new_row_value, //
            };
            srr.push(obj);
          }
        });

        if (arr.length == 0 && srr.length == 0) {
          this.$toast.fail(this.$t("pmt.competitorSales.inputNull"));
          return false;
        }
        const params = {
          new_channel_id: this.formData.new_channel_id,
          new_channel_name: this.formData.new_channel_name,
          new_dealer_id: this.formData.new_dealer_id,
          new_dealer_code: this.formData.new_dealer_code,
          new_dealer_name: this.formData.dealer,
          new_region_id: this.formData.new_region_id,
          new_region_name: this.formData.region,
          new_province_id: this.formData.new_branch_id,
          new_province_name: this.formData.branch,
          new_shop_id: this.formData.shopNameId,
          new_shop_code: this.formData.new_shop_code,
          new_shop_name: this.formData.shopName,
          new_period_form: this.formData.periodFrom,
          new_period_to: this.formData.periodTo,
          new_submitted_type: this.position_code,

          new_area_id: this.formData.new_area_id,
          new_area_name: this.formData.new_area_name,
          new_channel_parentid: this.formData.new_channel_parentid,
          new_channel_parent_name: this.formData.new_channel_parent_name,

          CompetitorSalesCategories: [...arr, ...srr],
        };
        console.log(params, "params");
        this.bottonLoding = true;
        this.$toast.loading({ duration: 0, forbidClick: true });
        competitorsalesAddvisitstatistics(params)
          .then((res) => {
            if (res.success) {
              this.$toast.success(res.message);
              setTimeout(() => {
                this.topBarClickLeft();
              }, 1000);
            } else {
              this.$toast.fail(res.message);
              // this.$toast.fail(this.$t("No Data input, please check again!"));
            }
          })
          .catch((error) => {
            this.$toast.fail(error.message);
          })
          .finally(() => {
            this.bottonLoding = false;
          });
      }
    },
    //点击分类图片
    handelImg(value, i) {
      console.log(value, "v:");
      this.idx = i;
      // this.new_row_name = value.new_name;
      this.new_name_en = value.new_name_en; //分类英文名称
      this.new_product_categoryId = value.new_product_categoryId;
      console.log(this.categoryBrandList, "yyyyyyyyyyy");
    },
    // 选择shopName
    handleShopId(value) {
      this.formData.shopName = value.text;
      this.formData.shopNameId = value.Id;
      //根据选择的shop name获取对应的BasicInfo数据，和提交的参数
      this.basicInfoData.forEach((item) => {
        if (this.formData.shopNameId === item.new_shop_id) {
          this.formData.new_channel_id = item.new_channel_id;
          this.formData.new_channel_name = item.new_channel_name;
          this.formData.new_dealer_id = item.new_dealer_id;
          this.formData.new_dealer_code = item.new_dealer_code;
          this.formData.dealer = item.new_dealer_name;
          this.formData.new_region_id = item.new_region_id;
          this.formData.region = item.new_region_name;
          this.formData.new_branch_id = item.new_province_id;
          this.formData.branch = item.new_province_name;
          this.formData.new_shop_code = item.new_shop_code;
          this.position_code = item.new_personnel_value;
          this.formData.personnelType = item.new_personnel_name;
          this.formData.name = item.new_real_name;

          this.formData.new_channel_parentid = item.new_channel_parentid;

          this.formData.new_channel_parent_name = item.new_channel_parent_name;

          this.formData.new_channel_parentid = item.new_channel_parentid;

          this.formData.new_area_name = item.new_area_name;
          this.formData.new_area_id = item.new_area_id;
        }
      });
      this.showShopPicker = false;
    },
    onCancel() {
      this.topBarClickLeft();
    },
    onTotalancel() {
      this.topBarClickLeft();
    },
    //选择时间
    onPeriodFromConfirm(value) {
      this.formData.periodFrom = this.formatDate(value);
      this.formData.periodTo = "";
      this.periodToReadonly = false;
      this.showPeriodFrom = false;
      this.minPeriodTo = new Date(value); //最小不能小于periodFrom

      // 然后获取当天的时间以及From那个月的最后一天的时间
      const currentDate = new Date();
      const lastDateOfFromMonth = new Date(
        value.getFullYear(),
        value.getMonth() + 1,
        0
      );
      console.log("lastDateOfFromMonth,", lastDateOfFromMonth);
      if (currentDate > lastDateOfFromMonth) {
        this.maxPeriodTo = lastDateOfFromMonth;
      } else {
        this.maxPeriodTo = currentDate;
      }

      // let startTime = this.formData.periodFrom;
      // console.log(startTime);
      // this.endTimeIf(startTime.substr(0, 4), startTime.substr(5, 2));
    },
    //选择时间
    onPeriodToConfirm(value) {
      if (this.formData.periodFrom !== "") {
        this.formData.periodTo = this.formatDate(value);
        this.showPeriodTo = false;
      } else {
        this.$toast.fail(this.$t("pmt.salesForecast.PeriodFrom"));
        this.showPeriodTo = false;
      }
    },
    formatDate(date) {
      let y = date.getFullYear();
      let m = "";
      let d = "";
      if (date.getMonth() + 1 < 10) {
        m = "0" + (date.getMonth() + 1);
      } else {
        m = date.getMonth() + 1;
      }
      if (date.getDate() < 10) {
        d = "0" + date.getDate();
      } else {
        d = date.getDate();
      }
      return y + "-" + m + "-" + d;
    },
    //获取数据
    getData() {
      //shopName下拉框
      getusershopinfo().then((res) => {
        if (res.success === true) {
          // console.log(res, "aa");
          this.shopPermissionOptions = [];
          this.basicInfoData = res.data;
          const resShop = res.data;
          resShop.forEach((element) => {
            const thiselement = {};
            thiselement.Id = element.new_shop_id;
            thiselement.text = element.new_shop_name;
            this.shopPermissionOptions.push(thiselement);
            this.handleShopId(this.shopPermissionOptions[0]);
          });
        }
      });

      //获取所有类
      // getentityconditions({
      //   entityName: "new_product_category",
      //   fields: "new_product_categoryId,new_name,new_code,new_icon,new_name_en",
      //   where:
      //     "and new_parentid is null and new_status=0 and new_mdm_del_flag=0",
      // }).then((res) => {
      //   if (res.success === true) {
      //     console.log("品牌：", res);
      //     this.new_icon = res.data;
      //
      //   }
      // });

      //获取所有分类品牌Total列表
      getsalescategorybrandlist()
        .then((res) => {
          if (res.success === true) {
            this.$toast.loading({ duration: 0, forbidClick: true });
            this.categoryBrandList = [];
            this.categoryBrandList = res.data; //全部数据分类和品牌
            this.handelImg(this.categoryBrandList[0], 0);
            this.total = [];
            let srr = [];
            let setSrr = [];
            let setArr = [];
            const arr = res.data;
            arr.forEach((item) => {
              srr = [...item.BrandList];
              srr.forEach((srritem) => {
                setSrr.push(srritem.new_name);
              });
              setArr = [...new Set(setSrr)]; //去重后的全部品牌名称
            });
            //全部品牌
            setArr.forEach((branitem) => {
              const obj = {
                new_row_name: branitem, //品牌对应名称
                // new_row_type: item.new_name_en, //分类名称
                new_row_type: "Total", //分类名称Total固定值
                new_row_value: "", //用户输入值
              };
              this.total.push(obj);
            });
            console.log("total列表：", this.total);
            console.log(setSrr, "setSrr", setArr);
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
      //获取与当前用户上一次提交的Period To，Period Form默认是上次提交的Period To
      getdefaultperiodfromdate().then((res) => {
        if (res.success === true) {
          if (res.data !== "") {
            this.periodFromReadonly = true;
            this.formData.periodFrom = new Date(res.data);
            // this.formData.periodFrom = new Date('2021','7','14')
            this.onPeriodFromConfirm(new Date(this.formData.periodFrom));
            this.minPeriodTo = new Date(this.formData.periodFrom); //最小不能小于periodFrom
            // let startTime = this.formData.periodFrom;
            // this.endTimeIf(startTime.substr(0, 4), startTime.substr(5, 2));
            this.dateBloom = true;
          } else {
            this.periodToReadonly = true;
          }
        }
      });
      // getUserinfoByToken()
      //   .then((res) => {
      //     const { success, data } = res;
      //     if (success) {
      //       const { user_position } = data.Items;
      //       console.log(data, "aa");
      //       this.position_code = user_position[0].position_code;
      //     } else {
      //       this.$toast.fail(res.message);
      //     }
      //   })
      //   .catch((error) => {
      //     this.$toast.fail(error.message);
      //   })
      //   .finally(() => {
      //     this.handleHideLoading();
      //   });
      this.$toast.loading({ duration: 0, forbidClick: true });
      getUserinfoByToken()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { user_position, user_info } = data.Items;
            console.log(user_info);
            // this.basicInfoForm.Name = user_info.username;
            // this.basicInfoForm.PersonnelType = user_position[0].position_code;

            this.position_code = user_position[0].position_code;
            this.handleHideLoading();
          } else {
            console.log("test");
            this.$toast.fail(res.message);
            return;
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },
    // 返回上一页
    topBarClickLeft() {
      this.$router.go(-1);
    },
    //hide loading
    handleHideLoading() {
      this.$toast.clear();
    },
    handleCalculateTotal() {
      const totalMap = {};
      this.categoryBrandList.forEach((categoryBrand) => {
        categoryBrand.BrandList.forEach((brand) => {
          if (totalMap[brand.new_name]) {
            if (brand.new_value)
              totalMap[brand.new_name] += Number(brand.new_value);
          } else {
            if (brand.new_value)
              totalMap[brand.new_name] = Number(brand.new_value);
          }
        });
      });
      console.log("totalMap", totalMap);
      this.total.forEach((total) => {
        total.new_row_value = totalMap[total.new_row_name];
      });
      console.log("this.total", this.total);
    },
  },
};
</script>
<style lang="scss" scoped>
//  .van-field__control{
//   text-align: right !important;
// }
.competitorSalesBox {
  background: #f5f5f5;
  .date {
    font-weight: 700;
    margin: 10px 20px;
    height: 50px;
    line-height: 50px;
  }
  .listLabelImg {
    margin: 15px 20px;
    padding: 0 10px;
    background-color: #cdd9ea;
    display: flex;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
    .listLabelImg-item {
      margin: 10px 10px;
    }
  }
  .listLabel {
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin: 15px 20px 0px 20px;
    padding: 0px 20px;
    background-color: #d7d7d7;
  }
  .discolour {
    padding: 5px;
    background-color: #007eb2;
  }
  .bottombutton {
    padding: 0 -30px;
    width: 100%;
    position: fixed;
    bottom: 0;
    .button {
      width: 50%;
    }
  }
}
</style
>>
