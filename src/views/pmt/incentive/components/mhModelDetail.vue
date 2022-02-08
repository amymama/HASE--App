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
      <div>
        <div class="form-group">
          <van-field
            :label="this.$t('pmt.incentiveDetail.dateTitle')"
            input-align="left"
            label-width="120px"
            :colon="true"
          >
            <template #input>
              <span v-text="selectDate"></span>
            </template>
          </van-field>
        </div>

        <div class="form-group">
          <van-field
            :label="this.$t('pmt.incentiveDetail.productCategory')"
            input-align="left"
            label-width="auto"
            :colon="true"
          >
            <template #input>
              <van-dropdown-menu class="mhModel-dropdown">
                <van-dropdown-item
                  v-model="selectProductId"
                  :options="selectProductOption"
                  @change="onSelectProductChange"
                />
              </van-dropdown-menu>
            </template>
          </van-field>
          <van-field
            :label="this.$t('pmt.incentiveDetail.subCategory')"
            input-align="left"
            label-width="auto"
            :colon="true"
          >
            <template #input>
              <van-dropdown-menu class="mhModel-dropdown">
                <van-dropdown-item
                  v-model="selectSubId"
                  :options="selectSubOption"
                  @change="onSelectSubChange"
                />
              </van-dropdown-menu>
            </template>
          </van-field>
        </div>

        <div class="form-group">
          <div class="info">
            <van-row class="body-row">
              <van-col span="24">
                <div class="mhModelList-table">
                  <table>
                    <thead>
                      <tr>
                        <th class="">
                          <span>{{
                            this.$t("pmt.incentiveDetail.listCategory")
                          }}</span>
                        </th>
                        <th>
                          <span>{{
                            this.$t("pmt.incentiveDetail.listSubCategory")
                          }}</span>
                        </th>
                        <th>
                          <span>{{
                            this.$t("pmt.incentiveDetail.listMaterialCode")
                          }}</span>
                        </th>
                        <th>
                          <span>{{
                            this.$t("pmt.incentiveDetail.listModel")
                          }}</span>
                        </th>
                        <th>
                          <span>{{
                            this.$t("pmt.incentiveDetail.listIncentive")
                          }}</span>
                        </th>
                        <th>
                          <span>{{
                            this.$t("pmt.incentiveDetail.listQty")
                          }}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in mhModellList" :key="index">
                        <td class="">{{ item.category }}</td>
                        <td>{{ item["sub-category"] }}</td>
                        <td>{{ item.material }}</td>
                        <td>{{ item.model }}</td>
                        <td>{{ item.incentive }}</td>
                        <td>{{ item.mtdqty }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>

      <van-row class="body-row" style="">
        <van-col span="24">
          <van-button block type="info" @click="onButton_Ok">{{
            this.$t("pmt.okButton")
          }}</van-button>
        </van-col>
      </van-row>
    </van-form>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { getPmt, getTl, getMd, getMhModellist } from "@/api/myIncentive";
import { getPmtSelectData } from "@/api/common";
import ChangeLang from "@/components/ChangeLang";
export default {
  name: "mhModelDetail",
  components: {
    TopBar,
    ChangeLang,
  },
  data() {
    return {
      topBarTitle: this.$t("pmt.incentiveDetail.topBarTitle"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      // topBarRightHtml: '<i class="van-icon van-icon-search"></i>',
      topBarRightHtml: "",

      loading: false,
      finished: false,
      refreshing: false,

      showDatePicker: false,
      type: "PMT",

      selectDate: "",
      selectProductId: null,
      selectSubId: null,

      mhModellList: [],
      selectProductOption: [
        {
          value: "",
          text: "All",
        },
      ],
      selectSubOption: [
        {
          value: "",
          text: "All",
        },
      ],
    };
  },
  created() {
    this.getSelectData();
    this.getList();
    this.selectDate = this.$router.currentRoute.query.selectDate;
    this.onLoad();
  },
  methods: {
    topBarClickLeft() {
      this.$router.go(-1);
    },

    topBarClickRight() {
      console.log("click right");
    },

    getSelectData() {
      this.selectProductOption = [
        {
          value: "",
          text: "All",
        },
      ];
      var paramsGift = {
        entityName: "new_product_category",
        fields: "new_product_categoryid,new_name_en",
        where: "and new_parentid is null and new_status=0",
      };
      getPmtSelectData(paramsGift)
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
            var resBranch = res.data;
            resBranch.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.value = element.new_product_categoryid;
              thiselement.text = element.new_name_en;
              this.selectProductOption.push(thiselement);
            });
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    onSelectProductChange() {
      this.selectSubId = null;
      this.selectSubOption = [
        {
          value: "",
          text: "All",
        },
      ];
      if (
        this.selectProductId == "" ||
        this.selectProductId == undefined ||
        this.selectProductId == null
      )
        return false;
      var params = {
        entityName: "new_product_category",
        fields: "new_product_categoryid,new_name_en",
        where:
          "and new_parentid ='" + this.selectProductId + "' and new_status=0",
      };
      getPmtSelectData(params)
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
            var resBranch = res.data;
            resBranch.forEach((element) => {
              var thiselement = {};
              // let branchname = element.new_name + ' ' + element.new_region_code
              thiselement.value = element.new_product_categoryid;
              thiselement.text = element.new_name_en;
              this.selectSubOption.push(thiselement);
            });
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
    },

    onSelectSubChange() {
      this.onLoad();
    },
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
    onLoad() {
      var arry = this.selectDate.split("-");
      var data = {
        Year: parseInt(arry[0]),
        Month: parseInt(arry[1]),
        ProductCategoryId: this.selectProductId,
        SubCategoryId: this.selectSubId,
      };
      getMhModellist(data)
        .then((res) => {
          if (res.success) {
          } else {
            this.$toast.fail(res.message);
            return;
          }
          try {
            if (res.data == "") {
              this.mhModellList = [];
              return;
            }
            var resBranch = res.data;
            this.mhModellList = resBranch;
            // resBranch.forEach((element) => {
            //   var thiselement = {};
            //   // let branchname = element.new_name + ' ' + element.new_region_code
            //   thiselement.value = element.new_product_categoryid;
            //   thiselement.text = element.new_name_en;
            //   this.selectSubOption.push(thiselement);
            // });
          } catch (e) {
            this.$toast.fail(e.message);
          }
        })
        .catch((e) => {
          this.$toast.fail(e.message);
        })
        .finally(() => {});
      this.finished = true;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    getList() {
      this.finished = true;
    },
    onButton_Ok() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.gift-form {
  padding: 5px;
  //   background-color: #fff;
  .card-title {
    // background: #2058ab;
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

.mhModelList-table {
  width: 100%;
  margin: 0 auto;
  overflow-x: scroll;
  .table-left {
    position: absolute;
    text-align: center;
    border: 1px solid #eee;
    padding: 18px;
    white-space: nowrap;
    background: white;
    width: 150px;
  }
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
  border: 0.1px solid #000;
  height: 100px;
  text-align: center;
  text-align: center;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.list-body {
  /* background: #2058ab; */
  /* color: #fff; */
  text-align: center;
  padding: 10px;
  border: 0.1px solid #000;
}

.body-row {
  padding: 5px;
}

.mhModel-dropdown {
  width: 100%;
}

.form-group {
  margin: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
</style>