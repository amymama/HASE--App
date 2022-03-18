<template>
  <div class="flex-layout shop-master-data">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar left-arrow @click-left="goBack" :title="$t('shopMaster.ShopMasterData')" />
    </div>
    <div class="flex-layout__body page-content">
      <van-tabs v-model="tabActive" swipeable>
        <van-tab title="SHOP  Master Data">
          <van-form ref="formData" alidate-first @submit="submit" label-width="3.7rem">
            <div class="shop-form-group">
              <van-field
                input-align="right"
                v-model="form.new_name"
                :label="$t('shopMaster.ShopName')"
                :placeholder="$t('shopCommon.PleaseInput')"
                maxlength="200"
                required
                :rules="[{ required: true }]"
              />
              <van-field
                input-align="right"
                v-model="form.new_short_name"
                :label="$t('shopMaster.ShopShortName')"
                :placeholder="$t('shopCommon.PleaseInput')"
                maxlength="100"
              />
              <van-field
                input-align="right"
                required
                v-model="form.new_local_shop_name"
                :label="$t('shopMaster.LocalShopName')"
                :placeholder="$t('shopCommon.PleaseInput')"
                maxlength="200"
                :rules="[{ required: true }]"
              />
              <van-field required input-align="right" :label="$t('shopMaster.WhetherAQUA')">
                <template #input>
                  <van-radio-group
                    style="margin-right: -0.3rem"
                    v-model="form.new_aqua_enterin"
                    direction="horizontal"
                  >
                    <van-radio :name="true">
                      {{
                        $t("shopCommon.Yes")
                      }}
                    </van-radio>
                    <van-radio :name="false">
                      {{
                        $t("shopCommon.No")
                      }}
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field
                input-align="right"
                v-if="form.new_aqua_enterin"
                required
                readonly
                clickable
                :value="form.new_joinin_date"
                :label="$t('shopMaster.JoinInDate')"
                :placeholder="$t('shopCommon.PleaseSelect')"
                @click="showDate = true"
                :rules="[{ required: true }]"
              />
              <van-field
                input-align="right"
                v-if="form.new_aqua_enterin"
                readonly
                required
                clickable
                :value="form.new_shop_type"
                :label="$t('shopMaster.ShopType')"
                :placeholder="$t('shopCommon.PleaseSelect')"
                @click="showShopType = true"
                :rules="[{ required: true }]"
              />
              <van-field
                input-align="right"
                readonly
                clickable
                :value="form.new_customer_code"
                :label="$t('shopMaster.CustomerCode')"
                :placeholder="$t('shopCommon.PleaseSelect')"
                @click="$refs.selectCustomer.show()"
              >
                <template #right-icon>{{ (new_mdm_accountgroup) }}</template>
              </van-field>
              <van-field
                input-align="right"
                readonly
                clickable
                :value="form.new_local_shop_code"
                :label="$t('shopMaster.MDMShipToCode')"
                :placeholder="$t('shopCommon.PleaseSelect')"
                @click="showPartner = true"
              />
              <van-cell
                class="van-cell--required"
                :title="$t('shopMaster.GtmChannel')"
                :value="form.new_channel_name" />
              <van-field
                clearable
                input-align="right"
                v-model="form.new_owner"
                :label="$t('shopMaster.ShopOwner')"
                placeholder="Input shop owner"
                maxlength="50"
              />
              <van-field
                clearable
                input-align="right"
                v-model="form.new_owner_phone"
                :label="$t('shopMaster.ShopOwnerPhone')"
                placeholder="Input shop owner phone"
                maxlength="30"
                type="tel"
              />
              <van-field
                clearable
                input-align="right"
                v-model="form.new_shop_manager"
                :label="$t('shopMaster.ShopManager')"
                placeholder="Input shop manager"
                maxlength="50"
              />
              <van-field
                clearable
                input-align="right"
                v-model="form.new_shopmanager_phone"
                :label="$t('shopMaster.ShopManagerPhone')"
                placeholder="Input shop manager phone"
                maxlength="30"
                type="tel"
              />
              <van-field :label="$t('shopMaster.WhetherVist')" input-align="right" required>
                <template #input>
                  <van-radio-group
                    style="margin-right: -0.3rem"
                    v-model="form.new_whether_visit"
                    direction="horizontal"
                  >
                    <van-radio :name="true">
                      {{
                        $t("shopCommon.Yes")
                      }}
                    </van-radio>
                    <van-radio :name="false">
                      {{
                        $t("shopCommon.No")
                      }}
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field
                required
                readonly
                clickable
                input-align="right"
                :value="productValues"
                :label="$t('shopMaster.Product')"
                :placeholder="$t('shopCommon.PleaseSelect')"
                @click="$refs.selectProdduct.show(form.new_productList)"
                :rules="[{ required: true }]"
              />
              <van-field
                required
                input-align="right"
                v-model="form.new_shop_size"
                :label="$t('shopMaster.ShopSize')"
                :placeholder="$t('shopCommon.PleaseInput')"
                type="digit"
                maxlength="6"
                :rules="[{ required: true }]"
              />
              <van-field
                required
                readonly
                clickable
                input-align="right"
                :value="new_shop_location"
                :label="$t('shopMaster.ShopLocation')"
                :placeholder="$t('shopCommon.PleaseSelect')"
                @click="showLocation = true"
                :rules="[{ required: true }]"
              />
            </div>
            <div class="shop-group__header">
              <div class="shop-group__title">GPS</div>
              <div class="shop-group__value" @click="$refs.shopGps.show()">
                <van-icon name="location-o" />
              </div>
            </div>
            <div class="shop-form-group">
              <van-cell :title="$t('shopMaster.Longitude')" :value="form.new_latitude" />
              <van-cell :title="$t('shopMaster.Latitude')" :value="form.new_longitude" />
              <van-cell :title="$t('shopMaster.Address')" :value="form.new_address" />
            </div>
            <div class="shop-group__header">
              <div class="shop-group__title">{{ $t("shopMaster.ShopNetwork") }}</div>
            </div>
            <div class="shop-form-group">
              <van-cell
                class="van-cell--required"
                :title="$t('shopMaster.ShopSaleRegion')"
                :value="saleRegion" />
              <van-field
                input-align="right"
                clearable
                required
                readonly
                clickable
                :value="saleNetwork"
                :label="$t('shopMaster.ShopNetwork')"
                :placeholder="$t('shopCommon.PleaseSelect')"
                :rules="[{ required: true }]"
              />
              <van-field
                v-model="form.new_address_detail"
                input-align="right"
                required
                clearable
                rows="2"
                autosize
                :label="$t('shopMaster.AddressDetail')"
                type="textarea"
                maxlength="200"
                show-word-limit
                :rules="[{ required: true }]"
              />
            </div>
            <div class="shop-group__header">
              <div class="shop-group__title">{{ $t("shopMaster.ShopPhotos") }}</div>
            </div>
            <div class="shop-form-group">
              <van-tabs v-model="active">
                <van-tab v-for="(item, index) in photoTypes" :key="index" :title="item.title">
                  <div class="shop-upload-item"></div>
                </van-tab>
              </van-tabs>
              <div class="shop-upload-box">
                <upload-imgs
                  folder="Shop"
                  :prefix="photoTypes[active].typeName"
                  :max="4"
                  :fileList="photoTypes[active].list"
                  @fileUploadOk="handleFileUploadOk"
                  @fileDelete="handleFileDelete"
                />
              </div>
            </div>
          </van-form>
          <!-- SELECT JOIN IN DATE -->
          <van-popup v-model="showDate" round position="bottom">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              title="Select Date"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="onConfirmDate"
              @cancel="showData = false"
            />
          </van-popup>
          <!-- GTM CHANNEL -->
          <van-popup v-model="showChannel" round position="bottom">
            <van-picker
              title="Select Channel"
              show-toolbar
              :columns="channelList"
              @confirm="onConfirmChannel"
              @cancel="showChannel = false"
            />
          </van-popup>
          <!-- GTM SHOP TYPE -->
          <van-popup v-model="showShopType" round position="bottom">
            <van-picker
              title="Select Shop Type"
              show-toolbar
              :columns="shopTypeList"
              @confirm="onConfirmShopType"
              @cancel="showShopType = false"
            />
          </van-popup>
          <!-- SHOP LOCATION -->
          <van-popup v-model="showLocation" round position="bottom">
            <van-picker
              title="Select Location"
              show-toolbar
              :columns="locationList"
              @confirm="onConfirmLocation"
              @cancel="showLocation = false"
            />
          </van-popup>
          <!-- CUSTOMER PARTNER -->
          <van-popup v-model="showPartner" round position="bottom">
            <van-picker
              title="Select local shop code"
              show-toolbar
              :columns="partnerList"
              @confirm="onConfirmPartner"
              @cancel="showPartner = false"
            />
          </van-popup>
          <!-- SELECT CUSTOMER -->
          <select-customer ref="selectCustomer" @selectCustomerOk="handleSelectCustomerOk" />
          <!-- SELECT PRODUCT CATEGORYS -->
          <select-product ref="selectProdduct" @selectProductOk="handleSelectProductOk" />
          <!-- Modal -->
          <shop-gps ref="shopGps" @ok="handleOk" :GPSeditable="GPSeditable" />
        </van-tab>
        <van-tab title="Contact" class="shop-master-contact">
          <van-cell-group v-if="contactList.length > 0">
            <van-cell
              v-for="(item, index) in contactList"
              :key="index"
              center
              :title="item.new_realname"
              :label="item.new_roles"
              @click="callPhone()"
            >
              <template #default>
                <span @click.stop="callPhone(item.new_phone)">{{ item.new_phone }}</span>
              </template>
              <template #right-icon>
                <van-icon name="phone-o" @click.stop="callPhone(item.new_phone)" />
              </template>
            </van-cell>
          </van-cell-group>
          <van-empty v-else :description="$t('shopCommon.NoData')" />
        </van-tab>
      </van-tabs>
    </div>
    <div class="flex-layout__footer" v-if="tabActive == 0">
      <van-button
        v-if="form.new_status == 0 && form.new_approve_status == 3"
        block
        square
        color="#407FDC"
        :loading="closeLoading"
        @click="handleCloseShop"
        v-action:Shop:Close
      >Close Shop</van-button>
      <van-button
        :disabled="form.new_approve_status == 2 && form.new_status == 2"
        block
        square
        type="info"
        @click="onSubmit"
        color="#2058AB"
      >Update</van-button>
    </div>
  </div>
</template>

<script>
import SelectCustomer from "./components/SelectCustomer";
import SelectProduct from "./components/SelectProduct";
import UploadImgs from "@/components/UploadImgs";
import ShopGps from "./components/ShopGps";
import { getEntityConditions, getDict } from "@/api/common";
import {
  getShopLocation,
  getShopSize,
  postShopOperation,
  getShopDetail,
  postCloseShop,
  getSaleregionTreelist,
  getPartnerByCustomerNo
} from "@/api/shop";

export default {
  name: "ShopMasterData",
  components: {
    SelectCustomer,
    SelectProduct,
    UploadImgs,
    ShopGps,
  },
  data() {
    return {
      // tabs
      tabActive: "",
      // TAB-1
      form: {
        new_operation_type: "2",
        new_shop_type: "",
        new_branch_name: "",
        new_productList: [],
        new_urllist: [],
        new_shopid: "",
        new_code: "",
        new_address: "",
        new_customer_code: "",
        new_customer_id: "",
        new_channel_id: "",
        new_channel_parentid: "",
        new_channel_name: "",
        new_channel_parent_short_name: "",
        new_latitude: "",
        new_longitude: "",
        new_owner_phone: "",
        new_owner: "",
        new_shop_manager: "",
        new_shopmanager_phone: "",
        new_short_name: "",
        new_shop_size: "",
        new_shop_size_id: "",
        new_shop_area: "",
        new_aqua_enterin: true,
        new_shop_location_id: "",
        new_shop_location: "",
        new_region_id: "",
        new_region_short_name: "",
        new_area_id: "",
        new_province_id: "",
        new_district_id: "",
        new_address_detail: "",
        new_whether_visit: true,
        new_joinin_date: "",
        new_local_shop_code: "",
        new_local_shop_name: "",
        new_name: "",
        new_status: "",
        new_approve_status: "",
        new_shop_status: "",
      },
      new_mdm_accountgroup: '',
      // btn loading
      closeLoading: false,
      saveLoading: false,
      // select date
      showDate: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      // select customer
      showCustomer: false,
      // select saleregion
      showSaleRegion: false,
      saleRegionTree: [],
      saleRegion: "",
      // select salenetwork
      showSaleNetwork: false,
      saleNetworkTree: [],
      saleNetwork: "",
      // select shop location
      showLocation: false,
      new_shop_location: "",
      locationList: [],
      // select product categorys
      showProduct: false,
      productValues: "",
      // shop size
      sizeList: [],
      // select channel
      showChannel: false,
      channelList: [],
      // select shop type
      showShopType: false,
      shopTypeList: [],
      // select customer partner
      showPartner: false,
      partnerList: [],
      // shop photos
      active: 0,
      photoTypes: [
        {
          title: this.$t("shopMaster.ShopSign"),
          type: "1",
          typeName: "Sign",
          list: [],
        },
        {
          title: this.$t("shopMaster.ShopDoor"),
          type: "2",
          typeName: "Door",
          list: [],
        },
        {
          title: this.$t("shopMaster.ShopInside"),
          type: "3",
          typeName: "Inside",
          list: [],
        },
      ],
      // TAB-2
      contactList: [],
      GPSeditable: true
    };
  },
  created() {
    // get shop info
    if (this.$route.query.shop_id) {
      this.form.new_shopid = this.$route.query.shop_id;
      this.handleGetShopDetail();
      this.initData();
    }
  },
  watch: {
    "form.new_shop_size": {
      handler() {
        this.setShopSize();
      },
      immediate: true,
    },
    sizeList: {
      handler(value) {
        this.setShopSize(value);
      },
      immediate: true,
    },
  },
  methods: {
    // Init data for shop
    initData() {
      // SALEREAGION TREE LIST
      const getRegions = new Promise((resolve, reject) => {
        getSaleregionTreelist()
          .then((res) => {
            const { data, success } = res;
            if (success) {
              this.saleRegionTree = data.Items;
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });
      // CHANNEL LIST
      const getChannels = new Promise((resolve, reject) => {
        // get shop channel
        getEntityConditions({
          entityName: "new_channel",
          fields: "new_name,new_channelid,new_parentid,new_short_name,new_code",
          wheres: {
            new_status: "0",
            new_parentid: "is not null",
          },
        })
          .then((res) => {
            const { data, success } = res;
            if (success) {
              this.channelList = data || [];
              this.channelList.length > 0 &&
                this.channelList.map((item) => {
                  item.text = item.new_name;
                });
              resolve(this.channelList);
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });

      // SHOP SIZE
      const getShopsizes = new Promise((resolve, reject) => {
        getShopSize({
          page: 1,
          itemsPerPage: 100,
        })
          .then((res) => {
            const { data, success } = res;
            if (success) {
              this.sizeList = data.Items;
              resolve(this.sizeList);
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });

      // SHOP LOCATION
      const getLocation = new Promise((resolve, reject) => {
        getShopLocation({
          new_status: 0,
          page: 1,
          itemsPerPage: 100,
        })
          .then((res) => {
            const { data, success } = res;
            if (success) {
              this.locationList = [];
              data.Items.map((item) => {
                this.locationList.push({
                  value: item.new_shop_locationid,
                  text: item.new_name,
                  new_level: item.new_level,
                });
              });
              resolve(this.locationList);
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });

      // SHOP TYPE
      const getShopType = new Promise((resolve, reject) => {
        getDict({ key: "ShopType" })
          .then((res) => {
            const { data, success } = res;
            if (success) {
              this.shopTypeList = data.Items;
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });

      // GET SHOP BASE DATA
      this.$toast.loading({ duration: 0, forbidClick: true });
      Promise.all([
        getRegions,
        getChannels,
        getShopType,
        getShopsizes,
        getLocation
      ]).then(() => {
        this.$toast.clear();
      })
      .catch((e) => {
        console.log(e);
      });
    },
    handleGetPartner(code) {
      this.partnerList = []
      getPartnerByCustomerNo({
        customerno: code
      }).then((res) => {
        const { success, data } = res
        if (success) {
          data.length > 0 && data.map((item) => {
            this.partnerList.push({
              value: item,
              text: item
            });
          });
        }
      })
    },
    setShopSize() {
      if (this.sizeList.length > 0 && this.form.new_shop_size) {
        var record = {};
        this.sizeList.map((item) => {
          if (
            this.form.new_shop_size <= item.new_max_size &&
            this.form.new_shop_size >= item.new_min_size
          ) {
            record = item;
          }
        });
        this.form.new_shop_size_id = record.new_shop_sizeid || "";
      }
    },
    // get shop position[gps]
    handleOk(positon) {
      const { point, address, editable } = positon;
      this.GPSeditable = !!editable
      this.form.new_latitude = point.lat;
      this.form.new_longitude = point.lng;
      this.form.new_address = address;
    },
    // Get shop detail
    handleGetShopDetail() {
      this.$toast.loading({ duration: 0, forbidClick: true });
      getShopDetail({
        new_shop_id: this.form.new_shopid,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          this.$toast.clear();
          let item = data.Items;
          this.GPSeditable = item.new_gps_fix_count < 1
          this.form = {
            new_mdm_dealer_channel: item.new_mdm_dealer_channel,
            new_mdm_dealer_branch: item.new_mdm_dealer_branch,
            new_operation_type: 2,
            new_shop_type: item.new_shop_type,
            new_branch_name: item.new_branch_name,
            new_shopid: item.new_shopid,
            new_code: item.new_code,
            new_address: item.new_address,
            new_customer_code: item.new_customer_code,
            new_customer_id: item.new_customer_id,
            new_channel_id: item.new_channel_id,
            new_channel_parentid: item.new_channel_parentid,
            new_channel_name: item.new_channel_name,
            new_channel_parent_short_name: item.new_channel_parent_short_name,
            new_latitude: item.new_latitude,
            new_longitude: item.new_longitude,
            new_owner_phone: item.new_owner_phone,
            new_owner: item.new_owner,
            new_shop_manager: item.new_shop_manager,
            new_shopmanager_phone: item.new_shopmanager_phone,
            new_short_name: item.new_short_name,
            new_shop_size: item.new_shop_size,
            new_shop_size_id: item.new_shop_size_id,
            new_shop_area: item.new_shop_area,
            new_aqua_enterin: item.new_aqua_enterin,
            new_shop_location_id: item.new_shop_location_id,
            new_shop_location: item.new_shop_location_name,
            new_region_id: item.new_region_id,
            new_region_short_name: item.new_region_short_name,
            new_branch_id: item.new_branch_id,
            new_salenetwork_region_id: item.new_salenetwork_region_id,
            new_salenetwork_province_id: item.new_salenetwork_province_id,
            new_salenetwork_city_id: item.new_salenetwork_city_id,
            new_salenetwork_district_id: item.new_salenetwork_district_id,
            new_address_detail: item.new_address_detail,
            new_whether_visit: item.new_whether_visit,
            new_joinin_date: item.new_joinin_date,
            new_local_shop_code: item.new_local_shop_code,
            new_local_shop_name: item.new_local_shop_name,
            new_name: item.new_name,
            new_status: item.new_status,
            new_approve_status: item.new_approve_status,
            new_shop_status: item.new_shop_status,
          };
          this.new_mdm_accountgroup = item.new_mdm_accountgroup
          // SHOP PIC LIST
          this.photoTypes.map((item) => {
            item.list = [];
          });
          if (item.new_urllist && item.new_urllist.length > 0) {
            item.new_urllist.map((item) => {
              if (item.new_type == "1") {
                this.photoTypes[0].list.push(item);
              } else if (item.new_type == "2") {
                this.photoTypes[1].list.push(item);
              } else if (item.new_type == "3") {
                this.photoTypes[2].list.push(item);
              }
            });
          }
          // SET LOCATION
          this.new_shop_location = item.new_shop_location_name;
          // SET PRODUCT CATEGORY
          this.form.new_productList = [];
          var productArr = [];
          item.new_product_categorylist.map((item) => {
            this.form.new_productList.push(item.new_shop_categoryid);
            productArr.push(item.new_product_category_name);
          });
          this.productValues = productArr.join("/");
          // SET SALE REGION
          var saleRegionArr = [
            item.new_region_name,
            item.new_branch_name || null
          ];
          this.saleRegion = saleRegionArr.join("/");
          // SET SALE  NETWORK
          var saleNetworkArr = [
            item.new_salenetwork_region_name,
            item.new_salenetwork_province_name || null,
            item.new_salenetwork_city_name || null,
            item.new_salenetwork_district_name || null,
          ];
          this.saleNetwork = saleNetworkArr.join("/");
          this.contactList = item.new_contactlist || [];
          item.new_customer_code && this.handleGetPartner(item.new_customer_code)
        }
      });
    },
    // Confirm Location
    onConfirmLocation(record) {
      this.form.new_shop_location_id = record.value;
      this.form.new_shop_location = record.text;
      this.new_shop_location = record.text;
      this.shop_location_level = record.new_level;
      this.showLocation = false;
    },
    // Confirm Location
    onConfirmPartner(record) {
      if (!this.form.new_customer_code) {
        this.$toast("Please select customer")
      } else {
        this.form.new_local_shop_code = record.value
        this.showPartner = false;
      }
    },
    // Confirm Channel
    onConfirmChannel(record) {
      this.form.new_channel_parentid = record.new_parentid || "";
      this.form.new_channel_id = record.new_channelid;
      this.form.new_channel_name = record.new_name;
      this.form.new_channel_short_name = record.new_short_name || "";
      this.showChannel = false;
      if (!this.form.new_channel_parentid) {
        this.$toast("Please contact the administrator to maintain the channel");
      }
    },
    // select customer ok
    handleSelectCustomerOk (code, id, group) {
      this.form.new_customer_code = code
      this.form.new_customer_id = id
      this.new_mdm_accountgroup = group
      this.handleGetPartner(code)
    },
    // select product ok
    handleSelectProductOk(values, name) {
      this.form.new_productList = values;
      this.productValues = name;
    },
    // Confirm Shop Type
    onConfirmShopType(record) {
      this.form.new_shop_type = record.text;
      this.showShopType = false;
    },
    // Select date
    onConfirmDate(date) {
      this.form.new_joinin_date = this.timeFormat(date);
      this.showDate = false;
    },
    // Format date
    timeFormat(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    // Upload img
    handleFileUploadOk(file) {
      this.photoTypes.map((item, index) => {
        if (index == this.active) {
          item.list.push({
            new_download_url: file.url,
            new_keyword: item.title,
            new_description: item.title,
            new_type: index + 1,
            new_filename: file.name,
            new_filesize: 0,
          });
        }
      });
    },
    // Delete img
    handleFileDelete(dindex) {
      var index = Number(this.active);
      this.photoTypes[index].list.splice(dindex, 1);
    },
    // submit form data
    onSubmit() {
      // shop pic list
      this.form.new_urllist = [];
      this.form.new_urllist = [
        ...this.photoTypes[0].list,
        ...this.photoTypes[1].list,
        ...this.photoTypes[2].list,
      ];
      // location
      if (this.form.new_shop_location_id && !this.form.new_shop_location) {
        this.locationSelect(this.form.new_shop_location_id)
      }
      // aqua enterin
      if (!this.form.new_aqua_enterin) {
        this.form.new_shop_type = ''
        this.form.new_joinin_date = ''
      }
      this.$refs.formData.submit();
    },
    locationSelect(new_shop_locationid) {
      const item = this.locationList.find((item) => item.value === new_shop_locationid)
      if (item) {
        this.new_shop_location = item.text
      }
    },
    // submit form data
    submit() {
      this.saveLoading = true;
      this.$toast.loading({ duration: 0, forbidClick: true });
      postShopOperation(this.form)
        .then((res) => {
          this.$toast.clear();
          const { success, message } = res;
          if (success) {
            this.$toast.success("Update success");
          } else {
            this.$toast.fail(message);
          }
        })
        .catch(() => {
          this.$toast.clear();
          this.saveLoading = false;
          this.$toast.fail("Network Error");
        });
    },
    // close shop
    handleCloseShop() {
      const { new_shopid } = this.form;
      this.$dialog
        .confirm({
          title: "Tip",
          message: "Are you sure to close the shop?",
        })
        .then(() => {
          this.$toast.loading({ duration: 0, forbidClick: true });
          this.closeLoading = true;
          postCloseShop(null, {
            shopid: new_shopid,
          })
            .then((res) => {
              this.closeLoading = false;
              const { success, message } = res;
              if (success) {
                this.$toast.success("Close success");
                this.handleGetShopDetail();
              } else {
                this.$toast.fail(message);
              }
            })
            .catch(() => {
              this.$toast.fail("Network error");
              this.closeLoading = false;
            });
        })
        .catch(() => { });
    },
    // call phone
    callPhone(phone) {
      this.$dialog
        .confirm({
          title: "Tip",
          message: `Whether to call ${phone} ?`,
        })
        .then(() => {
          plus.device.dial(phone, false);
        })
        .catch(() => { });
    },
  },
};
</script>
<style lang="scss" scoped>
// tab1
.shop-form-group {
  margin: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}
.shop-group__header {
  display: flex;
  align-items: center;
  padding: 0 24px;
  line-height: 64px;
  .shop-group__title {
    flex: 1;
    font-size: $font28;
    color: #2058ab;
  }
  .shop-group__value {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      font-size: $font24;
      color: #999;
      line-height: 64px;
    }
    i {
      font-size: 32px;
      line-height: 64px;
      color: #2058ab;
    }
  }
}
.shop-upload-item {
  padding: 15px;
}
.shop-upload-box {
  padding: 0 24px 24px 24px;
}
.flex-layout__footer {
  display: flex;
  background: #fff;
  .item {
    flex: 1;
  }
}
</style>
<style lang="scss">
// tab2
.shop-master-contact {
  i {
    font-size: 32px;
  }
}
</style>