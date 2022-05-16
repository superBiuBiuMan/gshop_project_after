<template>
  <div>
    <el-form :inline="true" :model="cForm" class="demo-form-inline" :disabled="forbidden" >
        <!-- 一级分类 -->
        <el-form-item label="一级分类">
          <el-select v-model="cForm.category1Id" placeholder="请选择" @change="selectCategory1">
            <!-- 循环遍历获取的一级分类列表-->
            <el-option
              v-for="item in category1List"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类">
          <el-select v-model="cForm.category2Id" placeholder="请选择" @change="selectCategory2">
            <!-- 循环遍历获取的二级分类列表 -->
            <el-option v-for="item in category2List"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 三级分类 -->
        <el-form-item label="三级分类">
          <el-select v-model="cForm.category3Id" placeholder="请选择" @change="selectCategory3">
            <!-- 循环遍历获取的三级分类列表 -->
            <el-option
              v-for="item in category3List"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelector",
  props:["forbidden"],
  data() {
    return {
      //存储记录选中的三级分类id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      //存储请求获取的分类id
      category1List: [],
      category2List: [],
      category3List: [],
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    // 选中三级分类列表
    selectCategory3(category3Id){
        this.$emit("changeCategory",{
            category3Id
        })
    },
    //  选中二级分类列表,就要获取三级分类列表
    async selectCategory2(category2Id){
      // 存储自己的
      //清空其他分类列表数据
      this.cForm.category3Id = "";
      this.category3List = [];
    //告诉父亲
      this.$emit("changeCategory",{
          category2Id
      })
      const result = await this.$API.attr.getCategory3(category2Id);
      if (result.code === 200) {
        this.category3List = result.data;
      } else {
        this.$message.error("获取三级分类列表失败!");
      }
    },
    // 选中一级分类列表,就要获取二级分类列表
    async selectCategory1(category1Id) {
       //清空其他分类列表数据
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.category2List = [];
      this.category3List = [];
      //告诉父亲
      this.$emit("changeCategory",{
          category1Id
      })
      const result = await this.$API.attr.getCategory2(category1Id);
      if (result.code === 200) {
        this.category2List = result.data;
      } else {
        this.$message.error("获取二级分类列表失败!");
      }
    },
    // 刚进入组件获取一级分类列表
    async getCategory1List() {
      const result = await this.$API.attr.getCategory1();
      if (result.code === 200) {
        this.category1List = result.data;
      } else {
        this.$message.error("获取一级分类列表失败!");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
