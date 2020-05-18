export default {
	SOCKET_updateUsers: ({ commit }, payload) => {
		commit('SOCKET_updateUsers', payload)
	},
	SOCKET_youAreTheNewBaas: ({commit}, payload) => {
		console.log('yooooo')
		commit('SOCKET_youAreTheNewBaas')
	},
	SOCKET_drawing: ({commit}, payload) => {
		commit('SOCKET_drawing')
	},
	SOCKET_setUser: ({ commit }, data) => {
		commit('SOCKET_setUser', data)
	},
	SOCKET_gameStarted: ({ commit }, data) => {
		commit('SOCKET_gameStarted', data)
	},
	SOCKET_announceDrawer: ({ commit }, data) => {
		commit('SOCKET_announceDrawer', data)
	},
	SOCKET_chooseWord: ({ commit }, data) => {
		commit('SOCKET_chooseWord', data)
	},
	SOCKET_startRound: ({ commit }, word) => {
		commit('SOCKET_startRound', word)
	},
	SOCKET_updateTimer: ({ commit }, timer) => {
		commit('SOCKET_updatetimer', timer)
	},
	SOCKET_woordGok: ({ commit }, payload) => {
		commit('SOCKET_woordgok', payload)
	},
	SOCKET_showScoreScreen:({commit}, payload) => {
		commit('SOCKET_showScoreScreen', payload)
	},
	SOCKET_changeDrawSetting: ({ commit }, payload) => {
		commit('SOCKET_changeDrawSetting', payload)
	},
	SOCKET_gameEnd: ({ commit }, payload) => {
		commit('SOCKET_gameEnd', payload)
	}
}
