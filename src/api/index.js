
//默认暴露
//从中结构出来default并作为别名赋值给trademark
export {default as trademark} from "./product/trademark"
export {default as attr} from "./product/attr"
export {default as spu} from "./product/spu"
export {default as sku} from "./product/sku"
export {default as permission} from "./acl/permission"
export {default as role} from "./acl/role"
export * as user from "./acl/user"
//代码等同于
//     //第一步
// import {default as trademark} from "./product/trademark"
//     //第二步
// export trademark {
//     a(){},
//     b(){},
//     C(){}
// }
