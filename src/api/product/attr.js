import request from "@/utils/request"

export default {
  /* 获取一级分类列表 */
  getCategory1() {
    return request.get("/admin/product/getCategory1");
  },
  /* 获取二级分类列表 */
  getCategory2(id) {
    return request.get("/admin/product/getCategory2/" + id);
  },
  /* 获取三级分类列表 */
  getCategory3(id) {
    return request.get("/admin/product/getCategory3/" + id);
  },
  /* 获取总分类列表 */
  getCategoryList(catrgory1Id, catrgory2Id, catrgory3Id) {
    return request.get(`/admin/product/attrInfoList/${catrgory1Id}/${catrgory2Id}/${catrgory3Id}`)
  },
  /* 添加或者修改属性 */
  addOrUpdate(attr) {
    return request.post("/admin/product/saveAttrInfo", attr);
  },
  /* 根据id删除某个平台属性 */
  delete(attrId) {
    return request.delete("/admin/product/deleteAttr/" + attrId);
  }
}
