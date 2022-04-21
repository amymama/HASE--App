<template>
  <div class="fa-item">
    <van-row class="fa-item-header" type="flex" align="center">
      <van-col span="8">
        <div class="fa-item-header_left" :class="getStatus.class">
          {{ getStatus.text }}
        </div>
      </van-col>
      <van-col span="16" class="fa-item-header_right">
        <a href="javascript:void(0)">
          <span class="title">{{ $t("shopPromotion.PromotionRecord") }}:</span>
          <span class="info">{{ detail.new_code }}</span>
        </a>
      </van-col>
    </van-row>
    <div class="fa-item-body">
      <van-row style="margin-bottom: 10px">
        <van-col :span="16">
          <p>
            <span class="fa-item-body_label">{{ detail.new_program }}</span>
          </p>
          <p class="word-limit-row_2">
            <span class="fa-item-body_label">{{ $t("shopFA.ShopName") }}</span>
            <span class="fa-item-body_value">{{
              detail.shop_name || DEFAULT
            }}</span>
          </p>
          <p>
            <span class="fa-item-body_label">{{ $t("shopFA.ShopCode") }}</span>
            <span class="fa-item-body_value">{{
              detail.shop_code || DEFAULT
            }}</span>
          </p>
        </van-col>
        <van-col :span="8" style="padding: 10px">
          <div class="fa-item-body_tag">{{ detail.new_competitorname }}</div>
          <van-button
            v-if="+detail.new_status === 2"
            @click.stop="delItem"
            class="fa-item-body_del"
            size="small"
            round
            icon="delete-o"
          ></van-button>
        </van-col>
      </van-row>
      <van-row>
        <van-col>
          <span class="fa-item-body_label"
            >{{ $t("shopFA.CreatePerson") }}:</span
          >
          <span class="fa-item-body_value">{{ detail.user_name }}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col>
          <span class="fa-item-body_label"
            >{{ $t("shopPosm.CreateDate") }}:</span
          >
          <span class="fa-item-body_value">{{
            formatTableDate(detail.new_create_time)
          }}</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { updateData } from "@/api/common";
import { formatTableDate } from "@/utils";
const DEFAULT = "Null";
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      STATUS_COLOR: [
        {
          class: "color-36d982",
          background: "#36d982",
          color: "#fff",
          text: this.$t("shopVisitPlan.Submitted"),
        },
        {
          class: "color-default",
          background: "transparent",
          color: "#4761d5",
          text: "",
        },
        {
          class: "color-476dd5",
          background: "#476dd5",
          color: "#fff",
          text: this.$t("shopVisitPlan.Draft"),
        },
      ],
      DEFAULT,
    };
  },
  computed: {
    createDate() {
      return moment(this.detail.new_create_time).format("YYYY-MM-DD");
    },
    getStatus() {
      const { new_status } = this.detail;
      switch (+new_status) {
        case 0:
        case 2:
          return this.STATUS_COLOR[new_status];
        default:
          return this.STATUS_COLOR[1];
      }
    },
  },
  methods: {
    formatTableDate,
    delItem() {
      this.$dialog
        .confirm({
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
          title: "Warning",
          message: "Are you sure to delete the promotion?",
        })
        .then(() => {
          updateData("new_promotions", this.detail.new_promotionsId, {
            new_status: 1,
          })
            .then((res) => {
              const { success } = res;
              if (success) {
                this.$toast.success("Delete Success");
                this.$emit("update");
              } else {
                this.$toast.fail("Delete Fail");
              }
            })
            .catch(() => {
              this.$toast.fail("Delete Fail");
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/asset_variable.scss";
$primaryColor: #4671d5;
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
      background-color: #fff;
      .title,
      .info {
        font-weight: bold;
        color: $primaryColor;
      }
      .info {
        text-indent: 10px;
      }
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
    &_del {
      position: absolute;
      right: 20px;
      bottom: 20px;
      font-size: 30px;
      font-weight: bold;
      color: $primaryColor;
      background-color: #fff;
    }
    .btn-detail {
      position: absolute;
      right: 30px;
      bottom: 5px;
      text-align: right;
      a {
        color: #fff;
      }
    }
  }
}
</style>