<template>
  <div>
    <van-row class="search-container" :gutter="12" type="flex" align="center">
      <van-col :span="4" class="shop-common word-limit-row_2"
        ><p class="word-limit-row_1" @click="showPopup('area')">
          {{ areaText }}
        </p></van-col
      >
      <van-col :span="16">
        <van-search
          style="padding: 10px 0"
          background="transparent"
          shape="round"
          v-model="queryParam.shopname"
          :placeholder="$t('shopVisitPlan.ShopSearch')"
          @search="handleSearch"
        />
      </van-col>
      <van-col :span="2" class="shop-common">
        <van-icon
          class="filter-icon"
          name="filter-o"
          :class="{
            'channel-select': isChannel,
          }"
          @click="showPopup('channel')"
        />
      </van-col>
      <van-col :span="2" class="shop-common">
        <van-icon
          name="more-o"
          @click="moreSearchVisible = !moreSearchVisible"
        />
      </van-col>
    </van-row>
    <div v-show="moreSearchVisible">
      <van-row v-if="!editable" class="search-item" @click="showPopup('role')">
        <van-col :span="8">{{ $t("shopVisitPlan.Role") }}</van-col>
        <van-col :span="roleText ? 15 : 16" class="search-item_res">{{
          roleText || $t("select.SelectTip") + " " + $t("shopPosm.Role")
        }}</van-col>
        <van-icon
          v-show="roleText"
          name="cross"
          @click.stop="reset('roleid')"
        ></van-icon>
      </van-row>
      <van-row
        v-if="!editable"
        class="search-item"
        @click="showPopup('employee')"
      >
        <van-col :span="8">{{ $t("shopVisitPlan.Employee") }}</van-col>
        <van-col
          :span="queryParam.createname ? 15 : 16"
          class="search-item_res"
          >{{ createname }}</van-col
        >
        <van-icon
          v-show="queryParam.createname"
          name="cross"
          @click.stop="handleEmployee()"
        ></van-icon>
      </van-row>
      <van-row class="search-item" @click="showPopup('date')">
        <van-col :span="8">{{ $t("shopVisitPlan.PlanMonth") }}</van-col>
        <van-col :span="16" class="search-item_res">{{
          dateTime || $t("select.SelectYear")
        }}</van-col>
        <!-- <van-icon
          v-show="dateTime"
          name="cross"
          @click.stop="reset('dateTime')"
        ></van-icon> -->
      </van-row>
    </div>
    <van-popup v-model="areaVisible" round position="bottom">
      <van-cascader
        v-model="regionBranch"
        :title="$t('select.SelectRegion')"
        :placeholder="$t('select.SelectTip')"
        active-color="#40a9ff"
        :options="areaOpts"
        @close="areaVisible = false"
        @finish="(data) => onFinish(data, 'area')"
      />
    </van-popup>
    <van-popup v-model="roleVisible" round position="bottom">
      <van-picker
        show-toolbar
        :columns="roleOpts"
        :title="$t('select.SelectTip') + ' ' + $t('shopPosm.Role')"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="roleVisible = false"
        @confirm="(item) => handleSelect(0, item)"
      ></van-picker>
    </van-popup>
    <!-- <van-action-sheet
      :close-on-click-action="true"
      :description="$t('select.SelectTip') + ' ' + $t('shopPosm.Role')"
      v-model="roleVisible"
      :actions="roleOpts"
      @select="(item) => handleSelect(0, item)"
    /> -->
    <van-popup v-model="dateVisible" round position="bottom">
      <van-datetime-picker
        :value="new_create_time"
        type="year-month"
        :title="$t('select.SelectYear')"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dateConfirm"
        @cancel="dateVisible = false"
      />
    </van-popup>
    <van-popup v-model="channelVisible" round position="bottom">
      <van-cascader
        v-model="channel"
        :title="$t('select.SelectChannel')"
        :placeholder="$t('select.SelectTip')"
        active-color="#40a9ff"
        :options="channelOpts"
        @close="channelVisible = false"
        @finish="(data) => onFinish(data, 'channel')"
      />
    </van-popup>
    <EmployeeDialog v-model="employeeVisible" @ok="handleEmployee" />
  </div>
</template>

<script>
import moment from "moment";
import EmployeeDialog from "./EmployeeDialog.vue";
import { getBranchAndRegion, getChannel } from "@/api/asset";
import { getRoleList } from "@/api/visitPlan";
import { mapState } from "vuex";
import { getSaleregionTreelist } from "@/api/shop";
import { formatData } from "@/utils";
export default {
  components: {
    EmployeeDialog,
  },
  data() {
    return {
      minDate: new Date(0),
      maxDate: new Date(
        moment(Date.now()).year() + 5,
        moment(Date.now()).month(),
        1
      ),
      areaVisible: false, // 选择地区弹出层
      moreSearchVisible: false,
      dateVisible: false,
      employeeVisible: false, // 是否显示输入用户弹框
      roleVisible: false,
      channelVisible: false,
      regionBranch: "",
      area: "",
      channel: "",
      areaOpts: [
        {
          text: this.$t("shopCommon.All"),
          value: 0,
          children: [{ text: this.$t("shopCommon.All"), value: 0 }],
        },
      ],
      roleOpts: [], // {name,value}
      channelOpts: [
        {
          text: this.$t("shopCommon.All"),
          value: 0,
          children: [{ text: this.$t("shopCommon.All"), value: 0 }],
        },
      ],
      new_create_time: new Date(),
      queryParam: {
        shopname: "",
        new_create_time: void 0,
        createname: "",
        roleid: void 0,
      },
    };
  },
  watch: {
    // 当更多搜索内容关闭时需要将选中内容还原
    // @todo 更多搜索在选中时触发数据更新
    /*  moreSearchVisible(visible) {
      if (!visible) {
        this.new_create_time = new Date();
        this.queryParam.new_create_time = void 0;
        this.queryParam.roleid = void 0;
        this.queryParam.createname = "";
      }
    }, */
  },
  computed: {
    ...mapState({
      roles: (state) => state.user.roles,
    }),
    areaText() {
      return this.area || this.$t("shopCommon.All");
    },
    roleText() {
      const role = this.roleOpts.find(
        (item) => item.value === this.queryParam.roleid
      );
      return role && role.text;
    },
    dateTime() {
      return this.new_create_time
        ? moment(this.new_create_time).format("YYYY-MM")
        : "";
    },
    editable() {
      return this.$route.name === "visitPlanUpdate";
    },
    createname() {
      return this.queryParam.createname || this.$t("shopVisitPlan.Employee");
    },
    isChannel() {
      return !!this.channel;
    },
  },
  methods: {
    reset(type) {
      if (type === "dateTime") {
        this.new_create_time = void 0;
        this.queryParam.new_create_time = void 0;
      } else {
        this.queryParam[type] = void 0;
      }
      this.handleSearch();
    },
    init() {
      let toast = this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0,
      });
      if (!this.queryParam.roleid)
        this.queryParam.roleid = this.roles[0] && this.roles[0].id;
      Promise.all([
        this.initRegionBranch(),
        this.initRole(),
        this.initChannel(),
      ])
        .then(() => {
          toast.clear();
        })
        .catch(() => {
          toast.clear();
        });
    },

    // 地区一级选择加载
    initRegionBranch() {
      return getSaleregionTreelist()
        .then((res) => {
          const { data, success } = res;
          if (success) {
            this.areaOpts = formatData(data.Items, {
              text: "new_name",
              value: "new_sale_regionid",
            });
            this.areaOpts.unshift({
              text: this.$t("shopCommon.All"),
              value: 0,
              children: [
                {
                  text: this.$t("shopCommon.All"),
                  value: 0,
                  children: [
                    {
                      text: this.$t("shopCommon.All"),
                      value: 0,
                      children: [
                        {
                          text: this.$t("shopCommon.All"),
                          value: 0,
                        },
                      ],
                    },
                  ],
                },
              ],
            });

            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    // 区域下拉框加载
    initChannel() {
      return getChannel()
        .then((res) => {
          const { data, success } = res;
          if (success) {
            data.Items.forEach((channel) => {
              const children = [{ text: this.$t("shopCommon.All"), value: 0 }];
              channel.children.forEach((channelChild) => {
                children.push({
                  text: channelChild.new_name,
                  value: channelChild.new_channelid,
                });
              });
              this.channelOpts.push({
                text: channel.new_name,
                value: channel.new_channelid,
                children,
              });
            });
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject());
    },
    initRole() {
      return getRoleList()
        .then((res) => {
          const { success, data } = res;
          if (success) {
            const roleOpts = [];
            res.data.forEach((item) =>
              roleOpts.push({
                text: item.role_name,
                value: item.id,
              })
            );
            this.roleOpts = roleOpts;
          }
          return success ? Promise.resolve(data) : Promise.reject();
        })
        .catch(() => Promise.reject());
    },
    showPopup(type) {
      this[`${type}Visible`] = true;
    },
    onFinish({ selectedOptions }, type) {
      this[`${type}Visible`] = false;
      const { length } = selectedOptions;
      if (type === "area")
        this.area = selectedOptions[length - 1].value
          ? selectedOptions[length - 1].text // region
          : selectedOptions[0].text; // branch
      let select1st = selectedOptions[0];
      let select2nd = selectedOptions[1];
      let select3rd = selectedOptions[2]; // province
      let select4th = selectedOptions[3]; // district
      if (!select1st.value && !select2nd.value) {
        this.channel = "";
      }
      if (type === "area") {
        this.queryParam.region = select1st.value ? select1st.text : void 0;
        this.queryParam.branch = select2nd.value ? select2nd.text : void 0;
        this.queryParam.new_province_id = select3rd.value
          ? select3rd.value
          : void 0;
        this.queryParam.province = select3rd.value ? select3rd.text : void 0;
        this.queryParam.new_district_id = select4th.value
          ? select4th.value
          : void 0;
        this.queryParam.district = select4th.value ? select4th.text : void 0;
      }
      if (type === "channel") {
        this.queryParam.channel_id = select1st.value ? select1st.value : void 0;
        this.queryParam.sub_channel_id = select2nd.value
          ? select2nd.value
          : void 0;
      }
      this.handleSearch();
    },
    handleSearch() {
      this.queryParam.new_create_time = moment(this.new_create_time).format(
        "YYYY-MM-DD"
      );
      this.$emit("search", this.queryParam);
    },
    handleSelect(type, item) {
      let action, visible;
      switch (type) {
        case 0:
          action = "roleid";
          visible = "roleVisible";
          break;
        default:
          break;
      }
      this[visible] = false;
      this.queryParam[action] = item.value;
      this.handleSearch();
    },
    handleEmployee(employee) {
      this.queryParam.createname = employee;
      this.handleSearch();
    },
    dateConfirm(date) {
      this.queryParam.new_create_time = moment(date).format("YYYY-MM-DD");
      this.dateVisible = false;
      this.new_create_time = date;
      this.handleSearch();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  margin-top: 10px;
  padding: 0 10px;
  .round {
    border-radius: 40px;
  }
  .shop-common {
    text-align: center;
    i,
    span {
      font-weight: bold;
    }
  }
}
.search-item {
  padding: 10px 20px;
  font-weight: bold;
  &_res {
    padding-right: 10px;
    text-align: right;
    font-weight: normal;
    color: #989898;
  }
}
</style>