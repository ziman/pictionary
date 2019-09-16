<template>
	<div >
		<canvas
			id="tekenbord"
			ref="canvas"
			:width="cnvWidth"
			:height="cnvHeight"
			@mousedown="mousedown"
			@mouseup="mouseup"
			@mousemove="mousemove"
			v-shortkey="{ mac:['meta', 'z'], win:['ctrl', 'z']}" @shortkey="undoDrawing()"
			>
		</canvas>
		<toolbar v-if="this.game.youAreTheDrawer"/>
		<drawOverlay :style="overlaySize" id="tekenbord-overlay" v-if="gameOverlay.show"></drawOverlay>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import drawOverlay from './drawOverlay.vue'
import toolbar from './toolbar.vue'
export default {
	name: 'drawPane',
	components: {
		drawOverlay,
		toolbar
	},
	data() {
		return {
			canvas: null,
			cnvWidth: 0,
			cnvHeight:0,
			ctx: null,
			isDrawing: false,
			lastX: 0,
			lastY: 1,
			imgObjArray: []
		}
	},
	methods: {
		mouseup(e) {
			this.isDrawing = false;
		},
		mousedown(e) {
			this.imgObjArray.push(this.canvas.toDataURL());
			this.isDrawing = true;
			this.lastX = e.offsetX;
			this.lastY = e.offsetY;
		},
		mousemove(e) {
			if(this.game.youAreTheDrawer) {
				this.teken(e, null)
			}
		},
		undoDrawing(e, data){
			if(this.game.youAreTheDrawer || data){
				//clears current drawing and replace it with a base64 img provided either through socket or in our array
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				var image = new Image();
				image.onload = () => {
					this.ctx.drawImage(image,0,0)
				}
				let previousState;
				if(data){
					previousState = data.imagesrc;
				} else {
					previousState = this.imgObjArray.pop();
					this.$socket.emit('undoAction', {
						imagesrc: previousState
					});
				}
				image.src = previousState;
			}
		},
		teken(e, data) {
			if(this.isDrawing || data) {
				const { offsetX, offsetY } =  data || e;
				const { lastX, lastY } = data || this;
				const w = this.canvas.width;
				const h = this.canvas.height;

				if(this.isDrawing) {
					this.ctx.beginPath();
					this.ctx.moveTo(lastX,lastY);
					this.ctx.lineTo(offsetX, offsetY);
					this.ctx.stroke();
				} else if(data) {
					this.ctx.beginPath();
					this.ctx.moveTo(lastX * w ,lastY * h);
					this.ctx.lineTo(offsetX * w, offsetY * h);
					this.ctx.stroke();
				}

				if(e){
					this.$socket.emit('tekenen', {
						lastX: this.lastX / w,
						lastY: this.lastY / h,
						offsetX: offsetX / w,
						offsetY: offsetY / h,
						color: this.drawSettings.strokeStyle
					})
				}
				this.lastX = offsetX;
				this.lastY = offsetY;
			}
		},
		handleResize(){
			let ploatie = this.canvas.toDataURL();

			this.$nextTick(() => {
				let width = this.canvas.parentNode.clientWidth;
				this.cnvWidth = width;
				//16:9 ?
				let height = this.cnvWidth * 10 / 16;
				this.cnvHeight = height;
				//reapply image data (maybe rename undo function?)
				this.undoDrawing(null, {imagesrc: ploatie})
			})
		}
	},
	watch: {
		//if any option in drawSettings changes, update the ctx object.
		//TODO find a way to only update the actual changed property without making a watcher for each.
		drawSettings: {
			handler(newV) {
				console.log('WATCHIN DEM DRAWSETTUNGS', newV)
				this.ctx.strokeStyle = newV.strokeStyle;
				this.ctx.lineCap = newV.lineCap;
				this.ctx.lineJoin = newV.lineJoin;
				this.ctx.lineWidth = newV.lineWidth;
			},
			deep: true
		},
		gameOverlay: {
			handler(gameOverlayState) {
				//if the gameoverlay closes, clear the canvas and reset undoArray
				if(gameOverlayState.show === false) {
					this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
					this.imgObjArray = [];
				}
			},
			deep: true
			}
	},
	sockets: {
		drawing(data) {
			this.teken(null, data)
		},
		undoAction(data) {
			this.undoDrawing(null, data)
		}
	},
	computed: {
		...mapState([
			'gameOverlay',
			'game',
			'drawSettings'
		]),
		overlaySize() {
			return{
				width: this.cnvWidth + 'px',
				height: this.cnvHeight + 'px'
			}
		}
	},
	mounted: function() {
		this.$nextTick(function () {
			// Code that will run only after the
			// entire view has been rendered
			this.canvas = this.$refs.canvas;
			this.ctx = this.canvas.getContext('2d');
			this.handleResize();
			// this.canvas.width = this.$refs.canvas.parentNode.clientWidth;
			// this.canvas.height = window.innerHeight;
		}),
		window.addEventListener('resize', this.handleResize);
	}
}
</script>

<style>
#tekenbord-overlay {
	position: absolute;
	top: 0;
	background-color: rgba(0,0,0,0.8);
	color: white;
	padding: 3em;
	box-sizing: border-box;
}
</style>
