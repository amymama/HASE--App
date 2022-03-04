<template>
  <div class="carBox">
    <van-nav-bar @click-left="goBack" left-arrow title="Cart" />
    <div class="standardBox">Standard</div>
    <!-- select -->
    <div>
      <van-cell
        :title="$t('Dealer Name')"
        is-link
        @click="$refs.dealerSearch.onShow()"
      >
        <template #icon>
          <i class="iconfont icon-dealer"></i>
        </template>
      </van-cell>
      <van-cell
        :title="$t('Ship To')"
        is-link
        @click="$refs.shipToSearch.onShow()"
      >
        <template #icon>
          <i class="iconfont icon-type"></i>
        </template>
      </van-cell>
      <div class="selecAllBox">
        <div class="radioBox">
          <van-checkbox v-model="radio">All</van-checkbox>
        </div>
        <van-cell title="" is-link @click="goBack">
          Continue to Purchase
        </van-cell>
      </div>
    </div>
    <!-- <div class="bottomBox"></div> -->
    <!-- list -->
    <div class="shop-status-list">
      <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        :finished-text="$t('shopCommon.NoMoreData')"
        @load="getDataDealer"
        :error.sync="error"
        :error-text="$t('shopCommon.RequestErrorText')"
      >
        <van-swipe-cell
          class="shop-status-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="listBox" @click="$refs.zsodetailRef.onShow()">
            <van-checkbox v-model="radio" class="radioBox"></van-checkbox>
            <div class="listImage">
              <van-image
                width="2.2rem"
                height="1.3rem"
                fit="cover"
                :src="
                  item.new_dowmload_url
                    ? item.new_dowmload_url.split(',')[0]
                    : ''
                "
              />
            </div>
            <div class="listDetailBox">
              <h3>HRF-SBS550MS:Haier/Black/Metal/541l</h3>
              <p class="textBox" style="color: #bcc1c1">TD0037148(KBHA)</p>
              <div class="lietItemBox">
                <span calss="textBox itemBox" style="color: #ef9f61"
                  >Stock:0</span
                >
                <span calss="textBox itemNet" style="color: #ef9f61"
                  >Price:$4915.58</span
                >
              </div>
              <div class="numButton">
                <van-stepper
                  :disabled="isView"
                  button-size="24px"
                  min="0"
                  max="999"
                  :integer="true"
                  v-model.number="num"
                />
              </div>
              <!-- <div class="lietItemBox">
                <span calss="textBox itemBox">Stock:{{ index }}</span>
                <span calss="textBox itemNet" style="color: #0000ff">$ 0</span>
              </div> -->
            </div>
          </div>
          <!-- <div class="addCartButton">
            <van-button
              size="mini"
              style="padding: 0rem 0.3rem"
              color="#407FDC"
            >
              Add to Cart
            </van-button>
          </div> -->
        </van-swipe-cell>
      </van-list>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <!--footer Confirm -->
    <div class="submitBox">
      <div class="submitPrice">
        <p class="text">Total Net Price :$0.00</p>
        <p class="text">Total Tax Price :$0.00</p>
        <p class="text">
          Tatal Price :<span style="color: #fa0e0e; font-weight: 700"
            >$0.00</span
          >
        </p>
      </div>
      <van-button class="submitButton" color="#407FDC" @click="confirmClick"
        >Confirm</van-button
      >
    </div>
    <dealer-Search ref="dealerSearch" @ok="handleDealerOk" />
    <ship-to ref="shipToSearch" @ok="handleshipToOk" />
    <storage-loction ref="storageLoctionSearch" @ok="handlestorageLoctionOk" />
  </div>
</template>
<script>
import DealerSearch from "./dealer.vue";
import ShipTo from "./shipTo.vue";
import StorageLoction from "./storageLoction.vue";
import { getShopListBySelf } from "@/api/shop";
export default {
  components: {
    DealerSearch,
    ShipTo,
    StorageLoction,
  },
  data() {
    return {
      cartShow: false,
      keyword: "",
      radio: "",
      page_no: 0,
      page_size: 20,
      loading: false,
      error: false,
      noRes: false,
      finished: false,
      list: [],
      num: 1,
      isView:false,
    };
  },
  methods: {
    onCancel() {},
    confirmClick() {},
    handleshipToOk() {},
    handlestorageLoctionOk(){},
    handleDealerOk(){},
    getDataDealer() {
      setTimeout(() => {
        this.page_no++;
        getShopListBySelf(
          Object.assign(
            {},
            {
              itemsperpage: this.page_size,
              page: this.page_no,
            }
          )
        )
          .then((res) => {
            const { success, data } = res;
            if (success) {
              var Items = data.Items || [];
              this.loading = false;
              this.list = this.list.concat(Items);
              if (this.list.length === 0) {
                this.noRes = true;
              }
              if (Items.length < this.page_size) {
                this.finished = true;
              }
            }
          })
          .catch(() => {
            this.page_no = 0;
            this.loading = false;
            this.error = true;
          });
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.carBox {
  .bottomBox {
    height: 0.2rem;
    background-color: #f5f5f5;
  }
  .shop-status-list {
    padding: 18px;
    background: #f5f5f5;
  }
  .shop-status-item {
    margin-bottom: 32px;
    border-radius: 20px;
    overflow: hidden;
    background: #fef9f3;
    box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.1);
  }
  .listBox {
    margin: 0 0.2rem;
    display: flex;
    .radioBox {
      // z-index: 1;
      width: 0.6rem;
    }
    .listImage {
      margin: 0.8rem 0.3rem 0.3rem;
    }
    .listDetailBox {
      width: 57%;
      margin: 0.4rem 0.1rem 0.2rem 0rem;
      .lietItemBox {
        margin: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        .itemBox {
          flex: 2;
        }
        .itemNet {
          flex: 1;
        }
      }
      .numButton{
          float:right;
      }
      .textBox {
        margin: 0.2rem 0;
      }
    }
  }
  .standardBox {
    height: 1rem;
    line-height: 1rem;
    background-color: #2058ab;
    color: #ffffff;
    font-size: 0.4rem;
    padding-left: 0.9rem;
  }
  .selecAllBox {
    position: relative;
    .radioBox {
      position: absolute;
      top: 0.3rem;
      left: 0.4rem;
      z-index: 1;
    }
  }

  .submitBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    display: flex;
    font-size: 0.2rem;
    .submitPrice {
      flex: 2;
      padding: 0.3rem 0.1rem;
      .text {
        margin: 0.1rem;
      }
    }
    .submitButton {
      flex: 1;
      padding: 1rem 0.2rem;
    }
  }
}
</style>