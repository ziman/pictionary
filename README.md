# pictionary in vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#todos
Point system
	(Let admin) choose between:
	1. *Based on time.
		For example amount of seconds left * 10 points.
		After each guess the time goes down by time left / amount of people ?
			timer = timer - (timer/users.length)*
	2. Based on guess order
	If 8 people connect (or guess correctly) the first gets 8 points, the second 7 etc.

#for the canvas
*Colors/*
*sizes of brush*
eraser
fill tool
clear tool

#bugs
* Upon selecting a username the client should receive a gameStarted property to jump into games that are running.
	* when a user connects half way he should receive a snapshot of the latest Drawing OR only be able to interact next drawing round (when everything is up to date again)
	* when connect halfway: remove overlay
* The login screen only looks at gamestarted that is announced by socket. It should wait for both a username and the game start.
* Resizing canvas that other elements overlap it, will delete some of the drawing, never to return! :(
* more resizing: shit becomes blur yo.
