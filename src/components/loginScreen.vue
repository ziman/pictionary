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
		 <adminPanel v-if="user.baas" />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import adminPanel from './adminPanel.vue'
export default {
	name: 'loginScreen',
	components: {
		adminPanel
	},
	data() {
		return {
			lcl_username: ''
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
		}
	}
}
</script>

<style>

</style>
