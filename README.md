# Simple Stash

Simple local caching for Javascript.

## Installation
```{r, engine='shell'}
$ npm install simple-stash --save
```

[View on NPM](https://www.npmjs.com/package/simple-stash)

## Usage
```javascript
var cache = require('simple-stash');

var data = [
    {
        id: 'test-uuid-1',
        name: 'John Smith'
    },
    {
        id: 'test-uuid-2',
        name: 'George Miller'
    }
];

cache.set(data, [ 'id' ]);

var customer = cache.get('id', 'test-uuid-1');

console.log(customer);
```
