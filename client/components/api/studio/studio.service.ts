'use strict';

import * as _ from 'lodash';

// @flow
interface _Studio {
    _id: string;
    studioId: string;
    name: string;
    templateName: string;
    business: {
        name: string;
        _id: string;
    };
    metadata: {
        title: string,
        Description: string,
        keywords: Array<string>,
        Author: string
    };
    CreatedBy: {
        firstName: string;
        lasttName: string;
        _id: string;
    };
}

export function studioService(Util, studioResource, Auth) {
    'ngInject';
    var safeCb = Util.safeCb;


    var Studio = {
        /**
         * Check unicity of Studio ID
         *
         * @param  {string}   studioId     - studio ID
         * @param  {Function} callback - function(error)
         * @return {Promise}
         */
            isUnique(studioId, callback?: Function) {
            return studioResource.isUnique({studioId: studioId},
                function(data) {
                    return safeCb(callback)(null);
                },
                function(err) {
                    return safeCb(callback)(err);
                }).$promise;
        },

        /**
         * Create a new Studio
         *
         * @param  {Studio}   studio     - studio info
         * @param  {Function} callback - function(error, user)
         * @return {Promise}
         */
            createStudio(studio, callback?: Function) {
            return studioResource.save(studio,
                function(data) {
                    return safeCb(callback)(null, data);
                },
                function(err) {
                    return safeCb(callback)(err);
                }).$promise;
        },
        /**
         * Get logged in user Studio
         *
         * @param  {Function} callback - function(error, user)
         * @return {Promise}
         */
            get(callback?: Function) {
                Auth.getCurrentUser((user) => {
                    var currentBusiness = (user.business && user.business._id)
                        ? Auth.getCurrentUserSync().business._id : null;

                    return studioResource.get({id: currentBusiness},
                        function(data) {
                            let localStudio: _Studio = (data && data['studio']) ? data['studio']: {};
                            localStudio.business = {
                                name: undefined,
                                _id: currentBusiness
                            };
                            return safeCb(callback)(localStudio);
                        },
                        function(err) {
                            return safeCb(callback)(null, err);
                        }).$promise;
                });
            },

      /**
       * Get Studio by logged in user's studio ID
       *
       * @param  {Function} callback - function(error, user)
       * @return {Promise}
       */
      getByStudioId(callback?: Function) {
        Auth.getCurrentUser((user) => {
          var currentStudioId = (user.studio && user.studio._id)
            ? Auth.getCurrentUserSync().studio._id : null;

          return studioResource.get({id: currentStudioId},
            function(data) {
              let localStudio: _Studio = (data && data['studio']) ? data['studio']: {};
              return safeCb(callback)(localStudio);
            },
            function(err) {
              return safeCb(callback)(null, err);
            }).$promise;
        });
      },

        /**
         * add Metadata
         *
         * @param  {string} businessId
         * @param  {Object} metadata
         * @param  {Function} callback - function(error, user)
         * @return {Promise}
         */
            addMetadata(businessId, metadata, callback?: Function) {
                return studioResource.addMeta({ id: businessId }, metadata,
                    function() {
                        return safeCb(callback)();
                    },
                    function(err) {
                        return safeCb(callback)(err);
                    }).$promise;
            },

        /**
         * Save Metadata
         *
         * @param  {string} businessId
         * @param  {Object} metadata
         * @param  {Function} callback - function(error, user)
         * @return {Promise}
         */
            saveMetadata(businessId, metadata, callback?: Function) {
            return studioResource.addMeta({ id: businessId }, metadata,
                function() {
                    return safeCb(callback)();
                },
                function(err) {
                    return safeCb(callback)(err);
                }).$promise;
        },

        /**
         * Publish Studio
         *
         * @param  {Object} studio
         * @param  {Function} callback - function(error, user)
         * @return {Promise}
         */
            publish(studio, callback?: Function) {
            return studioResource.publish({ id: studio._id }, studio['section'],
                function() {
                    return safeCb(callback)();
                },
                function(err) {
                    return safeCb(callback)(err);
                }).$promise;
        },
    };

    return Studio;
}
