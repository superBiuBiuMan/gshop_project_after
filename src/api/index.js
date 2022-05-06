
//默认暴露
//从中结构出来default并作为别名赋值给trademark
export {default as trademark} from "./product/trademark"
export {default as attr} from "./product/attr"

//代码等同于
//     //第一步
// import {default as trademark} from "./product/trademark"
//     //第二步
// export trademark {
//     a(){},
//     b(){},
//     C(){}
// }
