<template>
  <el-card class="el-card">
      <!-- 头部 -->
    <div slot="header" class="clearfix">
        <!-- v-model="activeName" @tab-click="handleClick" -->
      <el-tabs class="tabLeft" v-model="title">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <div class="tabRight">
            <span @click="setThisToday">今日</span>
            <span @click="setThisWeek">本周</span>
            <span @click="setThisMonth">本月</span>
            <span @click="setThisYear">本年</span>
          <!-- 时间选择 -->
           <!-- :default-time="['12:00:00']" -->
            <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="timeDate"
            class="date"
            type="daterange"
            size="mini"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
      </div>
    </div>
    <el-row :gutter="10" class="content">
      <!-- 图表区域 -->
      <el-col :span="18"  class="contentLeft" ref="dom"></el-col>
      <!-- 数字区域 -->
      <el-col :span="6" class="contentRight">
        <span>门店{{showTitle}}排名</span>
        <ul>
          <li>
            <span class="content-index top">1</span>
            <span>肯德基</span>
            <span class="content-value">323,234</span>
          </li>
           <li>
            <span class="content-index top">2</span>
            <span>麦当劳</span>
            <span class="content-value ">299,134</span>
          </li>
           <li>
            <span class="content-index top">3</span>
            <span>华莱士</span>
            <span class="content-value">283.998</span>
          </li>
           <li>
            <span class="content-index">4</span>
            <span>海底捞</span>
            <span class="content-value">266,223</span>
          </li>
             <li>
            <span class="content-index">5</span>
            <span>五谷鱼粉</span>
            <span class="content-value">223.445</span>
          </li>
             <li>
            <span class="content-index">6</span>
            <span>汉堡王</span>
            <span class="content-value">219.663</span>
          </li>
             <li>
            <span class="content-index">7</span>
            <span>真功夫</span>
            <span class="content-value">200,997</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
//绘图
import echarts from "echarts";
//日期格式的
import moment from "moment"
export default {
  name: "Sale",
  data(){
    return{
      // 存储时间
        //索引为0即为开始时间,索引为1即为结束时间
      timeDate:[],
      //标题
      title:"sale",
      //图表
      table1:{},
      //二个系列数据
      seriesData:[
        [{
          type:'bar',
          color:'#5571c0',
          //设置线条粗细
          barWidth:40,
          data:[207,196,348,297,308,181,266,238,307,137,143,418]
        }],
         [{
            type:'bar',
            color:'#5571c0',
            //设置线条粗细
            barWidth:40,
            data:[221,129, 403 ,376, 173 ,377 ,256 ,419 ,233 ,185 ,262 ,302]
          }],
      ]
    }
  },
  computed:{
    //展示的标题
    showTitle(){
      return this.title ==='sale'?'销售额':'访问量';
    }
  },
  watch:{
    title(){
      //重新设置图表的标题
      this.table1.setOption({
        title:{
          text:this.showTitle+"趋势"
        },
        series:this.title ==='sale'?this.seriesData[0]:this.seriesData[1]
      })
    }
  },
  mounted(){
    //设置统计图
    this.table1 = echarts.init(document.getElementsByClassName("contentLeft")[0]);
    this.table1.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
      title:{
        text:this.showTitle+"趋势"
      },
      xAxis:{
        type:'category',
        data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]
      },
      yAxis:{
        //隐藏y轴线
        axisLine:{
          show:false
        },
        //隐藏刻度线
        axisTick:{
          show:false
        }
      },
      grid:{
        left:50,
        right:50
      },
      series:this.title ==='sale'?this.seriesData[0]:this.seriesData[1]
    })
  },
  methods:{
    // 今日
    setThisToday(){
      //注意不可以通过索引修改!不然就不是响应式数据了
      this.timeDate = [moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")]
    },
    //这个星期
    setThisWeek(){
      this.timeDate = [moment().day(1).format("YYYY-MM-DD"),moment().day(7).format("YYYY-MM-DD")]
    },
    //这个月
    setThisMonth(){
      this.timeDate = [moment().startOf('month').format("YYYY-MM-DD"),moment().endOf('month').format("YYYY-MM-DD")]
    },
    //这一年
    setThisYear(){
      this.timeDate = [moment().startOf('year').format("YYYY-MM-DD"),moment().endOf('year').format("YYYY-MM-DD")]
    }
  }
};
</script>
<style lang="scss" scoped>
.el-card {
  margin-top: 10px;
  .clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
    //导航左边
    .tabLeft{
        width: 100%;
    }
    //导航右边
    .tabRight{
        // display: flex;
        position: absolute;
        right: 0;
        .date{
            width: 220px;
            margin: 0 20px;
        }
        &>span{
            margin-right: 20px;
            // line-height: unset;
        }
    }
  }
  .content{
    display: flex;
    justify-content: space-between;
    .contentLeft{
      width: 100%;
      height: 350px;
    }
    .contentRight{
      ul{
        margin: 0;
        padding: 0;
        margin-top: 20px;
        width: 100%;
        height: 300px;
      }
      li{
        height: 14%;
        list-style: none;
      }
      & span{
        margin: 0 10px;
      }
      .content-index{
        float: left;
        width: 22px;
        line-height: 22px;
        text-align: center;
        &.top{
          border-radius: 50%;
          background-color: black;
          color: white;
        }
      }
      .content-value{
        float: right;
      }
    }
  }
  
}
</style>
