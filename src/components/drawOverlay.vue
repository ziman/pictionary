<template>
	<div>
		<transition name="slide" mode="out-in">
			<div id="wordscreen" v-if="gameOverlay.reason === 'wordPicking'" key="wordPick">
				<div v-if="word.pickAWord.length > 0">
					<h2>Choose a word to draw: </h2>
					<span v-for="(woord, index) in word.pickAWord" :key="index" class="woord" @click="pickWord(index)">{{woord}}</span>
				</div>
				<div v-else>
					<h2>{{game.drawer.username}} is choosing a word</h2>
				</div>
			</div>
			<div id="endscreen" v-if="gameOverlay.reason === 'gameEnd'" key="gameEnd">
				<h2>Game over!</h2>
				<p>hier komt een scoreboard. soon.</p>
				<adminPanel v-if="user.baas" />
			</div>
			<div id="scorescreen" v-if="gameOverlay.reason === 'scoreScreen'" key="scoreScreen">
				<h2>The word was: {{word.pickedWord}}</h2>
				<p>Scores this round:</p>
				<ul>
					<li v-for='user in users' :key="user.id">
						{{user.username}}: {{user.round.pointsThisRound}}
					</li>
				</ul>
			</div>
		</transition>
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
			'user',
			'users'
		]),
	}
}
</script>
<style scoped>
.slide-enter{
	transform: translateX(-200px);
	opacity:0;
}

.slide-leave-to{
	transform: translateX(200px);
	opacity: 0;
}

.slide-enter-active, .slide-leave-active {
	transition: all .5s linear;
}
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
