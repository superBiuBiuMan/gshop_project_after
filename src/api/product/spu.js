import request from "@/utils/request"

export default {
  // 三级分类选中后获取数据
  getList(page, limit, category3Id) {
    return request({
      method: "get",
      url: `/admin/product/${page}/${limit}?category3Id=${category3Id}`,
    })
  },
  //获取SPU销售属性选择框(即可添加的销售属性?)
  getBaseSaleAttrList() {
    return request.get("/admin/product/baseSaleAttrList");
  },
  //获取SPU销售详情数据(spu描述和销售属性数据表格)
  getSpuById(spuId) {
    return request.get("/admin/product/getSpuById/" + spuId);
  },
  //添加/更新SPU数据
  addOrUpdate(spuInfo) {
    //有id即为更新,无id即为新增
    return request({
      url: `/admin/product/${spuInfo.id ? 'update' : 'save'}SpuInfo`,
      method: 'POST',
      data: spuInfo
    })
  },
  // 删除指定的spu
  remove(spuId) {
    return request.delete("/admin/product/deleteSpu/" + spuId);
  },
  //获取spu的图片列表数据
  getSpuImageList(skuId) {
    return request.get("/admin/product/spuImageList/" + skuId)
  }
}
