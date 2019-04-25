<template>
	<div class="cmt-content">
		<mt-swipe :auto="3000">
			<!-- 在组件中使用v-for一定要写:key -->
		  <mt-swipe-item v-for="item in lunbotuList" :key="item.id"><img :src="item.img" alt="" :class="{'full': isfull}"></mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		props:['lunbotuList','isfull']
	}
</script>

<style lang="scss" scoped>
.mint-swipe{
	height: 200px;
	.mint-swipe-item{
		text-align: center;
	}
	img{
		width: 100%;
		height: 200px;
	}
}
.full{
	width: 100%;
}
</style>