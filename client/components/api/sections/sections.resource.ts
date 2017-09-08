'use strict';
const angular = require('angular');

export function SectionsResource($resource) {
    'ngInject';
    return $resource('/api/sections/:id/:controller', {
        id: '@_id'
    }, {
      'update': { method:'PUT' }
    });
}
