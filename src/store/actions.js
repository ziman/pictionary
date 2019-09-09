export default {
	// addChatMessage: (context, payload) => {
	// 	context.commit('addChatMessage', payload)
	// },
	// addNewMessage: ({ commit }, payload) => {
	// 	commit('mAddChatMessage', payload)
	// },
	SOCKET_updateUsers: ({ commit }, payload) => {
		console.log(payload);
		commit('SOCKET_updateUsers', payload)
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
		console.log('actions_woordgok', payload)
		commit('SOCKET_woordgok', payload)
	}
}
