<template>
	<div>
		<div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input class="mui-input-numbox" type="number" @change.prevent ="countChange" ref="numbox" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
	</div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default{
	props:["max"],
	mounted(){
		mui(".mui-numbox").numbox();
	},
	methods:{
		countChange(){
			console.log("值："+this.$refs.numbox.value)
			this.$emit('getcount',parseInt(this.$refs.numbox.value));
			return false;
		}
	},
	watch:{
		"max":function(newVal,oldVal){
			mui(".mui-numbox").numbox().setOption('max',newVal)
		}
	}

}
</script>

<style scoped>
.mui-numbox{
	display: inline-block;
}
</style>