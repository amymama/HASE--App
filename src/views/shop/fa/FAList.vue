<template>
  <div style="height: 100%">
    <van-nav-bar
      :title="$t('shopFA.NewFA')"
      left-arrow
      :fixed="true"
      @click-left="clickLeft"
    >
      <a
        v-action:NewFA:Add
        class="right-action"
        href="javascript:void(0)"
        slot="right"
        @click="clickRight"
        >{{ $t("shopFA.NewFA") }}</a
      >
    </van-nav-bar>
    <van-tabs v-model="tabSelect" class="page-hasnav">
      <van-tab
        to="/shop/fa/myNewFa"
        name="myNewFa"
        :title="$t('shopFA.MyNewFA')"
      ></van-tab>
      <van-tab
        to="/shop/fa/faLatest"
        name="faLatest"
        :title="$t('shopFA.FAInspectionStatus')"
      ></van-tab>
    </van-tabs>
    <keep-alive include="FaLatest">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "FaList",
  data() {
    return {
      tabSelect: null,
    };
  },
  watch: {
    $route({ name }) {
      this.tabSelect = name;
    },
  },
  mounted() {
    this.tabSelect = this.$route.name;
  },
  methods: {
    clickLeft() {
      this.$router.push("/shop");
    },
    clickRight() {
      this.$dialog
        .confirm({
          title: "Tips",
          message: this.$t("shopCommon.SubmitTips"),
          confirmButtonText: this.$t("shopCommon.Yes"),
          cancelButtonText: this.$t("shopCommon.No"),
        })
        .then(() => {
          this.$router.push("/shop/newFA");
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.right-action {
  color: #fff;
}
</style>