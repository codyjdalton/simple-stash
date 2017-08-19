# Data Cache

Simple local caching for Javascript

## Installation
```{r, engine='shell'}
$ npm install simple-stash --save
```

## Usage
```javascript
var cache = require('simple-stash');

var customer;

cache.set(
    [
        {
            id: 'your-id-1',
            name: 'John Smith'
        },
        {
            id: 'your-id-2',
            name: 'George Miller'
        }
    ],
    [ 
        'id'
    ]
);

customer = cache.get('id', 'your-id-1');

/**

Logs:

{ id: 'your-id-1', name: 'John Smith' }

**/
console.log(customer);
```