# thronemaster-tools
Thronemaster is an excellent way of playing the Game of Thrones strategy game with friends and frenemies across the Internet.

In this npm-package you'll find tools and functions to retrieve information from a running Thronemaster-game.

## Installation
```bash
npm install -g thronemaster-tools
```

## Usage from command-line
This gives you access to the following commands:

* **thronemaster-log** _[gameId] [moveId]_: `gameId` is required, `moveId` is not. Use `ALL` for all moves.
* **thronemaster-title** _[gameId]_: `gameId` is required.

## Usage in code
The module uses ES modules and async/await:

```javascript
import { getLog, getHeading } from 'thronemaster-tools';

const gameId = 12345;

// Get the game title
const title = await getHeading(gameId);
console.log(title);

// Get the full game log
const log = await getLog(gameId);
log.forEach(entry => {
  console.log(`Turn ${entry.turn}: ${entry.player} - ${entry.logEntry}`);
});
```

### Functions

* **getLog(gameId)**: Returns a Promise that resolves to an array of status-objects: `{ id, turn, gamePhase, player, logEntry, date }`.
* **getHeading(gameId)**: Returns a Promise that resolves to a string containing the title of the game.
