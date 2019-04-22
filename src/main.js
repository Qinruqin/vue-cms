//入口文件

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import VueResource from "vue-resource";
Vue.use(VueResource);

import { Header , Swipe, SwipeItem  } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

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