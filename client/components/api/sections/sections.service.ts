'use strict';

export function SectionsService(Util, SectionsResource, Auth) {
    'ngInject';
    var safeCb = Util.safeCb;


    var Studio = {
        /**
         * Update sections
         *
         * @param  {string} sectionId
         * @param  {Object} sections
         * @param  {Function} callback - function(error)
         * @return {Promise}
         */
            update(sectionId, sections, callback?: Function) {
            return SectionsResource.update({ id: sectionId }, {jsonPath: sections},
                function() {
                    return safeCb(callback)();
                },
                function(err) {
                    return safeCb(callback)(err);
                }).$promise;
        },

      /**
       * Update Templates
       *
       * @param  {string} sectionId
       * @param  {string} templateName
       * @param  {Function} callback - function(error)
       * @return {Promise}
       */
        updateTemplate(sectionId, templateName, callback?: Function) {
        return SectionsResource.update({ id: sectionId }, {name: templateName},
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
