'use strict';
const angular = require('angular');

export class ContactUsComponent {
  /*@ngInject*/

    data;
    WEEK_DAYS = {
      "Monday": true,
      "Tuesday": true,
      "Wednesday": true,
      "Thursday": true,
      "Friday": true,
      "Saturday": false,
      "Sunday": false,
      "Other": false
    };
    todayDate = (new Date()).setMinutes(0, 0);

  constructor() {

  }

  $onInit() {
    this.data = this.data || {};
    this.data.isReply = this.data.isReply || true;
  }
}

export default angular.module('mustudioApp.toolbox.contactUs', [])
  .component('toolboxContactUs', {
    template: require('./contactUs.html'),
    bindings: { data: '=' },
    controller: ContactUsComponent,
    controllerAs: 'vm'
  })
  .name;
