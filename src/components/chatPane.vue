<template>
	<div>
		<div ref="chatlogje" id="chat-log">
			<p :class="[{correct: chat.correct}, 'chat-entry']" v-for="chat in chatLog">
				<span>{{chat.user}}: </span>
				{{chat.woord}}
			</p>
		</div>
		<div id="chat-tools">
			<form @submit.prevent="woordgok" id="chatform">
				<input id="chat-text-input" v-model="lcl_woordgok" placeholder="Type your guess here" type="text" />
				<label for="chat-text-input">⏎</label>
			</form>
		</div>
	</div>
</template>

<script>
import { mapState} from 'vuex';
export default {
	name: 'chatPane',
	data() {
		return {
			lcl_woordgok: '',
			scrolled: false
		}
	},
	methods: {
		woordgok(){
			let woordGokObj = {
				user: this.user.userName,
				woord: this.lcl_woordgok
			}
			this.$socket.emit('woordGok', woordGokObj);
			this.lcl_woordgok = '';
		}
	},
	computed: {
		...mapState([
			'user',
			'chatLog'
		])
	},
	watch: {
		chatLog() {
			this.$nextTick(function(){
				let chatpaneel = this.$refs.chatlogje;
				console.log('scrolln', chatpaneel);
				chatpaneel.scrollTop = chatpaneel.scrollHeight;
			})
		}
	}
}
</script>

<style>
.chat-entry{
	margin:0;
	padding:2px 5px;
	background-color:#fff;
}
.chat-entry:nth-child(odd){
	background-color:#f0f0f0;
}

.chat-entry span {
	font-weight: bold;
	font-size: .8em;
}

.chat-entry.correct{
	background-color:lightgreen;
}
.chat-entry.correct:after{
	content:'is correct!';
	font-size:.8em;
	font-style:italic;
}

#chatform label{
	padding:.4em;
	position:absolute;
	right:0;
	top:0;
	/* margin:1px; */
	background-color:#fff;
	border-style:solid;
	border-color:#d1d1d1;
	border-width:1px 1px 1px 0;
	border-radius: 0 4px 4px 0;
}
#chat-text-input{
	width:91%;
	font-weight: normal;
}

#chat-text-input:focus + label {
	color: white;
	background-color: #74c0ff;
	display: block;
	border: 1px solid #74c0ff;
	padding: .4em;
	margin:0px;
}
#chat-tools{
	position: relative;
}
#chat-log{
	height:80vh;
	overflow-y:scroll;
	border:1px solid #ccc;
}
</style>
