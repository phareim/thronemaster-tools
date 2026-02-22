#!/usr/bin/env node

import colors from 'colors';
import { getLog } from '../index.js';

const [, , gameId, moveId] = process.argv;

/**
 * Prints the status to the console.
 * @param {object} s 
 */
function printStatus(s) {
  if (s) {
    console.log(colors.inverse(` Turn ${s.turn} (move ${s.id}): ${colors.bold(s.player)} ${s.gamePhase.toLowerCase()} `));
    console.log(`${s.logEntry}`);
    console.log(`${colors.grey(s.date)}\n`);
  } else {
    console.log(colors.red('Move not found.'));
  }
}

if (gameId) {
  try {
    const status = await getLog(gameId);
    
    if (!status || status.length === 0) {
      console.log(colors.red('No log entries found for this game ID.'));
      process.exit(0);
    }

    const count = status.length;
    
    if (moveId === 'ALL') {
      status.forEach(printStatus);
    } else if (moveId) {
      const idx = parseInt(moveId, 10) - 1;
      printStatus(status[idx]);
    } else {
      const lastStatus = status[status.length - 1];
      printStatus(lastStatus);
      const helpMessage = `For other moves --> thronemaster-log ${gameId} [move] (move: 1 - ${count} | ALL)`;
      console.log(colors.grey(helpMessage));
    }
  } catch (error) {
    console.error(colors.red(`Error retrieving game log: ${error.message}`));
  }
} else {
  console.log(`${colors.bold('Usage:')} ${colors.grey('> thronemaster-log [game-id]')}`);
}
