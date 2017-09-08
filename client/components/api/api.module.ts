'use strict';
const angular = require('angular');
import {businessResource} from './business/business.resource';
import {businessService} from './business/business.service';
import {studioResource} from './studio/studio.resource';
import {studioService} from './studio/studio.service';
import {SectionsResource} from './sections/sections.resource';
import {SectionsService} from './sections/sections.service';

export default angular.module('mustudioApp.api', [])
    .factory('businessResource', businessResource)
    .factory('Business', businessService)
    .factory('studioResource', studioResource)
    .factory('StudioService', studioService)
    .factory('SectionsResource', SectionsResource)
    .factory('SectionsService', SectionsService)
  .name;
