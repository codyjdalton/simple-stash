var cache = require('./lib/simple-stash');

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