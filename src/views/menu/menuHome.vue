
  <template>
  <div class="memuGrid">
    <div class="topBox">
      <van-nav-bar fixed title="Menu" />
    </div>
    <van-grid :column-num="columnNumber" :gutter="10">
      <van-grid-item
        class="pmt_guid"
        v-for="(item, index) in memuGridDataSource"
        :key="index"
        :icon="item.icon"
        :text="item.text"
        :to="item.toPath"
      />
      <!-- v-action:[item.permission] -->
    </van-grid>
      <tab-bar />
  </div>
</template>
<script>
import icon_invoiceSubmit from "@/assets/images/icon/Exhibition_icon.png";
import TabBar from "@/components/TabBar";
import icon_aplan from "@/assets/images/shop/icon/aplan.png";
import icon_shop from "@/assets/images/shop/icon/shop.png";
export default {
  components: {
    TabBar,
  },
  data() {
    return {
      columnNumber: "3",
      memuGridDataSource: [
        {
          icon: icon_shop,
          text: "ZSO",
          toPath: "/zso",
          // permission: "pmtMenu:retailInvoice",
        },
        {
          icon: icon_aplan,
          text: "Order",
          toPath: "/order",
          // permission: "pmtMenu:retailInvoice",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
// @import url("./index.less");
.topBox {
  width: 100%;
  height: 1.8rem;
  position: relative;
  overflow: auto;
  top: 0rem;
  z-index: 1;
}
.memuGrid {
  padding-top: 5px;
  margin-bottom: 15%;
}
.pmt_guid .van-grid-item__content {
  color: #00aeef ;
  font-size: 24px;
  text-align: center;
}
.pmt_guid .van-grid-item__content .van-grid-item__text {
  /* color: #fff; */
  font-size: 24px;
  text-align: center;
}
</style>