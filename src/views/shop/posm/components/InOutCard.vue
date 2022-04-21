<template>
  <div class="item" v-clickOut="closeDropdown">
    <!-- ITEM BEGIN -->
    <div class="shop-item">
      <div class="shop-item-innter">
        <div class="shop-pics">
          <van-image
            width="3.2rem"
            height="3.2rem"
            fit="contain"
            :src="posmPic(detail.pictureli || [])"
            @click="prevImg()"
          />
        </div>
        <div class="shop-info">
          <h2 class="name van-ellipsis word-limit-row_1">
            {{ detail.new_posm_name || DEFAULT }}
          </h2>
          <p class="code word-limit-row_1">
            {{ detail.new_posm_code || DEFAULT }}
          </p>
          <div class="forecast-date" v-if="isForecast">
            Forecast Date: {{ forecastDate }}
          </div>
          <div class="total-detail">
            <span>{{ $t("shopPosm.Stock") }}:</span>
            <span>{{ detail.new_stock_amount }}</span>
          </div>
          <div class="total-action">
            <div class="total-action_tag">
              <van-tag :color="actionType.color">{{ actionType.text }}</van-tag>
            </div>
            <NumInput v-model="detail.option_anount" :totalVisible="true" />
          </div>
        </div>
      </div>
      <div
        class="shop-item-footer"
        :class="{
          footer_expand: expand,
        }"
      >
        <div class="title">
          <p style="color: #999">
            {{
              detail.picturebyuserli.length > 0
                ? detail.picturebyuserli.length
                : "No"
            }}
            photos
          </p>
          <van-icon
            name="arrow-down"
            class="arrow-down"
            :class="{ 'arrow-down_expand': expand }"
            @click="dropdown"
          />
        </div>
        <van-grid class="photo-list" column-num="5" :border="false">
          <van-grid-item>
            <van-icon name="photograph" class="icon" @click="uploadClick" />
            <!-- <van-icon name="photograph" slot="icon"></van-icon> -->
            <UploadImgs
              ref="uploader"
              folder="asset"
              prefix="POSMIO"
              :max="4"
              :walletText="walletText"
              :hasWallet="true"
              :showUploader="false"
              @fileUploadOk="handleUpload"
              @fileDelete="handleFileDelete"
            />
          </van-grid-item>
          <van-grid-item class="img-preview">
            <van-icon
              class="icon-close"
              name="cross"
              @click="handleFileDelete(0)"
              v-if="detail.picturebyuserli[0]"
            ></van-icon>
            <!-- <van-image width="30" height="30" fit="cover" src="./avatar.png" /> -->
            <van-icon
              name="photo-o"
              class="icon"
              v-if="!detail.picturebyuserli[0]"
            ></van-icon>
            <van-image
              v-else
              width="30"
              height="30"
              fit="cover"
              @click="prevImg(true, 0)"
              :src="detail.picturebyuserli[0].new_download_url"
            />
          </van-grid-item>
          <van-grid-item class="img-preview">
            <van-icon
              class="icon-close"
              name="cross"
              @click="handleFileDelete(1)"
              v-if="detail.picturebyuserli[1]"
            ></van-icon>
            <van-icon
              name="photo-o"
              class="icon"
              v-if="!detail.picturebyuserli[1]"
            ></van-icon>
            <van-image
              v-else
              width="30"
              height="30"
              fit="cover"
              @click="prevImg(true, 1)"
              :src="detail.picturebyuserli[1].new_download_url"
            />
          </van-grid-item>
          <van-grid-item class="img-preview">
            <van-icon
              class="icon-close"
              name="cross"
              @click="handleFileDelete(2)"
              v-if="detail.picturebyuserli[2]"
            ></van-icon>
            <van-icon
              name="photo-o"
              class="icon"
              v-if="!detail.picturebyuserli[2]"
            ></van-icon>
            <van-image
              v-else
              width="30"
              height="30"
              fit="cover"
              @click="prevImg(true, 2)"
              :src="detail.picturebyuserli[2].new_download_url"
            />
          </van-grid-item>
          <van-grid-item class="img-preview">
            <van-icon
              class="icon-close"
              name="cross"
              @click="handleFileDelete(3)"
              v-if="detail.picturebyuserli[3]"
            ></van-icon>
            <van-icon
              name="photo-o"
              class="icon"
              v-if="!detail.picturebyuserli[3]"
            ></van-icon>
            <van-image
              v-else
              width="30"
              height="30"
              fit="cover"
              @click="prevImg(true, 3)"
              :src="detail.picturebyuserli[3].new_download_url"
            />
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- pic prev -->
    <prev-imgs ref="prevImgs" :imgs="imgs" />
    <prev-imgs ref="prevImgsMain" :imgs="mainImgs" />
    <!-- ITEM END -->
  </div>
</template>

<script>
import NumInput from "./NumInput";
import UploadImgs from "@/components/UploadImgs";
import PrevImgs from "@/components/PrevImgs";
import moment from "moment";
const DEFAULT = "Null";
export default {
  props: {
    isForecast: {
      type: Boolean,
      default: false,
    },
    shopItem: {
      type: Object,
      default: () => ({}),
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
  data() {
    return {
      test: 0,
      DEFAULT,
      expand: false, // 是否展开相册列表
      walletText: [],
    };
  },
  computed: {
    forecastDate() {
      return moment(this.detail.new_forcast_date).format("YYYY-MM-DD");
    },
    actionType() {
      const action = this.actionList.find(
        (item) => +item.value === +this.detail.new_asset_posm_inout_type
      );
      if (action) {
        action.color = action.value % 2 === 0 ? "#ff4940" : "#36d982";
      }
      return action || {};
    },
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
    imgs() {
      let arr = [];
      this.detail.picturebyuserli &&
        this.detail.picturebyuserli.forEach((file) =>
          arr.push(file.new_download_url)
        );
      return arr;
    },
    mainImgs() {
      let arr = [];
      this.detail.pictureli &&
        this.detail.pictureli.forEach((file) =>
          arr.push(file.new_download_url)
        );
      return arr;
    },
  },
  components: {
    NumInput,
    UploadImgs,
    PrevImgs,
  },
  methods: {
    closeDropdown() {
      this.expand = false;
    },
    dropdown() {
      this.expand = !this.expand;
    },
    uploadClick() {
      const { new_code, new_name } = this.shopItem;
      this.walletText = [new_code, new_name];
      this.$refs.uploader.handleSlectImg();
    },
    handleUpload(file) {
      this.detail.picturebyuserli.push({
        new_download_url: file.url,
        new_keyword: "",
        new_description: "",
        new_type: "",
        new_filename: file.name,
        new_filesize: 0,
      });
    },
    /**
     * @param {boolean} type true表示posm图片 false表示用户图片
     */
    prevImg(type, index) {
      if (type) {
        this.$refs.prevImgs.show(index);
      } else {
        this.mainImgs.length === 0
          ? this.$toast("No Image!")
          : this.$refs.prevImgsMain.show(0);
      }
    },
    handleFileDelete(index) {
      this.detail.picturebyuserli.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/asset_variable.scss";
.shop-item {
  position: relative;
  margin-bottom: 30px;
}
.img-preview {
  position: relative;
  .icon-close {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.shop-item-innter {
  overflow: hidden;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.2);
  background-image: linear-gradient(131deg, #4094df 0%, #81cde8 100%);
  .shop-pics {
    width: 3.2rem;
    height: 3.2rem;
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
    }
  }
  .shop-info {
    flex: 1;
    box-sizing: border-box;
    padding: 14px 14px 0 14px;
    overflow: hidden;
    position: relative;
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
    .forecast-date,
    .code,
    .total-detail {
      color: #fff;
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
    .total-action {
      position: absolute;
      right: 10px;
      bottom: 10px;
      text-align: right;
      &_tag {
        margin-bottom: 10px;
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
  transition: all 100ms ease;
  overflow: hidden;
  span {
    font-weight: bold;
    color: #2058ab;
  }
  .title {
    position: relative;
    .arrow-down {
      position: absolute;
      top: 0;
      right: 0;
      font-weight: bold;
      transition: all 300ms ease;
    }
    .arrow-down_expand {
      transform: rotate(-180deg);
    }
  }
  .icon {
    font-size: 50px;
  }
}
.footer_expand {
  height: 160px;
}
</style>
<style lang="scss">
.photo-list {
  margin-top: 15px;
  i {
    color: #ccc;
  }
}
</style>