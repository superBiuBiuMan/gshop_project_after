<template>
  <el-card>
    <div class="header">
      <span>线上热门搜索</span>
      <!-- @command="handleCommand" -->
      <el-dropdown class="icon">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">黄金糕</el-dropdown-item>
          <el-dropdown-item command="b">狮子头</el-dropdown-item>
          <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
          <el-dropdown-item command="d">双皮奶</el-dropdown-item>
          <el-dropdown-item command="e">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content">
      <el-row :gutter="10">
        <el-col :span="12">
          <Charts title="搜索用户数"></Charts>
        </el-col>
        <el-col :span="12">
          <Charts title="人均搜索次数"></Charts>
        </el-col>
      </el-row>
    </div>
    <div class="showtable" style="margin-top:15px">
        <!-- :data="tableData" -->
        <!-- :default-sort="{ prop: 'date', order: 'descending' }" -->
      <!-- 数据展示 -->
      <el-table
        border
        style="width: 100%;">
        <el-table-column prop="date" label="排名" type="index"  width="80">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字"  width="200">
        </el-table-column>
        <el-table-column prop="address" label="用户数" sortable>
        </el-table-column>
         <el-table-column prop="address" label="周涨幅" sortable>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
        <el-pagination
            style="float:right;padding:5px 0;margin:5px 0"
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>
  </el-card>
</template>

<script>
import Charts from "./Charts";
export default {
  name: "BottomLeft",
  components: {
    Charts,
  },
};
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  .icon {
    float: right;
  }
}
</style>
