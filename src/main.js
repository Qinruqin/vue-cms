//入口文件

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import VueResource from "vue-resource";
Vue.use(VueResource);

//时间格式化插件
import moment from "moment";
// 定义全局过滤器
Vue.filter('dataFormat',function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
   return moment(dataStr).format(pattern);
});

//设置全局的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
//设置全局 post 时表单数据格式
Vue.http.options.emulateJSON = true;
//按需导入Mint-UI的组件
// import { Header , Swipe, SwipeItem , Button ,Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//全局导入Mint-UI
import MintUI from "mint-ui";
Vue.use(MintUI);
import "mint-ui/lib/style.css";
//安装图片预览插件vue2-preview
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//导入mui样式表
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// 导入bootstrap样式
import 'bootstrap/dist/css/bootstrap.css'

//导入 app 组件
import app from "./App.vue";

// 导入自定义路由模块
import router from "./router.js";

var vm = new Vue({
	el:'#app',
	render: c => c(app),
	router //4.将路由对象挂载到vm上
});