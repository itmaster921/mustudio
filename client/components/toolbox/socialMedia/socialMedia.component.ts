'use strict';
const angular = require('angular');

export class SocialMediaComponent {
    data;
    socialNetworks;

  /*@ngInject*/
  constructor() {

  }

  $onInit() {
    this.data = this.data || {};
    this.socialNetworks = [
      {name: 'facebook', src: 'client/assets/images/social-media/FB.png'},
      {name: 'google+', src: 'client/assets/images/social-media/GP.png'},
      {name: 'instagram', src: 'client/assets/images/social-media/IN.png'},
      {name: 'twitter', src: 'client/assets/images/social-media/TW.png'}
    ];
  }

}

export default angular.module('mustudioApp.toolbox.socialMedia', [])
  .component('toolboxSocialMedia', {
    template: require('./socialMedia.html'),
    bindings: { data: '=' },
    controller: SocialMediaComponent,
    controllerAs: 'vm'
  })
  .name;
