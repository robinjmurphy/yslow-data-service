var monk = require('monk');
var config = require('./config.json');
var dbPath = process.env.YSLOW_DATA_DB || config.defaults.db;
var db = monk(dbPath);
var chalk = require('chalk');

console.info('Using database:', chalk.yellow(dbPath));

module.exports = {
  results: db.get('results')
}