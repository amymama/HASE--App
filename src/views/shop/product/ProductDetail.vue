<template>
  <div>
    <van-row>
      <van-col :span="24">
        <van-image width="100%" fit="cover" height="150" src="" />
      </van-col>
    </van-row>
    <van-tabs v-model="active">
      <van-tab :title="$t('shopPosm.ProductDetail')"></van-tab>
      <van-tab :title="$t('shopPosm.TechnicalDetail')"></van-tab>
      <van-tab :title="$t('shopPosm.POP')">
        <van-cell :title="model"></van-cell>
        <van-row
          type="flex"
          align="center"
          :gutter="12"
          class="search-container"
        >
          <van-col :span="16">
            <van-row @click="popVisible = true">
              <van-col :span="23">{{ popDetail.new_code }}</van-col>
              <van-col :span="1">
                <van-icon name="arrow-down"></van-icon>
              </van-col>
            </van-row>
          </van-col>
          <van-col :span="8" class="search-container_btn">
            <van-button type="info" size="mini" @click="showGuide">{{
              $t("shopPosm.GuideImage")
            }}</van-button>
          </van-col>
        </van-row>
        <div class="img-container" v-if="popDetail.installimage">
          <div
            class="img-item"
            v-for="img in popDetail.installimage"
            :key="img.new_keyword"
          >
            <p class="img-item_name">{{ img.new_filename }}</p>
            <van-image fit="cover" :src="img.new_download_url"></van-image>
          </div>
        </div>
        <van-empty
          v-else
          :description="$t('shopCommon.NoMoreImage')"
        ></van-empty>

        <GuideImage v-model="visible" :guideImg="popDetail.new_guidimage" />
        <van-action-sheet
          :close-on-click-action="true"
          v-model="popVisible"
          :actions="popOpts"
          @select="handleSelect"
        ></van-action-sheet>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import GuideImage from "./components/GuideImage";
import { getPOPDetail } from "@/api/product";
const spitOpt = (data) => {
  const result = [];
  data.forEach((item, index) => {
    result.push({
      name: item.new_code,
      value: item.new_code,
      index,
    });
  });
  return result;
};
export default {
  props: {
    model: {
      type: String,
      default: "",
    },
    modelId: {
      type: String,
      default: "",
    }, // 接收路由参数
  },
  data() {
    return {
      active: 2, // 目前默认选中POP
      visible: false,
      popList: [],
      popOpts: [],
      popSelected: 0,
      popVisible: false,
    };
  },
  created() {
    if (this.active === 2) {
      this.init();
    }
  },
  components: {
    GuideImage,
  },
  computed: {
    popDetail() {
      return this.popList[this.popSelected] || {};
    },
  },
  methods: {
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      Promise.all([this.initDetail()])
        .then(() => toast.clear())
        .catch(() => toast.clear());
    },
    initDetail() {
      return getPOPDetail({ new_asset_modelId: this.modelId })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.popList = data;
            this.popOpts = spitOpt(data);
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    showGuide() {
      this.visible = true;
    },
    handleSelect(item) {
      this.popSelected = item.index;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  padding: 10px 35px;
  font-size: 28px;
  background-color: #fff;
  &_btn {
    display: flex;
    justify-content: center;
  }
}
.img-container {
  padding: 10px;
  .img-item {
    position: relative;
    margin-bottom: 10px;
    &_name {
      border-radius: 5px;
      padding: 10px;
      background: #fff;
      margin: 20px 0;
      box-shadow: 0 0 3px 0 #ccc;
    }
  }
}
</style>