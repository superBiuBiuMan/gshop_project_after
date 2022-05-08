<template>
  <div>
    <el-form :model="spuForm" label-width="80px">
      <!-- 名称 -->
      <el-form-item label="SPU名称">
        <el-input v-model="spuForm.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <!-- 品牌  -->
      <el-form-item label="品牌">
        <el-select v-model="spuForm.tmId" placeholder="请选择品牌" label="动感超人">
        </el-select>
      </el-form-item>
      <!-- SPU描述 -->
      <el-form-item label="SPU描述">
        <el-input v-model="spuForm.description" type="textarea" placeholder="SPU描述" rows="4"></el-input>
      </el-form-item>
      <!-- SPU图片 -->
      <el-form-item label="SPU图片">
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :file-list="spuImageList"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-select 
        v-model="spuSaleAttrId" 
        :placeholder="unUsedSpuSaleAttrList.length>0?'还有'+unUsedSpuSaleAttrList.length+'未选择':'没有啦!'">
            <el-option 
            v-for="unUsedAttr in unUsedSpuSaleAttrList"
            :key="unUsedAttr.id"
            :label="unUsedAttr.name"
            :value="unUsedAttr.id">
            </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <!-- 数据展示  -->
        <el-table
          border
          :data="spuForm.spuSaleAttrList"
          style="width: 100%;margin:20px 0">
          <!-- 序号 -->
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80">
          </el-table-column>
          <!-- 属性名 -->
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="150">
          </el-table-column>
          <!-- 属性值名称列表 -->
          <el-table-column
            prop="spuSaleAttrValueList"
            label="属性值名称列表"
            width="width">
            <template slot-scope="{row,$index}">
              <!-- @close="handleClose(tag)"> -->
              <el-tag
                v-for="spuSaleAttr in row.spuSaleAttrValueList"
                :key="spuSaleAttr.id"
                closable
                :disable-transitions="false">
                {{spuSaleAttr.saleAttrValueName}}
              </el-tag>

              <!-- @keyup.enter.native="handleInputConfirm" -->
              <!-- @blur="handleInputConfirm" -->
              <el-input
                  v-if="inputVisible"
                  class="input-new-tag"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  >
              </el-input>
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" >+ 添加</el-button>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            prop="prop"
            label="操作"
            width="150">
          </el-table-column>
        </el-table>
        <!-- 按钮操作 -->
        <el-button type="primary">保存</el-button>
        <!-- 同步取消 -->
        <el-button @click="$emit('update:visible',false)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuForm",
  data() {
    return {
      spuForm: {
        category3Id: "",
        //SPU名称
        spuName: "",
        //品牌id
        tmId: "",
        //SPU描述
        description: "",
        id: "",
        //SPU图片列表
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        //自己已经有的销售属性
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   isChecked: "string",
          //   saleAttrName: "string",
          //   saleAttrValueName: "string",
          //   spuId: 0,
          // },
        ],
      },

      //临时存放初始化的时候获取的数据
      //因为后期可能需要对获取到的数据进行处理
      //图片列表数据
      spuImageList:[],
      //所有的品牌列表
      trademarkList:[],
      //所有的spu销售属性
      baseSaleAttrList:[],

      //销售属性相关,不知道用不用的上
      spuSaleAttrId:"",

      //tag相关
      inputVisible: false,
      inputValue: '', 

      
      // 上传图片相关
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed:{
    unUsedSpuSaleAttrList(){
      // this.spuForm.spuSaleAttrValueList;//自己已经有的销售属性
      // this.baseSaleAttrList;//所有的销售属性
      return this.baseSaleAttrList.filter(allAttrItem => {
          return this.spuForm.spuSaleAttrList.every(existAttrItem => {
            return allAttrItem.name !== existAttrItem.saleAttrName
          })
      })
    }
  },
  methods: {
    //用户单击添加SPU后初始化数据,为什么要这样子呢,因为这个不是路由组件
    //来回切换是不会销毁重新构建的,也就是说不会重复触发mounted,也就是不会重复触发路由组件
    //所以可以使用$refs调用子类当中方法并传递数据
    async initUpdateFormData(spuId){

          /* 获取当前spu名称和spu的描述信息和已经具有的售卖属性 */
          // http://106.13.220.33:9260/admin/product/getSpuById/4922
          const result = await this.$API.spu.getSpuById(spuId)
          if(result.code === 200){
            this.spuForm = result.data;
          }

          /* 获取当前商品SPU图片 */
          // http://106.13.220.33:9260/admin/product/spuImageList
          const imgList = await this.$API.sku.getSpuImageList(spuId)
          if(imgList.code === 200){
            //添加name 和 url 属性,以便可以让el-upload展示数据
            let temp = imgList.data;
            temp.forEach(item=>{
              item.name = item.imgName;
              item.url = item.imgUrl;
            })
            this.spuImageList = temp;
          }

          /* 获取所有的SPU品牌(里面也有图片数据) */
          // http://106.13.220.33:9260/admin/product/baseTrademark/getTrademarkList
          const trademarkResult = await this.$API.trademark.getTrademarkList()
          if(trademarkResult.code === 200){
            this.trademarkList = trademarkResult.data;
          }

          /* 获取当前商品的售卖属性 */
          // http://106.13.220.33:9260/admin/product/baseSaleAttrList 
          const saleList = await this.$API.spu.getBaseSaleAttrList()
          if(saleList.code === 200){
            this.baseSaleAttrList = saleList.data;
          }
    },
    //用户单击添加SPU后初始化数据,为什么要这样子呢,因为这个不是路由组件
    //来回切换是不会销毁重新构建的,也就是说不会重复触发mounted,也就是不会重复触发路由组件
    //所以可以使用$refs调用子类当中方法并传递数据
    async initAddSpuFormData(){
        /* 获取所有的SPU品牌(里面也有图片数据) */
        // http://106.13.220.33:9260/admin/product/baseTrademark/getTrademarkList
        const trademarkResult = await this.$API.trademark.getTrademarkList()
        if(trademarkResult.code === 200){
          this.trademarkList = trademarkResult.data;
        }

        /* 获取当前商品的售卖属性 */
        // http://106.13.220.33:9260/admin/product/baseSaleAttrList 
        const saleList = await this.$API.spu.getBaseSaleAttrList()
        if(saleList.code === 200){
          this.baseSaleAttrList = saleList.data;
        }
    },

    //上传文件相关
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //tag相关
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
    }
  }
};
</script>

<style  scoped>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
