'use strict';
const angular = require('angular');

export class ProductServiceComponent {
    data;
    productServiceStep;
    currentProductIndex;
    currentProductContent;

    $state;

  /*@ngInject*/
  constructor($state) {
    this.$state = $state;
  }

  $onInit() {
    this.data = this.data || [];

    this.productServiceStep = 'addProductServiceContent';

    console.log(this.productServiceStep);
    this.currentProductContent = {};
  }

  setCurrentProductContent(product, index) {
    this.currentProductIndex = (index >= 0) ? index : -1;
    this.currentProductContent = product || {};
    this.productServiceStep = 'addContent';
  }

  deleteProduct(index) {
    this.data.splice(index, 1);
  }

  cancelProduct() {
    this.currentProductIndex = -1;
    this.currentProductContent = {};
    this.productServiceStep = 'addProductServiceContent';
  }

  saveProduct(product) {
    product = product || {};
    if(this.currentProductIndex >= 0) {
      this.data[this.currentProductIndex] = product;
    } else {
      this.data.push(product);
    }
    this.cancelProduct();
  }

  addImage(imageUrl) {
    this.currentProductContent.imageUrl = imageUrl;
  }
}

export default angular.module('mustudioApp.toolbox.productService', [])
  .component('toolboxProductService', {
    template: require('./productService.html'),
    bindings: {
      data: '=',
    },
    controller: ProductServiceComponent,
    controllerAs: 'vm'
  })
  .name;
