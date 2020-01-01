<template>
	<div class="baas-controls">
		<h4>admin panel:</h4>
		<form @submit.prevent="startGame" id="baas-controls-form">
			 <label><input v-model="lcl_drawing_time" type="text" />Drawing time</label>
			 <label><input v-model="lcl_no_of_rounds" type="text" />Number of rounds</label>
			 <button :disabled='users.length <= 1'>Start game</button>
			 <small v-if='users.length <= 1'> Waiting for more players</small>
		 </form>
	 </div>
 </template>

<script>
import {mapState} from 'vuex'
export default {
	name: 'adminPanel',
	data() {
		return {
			lcl_drawing_time: 80,
			lcl_no_of_rounds: 3
		}
	},
	computed: {
		localComputed () { /* ... */ },
		// mix this into the outer object with the object spread operator
		...mapState([
			'user',
			'users'
		])
	},
	methods: {
		startGame(){
			const gameOptions = {
				lengthGame:this.lcl_drawing_time,
				noOfRounds:this.lcl_no_of_rounds
			}
			this.$socket.emit('startGame', gameOptions)
		}
	}
}
</script>

<style>
form {
	color: #333;
}
#baas-controls-form{
	font-weight: normal;

}
</style>
