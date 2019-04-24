<template>
	<div>
		<!-- 滑动条 区域 -->
		<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']"  v-for="item in cates" :key="item.id" @click="getPhotoList(item.id)">
							{{item.title}}
						</a>
						
					</div>
				</div>
		</div>

		<!-- 图片列表 区域 -->
		<ul class="photo-list">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
				<img v-lazy="item.img_url" alt="">
				<div class="info">
					<h1 class="info-title">{{ item.title }}</h1>
					<div class="info-body">{{ item.zhaiyao }}</div>
				</div>
			</router-link>
		</ul>
	</div>
</template>

<script>
	import mui from "../../lib/mui/js/mui.js";

	export default{
		data(){
			return{
				cates:[] , //所有分类列表
				list:[] //图片列表
			}
		},
		mounted(){ //当组件中的dom结构被渲染好并放到页面后，执行该钩子函数
			//初始化 滑动条 
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		created(){
			this.getAllCategory();
			this.getPhotoList(0);
		},
		methods:{
			//获取所有图片分类
			getAllCategory(){
				this.$http.get("api/getimgcategory").then(result=>{
					// console.log(result.body)
					if(result.body.status === 0){
						result.body.message.unshift({title:'全部',id:0});
						this.cates = result.body.message;
					}else{
						//失败
						Toast({
						  message: '加载数据失败...',
						  position: 'middle',
						  duration: 2000
						});

					}

				})
			},
			getPhotoList(cateId){ //根据 分类id 获取图片列表
				this.$http.get("api/getimages/"+cateId).then(result => {
					if(result.body.status === 0){
						console.log(result.body)
						this.list = result.body.message;
					}else{

					}

				})

			}

		}
	}
</script>

<style lang="scss" scoped>
*{
	touch-action:pan-y;
}

.photo-list{
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
	li{
		position: relative;
		background-color: #ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 6px #999;
		img{
			width: 100%;
			vertical-align: middle;
		}
		img[lazy='loding']{
			width: 40px;
			height: 300px;
			margin: auto;
		}
		.info{
			position: absolute;
			bottom: 0;
			left: 0;
			color: #fff;
			text-align: left;
			background-color: rgba(0,0,0,.4);
			max-height: 84px;
			.info-title{
				margin: 0;
				font-size: 14px;
			}
			.info-body{
				font-size: 12px;
			}
		}
	}
}
</style>