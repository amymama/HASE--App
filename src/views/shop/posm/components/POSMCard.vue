<template>
  <div class="fa-item">
    <van-row class="fa-item-header" type="flex" align="center">
      <van-col :span="4">
        <div class="fa-item-header_tag" :class="`color-${tag}`">{{ tagInfo }}</div>
      </van-col>
      <van-col :span="20" class="fa-item-header_right" @click="detailVisible = true">
        <p class="fa-item-header_right_con">
          <span class="title">{{ $t("shopPosm.POSMCode") }}:</span>
          <span class="info">{{ detail.posmcode }}</span>
        </p>
      </van-col>
    </van-row>
    <div class="fa-item-body">
      <van-row style="margin-bottom: 10px">
        <van-col :span="20">
          <p>
            <span class="fa-item-body_label">{{ $t("shopPosm.POSMName") }}:</span>
            <span class="fa-item-body_value">{{ detail.posmname }}</span>
          </p>
          <p>
            <span class="fa-item-body_label">{{ $t("shopFA.ShopCode") }}:</span>
            <span class="fa-item-body_value">{{ detail.shopcode }}</span>
          </p>
          <p>
            <span class="fa-item-body_label">{{ $t("shopFA.ShopName") }}:</span>
            <span class="fa-item-body_value">{{ detail.shopname }}</span>
          </p>
        </van-col>
        <van-col :span="4" style="padding: 10px">
          <van-icon name="arrow" class="fa-item-body_tag" @click="routeTo"></van-icon>
        </van-col>
      </van-row>
      <van-row :gutter="12" type="flex" align="center" class="fa-item-body_user">
        <van-col :span="18">
          <span class="fa-item-body_label">
            {{ detail.realname }}
            <br />
            {{ detail.role_name }}
          </span>
        </van-col>
        <van-col
          :span="6"
          class="fa-item-body_center"
          :class="
            actionType.value % 2 === 0
              ? 'fa-item-body_value__out'
              : 'fa-item-body_value__in'
          "
        >
          <p class="fa-item-body_total">{{ detail.new_asset_posm_inout_amount }}</p>
          <p v-if="isForecast">{{ moment(detail.new_forcast_date).format("YYYY-MM-DD") }}</p>
        </van-col>
      </van-row>
      <van-row :gutter="12">
        <van-col :span="18">
          <p>
            <span class="fa-item-body_label">{{ $t("shopPosm.CreateDate") }}:</span>
            <span class="fa-item-body_value">
              {{
                moment(new Date(detail.new_create_time)).format("YYYY-MM-DD")
              }}
            </span>
          </p>
        </van-col>
        <van-col :span="6" class="fa-item-body_center">
          <span
            class="fa-item-body_value"
            :class="
              actionType.value % 2 === 0
                ? 'fa-item-body_value__out'
                : 'fa-item-body_value__in'
            "
          >{{ actionType.text }}</span>
        </van-col>
      </van-row>
    </div>
    <POSMDetailPop v-model="detailVisible" :detail="detail" />
  </div>
</template>

<script>
import moment from "moment";
import POSMDetailPop from "./POSMDetailPop";
import { getShopList } from "@/api/shop";
export default {
  props: {
    isForecast: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
      default: () => ({}),
    },
    actionList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    POSMDetailPop,
  },
  data() {
    return {
      detailVisible: false,
    };
  },
  computed: {
    tagInfo() {
      return +this.detail.new_status === 0 ? 'Submitted' : 'Draft'
    },
    tag() {
      return +this.detail.new_status === 0 ? 'ff4940' : '36d982'
    },
    draftable() {
      return +this.detail.new_status !== 0
    },
    actionType() {
      const action = this.actionList.find(
        (item) => +item.value === +this.detail.new_asset_posm_inout_type
      );
      return action || { text: "Forecast", value: 0 };
    },
  },
  methods: {
    moment,
    async routeTo() {
      if (this.draftable) {
        let toast = this.$toast.loading({
          message: "Loading...",
          forbidClick: true,
          duration: 0,
        })
        try {
          const result = await getShopList({ itemsperpage: 10, page: 1, new_name: this.detail.shopcode })
          toast.clear();
          const shopItem = result.data.Items[0] || {}
          const routeName = this.isForecast ? 'ForecastInOut' : 'PosmInOut'
          this.$router.push({
            name: routeName,
            query: shopItem,
          });
        } catch (err) {
          toast.clear();
        }

        return
      }
      const routeName =
        this.isForecast
          ? "ForecastHistoryDetail"
          : "PosmHistoryDetail";
      this.$router.push({
        name: routeName,
        query: { id: this.detail.new_shop_asset_posm_typeId },
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
    &_right {
      padding-right: 10px;
      background-color: #fff;
      &_con {
        width: 100%;
        text-align: right;
      }
      .title,
      .info {
        font-weight: bold;
        color: #4671d5;
      }
      .title {
        padding-right: 10px;
      }
      .info {
        text-indent: 10px;
      }
    }
    &_tag {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      font-weight: bold;
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
        //  border-color: transparent #f00 transparent transparent;
      }
    }
  }
  &-body {
    padding: 5px 10px 15px 10px;
    &_center {
      text-align: center;
    }
    &_total {
      font-size: 30px;
    }
    &_user {
      padding: 5px 0;
    }
    &_label {
      font-weight: bold;
      color: #fff;
    }
    &_value {
      padding-left: 5px;
      color: #fff;
      &__in {
        font-weight: bold;
        color: #00a08a;
      }
      &__out {
        font-weight: bold;
        color: #e47171;
      }
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
      font-size: 40px;
      border-radius: 35px;
      text-align: center;
    }
  }
}
</style>