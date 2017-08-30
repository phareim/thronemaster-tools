var request = require('request');
var cheerio = require('cheerio');

function getLog(gameId, callBack) {
    const log_url = 'http://game.thronemaster.net/?game=' + gameId + '&show=log';
    request(log_url, function (error, response, html) {
            var returnValue = [];
            if (error) {
                return error;
            }
            var $ = cheerio.load(html);
            $('tr', 'table table').filter(function () {
                var o = {};
                if (!isNaN($(this).children().first().text())) {
                    $(this).children().each(function (i) {
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
            callBack(returnValue);
        }
    );
}

exports.getLog = getLog;
