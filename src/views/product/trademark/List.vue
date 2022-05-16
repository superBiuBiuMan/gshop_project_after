<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" @click="showDialog" v-if="$hasBtn('btn.Trademark.add')">添加</el-button>
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
        <template slot-scope="{row}">
            <img :src="row.logoUrl" style="width:80px;height:60px"/>
        </template>
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="width">
          <!-- 由于要为每一个数据绑定,所以要循环,这样子才能传递数据 -->
          <template slot-scope="{row}">
            <!-- 传递当前循环的一个数据给函数 -->
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="showEditDialog(row)" v-if="$hasBtn('btn.Trademark.update')">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDialog(row)" v-if="$hasBtn('btn.Trademark.remove')">删除</el-button>
          </template>
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
    <!-- 添加品牌是不需要id的,而修改品牌是需要id的 -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- el-form通过:model="form" form为一个对象,用于将表单所有数据进行收集 -->
      <el-form :model="tmForm" :rules="rules" style="width:80%" ref="tmForm">
        <!-- 品牌名称 -->
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传文件  -->
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
            <el-upload
                class="avatar-uploader"
                action="/dev-api/admin/product/fileUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过50kb</div>
            </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddOrEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Trademark",
  data() {
    // 自定义校验规则
    var checkTmName = (rule,value,callback)=>{
      //rule不用管,占位符
      //value为验证的值,触发器触发一次就传入一次
      //callback()代表通过 callback(new Error("错误信息"))代表不通过
      if(value.length < 2 || value.length > 10){
        callback(new Error("请输入2-10位长度的名称!"));
      }else{
        callback();
      }
    }
    return {
      //当前页
      page: 1,
      //每页显示数据
      limit: 3,
      //数据总数
      total: 0,
      //数据列表
      trademarkList: [],
      //控制对话框的显示隐藏
      dialogFormVisible:false,
      //收集表单数据
      tmForm:{
        //品牌名称
        tmName:"",
        //logo真实地址
        logoUrl:""
      },
      //验证规则(由对象组成)
        //key是验证规则名称,value是数组,数组里面是对象,一个对象就是一个验证
        //触发时机有三种情况,失去焦点的时候,输入框改变的时候,整体校验的时候
      rules:{
        // 品牌名称校验
        tmName:[
          // trigger:'blur' 代表失去焦点
          // {required:true,message:"请输入品牌名称",trigger:'blur'},
          // trigger:'change' 代表值发生改变
          // {min:2,max:10,message:"请输入2~10位数组的品牌",trigger:'change'}
          //自定义校验规则
          {validator:checkTmName,trigger:'change'}
        ],
        // logoUrl校验
        logoUrl:[
          {required:true,message:"请上传图片!",trigger:'change'}
        ]
      }
    };
  },
  mounted() {
    this.getBaseTradeMark();
  },
  methods: {
    
    // 用户单击删除
    removeDialog(info){
      this.$confirm(`确认删除${info.tmName}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await this.$API.trademark.removeBaseTradeMark(info.id);
          // 更新页码
          //重新获取那页数据,
          //我们得看当前页有几条数据,如果当前页只有一条数据,删除以后,我们要回到前一页
          //如果当前页不是一条数据,就回到当前页  
          this.getBaseTradeMark(this.trademarkList.length > 1 ? this.page : this.page-1);
          this.$message.success("删除成功!");
        } catch (error) {
          this.$message.error("删除失败!");
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 用户单击确认添加/修改
    confirmAddOrEdit(){
      this.$refs.tmForm.validate(async (isPass)=>{
        if(isPass){
          //通过
          //1.收集用户信息
          let tradeMarkInfo = this.tmForm;
          //2. 整理收集的信息
          // 这里不需要整理
          //3.发送请求
          //4.成功干什么
          try{
            await this.$API.trademark.addOrChange(tradeMarkInfo);
            // 关闭弹窗
            this.dialogFormVisible = false;
            // 更新页码
              //有id,就继续在这一页,否则就跳到第一页
            this.getBaseTradeMark(tradeMarkInfo.id?this.page:1);
            //成功消息提示
            this.$message.success(tradeMarkInfo.id?"修改信息成功!":"添加品牌成功!");
          }catch(error){
             //5.失败干什么
            this.$message.error(tradeMarkInfo.id?"修改信息失败!":"添加品牌失败!")
          }
        }else{
          //未通过表单校验
          this.$message.warning("请输入完整的信息!");
        }
      })
    },
    // 修改品牌对话框显示
    showEditDialog(row){
      //显示对话框
      this.dialogFormVisible = true;
      //不可以直接这样子,因为使用的是同一份数据,还没有提交修改确定就导致数据同步显示修改后的了,所以要拷贝
      // this.tmForm = row;
      //浅拷贝
      this.tmForm = {
        ...row
      }
    },
    // 显示隐藏dialog
    showDialog(){
      this.dialogFormVisible = true;
      //清空
      this.tmForm = {
        tmName:"",
        logoUrl:""
      }
    },
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
    },
    //上传文件相关
    handleAvatarSuccess(res, file) {
      // 假地址
      //this.imageUrl = URL.createObjectURL(file.raw);
      // 存储返回来的真实图片线上地址
      this.tmForm.logoUrl = res.data;
    },
    // 上传图片之前格式/大小检验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
