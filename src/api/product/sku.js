import request from "@/utils/request"

export default {
  //获取spu的图片列表数据
  getSpuImageList(skuId) {
    return request.get("/admin/product/spuImageList/" + skuId)
  },
  /* 
  获取指定SPU的id对应的销售属性列表
  GET /admin/product/spuSaleAttrList/{spuId}
  */
  getSpuSaleAttrList(spuId) {
    return request.get(`/admin/product/spuSaleAttrList/${spuId}`)
  }
}
