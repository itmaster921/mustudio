'use strict';

const TEMPLATES = require('./../studioStaticValues');

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

export default class StartStudioController {
    StudioService;
    state;
    _myStudio: _Studio;
    startStep: string;
    errors: string;
    TEMPLATES: string;


    /*@ngInject*/
    constructor(StudioService, $state, $stateParams) {
        this.StudioService = StudioService;
        this.state = $state;
        this.startStep = 'template';
        this._myStudio = $stateParams.savedStudio;
        this.TEMPLATES = TEMPLATES;
    }

    $onInit() {

    }

    selectTemplate(templateName) {
        this._myStudio.templateName = templateName;
        this._myStudio.section = {
            name: templateName,
            jsonPath: TEMPLATES[templateName].sections
        };

        console.log(this._myStudio);
        this.startStep = 'metadata';
    }

    SaveMetaData() {
        //TODO: add save/error notification
        this.StudioService.addMetadata(this._myStudio.business._id, this._myStudio, (err) => {
            if(err) this.errors = err.message;
            else this.state.go('studio.build', {}, {reload: true});
        });
    }

}
