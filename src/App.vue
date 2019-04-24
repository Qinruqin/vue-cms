<template>
	<div class="app-content">
		<!-- 头部 header -->
		<mt-header fixed title="Vue项目"></mt-header>
		<!-- 中间主体内容 router-view -->
		<transition>
			<router-view></router-view>
		</transition>
		<!-- 底部 footer -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-lib" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-lib" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-lib" to="/shopcart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-lib" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
</script>

<style scoped>
	.mint-header{
		z-index: 99;
	}
	.app-content{
		padding-top: 40px;
		padding-bottom: 50px;
	}
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-enter{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	.v-enter-active,.v-leave-active{
		opacity: 1;
		transition: all .5 ease ;
	}

	.mui-bar-tab .mui-tab-item-lib {
	    display: table-cell;
	    overflow: hidden;
	    width: 1%;
	    height: 50px;
	    text-align: center;
	    vertical-align: middle;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    color: #929292;
	}
	.mui-bar-tab .mui-tab-item-lib .mui-icon{
	    top: 3px;
	    width: 24px;
	    height: 24px;
	    padding-top: 0;
	    padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-lib .mui-icon ~ .mui-tab-label {
	    font-size: 11px;
	    display: block;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.mui-bar-tab .mui-tab-item-lib.mui-active {
	    color: #007aff;
	}
</style>