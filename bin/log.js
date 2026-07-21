#!/usr/bin/env node

import { styleText } from 'node:util';
import { getLog } from '../index.js';

const [, , gameId, moveId] = process.argv;

/**
 * Prints the status to the console.
 * @param {object} s
 */
function printStatus(s) {
  if (s) {
    console.log(styleText('inverse', ` Turn ${s.turn} (move ${s.id}): ${styleText('bold', s.player)} ${s.gamePhase.toLowerCase()} `));
    console.log(`${s.logEntry}`);
    console.log(`${styleText('gray', s.date)}\n`);
  } else {
    console.log(styleText('red', 'Move not found.'));
  }
}

if (gameId) {
  try {
    const status = await getLog(gameId);

    if (status.length === 0) {
      console.log(styleText('red', 'No log entries found for this game ID.'));
      process.exit(0);
    }

    const count = status.length;

    if (moveId === 'ALL') {
      status.forEach(printStatus);
    } else if (moveId) {
      const idx = Number.parseInt(moveId, 10) - 1;
      printStatus(status[idx]);
    } else {
      printStatus(status.at(-1));
      const helpMessage = `For other moves --> thronemaster-log ${gameId} [move] (move: 1 - ${count} | ALL)`;
      console.log(styleText('gray', helpMessage));
    }
  } catch (error) {
    console.error(styleText('red', `Error retrieving game log: ${error.message}`));
    process.exitCode = 1;
  }
} else {
  console.log(`${styleText('bold', 'Usage:')} ${styleText('gray', '> thronemaster-log [game-id]')}`);
}
