'use strict';
/********************************
 * cache.class
 *******************************/
const jsonpack = require('jsonpack/main');
const uuidV4 = require('uuid/v4');

/********************************
 * Class Declaration
 *******************************/
class Cache {

    constructor() {
        
        this.clear();
    }

    /**
     * @function set
     * @param {string} resourceName
     * @param { Array< { [propName: string]: any } > } resourceArr - the array to be cached
     * @returns {void}
     */
    set(resourceName, resourceArr) {
        this.resources[resourceName] = Object.assign(
            this.getResources(resourceArr),
            this.resources[resourceName]
        );
        this.resourceMap[resourceName] = Object.assign(
            this.getResourcesMap(resourceName),
            this.resourceMap[resourceName]
        );
    }

    /**
     * @method getAll
     * @param {string} inputStr 
     * @returns { Array<{ [propName: string]: any }> }
     */
    getAll(inputStr) {

        const inputParts = inputStr ? inputStr.split(':') : [];
        const scope = inputParts.shift();
        const searchStr = inputParts.join(':');

        return this.resourceMap.hasOwnProperty(scope) &&
               this.resourceMap[scope].hasOwnProperty(searchStr) ?
               this.resourceMap[scope][searchStr].map(
                   recordId => jsonpack.unpack(this.resources[scope][recordId])
               ) : [];
    }

    /**
     * @method get
     * @param {string} key
     * @param {number} offset - defaults to 0
     * @returns {any | null}
     */
    get(inputStr) {
        return this.getAll(inputStr)[0] || null;
    }

    /**
     * @method clear
     * @description Call aCache.clear() to reset the cache
     * @returns {void}
     */
    clear() {
        this.resourceMap = {};
        this.resources = {};
    }

    /**
     * @method getResources
     * @param { Array<{ [propName: string]: any }> } resourceArr
     * @returns { { [propName: string]: any } }
     */
    getResources(resourceArr) {
        return resourceArr.reduce(
            (result, idx) => {
                result[ uuidV4() ] = jsonpack.pack(idx);
                return result;
            },
            {}
        );
    }

    /**
     * @function getResourcesMap
     * @param {string} resourceName
     * @returns { [propName: string]: string }
     */
    getResourcesMap(resourceName) {
        return Object.keys(this.resources[resourceName]).reduce(
            (result, id) => {

                const item = jsonpack.unpack(this.resources[resourceName][id]);

                // @TODO simplify this logic
                Object.keys(item).forEach(
                    propKey => {

                        const searchStr = [propKey, item[propKey]].join(':');
 
                        if(!result.hasOwnProperty(searchStr)) {
                            result[searchStr] = [];
                        }

                        result[searchStr].push(id);
                    }
                );

                return result;
            },
            {}
        );
    }
}

module.exports = {
    Cache
};