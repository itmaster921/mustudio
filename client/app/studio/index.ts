'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const uiNotification = require('angular-ui-notification');
import toolbox from './../../components/toolbox/toolbox.module';
import routes from './studio.routes';
import StartStudioController from './start/startStudio.controller';
import StudioTemplatesController from './templates/templates.controller';
import BuildStudioController from './build/buildStudio.controller';
import UpdateMetaDescriptionController from './metaDescription/updateMetaDescription.controller';

export default angular.module('mustudioApp.studio', [uiRouter, uiNotification, toolbox])
    .config(routes)
    .controller('StartStudioController', StartStudioController)
    .controller('StudioTemplatesController', StudioTemplatesController)
    .controller('BuildStudioController', BuildStudioController)
    .controller('UpdateMetaDescriptionController', UpdateMetaDescriptionController)
    .name;
