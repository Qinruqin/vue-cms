<template>
	<div>
		<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'><span>发表时间:{{item.add_time | dataFormat }}</span>
								<span>点击:{{item.click}}次</span></p>
						</div>
					</router-link>
				</li>		

			</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				newsList:[] //保存新闻资讯的数组
			};
		},
		created:function() {
			this.getNewsList();
		},
		methods:{
			getNewsList(){
				this.$http.get('api/getnewslist').then(result => {
					if(result.body.status === 0){
						//请求成功
						this.newsList = result.body.message;
					}else{
						//失败
						Toast({
						  message: '加载新闻列表失败...',
						  position: 'middle',
						  duration: 2000
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mui-table-view{
	li{
		h1{
			margin:0;
			padding: 0;
			font-size: 14px;
			line-height: 24px;
		}
		.mui-ellipsis{
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			color: #226aff;
		}
	}

}
	
</style>