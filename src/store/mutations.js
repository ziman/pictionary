export default {
	SOCKET_updateUsers: (state, users) => {
		state.users = users;
	},
	SOCKET_drawing: (state, data) =>{
		state.drawing = data
	},
	SOCKET_undoAction: (state, data) => {
		state.undoState = data
	},
	SOCKET_setUser: (state, userData) => {
		state.user.userName = userData.user.username;
		state.user.baas = userData.user.baas
		//user joined after game has started
		if(userData.gameData){
			state.gameStarted = true;
			state.game.noOfRounds = userData.gameData.totalRounds;
			state.game.currentRound = userData.gameData.currentRound;
			state.gameOverlay = {
				show: false
			}
			state.word.lengthWord = userData.gameData.lengthWord;

		}
	},
	SOCKET_youAreTheNewBaas:(state) => {
		state.user.baas = true
	},
	SOCKET_gameStarted: (state, noOfRounds) => {
		state.game.noOfRounds = noOfRounds;

		if(state.user.userName){
			state.gameStarted = true;
		}
	},
	SOCKET_announceDrawer: (state, data) => {
		//reset in case you were drawer previously
		state.word.pickAWord = [];
		state.game.youAreTheDrawer = false;
		state.word.pickedWord = '';
		state.word.lengthWord = 0;
		//set new data
		state.gameOverlay = {
			show: true,
			reason: 'wordPicking'
		}
		state.game.drawer = data.drawer;
		state.game.currentRound = data.round;
		state.game.timer = data.lengthOfRound;
	},
	SOCKET_chooseWord: (state, data) => {
		state.word.pickAWord = data;
		state.game.youAreTheDrawer = true;
	},
	SOCKET_showScoreScreen: (state, data) => {
		state.users = data.users;
		state.gameOverlay = {
			show: true,
			reason: 'scoreScreen'
		}
		state.word.pickedWord = data.word
	},
	SOCKET_startRound: (state, wordData) => {
		if(wordData.word) { //the actual word
			state.word.pickedWord = wordData.word;
		}
		if(wordData.lengthWord) { //the length of the word
			state.word.spaceLocations = wordData.spaceLocations
			state.word.lengthWord = wordData.lengthWord
		}
		state.gameOverlay.show = false;
	},
	SOCKET_updatetimer: (state, timer) => {
		state.game.timer = timer
	},
	SOCKET_woordgok: (state, payload) => {
		state.chatLog.push(payload)
	},
	SOCKET_otherPlayerGuessedCorrect: (state, payload) => {
		console.log("PUSHIN PAYLOAD")
		state.chatLog.push(payload)
	},
	SOCKET_changeDrawSetting: (state, payload) => {
		state.drawSettings = {
			...state.drawSettings,
			...payload
		}
	},
	SOCKET_gameEnd: (state, payload) => {
		state.gameOverlay = {
			show: true,
			reason: 'gameEnd'
		}
	}
}
