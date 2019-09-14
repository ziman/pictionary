<template>
	<div>
		<div id="wordscreen" v-if="gameOverlay.reason === 'wordPicking'">
			<div v-if="word.pickAWord.length > 0">
				<h2>Choose a word to draw: </h2>
				<span v-for="(woord, index) in word.pickAWord" :key="index" class="woord" @click="pickWord(index)">{{woord}}</span>
			</div>
			<div v-else>
				<h2>{{game.drawer.username}} is choosing a word</h2>
			</div>
		</div>
		<div id="endscreen" v-if="gameOverlay.reason === 'gameEnd'">
			<h2>Game over!</h2>
			<p>hier komt een scoreboard. soon.</p>
			<adminPanel v-if="user.baas" />
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex';
import adminPanel from './adminPanel.vue'
export default {
	name: 'drawOverlay',
	components: {
		adminPanel
	},
	methods:{
		pickWord(index) {
			this.$socket.emit('pickWord',this.word.pickAWord[index])
		}
	},
	computed:{
		...mapState([
			'word',
			'gameOverlay',
			'game',
			'user'
		]),
	}
}
</script>
<style>
.woord{
	display:inline-block;
	margin:0 1em .5em 0;
	background-color:#eee;
	padding:1em;
	color:black;
	cursor:pointer;
}
label {
	color:#fff
}
</style>
