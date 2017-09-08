'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>',
        authenticate: true
    });
}
