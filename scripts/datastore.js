(function (window) {
    'use strict';
    var App = window.App || {};
    var Promise = window.Promise;
    var data = {};
    function DataStore() {
        console.log('running the datastore function');
        this.data = {};
    }

    function promiseResolveWith(value) {
        return new Promise(function (resolve, reject) {
            resolve(value);
        });
    }

    DataStore.prototype.add = function (key, val) {
        this.data[key] = val;
        return promiseResolveWith(null);
    };

    DataStore.prototype.get = function (key) {
        return promiseResolveWith(this.data[key]);
    }

    DataStore.prototype.getAll = function () {
        return promiseResolveWith(this.data);
    }

    DataStore.prototype.remove = function (key) {
        delete data[key];
        return promiseResolveWith(null);
    }

    App.DataStore = DataStore;
    window.App = App;
})(window)