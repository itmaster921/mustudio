'use strict';
const angular = require('angular');

export class sliderComponent {
  /*@ngInject*/

    data;
  constructor() {
  }

  deleteImage(index) {
      this.data.splice(index, 1);
  }

  addImage(imageUrl) {
    this.data.push(
      {
        url: imageUrl,
        isCaptionDisplayed: false
      }
    );
  }
}

export default angular.module('mustudioApp.toolbox.slider', [])
  .component('toolboxSlider', {
    template: require('./slider.html'),
    bindings: { data: '=' },
    controller: sliderComponent,
    controllerAs: 'vm'
  })
  .name;
