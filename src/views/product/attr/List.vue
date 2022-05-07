<template>
  <div>
    <el-card>
      <CategorySelector @changeCategory="changeCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top: 20px">
      <div v-show="!isAddOrEditProperty">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="showAddDiv">添加属性</el-button>
        <el-table
          border
          :data="attrList"
          style="width: 100%">

          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80">
          </el-table-column>

          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150">
          </el-table-column>

          <el-table-column
            prop="prop"
            label="属性值列表"
            width="width">
            <template slot-scope="{row}">
              <el-tag type="info" v-for="(item) in row.attrValueList" :key="item.id">{{item.valueName}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="prop"
            label="操作"
            width="150">
            <template slot-scope="{row}">
                <MyButton type="warning" icon="el-icon-edit" size="mini" title="修改属性" @click="editProperty(row)"></MyButton>
                <MyButton type="danger" icon="el-icon-delete" size="mini" title="删除属性"></MyButton>
            </template>
          </el-table-column>
        </el-table>
      </div>

     <!-- 添加/编辑属性值 -->
     <div v-show="isAddOrEditProperty">
       <el-form ref="form" :model="attrForm"  inline >
         <el-form-item label="属性名">
           <el-input v-model="attrForm.attrName" placeholder="请输入属性名"></el-input>
         </el-form-item>
       </el-form>
       <!-- 按钮操作 -->
       <el-button type="primary" icon="el-icon-plus" :disabled="!attrForm.attrName" @click="addProperty">添加属性值</el-button>
       <el-button @click="isAddOrEditProperty = false">取消</el-button>
       <!-- 数据展示 -->
      <el-table
        border
        :data="attrForm.attrValueList"
        style="width: 100%;margin:20px 0 ">
        <!-- 序号 -->
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="80">
        </el-table-column>
        <!-- 属性值名称 -->
         <el-table-column
          prop="attrValueList"
          label="属性值名称"
          width="width">
          <template slot-scope="{row,$index}">
            <!-- 输入框  -->
            <el-input 
            v-if="row.isEdit"
            v-model="row.valueName"
            :ref="$index"
            @blur="toShow(row)"
            @keyup.enter.native="toShow(row)"
            placeholder="请输入名称"
            size="mini">
            </el-input>
            <!-- 显示 -->
            <span 
            v-else
            @click="toEdit(row,$index)"
            style="display:block;width:100%;height:100%">
            {{row.valueName}}
            </span>
          </template>
        </el-table-column>
        <!-- 操作 -->
         <el-table-column
          prop="prop"
          label="操作"
          width="width">
          <template slot-scope="{row,$index}">
            <el-popconfirm :title="`确定删除${row.valueName}吗?`" @onConfirm="confirmDelete">
            <!-- <el-popconfirm :title="`确定删除${row.valueName}吗?`" @confirm="confirmDelete"> -->
              <MyButton type="danger" icon="el-icon-delete" title="删除" size="mini" slot="reference"></MyButton>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
       <!-- 按钮操作 -->
       <el-button type="primary">保存</el-button>
       <el-button @click="isAddOrEditProperty=false">取消</el-button>
     </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: 'Attr',
  updated(){
    console.log("attr-我周期钩子触发了");
  },
  data(){
    return {
      category1Id:"",
      category2Id:"",
      category3Id:"",
      attrList:[],
      //控制添加/删除属性的显示隐藏
      isAddOrEditProperty:false,
      
      //表单收集数据
      attrForm:{
        //属性名称
        attrName:"",
        attrValueList:[
          // {
          //   attrId:0,
          //   id:0,
          //   valueName:"string"
          // }
        ],
        //在data当中是不能使用this的!
        categoryId:0,
        categoryLevel:3
      }
    }
  },
  methods:{
    // 用户单击删除属性
    confirmDelete(){
      console.log("你单击了确定删除");
    },
    // 编辑模式 => 查看模式
    toShow(row){
      //1.判断值是否为空
      if(!row.valueName.trim()){
        this.$message.info("请输入属性值!");
        return;
      }
      //2.判断值是否重复
      let isRepeat = this.attrForm.attrValueList.some((item)=>{
        //排除自己
        if(item !== row){
          return item.valueName === row.valueName;
        }
      })
      console.log(isRepeat);
      if(isRepeat){
        //重复了
        this.$message.info("请不要输入重复的属性值!");
        return;
      }
      row.isEdit = false;
    },
    //查看模式 => 编辑模式 
    toEdit(row,index){
      row.isEdit = true;
      //获取焦点
      // 如果是直接这样子会提示Cannot read properties of undefined (reading 'focus')"
      // this.$refs[index].focus();
      // 那是因为我们获取这个节点获取的太快了,DOM还没有更新完成就获取
      //上面我们通过v-if来进行查看模式,编辑模式进行切换,由于dom元素是通过vif才开始创建的,紧接着我们就获取这个元素,input还没有创建完成
      //所以获取到的就是undefined,我们可以使用$nextTick解决  this.$nextTick
      //updated 只要页面有数据更新,就会触发
      //$nextTick 页面的最近一次更新完成后执行回调,一次就完成了
      this.$nextTick(()=>{
        this.$refs[index].focus();
      })
    },  
    // 修改属性 
    editProperty(row){
      this.isAddOrEditProperty = true;
      //深克隆
      this.attrForm = cloneDeep(row);
      //循环遍历设置响应式数据
      this.attrForm.attrValueList.forEach(item=>{
        //设置为false => 查看模式
        this.$set(item,"isEdit",false);
      });

    },
    //用户单击添加属性值
    addProperty(){
        //添加数据占位
        this.attrForm.attrValueList.push({
          //修改的时候需要传入id,添加的时候则为undefined
          attrId:this.attrForm.id,
          attrName:"",
          //是否是编辑模式,true为编辑模式,false为查看模式
          isEdit:true
        });
        //输入框获取焦点
        this.$nextTick(()=>{
          this.$refs[this.attrForm.attrValueList.length-1].focus();
        })
    },
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
    // 单击添加按钮切换到添加页面
    showAddDiv(){
      this.isAddOrEditProperty = true;
      this.attrForm = {
        //属性名称
        attrName:"",
        attrValueList:[
          // {
          //   attrId:0,
          //   id:0,
          //   valueName:"string"
          // }
        ],
        categoryId:this.category3Id,
        categoryLevel:3
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
