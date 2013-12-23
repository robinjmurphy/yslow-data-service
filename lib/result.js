var _ = require('lodash');

function Result(data, timestamp, id) {
  this.id = undefined || id;
  this.timestamp = timestamp || new Date;
  this.data = data;
  if (this.data && this.data.u) {
    this.data.u = decodeURIComponent(this.data.u);
  }
}

module.exports = Result;