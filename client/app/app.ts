'use strict';
import * as moment from 'moment';
const angular = require('angular');
const ngAnimate = require('angular-animate');
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
import 'ng-tags-input';



const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
import 'angular-bootstrap-datetimepicker';
import 'angular-validation-match';



import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import _Api from '../components/api/api.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import Dashboard from './dashboard/dashboard.component';
import Studio from './studio';
import constants from './app.constants';
import util from '../components/util/util.module';
import uploader from '../components/uploader/uploader.component';

import './app.css';

angular.module('mustudioApp', [
  ngCookies,
  ngResource,
  ngSanitize,
  ngAnimate,
  'ngTagsInput',

  uiRouter,
  uiBootstrap,

  _Auth,
    _Api,
  account,
  admin,
  'ui.bootstrap.datetimepicker',
  'validation.match',
  navbar,
  footer,
  main, Dashboard, Studio, // main routes
  constants,

  util,
  uploader
])
  .config(routeConfig)
  .config((tagsInputConfigProvider) => {
    'ngInject';
    tagsInputConfigProvider.setDefaults('tagsInput', {
      placeholder: 'New Keyword',
      removeTagSymbol: '✖'
    })
  })
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['mustudioApp'], {
      strictDi: true
    });
  });
