<template>
	<div class="shopcart-container">
		<!-- 商品列表 区域 -->
		<div class="goods-list">
			<div class="mui-card" v-for="(item,i) in list" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch
						 v-model="$store.getters.getGoodsSelected[item.id]"
						 @change="changeSelected(item.id,$store.getters.getGoodsSelected[item.id])"
						></mt-switch>
						<img :src="item.thumb_path" alt="">
						<div class="info">
							<h1>{{ item.title }}</h1>
							<p class="operate">
								<span class="price">￥{{ item.sell_price }}</span>
								<numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
								<a href="#" @click.prevent="remove(item.id,i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		<!-- 商品结算 区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
						<p>总计（不含运费）</p>
						<p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，总价：<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
					</div>
					<mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import numbox from '../subcomponents/shopcar_numbox.vue';

	export default{
		data(){
			return{
				list:[]
			}
		},
		created(){
			this.getGoodsList();
		},
		methods:{
			//获取 商品列表
			getGoodsList(){
				var idArr = [];
				this.$store.state.car.forEach(item => idArr.push(item.id) );
				// 如果 购物车中没有数据 ，则直接返回，无需请求数据
				if(idArr.length == 0){
					return;
				}
				this.$http.get('api/goods/getshopcarlist/' + idArr.join(",") ).then(result => {
					if(result.body.status === 0){
						//请求成功
						this.list = result.body.message;
					}else{
						//失败
					}
				})
			},
			//根据id删除store中的car的值，根据index删除list中的对应的值
			remove(id,index){
				this.list.splice(index,1);
				this.$store.commit("removeFromCar",id);
			},
			//更新勾选状态
			changeSelected(id,val){
				this.$store.commit("updateGoodsSelected",{id,selected:val});
			}
		},
		components:{
			numbox
		}
	}
</script>

<style lang="scss" scoped>
.shopcart-container{
	background-color: #eee;
	overflow: hidden;

	.goods-list{
		.mui-card-content-inner{
			display: flex;
			align-items: center;
		}
		img{
			width: 60px;
			height: 60px;
		}
		h1{
			margin: 0;
			padding: 0;
			font-weight: bold;
			font-size: 14px;
		}
		.info{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 10px;
			.operate{
				display: flex;
				justify-content: space-between;
				margin-top: 10px;
				line-height: 36px;
				
			}
			/*.mui-numbox{
					width: 40%;
				}*/
			.price{
				color:red;
				font-weight: bold;
			}
			a{
				line-height: 36px;
			}
		}
	}

	.jiesuan{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.red{
			color:red;
			font-weight: bold;
			font-size: 16px;
		}
	}
}
</style>