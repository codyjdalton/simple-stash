'use strict';

var Cache = (function(){

    function Cache() {
        
        this.keys = [];
        this.dataMap = {};
        this.data = [];
    }
    
    /**
     * @function mapData
     * @param {any[]} data - the array to be cached
     * @param {string[]} keys - array of keys to use
     */
    Cache.prototype.mapData = function(arr) {
        
        return Object.keys(arr).reduce(
            (result, idx) => {

                this.keys.forEach(
                    key => {

                        if(!result[key]){
                            result[key] = {};
                        }

                        result[key][arr[idx][key]] = idx;
                    }
                );

                return result;
            }, {}
        );
    };

    /**
     * @function set
     * @param {any[]} data - the array to be cached
     * @param {string[]} keys - array of keys to use
     */
    Cache.prototype.set = function(arr, keys) {

        this.keys = keys;
        this.dataMap = this.mapData(arr);
        this.data = arr;
    };
    
    /**
     * @function get
     * @param {string} key
     * @param {string[]} value
     * @returns {any}
     */
    Cache.prototype.get = function(key, value) {

        if(this.dataMap[key] && this.dataMap[key][value] !== undefined){
            return this.data[this.dataMap[key][value]];
        }

        return null;
    };

    return Cache;
}());

module.exports = Cache;