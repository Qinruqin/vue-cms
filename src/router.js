import VueRouter from "vue-router";

import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import ShopcartContainer from "./components/tabbar/ShopcartContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";

//新闻资讯模块的组件
import NewsList from "./components/news/NewsList.vue";
import NewsInfo from "./components/news/NewsInfo.vue";

//图片模块的组件
import PhotoList from "./components/photos/PhotoList.vue";
import PhotoInfo from "./components/photos/PhotoInfo.vue";

import GoodsList from "./components/goods/GoodsList.vue";
import GoodsInfo from "./components/goods/GoodsInfo.vue";
import GoodsDesc from "./components/goods/GoodsDesc.vue";
import GoodsComment from "./components/goods/GoodsComment.vue";

//创建路由对象
var router = new VueRouter({
	routes:[
	   { path:'/', redirect:'/home' },
	   { path:'/home', component:HomeContainer },
	   { path:'/member', component:MemberContainer },
	   { path:'/shopcart', component:ShopcartContainer },
	   { path:'/search', component:SearchContainer },
	   { path:'/home/newslist', component:NewsList },
	   { path:'/home/newsinfo/:id', component:NewsInfo },
	   { path:'/home/photolist', component:PhotoList },
	   { path:'/home/photoinfo/:id', component:PhotoInfo },
	   { path:'/home/goodslist', component:GoodsList },
	   { path:'/home/goodsinfo/:id', component:GoodsInfo },
	   { path:'/home/goodsdesc/:id', component:GoodsDesc , name:"goodsdesc" },
	   { path:'/home/goodscomment/:id', component:GoodsComment }
	],
	linkActiveClass:'mui-active' //覆盖默认的类
});

//把路由对象暴露出去
export default router;