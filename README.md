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

# todos
Point system
	(Let admin) choose between:
	1. ~~~Based on time.
		For example amount of seconds left * 10 points.
		After each guess the time goes down by time left / amount of people ?
			timer = timer - (timer/users.length)~~~
	2. Based on guess order
	If 8 people connect (or guess correctly) the first gets 8 points, the second 7 etc.
	3. First person guess gets points on seconds left. Clock goes down to 20 secs. Everyone after gets X points per second less.

# for the canvas
*Colors/*
*sizes of brush*
eraser
fill tool
clear tool

# bugs
* When the drawing player leaves, the game goes limbo.
* when players leave, the amount of correct guesses for the round to end isn't correct.
* in some rare occasions the startTimer() function gets called twice.
* when a drawer reaches the edge of the canvas, the drawing doesn't stop. Resulting in straight lines to where the mouse enters the canvas again.
