import * as cheerio from 'cheerio';

const BASE_URL = 'https://game.thronemaster.net/';
const FETCH_TIMEOUT_MS = 15_000;

/**
 * Builds the game-log URL, validating the game ID.
 * @param {number|string} gameId
 * @returns {URL}
 */
function buildLogUrl(gameId) {
  const id = String(gameId).trim();
  if (!/^\d+$/.test(id)) {
    throw new Error(`Invalid game ID: ${JSON.stringify(gameId)} (must be a positive integer)`);
  }
  const url = new URL(BASE_URL);
  url.searchParams.set('game', id);
  url.searchParams.set('show', 'log');
  return url;
}

/**
 * Fetches the raw game-log HTML for a game ID.
 * @param {number|string} gameId
 * @returns {Promise<string>}
 */
async function fetchLogHtml(gameId) {
  const response = await fetch(buildLogUrl(gameId), {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching game log`);
  }
  return response.text();
}

/**
 * Parses the HTML of the game log and returns an array of status objects.
 * @param {string} html
 * @returns {Array<{id: number, turn: number, gamePhase: string, player: string, logEntry: string, date: string}>}
 */
export function parseStatusArray(html) {
  const $ = cheerio.load(html);

  return $('table table tr')
    .toArray()
    .map((row) => {
      const cells = $(row).children();
      const id = Number.parseInt(cells.first().text().trim(), 10);
      if (!Number.isInteger(id)) return null;

      return {
        id,
        turn: Number.parseInt(cells.eq(1).text().trim(), 10),
        gamePhase: cells.eq(2).text().trim(),
        player: cells.eq(3).text().trim(),
        logEntry: cells.eq(4).text().trim(),
        date: cells.eq(5).text().trim(),
      };
    })
    .filter((entry) => entry !== null && entry.id > 0);
}

/**
 * Fetches the game log for a specific game ID.
 * @param {number|string} gameId
 * @returns {Promise<Array<{id: number, turn: number, gamePhase: string, player: string, logEntry: string, date: string}>>}
 */
export async function getLog(gameId) {
  return parseStatusArray(await fetchLogHtml(gameId));
}

/**
 * Parses the title from the game log HTML.
 * @param {string} html
 * @returns {string}
 */
export function parseTitle(html) {
  const $ = cheerio.load(html);
  return $('head title').text().replace('AGoT Game Log - ', '').trim();
}

/**
 * Fetches the game heading for a specific game ID.
 * @param {number|string} gameId
 * @returns {Promise<string>}
 */
export async function getHeading(gameId) {
  return parseTitle(await fetchLogHtml(gameId));
}
