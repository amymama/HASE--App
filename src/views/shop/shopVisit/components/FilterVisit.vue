<template>
  <van-popup
    v-model="visible"
    position="right"
    :style="{
      height: '100%',
      width: '100%',
    }"
  >
    <div class="flex-layout">
      <div class="flex-layout__header">
        <van-nav-bar
          title="Shop Visit Filter"
          left-arrow
          @click-left="visible = false"
        />
      </div>
      <div class="flex-layout__body">
        <div class="filter-visit">
          <van-field
            is-link
            readonly
            clickable
            input-align="right"
            :value="form.new_role_name"
            placeholder="Please select"
            label="Role"
            @click="showRole = true"
          />
          <van-field
            clearable
            input-align="right"
            v-model="form.new_creator"
            label="Creator"
            placeholder="Please input"
            maxlength="50"
          />
          <van-field
            is-link
            readonly
            clickable
            input-align="right"
            :value="form.new_begintime"
            label="Begin Date"
            placeholder="Please select"
            @click="$refs.beginDate.show()"
          />
          <van-field
            is-link
            readonly
            clickable
            input-align="right"
            :value="form.new_endtime"
            label="End Data"
            placeholder="Please select"
            @click="$refs.endDate.show()"
          />
        </div>
      </div>
      <div class="flex-layout__footer">
        <van-row>
          <van-col span="12">
            <van-button block square color="#407FDC" @click="handleReset">
              Reset
            </van-button>
          </van-col>
          <van-col span="12">
            <van-button block square color="#2058AB" @click="handleSubmit">
              {{ $t("shopCommon.Submit") }}
            </van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- MODALS -->
    <!-- Filter roles -->
    <van-popup v-model="showRole" round position="bottom">
      <van-picker
        title="Select Location"
        show-toolbar
        :columns="roleList"
        @confirm="onConfirmRole"
        @cancel="showRole = false"
      />
    </van-popup>
    <!-- SELECT BEGIN DATE -->
    <check-time ref="beginDate" @ok="handleBeginDateOk" />
    <!-- SELECT BEGIN DATE -->
    <check-time ref="endDate" @ok="handleEndDateOk" />
  </van-popup>
</template>

<script>
import { getRoleQueryList } from "@/api/user";
import CheckTime from "./CheckTime";

export default {
  name: "FilterShop",
  components: {
    CheckTime,
  },
  data() {
    return {
      visible: false,
      // form
      showRole: false,
      roleList: [],
      form: {
        new_role_name: "",
        new_creator: "",
        new_begintime: "",
        new_endtime: "",
      },
    };
  },
  methods: {
    // SHOW MODAL
    show() {
      this.visible = true;
      this.handleGetRoles();
    },
    // GET ROLES
    handleGetRoles() {
      getRoleQueryList({
        itemsPerPage: 100,
        page: 1,
      }).then((res) => {
        const { success, data } = res;
        if (success) {
          this.roleList = [];
          data.Items.map((item) => {
            this.roleList.push({
              value: item.id,
              text: item.role_name,
            });
          });
        }
      });
    },
    // confirm role
    onConfirmRole(record) {
      this.form.new_role_name = record.text;
      this.showRole = false;
    },
    // Select Begin date
    handleBeginDateOk(beginDate) {
      this.form.new_begintime = beginDate;
    },
    // Select End date
    handleEndDateOk(endDate) {
      this.form.new_endtime = endDate;
    },
    // filter submit
    handleSubmit() {
      this.$emit("ok", this.form);
      this.visible = false;
    },
    // filter reset
    handleReset() {
      this.form = {
        new_role_name: "",
        new_creator: "",
        new_begintime: "",
        new_endtime: "",
      };
      this.$emit("ok", this.form);
      this.visible = false;
    },
  },
};
</script>