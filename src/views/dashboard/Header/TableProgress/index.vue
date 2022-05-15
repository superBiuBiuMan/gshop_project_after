<template>
  <div ref="dom" class="charts">

  </div>
</template>

<script>
import echarts from "echarts"
export default {
  name: 'TableProgress',
  mounted(){
      var table1 = echarts.init(this.$refs.dom);
      table1.setOption({
          //设置x轴,现在x轴在水平线上了
          //min最小值 范围
          //max:最大值 范围
          xAxis:{show:false,min:0,max:100},
          //设置y轴,现在y轴在垂直线上了
          yAxis:{show:false,type:"category"},
          //设置位置
          grid:{
              left:0,
              right:0,
              top:0,
              bottom:0
          },
          series:[
              {
                  type:'bar',
                  barWidth:10,
                  //设置颜色
                  color:"#92b532",
                  data:[78],
                  //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。  
                  label:{
                      show:true,
                      //内容
                      formatter:"|",
                      //标签的位置。
                      position:'right'
                  }
              }
          ]
      })
  }
}
</script>

<style scoped>
.charts{
    width: 100%;
    height: 100%;
}
</style>
