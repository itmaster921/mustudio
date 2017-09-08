'use strict';
const angular = require('angular');

export function businessResource($resource) {
    'ngInject';
    return $resource('/api/business/:id/:controller', {
        id: '@_id'
    }, {
        isUnique: {
            method: 'POST',
            params: {
                controller: 'isUnique'
            }
        }
    });
}
