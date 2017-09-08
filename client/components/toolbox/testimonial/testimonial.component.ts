'use strict';
const angular = require('angular');

export class testimonialComponent {
  /*@ngInject*/

    data;
    itemEditMode: string;
    currentTestimonial: Object;
    currentIdex;
  constructor() {
      this.itemEditMode = null;
  }

    editTestimonial(index) {
        this.currentTestimonial = Object.assign({}, this.data[index]);
        this.currentIdex = index;
        this.itemEditMode = 'edit';
    }

    deleteTestimonial(index) {
        this.data.splice(index, 1);
        this.clearMode();
    }

    clearMode() {
        this.itemEditMode = null;
        this.currentIdex = null;
        this.currentTestimonial = null;
    }

    saveTestimonial() {
        switch (this.itemEditMode) {
            case 'edit': {
                this.data[this.currentIdex] = this.currentTestimonial;
                break;
            }
            case 'add': {
                this.data.push(this.currentTestimonial);
                break;
            }
        }
        this.clearMode();
    }
}

export default angular.module('mustudioApp.toolbox.testimonial', [])
  .component('toolboxTestimonial', {
    template: require('./testimonial.html'),
    bindings: { data: '=' },
    controller: testimonialComponent,
    controllerAs: 'vm'
  })
  .name;
