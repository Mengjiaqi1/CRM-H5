<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-10 16:38:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-10 19:35:44
 -->
<template>
  <div
    id="myChart"
    :style="{ width: '100%', height: '1.87rem', margin: '0 auto' }"
  ></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [82, 93, 90, 93, 129, 133, 132],
            type: "line"
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
