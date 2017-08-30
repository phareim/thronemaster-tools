var thronemaster = require('./lib/index.js');

// getLog(131993, function (value) {
//    console.log(value);
// });
var gameId = 131993;
if(process.argv[2]){
    gameId = process.argv[2];
    thronemaster.getLog(gameId, function (status) {
        console.log('Last status');
        console.log(status.pop());
    });
} else {
    console.log('Usage: > thronemaster [game-id]');
}
