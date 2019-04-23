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

## 改造 九宫格 区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯 页面制作
1. 绘制页面，使用 Mint-UI
2. 使用 vue-resource 获取数据
3. 渲染数据
4. 时间格式化，先安装 npm i moment -S

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时在跳转时提供唯一的id
2. 创建新闻详情的组件页面，NewsInfo.vue
3. 在 路由模块 中，将 新闻详情 的 路由地址 和组件页面 对应起来

## 实现 新闻详情 的页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的comment.vue组件模板
2. 在需要使用comment 组件的页面中导入
  + 'import comment from './comment.vue''
3. 在父组件中，使用 'components' 属性，将comment组件，注册为自己的 子组件
4. 将注册子组件时候的 注册名称，以标签形式，在页面中引用

## 获取所有的评论数据到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让pageIndex++，然后重新调用 this.getComments()
3. 为了防止 新数据 覆盖旧数据的情况，点击加载更多时，每当获取到新数据，应该使用数组的concat方法将 旧数据拼接上新数据 