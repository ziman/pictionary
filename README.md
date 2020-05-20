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
* remove a word that has already been drawn
* add waaayyyyy more words
* make interface nice and designery - pretend to know what you're doing.
* All players should see who guessed correctly
	* Currently a message goes out to all the players - but a distinction needs to be made for 'is correct' and 'guessed correct'
* Drawer should get some points for making good drawings.
	* Half points of first guess + 2*(guessers/players)/guessers

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
* eraser
* fill tool
* clear tool

# bugs
* When the drawing player leaves, the game goes limbo.
* when players leave, the amount of correct guesses for the round to end isn't correct.
* in some rare occasions the startTimer() function gets called twice.

# way in the future stuff
* save each drawing for post game screen, show a collage with option to download images.
