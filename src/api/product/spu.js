import request from "@/utils/request"

export default {
    

    // 三级分类选中后获取数据
    getList(page,limit,category3Id){
        return request({
            method:"get",
            url:`/admin/product/${page}/${limit}?category3Id=${category3Id}`,
        })
    }
}