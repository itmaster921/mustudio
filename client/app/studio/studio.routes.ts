'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('studio', {
        url: '/studio',
        template: '<div ui-view></div>',
        authenticate: true,
        controllerAs: 'vm'
    })
    .state('studio.start', {
        url: '/start',
        template: require('./start/startStudio.html'),
        authenticate: true,
        controller: 'StartStudioController',
        controllerAs: 'vm',
        params: {
            savedStudio: null
        }
    })
    .state('studio.templates', {
        url: '/templates',
        template: require('./templates/templates.html'),
        authenticate: true,
        controller: 'StudioTemplatesController',
        controllerAs: 'vm'
    })
    .state('studio.build', {
        url: '/build',
        template: require('./build/buildStudio.html'),
        authenticate: true,
        controller: 'BuildStudioController',
        controllerAs: 'vm',
        params: {
            savedStudio: null
        }
    })
      .state('updateMetaDescription', {
          url: '/update/meta',
          template: require('./start/startStudio.html'),
          authenticate: true,
          controller: 'UpdateMetaDescriptionController',
          controllerAs: 'vm'
      });
}
