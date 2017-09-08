const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  toggleSideBar: Function;
  isSideBarClosed = true;


  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.toggleSideBar = function(){
      this.isSideBarClosed = !this.isSideBarClosed;
    };

  }
}

export default angular.module('mustudioApp.main', [
  uiRouter])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController
    })
    .name;
