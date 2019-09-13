<template>
	<div>
		<div v-if="word.pickAWord.length > 0">
			<h2>Choose a word to draw: </h2>
			<span v-for="(woord, index) in word.pickAWord" :key="index" class="woord" @click="pickWord(index)">{{woord}}</span>
		</div>
		<div v-else>
			<h2>{{game.drawer.username}} is choosing a word</h2>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
	name: 'drawOverlay',
	methods:{
		pickWord(index) {
			this.$socket.emit('pickWord',this.word.pickAWord[index])
		}
	},
	computed:{
		...mapState([
			'word',
			'gameOverlay',
			'game'
		]),
	}
}
</script>
<style></style>
