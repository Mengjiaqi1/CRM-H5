<template>
  <div id="Dashboard" :style="styleObj1"></div>
</template>
<script>
export default {
  data() {
    return {
      styleObj1: { width: "100%", height: "1.45rem" },
      myChart: {}
    };
  },
  created() {
    let _this = this;
    window.onresize = function() {
      setTimeout(() => {
        _this.myChart.resize();
      }, 0);
    };
    setTimeout(() => {
      this.EchartBar();
    }, 0);
  },
  methods: {
    EchartBar() {
      this.myChart = this.$echarts.init(document.getElementById("Dashboard"));
      console.log(this.myChart);
      this.myChart.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            axisLine: { lineStyle: { width: "20%" } },
            splitLine: { length: 20 },
            data: [{ value: 50, name: "完成率" }]
          }
        ]
      });
    }
  }
};
</script>
