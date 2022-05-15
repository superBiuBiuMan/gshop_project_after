<template>
  <div class="charts">
    <span class="user"
      >{{title}}<svg
        data-v-a8659420=""
        t="1652441780035"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1256"
        width="22"
        height="22"
        class="icon"
      >
        <path
          data-v-a8659420=""
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          p-id="1257"
        ></path></svg
    ></span>
    <div style="margin-top: 10px">
      <span class="first">12321</span>
      <span class="second"
        >17.1<svg
          data-v-614813a5=""
          t="1652442671186"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2207"
          width="12"
          height="12"
          class="icon"
        >
          <path
            data-v-614813a5=""
            d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
            p-id="2208"
            fill="#d81e06"
          ></path></svg
      ></span>
    </div>
    <div ref="dom1" class="table"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Charts",
  props:{
      title:String
  },
  mounted() {
    // var table1 = echarts.init(document.querySelector(".table"));
    var table1 = echarts.init(this.$refs.dom1);
    table1.setOption({
      xAxis: {
        //隐藏坐标轴
        show: false,
        type: "category",
      },
      yAxis: {
        //隐藏坐标轴
        show: false,
      },
      series: [
        //设置了渐变
        {
            // 圆滑线条
          smooth: true,
          type: "line",
          data: [24, 40, 15, 45, 15, 54],
          itemStyle: {
            //   图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
            opacity: 0,
            //颜色设置为紫色
            color: "blue",
          },
          //areaStyle区域填充样式。设置后显示成区域面积图。
          //https://echarts.apache.org/zh/option.html#series-line.areaStyle
          areaStyle: {
            //支持渐变 https://echarts.apache.org/zh/option.html#color
            color: {
              //线性渐变
              type: "line",
              x: 0,
              y: 0,
              r: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#d6c0e9", // 0% 处的颜色
                },

                {
                  offset: 1,
                  color: "#c8d8ec", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      //设置echarts相当于容器的位置
      grid: {
        //设置表格占满容器
        left: 0,
        right: 0,
        top: 1,
        bottom: 0,
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.charts {
  margin-top: 20px;
  .user {
    display: flex;
    align-items: center;
  }
  .first {
    font-size: 19px;
  }
  .second {
    margin-left: 50px;
    color: #868182;
  }
  .table {
    width: 100%;
    height: 40px;
  }
}
</style>
