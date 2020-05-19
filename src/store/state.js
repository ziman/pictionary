export default {
	user: {
		userName: null,
		baas: false
	},
	users: [],
	chatLog: [],
	gameStarted: false,
	game: {
		noOfRounds: 0,
		currentRound: 0,
		drawer: '',
		youAreTheDrawer: false,
		timer: 0
	},
	gameOverlay: {
		show: true,
		reason: ''
	},
	word: {
		pickAWord: [],
		pickedWord: '',
		lengthWord: '',
		spaceLocations: []
	},
	drawSettings: {
		strokeStyle: '#000',
		lineCap: 'round',
		lineJoin: 'round',
		lineWidth: 1
	},
	drawing:{},
	undoState:{}
}
