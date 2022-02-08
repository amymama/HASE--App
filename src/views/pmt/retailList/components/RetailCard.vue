<template>
  <div class="fa-item">
    <van-swipe-cell>
      <van-row class="fa-item-header" type="flex" align="center">
        <van-col span="1" class="fa-item-header_left"></van-col>
        <van-col span="18" class="fa-item-header_right">
          <a href="javascript:void(0)" @click="routeTo(detail)">
            <span class="info">{{ detail.new_retail_code }}</span>
          </a>
        </van-col>
        <van-col span="5" class="complaint" v-if="detail.new_is_complaint">
          <span class="complaint_info">{{
            $t("pmt.retail.complaint")
          }}</span></van-col
        >
      </van-row>
      <div class="fa-item-body">
        <van-row style="margin-bottom: 10px">
          <van-col :span="16">
            <p>
              <span class="fa-item-body_label"
                >{{ $t("pmt.retail.SalesAmount") }}:</span
              >
              <span class="fa-item-body_value">{{
                detail.new_Invoice_total_sell_out
              }}</span>
            </p>
            <p>
              <span class="fa-item-body_label"
                >{{ $t("pmt.retail.MhSalesAmount") }}:</span
              >
              <span class="fa-item-body_value">{{
                detail.new_invoice_key_sell_out
              }}</span>
            </p>
          </van-col>
          <van-col :span="8" style="padding: 10px">
            <div class="fa-item-body_tag" @click="routeTo(detail)">
              {{
                detail.new_approve_status === 1 ||
                detail.new_approve_status === 4
                  ? $t("pmt.edit")
                  : $t("pmt.review")
              }}
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="24">
            <span class="fa-item-body_label"
              >{{ $t("pmt.retail.CreateBy") }}:</span
            >
            <span class="fa-item-body_value">{{
              detail.new_user_name || DEFAULT
            }}</span>
            <span class="fa-item-body_label"
              >{{ $t("pmt.retail.CreateByOn") }}:</span
            >
            <span class="fa-item-body_value">{{
              detail.CreatedOn || DEFAULT
            }}</span>
          </van-col>
        </van-row>
        <!--      <div class="btn-detail">-->
        <!--        <a href="javascript:void(0)">{{ $t("shopFA.InspectionDetail") }}</a>-->
        <!--      </div>-->
      </div>
      <template #right>
        <van-button
          v-show="
            detail.new_approve_status === 1 || detail.new_approve_status === 4
          "
          square
          @click="deleteDrft(detail)"
          :text="$t('pmt.retail.delete')"
          type="danger"
          class="delete-button"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
// import bus from "@/utils/busEvent";
// import formatDate from "@/utils/utils";
import { deleteretailbyid } from "../../../../api/retail";
const DEFAULT = "Null";
const STATUS_COLOR = [
  {
    class: "color-default",
    background: "transparent",
    color: "#4761d5",
  },
  {
    class: "color-40a9ff",
    background: "#40a9ff",
    color: "#fff",
  },
  {
    class: "color-36d982",
    background: "#36d982",
    color: "#fff",
  },
  {
    class: "color-ff4940",
    background: "#ff4940",
    color: "#fff",
  },
  {
    class: "color-476dd5",
    background: "#476dd5",
    color: "#fff",
  },
];
export default {
  props: {
    type: {
      type: String,
      default: "edit",
    },
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      DEFAULT,
      inspectStatus: [],
    };
  },
  mounted() {
    // bus.$on("inspectStatus", (status) => {
    //   this.inspectStatus = status;
    // });
  },
  computed: {
    getClass() {
      // return (status) => {
      //   switch (+status) {
      //     case 1:
      //     case 2:
      //     case 3:
      //     case 4:
      //       return STATUS_COLOR[status].class;
      //     default:
      return STATUS_COLOR[0].class;
      //   }
      // };
    },
  },
  methods: {
    //删除
    deleteDrft(detail) {
      console.log(detail, "detail");
      // this.$toast.loading({ duration: 0, forbidClick: true });
      let that = this;
      this.$dialog
        .confirm({
          title: "Tip",
          message: this.$t("pmt.confirmDelete.deletion"),
        })
        .then(() => {
          deleteretailbyid({ new_retailid: detail.new_retailId })
            .then((res) => {
              if(res.success){
                // that.$toast.success(res.message);//message为''
              that.$toast.success("success");
              that.$emit("onChangeStatus"); 
              }else{
              that.$toast.fail(res.message);
              }
             
            })
            .catch(() => {
              that.$toast.fail(res.message);
            });
        })
        .catch(() => {});
    },
    routeTo(detail) {
      console.log("routeTo", detail);
      this.$emit("handleRouter", detail);
    },
  },
};
</script>

<style lang="scss" scoped>
/*@import "../scss/variable";*/
.fa-item {
  // height: 300px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.2);
  background-image: linear-gradient(131deg, #4094df 0%, #81cde8 100%);
  overflow: hidden;
  &-header {
    height: 50px;
    // padding: 10px;
    background-color: #fff;
    &_left,
    &_right {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 5px;
    }
    &_left {
      justify-content: center;
      position: relative;
      font-weight: bold;
    }
    &_right {
      background-color: #fff;
      .title,
      .info {
        font-weight: bold;
        color: #4671d5;
      }
      .info {
        text-indent: 10px;
      }
    }
    .complaint {
      background-color: #4671d5;
      text-align: center;
      .complaint_info {
        font-weight: bold;
        color: #fff;
        // background-color: #4671d5;
      }
    }
  }
  &-body {
    position: relative;
    padding: 5px 5px 15px 5px;
    &_label,
    &_value {
      color: #fff;
    }
    &_label {
      font-weight: bold;
    }
    &_value {
      padding-left: 10px;
    }
    &_single {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &_tag {
      padding: 10px;
      background: #ffbf40;
      color: #fff;
      font-weight: bold;
      border-radius: 35px;
      text-align: center;
    }
    .btn-detail {
      position: absolute;
      right: 30px;
      bottom: 5px;
      text-align: right;
      a {
        color: #fff;
      }
    }
    .fa-item-header_right {
    }
  }
}
</style>
