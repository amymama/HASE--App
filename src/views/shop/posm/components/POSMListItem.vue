<template>
  <!-- POSM List 单个item组件 -->
  <div class="card-container">
    <van-card @click="showDetail">
      <div slot="title" class="posm-title">
        <p>{{ posm.new_posm_code }}</p>
        <p class="posm-title_name">{{ posm.new_posm_name }}</p>
      </div>
      <van-image
        @click.stop="viewShopImgs(posm)"
        width="100%"
        height="100%"
        slot="thumb"
        fit="contain"
        :src="posmPic(posm.pictureli)"
      ></van-image>
      <p class="price-container" slot="price">
        <span class="date-title">{{ $t("shopPosm.CreateDate") }}:</span>
        <span>{{ formatTableDate(posm.new_create_time) }}</span>
      </p>
      <div slot="num">
        <p class="num num-info">
          {{ isForecast ? posm.qty : posm.new_stock_amount }}
        </p>
        <p class="num num-title">{{ $t("shopPosm.Stock") }}</p>
      </div>
      <div slot="footer" class="footer-container">
        <van-button
          v-for="action in actionList"
          :key="action.value"
          :color="actionColor(action)"
          size="mini"
          :loading="posm.loading"
          @click.stop="handleClick(+action.value, posm)"
          >{{ action.text }}</van-button
        >
      </div>
    </van-card>
    <POSMDetailPop v-model="detailVisible" :detail="posm" />
    <!-- PREV IMGS -->
    <PrevImgs ref="prevImgs" :imgs="imgs" />
  </div>
</template>

<script>
import { postPosmIn, postCheckForecast } from "@/api/asset";
import { formatTableDate } from "@/utils";
import POSMDetailPop from "./POSMDetailPop";
import PrevImgs from "@/components/PrevImgs";
export default {
  props: {
    posm: {
      type: Object,
      default: () => ({}),
    },
    callback: {
      type: Function,
      default: () => () => {},
    },
    actionList: {
      type: Array,
      default: () => [],
    },
    shopItem: {
      type: Object,
      default: () => ({}),
    },
    isForecast: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      detailVisible: false,
      imgs: [],
    };
  },
  components: {
    POSMDetailPop,
    PrevImgs,
  },
  computed: {
    posmPic() {
      return (picList) => {
        const { length } = picList;
        if (length > 0) {
          return length > 0 && picList[length - 1].new_download_url;
        } else {
          return "";
        }
      };
    },
    actionColor() {
      return (action) => (action.value % 2 === 0 ? "#476DD5" : "#2058ab");
    },
  },
  methods: {
    formatTableDate,
    POSMIn(data) {
      data.forcast = +this.isForecast;
      return postPosmIn(data)
        .then((res) => {
          const { success } = res;
          if (success) {
            this.$toast.success("Success");
            return Promise.resolve();
          } else {
            this.$toast.fail("Error");
            return Promise.reject();
          }
        })
        .catch(() => {
          this.$toast.fail("Error");
          return Promise.reject();
        });
    },
    /**
     * @param {number} type action value
     */
    handleClick(type, posm) {
      const minusFlag = type !== 0 && type % 2 === 0; // 是否为减少操作
      const options = {
        min: 0,
      };
      if (minusFlag) {
        options.max = +posm.new_stock_amount;
      } else {
        options.max = Number.MAX_SAFE_INTEGER;
      }
      options.title = this.isForecast
        ? this.$t("shopPosm.AddForecast")
        : this.$t("shopPosm.PlzQTY");
      if (this.isForecast) options.forecast = this.isForecast;

      this.$inputNumber(options)
        .then(async ({ num, date }) => {
          const { new_shopid } = this.shopItem;
          const { new_asset_posmId, new_shop_asset_posmId } = posm;
          const body = {
            new_shop_id: new_shopid,
            new_asset_posm_id: new_asset_posmId,
            new_shop_asset_posm_id: new_shop_asset_posmId,
            new_asset_posm_inout_type: type,
            new_asset_posm_inout_amount: num,
          };
          posm.loading = true;
          if (this.isForecast) {
            body.new_forcast_date = date;
            postCheckForecast({
              new_shop_id: new_shopid,
              new_asset_posm_id: new_asset_posmId,
              new_forcast_date: date,
            })
              .then(async (res) => {
                const { success, data } = res;
                if (success) {
                  if (data) {
                    this.$dialog.confirm({
                      title: "Tips",
                      message:
                        "Already exist POSM forecast data in your forecast month, do you want submit?",
                      beforeClose: async (action, done) => {
                        if (action === "confirm") {
                          await this.POSMIn(body);
                          this.callback();
                        }
                        done();
                      },
                    });
                  } else {
                    await this.POSMIn(body);
                    this.callback();
                  }
                } else {
                }
              })
              .catch(() => {})
              .finally(() => {
                posm.loading = false;
              });
          } else {
            await this.POSMIn(body);
            this.callback();
            posm.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showDetail() {
      // 暂时注释掉 怕后期再改回来
      /* if (this.posm.new_ispop) {
        // 跳转到Product Center
        this.$router.push({
          name: "ProductList",
          query: {
            assetposmid: this.posm.new_asset_posmId,
            ...this.shopItem,
          },
        });
      } else {
        this.detailVisible = true;
      } */
      this.detailVisible = true;
    },
    viewShopImgs(record) {
      const pictureli = record.pictureli || [];
      const pictures = [];
      for (let pic of pictureli) {
        pictures.push(pic.new_download_url);
      }
      this.imgs = pictures;
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
.card-container {
  margin-bottom: 30px;
  box-shadow: 0 0 10px 0 rgba($color: #000000, $alpha: 0.2);
  border-radius: 5px;
  overflow: hidden;
  .price-container {
    position: absolute;
    bottom: 0;
  }
  .posm-title {
    color: #4671d5;
    font-weight: bold;
    &_name {
      font-weight: normal;
    }
  }
  .num {
    text-align: center;
  }
  .date-title,
  .num-title {
    font-weight: bold;
  }
  .num-title {
    font-size: 25px;
    color: #333;
  }
  .num-info {
    margin-bottom: 10px;
    color: #ffb000;
    font-weight: bold;
    font-size: 30px;
  }
  // .footer-container {
  //   display: flex;
  //   justify-content: space-around;
  // }
}
</style>
<style lang="scss">
.van-card__footer {
  margin-top: 10px;
}
</style>