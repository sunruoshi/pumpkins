<template>
  <div :id="id" class="chart"></div>
</template>

<script>
const echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/dataZoom");

export default {
  name: "Chart",
  props: {
    id: String,
    series: Array,
    dataset: Object
  },
  data() {
    return {};
  },
  watch: {
    dataset: {
      deep: true,
      handler: function() {
        this.drawChart();
      }
    }
  },
  methods: {
    drawChart() {
      let myChart = echarts.init(document.getElementById(this.id));
      this.$nextTick(() => {
        myChart.resize();
      });
      let option = {
        grid: {
          left: 10,
          right: 10,
          bpttom: 10,
          containLabel: true
        },
        legend: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        dataset: this.dataset,
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          axisLabel: {
            formatter: "¥{value}"
          }
        },
        series: this.series,
        dataZoom: [
          {
            type: "slider",
            start: 0,
            end: 100
          },
          {
            type: "inside",
            start: 0,
            end: 100
          }
        ]
      };
      myChart.setOption(option, true);
      window.onresize = function() {
        myChart.resize();
      };
    }
  },
  mounted: function() {
    this.drawChart();
  }
};
</script>

<style></style>
