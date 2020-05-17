<template>
	<div>
		<div class="two columns">round {{game.currentRound + 1}} / {{game.noOfRounds}} </div>
		<div class="seven columns" v-if="game.youAreTheDrawer">You are drawing: {{word.pickedWord}}</div>

		<div class="seven columns" v-else-if="word.lengthWord"> <!-- Add the guessed word here! -->
			Word to guess:
			<span class="letterlijntje" v-for="space in word.lengthWord" :key="space">
				<span v-if="word.spaceLocations.includes(space-1)">&nbsp; </span>
				<span v-else>_ </span>
			</span>
		</div>
		<div class="two columns">Time left: {{game.timer}}</div>
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

<style scoped>
div {
	display: inline-block;
	margin:.5em 1em;
}
.letterlijntje{
	font-size:2em;
	line-height:1px;
}
</style>
