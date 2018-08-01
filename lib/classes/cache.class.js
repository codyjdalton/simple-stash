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
        
        this.resourceMap = {};
        this.resources = {};
    }

    /**
     * @function set
     * @param {string} resourceName
     * @param { Array< { [propName: string]: any } > } resourceArr - the array to be cached
     * @returns {void}
     */
    set(resourceName, resourceArr) {
        this.resources = Object.assign(
            this.getResources(resourceArr),
            this.resources
        );
        this.resourceMap = Object.assign(
            this.getResourcesMap(resourceName),
            this.resourceMap
        );
    }

    /**
     * @method getAll
     * @param {string} inputStr 
     * @returns { Array<{ [propName: string]: any }> }
     */
    getAll(inputStr) {
        return this.resourceMap.hasOwnProperty(inputStr) ?
               this.resourceMap[inputStr].map(
                   recordId => jsonpack.unpack(this.resources[recordId])
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
        return Object.keys(this.resources).reduce(
            (result, id) => {

                const item = jsonpack.unpack(this.resources[id]);

                // @TODO simplify this logic
                Object.keys(item).forEach(
                    propKey => {

                        const searchStr = [resourceName, propKey, item[propKey]].join(':');
 
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