<template>
  <div>
    <el-form :model="spuForm" label-width="80px">
      <!-- 名称 -->
      <el-form-item label="SPU名称">
        <el-input v-model="spuForm.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <!-- 品牌  -->
      <el-form-item label="品牌">
        <el-select  v-model="spuForm.tmId" placeholder="请选择品牌">
          <el-option v-for="(trademark) in trademarkList" :key="trademark.id" :label="trademark.tmName" :value="trademark.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- SPU描述 -->
      <el-form-item label="SPU描述">
        <el-input v-model="spuForm.description" type="textarea" placeholder="SPU描述" rows="4"></el-input>
      </el-form-item>
      <!-- SPU图片 -->
      <el-form-item label="SPU图片">
        <el-upload
            action="/dev-api/admin/product/fileUpload"
            list-type="picture-card"
            :on-success="upfileSuccess"
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
        v-model="spuSaleAttrIdAndName" 
        :placeholder="unUsedSpuSaleAttrList.length>0?'还有'+unUsedSpuSaleAttrList.length+'未选择':'没有啦!'">
            <el-option 
            v-for="unUsedAttr in unUsedSpuSaleAttrList"
            :key="unUsedAttr.id"
            :label="unUsedAttr.name"
            :value="`${unUsedAttr.id}:${unUsedAttr.name}`">
            </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!spuSaleAttrIdAndName">添加销售属性</el-button>
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
              <!-- @close="handleClose(tag)" -->
              <el-tag
                v-for="(spuSaleAttr,index) in row.spuSaleAttrValueList"
                :key="spuSaleAttr.id"
                @close="row.spuSaleAttrValueList.splice(index,1)"
                closable
                :disable-transitions="false">
                {{spuSaleAttr.saleAttrValueName}}
              </el-tag>

              <!-- @keyup.enter.native="handleInputConfirm" -->
              <!-- @blur="handleInputConfirm" -->
              <el-input
                  v-if="row.inputVisible"
                  class="input-new-tag"
                  v-model="row.inputValue"
                  ref="saveTagInput"
                  @blur="handleInputConfirm(row)"
                  @keyup.enter.native="handleInputConfirm(row)"
                  size="small">
              </el-input>
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ 添加</el-button>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            prop="prop"
            label="操作"
            width="150">
            <template slot-scope="{$index}">
              <MyButton icon="el-icon-delete" title="删除" type="danger" size="mini" @click="spuForm.spuSaleAttrList.splice($index,1)"></MyButton>
            </template>
          </el-table-column>
        </el-table>
        <!-- 按钮操作 -->
        <el-button type="primary" @click="saveInfo">保存</el-button>
        <!-- 同步取消 -->
        <el-button @click="cancel">取消</el-button>
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
              // baseSaleAttrId:1
              // id:11
              // saleAttrName:"颜色"
              // spuId:6,
              // spuSaleAttrValueList:[
                  // {
                  //     baseSaleAttrId:1
                  //     id:25 //添加的时候不需要
                  //     isChecked:null 不需要这个
                  //     saleAttrName:"颜色"
                  //     saleAttrValueName:"黑"
                  //     spuId:6 //添加的时候不需要
                  // },
              //]
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
      //销售属性相关
      spuSaleAttrIdAndName:"",

      //tag相关
      // inputVisible: false,
      // inputValue: '', 
      // 上传图片相关
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed:{
    // 计算剩余没有添加的销售属性
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
    async initAddSpuFormData(category3Id){
        this.spuForm.category3Id = category3Id
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
    
    //用户单击'取消'操作
    cancel(){
      //关闭SPUForm
      this.$emit("update:visible",false);
      //清空数据
      this.resetSpuForm();
      //通知父亲
      this.$emit("cancelBack");
    },
    //用户单击'保存'按钮操作
    async saveInfo(){
      //1.收集数据
      let {spuForm,spuImageList} = this;
      //2.整理数据
      spuForm.spuSaleAttrList = spuForm.spuSaleAttrList.map(item=>{
          // 删除inputValue
          delete item.inputValue;
          // 删除inputVisible
          delete item.inputVisible;
          return item;
      })
      // spuImageList老师的是值imgName,imgUrl,难道老师是全部设置为更新吗? 我试试看处理id
      /* 老师的 */
      spuImageList = spuImageList.map(item=>{
        return {
          imgName:item.name,
          imgUrl:item.imgUrl||item.response.data
        }
      })
      /* 我想改的 */
      // spuImageList = spuImageList.map(item=>{
      //   //如果id存在,说明是原来的图片,直接返回
      //   if(item.id){
      //     return item;
      //   }
      //   else{
      //     return {
      //       imgName:item.name,
      //       imgUrl:item.response.data
      //     }
      //   }
      // })
      spuForm.spuImageList = spuImageList;
      //3.发送请求
      const result = await this.$API.spu.addOrUpdate(spuForm);
      try {
        //4.成功干嘛
        this.$message.success("保存成功");
        //返回到页面
        this.$emit("update:visible",false);
        //告诉父亲更新数据和我成功执行后的操作
        this.$emit("successBack");
        //清除spuForm当中的值
        this.resetSpuForm();
      }
      catch (error) {
        console.log(error);
        //5.失败干嘛
        this.$message.error("保存失败!");
        console.log(result);
      }
    },
    // 重置spuForm当中的值
    resetSpuForm(){
      this.spuForm = {
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
              // baseSaleAttrId:1
              // id:11
              // saleAttrName:"颜色"
              // spuId:6,
              // spuSaleAttrValueList:[
                  // {
                  //     baseSaleAttrId:1
                  //     id:25 //添加的时候不需要
                  //     isChecked:null 不需要这个
                  //     saleAttrName:"颜色"
                  //     saleAttrValueName:"黑"
                  //     spuId:6 //添加的时候不需要
                  // },
              //]
          // },
        ],
      };
      //临时存放初始化的时候获取的数据
      //因为后期可能需要对获取到的数据进行处理
      //图片列表数据
      this.spuImageList = [];
      //所有的品牌列表
      this.trademarkList = [];
      //所有的spu销售属性
      this.baseSaleAttrList = [];
      //销售属性相关
      this.spuSaleAttrIdAndName = "";
      //tag相关
      // inputVisible: false,
      // inputValue: '', 
      // 上传图片相关
      this.dialogImageUrl = '';
      this.dialogVisible = false;
    },
    // 单击'添加销售属性'按钮
    addAttrValue(){
      let [baseSaleAttrId,saleAttrName] = this.spuSaleAttrIdAndName.split(":");
      this.spuForm.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        //销售属性名称列表
        spuSaleAttrValueList:[]
      });
      //清空存储的选中销售属性数据
      //知道为什么这里会自动删除`销售属性`选择框当中已经选中的属性吗?
      //因为在'数据展示区'当中显示的'属性名'都是通过`unUsedSpuSaleAttrList'计算出来的
      //所以当'销售属性'当中的值被添加到了'数据展示区'后会被重新计算
      this.spuSaleAttrIdAndName = "";
    },
    //上传文件相关 
    upfileSuccess(response,file,fileList){
      if(response.code === 200){
        // 后期还需要做处理
        this.spuImageList = fileList;
        //  this.spuImageList.push({
        //    imgName: "",
        //    imgUrl: "",
        //    spuId:"",
        //    id:"",
        //    url:""
        //  })
      }else{
        this.$message.error("上传文件失败!");
      }
    },
    // 移除图片
    handleRemove(file, fileList) {
      //后期还需要做处理
      this.spuImageList = fileList;
    },
    // 显示放大后的图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //tag相关
    // 单击"x"删除
    // handleClose(tag) {
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    // },

    // 单击按钮后按钮变为输入框输入值
    showInput(row) {
        //显示输入框 为了后期可以使用,这里需要动态绑定
        this.$set(row,"inputVisible",true);
        this.$nextTick(_ => {
          //获取焦点  
          this.$refs.saveTagInput.focus();
        });
      },
    // 输入完成失去焦点,按下回车键后触发
    handleInputConfirm(row) {
        try {
            let saleAttrValueName = row.inputValue;
            let baseSaleAttrId = row.baseSaleAttrId;
            //1.值要有效
            if(!saleAttrValueName.trim()){
              row.inputValue="";
              this.$message.info("请输入有效的属性名称!");
              return;
            }
            //2.值要不重复
            let isRepeat = row.spuSaleAttrValueList.some(item=>{
              return item.saleAttrValueName === saleAttrValueName
            });
            if(isRepeat){
              this.$message.info("请勿输入重复的属性名称!");
              return;
            }
            let obj = {
              baseSaleAttrId,
              saleAttrValueName,
            }
            row.spuSaleAttrValueList.push(obj);
            //清空值并隐藏
            row.inputVisible = false;
            row.inputValue = '';
        } catch (error) {
            this.$message.error("请完成当前操作后再做其他处理!");
        }

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
