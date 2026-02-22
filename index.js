import * as cheerio from 'cheerio';

/**
 * Parses the HTML of the game log and returns an array of status objects.
 * @param {string} html
 * @returns {Array<{id: number, turn: number, gamePhase: string, player: string, logEntry: string, date: string}>}
 */
export function parseStatusArray(html) {
  const $ = cheerio.load(html);
  const rows = $('table table tr').toArray();
  
  return rows.map(row => {
    const cells = $(row).children();
    const idText = cells.first().text().trim();
    
    if (isNaN(idText) || idText === '') return null;
    
    return {
      id: parseInt(idText, 10),
      turn: parseInt(cells.eq(1).text().trim(), 10),
      gamePhase: cells.eq(2).text().trim(),
      player: cells.eq(3).text().trim(),
      logEntry: cells.eq(4).text().trim(),
      date: cells.eq(5).text().trim(),
    };
  }).filter(o => o && o.id);
}

/**
 * Fetches the game log for a specific game ID.
 * @param {number|string} gameId
 * @returns {Promise<Array>}
 */
export async function getLog(gameId) {
  const log_url = `http://game.thronemaster.net/?game=${gameId}&show=log`;
  try {
    const response = await fetch(log_url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    return parseStatusArray(html);
  } catch (error) {
    console.error('Error fetching log:', error);
    return [];
  }
}

/**
 * Parses the title from the game log HTML.
 * @param {string} html
 * @returns {string}
 */
export function parseTitle(html) {
  const $ = cheerio.load(html);
  const title = $('head title').text();
  return title.replace('AGoT Game Log - ', '').trim();
}

/**
 * Fetches the game heading for a specific game ID.
 * @param {number|string} gameId
 * @returns {Promise<string>}
 */
export async function getHeading(gameId) {
  const log_url = `http://game.thronemaster.net/?game=${gameId}&show=log`;
  try {
    const response = await fetch(log_url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    return parseTitle(html);
  } catch (error) {
    console.error('Error fetching heading:', error);
    return '';
  }
}
