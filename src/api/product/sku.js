import request from "@/utils/request"

export default {
  //获取spu的图片列表数据
  getSpuImageList(skuId) {
    return request.get("/admin/product/spuImageList/" + skuId);
  },
  /* 
  获取指定SPU的id对应的销售属性列表
  GET /admin/product/spuSaleAttrList/{spuId}
  */
  getSpuSaleAttrList(spuId) {
    return request.get(`/admin/product/spuSaleAttrList/${spuId}`);
  },
  //保存sku信息
  // POST /admin/product/saveSkuInfo
  saveSkuInfo(info) {
    return request.post("/admin/product/saveSkuInfo", info);
  },
  //查看sku信息
  // http://106.13.220.33:9260/admin/product/findBySpuId/6595
  getSkuInfoFromSpuId(spuId) {
    return request.get("/admin/product/findBySpuId/" + spuId);
  },
 
  // 获取sku数据列表
  getSkuInfo(page, limit) {
    return request.get(`/admin/product/list/${page}/${limit}`);
  },
  // 上架sku
  onSale(skuId) {
    return request.get(`/admin/product/onSale/${skuId}`);
  },
  //下架sku
  cancelSale(skuId) {
    return request.get(`/admin/product/cancelSale/${skuId}`);
  },
   //获取SKU数据
  getSkuById(skuId) {
    return request.get("/admin/product/getSkuById/" + skuId);
  },
  //删除sku
  deleteSku(skuId) {
    return request.delete(`/admin/product/deleteSku/${skuId}`);
  }
}
