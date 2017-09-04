# thronemaster-tools
Thronemaster is an excellent way of playing the Game of Thrones strategy game with friends and frenemies across the Internet.

In this npm-package you'll find tools and functions to retrieve information from a running Thronemaster-game.

## Usage from command-line
Thronmaster-tools can be installed globally with `npm install -g thronemaster-tools`. This gives you access to the following commands:

**thronmaster-log** _[gameId] [moveId]_: gameId is required, moveId is not.
**thronemaster-title** _[gameId]_: gameId is required.
## Usage in code

The module can also be included with `require('thronemaster-tools')`, giving you access to the following functions:

**getLog(gameId, callBack)**: `gameId` is the ID of your running game, `callBack` is a reference to a method accepting an array of status-objects returned from the Thronemaster-server.
**getHeading(gameId, callBack)**: `gameId` is the ID of your running game, `callBack` is a reference to a method accepting a string, containing the title of the game. 
