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
		<toolbar v-if="this.game.youAreTheDrawer" @undo_last_action="undoDrawing()"/>
		<transition name="fade">
			<drawOverlay id="tekenbord-overlay" v-if="gameOverlay.show"></drawOverlay>
		</transition>
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
			cnvWidth: 800,
			cnvHeight:600,
			ctx: null,
			isDrawing: false,
			lastX: 0,
			lastY: 1,
			imgObjArray: []
		}
	},
	methods: {
		mouseup(e) {
			if(this.game.youAreTheDrawer) {
				this.isDrawing = false;
				let image = this.canvas.toDataURL();

				this.$socket.emit('completeCanvas',
					image
				)
			}
		},
		mousedown(e) {
			if(this.game.youAreTheDrawer) {
				let image = this.canvas.toDataURL();
				this.imgObjArray.push(image);
				this.isDrawing = true;

				let rect = this.canvas.getBoundingClientRect();
				const x = (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width;
				const y = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height;
				this.lastX = x;
				this.lastY = y;
			}
		},
		mousemove(e) {
			if(this.game.youAreTheDrawer) {
				let rect = this.canvas.getBoundingClientRect();
				const x = (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width;
				const y = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height;
				const eData = {x,y}
				this.teken(eData, null)
			}
		},
		undoDrawing(e, data){
			if(this.game.youAreTheDrawer || data){
				//clears current drawing and replace it with a base64 img provided
				//either through socket or in our array
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				var image = new Image();
				image.onload = () => {
					//scale tryout?
					if(data && data.width){
						let scaleW = data.width/this.cnvWidth;
						let scaleH = data.height/this.cnvHeight;
						console.log(scaleW,scaleH)
						this.ctx.scale(scaleW, scaleH)
					}
					this.ctx.drawImage(image,0,0, this.cnvWidth, image.height * (this.cnvWidth/image.width) )
					// this.ctx.drawImage(image,0,0)

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

				const { x, y } =  data || e;
				const { lastX, lastY } = data || this;

				if(this.isDrawing) {
					this.ctx.beginPath();
					this.ctx.moveTo(lastX,lastY);
					this.ctx.lineTo(x, y);
					this.ctx.stroke();
				} else if(data) {
					this.ctx.beginPath();
					this.ctx.moveTo(lastX, lastY);
					this.ctx.lineTo(x, y);
					this.ctx.stroke();
				}

				if(e){
					this.$socket.emit('tekenen', {
						lastX: this.lastX,
						lastY: this.lastY,
						x: x,
						y: y
					})
				}
				this.lastX = x;
				this.lastY = y;
			}
		}
	},
	watch: {
		//if any option in drawSettings changes, update the ctx object.
		//TODO find a way to only update the actual changed property without making a watcher for each.
		drawSettings: {
			handler(newV) {
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
		])
	},
	mounted: function() {
		this.$nextTick(function () {
			// Code that will run only after the
			// entire view has been rendered
			this.canvas = this.$refs.canvas;
			this.ctx = this.canvas.getContext('2d');
			this.ctx.imageSmoothingEnabled = true;

			// this.handleResize();
			// this.canvas.width = this.$refs.canvas.parentNode.clientWidth;
			// this.canvas.height = window.innerHeight;
		})
		// window.addEventListener('resize', this.handleResize);
	}
}
</script>

<style>
.fade-enter, .fade-leave-to{
	opacity: 0
}

.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
#tekenbord {
	border: 1px solid #ccc;
	image-rendering: pixelated;
	cursor:crosshair;
	width:100%
}
#tekenbord-overlay {
	position: absolute;
	top: 0;
	width:100%;
	width: calc(100% + 2px);
	height:100%;
	background-color: rgba(0,0,0,0.8);
	color: white;
	padding: 3em;
	box-sizing: border-box;
	border-radius:5px;
}
</style>
