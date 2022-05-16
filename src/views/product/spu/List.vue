<template>
<div>
    <!-- 三级联动 -->
   <el-card v-show="isShowCategoryList">
      <CategorySelector  @changeCategory="changeCategory" :forbidden="isAddOrEditProperty"></CategorySelector>
      <!-- <CategorySelector  @changeCategory="changeCategory" :isShowList="isShowList"></CategorySelector> -->
    </el-card>

    <el-card style="margin:20px 0">
      <div v-show="!isSKUForm && !isSPUForm">
      <el-button type="primary" icon="el-icon-plus" @click="clickAddEditSPU" :disabled='!category3Id' v-if="$hasBtn('btn.Spu.add')">添加SPU</el-button>
        <!-- 数据展示 -->
        <el-table
          :data="records"
          border
          style="width: 100%">
          <!-- 序号 -->
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80">
          </el-table-column>
          <!-- SPU名称 -->
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width">
          </el-table-column>
          <!-- SPU描述 -->
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            label="操作"
            width="width">
            <template slot-scope="{row}">
              <MyButton title="添加SKU" type="success" icon="el-icon-plus"  @click="clickAddSKU(row)" size="mini" v-if="$hasBtn('btn.Spu.addsku')"></MyButton>
              <MyButton title="修改SPU" type="primary" icon="el-icon-edit"  @click="clickEditSPU(row)" size="mini" v-if="$hasBtn('btn.Spu.update')"></MyButton>
              <MyButton title="查看SKU列表" type="info" icon="el-icon-info" size="mini" @click="showSPUList(row)" v-if="$hasBtn('btn.Spu.skus')"></MyButton>
              <el-popconfirm :title="`确定删除${row.spuName}吗?`" @onConfirm="deleteSpu(row.id)">
                <MyButton title="删除SPU" style="margin-left:10px" type="danger" icon="el-icon-delete" slot="reference" size="mini" v-if="$hasBtn('btn.Spu.delete')"></MyButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination 
          style="text-align:center"
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3,6,9]"
          @current-change="getAttrList"
          @size-change="changeLimit"
          layout=" prev, pager, next, jumper,->,sizes,total">
        </el-pagination>
      </div>
     <SPUForm v-show="isSPUForm" ref="spu" :visible.sync="isSPUForm" @successBack="successBackSPU" @cancelBack="cancelBackSPU"></SPUForm>
     <SKUForm v-show="isSKUForm" ref="sku" :visible.sync="isSKUForm"  ></SKUForm>
     <el-dialog :title="`${selectSPU.spuName}的SKU列表`" :visible.sync="showSKUInfoDialog" :before-close="handelCloseDialog">
          <el-table
            :data="skuAttrInfo"
            v-loading="loading"
            style="width: 100%">
            <!-- 名称 -->
            <el-table-column
              prop="skuName"
              label="名称"
              width="width">
            </el-table-column>
            <!-- 价格 -->
            <el-table-column
              prop="price"
              label="价格(元)"
              width="width">
            </el-table-column>
            <!-- 重量 -->
            <el-table-column
              prop="weight"
              label="重量(KG)"
              width="width">
            </el-table-column>
            <!-- 默认图片  -->
            <el-table-column
              label="默认图片"
              width="width">
              <template slot-scope="{row}">
                <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
              </template>
            </el-table-column>
          </el-table>
      </el-dialog>
    </el-card>
</div>
</template>

<script>
import SPUForm from "./component/SPUForm"
import SKUForm from "./component/SKUForm"
export default {
  name: 'Spu',
  data(){
    return {
      category1Id:"",
      category2Id:"",
      category3Id:"",
      //控制添加/删除属性的显示隐藏
      isAddOrEditProperty:false,
      page:1,
      limit:3,
      total:0,
      records:[],
      //控制SPUForm和SKUForm的显示隐藏和数据展示的显示隐藏
      isSPUForm:false,
      isSKUForm:false,
      //SPU当中的sku属性列表
      skuAttrInfo:[],
      //控制sku属性显示/隐藏
      showSKUInfoDialog:false,
      //选中显示的SPU的数据
      selectSPU:{},     
      //sku表格数据的加载loading效果
      loading:true,
    }
  },
  computed:{
    //控制三级联动的显示隐藏
    isShowCategoryList(){
      return !this.isSKUForm;
    }
  },
  methods:{
    //关闭dialog之前的回调
    handelCloseDialog(done){
      //初始化
      this.loading = true;
      //数据清空
      this.skuAttrInfo = [];
      //结束对话框
      done();
    },
    // 查看SKU列表
    async showSPUList(row){
      this.loading = true;
      //显示dialog
      this.showSKUInfoDialog = true;
      this.selectSPU = row;
      try {
        const result = await this.$API.sku.getSkuInfoFromSpuId(row.id);
        //获取数据成功
        this.loading = false;
        this.skuAttrInfo = result.data;
      } catch (error) {
        this.$message.error("获取SKU失败!请重试!");
      }
    },
    // 用户确认删除spu
    async deleteSpu(id){
      try {
        await this.$API.spu.remove(id);
        //删除成功
        this.$message.success("删除成功!");
        //更新数据
        this.getAttrList(this.records.length>1?this.page:this.page-1);
      } catch (error) {
        //删除失败
        this.$message.error("删除失败!");
      }
    },
    // 用户单击取消
    cancelBackSPU(){
      this.spuId = null;
    },
    // 用户成功修改/更新数据
    successBackSPU(){
      if(this.spuId){
        //存在,修改属性
        //回到当前页
        this.getAttrList(this.page);
      }else{
        //不存在,添加属性
        //返回第一页去
        this.getAttrList();
      }
      //清空,为下一个准备
      this.spuId = null;
    },
    // 用户单击修改SPU
    clickEditSPU(row){
      //用于区分是修改还是删除
      this.spuId = this.category3Id;
      this.isSPUForm = true;
      //后期如果需要可以传递数据
      //传入1,2,3级别id
      this.$refs.spu.initUpdateFormData(row.id);
    },
    // 用户单击添加SPU 
    clickAddEditSPU(){
      this.isSPUForm = true;
      //后期如果需要可以传递数据
      this.$refs.spu.initAddSpuFormData(this.category3Id);
    },
    // 用户单击添加SKU
    clickAddSKU(row){
      this.isSKUForm = true;
      this.$refs.sku.initUpdateFormData(row,this.category1Id,this.category2Id);
    },
    //每页显示数量被改变
    changeLimit(size){
      this.limit = size;
      this.getAttrList();
    },
    // 三级分类都选中后发送请求获取类别
    async getAttrList(page = 1){
      this.page = page;
      try {
        const result = await this.$API.spu.getList(this.page,this.limit,this.category3Id);
        this.records = result.data.records;
        this.total = result.data.total;
      } catch (error) {
        console.log(error);
        this.$message.error("获取列表失败!");
      }
    },
    // 列表被改变
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
    }
  },
  components:{
    SKUForm,
    SPUForm
  }
}
</script>

<style lang="less" scoped>

</style>
