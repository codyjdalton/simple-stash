[![Build Status](https://travis-ci.org/codyjdalton/simple-stash.svg?branch=master)](https://travis-ci.org/codyjdalton/simple-stash) [![Coverage Status](https://coveralls.io/repos/github/codyjdalton/simple-stash/badge.svg?branch=master)](https://coveralls.io/github/codyjdalton/simple-stash?branch=master) [![npm version](https://badge.fury.io/js/simple-stash.svg)](https://badge.fury.io/js/simple-stash)

# Simple Stash

Simple in-memory caching for Javascript.

## Installation
```{r, engine='shell'}
$ npm install simple-stash --save
```

[View on NPM](https://www.npmjs.com/package/simple-stash)

## Usage

### Get an item from memory

```javascript
const cache = require('simple-stash');

const data = [
    {
        id: 'test-uuid-1',
        name: 'John Smith'
    },
    {
        id: 'test-uuid-2',
        name: 'Jane Miller'
    }
];

cache.set('users', data);

const customer = cache.get('users:id:test-uuid-1');

console.log(customer);
```

Logs:

```json
{
    "id": "test-uuid-1",
    "name": "John Smith"
}
```
### Get multiple items from memory

```javascript
const cache = require('simple-stash');

const data = [
    {
        id: 'test-uuid-1',
        name: 'John Smith'
    },
    {
        id: 'test-uuid-2',
        name: 'John Smith'
    },
    {
        id: 'test-uuid-3',
        name: 'Jane Miller'
    }
];

cache.set('users', data);

const customers = cache.getAll('users:name:John Smith');

console.log(customers);
```
Logs:

```json
[
    {
        "id": "test-uuid-1",
        "name": "John Smith"
    },
    {
        "id": "test-uuid-2",
        "name": "John Smith"
    }
]
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/codyjdalton/simple-stash/tags).

