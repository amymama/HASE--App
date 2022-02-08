<template>
  <div class="ood-gap-item">
    <div class="ood-gap-item__top">
      <van-field
        type="text"
        v-model="value"
        label="Brand"
        placeholder="Please select"
        input-align="right"
      />
      <van-field
        type="digit"
        v-model="value"
        label="Qty"
        placeholder="Please input"
        input-align="right"
      />
    </div>
    <div class="ood-gap-item__bottom">
      <upload-imgs
        folder="VisitDisplaySample"
        prefix="Display"
        :max="4"
        :fileList="currentCategory.new_urllist"
        :isTakePhoto="true"
        :hasWallet="true"
        :walletText="walletText"
        :showUploader="new_process == 1"
        @fileUploadOk="handleFileUploadOk"
        @fileDelete="handleFileDelete"
      />
    </div>
  </div>
</template>
<script>
import UploadImgs from "@/components/UploadImgs";

export default {
  name: "OodGapItem",
  components: { UploadImgs },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    // UPLOAD IMGS
    handleFileUploadOk(file) {
      this.currentCategory.new_urllist.push({
        new_download_url: file.url,
        new_keyword: "",
        new_description: "",
        new_type: "",
        new_filename: file.name,
        new_filesize: 0,
      });
    },
    // DELETE IMG
    handleFileDelete(index) {
      this.currentCategory.new_urllist.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>