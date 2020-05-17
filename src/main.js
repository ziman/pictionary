import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import store from './store/store'

import normalize from './css/normalize.css'
import skeleton from './css/skeleton.css'

Vue.use(normalize, skeleton)
Vue.use(require('vue-shortkey'))
Vue.config.productionTip = false

Vue.use(new VueSocketIO({
	debug: true,
	connection: 'http://localhost:3000',
	// connection: 'http://10.3.255.235:3000/',
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_'
	}
}))

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
