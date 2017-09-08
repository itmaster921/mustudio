'use strict';
const angular = require('angular');

export class GalleryComponent {
  /*@ngInject*/
    data;

  constructor() {

  }

  $onInit() {
    this.data = this.data || {};
    this.data.albums = this.data.albums || [];
  }

  addImage(imageUrl) {
    this.data.imageUrl = imageUrl;
  }
}

export default angular.module('mustudioApp.toolbox.gallery', [])
  .component('toolboxGallery', {
    template: require('./gallery.html'),
    bindings: { data: '=' },
    controller: GalleryComponent,
    controllerAs: 'vm'
  })
  .name;
