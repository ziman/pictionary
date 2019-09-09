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
header
 - *show timer
 - *show round / rounds
 - *show word that you are drawing (if drawer)*
 - show empty spaces for the # letters the word has

 general
 - show end game screen with possibility to restart
 - undo drawing functionality

##todos shoulds
Have one size for the canvas so drawings are 1:1 the same for everyone (and resizing shouldn't delete drawings)
Have the round timer decrease to some extend when the first user guesses right.
Show the number of letters in the topbar
point system based on time.
	For example amount of seconds left * 100 points.
	After each guess the time goes down by time left / amount of people ?
Have some sort of timeout between loading states for better overview of what's going on.

--- for the canvas
Colors/sizes of brush
eraser
fill tool
clear tool

#bugs
* The login screen only looks at gamestarted that is announced by socket. It should wait for both a username and the game start.
* Upon selecting a username the client should receive a gameStarted property to jump into games that are running.
* Should not be able to start the game with one person
* Drawing should only be possible for the drawer
* Users should not be able to guess anymore after a correct (but chatting should be possible)
* The drawer shouldn't be able to guess words.
* when no users with usernames are connected - cancel the game (stop timer too)
