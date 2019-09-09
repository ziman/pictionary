<template>
	<div>
		<form v-if="user.userName === null" @submit.prevent="setUsername" id="user-name-form">
			  <h2>choose user name:</h2>
			  <input type="text" id="choose-user-name" v-model="lcl_username"/>
			  <button type="submit">Choose</button>
		  </form>
		 <div>
			 <h2>Users connected:</h2>
			 <ul>
				 <li :class="[user.baas ? 'baas' : '','user-in-the-list']" v-for="user in users">{{ user.username }}</li>
			 </ul>
		 </div>
		 <div v-if="user.baas" class="baas-controls">
			 <h4>admin panel:</h4>
			 <form @submit.prevent="startGame" id="baas-controls-form">
				  <label><input v-model="lcl_drawing_time" type="text" />Drawing time</label>
				  <label><input v-model="lcl_no_of_rounds" type="text" />Number of rounds</label>
				  <button>Start game</button>
			  </form>
		  </div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'loginScreen',
	data() {
		return {
			lcl_username: '',
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
		setUsername(){
			this.$socket.emit('setUsername', this.lcl_username);
		},
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

</style>
