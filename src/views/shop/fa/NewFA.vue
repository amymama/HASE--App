<template>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      fixed
      @click-left="clickLeft"
    ></van-nav-bar>
    <!-- 选择区域部分 -->
    <SelectShopRow
      class="page-hasnav"
      v-if="!disabled && !editable && Object.keys(shopItem).length"
      :shopItem="shopItem"
      @select="handleShopSelect"
    />
    <!-- 表单部分 -->
    <div
      :class="{
        'page-hasnav': disabled || editable || !allowUpload,
      }"
    >
      <div v-show="editable">
        <van-cell-group :title="$t('shopFA.FixedAssetCode')">
          <van-cell :title="shopItem.facode" />
        </van-cell-group>
      </div>

      <van-cell-group :title="$t('shopFA.ShopInfo')">
        <van-cell :title="$t('shopFA.ShopCode')" :value="shopItem.new_code" />
        <van-cell
          :title="$t('shopFA.ShopName')"
          :value="shopItem.new_name"
        ></van-cell>
        <van-cell
          :title="$t('shopFA.Channel')"
          :value="shopItem.new_channel_name"
        ></van-cell>
        <van-cell
          :title="$t('shopPosm.Region')"
          :value="shopItem.regionname"
        ></van-cell>
        <van-cell
          :title="$t('shopFA.Area')"
          :value="shopItem.areaname"
        ></van-cell>
        <van-cell
          :title="$t('shopFA.Province')"
          :value="shopItem.provincename"
        ></van-cell>
        <van-cell
          :title="$t('shopFA.District')"
          :value="shopItem.districtname"
        ></van-cell>
        <van-cell
          :title="$t('shopFA.CustomerCode')"
          :value="shopItem.new_customer_code"
        ></van-cell>
        <van-cell
          :title="$t('shopFA.ShopAddress')"
          :value="shopItem.new_address"
          value-class="size-12"
        ></van-cell>
        <van-cell
          :title="$t('shopFA.CustomerName')"
          :value="shopItem.customername"
        ></van-cell>
      </van-cell-group>
      <!-- <p class="form-title">{{ $t("shopMenu.NewFA") }}</p> -->
      <van-cell-group :title="$t('shopMenu.NewFA')" />
      <van-form @submit="handleSubmit">
        <van-field
          readonly
          clickable
          input-align="right"
          :disabled="disabled || !allowUpload"
          :label="$t('shopFA.InstallDate')"
          :placeholder="$t('shopFA.InstallDate')"
          @click="(allowUpload || !disabled) && showPopup('date')"
          v-model="param.installdate"
          :rules="[
            {
              required: true,
              message: `${$t('shopCommon.PleaseSelect')} ${$t(
                'shopFA.InstallDate'
              )}`,
            },
          ]"
        />
        <van-calendar
          :min-date="new Date(0)"
          :default-date="new Date()"
          v-model="dateVisible"
          @confirm="timeSelect"
        />
        <van-field
          :value="findItem('sub', param.new_asset_category_id)"
          readonly
          clickable
          input-align="right"
          :disabled="disabled || editable || !allowUpload"
          :label="$t('shopFA.FixedAssetSub')"
          :placeholder="$t('shopFA.FixedAssetSub')"
          @click="
            ((!disabled && !editable) || (!editable && allowUpload)) &&
              showPopup('sub')
          "
          :rules="[
            {
              required: true,
              message: $t('select.SelectFixedSub'),
            },
          ]"
        />
        <van-action-sheet
          style="height: 40%"
          :close-on-click-action="true"
          v-model="subVisible"
          :actions="subOpts"
          @select="(item) => handleSelect(0, item)"
        />
        <van-field
          :value="findItem('asset', param.new_asset_type_id)"
          readonly
          clickable
          input-align="right"
          :disabled="disabled || editable || !allowUpload"
          :label="$t('shopFA.AssetType')"
          :placeholder="$t('shopFA.AssetType')"
          @click="
            ((!disabled && !editable) || (!editable && allowUpload)) &&
              showPopup('asset')
          "
          :rules="[{ required: true, message: $t('select.SelectAssetType') }]"
        />
        <van-action-sheet
          style="height: 40%"
          :close-on-click-action="true"
          v-model="assetVisible"
          :actions="assetOpts"
          @select="(item) => handleSelect(1, item)"
        />
        <van-field
          v-model="param.remark"
          input-align="right"
          :label="$t('shopFA.Remark')"
          :placeholder="$t('shopFA.Remark')"
          :disabled="disabled || !allowUpload"
        />
        <!-- <van-field
          v-model="param.new_size"
          :label="$t('shopFA.Size')"
          :placeholder="$t('shopFA.LWH')"
          :disabled="disabled"
          input-align="right"
          :rules="[{ required: true, message: 'Please Input Size' }]"
        /> -->
        <van-field
          type="number"
          v-model="size.length"
          :label="$t('shopFA.Length')"
          :placeholder="$t('shopFA.Length')"
          :disabled="disabled || !allowUpload"
          input-align="right"
          :rules="[
            {
              required: true,
              message: `${$t('select.InputTip')} ${$t('shopFA.Length')}`,
            },
          ]"
        />
        <van-field
          type="number"
          v-model="size.width"
          :label="$t('shopFA.Width')"
          :placeholder="$t('shopFA.Width')"
          :disabled="disabled || !allowUpload"
          input-align="right"
          :rules="[
            {
              required: true,
              message: `${$t('select.InputTip')} ${$t('shopFA.Width')}`,
            },
          ]"
        />
        <van-field
          type="number"
          v-model="size.height"
          :label="$t('shopFA.Height')"
          :placeholder="$t('shopFA.Height')"
          :disabled="disabled || !allowUpload"
          input-align="right"
          :rules="[
            {
              required: true,
              message: `${$t('select.InputTip')} ${$t('shopFA.Height')}`,
            },
          ]"
        />
        <van-field
          :value="findItem('class', param.assetclass)"
          readonly
          clickable
          :disabled="disabled || !allowUpload"
          input-align="right"
          :label="$t('shopFA.Class')"
          :placeholder="$t('shopFA.Class')"
          @click="(allowUpload || !disabled) && showPopup('class')"
          :rules="[
            {
              required: true,
              message: `${$t('select.SelectTip')} ${$t('shopFA.Class')}`,
            },
          ]"
        />
        <van-action-sheet
          style="height: 40%"
          :close-on-click-action="true"
          v-model="classVisible"
          :actions="classOpts"
          @select="(item) => handleSelect(2, item)"
        />
        <van-field
          v-model="fileSuccess"
          :disabled="disabled || !allowUpload"
          :label="$t('shopFA.FirstInstalledImage')"
          :placeholder="$t('shopFA.FirstInstalledImage')"
          :rules="[{ required: true, message: $t('select.UploadImage') }]"
        >
          <template #input>
            <UploadImgs
              :disabled="disabled || !allowUpload"
              folder="asset"
              prefix="NewFA"
              :max="4"
              :fileList="fileList"
              :walletText="walletText"
              :hasWallet="true"
              @fileUploadOk="handleUpload"
              @fileDelete="handleFileDelete"
            />
          </template>
        </van-field>
        <van-field
          v-model="param.designimage"
          :disabled="true"
          input-align="right"
          :label="$t('shopFA.DesignImg')"
          :placeholder="$t('shopFA.DesignPlz')"
        ></van-field>
        <van-field
          v-if="showQTY"
          type="number"
          :disabled="disabled || !allowUpload"
          input-align="right"
          v-model="param.new_max_display_quantity"
          :label="$t('shopFA.MaxDisplayQTY')"
          label-width="10em"
          :placeholder="$t('shopFA.MaxDisplayQTY')"
          :rules="[
            {
              required: true,
              message: $t('select.InputTip') + $t('shopFA.MaxDisplayQTY'),
            },
          ]"
        />
        <van-button
          block
          type="info"
          native-type="submit"
          v-if="allowUpload"
          :loading="loading"
          >{{ $t("shopCommon.Submit") }}</van-button
        >
      </van-form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import UploadImgs from "@/components/UploadImgs";
import SelectShopRow from "@/components/SelectShop";
import { formatTableDate } from "@/utils";
import { getEntityConditions, getDict } from "@/api/common";
import { getShopList } from "@/api/shop";
import { postAddFA, getFADetail, postUpdateFA } from "@/api/asset";
import { mapGetters } from "vuex";
export default {
  props: {
    assetFAId: {
      type: String,
      default: "", // 详情页使用
    },
    type: {
      type: String,
      default: "edit", // 接收路由参数 可选值 edit detail
    },
    facode: {
      type: String,
      default: "", // 编辑页使用
    },
  },
  data() {
    return {
      loading: false,
      dateVisible: false,
      subVisible: false,
      assetVisible: false,
      classVisible: false,
      shopVisible: false,
      showQTY: false, // 显示QTY输入框
      fileSuccess: "success", // 图片是否已上传
      subOpts: [],
      assetOpts: [],
      classOpts: [],
      fileList: [], // 图片列表
      walletText: [],
      param: {
        new_asset_category_id: "",
        new_asset_type_id: "",
        assetclass: "",
      },
      size: {
        length: "",
        width: "",
        height: "",
      },
      shopItem: {},
    };
  },
  components: {
    UploadImgs,
    SelectShopRow,
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["auths"]),
    editable() {
      return !!this.facode && this.type === "edit";
    },
    disabled() {
      return !!this.assetFAId && this.type === "detail";
    },
    // 当前用户是否存在更新权限
    uploadPermission() {
      const permissions = this.auths || [];
      if (permissions.length) {
        let allowFlag =
          permissions.findIndex((item) => item.perms === "NewFA:Update") > -1;
        return allowFlag;
      }
      return false;
    },
    allowUpload() {
      // true 表示查看详情状态或无权限更新状态
      // false 新建
      if (this.facode || this.assetFAId) {
        // 编辑详情
        return this.uploadPermission;
      }
      return true;
    },
  },
  methods: {
    formatTableDate,
    /**
     * @param {string} type 对应prefixOpts，表示prefix
     * @param {string} id 对应actionSheet选中value
     */
    findItem(type, id) {
      const item = this[`${type}Opts`].find((item) => item.value === id);
      if (type === "class") console.log(type, item);
      switch (type) {
        case "sub":
          this.showQTY = item && item.new_isbooth;
          this.param.new_asset_category_id = item && item.value;
          break;
        case "asset":
          this.param.new_asset_type_id = item && item.value;
          break;
        default:
          break;
      }
      return item && item.name;
    },
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });

      const cb = () => {
        const {
          new_shopid,
          subchannel,
          new_code,
          new_address,
          new_name,
          new_channel_name,
          regionname,
          areaname,
          provincename,
          districtname,
          new_customer_code,
          customername,
        } = this.$route.query;
        if (new_shopid) {
          this.shopItem = {
            new_shopid,
            subchannel,
            new_code,
            new_address,
            new_name,
            new_channel_name,
            regionname,
            areaname,
            provincename,
            districtname,
            new_customer_code,
            customername,
          };
          this.walletText = [new_code, new_name];
          return Promise.resolve();
        } else {
          return this.editable || this.disabled
            ? this.initEditInfo()
            : this.initShop();
        }
      };
      Promise.all([
        this.initSubCategory(),
        this.initAssetType(),
        this.initClassLevel(),
        cb(),
      ])
        .then(() => toast.clear())
        .catch(() => toast.clear());
    },
    initShop() {
      return getShopList({
        itemsperpage: 10,
        page: 1,
        orderby: "desc",
      })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const { length } = data.Items;
            if (length > 0) {
              const randomIndex = Math.floor(Math.random() * length);
              this.shopItem = data.Items[randomIndex];
              const { new_name, new_code } = this.shopItem;
              this.walletText = [new_code, new_name];
            }
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initEditInfo() {
      return getFADetail({ assetfaid: this.assetFAId })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const bindKey = [
              "installdate",
              "new_asset_category_id",
              "new_asset_type_id",
              "shopcode",
              "new_size",
              "new_max_display_quantity",
              "assetclass",
              "designimage",
            ];
            const detail = {};
            const category = this.assetOpts.find(
              (item) => item.value === data.new_asset_category_id
            );
            this.showQTY = category && category.new_isbooth;
            this.shopItem = Object.assign(this.shopItem, {
              facode: data.facode,
              new_code: data.shopcode,
              new_name: data.shopname,
              new_shopid: data.new_shopid,
              new_address: data.shopaddress,
              new_customer_code: data.customercode,
              customername: data.customername,
              regionname: data.new_region_name,
              areaname: data.area,
              provincename: data.province,
              districtname: data.district,
              new_channel_name: data.new_channel_name,
              subchannel: data.new_sub_channel_name,
            });
            const { new_name, new_code } = this.shopItem;
            this.walletText = [new_code, new_name];
            for (let key of bindKey) {
              if (key === "new_size") {
                const [length, width, height] = data[key].split("*");
                this.size = { length, width, height };
                continue;
              }
              if (key === "installdate") {
                detail[key] = formatTableDate(data[key]);
                continue;
              }
              detail[key] = data[key];
            }
            this.fileSuccess =
              data.installimage && data.installimage.length > 0
                ? "success"
                : "";
            this.fileList = data.installimage || [];
            this.param = detail;
          }
        })
        .catch((err) => console.log(err));
    },
    // 初始化SubCategory下拉列表选项 new_asset_category
    initSubCategory() {
      return getEntityConditions({
        entityName: "new_asset_category",
        fields: "new_asset_categoryId, new_name, new_isbooth",
        wheres: {
          new_asset_category_parent: 0,
        }, // 筛选FA条件
      })
        .then((res) => {
          if (res.success) {
            const subOpts = [];
            res.data.forEach((item) =>
              subOpts.push({
                name: item.new_name,
                value: item.new_asset_categoryId,
                new_isbooth: item.new_isbooth,
              })
            );
            this.subOpts = subOpts;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    // 初始化AssetType下拉列表选项 new_asset_type, 可直接调用获取列表接口
    initAssetType() {
      return getEntityConditions({
        entityName: "new_asset_type",
        fields: "new_asset_typeId, new_name",
      })
        .then((res) => {
          if (res.success) {
            const assetOpts = [];
            res.data.forEach((item) =>
              assetOpts.push({
                name: item.new_name,
                value: item.new_asset_typeId,
              })
            );
            this.assetOpts = assetOpts;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    // Class登记下拉框数据初始化
    initClassLevel() {
      return getDict({ key: "AssetClass" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const classOpts = [];
            data.Items.forEach((item) =>
              classOpts.push({
                name: item.text,
                value: item.value,
              })
            );
            this.classOpts = classOpts.sort((prev, current) =>
              prev.name > current.name ? 1 : -1
            );
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    uploadClick(e) {
      e.stopPropagation();
      return !this.disabled;
    },
    handleSelect(type, item) {
      let action;
      switch (type) {
        case 0:
          action = "new_asset_category_id";
          break;
        case 1:
          action = "new_asset_type_id";
          break;
        case 2:
          action = "assetclass";
          break;
      }
      this.param[action] = item.value;
    },
    handleShopSelect(shop) {
      this.shopItem = shop;
      const { new_name, new_code } = this.shopItem;
      this.walletText = [new_code, new_name];
      this.shopVisible = false;
    },
    handleSubmit() {
      const { new_asset_category_id, new_asset_type_id } = this.param;
      const subcategory = this.subOpts.find(
        (item) => item.value === new_asset_category_id
      );
      const assetType = this.assetOpts.find(
        (item) => item.value === new_asset_type_id
      );
      if (this.editable) {
        this.param.facode = this.facode;
        this.param.assetId = this.assetFAId;
      }
      this.param.assetsubcategory = subcategory && subcategory.name;
      this.param.assettype = assetType && assetType.name;
      this.param.assetmodellist = [];
      this.param.installImage = this.fileList;
      if (Object.keys(this.shopItem).lenth === 0) {
        this.$toast.fail(this.$t("select.SelectShop"));
        return;
      }
      const {
        new_shopid,
        subchannel,
        new_code,
        new_address,
        new_name,
        new_channel_name,
        regionname,
        areaname,
        provincename,
        districtname,
        new_customer_code,
        customername,
      } = this.shopItem;
      const shopItem = {
        new_shopId: new_shopid,
        new_sub_channel_name: subchannel,
        shopcode: new_code, // 表示shopcode
        shopaddress: new_address,
        shopname: new_name,
        new_channel_name,
        new_region_name: regionname,
        area: areaname,
        province: provincename,
        district: districtname,
        customercode: new_customer_code,
        customername,
      };
      const { length, width, height } = this.size;
      this.param.new_size = `${length}*${width}*${height}`;
      this.param.installdate = moment(new Date(this.param.installdate)).format(
        "YYYY-MM-DD"
      );
      this.loading = true;
      const api = this.editable ? postUpdateFA : postAddFA;
      api(Object.assign(this.param, shopItem))
        .then((res) => {
          {
            this.loading = false;
          }
          if (res.success) {
            this.$toast.success("Success!");
          } else {
            this.$toast.fail("Error!");
          }
        })
        .catch(() => {
          this.loading = false;
          this.$toast.fail("Error!");
        });
    },
    handleUpload(file) {
      this.fileSuccess = "success";
      this.fileList.push({
        new_download_url: file.url,
        new_keyword: "",
        new_description: "",
        new_type: "",
        new_filename: file.name,
        new_filesize: 0,
      });
    },
    handleFileDelete(index) {
      this.fileList.splice(index, 1);
      this.fileSuccess = this.fileList.length > 0 ? "success" : "";
    },
    clickLeft() {
      this.$router.go(-1);
    },
    showPopup(type) {
      this[`${type}Visible`] = true;
    },
    timeSelect(date) {
      this.param.installdate = moment(date).format("YYYY-MM-DD");
      this.dateVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.size-12 {
  font-size: 14px;
}
.form-title {
  margin: 0;
  padding: 32px 16px 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  line-height: 16px;
}
</style>
<style lang="scss">
.van-field__error-message {
  text-align: right;
}
</style>