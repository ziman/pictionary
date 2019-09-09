<template>
	<div>
		<h3>Players:</h3>
		<ul>
			<!-- <li :class="[user.baas ? 'baas' : '','user-in-the-list']"
			v-for="user in users">{{ user.username }}</li> -->
			<li :class="[{'baas':user.baas}, {'drawer': user.drawer}, 'user-in-the-list']"
			v-for="user in users">{{ user.username }}</li>
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
	
}
.user-in-the-list.baas{
	list-style-type:none;
}
.user-in-the-list.drawer:after{
	content:' is drawing';
	font-size:.6em;
	text-transform: uppercase;
	vertical-align: middle;
}
.user-in-the-list.baas:before{
	content: '✪';
	font-size:1.5em;
	padding:0 .5em 0 0;
	margin: 0;
}
</style>
