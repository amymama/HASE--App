<template>
  <div class="zsoDetailBox">
    <van-popup
      v-model="detailShow"
      :close-on-click-overlay="false"
      :style="{
        width: '100%',
        height: '100%',
      }"
    >
      <!-- navBar -->
      <van-nav-bar
        left-arrow
        @click-left="onCancel"
        :title="$t('Product detail')"
      />
      <!-- image -->
      <div class="imageBox">
        <van-image
          fit="cover"
          :src="new_dowmload_url ? new_dowmload_url.split(',')[0] : ''"
        />
      </div>
      <div class="detailTitleBox">
        <van-cell>
          <p>MKT-Bathtowel Gray:Premium WH</p>
          <div class="detailTitle">
            <span>Price:$0</span>
            <span>Stock:0</span>
          </div>
        </van-cell>
      </div>
      <div class="bottomBox"></div>
      <!--  tabs-->
      <van-tabs v-model="active" swipeable>
        <van-tab title="Product Details">内容 1</van-tab>
        <van-tab title="Technical Details">内容 2</van-tab>
        <van-tab title="POP">内容 3</van-tab>
      </van-tabs>
      <div class="footerButton">
        <div class="footerButtonBox">
          <div class="buttonBox">
            <van-image
              width="0.5rem"
              height="0.5rem"
              fit="cover"
              :src="new_dowmload_url ? new_dowmload_url.split(',')[0] : ''"
            />
          </div>
          <div class="buttonBox">
            <van-image
              width="0.5rem"
              height="0.5rem"
              fit="cover"
              :src="new_dowmload_url ? new_dowmload_url.split(',')[0] : ''"
            />
          </div>
          <div class="buttonBox">
            <van-button></van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailShow: false,
      active: "1",
      new_dowmload_url: "",
    };
  },
  methods: {
    onShow() {
      this.detailShow = true;
    },
    onCancel() {
      this.detailShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.zsoDetailBox {
  .imageBox {
    width: 100%;
    height: 5rem;
  }
  .detailTitleBox {
    .detailTitle {
      display: flex;
      justify-content: space-between;
    }
  }
  .bottomBox {
    height: 0.4rem;
    background-color: #f5f5f5;
  }
  .footerButton {
    position: fixed;
    bottom: 0;
    .footerButtonBox {
      width: 100%;
      display: flex;
      .ButtonBox {
        flex: 1;
      }
    }
  }
}
</style>