var Result = require('../lib/result');
var assert = require('assert');

var data = {
  v: "3.1.8",
  w: 510283,
  o: 76,
  u: "http%3A%2F%2Fwww.bbc.co.uk%2F",
  r: 87,
  i: "ydefault",
  lt: 1706
};

describe('Result', function () {
  describe('when instantiated with some YSlow data', function () {
    var result = new Result(data);

    it('is assigned a timestamp', function () {
      assert.ok(result.timestamp !== undefined);
    });

    it('has its URL decoded', function () {
      assert.equal(result.data.u, 'http://www.bbc.co.uk/');
    });
  });

  describe('when instantiated with a timestamp and an ID', function () {
    var result = new Result(data, '2013-12-23T18:57:43.216Z', 123);

    it('sets the timestamp', function () {
      assert.equal(result.timestamp, '2013-12-23T18:57:43.216Z');
    });

    it('sets the id', function () {
      assert.equal(result.id, 123);
    });
  });
});