<template>
	<div>
		<div class="mui-numbox" data-numbox-min="1">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input class="mui-input-numbox" type="number" @change.prevent ="countChange" ref="numbox" :value="initcount" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
	</div>
</template>	

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default{
	mounted(){
		mui(".mui-numbox").numbox();
	},
	methods:{
		countChange(){
			console.log(this.$refs.numbox.value)
			this.$store.commit("updateGoodsInfo",{ id:this.goodsid, count:parseInt(this.$refs.numbox.value) });
		}
	},
	props:["initcount", "goodsid"]
}
</script>

<style scoped>
</style>