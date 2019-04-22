# 这是一个 vue 项目

## 用（传统方式）命令行把修改过后的代码上传到码云
1. git add .
2. git commit -m '提交信息'
3. git push

## 制作首页App组件
1. 完成Header区域，使用 Mint-UI 中的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 图标时，操作比较多：
 + 先把 扩展图标 的css 样式 ，icons-extra.css 拷贝到项目中
 + 拷贝 扩展字体库的ttf文件到项目中
 + 为购物车图标添加 mui-icon-extra mui-icon-extra-cart 类
3. 在 中间区域 放置一个 router-view 来展示路由匹配到的组件

## 改造 Tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图

## 加载首页轮播图数据
1. 获取数据，使用vue-resource (先安装 npm i vue-resource -S,然后在main.js中导入)
2. 使用vue-resource 的 this.$http.get
3. 获取到的数据，要保存到 data 中
4. 使用 v-for 渲染每张图