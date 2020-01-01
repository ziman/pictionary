# pictionaryfullstack

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

#todos needs
Overlay:
1. pickWord (either words or show drawer)
2. gameEnd (scoreboard for game with boss new game)
3. Points at roundEnd (scoreboard for round)
4.

 general
 - *show end game screen with possibility to restart*
	 - *think about overlay with points on it - probably a system with state/mutations should be implemented*
 - *undo drawing functionality*
 - the word should be shown to everyone when the round ended.
 - transition animations. =)
 - *clear canvas at new round.*

##todos shoulds
*Have one size for the canvas so drawings are 1:1 the same for everyone (and resizing shouldn't delete drawings)*
*Have the round timer decrease to some extend when the first user guesses right.*
*Show the number of letters in the topbar*
point system
	(Let admin) choose between:
	1. *Based on time.
		For example amount of seconds left * 10 points.
		After each guess the time goes down by time left / amount of people ?
			timer = timer - (timer/users.length)*
	2. Based on guess order
		If 8 people connect (or guess correctly) the first gets 8 points, the second 7 etc.
	12. *for this: we need to figure out WHO guessed correcly first and set a correct guess to their {}.*
		*also then we can count points for this user.*
Have some sort of timeout between loading states for better overview of what's going on.

--- for the canvas
*Colors/*
*sizes of brush*
eraser
fill tool
clear tool

#bugs
* The login screen only looks at gamestarted that is announced by socket. It should wait for both a username and the game start.
* Upon selecting a username the client should receive a gameStarted property to jump into games that are running.
* Should not be able to start the game with one person
* Resizing canvas that other elements overlap it, will delete some of the drawing, never to return! :(
* more resizing: shit becomes blur yo.
*Drawing should only be possible for the drawer*
*Users should not be able to guess anymore after a correct (but chatting should be possible)*
*The drawer shouldn't be able to guess words*.
*when no users with usernames are connected - cancel the game (stop timer too)*
