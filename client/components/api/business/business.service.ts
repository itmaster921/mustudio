'use strict';

import * as _ from 'lodash';

// @flow
class _Business {
    _id: string;
    name: string;
    address: string;
    $promise = undefined;
}

export function businessService($q, Util, businessResource) {
    'ngInject';
    var safeCb = Util.safeCb;
    var currentUser: _Business = new _Business();


    var Business = {


        /**
         * Check unicity of Business name
         *
         * @param  {string}   name     - Business name
         * @param  {Function} callback - function(error)
         * @return {Promise}
         */
            isUnique(name, callback?: Function) {
            return businessResource.isUnique({name: name},
                function(data) {
                    return safeCb(callback)(null);
                },
                function(err) {
                    return safeCb(callback)(err);
                }).$promise;
        },

    };

    return Business;
}
