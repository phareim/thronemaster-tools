#!/usr/bin/env node

var colors = require('colors');
var thronemaster = require('../index.js');
var args = process.argv.splice(process.execArgv.length + 2);
var gameId = (args[0] ? args[0] : false);

thronemaster.getHeading(gameId, function(heading, error){
  if (error) {
    console.log(error);
  } else {
    console.log(colors.bold(heading));
  }
});
