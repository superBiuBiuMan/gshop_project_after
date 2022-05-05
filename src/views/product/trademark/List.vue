<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <!-- 数据展示 -->
    <!-- type定义类型为自增index -->
    <!-- label 当前段的名称 -->
    <!-- border添加边框 -->
    <!-- width设置列的宽度,如果只设置了一个其他没有设置,则没有设置的平分剩余的 -->
    <!-- align="center " 可以使得列居中 -->
    <el-table 
      :data="trademarkList"
      border style="width: 100%; margin: 20px 0">
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="80"
      >
      </el-table-column>

      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>

      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!-- 使用<el-table-column当中的插槽 -->
        <!-- row 代表遍历的每一项遍历数据当中的值,$index代表遍历的索引(0,1,2,3...) -->
        <template slot-scope="{row,$index}">
            <img :src="row.logoUrl" style="width:80px;height:60px"/>
        </template>
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="width">
          <el-button type="warning" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <!-- @size-change="handleSizeChange" 每页显示的数量被改变的回调-->
    <!-- @current-change="handleCurrentChange" 页码被单击的回调-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getBaseTradeMark"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 6, 12]"
      :page-size="3"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Trademark",
  data() {
    return {
      //当前页
      page: 1,
      //每页显示数据
      limit: 3,
      //数据总数
      total: 0,
      //数据列表
      trademarkList: [],
    };
  },
  mounted() {
    this.getBaseTradeMark();
  },
  methods: {
    // 获取页面品牌信息
    async getBaseTradeMark(page=1) {
      this.page = page;
      const result = await this.$API.trademark.getBaseTradeMark(
        this.page,
        this.limit
      );
      if (result.code == 200) {
        this.trademarkList = result.data.records;
        this.total = result.data.total;
      }
    },
    // 每页显示数量被改变
    handleSizeChange(size){
      this.limit = size;
      this.getBaseTradeMark();
    }
  },
};
</script>

<style lang="less" scoped>
</style>
