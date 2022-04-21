<template>
  <!-- 弹框输入数字 -->
  <van-dialog
    v-model="visible"
    :title="title"
    confirmButtonText="Confirm"
    cancelButtonText="Cancel"
    show-cancel-button
    :before-close="beforeClose"
    confirmButtonColor="#40a9ff"
  >
    <div class="field-container">
      <van-field
        v-model.trim="text"
        :placeholder="placeholder"
        :required="required"
        @focus="handleFocus"
        @input="searchModel"
        :error-message="error"
      ></van-field>
      <van-cell-group class="search-container" v-show="modelList.length > 0">
        <van-cell
          v-for="(model, index) in modelList"
          :key="index"
          clickable
          :title="model.new_model_name"
          :label="model.new_category_name"
          :value="model.new_price"
          @click="selectModel(model)"
        />
      </van-cell-group>
    </div>
  </van-dialog>
</template>

<script>
import _throttle from "lodash.throttle";
import { getModel } from "@/api/promotion";
import { i18n } from "@/languages";
export default {
  data() {
    return {
      promise: null,
      resolve: null,
      reject: null,
      visible: false,
      required: true,
      title: i18n.t("select.InputText"),
      placeholder: i18n.t("select.InputText"),
      searchModelFlag: false, // 为true时触发model联想查询
      text: "",
      error: "",
      modelList: [],
    };
  },
  methods: {
    init(opt) {
      for (let key in opt) {
        this[key] = opt[key];
      }
    },
    clear() {
      this.text = "";
      this.error = "";
      this.modelList.splice(0);
    },
    showDialog() {
      this.visible = true;
      return (this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      }));
    },
    handleFocus() {
      this.error = "";
    },
    selectModel(model) {
      this.visible = false;
      this.clear();
      this.resolve(model);
    },
    searchModel: _throttle(function (new_model_name) {
      if (this.searchModelFlag) {
        if (new_model_name) {
          getModel({
            new_model_name,
          }).then((res) => {
            const { success, data } = res;
            if (success) {
              data.forEach((item) => {
                item.new_price = parseInt(item.new_price);
              });
              this.modelList = data;
            }
          });
        } else {
          this.modelList.splice(0);
        }
      }
    }, 500),
    beforeClose(action, done) {
      console.log(action, this.required);
      if (this.required) {
        if (action === "cancel") {
          this.clear();
          this.reject();
          done();
        } else {
          if (this.text) {
            this.resolve(this.text);
            this.clear();
            done();
          } else {
            this.error = "Please Input Text";
            done(false);
          }
        }
      } else {
        action === "cancel" ? this.reject(action) : this.resolve(this.text);
        this.clear();
        done();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.field-container {
  // text-align: center;
  margin: 20px;
  .search-container {
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>