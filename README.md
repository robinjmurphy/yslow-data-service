# yslow-data-service

A Node package for persisting web performance data from [YSlow](http://yslow.org) to a [MongoDB](http://www.mongodb.org/) database.

For a YSlow data REST interface see [yslow-data-rest-api](https://github.com/robinjmurphy/yslow-data-rest-api).

## Requirements

* [MongoDB](http://www.mongodb.org/)

## Installation

```
npm install --save yslow-data-service
```

## Usage

```js
var yslow = require('yslow-data-service');
```

Store a new result:

```js
var data = {
  v: "3.1.8",
  w: 510283,
  o: 76,
  u: "http://www.bbc.co.uk/",
  r: 87,
  i: "ydefault",
  lt: 1706
}

yslow.results.create(data, function (err, result) {
  // ...
});
```

Retrieve all stored results:

```js
yslow.results.all(function (err, results) {
  // ...
});
```

Retrieve all results for a given URL:

```js
yslow.results.all({url: 'http://www.example.com'}, function (err, results) {
  // ...
});
```

Retrieve the latest result:

```js
yslow.results.latest(function (err, result) {
  // ...
});
```

Retrieve the latest result for a URL:

```js
yslow.results.latest({url: 'http://www.example.com'}, function (err, result) {
  // ...
});
```

Retrieve a result by its ID:

```js
yslow.results.findById('some_id', function (err, result) {
  // ...
});
```

Remove all results:

```js
yslow.results.removeAll(function (err) {
  // ...
});
```

Remove a result by its ID:

```js
yslow.results.removeById('some_id', function (err) {
  // ...
});
```

Retieve an array of unique URLs that are stored:

```js
yslow.urls.all(function (err, urls) {
  // ...
});
```

### Configuration

By default package is configured to use a MongoDB database at `mongodb://127.0.0.1:27017/yslow`. To change this, set the environment variable `YSLOW_DATA_DB` e.g.

```bash
EXPORT YSLOW_DATA_DB="mongodb://127.0.0.1:27017/some_db"
```