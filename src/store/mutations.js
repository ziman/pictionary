export default {
	SOCKET_updateUsers: (state, users) => {
		state.users = users;
	},
	SOCKET_setUser: (state, userData) => {
		state.user.userName = userData.username;
		state.user.baas = userData.baas
	},
	SOCKET_gameStarted: (state, noOfRounds) => {
		state.game.noOfRounds = noOfRounds;
		state.gameStarted = true;
	},
	SOCKET_announceDrawer: (state, data) => {
		state.word.pickAWord = [];
		state.game.youAreTheDrawer = false;
		state.word.pickedWord = '';
		state.gameOverlay = true;
		state.game.drawer = data.drawer;
		state.game.currentRound = data.round;
	},
	SOCKET_chooseWord: (state, data) => {
		state.word.pickAWord = data;
		state.gameOverlay = true;
		state.game.youAreTheDrawer = true;

	},
	SOCKET_startRound: (state, word) => {
		if(word) {
			state.word.pickedWord = word;
		}
		state.gameOverlay = false;
	},
	SOCKET_updatetimer: (state, timer) => {
		state.game.timer = timer
	},
	SOCKET_woordgok: (state, payload) => {
		state.chatLog.push(payload)
	}
}
