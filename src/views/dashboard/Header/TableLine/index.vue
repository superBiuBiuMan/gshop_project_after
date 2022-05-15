<template>
  <div ref="dom" class="charts">

  </div>
</template>

<script>
//引入echarts
import echarts from "echarts"
export default {
  name: "TableLine",
  mounted(){
      var table1 = echarts.init(this.$refs.dom);
      table1.setOption({
          xAxis:{
              //隐藏坐标轴
              show:false,
              type:"category"
          },
          yAxis:{
              //隐藏坐标轴
              show:false,
          },
          series:[
              //设置了渐变
              {
                  smooth: true,//圆滑线条
                  type:"line",
                  data:[45,35,25,87,45,89],
                  itemStyle:{
                    //   图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                    opacity:0,
                    //颜色设置为紫色
                    color:'purple'
                  },
                  //areaStyle区域填充样式。设置后显示成区域面积图。
                    //https://echarts.apache.org/zh/option.html#series-line.areaStyle
                  areaStyle:{
                      //支持渐变 https://echarts.apache.org/zh/option.html#color
                      color:{
                          //线性渐变
                            type: 'line',
                            x: 0,
                            y: 0,
                            r: 0,
                            colorStops: [{
                                offset: 0, color: '#ce9dce' // 0% 处的颜色
                                }, 

                                {
                                offset: 1, color: '#dcb9dc' // 100% 处的颜色
                                } 
                            ],
                            global: false // 缺省为 false
                      }
                  }
              }
          ],
          //设置echarts相当于容器的位置
          grid:{
              //设置表格占满容器
              left:0,
              right:0,
              top:1,
              bottom:0
          }
      })
  }
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
