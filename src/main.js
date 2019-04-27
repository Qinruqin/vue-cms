//入口文件
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

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
import "mint-ui/lib/style.css";
Vue.use(MintUI);
//安装图片预览插件vue2-preview
import VuePreview from 'vue2-preview';
Vue.use(VuePreview);

//导入mui样式表
import './lib/mui/css/mui.css';
import './lib/mui/css/icons-extra.css';

//导入 app 组件
import app from "./App.vue";

// 导入自定义路由模块
import router from "./router.js";

//每次刚进入网站，从本地存储中获取购物车数据
var car = JSON.parse( localStorage.getItem('car') || '[]' );
var store = new Vuex.Store({
	state:{ //this.$store.state.***
       car:car //存储购物车中的商品数据 ,存储一些对象{id:商品id,count:购买数量,price:单价,selected:true}
	},
	mutations: {//this.$store.commit('方法名','按需传递唯一的参数')
	    addToCar (state,goodsinfo) {
	    	var flag = false;
	    	state.car.some(item=>{
	    		if(item.id == goodsinfo.id){
	    			item.count += parseInt(goodsinfo.count);
	    			flag = true;
	    			return true;
	    		}
	    	});
	    	if(flag === false){
	    		state.car.push(goodsinfo)
	    	}	
	    	//当更新 car 后，存储到 本地的localStorage
	    	localStorage.setItem('car',JSON.stringify(state.car)) ;     
	    },
	    //更新购物车的数量
	    updateGoodsInfo(state,goodsinfo){
	    	state.car.some(item=>{
	    		if(item.id == goodsinfo.id){
	    			item.count = parseInt(goodsinfo.count);
	    			return true;
	    		}
	    	});
	    	//当更新 car 后，存储到 本地的localStorage
	    	localStorage.setItem('car',JSON.stringify(state.car)) ;    
	    },
	    //删除购物车数据
	    removeFromCar(state,id){
	    	state.car.some((item, i)=>{
	    		if(item.id == id){
	    			state.car.splice(i,1);
	    			return true;
	    		}
	    	});
			//当更新 car 后，存储到 本地的localStorage
	    	localStorage.setItem('car',JSON.stringify(state.car)) ;    
	    },
	    //更新商品的勾选状态
	    updateGoodsSelected(state,info){
	    	state.car.some(item=>{
	    		if(item.id == info.id){
	    			item.selected = info.selected;
	    			return true;
	    		}
	    	});
			//当更新 car 后，存储到 本地的localStorage
	    	localStorage.setItem('car',JSON.stringify(state.car)) ; 
	    }
	},
	getters:{ //this.$store.getters.***
		getAllCount(state){
			var c = 0;
			state.car.forEach(item=>{
				c += item.count;
			});
			return c ;
		},
		getGoodsCount(state){
			var o = {};
			state.car.forEach(item => {
				o[item.id] = item.count;
			});
			return o;
		},
		getGoodsSelected(state){
			var o = {};
			state.car.forEach(item => {
				o[item.id] = item.selected;
			});
			return o;
		},
		getGoodsCountAndAmount(state){
			var o = {count:0,amount:0};
			state.car.forEach(item => {
				if(item.selected){
					o.count += item.count;
					o.amount += item.count * item.price;
				}
			});
			return o;
		}
	}
})

var vm = new Vue({
	el:'#app',
	render: c => c(app),
	router ,//4.将路由对象挂载到vm上
	store //挂载 store 状态管理对象
});