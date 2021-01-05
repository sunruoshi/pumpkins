<template>
  <div :id="id" class="chart"></div>
</template>

<script>
const echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");

export default {
  name: "Piechart",
  props: {
    id: String,
    series: Array,
    dataset: Array
  },
  data() {
    return {};
  },
  watch: {
    dataset: function() {
      this.drawChart();
    }
  },
  methods: {
    drawChart() {
      let myChart = echarts.init(document.getElementById(this.id));
      let option = {
        grid: {
          left: 10,
          right: 10,
          bpttom: 10,
          containLabel: true
        },
        legend: {
          bottom: 10
        },
        tooltip: {
          confine: true
        },
        dataset: {
          source: this.dataset
        },
        series: this.series
      };
      var currentIndex = -1;

      setInterval(function() {
        var dataLen = option.dataset.source.length;
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 1500);

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
