<template>
  <el-row :gutter="10" class="bottom">
      <el-col :span="12">
        <BottomLeft></BottomLeft>
      </el-col>
      <el-col :span="12">
        <BottomRight></BottomRight>
      </el-col>
  </el-row>
</template>

<script>
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";
export default {
  name: "Bottom",
  components: {
    BottomLeft,
    BottomRight,
  },
};
</script>

<style scoped>
.bottom{
    margin-top: 10px;
}
</style>
