#!/usr/bin/env node
var colors = require('colors');
var thronemaster = require('../index.js');
var args = process.argv.splice(process.execArgv.length + 2);
var gameId = (args[0] ? args[0] : false);
var moveId = (args[1] ? args[1] : false);

function printStatus(s) {
    if (s) {
        console.log(colors.inverse(' Turn ' + s.turn + ' (move ' + s.id + '): ' + s.player.bold + ' ' + s.gamePhase.toLowerCase() + ' '));
        console.log('' + s.logEntry);
        console.log('' + s.date.grey + '\n');
    }
}

if (gameId) {
    thronemaster.getLog(gameId, function (status) {
        var l = status.length;
        if (moveId === 'ALL') {
            status.forEach(function (t) {
                printStatus(t);
            });
        } else if (moveId) {
            printStatus(status[moveId - 1]);
        } else {
            var helpMessage = 'For other moves --> thronemaster ' + gameId + ' [move] (move: 1 - ' + l + ' | ALL)';
            printStatus(status.pop());
            console.log(helpMessage.grey);
        }
    });
}
else {
    console.log('Usage:'.bold + ' > thronemaster [game-id]'.grey);
}
