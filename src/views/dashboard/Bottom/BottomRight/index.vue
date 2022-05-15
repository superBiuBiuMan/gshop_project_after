<template>
  <el-card>
    <div class="header">
      <span>销售额类别占比</span>
      <el-radio-group v-model="address" size="medium" class="select">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <div ref="dom1" class="table"></div>
  </el-card>
</template>

<script>
import echarts from "echarts";
import throttle from "lodash/throttle"
export default {
  name: "BottomRight",
  data() {
    return {
      //   销售额地址
      address: "全部渠道",
    };
  },
  mounted() {
    var table1 = echarts.init(this.$refs.dom1);
    table1.setOption({
        title:{
            text:"搜索引擎",
            subtext:"1048",
            left:'center',
            top:'center',
        },
      tooltip: {
        trigger: "item",
      },
        //分类显示
    //   legend: {
    //     top: "5%",
    //     left: "center",
    //   },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          //显示图表块描述
          label: {
            show: true,
          },
          //显示图表描述块指向线条
          labelLine: {
            show: true,
          },
          //设置间隙
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
          },
          data: [
            { value: 1048, name: "视频广告" },
            { value: 735, name: "联盟广告" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: "直接访问" },
            { value: 300, name: "搜索引擎" },
          ],
        },
      ],
    });
    // 
    // table1.on('mousemove',(params)=>{
    //                 let {name,value} = params;
    //     table1.setOption({
    //         title:{
    //             text:name,
    //             subtext:value
    //         }
    //     })
    // })
    // 鼠标事件 使用节流阀
    table1.on('mousemove',throttle((params)=>{
        let {name,value} = params;
        table1.setOption({
            title:{
                text:name,
                subtext:value
            }
        })
    },20));
  },
};
</script>

<style  scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.table {
  width: 100%;
  height: 280px;
}
</style>
