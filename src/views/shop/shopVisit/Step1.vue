<template>
  <div class="flex-layout visit-step1">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar
        left-arrow
        @click-left="goBack"
        :title="$t('shopVisit.InspectFA')"
      />
      <!-- SHOP HEADER -->
      <shop-header :shopInfo="query" />
    </div>
    <div class="flex-layout__body page-content">
      <!-- STEP1 -->
      <div class="step1-content">
        <van-row class="search-box" type="flex" align="center">
          <van-col :span="20" class="search-box_item">
            <van-search
              background="transparent"
              shape="round"
              v-model="facode"
              placeholder="Search By FA Code"
              @search="handleSearch"
            />
          </van-col>
          <van-col :span="4" class="scan-con">
            <van-icon name="scan" size="26" @click="handleScan" />
          </van-col>
        </van-row>
        <van-empty
          v-if="form.new_itemlist.length == 0"
          :description="$t('shopCommon.NoData')"
        />
        <!-- STEP1 ITEM BEGIN-->
        <div
          class="step1-item"
          v-for="(item, index) in form.new_itemlist"
          :key="index"
        >
          <h2 class="item-asset-code">
            <van-image
              width=".7rem"
              height=".7rem"
              style="margin-right: 12px"
              :src="item.new_fa_url"
              @click="viewShopImgs(item)"
            />
            <router-link
              :to="{
                name: 'newFA',
                query: {
                  id: item.new_asset_fa_id,
                  facode: item.new_code,
                },
              }"
            >
              {{ item.new_code }}
            </router-link>
          </h2>
          <div class="item-asset-imgs">
            <upload-imgs
              folder="VisitFAInspect"
              prefix="FAISP"
              :max="4"
              :fileList="item.new_urllist"
              :isTakePhoto="true"
              :hasWallet="true"
              :walletText="walletText"
              :showUploader="!isView"
              @fileUploadOk="(file) => handleFileUploadOk(file, item)"
              @fileDelete="(index) => handleFileDelete(index, item)"
            />
          </div>
          <div class="item-asset-status">
            <van-row type="flex">
              <van-col :span="20">
                <van-radio-group
                  v-model="item.new_fa_status"
                  direction="horizontal"
                  :disabled="isView"
                >
                  <van-radio class="fa-status-item" :name="1">{{
                    $t("shopVisit.Good")
                  }}</van-radio>
                  <van-radio class="fa-status-item" :name="2">{{
                    $t("shopVisit.NeedFix")
                  }}</van-radio>
                  <van-radio class="fa-status-item" :name="3">{{
                    $t("shopVisit.Scrap")
                  }}</van-radio>
                  <van-radio class="fa-status-item" :name="4">{{
                    $t("shopVisit.Lost")
                  }}</van-radio>
                </van-radio-group>
              </van-col>
              <van-col :span="4">
                <van-tag type="primary" v-if="item.new_byscan">by scan</van-tag>
              </van-col>
            </van-row>
          </div>
          <div class="item-asset-remark">
            <van-field
              :disabled="isView"
              v-model="item.new_remark"
              rows="2"
              autosize
              type="textarea"
              maxlength="200"
              placeholder="Please input remark"
              show-word-limit
            />
          </div>
        </div>
        <!-- STEP1 ITEM END -->
      </div>
    </div>
    <!-- ACTIONS -->
    <div class="flex-layout__footer" v-if="!isView">
      <van-row>
        <van-col span="12">
          <van-button
            block
            square
            color="#407FDC"
            :loading="saveLoading"
            @click="handleSubmit(1)"
          >
            {{ $t("shopCommon.Save") }}
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button
            block
            square
            color="#2058AB"
            :loading="submitLoading"
            @click="handleSubmit(3)"
          >
            {{ $t("shopCommon.Submit") }}
          </van-button>
        </van-col>
      </van-row>
    </div>
    <!-- PREV IMGS -->
    <prev-imgs ref="prevImgs" :imgs="imgs" />
  </div>
</template>

<script>
import ShopHeader from "./components/ShopHeader";
import UploadImgs from "@/components/UploadImgs";
import PrevImgs from "@/components/PrevImgs";
import {
  getFainspectList,
  getFainspectDetail,
  postSaveFainspect,
} from "@/api/shopVisit";
import { getEntityConditions } from "@/api/common";

export default {
  name: "VisitStep1",
  components: {
    ShopHeader,
    UploadImgs,
    PrevImgs,
  },
  data() {
    return {
      walletText: "",
      isSave: false,
      new_status: "",
      facode: "",
      query: {},
      form: {
        new_operation_type: 1,
        new_itemlist: [],
        new_visit_fa_inspectid: "",
        new_code: "",
        new_nogood_count: 0,
        new_nogood_percent: 0,
        new_remark: "",
        new_shop_id: "",
        new_total_quantity: 0,
        new_visit_total_id: "",
        new_name: "",
        new_status: 2,
      },
      new_itemlist: [],
      // btn loading
      saveLoading: false,
      submitLoading: false,
      // prev imgs
      imgs: [],
      isView: true,
      new_visit_status: "",
    };
  },
  created() {
    this.query = this.$route.query;
    const {
      new_shopid,
      new_name,
      new_code,
      new_visit_totalid,
      new_step_id,
      new_status,
    } = this.query;
    this.walletText = [new_code, new_name];
    this.form.new_shop_id = new_shopid;
    this.form.new_visit_total_id = new_visit_totalid;
    this.form.new_visit_fa_inspectid = new_step_id;
    this.new_status = new_status;
    if (this.form.new_visit_fa_inspectid) {
      this.handleGetDetail();
    } else {
      this.isView = false;
      this.handleGetShopAssetList();
    }
  },
  watch: {
    "form.new_itemlist": {
      handler(values) {
        var count = 0;
        values.map((item) => {
          if (item.new_fa_status != 1) {
            count++;
          }
        });
        this.form.new_nogood_count = count;
        this.form.new_nogood_percent = (count / values.length).toFixed(2);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // get shop assets
    handleGetShopAssetList(new_code = "") {
      // show loading
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const { new_shopid } = this.query;
      getFainspectList({
        new_code,
        new_shop_id: new_shopid,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          this.$toast.clear();
          var list = [];
          if (data.Items.length > 0) {
            data.Items.map((item) => {
              list.push({
                new_urllist: [],
                new_fa_url: item.new_dowmload_url,
                new_visit_fa_inspect_itemid: "",
                new_visit_fa_inspect_id: "",
                new_asset_fa_id: item.new_asset_faId,
                new_code: item.new_code,
                new_fa_status: 1,
                new_remark: "",
                new_shop_id: this.query.new_shopid,
                new_name: "",
                new_status: 2,
                new_byscan: 0,
              });
            });
          } else {
            if (!this.form.new_visit_fa_inspectid) {
              this.handleAutoSubmit();
            }
          }
          this.form.new_itemlist = list;
          // get fa for detail
          if (this.new_itemlist.length > 0) {
            this.form.new_itemlist.map((item) => {
              this.new_itemlist.map((nitem) => {
                if (item.new_asset_fa_id == nitem.new_asset_fa_id) {
                  item.new_urllist = nitem.new_item_urllist;
                  item.new_fa_url =
                    nitem.new_fa_urllist.length > 0
                      ? nitem.new_fa_urllist[0].new_download_url
                      : "";
                  item.new_visit_fa_inspect_itemid = "";
                  item.new_visit_fa_inspect_id =
                    this.form.new_visit_fa_inspectid;
                  item.new_asset_fa_id = nitem.new_asset_fa_id;
                  item.new_code = nitem.new_asset_fa_code;
                  item.new_fa_status = nitem.new_fa_status;
                  item.new_remark = nitem.new_remark;
                  item.new_shop_id = nitem.new_shop_id;
                  item.new_name = "";
                  item.new_status = nitem.new_status;
                }
              });
            });
          }
        }
      });
    },
    handleAutoSubmit() {
      this.$dialog
        .alert({
          title: "Tip",
          message: "No any FA in this shop, system submit auto!",
        })
        .then(() => {
          this.handleSubmit(3);
        });
    },
    // get shop asset detail
    handleGetDetail() {
      // show loading
      this.$toast.loading({ duration: 0, forbidClick: true });
      getFainspectDetail({
        new_visit_fa_inspect_id: this.form.new_visit_fa_inspectid,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          const items = data.Items;
          this.$toast.clear();
          this.isView = items.new_status == 0 ? true : false;
          if (items.new_status == 0) {
            this.form.new_itemlist = [];
            items.new_itemlist.map((nitem) => {
              this.form.new_itemlist.push({
                new_urllist: nitem.new_item_urllist,
                new_fa_url:
                  nitem.new_fa_urllist.length > 0
                    ? nitem.new_fa_urllist[0].new_download_url
                    : "",
                new_visit_fa_inspect_id: this.form.new_visit_fa_inspectid,
                new_asset_fa_id: nitem.new_asset_fa_id,
                new_code: nitem.new_asset_fa_code,
                new_fa_status: nitem.new_fa_status,
                new_remark: nitem.new_remark,
                new_shop_id: nitem.new_shop_id,
                new_status: nitem.new_status,
              });
            });
          } else {
            this.new_itemlist = items.new_itemlist || [];
            this.handleGetShopAssetList();
          }
        }
      });
    },
    // save shop asset
    handleSubmit(type) {
      // operation type
      if (type == 1) {
        this.form.new_operation_type = this.form.new_visit_fa_inspectid ? 2 : 1;
      } else {
        this.form.new_operation_type = 3;
      }
      this.form.new_itemlist.forEach((item) => {
        console.log(item.new_byscan);
      });
      // pic status must 4 pic
      var picstatus = true;
      if (type == 3) {
        this.form.new_itemlist.map((item) => {
          if (item.new_urllist.length == 0) {
            picstatus = false;
          }
        });
      }
      if (picstatus === false) {
        this.$toast.fail("1 photos must be taken!");
        return false;
      }
      // show loading
      this.$toast.loading({ duration: 0, forbidClick: true });
      type == 1 ? (this.saveLoading = true) : (this.submitLoading = true);
      postSaveFainspect(this.form)
        .then((res) => {
          this.$toast.clear();
          const { success, data } = res;
          if (success) {
            if (type == 1) {
              this.saveLoading = false;
              this.$toast.success("Save success");
              if (data.Items) {
                this.form.new_visit_fa_inspectid = data.Items;
              }
            } else {
              this.submitLoading = false;
              this.$toast.success("Submit success");
              this.isSave = true;
              this.goBack();
            }
          } else {
            type == 1
              ? (this.saveLoading = false)
              : (this.submitLoading = false);
            this.$toast.fail("Save error");
          }
        })
        .catch(() => {
          type == 1 ? (this.saveLoading = false) : (this.submitLoading = false);
          this.$toast.clear();
        });
    },
    // upload ok
    handleFileUploadOk(file, item) {
      item.new_urllist.push({
        new_download_url: file.url,
        new_keyword: "",
        new_description: "",
        new_type: "",
        new_filename: file.name,
        new_filesize: 0,
      });
    },
    // delete img
    handleFileDelete(index, item) {
      item.new_urllist.splice(index, 1);
    },
    // PREV SHOP IMGS
    viewShopImgs(record) {
      if (record.new_fa_url) {
        this.$toast.loading({ duration: 0 });
        getEntityConditions({
          entityName: "new_attachment",
          fields: "new_download_url",
          wheres: {
            statecode: 0,
            new_entity_id: record.new_asset_fa_id,
            new_entity_name: "new_asset_fa",
          },
        })
          .then((res) => {
            this.$toast.clear();
            const { data, success } = res;
            if (success) {
              var list = [];
              data.map((item) => {
                list.push(item.new_download_url);
              });
              this.imgs = list;
              this.$refs.prevImgs.show(0);
            }
          })
          .catch(() => {
            this.$toast.clear();
          });
      } else {
        this.$toast("No image!");
      }
    },
    handleScan() {
      this.$scan()
        .then((result) => {
          // 得到的内容为逗号分隔的两个字符串分别代表faCode和shopCode
          const [faCode, shopCode] = result.split(",");
          const target = this.form.new_itemlist.find(
            (item) => item.new_code === faCode
          );
          target.new_byscan = 1;
          this.facode = faCode;
          this.handleSearch(faCode);
        })
        .catch(() => {});
    },
    handleSearch(faCode) {
      const { new_itemlist } = this.form;
      if (new_itemlist)
        this.form.new_itemlist = new_itemlist.sort((item) => {
          return item.new_code.indexOf(faCode) > -1 ? -1 : 0;
        });
    },
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      if (!this.isSave) {
        this.$dialog
          .confirm({
            title: "Tip",
            message: this.$t("shopCommon.LeavePageTip"),
          })
          .then(() => {
            next(true);
          })
          .catch(() => {
            next(false);
          });
      } else {
        next(true);
      }
    }, 200);
  },
};
</script>
<style lang="scss" scoped>
.visit-step1 {
  .scan-con {
    text-align: center;
  }
  .search-box_item {
    padding: 0 10px;
  }
  .step1-content {
    background: #f5f5f5;
    .step1-item {
      background: #fff;
      padding: 24px;
      padding-right: 8px;
      margin-bottom: 24px;
      .item-asset-code {
        display: flex;
        align-items: center;
        font-size: $font28;
        color: #169bd5;
        margin-bottom: 24px;
        font-weight: bold;
        a {
          color: #169bd5;
        }
      }
      .item-asset-imgs {
        margin-bottom: 24px;
      }
      .item-asset-status {
        margin-bottom: 24px;
        .fa-status-item {
          font-size: $font24;
          margin-bottom: 12px;
          margin-right: 6px;
        }
      }
      .item-asset-remark {
        border: 1px solid #eee;
      }
    }
  }
}
</style>