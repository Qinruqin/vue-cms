<template>
	<div class="goodsinfo-container">
		<transition
		@before-enter = "beforeEnter"
		@enter = "enter"
		@after-enter = "afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
		<!-- 商品轮播图 区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
				</div>
			</div>
		</div>
		<!-- 商品购买 区域 -->
		<div class="mui-card">
			<div class="mui-card-header">{{goodsInfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsInfo.sell_price}}</span>
					</p>
					<p class="number">购买数量：<numbox @getcount="getSelectCount" :max="goodsInfo.stock_quantity"></numbox></p>
					<p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addToShopcart">加入购物车</mt-button>	
					</p>
				</div>
			</div>
		</div>
		<!-- 商品参数 区域 -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{goodsInfo.goods_no}}</p>
					<p>库存情况：{{goodsInfo.stock_quantity}}</p>
					<p>上架时间：{{goodsInfo.add_time | dataFormat}}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(goodsInfo.id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(goodsInfo.id)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import swiper from '../subcomponents/swiper.vue';
	import numbox from '../subcomponents/goodsinfo_numbox.vue';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				id:this.$route.params.id ,//将Url中的地址传递
				goodsInfo:'',
				lunbotuList:[], //轮播图数据
				ballFlag:false ,
				sellectCount:1
			};
		},
		created:function() {
			this.getLunbotu();
			this.getGoodsInfo();
		},
		methods:{
			//获取 轮播图
			getLunbotu(){
				this.$http.get('api/getthumimages/'+this.id).then(result => {
					if(result.body.status === 0){
						//请求成功
						result.body.message.forEach(item=>{
							item.img = item.src;
						})
						this.lunbotuList = result.body.message;
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
			//获取 商品信息
			getGoodsInfo(){
				this.$http.get('api/goods/getinfo/'+this.id).then(result => {
					if(result.body.status === 0){
						//请求成功
						console.log(result.body)
						this.goodsInfo = result.body.message[0];
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
			//跳转至 图文介绍 页
			goDesc(id){ 
				//命名路由的方式
				this.$router.push({name:"goodsdesc", params: { id } });
			},
			//跳转至 商品评论 页
			goComment(id){
				//简单方式
				this.$router.push('/home/goodscomment/' + id);
			},
			//加入购物车
			addToShopcart(){
				this.ballFlag = !this.ballFlag;
			},
			// 小球动画
			beforeEnter(el){
				el.style.transform="translate(0,0)";
			},
			enter(el,done){
				el.offsetWidth;
				//获取 小球 在页面中的位置
				const ballPosition = this.$refs.ball.getBoundingClientRect();
				//获取 徽标 在页面中的位置
				const badgePosition = document.getElementById("badge").getBoundingClientRect();
                const xDist = badgePosition.left -ballPosition.left;
                const yDist = badgePosition.top -ballPosition.top;

				el.style.transform = `translate(${xDist}px,${yDist}px)`;
				el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
				done();
			},
			afterEnter(el){
				this.ballFlag = !this.ballFlag;
			},
			getSelectCount(count){
				this.sellectCount = count;
				return false;
			}
		},
		components:{
		  swiper,
		  numbox
		}
	}
</script>

<style lang="scss">
.goodsinfo-container{
	background-color: #eee;
	overflow: hidden;

	.ball{
		position: absolute;
		top: 390px;
		left: 140px;
		z-index: 99;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: red;
	}

	.now_price{
		color: red;
		font-size: 16px;
		font-weight: bold;
	}
	.number{
		display: flex;
		height: 36px;
		line-height: 36px;
		.mui-numbox{
			height: 100%;
		}
	}
	.mint-button--small{
		height: 34px;
		line-height: 34px;
	}
	.mui-card-footer{
		display: block;
		button{
			margin:10px 0;
		}
	}
	
}
</style>