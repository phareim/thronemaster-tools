#!/usr/bin/env node

import colors from 'colors';
import { getHeading } from '../index.js';

const [, , gameId] = process.argv;

if (gameId) {
  try {
    const heading = await getHeading(gameId);
    if (heading) {
      console.log(colors.bold(heading));
    } else {
      console.log(colors.red('No title found for this game ID.'));
    }
  } catch (error) {
    console.error(colors.red(`Error retrieving game heading: ${error.message}`));
  }
} else {
  console.log(`${colors.bold('Usage:')} ${colors.grey('> thronemaster-title [game-id]')}`);
}
