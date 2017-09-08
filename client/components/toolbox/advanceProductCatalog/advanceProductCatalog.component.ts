'use strict';
const angular = require('angular');

export class AdvanceProductCatalogComponent {
    data;
    apcStep;
    currentCatalog;
    currentProductIndex;
    currentProductContent;

    $state;

  /*@ngInject*/
  constructor($state) {
    this.$state = $state;
  }

  $onInit() {
    this.data = this.data || {};
    this.data.items = this.data.items || [];
    this.data.catalogues = this.data.catalogues || [];
    this.data.variants = this.data.variants || [];
    this.data.status = this.data.status || [];

    this.apcStep = (this.data.catalogues.length > 0) ? 'selectCatalg' : 'addContent';
    this.currentProductContent = {};
  }

  setCurrentCatalog(catalog) {
    this.currentCatalog = catalog;
    this.apcStep = 'addCategoryContent';
  }

  setCurrentProductContent(product, index) {
    this.currentProductIndex = (index >= 0) ? index : -1;
    this.currentProductContent = product || {};
    this.currentProductContent.catalog = this.currentProductContent.catalog || this.currentCatalog;
    this.apcStep = 'addContent';
  }

  deleteProduct(index) {
    this.data.items.splice(index, 1);
  }

  cancelProduct() {
    this.currentProductIndex = -1;
    this.currentProductContent = {};
    if(this.data.catalogues.length > 0) this.apcStep = 'selectCatalg';
  }

  saveProduct(product) {
    product = product || {};
    product.status = product.status || {};
    if(this.currentProductIndex >= 0) {
      this.data.items[this.currentProductIndex] = product;
    } else {
      this.data.items.push(product);
    }
    this.addIfNotExist(this.data.catalogues, product.catalog);
    this.addIfNotExist(this.data.variants, product.variant);
    this.addIfNotExist(this.data.status, product.status.value);
    this.cancelProduct();
  }

  addImage(imageUrl) {
    this.currentProductContent.imageUrl = imageUrl;
  }

  addIfNotExist(itemsList, item) {
    if(item && item !== "" && itemsList.indexOf(item) === -1) itemsList.push(item);
  }

  filterProductsByCatalog(products, catalog) {
    products = products || [];
    if (!catalog) return products;
    else return products.filter(item => (item && item.catalog) ? item.catalog === catalog : false)
  }
}

export default angular.module('mustudioApp.toolbox.advanceProductCatalog', [])
  .component('toolboxAdvanceProductCatalog', {
    template: require('./advanceProductCatalog.html'),
    bindings: {
      data: '=',
    },
    controller: AdvanceProductCatalogComponent,
    controllerAs: 'vm'
  })
  .name;
