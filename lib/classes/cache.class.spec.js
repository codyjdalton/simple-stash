/**
 * cache.class.spec
 */
const { expect } = require("chai");

const Cache = require('./cache.class');

describe('Simple Stash', () => {

    let aCache;

    beforeEach(() => {
        aCache = new Cache();
    });

    it('should allow storing data in the cache', () => {

        const testData = [
            {
                id: 'some-id',
                value: 'some-val'
            },
            {
                id: 'another-id',
                value: 'another-val'
            }
        ];

        aCache.set(testData, ['id']);

        expect(aCache.get('id', 'some-id').value).to.equal('some-val');
    });

    it('should return null if there is no value found', () => {

        const testData = [
            {
                id: 'some-id',
                value: 'some-val'
            }
        ];

        aCache.set(testData, ['id']);

        expect(aCache.get('id', 'another-id')).to.equal(null);
    });
});