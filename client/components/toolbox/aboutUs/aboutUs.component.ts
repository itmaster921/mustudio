'use strict';
const angular = require('angular');

export class AboutUsComponent {
    data;
  /*@ngInject*/
  constructor() {

  }

  $onInit() {
    this.data = this.data || {};
  }

  addImage(imageUrl) {
    this.data.imageUrl = imageUrl;
  }
}

export default angular.module('mustudioApp.toolbox.aboutUs', [])
  .component('toolboxAboutUs', {
    template: require('./aboutUs.html'),
    bindings: { data: '=' },
    controller: AboutUsComponent,
    controllerAs: 'vm'
  })
  .name;
