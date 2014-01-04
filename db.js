var config = require('./config');
var connectionString = process.env.YSLOW_DATA_DB || config.defaults.db;
var db = require('monk')(connectionString);
var chalk = require('chalk');

console.info('Using database:', chalk.yellow(connectionString));

module.exports = {
  results: db.get('results')
}