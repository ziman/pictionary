const gameMaster = require('./gamemaster.js');

let timer;
let io;
let interval;
module.exports = {
	setio: function(io2) { //goor. even opzoeken hoe dit echt moet ok?
		io = io2;
	},
	startTimer: function () {
		const startTime = gameMaster.getLengthOfRound();
		timer = startTime;
		interval = setInterval(timertje, 1000);
	},
	stopTimer: function(){
		clearInterval(interval)
		newRound();
	},
	newRound: function(){
		newRound();
	}
}

function timertje() {
	timer--;
	io.emit('updateTimer', timer)
	if(timer === 0){
		clearInterval(interval);
		newRound();
	}
}

function newRound(){
	const newRound = gameMaster.newRound();
	console.log("newround-timerjs", newRound);
	if(newRound === 'GAME_OVER'){
		io.emit('GAME_OVER')
		return;
	}
	const drawerID = newRound.drawingPlayer.id;
	io.emit('announceDrawer',{
		drawer:newRound.drawingPlayer,
		round: newRound.currentRound,
		time: newRound.drawingTime
	})
	io.emit('updateUsers', gameMaster.getUsers());

	io.to(drawerID).emit('chooseWord', newRound.words);
}
