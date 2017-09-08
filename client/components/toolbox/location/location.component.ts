'use strict';
const angular = require('angular');

export class LocationComponent {
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
    this.data.businessHours = this.data.businessHours || {
        days : this.WEEK_DAYS,
        timeFrom: (new Date(this.todayDate)).setHours(8),
        timeTo: (new Date(this.todayDate)).setHours(17)
      };

    this.data.address = this.data.address || {
        isEnabled : true
      };
  }
}

export default angular.module('mustudioApp.toolbox.location', [])
  .component('toolboxLocation', {
    template: require('./location.html'),
    bindings: { data: '=' },
    controller: LocationComponent,
    controllerAs: 'vm'
  })
  .name;
