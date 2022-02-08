<template>
  <div>
    <van-cell-group :title="$t('shopFA.ShopInfo')">
      <van-cell :title="$t('shopPosm.Region')" :value="detail.branchname" />
      <van-cell :title="$t('shopFA.Branch')" :value="detail.regionname" />
      <van-cell :title="$t('shopFA.ShopName')" :value="detail.shopname" />
      <van-cell :title="$t('shopFA.ShopCode')" :value="detail.shopcode" />
    </van-cell-group>
    <van-cell-group title="POSM">
      <van-cell :title="$t('shopPosm.POSMCode')" :value="detail.posmcode" />
      <van-cell :title="$t('shopPosm.POSMName')" :value="detail.posmname" />
    </van-cell-group>
    <van-cell-group :title="$t('shopPosm.PersonalInfo')">
      <van-cell :title="$t('shopFA.CreatePerson')" :value="detail.realname" />
      <van-cell :title="$t('shopPosm.Role')" :value="detail.role_name" />
    </van-cell-group>
    <van-cell-group :title="$t('shopPosm.Action')">
      <van-cell :title="$t('shopPosm.Action')">
        <p>{{ formatTableDate(detail.new_create_time) }}</p>
        <p :style="{
          color,
        }">{{ actionType.text }}</p>
      </van-cell>
      <van-cell title="QTY">
        <p :style="{
          color,
        }">{{ detail.new_asset_posm_inout_amount }}</p>
      </van-cell>
    </van-cell-group>
    <van-cell-group :title="$t('shopPosm.Image')">
      <!-- <div v-if="detail.pictureli && detail.pictureli.length > 0">
        <div class="img-item" v-for="img in detail.pictureli" :key="img.new_keyword">
          <p class="img-item_name">{{ img.new_filename }}</p>
          <van-image :src="img.new_download_url"></van-image>
        </div>
      </div>-->
      <van-grid
        :center="false"
        :clickable="true"
        :column-num="(detail.pictureli && detail.pictureli.length) || 0"
        v-if="detail.pictureli && detail.pictureli.length > 0"
      >
        <van-grid-item v-for="(img,index) in detail.pictureli" :key="img.new_keyword">
          <van-image
            width="100"
            height="100"
            fit="cover"
            @click="prevImg(index)"
            :src="img.new_download_url"
          />
        </van-grid-item>
      </van-grid>
      <van-empty v-else :description="`No ${$t('shopPosm.Image')}`"></van-empty>
    </van-cell-group>
    <prev-imgs ref="prevImgs" :imgs="previewImgs" />
  </div>
</template>

<script>
import { getRecordDetail } from "@/api/asset";
import { getDict } from "@/api/common";
import { formatTableDate } from "@/utils";
import PrevImgs from "@/components/PrevImgs";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    PrevImgs
  },
  data() {
    return {
      installImage: [],
      detail: {},
      actionList: [],
    };
  },
  created() {
    this.init();
  },
  computed: {
    actionType() {
      const action = this.actionList.find(
        (item) => item.value === this.detail.new_asset_posm_inout_type
      );
      return action || {};
    },
    // 操作相关文字颜色
    color() {
      return this.actionType.value % 2 === 0 ? "#fb000d" : "#14d100";
    },
    // 预览图片列表，作用在PrevImgs组件上
    previewImgs() {
      const previewList = this.detail.pictureli || []
      return previewList.map(item => item.new_download_url)
    }
  },
  methods: {
    formatTableDate,
    init() {
      const toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      Promise.all([this.initRecordDetail(), this.initAction()])
        .then(() => toast.clear())
        .catch(() => toast.clear());
    },
    initRecordDetail() {
      return getRecordDetail({ id: this.id, forcast: 1 })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.installImage = data.installimage;
            this.detail = data.posminoutrecordout;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initAction() {
      return getDict({ key: "AssetPosmInOutType" })
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.actionList = data.Items;
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    prevImg(index) {
      this.$refs.prevImgs.show(index);
    }
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