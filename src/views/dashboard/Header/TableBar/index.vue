<template>
  <div ref="dom" class="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "TableBar",
  mounted() {
    var table1 = echarts.init(this.$refs.dom);
    table1.setOption({
      xAxis: { show: false, type: "category" },
      yAxis: { show: false },
      grid: { left: 0, top: 0, right: 0, bottom: 0 },
      series: [
        {
          type: "bar",
          data: [47, 99, 77, 34, 50, 38, 4, 98, 66, 30, 88, 96],
          //设置颜色
          color: "#5670c0",
          //柱子的粗细
          barWidth: 20,
        },
      ],
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
