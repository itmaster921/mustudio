'use strict';
const angular = require('angular');

export class SubscriptionComponent {
    data;
    emailOptions = ['Daily', 'Weekly', 'Monthly'];

  /*@ngInject*/
  constructor() {

  }

  $onInit() {
    this.data = this.data || {};
  }

}

export default angular.module('mustudioApp.toolbox.subscription', [])
  .component('toolboxSubscription', {
    template: require('./subscription.html'),
    bindings: { data: '=' },
    controller: SubscriptionComponent,
    controllerAs: 'vm'
  })
  .name;
