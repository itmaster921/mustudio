'use strict';

interface _Studio {
    _id: string;
    studioId: string;
    name: string;
    templateName: string;
    section: Object;
    business: {
        name: string;
        _id: string;
    };
    metadata: {
        title: string,
        Description: string,
        keywords: Array<string>,
        Author: string
    };
    CreatedBy: {
        firstName: string;
        lasttName: string;
        _id: string;
    };
}

export default class BuildStudioController {
    StudioService;
    _myStudio: _Studio;
    errors: string;
    buildStep: string;
    Notification;
    currentSections;
    showPublish;

    /*@ngInject*/
  constructor(StudioService, $stateParams, Notification) {
      this.StudioService = StudioService;
      this.Notification = Notification;
      this.currentSections = {};
      this.buildStep = 'select';
  }

    $onInit() {
      this.StudioService.getByStudioId((studio, err) => {
        this._myStudio = studio;
        angular.copy(this._myStudio, this.currentSections);
        this.showPublish = true;
      });
    }

    saveSections() {
      this._myStudio = angular.copy(this.currentSections);
      this.buildStep = 'select';
    }

    reset() {
      this.currentSections = angular.copy(this._myStudio);
      this.buildStep = 'select';
    };

    publishStudio() {
        this.StudioService.publish(this._myStudio, (data, err) => {
            this.Notification.success({title: 'Congrats!', message: 'Your website is Live Now'});
        });
    }
}
