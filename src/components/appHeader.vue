<template>
	<div>
		<span>round {{game.currentRound + 1}} / {{game.noOfRounds}} </span>
		<span>Time left: {{game.timer}}</span>
		<span v-if="word.pickedWord.length > 0">You are drawing: {{word.pickedWord}}</span>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name:'appHeader',
	computed: {
		...mapState([
			'game',
			'word'
		])
	}
}
</script>

<style>

</style>
