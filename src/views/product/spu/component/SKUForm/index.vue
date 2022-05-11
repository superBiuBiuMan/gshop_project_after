<template>
  <div>
    <el-form  :model="skuForm" label-width="80px">
      <!-- SPU 名称 -->
      <el-form-item label="SPU 名称">
        {{spu.spuName}}
      </el-form-item>
      <!-- SKU 名称 -->
      <el-form-item label="SKU 名称">
        <el-input v-model="skuForm.skuName" placeholder="SKU 名称"></el-input>
      </el-form-item>
      <!-- 价格(元) -->
      <el-form-item label="价格(元)">
        <el-input v-model="skuForm.price" placeholder="SKU 价格" type="number"></el-input>
      </el-form-item>
      <!-- 重量(千克) -->
      <el-form-item label="重量(千克)">
        <el-input v-model="skuForm.weight" placeholder="SKU 重量" type="number"></el-input>
      </el-form-item>
      <!-- 规格描述 -->
      <el-form-item label="规格描述">
        <el-input v-model="skuForm.skuDesc" placeholder="SKU 规格描述" type="textarea" rows="4"></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <el-form inline label-width="80px" >
          <el-form-item v-for="(attr) in attrInfoList" :label="attr.attrName" :key="attr.id" style="margin: 5px 0px;">
            <el-select  placeholder="请选择" v-model="attr.attrIdAndValueId"  >
                <el-option
                   v-for="attrValue in attr.attrValueList"
                  :key="attrValue.id"
                  :label="attrValue.valueName"
                  :value="`${attr.id}:${attrValue.id}`"
                  >
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-form inline label-width="80px">
          <el-form-item v-for="(spuSaleAttr) in spuSaleAttrList" :label="spuSaleAttr.saleAttrName" :key="spuSaleAttr.id">
            <!-- 收集 saleAttrId 和  saleAttrValueId即可 -->
            <el-select  placeholder="请选择" v-model="spuSaleAttr.saleIdAndsaleAttrId"  >
                <el-option
                   v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                  :key="spuSaleAttrValue.id"
                  :label="spuSaleAttrValue.saleAttrValueName"
                  :value="`${spuSaleAttr.id}:${spuSaleAttrValue.id}`"
                  >
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 图片列表 -->
      <el-form-item label="图片列表">
        <el-table
          :data="spuImageList"
          border
          @selection-change="handelSelectionChange"
          style="width: 100%;margin:0 0 20px 0">
          <!-- 全选框 -->
          <el-table-column
            type="selection"
            
            width="50">
          </el-table-column>
          <!-- 图片 -->
          <el-table-column
            label="图片"
            width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <!-- 名称 -->
          <el-table-column
            label="名称"
            prop="imgName"
            width="width">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            label="操作"
            width="width">
            <template slot-scope="{row}">
              <el-button type="primary" v-if="row.isDefault === '0'" @click="setDefaultImage(row)">设为默认</el-button>
              <el-tag v-else type="success" size="mini">默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!-- 按钮操作 -->
        <!-- @click="saveInfo" -->
        <el-button type="primary" @click="saveInfo">保存</el-button>
        <!-- 同步取消 -->
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SKUForm',
  data(){
    return {
      skuForm:{
          // 父组件传递
          category3Id: "",
          tmId: "",
          spuId: "", // SPU的id
          //v-model直接收集
          price: "",
          skuDesc: "",
          skuName: "",
          weight: "",
          //代码收集
          // 默认显示图片 
          skuDefaultImg: "",
          //平台属性
          skuAttrValueList: [
            //收集attrId,valueId即可
            // {
            //   "attrId": 0,
            //   "attrName": "string",
            //   "id": 0,
            //   "skuId": 0,
            //   "valueId": 0,
            //   "valueName": "string"
            // }
          ],
          //销售属性
          skuSaleAttrValueList: [
            //收集 saleAttrId 和  saleAttrValueId即可
            // {
            //   "id": 0,
            //   "saleAttrId": 0,
            //   "saleAttrName": "string",
            //   "saleAttrValueId": 0,
            //   "saleAttrValueName": "string",
            //   "skuId": 0,
            //   "spuId": 0
            // }
          ],
          //sku当中的全部图片列表,我们要从中选几张作为当前sku的图片
          skuImageList:[],
      },
      //暂存初始化获取的数据,后期要处理
      spu:{},
      //所有的SPU图片
      spuImageList:[],
      //勾选中的图片
      userSelectImageList:[],
      spuSaleAttrList:[],
      attrInfoList:[],
    }
  },
  methods:{
    // 用户单击'取消'
    cancel(){
      //清空数据
      this.resetData();
      this.$emit("update:visible",false);
    },
    // 清空数据
    resetData(){
      this.skuForm = {
          // 父组件传递
          category3Id: "",
          tmId: "",
          spuId: "", // SPU的id
          //v-model直接收集
          price: "",
          skuDesc: "",
          skuName: "",
          weight: "",
          //代码收集
          // 默认显示图片 
          skuDefaultImg: "",
          //平台属性
          skuAttrValueList: [
            //收集attrId,valueId即可
          ],
          //销售属性
          skuSaleAttrValueList: [
            //收集 saleAttrId 和  saleAttrValueId即可
          ],
          //sku当中的全部图片列表,我们要从中选几张作为当前sku的图片
          skuImageList:[],
      };
      this.spu = {};
      //所有的SPU图片
      this.spuImageList = [];
      //勾选中的图片
      this.userSelectImageList = [];
      this.spuSaleAttrList = [];
      this.attrInfoList = [];
    },
    // 用户单击'保存'按钮
    async saveInfo(){
      //0.发送前准备
      let {price,skuDesc,skuName,weight} = this.skuForm;
      if(!price || !skuDesc || !skuName || !weight){
        this.$message.info("请输入完整的信息!");
        return;
      }
      //1.收集数据
      let {attrInfoList,spuSaleAttrList,userSelectImageList} = this;
      //2.整理数据
        //平台属性整理
      this.skuForm.skuAttrValueList = attrInfoList.reduce((prev,item)=>{
        if(item.attrIdAndValueId){
          let [attrId,valueId] = item.attrIdAndValueId.split(":");
          prev.push({attrId,valueId});
        }
        return prev;
      },[])
        //销售属性
      this.skuForm.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
        if(item.saleIdAndsaleAttrId){
          let [saleAttrId,saleAttrValueId] = item.saleIdAndsaleAttrId.split(":");
          prev.push({saleAttrId,saleAttrValueId});
        }
        return prev;
      },[])
        //图片列表
      this.skuForm.skuImageList = userSelectImageList.map(item => {
          return {
            imgName:item.imgName,
            imgUrl:item.imgUrl,
            isDefault:item.isDefault,
            spuImgId:item.id
          }
      })
      //3.发送请求
      try {
        //4.成功干嘛
        const result = await this.$API.sku.saveSkuInfo(this.skuForm);
        this.$message.success("保存成功!");
        //返回并且数据要清空
        this.$emit("update:visible",false);
        //清空数据
        this.resetData();
      } catch (error) {
        //5.失败干嘛
        this.$message.error("保存失败!");
        console.log(error);
      }
    },
    // 用户单击'设为默认'
    setDefaultImage(row){
      //排他思想
      this.spuImageList.forEach(item => item.isDefault = '0');
      //设置自己为'选中'
      row.isDefault = '1';
      //存储默认
      this.skuForm.skuDefaultImg = row.imgUrl;
    },
    // 选择框被选中
    handelSelectionChange(selectList){
      this.userSelectImageList = selectList;
    },
    //初始化数据显示
    initUpdateFormData(row,category1Id,category2Id){
      this.spu = row;
      //存储category3ID
      this.skuForm.category3Id = row.category3Id;
      //存储tmId
      this.skuForm.tmId = row.tmId;
      //SPU的id
      this.skuForm.spuId = row.id;
      // http://106.13.220.33:9260/admin/product/spuImageList/6429 //row.id
      const promise1 = this.$API.sku.getSpuImageList(row.id);
      // http://106.13.220.33:9260/admin/product/spuSaleAttrList/6429 //row.id
      const promise2 = this.$API.sku.getSpuSaleAttrList(row.id);
      // http://106.13.220.33:9260/admin/product/attrInfoList/2/13/61 category1,2,3级id参数
      const promise3 = this.$API.attr.getCategoryList(category1Id,category2Id,row.category3Id);
      //Promise.all统一处理
      Promise.all([promise1,promise2,promise3]).then((resolve)=>{
        let temp = resolve[0].data;
        //添加是否默认选中,设置全部默认为0,即不选中
        temp.forEach(item => item.isDefault = '0');
        //添加属性,由于这里是为改变整个对象指向,所以不用设置$set~
        this.spuImageList = temp;
        this.spuSaleAttrList = resolve[1].data;
        this.attrInfoList = resolve[2].data;
      }).catch(reason=>{
        this.$message.error(reason.message||reason.data);
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
