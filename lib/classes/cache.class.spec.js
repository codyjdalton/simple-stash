/********************************
 * cache.class.spec
 *******************************/
const { expect } = require("chai");

const { Cache } = require('./cache.class');

/********************************
 * Suite
 *******************************/
describe('Simple Stash', () => {

    let aCache;

    beforeEach(() => {
        aCache = new Cache();
    });

    it('should allow storing objects to the cache', () => {

        const testId = 'some-id';

        const testData = [
            {
                id: testId,
                value: 'some-val'
            },
            {
                id: 'another-id',
                value: 'another-val'
            },
            {
                id: 'another-id-1',
                value: 'another-val'
            },
        ];

        aCache.set('users', testData);

        expect(aCache.get('users:id:' + testId ).value).to.equal('some-val');
    });

    it('should store resources in the given domain', () => {

        const testId = 'some-id';

        const testUsers = [
            {
                id: testId,
                value: 'some-val'
            }
        ];

        const testProducts = [
            {
                id: 'not-an-id',
                value: 'some-val'
            }
        ];

        aCache.set('users', testUsers);
        aCache.set('products', testProducts);

        expect(aCache.get('users:id:' + testId ).value).to.equal('some-val');
        expect(aCache.get('products:id:' + testId )).to.equal(null);
    });

    it('should allow fetching of all matching results', () => {

        const testId = 'Jane Smith';

        const testData = [
            {
                id: 'some-id',
                value: 'John Smith'
            },
            {
                id: 'another-id',
                value: testId
            },
            {
                id: 'another-id-1',
                value: testId
            },
        ];

        aCache.set('users', testData);

        expect(aCache.getAll('users:value:' + testId).length).to.equal(2);
        expect(aCache.getAll('users:value:' + testId)[0].id).to.equal('another-id');
    });

    it('should return an empty array if no results are found', () => {

        const testId = 'another-val';

        const testData = [
            {
                id: 'some-id',
                value: 'some-val'
            },
            {
                id: 'another-id',
                value: testId
            },
            {
                id: 'another-id-1',
                value: testId
            },
        ];

        aCache.set('users', testData);

        expect(aCache.getAll('users:value:does not exist')).deep.equal([]);
    });

    it('should return null if there is no value found', () => {

        const testData = [
            {
                id: 'some-id',
                value: 'some-val'
            }
        ];

        aCache.set('users', testData);

        expect(aCache.get('users:id:another-id')).to.equal(null);
    });

    it('should return null or empty if there is no search input', () => {

        expect(aCache.get(null)).to.equal(null);
        expect(aCache.getAll(null)).deep.equal([]);
    });

    it('should allow clearing the cache', () => {

        const testData = [
            {
                id: 'some-id',
                value: 'some-val'
            }
        ];

        aCache.set('users', testData);

        expect(aCache.get('users:id:some-id')).deep.equal(testData[0]);

        aCache.clear();

        expect(aCache.get('users:id:some-id')).to.equal(null);
    });
});