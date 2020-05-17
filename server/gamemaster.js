const woordenlijst = require('./words.json');

let timer;
let io;
let interval;

let gameObj = {
	gameStarted: false,
	totalRounds: 0,
	currentRound: 0,
	lengthGame: 0,
	players: [],
	drawer: -1, //got 'em
	currentWord: '',
	correctGuesses: 0,
	canvasURL: 0,
	drawSettings: {
		lineWidth: 1,
		strokeStyle: '#000'
	}
}

let game = {...gameObj};

module.exports = {
	createGame: function(lengthGame, noOfRounds) {
		game.drawer = -1;
		game.currentRound = 0;
		game.lengthGame = lengthGame;
		game.totalRounds = noOfRounds;
		//reset points if this is a new round.
		for(i=0; i < game.players.length; i++){
			game.players[i].points = 0;
		}
		game.gameStarted = true;
		return;
	},
	newRound: function() {
		console.log('new round');
		return newRound()
	},
	setWord: function(word){
		game.currentWord = word;
		let spaceLocations = [];
		let position = word.indexOf(' ')

		while (position !== -1) {
		  spaceLocations.push(position)
		  position = word.indexOf(' ', position + 1)
		}
		let lengthWord = word.length;
		return {lengthWord, spaceLocations};
	},
	checkWord: function(data, socket){
		console.log('gokje ', data)
		wordCheck(data, socket)
	},
	addUser: function(data) {
		let user = {
			...data, //username and id
			round:{
				guessedCorrect: false,
				pointsThisRound: 0
			},
			points: 0
		};
		if(game.players.length === 0) {
			user.baas = true;
		}
		game.players.push(user);
		//if a user joins after the game already started, add some gameData
		let gameData;
		if(game.gameStarted === true){
			console.log(game.drawSettings)
			gameData = {
				currentRound: game.currentRound,
				totalRounds: game.totalRounds,
				canvasImage: game.canvasURL,
				lengthWord: game.currentWord.length,
				drawSettings: game.drawSettings
			}
		}
		let answer = {user, gameData}
		return answer;
	},
	removeUser: function (id) {
		for(i = 0; i < game.players.length; i++){
			if(game.players[i].id === id){
				//dit is een rare check. players[0] is altijd baas. Het klopt dus maar een beetje?
				if (game.players[i].baas && game.players[1]){
					 game.players[1].baas = true;
					 io.to(game.players[1].id).emit("youAreTheNewBaas");
				 }
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
		console.log('starting timer')
		const startTime = game.lengthGame;
		timer = startTime;
		interval = setInterval(timertje, 1000);
	},
	//everytime a draw action takes place this is updated. This is saved on the server for late players.
	//it's a little ridiculous to send this much data just for late players.
	//Maybe let them join on the next round instead?
	setCanvas: function(image){
		game.canvasURL= image
	},
	setDrawSettings: function(data){
		game.drawSettings = {
			...game.drawSettings,
			...data
		}
	}
	// stopTimer: function(){
	// 	clearInterval(interval)
	// 	newRound();
	// }
}

function newRound(){
	console.log("newroundmachine", game.totalRounds, game.currentRound)
	console.log(game.players)
	//reset canvas for new players
	game.canvasURL = 0;
	game.currentWord = '';

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
		//reset guessedcorrect property for all users
		for(i=0; i < game.players.length; i++){
			game.players[i].round = {
				guessedCorrect: false,
				pointsThisRound: 0
			}
		}
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

function showScoreScreen(){
	io.emit('showScoreScreen', {
		users: game.players,
		word: game.currentWord
	})
	setTimeout(function () {
		newRound()
	}, 5000);
}

function wordCheck(data, socket){
	if(data.woord.toUpperCase() === game.currentWord.toUpperCase()){ //correct guess
		for(i=0; i < game.players.length; i++){
			//check who guessed it, make sure it isn't already guessed by them AND that hey aren't the drawer
			if(game.players[i].id === socket.id && !game.players[i].round.guessedCorrect && !game.players[i].drawer){
				game.players[i].round.guessedCorrect = true;
				game.correctGuesses++;
				data.correct = true;
				socket.emit('woordGok', data);
				calculatePoints(i)
				io.emit('updateUsers', game.players);
			}
		}
		if(game.correctGuesses === game.players.length-1){//everyone guessed correctly
			console.log('Correctguesses', game.correctGuesses, game.players.length)
			game.correctGuesses = 0;
			clearInterval(interval)
			//Show scorescreen to people
			showScoreScreen();
			// newRound() is being called from scorescreen
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
	//Reduce timer to make points and rounds more exciting.
	//Always make sure there are [arbirarty] seconds left before round end.
	if(timer > arbitraryCutoffPoint){
		let newTimer = timer - Math.floor(timer / game.players.length);
		if(newTimer < arbitraryCutoffPoint) {
			timer = arbitraryCutoffPoint
		} else {
			timer = newTimer
		}
	}
	game.players[userIndex].round.pointsThisRound = points;
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
		showScoreScreen();
	}
}
