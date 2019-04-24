<template>
	<div class="photoinfo-container">
		<h3 class="title">{{info.title}}</h3>
		<p class="subtitle">
			<span>发表时间：{{info.add_time | dataFormat }}</span>
			<span>点击：{{info.click}}</span>
		</p>
		<hr>
		<!-- 缩略图 区域 -->
		<div class="thumbs">
			 <vue-preview
		      :list="list"
		      :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
		      :tapToClose="true" />
		</div>

		<!-- 图片内容区域 -->
        <div class="content" v-html="info.content"></div>
		<!-- 评论子组件 -->
		<comment-box :id='this.id'></comment-box>
	</div>
</template>

<script>
	import comment from '../subcomponents/comment.vue';
	export default{
		data(){
			return{
				id: this.$route.params.id ,
				info:'',
				list:[] //缩略图的数组
			}
		},
		created(){
			this.getPhotoInfo();
			this.getThumbs();
		},
		methods:{
			getPhotoInfo(){ //获取图片详情
				this.$http.get("api/getimageInfo/"+this.id).then(result => {
					if(result.body.status === 0){
						console.log(result.body)
						this.info = result.body.message[0];
					}else{
						//失败
						Toast({
						  message: '加载数据失败...',
						  position: 'middle',
						  duration: 2000
						});

					}
				});
			},
			getThumbs(){ //获取缩略图列表
				this.$http.get("api/getthumimages/"+this.id).then(result => {
					if(result.body.status === 0){
						console.log(result.body)
						result.body.message.forEach(item=>{
							item.w = 600;
							item.h = 400;
						})
						this.list = result.body.message;
					}else{

					}

				})

			}

		},
		components:{
			'comment-box':comment
		}
	}
</script>

<style lang="scss" scoped>
.photoinfo-container{
	padding: 2px;
	h3{
		margin: 16px 0;
		padding: 0;
		color: #26a2ff;
		font-size: 16px;
		text-align: center;
	}
	.subtitle{
		display: flex;
		justify-content: space-between;
		font-size: 12px;
	}
	hr{
		margin: 10px 0;
	}
}
</style>