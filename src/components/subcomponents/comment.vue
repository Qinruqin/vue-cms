<template>
	<div class="cmt-content">
		<h3>发表评论</h3>
		<textarea name="" id="" cols="20" rows="6" v-model='msg' placeholder="请输入评论内容"></textarea>
		<mt-button size="large" type="primary" @click='postComment'>发表</mt-button>
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
				comments:[],
				msg:'' //评论内容
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
			},
			postComment(){ //发表评论
				//校验输入的评论内容是否为空
				if(this.msg.trim().length == 0 ){
					Toast({
						message:'评论内容不能为空！',
						position:'middle',
						duration:3000
					});
				}else{
					//参数1：请求的URL地址
					//参数2：提交给服务器的数据对象{content:this.msg}
					//参数3：定义提交时的表单格式
					this.$http.post("api/postcomment/" + this.$route.params.id,{content:this.msg.trim() }).then(result=>{
						if(result.body.status === 0){
							//拼接数据
							var cmt = {
								add_time:Date.now(),
								content:this.msg,
								user_name:'匿名用户'
							}
							this.comments.unshift(cmt);
							this.msg = '';
						}else{

						}
					});

				}
				
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