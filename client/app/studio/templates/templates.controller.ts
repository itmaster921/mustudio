'use strict';

const TEMPLATES = require('./../studioStaticValues').templates;

export default class StudioTemplatesController {
  SectionsService;
    Auth;
    state;
    errors: string;
    TEMPLATES: string;


    /*@ngInject*/
    constructor(SectionsService, Auth, $state) {
        this.SectionsService = SectionsService;
        this.Auth = Auth;
        this.state = $state;
        this.TEMPLATES = TEMPLATES;
    }

  saveTemplate(templateName) {
    if(this.Auth.getCurrentUserSync() && this.Auth.getCurrentUserSync().studio
    && this.Auth.getCurrentUserSync().studio.section && this.Auth.getCurrentUserSync().studio.section._id) {
      this.SectionsService.updateTemplate(
        this.Auth.getCurrentUserSync().studio.section && this.Auth.getCurrentUserSync().studio.section._id,
        templateName
      )
        .then(result => {
          this.state.go('studio.build');
          },
          (err) => {
            this.errors = err.message;
          });
      }
    }

}
