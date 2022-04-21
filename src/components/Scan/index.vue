<template>
  <div>
    <div>
      <TopBar
        class="scan-top"
        :topBarTitle="topBarTitle"
        :leftHtml="topBarLeftHtml"
        :rightHtml="topBarRightHtml"
        @set_onClickLeft="topBarClickLeft"
      >
      </TopBar>
    </div>
    <div class="num-mask" id="bcid"></div>
  </div>
</template>

<script>
let scan = null;
import TopBar from "@/components/TopBar";
export default {
  name: "Scan",
  components: {
    TopBar,
  },
  data() {
    return {
      code: "",

      topBarTitle: this.$t("pmt.scan"),
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      // topBarRightHtml: '<i class="van-icon van-icon-search"></i>',
      topBarRightHtml: "",
    };
  },
  mounted() {
    this.startRecognize();
  },
  methods: {
    topBarClickLeft() {
      // debugger;
      console.log("closeScan");
      this.closeScan("");
      // this.$router.go(-1);
    },

    // 创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode("bcid", [
        plus.barcode.CODE128,
        plus.barcode.EAN13,
        plus.barcode.CODABAR,
        plus.barcode.CODE39,
      ]);
      scan.onmarked = onmarked;

      function onmarked(type, result, file) {
        result = result.replace(/\n/g, "");
        that.code = result;
        that.cancelScan();
        that.closeScan(result);
      }
    },
    // 开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },
    // 关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },
    // 关闭条码识别控件
    closeScan(data) {
      if (!window.plus) return;
      scan.cancel();
      scan.close();
      // alert("scan:"+data)
      this.$emit("on_ScanEnd", data);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>


<style>
#bcid {
  width: 100%;
  height: 100%;
  /* margin-top: 13%; */
  position: fixed;
  left: 0;
  top: 1rem;
  background: rgba(0, 0, 0, 1);
  z-index: 9;
}

.scan-top .van-nav-bar {
  z-index: 99999999;
  position: fixed;
  width: 100%;
  /* position: fixed; */
  /* z-index:99 */
}
</style>

<style lang="scss" scoped>
</style>


