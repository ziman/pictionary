<template>
	<div id="toolbar">
		<div id="colorpicker">
			<div>Color:</div>
			<!-- <span @click="ChangeColor" style="background-color:#A55"></span>
			<span style="background-color:#BEA"></span> -->
			<span v-for="kleur in colors"
			:style="{ 'background-color': kleur }"
			:class="{'selected': kleur === drawSettings.strokeStyle}"
			@click="changeColor(kleur)"
			></span>
		</div>
		<div id="sizepicker">
			<div>Size:</div>
			<span v-for="size in sizes"
			@click="changeSize(size)"
			:class="{'selected': size === drawSettings.lineWidth}">
				<span
				:style="{ 'width': (size) +'px','height': (size) + 'px'}">
				</span>
			</span>
		</div>
		<div id="misc_actions">
			<div>Undo:</div>
			<span id="undoAction" @click="undoLastAction()">

			</span>
		</div>

	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	name: 'toolbar',
	data(){
		return{
			colors: [
				'#fff',
				'#000',
				// '#333',
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
			],
			sizes: [
				5, 10, 25, 50
			]
		}
	},
	methods: {
		changeColor(kleur) {
			this.$socket.emit('changeDrawSetting', {'strokeStyle': kleur})
		},
		changeSize(size) {
			this.$socket.emit('changeDrawSetting', {'lineWidth': size})
		},
		undoLastAction() {
			this.$emit('undo_last_action')
		}
	},
	computed: {
		...mapState([
			'drawSettings'
		])
	}
}
</script>

<style>
#sizepicker,
#colorpicker,
#misc_actions{
	float:right;
	margin:4px;
}
#colorpicker {
	max-width:16em;
}
#sizepicker > span,
#colorpicker > span{
	width: 2em;
	height: 2em;
	float:left;
	cursor:pointer;
	border: 1px solid #ccc;
	border-radius:25px;
	box-sizing: border-box;
	margin: 2px 2px 0;
	overflow:hidden;

}
#sizepicker > span{
	display:flex;
	justify-content:center;
	align-items:center;
}
#sizepicker > span:hover,
#misc_actions > span:hover{
	background-color:#ccc;
	cursor:pointer;
}
#sizepicker > span.selected{
	background-color:#ccc;
}
#sizepicker > span.selected,
#colorpicker > span.selected{
	border:2px solid lightblue;
	transform:scale(0.8)
}
#sizepicker > span > span {
	background-color:#000;
	border-radius:25px;
}
#colorpicker span:hover{
	border:2px solid lightblue;
	color:rgba(0,0,0,0.1);
}
#colorpicker span:hover:after{
	background-color:rgba(0,0,0,0.2);
	content:'';
	width:100%;
	height:100%;
	float:left;
	border-radius:25px;
}

#undoAction{
	width:2em;
	height:2em;
	position:relative;
	display:block;
	border-radius:5px;
	border:1px solid #333;
	margin:0 auto;
}
#undoAction:before{
	content: "←";
	margin: 50% 0 0 10%;
	font-size:1.5em;
	line-height:1.25em;
}
</style>
