'use strict';
const angular = require('angular');
import * as moment from 'moment';

export class NewsAnnouncementComponent {
  /*@ngInject*/
    data;

  constructor() {

  }

  $onInit() {
    this.data = this.data || {};
  }

  addImage(imageUrl) {
    this.data.imageUrl = imageUrl;
  }

  dateTimePickerClick($event) {
    if (!this.data.date.isEnabled) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  getFormattedDate() {
    return this.data.date && this.data.date.value ? moment(this.data.date.value).format('YYYY-MM-DD HH:mm A') : undefined;
  }

  changeDate() {
    if (!this.data || !this.data.date) {
      return;
    }
    this.data.date.textValue = moment(this.data.date.value).format('YYYY-MM-DD HH:mm A');
  }
}

export default angular.module('mustudioApp.toolbox.newsAnnouncement', [])
  .component('toolboxNewsAnnouncement', {
    template: require('./newsAnnouncement.html'),
    bindings: { data: '=' },
    controller: NewsAnnouncementComponent,
    controllerAs: 'vm'
  })
  .name;
