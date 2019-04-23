<template>
	<div class="cmt-content">
		<h3>发表评论</h3>
		<textarea name="" id="" cols="20" rows="6"></textarea>
		<mt-button size="large" type="primary">发表</mt-button>
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item,index) in comments" :key="item.id">
				<div class="cmt-title">第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;{{item.add_time | dataFormat}}</div>
				<div class="cmt-body">{{item.content}}</div>
			</div>
		</div>
		<mt-button size="large" type="danger" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				pageIndex:1,
				comments:[]
			}
		},
		created(){
			this.getComments();
		},
		methods:{
			getComments(){ //获取评论
				this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
					if(result.body.status === 0){
						//拼接数据
						this.comments = this.comments.concat(result.body.message);
					}else{
						Toast({
						  message: '获取评论失败...',
						  position: 'middle',
						  duration: 2000
						});
					}
				})
			},
			getMore(){ //加载更多
				this.pageIndex ++;
				this.getComments();
			}
		},
		props:['id']
	}
</script>

<style lang="scss" scoped>
	.cmt-content{
		h3{
			font-size: 16px;
			font-weight: bold;
		}
		textarea{
			height: 80px;
			margin: 0;
			font-size: 14px;
		}
		.cmt-list{
			margin: 10px 0;
			.cmt-item{
				font-size: 14	px;
				.cmt-title{
					line-height: 30px;
					background-color: #ccc;

				}
				.cmt-body{
					line-height: 35px;
					text-indent: 2rem;

				}
			}
		}
	}
</style>