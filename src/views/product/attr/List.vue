<template>
  <div>
    <el-card>
      <CategorySelector @changeCategory="changeCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top: 20px"></el-card>
  </div>
</template>

<script>
export default {
  name: 'Attr',
  data(){
    return {
      category1Id:"",
      category2Id:"",
      category3Id:"",
      attrList:[]
    }
  },
  methods:{
    // 分类列表发生改变
    changeCategory(categoryIdObj){
      if (categoryIdObj.category1Id){
        this.category1Id = categoryIdObj.category1Id;
      }else if (categoryIdObj.category2Id){
        this.category2Id = categoryIdObj.category2Id;
      }else if (categoryIdObj.category3Id){
        this.category3Id = categoryIdObj.category3Id;
        //发送请求获取属性列表
        this.getAttrList();
      }
    },
    // 获取属性列表
    async getAttrList(){
      let { category1Id,category2Id,category3Id } = this;
      const result = await this.$API.attr.getCategoryList(category1Id,category2Id,category3Id)
      if(result.code === 200){
        this.attrList = result.data;
      }else{
        this.$message.error("获取属性列表失败,请重试!");
      }
    },
  }
}
</script>

<style lang="less" scoped>

</style>
