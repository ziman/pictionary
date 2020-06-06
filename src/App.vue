<template>
  <div id="app">
	<loginScreen id="loginScreen" v-if="gameStarted === false" />
	<div v-if="gameStarted === true" class="container">
		<appHeader class="twelve columns"/>
		<div>
			<userList class="two columns" />
			<drawPane class="seven columns" id="drawpane"/>
			<chatPane id="chatPane" class="three columns" />
		</div>
	</div>
  </div>
</template>

<script>
import loginScreen from './components/loginScreen.vue'
import userList from './components/userList.vue'
import drawPane from './components/drawPane.vue'
import chatPane from './components/chatPane.vue'
import appHeader from './components/appHeader.vue'

import { mapState } from 'vuex'

export default {
	name: 'app',
	components: {
		loginScreen,
		userList,
		drawPane,
		chatPane,
		appHeader
	},
	computed: {
		...mapState([
			'user',
			'gameStarted'
		])
	}

}
</script>

<style>
#app{
  max-width:1400px;
  margin:0 auto;
}
#loginScreen{
	width:40em;
	margin:5em auto;
}
#drawpane{
	position: relative;
}
#chatPane{
	float:right;
}
</style>
