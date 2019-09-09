const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(cors())

const gameMaster = require('./gamemaster.js');
const gameTimer = require('./timer.js');

gameTimer.setio(io);

// app.use(express.static(__dirname + '/static'));
function onConnection(socket){
	console.log(socket.id);
	socket.emit('updateUsers', gameMaster.getUsers());

	socket.on('setUsername', data => {
		socket.username = data;
		let user = {
			username: data,
			id: socket.id
		}
		let newUser = gameMaster.addUser(user);
		socket.emit('setUser', newUser);
		io.emit('updateUsers', gameMaster.getUsers());
	})
	socket.on('tekenen', (data) => {
		socket.broadcast.emit('drawing', data)
	});

	socket.on('woordGok', data => {
		let correct = gameMaster.checkWord(data.woord);
		console.log(correct, data)
		if(correct === 'CORRECT') {
			data.correct = true;
			socket.emit('woordGok', data);
		} else if (correct === 'CORRECT_AND_ROUND_END') {
			data.correct = true;
			socket.emit('woordGok', data);
			gameTimer.stopTimer();
		} else{
			io.emit('woordGok', data);
		}
	})

	socket.on('pickWord', word => {
		gameMaster.setWord(word);
		gameTimer.startTimer();
		socket.emit('startRound', word)
		socket.broadcast.emit('startRound')
	})

	socket.on('startGame', (gameOptions) => {
		gameMaster.createGame(gameOptions.lengthGame, gameOptions.noOfRounds);
		io.emit('gameStarted', gameOptions.noOfRounds);
		gameTimer.newRound();
	})
	socket.on('undoAction', data => {
		socket.broadcast.emit('undoAction', data)
	})
	socket.on('disconnect', () => {
	  gameMaster.removeUser(socket.username);
	  socket.broadcast.emit('updateUsers', gameMaster.getUsers());
  })
}
io.on('connection', onConnection);

server.listen(3000, function(){
	console.log('listening on *:3000');
});
