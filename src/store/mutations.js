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
		//reset in case you were drawer previously
		state.word.pickAWord = [];
		state.game.youAreTheDrawer = false;
		state.word.pickedWord = '';
		//set new data
		state.gameOverlay = true;
		state.game.drawer = data.drawer;
		state.game.currentRound = data.round;
		state.game.timer = data.lengthOfRound;
	},
	SOCKET_chooseWord: (state, data) => {
		state.word.pickAWord = data;
		state.gameOverlay = true;
		state.game.youAreTheDrawer = true;

	},
	SOCKET_startRound: (state, wordData) => {
		if(wordData.word) { //the actual word
			state.word.pickedWord = wordData.word;
		}
		if(wordData.wordLength) { //the length of the word
			state.word.lengthWord = wordData.wordLength
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
