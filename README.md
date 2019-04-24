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

## 发表评论
1. 文本框的数据绑定
2. 为发表按钮绑定事件
3. 校验评论内容是否为空，如果为空则提示内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器
5. 发表成功后，刷新列表，以查看最新的评论
   + 如果调用 getComments 方法的话，只能得到最后一页的数据，前几页的数据获取不到
   + 换一种思路：当评论成功后，手动拼接出 最新的评论对象，然后调用数组的 unshift 方法，把最新的评论追加到data中的 comments数组 的开头。

## 改造 图片分享 按钮为 路由链接并显示对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
1. 制作 顶部的滑动块  
2. 制作 底部的图片列表

### 制作 顶部的滑动块
1. 需要借助MUI 的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen类 去掉
3. 滑动条无法正常触发滑动，需要初始化js:
  + 导入mui.js
  + 调用官方提供的方式
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
4. 初始化 滑动条 时，导入mui.js 报错
  + 原因 webpack 打包好的bundle.js默认启用严格模式，所以冲突了
  + 解决方案：1. 把mui.js的 非严格 模式的代码改掉，但不现实；2. 禁用webpack的严格模式
  + 最终选择移除严格模式：npm install babel-plugin-transform-remove-strict-mode -D，在.babelrc中的plugins增加一项 "transform-remove-strict-mode"
5. 刚进入 图片分享页时，滑动条无法正常工作，需要在组件的DOM元素加载完毕后，才初始化 滑动条 的代码
6. 当滑动条 调试成功后，tabbar无法正常工作，需要将mui-tab-item类名改一下，改成mui-tab-item-lib
7. 获取所有分类，并渲染分类

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，使用Mint-UI的组件'lazy-load'
2. 渲染图片数据

### 实现了 图片列表的 懒加载改造和样式美化

## 实现 点击图片 跳转至 图片详情页
1. 改造li 为 router-link 时，需要使用 tag = 'li'

## 实现 图片详情页面的布局和美化，同时获取数据渲染页面

## 实现 图片详情页 中的 缩略图 的功能
1. 使用图片预览插件 vue2-preview 这个缩略图插件:https://github.com/liulongbin1314/vue2-preview
2. 获取所有的图片列表，渲染
3. 注意：img标签上的class不能去掉
4. 注意：每个图片数据对象中，必须有w和h属性

## 制作 商品列表 页面结构

## 尝试在手机上进行项目的预览和调试
1. 保证手机正常运行
2. 保证 手机可以访问电脑IP（处于一个WIFI环境中）
3. 打开项目中的package.json，在 dev脚本中添加一个 --host 指令，把当前电脑的WIFI IP地址，设置为 --host的指令值
 + 查看自己WIFI的IP：在cmd中运行' ipconfig '，查看无线网的 ip