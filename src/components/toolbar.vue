<template>
	<div>
		<div id="colorpicker">
			<!-- <span @click="ChangeColor" style="background-color:#A55"></span>
			<span style="background-color:#BEA"></span> -->
			<span v-for="kleur in colors"
			:style="{ 'background-color': kleur }"
			@click="changeColor(kleur)"
			></span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'toolbar',
	data(){
		return{
			colors: [
				'#fff',
				'#000',
				'#333',
				'#ccc',
				'#aaa',
				'#fff100', //yewllo
				'#ff8c00', //orange
				'#e81123', //red
				'#ec008c', //magenta
				'#68217a', //purple
				'#00188f', //dark blue
				'#00bcf2', //cyan
				'#00b294', //teal
				'#009e49', //green
				'#bad80a' //lime
			]
		}
	},
	methods: {
		changeColor(kleur) {
			this.$socket.emit('changeDrawSetting', {'strokeStyle': kleur})
		}
	}
}
</script>

<style>
#colorpicker {
	float:right;
	max-width:21em;
}
#colorpicker span {
	width: 2em;
	height: 2em;
	display: inline-block;
	margin: 3px;
	border-radius: 25px;
	border: 1px solid #ccc;
	cursor: pointer;
}
</style>
