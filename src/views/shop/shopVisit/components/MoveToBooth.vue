<template>
  <van-popup
    v-model="visible"
    position="right"
    :style="{
      height: '100%',
      width: '100%',
      background: '#F2F2F2',
    }"
  >
    <van-nav-bar
      title="Select Models"
      right-text="Submit"
      left-arrow
      @click-left="visible = false"
      @click-right="onSubmit"
    />
    <div class="select-item">
      <div class="select-item__header">Select Booth</div>
      <div class="select-item__body">
        <van-radio-group v-model="selectedBooth">
          <van-cell-group inset>
            <van-cell
              :title="item.new_code"
              clickable
              @click="selectedBooth = item.new_code"
              v-for="(item, index) in boothList"
              :key="index"
            >
              <template #right-icon>
                <van-radio :name="item.new_code" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </div>
    <div class="select-item">
      <div class="select-item__header">
        Select Models({{ modelList.length }})
      </div>
      <div class="select-item__body">
        <van-checkbox-group v-model="selectedModels">
          <van-cell-group>
            <!-- item begin-->
            <template v-for="(item, index) in modelList">
              <van-cell v-if="item.new_quantity > 0" :key="index" clickable>
                <template #title>
                  <van-checkbox shape="square" :name="item.new_model_id">
                    {{ item.new_model_name }}
                  </van-checkbox>
                </template>
                <template #default>
                  <van-stepper
                    style="margin-right: 10px"
                    v-model="item.new_quantity"
                    :max="item.max"
                    :min="1"
                    theme="round"
                    button-size="22"
                    disable-input
                  />
                </template>
              </van-cell>
            </template>
            <!-- item end -->
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  name: "MoveToBooth",
  props: {
    boothList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: false,
      modelList: [],
      selectedBooth: "",
      selectedModels: [],
    };
  },
  methods: {
    // Show Modal
    show(list) {
      this.visible = true;
      this.selectedModels = [];
      this.selectedBooth = "";
      this.modelList = []
      list.map((item) => {
        this.modelList.push({
          max: item.new_quantity,
          new_quantity: item.new_quantity,
          new_model_id: item.new_model_id,
          new_model_name: item.new_model_name
        })
      })
    },
    // Select ok
    onSubmit() {
      if (this.selectedModels.length === 0) {
        this.$toast("Please select models!");
      } else if (!this.selectedBooth) {
        this.$toast("Please select and booth!");
      } else {
        var models = [];
        this.modelList.map((item) => {
          if (this.selectedModels.indexOf(item.new_model_id) > -1) {
            models.push({
              new_quantity: item.new_quantity,
              new_model_id: item.new_model_id,
              new_model_name: item.new_model_name
            });
          }
        });
        this.$emit("ok", {
          booth: this.selectedBooth,
          models: models,
        });
        this.visible = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.select-item {
  padding: 24px;
  .van-cell__title{
    flex: 2;
  }
  .select-item__header {
    height: 60px;
    line-height: 60px;
    font-size: $font28;
    color: #999;
  }
  .select-item__body {
    border-radius: 12px;
    overflow: hidden;
  }
}
</style>