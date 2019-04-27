<template>
	<div>
		<!-- 轮播图 区域 -->
		<swiper :lunbotuList="lunbotuList":isfull="true"></swiper>

		<!-- 九宫格 区域 -->
		<div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newsList">
		                    <img src="../../images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>		            
		        </ul> 
		</div>
	</div>
</template>

<script>
	//引入自定义的轮播图组件
	import swiper from '../subcomponents/swiper.vue';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				lunbotuList:[] //保存轮播图的数组
			};
		},
		created:function() {
			this.getLunbotu();
		},
		methods:{
			getLunbotu(){
				this.$http.get('api/getlunbo').then(result => {
					if(result.body.status === 0){
						//请求成功
						this.lunbotuList = result.body.message;
					}else{
						//失败
						Toast({
						  message: '加载轮播图失败...',
						  position: 'middle',
						  duration: 2000
						});
					}
				})
			}
		},
		components:{
		    swiper
		}
	}
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9{
	background-color: #fff;
	border: 0;
	img{
		width: 60px;
		height: 60px;
	}
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
	border: 0;
}
</style>