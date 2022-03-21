<template>
  <div class="sun-uploader">
    <!-- pic wall -->
    <div class="sun-uploader__wrapper">
      <div
        class="sun-uploader__preview"
        v-for="(item, index) in fileList"
        :key="index"
      >
        <div class="sun-uploader__preview-image" @click="prevImg(index)">
          <img
            :src="item.new_download_url"
            class="van-image__img"
            style="object-fit: cover"
          />
        </div>
        <div
          class="sun-uploader__preview-delete"
          v-if="showUploader"
          @click="handleDelete(index)"
        >
          <van-icon name="cross" />
        </div>
      </div>
      <div
        class="sun-upload-icon"
        v-if="showUploader && fileList.length < max"
        @click="!disabled && handleSlectImg()"
      >
        <van-icon name="photograph" />
      </div>
    </div>
    <!-- select action -->
    <van-action-sheet
      v-model="visible"
      :actions="actions"
      @select="onSelect"
      cancel-text="Cancel"
      close-on-click-action
    />
    <!-- pic prev -->
    <prev-imgs ref="prevImgs" :imgs="imgs" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from "moment";
import { takePhoto, takefromgalery } from "@/utils/compressImg";
import PrevImgs from "@/components/PrevImgs";
import { postUplodWaterImg } from "@/api/common";

export default {
  name: "UploadImgs",
  components: {
    PrevImgs,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    showUploader: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: 5,
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    walletText: {
      type: Array,
      default: () => []
    },
    hasWallet: {
      type: Boolean,
      default: false,
    },
    isTakePhoto: {
      type: Boolean,
      default: false,
    },
    folder: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      actions: [
        { type: 1, name: "Camera" },
        { type: 2, name: "Gallery" }
      ],
      visible: false,
      imgIndex: 0,
      imgs: [],
      waterObj: []
    };
  },
  watch: {
    fileList: {
      handler(values) {
        // prev imgs
        this.imgs = [];
        values.length > 0 &&
          values.map((item) => {
            this.imgs.push(item.new_download_url);
          });
      },
      deep: true,
      immediate: true
    },
  },
  computed:{
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    moment,
    // random string
    randomString(len) {
      len = len || 6;
      var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
      var maxPos = chars.length;
      var str = "";
      for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return str;
    },
    // add water
    addWater() {
      // Add img water
      if (this.hasWallet) {
        this.waterObj = [...this.walletText]
        this.waterObj.push(`${this.userInfo.username}/${moment().format("YYYY-MM-DD")}`)
      }
    },
    // Select action opation
    onSelect(item) {
      this.addWater()
      // select img mode
      switch (item.type) {
        case 1:
          takePhoto(this.waterObj, (res) => {
            this.handleUpload(res);
          });
          break;
        case 2:
          takefromgalery(this.waterObj, (res) => {
            this.handleUpload(res);
          });
          break;
      }
    },
    // Select img type
    handleSlectImg() {
      if (this.isTakePhoto) {
        this.addWater()
        takePhoto(this.waterObj, (res) => {
          this.handleUpload(res);
        });
      } else {
        this.visible = true;
      }
    },
    // upload img
    handleUpload(content) {
      var prefix = this.prefix ? `${this.prefix}_` : ''
      // UPLOAD IMG
      var file = {
        base64: content,
        text: '',
        folder: this.folder,
        filename: `${prefix}${moment().format("YYYYMMDDhhmmssSSS")}_${this.randomString(6)}.jpg`,
      };
      this.$toast.loading({ duration: 0 })
      postUplodWaterImg(file)
        .then((res) => {
          const { success, data } = res;
          if (success) {
            this.$toast.clear();
            var url = data.Items;
            this.$emit("fileUploadOk", {
              url: url,
              name: file.filename,
              base64:content
            });
          } else {
            this.$toast.fail("Upload fail");
          }
        })
        .catch(() => {
          this.$toast.fail("Network error");
        });
    },
    // delete img
    handleDelete(index) {
      this.$emit("fileDelete", index);
    },
    // prev img
    prevImg(index) {
      this.$refs.prevImgs.show(index);
    },
  },
};
</script>
<style lang="scss" scoped>
.sun-uploader {
  position: relative;
  display: inline-block;
  .sun-uploader__wrapper {
    display: flex;
    flex-wrap: wrap;
    .sun-uploader__preview {
      position: relative;
      margin: 0 20px 20px 0;
      cursor: pointer;
      .sun-uploader__preview-image {
        width: 150px;
        height: 150px;
        overflow: hidden;
        image {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .sun-uploader__preview-delete {
      position: absolute;
      top: 0;
      right: 0;
      width: 28px;
      height: 28px;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 0 28px;
      text-align: center;
      i {
        color: #fff;
        line-height: 28px;
        font-size: 28px;
        transform: scale(0.5);
        margin-top: -5px;
        margin-right: -5px;
      }
    }
    .sun-upload-icon {
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f7f8fa;
      border: 1px solid #f2f2f2;
      i {
        font-size: 64px;
        color: #ccc;
      }
    }
  }
}
</style>