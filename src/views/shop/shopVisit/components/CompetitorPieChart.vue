<template>
  <div class="competitor-pie-chart">
    <div id="competitor-chart"></div>
  </div>
</template>

<script>
const echarts = require("echarts");

export default {
  name: "CompetitorPieChart",
  props: {
    chartData: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  watch: {
    chartData: {
      handler(newValue) {
        this.initChart(newValue);
      },
      deep: true,
    },
  },
  mounted() {
    // INIT CHART AND OPTION
    this.myChart = echarts.init(document.getElementById("competitor-chart"));
    this.initChart(this.option);
  },
  methods: {
    initChart () {
      // chart data set
      let chartData = []
      let hasData = false
      this.chartData.map((item) => {
        if (item.value > 0) {
          hasData = true
          chartData.push(item)
        }
      })
      if (hasData === false) {
        chartData = this.chartData
      }
      // opation
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c} ({d}%)",
        },
        series: {
          type: "pie",
          radius: "60%",
          center: ["50%", "50%"],
          data: chartData,
          label: {
            show: true,
            formatter: "{b}\n{d}%({c})",
          },
        },
      };
      this.myChart.setOption(option);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.myChart.resize();
    });
  },
};
</script>
<style lang="scss" scoped>
#competitor-chart {
  height: 500px;
  width: 100%;
}
</style>