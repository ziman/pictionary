const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(cors())

const gameMaster = require('./gamemaster.js');
gameMaster.setio(io);

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
		//TODO just do all logic in gameMaster, yes?
		let newUser = gameMaster.addUser(user);
		console.log(newUser)
		socket.emit('setUser', newUser);
		if(newUser.gameData && newUser.gameData.canvasImage){
			//undoAction sets a canvas based on base64 URL. Probably should rename this function now.
			socket.emit('undoAction', {imagesrc: newUser.gameData.canvasImage})
			socket.emit('changeDrawSetting', newUser.gameData.drawSettings)

		}
		io.emit('updateUsers', gameMaster.getUsers());
	})
	socket.on('tekenen', (data) => {
		socket.broadcast.emit('drawing', data)
	});

	socket.on('completeCanvas', (image) => {
		gameMaster.setCanvas(image)
	})

	socket.on('woordGok', data => {
		gameMaster.checkWord(data, socket);
	})

	socket.on('pickWord', word => {
		let lengthAndSpaceLocation = gameMaster.setWord(word);
		console.log(lengthAndSpaceLocation)
		gameMaster.startTimer();
		socket.emit('startRound', {word: word})
		socket.broadcast.emit('startRound', lengthAndSpaceLocation)
	})

	socket.on('startGame', (gameOptions) => {
		gameMaster.createGame(gameOptions.lengthGame, gameOptions.noOfRounds);
		io.emit('gameStarted', gameOptions.noOfRounds);
		gameMaster.newRound();
	})
	socket.on('undoAction', data => {
		socket.broadcast.emit('undoAction', data)
	})
	socket.on('changeDrawSetting', data => {
		gameMaster.setDrawSettings(data)
		io.emit('changeDrawSetting', data)
	})
	socket.on('disconnect', () => {
	  gameMaster.removeUser(socket.id);
	  socket.broadcast.emit('updateUsers', gameMaster.getUsers());
  })
}
io.on('connection', onConnection);

server.listen(3000, function(){
	console.log('listening on *:3000');
});
