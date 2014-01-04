var db = require('./db');
var _ = require('lodash');
var Result = require('./lib/result');

module.exports = {
  results: {

    /**
     * Create a new result
     */

    create: function (data, cb) {
      var result = new Result(data);

      db.results.insert(result, function (err, doc) {
        if (err) return cb(err);

        cb(err, new Result(doc.data, doc.timestamp, doc._id));
      });
    },

    /**
     * Return all of the results
     */

    all: function (options, cb) {
      var query = {};

      if (_.isFunction(options)) {
        cb = options;
        options = {};
      }

      if (options.url) {
        query = { 'data.u': decodeURIComponent(options.url) };
      }

      db.results.find(query, {
          limit: options.limit,
          sort: {
            timestamp: options.sort
          }
        }, function (err, docs) {
        var results;

        if (err) return cb(err);

        results = _.map(docs, function(doc) {
          return new Result(doc.data, doc.timestamp, doc._id);
        });

        cb(err, results);
      });
    },

    /**
     * Return the latest result
     */

    latest: function (options, cb) {
      if (_.isFunction(options)) {
        cb = options;
        options = {};
      }

      _.merge(options, {limit: 1, sort: -1});

      this.all(options, function (err, results) {
        var result = null;

        if (results && results.length === 1) {
          result = results[0];
        }

        cb(err, result);
      });
    },

    /**
     * Find a result by its ID
     */

    findById: function (id, cb) {
      db.results.findOne({ _id: id }, function(err, doc) {
        var result = null;

        if (err) return cb(err);

        if (doc) {
          result = new Result(doc.data, doc.timestamp, doc._id);
        }

        cb(err, result);
      });
    },

    /**
     * Remove a result by its ID
     */

    removeById: function (id, cb) {
      db.results.remove({ _id: id }, cb);
    },

    /**
     * Remove all results stored
     */

    removeAll: function (cb) {
      db.results.remove(cb);
    }

  },

  urls: {

    /**
     * Return the unique set of URLs
     */

    all: function (cb) {
      db.results.find({}, function (err, docs) {
        var urls;

        if (err) return cb(err);

        urls = _(docs).pluck('data').pluck('u')
                      .unique()
                      .value();

        cb(err, urls);
      });
    }

  }

};