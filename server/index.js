const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/static'));

function onConnection(socket){
	console.log(socket.id)
}
io.on('connection', onConnection);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
