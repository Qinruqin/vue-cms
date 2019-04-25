<template>
	<div class="goodsdesc-container">
		<h3>{{ info.title }}</h3>
		<hr>
		<div class="content" v-html="info.content">
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
export default{
	data(){
		return {
			id:this.$route.params.id ,//将Url中的地址传递
			info:''
		};
	},
	created:function() {
		this.getInfo();
	},
	methods:{
		getInfo(){
			this.$http.get('api/goods/getdesc/'+this.id).then(result => {
				if(result.body.status === 0){
					//请求成功
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
			})
		}
	}
}
</script>

<style lang="scss">
.goodsdesc-container{
	padding: 4px;
	width: 100%;
	h3{
		color:#226aff;
		font-size: 16px;
		text-align: center;
		margin: 10px 0;
	}
	.content{
		img{
			width: 100% ;
		}
	}	
}
</style>