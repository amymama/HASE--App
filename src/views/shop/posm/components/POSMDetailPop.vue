<template>
  <van-popup :value="value" position="right" style="width: 100%; height: 100%">
    <van-nav-bar title="POSM Detail" left-arrow @click-left="closePopup"></van-nav-bar>
    <van-cell-group title="POSM Detail">
      <van-cell :title="$t('shopPosm.POSMCode')" :value="detail.new_posm_code || detail.posmcode"></van-cell>
      <van-cell :title="$t('shopPosm.POSMName')" :value="detail.new_posm_name || detail.posmname"></van-cell>
      <van-cell :title="$t('ShopClass.ProductCategory')" :value="detail.new_asset_type_name"></van-cell>
      <van-cell :title="$t('shopPosm.CreateDate')" :value="createDate"></van-cell>
      <!-- <van-cell :title="$t('shopPosm.ImageName')"></van-cell> -->
    </van-cell-group>
    <van-tabs>
      <van-tab :title="$t('shopPosm.CodeImage')">
        <div v-if="detail.pictureli && detail.pictureli.length > 0">
          <div class="img-item" v-for="img in detail.pictureli" :key="img.new_keyword">
            <p class="img-item_name">{{ img.new_filename }}</p>
            <van-image :src="img.new_download_url"></van-image>
          </div>
        </div>
        <van-empty v-else :description="`No ${$t('shopPosm.CodeImage')}`"></van-empty>
      </van-tab>
      <van-tab :title="$t('shopPosm.GuideImage')">
        <p v-if="detail.new_guidimage" v-html="detail.new_guidimage" class="guide-image"></p>

        <van-empty v-else :description="`No ${$t('shopPosm.GuideImage')}`"></van-empty>
      </van-tab>
    </van-tabs>
  </van-popup>
</template>

<script>
const DEFAULT = "NULL";
import moment from "moment";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      DEFAULT,
    };
  },
  computed: {
    createDate() {
      return moment(new Date(this.detail.new_create_time)).format("YYYY-MM-DD");
    },
  },
  methods: {
    closePopup() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.img-item {
  position: relative;
  margin-bottom: 10px;
  &_name {
    border-radius: 5px;
    padding: 10px;
    background: #fff;
    margin-bottom: 20px;
    box-shadow: 0 0 3px 0 #ccc;
  }
}
</style>
<style lang="scss">
.guide-image {
  padding: 10px;
  img {
    width: 100% !important;
    height: auto !important;
    object-fit: contain;
  }
}
</style>