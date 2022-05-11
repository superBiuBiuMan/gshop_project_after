<template>
  <div>
    <el-card>
      <!-- 数据展示 -->
      <el-table style="width: 100%; margin-bottom: 10px" border :data="records">
        <!-- 序号 -->
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="80"
        ></el-table-column>
        <!-- 名称 -->
        <el-table-column
          prop="skuName"
          label="名称"
          width="width"
        ></el-table-column>
        <!-- 描述 -->
        <el-table-column
          prop="prop"
          label="skuDesc"
          width="width"
        ></el-table-column>
        <!-- 默认图片 -->
        <el-table-column label="默认图片" width="150" align="center">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <!-- 重量(KG) -->
        <el-table-column
          prop="weight"
          label="重量(KG)"
          width="width"
        ></el-table-column>
        <!-- 价格(元) -->
        <el-table-column
          prop="price"
          label="价格(元)"
          width="80"
        ></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="{ row }">
            <MyButton
              v-if="row.isSale === 1"
              size="mini"
              icon="el-icon-bottom"
              type="success"
              title="下架"
              @click="cancelSale(row)"
            ></MyButton>
            <MyButton
              v-else
              size="mini"
              icon="el-icon-top"
              type="info"
              title="上架"
              @click="upSale(row)"
            ></MyButton>
            <MyButton
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click="$message({type:'info',message:'正在开发中...'})"
              title="修改"
            ></MyButton>
            <MyButton
              size="mini"
              icon="el-icon-info"
              type="info"
              title="查看详细"
            ></MyButton>
            <el-popconfirm :title="`确定删除${row.skuName}吗?`" @onConfirm="deleteSku(row)">
            <MyButton
              size="mini"
              slot="reference"
              icon="el-icon-delete"
              style="margin-left:10px"
              type="danger"
              title="删除"></MyButton>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        style="text-align: center"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        layout="prev, pager, next, jumper, ->, sizes,total"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="limit"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      records: [],
    };
  },
  mounted() {
    this.getSkuInfo();
  },
  methods: {
    //删除sku
    async deleteSku(row){
      try {
        await this.$API.sku.deleteSku(row.id);
        //为了视图可以更新
        this.$message({ type: "success", message: "删除成功!" });
        //更新视图
        this.getSkuInfo(this.records.length>1?this.page:this.page-1);
      } catch (error) {
        this.$message.error("删除失败!请稍后重试!");
        console.log(error);
      }
    },
    //商品下架
    async cancelSale(row) {
      try {
        await this.$API.sku.cancelSale(row.id);
        //为了视图可以更新
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功!" });
      } catch (error) {
        this.$message.error("下架失败!请稍后重试!");
        console.log(error);
      }
    },
    //商品上架
    async upSale(row) {
      try {
        await this.$API.sku.onSale(row.id);
        //为了视图可以更新
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功!" });
      } catch (error) {
        this.$message.error("上架失败!请稍后重试!");
        console.log(error);
      }
    },
    //每页显示数量被改变
    handleSizeChange(size) {
      this.limit = size;
      this.getSkuInfo();
    },
    //更改了页码
    handlePageChange(pageNew) {
      this.getSkuInfo(pageNew);
    },
    //初始化显示数据
    async getSkuInfo(page = 1) {
      this.page = page;
      try {
        const result = await this.$API.sku.getSkuInfo(this.page, this.limit);
        this.total = result.data.total;
        this.records = result.data.records;
      } catch (error) {
        this.$message.error("初始化sku数据失败!请重试!");
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
