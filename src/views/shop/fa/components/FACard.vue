<template>
  <div class="fa-item">
    <van-row class="fa-item-header" type="flex" align="center">
      <van-col span="7">
        <div class="fa-item-header_left" :class="getClass.class">{{ getClass.text }}</div>
      </van-col>
      <van-col span="17" class="fa-item-header_right" @click="routeTo">
        <p class="word-limit-row_1 fa-item-header_title">
          <span class="title">
            <!-- {{ $t("shopFA.FACode") }}: -->
          </span>
          <span class="info">{{ detail.new_code }}</span>
        </p>
      </van-col>
    </van-row>
    <div class="fa-item-body" v-if="type === 'edit'">
      <van-row style="margin-bottom: 10px">
        <van-col :span="16">
          <p>
            <span class="fa-item-body_label">{{ $t("shopFA.ShopName") }}:</span>
            <span class="fa-item-body_value">
              {{
                detail.new_shopname || DEFAULT
              }}
            </span>
          </p>
          <p>
            <span class="fa-item-body_label">{{ $t("shopFA.ShopCode") }}:</span>
            <span class="fa-item-body_value">{{ detail.new_shopcode }}</span>
          </p>
          <!-- <p>
            <span class="fa-item-body_label"
              >{{ $t("shopFA.CodePerson") }}:</span
            >
            <span class="fa-item-body_value"
              >{{ detail.new_customername || DEFAULT }}
              {{ detail.user_role || DEFAULT }}</span
            >
          </p>-->
          <p>
            <span class="fa-item-body_label">{{ $t("shopFA.AssetType") }}:</span>
            <span class="fa-item-body_value">
              {{
                detail.new_asset_typename
              }}
            </span>
          </p>
        </van-col>
        <van-col :span="8" style="padding: 10px">
          <div class="fa-item-body_tag word-limit-row_1">{{ detail.new_asset_sub_category_name }}</div>
        </van-col>
      </van-row>
      <van-row>
        <van-col :span="20">
          <div>
            <span class="fa-item-body_label">{{ $t("shopFA.NewDate") }}:</span>
            <span class="fa-item-body_value">
              {{
                formatTableDate(detail.createdate)
              }}
            </span>
          </div>
          <div>
            <span class="fa-item-body_label">{{ $t("shopFA.InstallDate") }}:</span>
            <span class="fa-item-body_value">
              {{
                detail.installdate && formatTableDate(detail.installdate)
              }}
            </span>
          </div>
        </van-col>
        <van-col :span="4" style="text-align: center">
          <van-button v-action:NewFA:QR size="small" icon="qr" round @click="showQR"></van-button>
        </van-col>
      </van-row>
    </div>
    <div class="fa-item-body" v-else>
      <van-row style="margin-bottom: 10px">
        <van-col :span="16">
          <p>
            <span class="fa-item-body_label">{{ $t("shopFA.ShopName") }}:</span>
            <span class="fa-item-body_value">
              {{
                detail.new_shopname || DEFAULT
              }}
            </span>
          </p>
          <p>
            <span class="fa-item-body_label">{{ $t("shopFA.ShopCode") }}:</span>
            <span class="fa-item-body_value">{{ detail.new_shopcode }}</span>
          </p>
        </van-col>
        <van-col :span="8" style="padding: 10px">
          <div class="fa-item-body_tag word-limit-row_1">{{ detail.new_asset_sub_category_name }}</div>
        </van-col>
      </van-row>
      <van-row>
        <van-col :span="20">
          <div>
            <span class="fa-item-body_label">{{ $t("shopFA.FALatestInspectionStatus") }}:</span>
            <span class="fa-item-body_value">{{ inspectDate || DEFAULT }}</span>
          </div>
          <div>
            <span class="fa-item-body_label">{{ $t("shopFA.CreatePerson") }}:</span>
            <span class="fa-item-body_value">
              {{ detail.inspect_user || DEFAULT }}({{
                detail.user_role || DEFAULT
              }})
            </span>
          </div>
        </van-col>
        <van-col :span="4" style="text-align: center">
          <van-button v-action:NewFA:QR size="small" icon="qr" round @click="showQR"></van-button>
        </van-col>
      </van-row>
      <van-row>
        <van-col :span="24" class="action-btn">
          <van-button
            v-if="detail.new_visit_fa_inspect_id"
            class="action-btn_item"
            size="small"
            round
            icon="eye-o"
            color="#40a9ff"
            plain
            type="primary"
            @click="
              $router.push({
                name: 'ShopVisitHistoryDetail',
                query: {
                  new_visit_totalid: detail.new_visit_total_id,
                  new_code: detail.new_shopcode,
                  new_name: detail.new_shopname,
                  new_customer_code: detail.new_customercode,
                  new_channel_name: detail.new_channel_name,
                  new_latitude: detail.new_latitude,
                  new_longitude: detail.new_longitude,
                  new_shopid: detail.new_shopid,
                  new_shop_class: detail.new_shop_class,
                },
              })
            "
          >{{ $t("shopFA.InspectionDetail") }}</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- <div class="fa-item-header">
          <div class="fa-item-header_left"></div>
          <div class="fa-item-header_right">
            <span>FA Code</span>
          </div>
        </div>
    <div class="fa-item-body"></div>-->
  </div>
</template>

<script>
import { formatTableDate } from "@/utils";
import bus from "@/utils/busEvent";
const DEFAULT = "Null";

export default {
  props: {
    type: {
      type: String,
      default: "edit",
    },
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      DEFAULT,
      STATUS_COLOR: [
        {
          class: "color-default",
          background: "transparent",
          color: "#4761d5",
          text: "",
        },
        {
          class: "color-36d982",
          background: "#36d982",
          color: "#fff",
          text: this.$t("shopVisit.Good"),
        },
        {
          class: "color-ff4100",
          background: "#ff4100",
          color: "#fff",
          text: this.$t("shopVisit.NeedFix"),
        },
        {
          class: "color-476dd5",
          background: "#476dd5",
          color: "#fff",
          text: this.$t("shopVisit.Scrap"),
        },
        {
          class: "color-ff4940",
          background: "#ff4940",
          color: "#fff",
          text: this.$t("shopVisit.Lost"),
        },
      ],
      inspectStatus: [],
    };
  },
  mounted() {
    bus.$on("inspectStatus", (status) => {
      this.inspectStatus = status;
    });
  },
  computed: {
    getClass() {
      const status = +this.detail.new_fa_status;
      switch (+status) {
        case 1:
        case 2:
        case 3:
        case 4:
          return this.STATUS_COLOR[+this.detail.new_fa_status];
        default:
          return this.STATUS_COLOR[0];
      }
    },
    inspectDate() {
      return (
        this.detail.inspect_time && formatTableDate(this.detail.inspect_time)
      );
    },
  },
  methods: {
    formatTableDate,
    showQR() {
      this.$showQR({
        qrcode: this.detail.qrcode,
      });
      /* this.$scan()
        .then(() => {})
        .catch(() => {}); */
    },
    routeTo() {
      const query = {
        type: "edit",
        id: this.detail.new_asset_faId,
        facode: this.detail.new_code,
      };
      if (this.type === "edit") query.facode = this.detail.new_code;
      this.$router.push({
        name: "newFA",
        query,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/asset_variable";
.fa-item {
  // height: 300px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.2);
  background-image: linear-gradient(131deg, #4094df 0%, #81cde8 100%);
  overflow: hidden;
  &-header {
    position: relative;
    height: 50px;
    // padding: 10px;
    background-color: #fff;
    &_left,
    &_right {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 5px;
    }
    &_left {
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      font-weight: bold;
      width: 150px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        right: -50px;
        bottom: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 50px 0 0 50px;
        // border-color: transparent transparent transparent transparent;
      }
    }
    &_right {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      padding-right: 20px;
      .title,
      .info {
        font-weight: bold;
        color: #4671d5;
      }
      .info {
        text-indent: 10px;
      }
    }
    &_title {
      width: 100%;
      text-align: right;
    }
  }
  &-body {
    position: relative;
    padding: 5px 10px 15px 10px;
    &_label,
    &_value {
      color: #fff;
    }
    &_label {
      padding-right: 5px;
      font-weight: bold;
    }
    &_value {
      padding-left: 10px;
    }
    &_single {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &_tag {
      padding: 10px;
      background: #ffbf40;
      color: #fff;
      font-weight: bold;
      border-radius: 35px;
      text-align: center;
    }
    .action-btn {
      text-align: right;
      &_item {
        width: 100%;
      }
    }
  }
}
</style>