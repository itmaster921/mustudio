'use strict';
const angular = require('angular');

export function studioResource($resource) {
    'ngInject';
    return $resource('/api/studios/:id/:controller', {
        id: '@_id'
    }, {
        isUnique: {
            method: 'POST',
            params: {
                controller: 'isUnique'
            }
        },

        addMeta: {
            method: 'POST',
            params: {
                controller: 'meta'
            }
        },

        saveMeta: {
            method: 'PUT',
            params: {
                controller: 'meta'
            }
        },

        publish: {
            method: 'PUT',
            params: {
                controller: 'publish'
            }
        }
    });
}
