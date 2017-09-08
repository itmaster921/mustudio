'use strict';
const angular = require('angular');
import RegisterWizardController from './registerWizard.controller';

export function registerModal($uibModal) {
    return {
        startWizard(){
            var modalInstance = $uibModal.open({
                controller: RegisterWizardController,
                windowClass: 'modal-fill-in show',
                size: 'lg',
                controllerAs: 'vm',
                template: require('./registerWizardModal.html'),
            });
            modalInstance.result.then(function() {
                console.log("Modal closed Yes")
            });
            modalInstance.result.catch(function() {
                console.log("Modal closed Dismiss")
            });
        }
    }
}

export default angular.module('mustudioApp.registerWizard', [])
    .factory('registerModal', registerModal)
  .name;
