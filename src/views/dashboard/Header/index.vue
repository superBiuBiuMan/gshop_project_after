<template>
  <div>
      <el-row :gutter="10">
        <el-col :span="6">
            <Card title="总销售额" data="¥ 126560">
                <template slot="charts">
                     周同比&nbsp;56.67%%<svg t="1652442671186" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2207" width="12" height="12"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="2208" fill="#d81e06"></path></svg>
                    &nbsp;日同比&nbsp;19.16%<svg t="1652442817575" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3100" width="12" height="12"><path d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z" p-id="3101" fill="#1afa29"></path></svg>
                </template>
                <template slot="footer">
                    日销售额¥&nbsp;12423
                </template>
            </Card>
        </el-col>
        <el-col :span="6">
            <Card title="访问量" data="88460">
                <template slot="charts">
                    <TableLine/>
                </template>
                <template slot="footer">
                    日访问量&nbsp;1234
                </template>
            </Card>
        </el-col>
        <el-col :span="6">
            <Card title="支付笔数" data="88460">
                <template slot="charts">
                    <TableBar/>
                </template>
                <template slot="footer">
                    转化率&nbsp;65%
                </template>
            </Card>
        </el-col>
        <el-col :span="6">
            <Card title="运营活动效果" data="78%">
                <template slot="charts">
                    <TableProgress/>
                </template>
                <template slot="footer">
                    周同比&nbsp;12%<svg t="1652442671186" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2207" width="12" height="12"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="2208" fill="#d81e06"></path></svg>
                    &nbsp;日同比&nbsp;11%<svg t="1652442817575" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3100" width="12" height="12"><path d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z" p-id="3101" fill="#1afa29"></path></svg>
                </template>
            </Card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import Card  from "./Card"
//折线图
import TableLine from "./TableLine"
//柱形图
import TableBar from "./TableBar"
//进度
import TableProgress from "./TableProgress"
export default {
  name: '',
  components:{
      Card,
      TableLine,
      TableBar,
      TableProgress
  }
}
</script>

<style lang="scss" scoped>

</style>
