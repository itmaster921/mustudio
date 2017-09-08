const angular = require('angular');

export class MsFooterComponent {}

export default angular.module('directives.msFooter', [])
  .component('msFooter', {
    template: require('./footer.html'),
    controller: MsFooterComponent
  })
  .name;
