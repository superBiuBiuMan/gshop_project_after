import request from "@/utils/request";
export default {
  // 增加和修改
  addOrChange(info) {
    if (info.id) {
      //id存在,即为修改
      return request.put("/admin/product/baseTrademark/update", info);
    } else {
      //id不存在,则为新增
      return request.post("/admin/product/baseTrademark/save", info);
    }
  },

  // 删除
  removeBaseTradeMark(id) {
    return request.delete("/admin/product/baseTrademark/remove/" + id);
  },

  // 分页列表
  getBaseTradeMark(page, limit) {
    return request.get(`/admin/product/baseTrademark/${page}/${limit}`);
  },
  // SPU所用 获取所有的品牌数据
  getTrademarkList(){
    return request.get("/admin/product/baseTrademark/getTrademarkList");
  },
}
