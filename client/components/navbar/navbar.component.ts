'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
const uiNotification = require('angular-ui-notification');
const Site = require('Site');

import registerWizard from '../registerWizard/registerWizard.service';

export class NavbarComponent {
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  toggleSideBar: Function;
  registerModal;


  constructor($rootScope, Auth, Notification, $location, registerModal) {
    'ngInject';
    if($location.search().emailVerification) {
      if($location.search().emailVerification === 'name=ok') {
        Notification.success({title: 'Account is Ready', message: 'Your account has been successfully activated'});
      } else {
        Notification.error({title: 'Account Not Activated', message: $location.search().message});
      }
      $location.url($location.path());
    }
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.registerModal = registerModal;
    $rootScope.isSideBarClosed = true;
    this.toggleSideBar = function(){
      $rootScope.isSideBarClosed = !$rootScope.isSideBarClosed;
    };
  }

  $onInit() {
    Site.run();
  }

}

export default angular.module('directives.navbar', [uiNotification, registerWizard])
  .component('msNavbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent,
    controllerAs: 'vm'
  })
  .name;
