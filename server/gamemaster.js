const woordenlijst = require('./words.json');

let timer;
let io;
let interval;

let gameObj = {
	totalRounds: 0,
	currentRound: 0,
	lengthGame: 0,
	players: [],
	drawer: -1, //got 'em
	currentWord: '',
	correctGuesses: 0
}

let game = {...gameObj};

module.exports = {
	createGame: function(lengthGame, noOfRounds) {
		game = {...gameObj}
		game.lengthGame = lengthGame;
		game.totalRounds = noOfRounds;
		console.log("create game", game.lengthGame, game.totalRounds);
		return;
	},
	newRound: function() {
		console.log('new round');
		return newRound()
	},
	setWord: function(word){
		game.currentWord = word;
		return;
	},
	checkWord: function(data, socket){
		console.log('gokje ', data)
		wordCheck(data, socket)
	},
	addUser: function(data) {
		let user = { //...data ??? waarschijnlijk ja.
			username: data.username,
			id: data.id,
			guessedCorrect: false,
			points: 0
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
		if(game.players.length === 0){ //reset game
			clearInterval(interval)
			game = {...gameObj}
		}
	},
	getUsers: function() {
		return game.players;
	},//BELOW ADDED FROM ANOTHER FILE, TEST THOROUGHLY
	setio: function(io2) { //goor. even opzoeken hoe dit echt moet ok?
		io = io2;
	},
	startTimer: function () {
		const startTime = game.lengthGame;
		timer = startTime;
		interval = setInterval(timertje, 1000);
	},
	stopTimer: function(){
		clearInterval(interval)
		newRound();
	}
}

function newRound(){
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

		io.emit('announceDrawer',{
			drawer:game.players[game.drawer],
			round: game.currentRound,
			time: game.lengthGame
		})
		//update users with new drawer role
		io.emit('updateUsers', game.players);

		const words = pickWords(3);
		const drawerID = game.players[game.drawer].id;
		io.to(drawerID).emit('chooseWord', words);
	} else {
		console.log('This game is over yo')
		io.emit('gameEnd')

	}
}

function wordCheck(data, socket){
	if(data.woord === game.currentWord){ //correct guess
		for(i=0; i < game.players.length; i++){
			//check who guessed it, make sure it isn't already guessed by them AND that hey aren't the drawer
			if(game.players[i].id === socket.id && !game.players[i].guessedCorrect && !game.players[i].drawer){
				game.players[i].guessedCorrect = true;
				game.correctGuesses++;
				data.correct = true;
				socket.emit('woordGok', data);
				calculatePoints(i)
				io.emit('updateUsers', game.players);
			}
		}
		if(game.correctGuesses === game.players.length-1){//everyone guessed correctly
			for(i=0; i < game.players.length; i++){
				game.players[i].guessedCorrect = false;
			}
			game.correctGuesses = 0;
			clearInterval(interval)
			newRound();
		}
	} else{
		//incorrect guess or just chatting
		io.emit('woordGok', data);
	}
}

function calculatePoints(userIndex){
	//if pointType = timebased || guessbased (for now we do timebased)
	const points = timer;
	const arbitraryCutoffPoint = 20;
	if(timer > arbitraryCutoffPoint){
		timer = timer - Math.floor(timer / game.players.length);
	}
	game.players[userIndex].points += points;
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

function timertje() {
	timer--;
	io.emit('updateTimer', timer)
	if(timer === 0){
		clearInterval(interval);
		newRound();
	}
}
