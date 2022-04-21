<template>
  <div class="table">
    <table class="table-content" cellspacing="0" style="width: 100%">
      <thead>
        <th class="head">{{ $t("shopVisitPlan.ApproveLevel") }}</th>
        <th class="head head-code">{{ $t("shopVisitPlan.OperatorCode") }}</th>
        <th class="head head-operate">
          {{ $t("shopVisitPlan.OperatorName") }}
        </th>
        <th class="head">{{ $t("shopVisitPlan.ApproveNode") }}</th>
        <th class="head">{{ $t("shopVisitPlan.ProcessStatus") }}</th>
        <th class="head">{{ $t("shopVisitPlan.ApproveTime") }}</th>
      </thead>
      <tbody>
        <tr class="row" v-for="item in list" :key="item.id">
          <td class="row-item">{{ item.approve_level }}</td>
          <td class="row-item">{{ item.approver_code }}</td>
          <td class="row-item">{{ item.approver_name }}</td>
          <td class="row-item">{{ item.approve_node }}</td>
          <td class="row-item">{{ item.new_approve_status || "/" }}</td>
          <td class="row-item">
            {{
              (item.new_approval_date &&
                moment(item.new_approval_date).format("YYYY-MM-DD")) ||
              "/"
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    moment,
  },
};
</script>

<style lang="scss" scoped>
$border: #ccc;
.table {
  overflow-x: auto;
  .table-content {
    table-layout: fixed;
    .head,
    .row-item {
      text-align: center;
      padding: 10px 20px;
    }
    .head {
      width: 200px;
      color: #2058ab;
      border-bottom: 1px solid #2058ab;
    }
    .head-code {
      width: 250px;
    }
    .head-operate {
      width: 500px;
    }
  }
}
</style>