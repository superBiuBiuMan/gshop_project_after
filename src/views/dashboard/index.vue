<template>
  <div>
    <Header></Header>
    <Sale></Sale>
    <Bottom></Bottom>
  </div>
</template>

<script>
//头部分
import Header from "./Header"
//销售额/访问量
import Sale from "./Sale"
///底部
import Bottom from "./Bottom"
export default {
  name: "Dashboard",
  components:{
    Header,
    Sale,
    Bottom
  }
};
</script>

<style lang="scss" scoped>
</style>
