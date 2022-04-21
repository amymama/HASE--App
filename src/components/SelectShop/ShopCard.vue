<template>
  <div class="item">
    <!-- ITEM BEGIN -->
    <div class="shop-item">
      <div class="shop-level">{{ detail.new_shop_class || "N/A" }}</div>
      <div class="shop-tools" @click="handleAdd">
        <van-icon name="plus" />
      </div>
      <div class="shop-item-innter">
        <div class="shop-pics" @click="viewShopImgs(detail)">
          <div class="shop-status">
            <div class="shop-status-box">
              <div
                class="shop-status-item opened"
                v-if="detail.new_shop_status == 1"
              >
                {{ $t("shopStatus.Opened") }}
              </div>
              <div
                class="shop-status-item closed"
                v-if="detail.new_shop_status == 2"
              >
                {{ $t("shopStatus.Closed") }}
              </div>
              <div
                class="shop-status-item jonined"
                v-if="detail.new_aqua_enterin"
              >
                {{ $t("shopStatus.Joined") }}
              </div>
              <div
                class="shop-status-item visit"
                v-if="detail.new_whether_visit"
              >
                {{ $t("shopStatus.Visit") }}
              </div>
            </div>
          </div>
          <van-tag
            v-if="detail.new_shop_type"
            class="shop-type"
            mark
            type="primary"
          >
            {{ detail.new_shop_type }}
          </van-tag>
          <van-image
            width="3.2rem"
            height="3.2rem"
            fit="cover"
            :src="detail.new_dowmload_url"
          />
        </div>
        <div class="shop-info">
          <h2 class="name van-ellipsis">{{ detail.new_name }}</h2>
          <p>{{ detail.new_code }}</p>
          <p>
            <span style="margin-right: 10px">{{
              detail.new_customer_code
            }}</span>
            <van-tag round type="primary">
              <div class="van-ellipsis channel">
                {{ detail.new_channel_name }}
              </div>
            </van-tag>
          </p>
          <div class="total-detail">
            <div class="total-item">
              <span>
                {{
                  detail.new_display_radio
                    ? (detail.new_display_radio * 100).toFixed(2)
                    : 0
                }}%
              </span>
              {{ $t("shopHome.DisplayRatio") }}
            </div>
            <div class="total-item">
              <span> {{ detail.new_display_rank || 0 }} </span>
              {{ $t("shopHome.DisplayRank") }}
            </div>
          </div>
        </div>
      </div>
      <div class="shop-item-footer">
        <p v-if="detail.new_visit_submitor">
          <span>{{ detail.new_visit_submitor }}</span>
          {{ formatTableDate(detail.new_visit_submit_time) }}
        </p>
        <p style="color: #999" v-else>Have not any visit recorded</p>
      </div>
    </div>
    <!-- ITEM END -->
    <!-- PREV IMGS -->
    <PrevImgs ref="prevImgs" :imgs="imgs" />
  </div>
</template>

<script>
import { formatTableDate } from "@/utils";
import PrevImgs from "@/components/PrevImgs";
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    PrevImgs,
  },
  data() {
    return {
      // prev imgs
      imgs: [],
    };
  },
  methods: {
    formatTableDate,
    handleAdd() {
      this.$emit("ok", this.detail);
    },
    // PREV SHOP IMGS
    viewShopImgs(record) {
      this.imgs = record.new_dowmload_url ? [record.new_dowmload_url] : [];
      if (this.imgs.length > 0) {
        this.$refs.prevImgs.show(0);
      } else {
        this.$toast("No image!");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-item {
  position: relative;
  margin-bottom: 30px;
  text-align: right;
  .shop-type {
    position: absolute;
    right: 12px;
    top: 20px;
    font-size: 16px;
    z-index: 1;
  }
  .shop-level,
  .shop-visit,
  .shop-tools {
    position: absolute;
    text-align: center;
    border-radius: 50%;
  }
  .shop-tools {
    width: 42px;
    height: 42px;
    line-height: 42px;
    background: #fff;
    top: 160px;
    right: 20px;
    i {
      line-height: 42px;
      color: #1989fa;
      font-weight: bold;
    }
  }
  .shop-level {
    width: 48px;
    height: 48px;
    line-height: 48px;
    background: #fff;
    font-size: $font24;
    font-weight: bold;
    top: 12px;
    left: 12px;
    z-index: 1;
  }
  .shop-visit {
    width: 42px;
    height: 42px;
    line-height: 42px;
    color: #fff;
    font-weight: bold;
  }
}
.shop-item-innter {
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.2);
  background-image: linear-gradient(131deg, #4094df 0%, #81cde8 100%);

  .shop-pics {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 10px;
    overflow: hidden;
    background: #ccc;
    position: relative;
    .shop-status {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: 1;
      .shop-status-box {
        display: flex;
        .shop-status-item {
          font-size: 18px;
          flex: 1;
          background: #333;
          color: #fff;
          text-align: center;
          box-sizing: border-box;
          padding: 6px 2px;
          &.opened {
            background: #64bbe3;
          }
          &.closed {
            background: red;
          }
          &.jonined {
            background: #70b603;
          }
          &.visit {
            background: #f59a23;
          }
        }
      }
    }
  }

  .shop-info {
    flex: 1;
    box-sizing: border-box;
    padding: 14px 14px 0 14px;
    overflow: hidden;
    h2 {
      font-size: $font28;
      margin-bottom: 10px;
      color: #fff;
    }
    p {
      padding: 5px 0;
    }
    .channel {
      max-width: 180px;
    }
    .total-detail {
      display: flex;
      width: 85%;
      margin-top: 5px;
      .total-item {
        flex: 1;
        text-align: center;
        padding: 10px 10px 0 10px;
        color: #fff;
        font-size: 20px;
        span {
          display: block;
          font-size: $font28;
          font-weight: bold;
        }
      }
    }
  }
}
.shop-item-footer {
  width: 90%;
  margin: 0 auto;
  background: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 5px 25px rgba($color: #000000, $alpha: 0.2);
  height: 32px;
  line-height: 32px;
  padding: 12px;
  span {
    font-weight: bold;
    color: #2058ab;
  }
}
</style>