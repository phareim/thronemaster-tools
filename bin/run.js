#!/usr/bin/env node
var thronemaster = require('../lib/index.js');
var args = process.argv.splice(process.execArgv.length + 2);
var gameId = (args[0] ? args[0] : false);
var moveId = (args[1] ? args[1] : false);
if (gameId) {
    thronemaster.getLog(gameId, function (status) {
        var l = status.length;
        if (!moveId) {
            console.log('Status last move of game: ' + gameId);
            console.log(status.pop());
            console.log('--> thronemaster ' + gameId + ' [moveNumber] for other rounds. (' + l + ')');
        } else {
            console.log('Status move number ' + moveId + ' of game: ' + gameId);
            console.log(status[moveId - 1]);
        }
    });
}
else {
    console.log('Usage: > thronemaster [game-id]');
}
