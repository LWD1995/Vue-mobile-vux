# mobile_template
## 移动端基本脚手架
author 廖梧东
### 样式框架使用vux
### 路由使用history模式,需要服务器做好相应的配置
### 使用rem适配方式 1rem = 750px中的20px
### 使用Lockr存储用户数据
- token存于'token'属性中
- userInfo存于'userInfo'中
- 已加上用户权限认证代码 在main.js中

### 全局方法与样式自行查看global.js与global.css
### 微信js-sdk可以直接使用vux的$wechat对象
### 实例化store 可以直接使用

### 环境变量在 config/prod.env.js 中定义
需要与后端约定好 采用"run build 前端地址 后端地址"的方式进行自动构建 后端地址没有后台的情况下可以不要

使用时直接下载到新项目中即可 install即可