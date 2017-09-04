var request = require('request');
var cheerio = require('cheerio');

function parseStatusArray (html){
  var $ = cheerio.load(html);
  var returnValue = [];
  $('tr', 'table table').filter(function(){
    var o = {};
    if (!isNaN($(this).children().first().text())) {
      $(this).children().each(function(i){
        if (i === 0) {
          o.id = parseInt($(this).text());
        } else if (i === 1) {
          o.turn = parseInt($(this).text());
        } else if (i === 2) {
          o.gamePhase = $(this).text();
        } else if (i === 3) {
          o.player = $(this).text();
        } else if (i === 4) {
          o.logEntry = $(this).text();
        } else if (i === 5) {
          o.date = $(this).text();
        }
      });
    }
    if (o.id) {
      returnValue.push(o);
    }
  });
  return returnValue;
};

/**
 * @param gameId:number
 * @param callBack:function accepting an array of Status-objects
 * @return Status [{id:number, turn:number, gamePhase: string, player: string, logEntry:string, date:date}]
 */
function getLog(gameId, callBack){
  const log_url = 'http://game.thronemaster.net/?game=' + gameId + '&show=log';
  request(log_url, function(error, response, html){

    if (error) {
      callBack([], error);
    }
    var returnValue = parseStatusArray(html);
    callBack(returnValue);
  });
}

function parseTitle(html){
  var $ = cheerio.load(html);
  var returnValue = '';
  $('title', 'head').filter(function(){
    returnValue = this.children.pop().data.replace('AGoT Game Log - ', '');
  });
  return returnValue;
};

function getHeading(gameId, callBack){
  const log_url = 'http://game.thronemaster.net/?game=' + gameId + '&show=log';
  request(log_url, function(error, response, html){
    if (error) {
      callBack([], error);
      return;
    }
    var returnValue = parseTitle(html);
    callBack(returnValue);
  });
}

exports.getHeading = getHeading;
exports.parseStatusArray = parseStatusArray;
exports.getLog = getLog;
