<template>
	<div class="newsinfo-container">
		<!-- 标题 -->
		<h3 class="title">{{newsInfo.title}}</h3>
		<!-- 子标题 -->
		<p class="subtitle">
			<span>发表时间：{{newsInfo.add_time | dataFormat }}</span>
			<span>点击：{{newsInfo.click}}次</span>
		</p>
		<hr>
		<!-- 内容 区域 -->
		<div class="content" v-html="newsInfo.content">
		</div>
		<!-- 评论子组件 区域 -->
		<comment-box :id='this.id'></comment-box>
	</div>
</template>

<script>
	import comment from '../subcomponents/comment.vue';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				id:this.$route.params.id ,//将Url中的地址传递
				newsInfo:''
			};
		},
		created:function() {
			this.getNewsInfo();
		},
		methods:{
			getNewsInfo(){
				this.$http.get('api/getnew/'+this.id).then(result => {
					if(result.body.status === 0){
						//请求成功
						this.newsInfo = result.body.message[0];
					}else{
						//失败
						Toast({
						  message: '加载新闻详情失败...',
						  position: 'middle',
						  duration: 2000
						});
					}
				})
			}
		},
		components:{
		  'comment-box':comment
		}
	}
</script>

<style lang="scss">
	.newsinfo-container{
		padding: 0 4px;
		.title{
			margin:14px 0;
			padding: 0;
			color: red;
            font-size: 16px;
            text-align: center;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			color:#226aff;
			font-size: 13px;

		}
		.content{
			img{width: 100%;}
		}
	}
</style>