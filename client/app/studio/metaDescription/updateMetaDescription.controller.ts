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

export default class UpdateMetaDescription {
    StudioService;
    state;
    _myStudio: _Studio;
    startStep: string;
    errors: string;
    TEMPLATES: string;
    isDataLoading: boolean;
    isBusinessIdDisabled: boolean;


    /*@ngInject*/
    constructor(StudioService, $state, $stateParams) {
        this.StudioService = StudioService;
        this.state = $state;
        this.startStep = 'metadata';
        this.isDataLoading = false;
    }

    $onInit() {
        this.isDataLoading = true;
        this.StudioService.get((data, err) => {
            this.isDataLoading = false;
            this.isBusinessIdDisabled = true;
            this._myStudio = data;
        });
    }

    SaveMetaData() {
        this.StudioService.saveMetadata(this._myStudio.business._id, this._myStudio, (err) => {
            if(err) this.errors = err.message;
            else this.state.go('studio.build', {replace: true});
        });
    }

}
