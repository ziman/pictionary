const woordenlijst = require('./words.json');

let game = {
	totalRounds: 0,
	currentRound: 0,
	lengthGame: 0,
	players: [],
	drawer: -1, //got 'em
	currentWord: '',
	correctGuesses: 0
}

module.exports = {
	createGame: function(lengthGame, noOfRounds) {
		game.lengthGame = lengthGame;
		game.totalRounds = noOfRounds;
		game.drawer = -1;
		game.currentRound = 0;
		console.log("create game", game.lengthGame, game.totalRounds);
		return;
	},
	newRound: function() {
		console.log('new round');
		return newRoundMachine()
	},
	setWord: function(word){
		game.currentWord = word;
		return;
	},
	checkWord: function(word){
		if(word === game.currentWord){
			game.correctGuesses++;
			if(game.correctGuesses === game.players.length-1){
				console.log('ROUNDENDED')
				game.correctGuesses = 0;
				return 'CORRECT_AND_ROUND_END'
			}
			return 'CORRECT';
		} else{
			return 'NOT_CORRECT';
		}
	},
	getLengthOfRound: function(){
		return game.lengthGame;
	},
	addUser: function(data) {
		let user = { //...data ??? waarschijnlijk ja.
			username: data.username,
			id: data.id
		};
		if(game.players.length === 0) {
			user.baas = true;
		}
		game.players.push(user);
		return user;
	},
	removeUser: function (username) {
		for(i = 0; i < game.players.length; i++){
			if(game.players[i].username === username){
				//dit is een rare check. players[0] is altijd baas. Het klopt dus maar een beetje?
				if (game.players[i].baas && game.players[1]) game.players[1].baas = true;
				game.players.splice(i, 1)
				break;
			}
		}
	},
	getUsers: function() {
		return game.players;
	}
}

function newRoundMachine(){
	console.log("newroundmachine", game.totalRounds, game.currentRound)
	if(game.drawer === game.players.length-1) {
		game.currentRound++;
		game.players[game.drawer].drawer = false;
		game.drawer = -1;
	}
	if (game.totalRounds > game.currentRound){
		//move drawing role to next player
		if(game.drawer !== -1) {
			game.players[game.drawer].drawer = false;
		}
		game.drawer++;
		game.players[game.drawer].drawer = true;

		let words = pickWords(3);
		let newRound = {
			drawingPlayer: game.players[game.drawer],
			words: words,
			currentRound: game.currentRound,
			lengthOfRound: game.lengthGame
		}
		return newRound;
	} else {
		console.log('This game is over yo')
		return 'GAME_OVER';
	}
}

function pickWords(numberOfWords){
	let pickedWords = [];
	while(numberOfWords > 0) {
		let rekenen = Math.floor(Math.random() * woordenlijst.woorden.length);
		let word = woordenlijst.woorden[rekenen];
		//check if word is already present
		if(pickedWords.indexOf(word) === -1) {
			pickedWords.push(word);
			numberOfWords--;
		}
	}
	return pickedWords;
}
