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
        <van-tab title="Technical Details">
          <van-cell><p style="color: #1989fa">Basic</p></van-cell>
          <div class="listDetailBox">
            <div class="lietItemBox">
              <span calss="textBox itemBox">Product Number</span>
              <span calss="textBox itemNet">TD0046</span>
            </div>
            <div class="lietItemBox">
              <span calss="textBox itemBox">Order Type</span>
              <span calss="textBox itemNet">ZSO</span>
            </div>
            <div class="lietItemBox">
              <span calss="textBox itemBox">Storage Location</span>
              <span calss="textBox itemNet">U5T2</span>
            </div>
          </div>
        </van-tab>
        <van-tab title="POP">内容 3</van-tab>
      </van-tabs>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <!-- footer -->
      <div class="footerButton">
        <div class="buttonBox">
          <img src="../../../../assets/images/icon/cartBlue_icon.png" />
        </div>
        <div class="buttonBox">
          <img src="../../../../assets/images/icon/like_icon@2x.png" />
        </div>
        <div class="buttonBox">
          <van-button class="buttonBoxbun" size="samll" type="info"
            >Add to Cart</van-button
          >
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
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .buttonBox {
      text-align: center;
      flex: 1;
      img {
        width: 0.7rem;
        padding-bottom: 0.2rem;
      }
    }
    .buttonBoxbun {
      width: 100%;
      height: 100%;
    }
  }
  .listDetailBox {
    margin: 0rem 0.4rem;
    .lietItemBox {
      margin: 0.4rem 0;
      display: flex;
      justify-content: space-between;
      .itemBox {
        flex: 2;
      }
      .itemNet {
        flex: 1;
      }
    }
  }
}
</style>