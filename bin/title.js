#!/usr/bin/env node

import { styleText } from 'node:util';
import { getHeading } from '../index.js';

const [, , gameId] = process.argv;

if (gameId) {
  try {
    const heading = await getHeading(gameId);
    if (heading) {
      console.log(styleText('bold', heading));
    } else {
      console.log(styleText('red', 'No title found for this game ID.'));
    }
  } catch (error) {
    console.error(styleText('red', `Error retrieving game heading: ${error.message}`));
    process.exitCode = 1;
  }
} else {
  console.log(`${styleText('bold', 'Usage:')} ${styleText('gray', '> thronemaster-title [game-id]')}`);
}
