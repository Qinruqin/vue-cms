<template>
	<div class="goods-list">
		<div class="goods-item" v-for="item in goodsList" :key="item.id">
			<img :src="item.img_url" alt="">
			<h1 class="title">{{item.title}}</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥{{item.sell_price}}</span>
					<span class="old">￥{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>
		<mt-button type='danger' size='large' @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				pageIndex:1,
				goodsList:[] //保存新闻资讯的数组
			};
		},
		created:function() {
			this.getGoodsList();
		},
		methods:{
			getGoodsList(){//获取商品列表
				this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result => {
					if(result.body.status === 0){
						//请求成功
						this.goodsList =this.goodsList.concat(result.body.message);
					}else{
						//失败
						Toast({
						  message: '加载商品列表失败...',
						  position: 'middle',
						  duration: 2000
						});
					}
				})
			},
			getMore(){ //加载更多
				this.pageIndex ++;
				this.getGoodsList();
			},
		}
	}
</script>

<style lang="scss" scoped>
.goods-list{
	display: flex;
	flex-wrap: wrap;
	padding: 8px;
	justify-content: space-between;

	.goods-item{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 294px;
		width: 49%;
		border:1px solid #ccc;
		margin: 4px 0;
		padding: 2px;

		img{
			width: 100%;
		}
		.title{
			margin:0;
			padding: 0;
			font-size: 14px;
			font-weight: bold;
			line-height: 24px;
		}
		.info{
			background-color: #eee;
			p{
				margin: 0;
				padding: 5px;
			}
			.price{
				.now{
					color: red;
					font-weight: bold;
					font-size: 16px;

				}
				.old{
					margin-left: 10px;
					font-size: 12px;
					text-decoration: line-through;
				}
			}
			.sell{
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				
			}
		}
	}

}
	
</style>