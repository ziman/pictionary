<template>
	<div>
		<!-- <h3>Players:</h3> -->
		<ul>
			<!-- <li :class="[user.baas ? 'baas' : '','user-in-the-list']"
			v-for="user in users">{{ user.username }}</li> -->
			<li :class="[{'baas':user.baas}, {'drawer': user.drawer}, {'correctGuess': user.guessedCorrect}, 'user-in-the-list']"
			v-for="user in users">{{ user.username }}
				<div>points: {{user.points}}</div>

			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default{
	name: 'userList',
	computed: {
		localComputed () { /* ... */ },
		// mix this into the outer object with the object spread operator
		...mapState([
			'userName',
			'users'
		])
	}
}
</script>

<style>
.user-in-the-list {
	position:relative;
	padding:5px;
	word-wrap: break-word;
	list-style:none;
}
.user-in-the-list:nth-child(2n){
	background-color:#eee;
}
.correctGuess{
	background-color:lightgreen;
}
.user-in-the-list.baas{
	list-style-type:none;
}
.user-in-the-list.drawer:after{
	content:' ✎';
	font-size:1.5em;
	text-transform: uppercase;
	vertical-align: middle;
	position:absolute;
	right:5px;
	top:25%;
}
.user-in-the-list.baas:before{
	content: '✪';
	font-size:1.5em;
	padding:0 .5em 0 0;
	margin: 0;
}
</style>
