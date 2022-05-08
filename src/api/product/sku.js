import request from "@/utils/request"

export default {
  //获取spu的图片列表数据
  getSpuImageList(spuId) {
    return request.get("/admin/product/spuImageList/" + spuId)
  }
}
