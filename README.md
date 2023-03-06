## 尚品汇后台练习

* 在线演示地址1(后台项目): http://82.156.205.62:9261
  * 过期了2023年3月02日20.40.21

* 在线演示地址2(后台项目): http://82.156.205.62:9260
  * 过期了2023年3月02日20.40.21


### 首页登录

![登录界面](README.assets/202205161600234.png)

### 首页图表

![首页图表](README.assets/202205161601799.png)

### 品牌管理

![品牌管理](README.assets/202205161601468.png)

### 权限管理

![权限管理-用户管理](README.assets/202205161602080.png)

![](README.assets/202205161600121.png)

### 商品管理

![商品管理](README.assets/202205161601594.png)

### 项目依赖安装

```
npm install
```

### 项目运行
```
npm run dev
```

### 项目打包编译
```
//构建生产环境
npm run build:prod
//构成测试环境
npm run build:stage
```

#### 如果想在nginx上线,注意配置转发和删除.env.production的里面的内容(以生产环境打包为例)

* 需要删除Vue_APP_BASE_API里面的内容~

![.env.production文件](README.assets/202205161644946.png)

* nginx转发设置

  ![nginx转发设置](README.assets/202205161646156.png)

### 地址

#### 国外
```
https://github.com/superBiuBiuMan/gshop_project_after
```
#### 国内
```
https://gitee.com/superBiuBiu/gshop_project_after
```

#### 如果角色权限不能正常赋予请看这里

* elementUI tree在收集数据的时候,并不会在上几级的数据放入,所以会导致用户权限不能正常赋予,这里给出了解决办法

```javascript
vue elementUI tree树形控件获取父节点ID的实例

修改源码:
情况1: element-ui没有实现按需引入打包
  node_modules\element-ui\lib\element-ui.common.js    25382行修改源码  去掉 'includeHalfChecked &&'
  // if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
  if ((child.checked || child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {

      
情况2: element-ui实现了按需引入打包
  node_modules\element-ui\lib\tree.js    1051行修改源码  去掉 'includeHalfChecked &&'
  // if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
  if ((child.checked || child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {

```

## 注意!!!!!!!!!

* **vue-admin管理模板npm安装依赖后npm run de提示依赖core-js,@babel等报错的解决办法**

### 安装别人做好的后台管理项目,npm run dev后报错

* 都是这种`core-js/modules/es.array.concat.js `什么的错误

![报错项](README.assets/202205151908067.png)

### 解决

1. 找到项目下的babel.config.js **原来的presets改为下面**

   ```javascript
   presets: [ [ "@vue/app", { useBuiltIns: "entry" } ] ],
   ```

2. 改好之后

![原来的presets改为下面](README.assets/202205151909614.png)

3. 重新运行`npm run dev` 成功!

   ![成功](README.assets/202205151910231.png)
