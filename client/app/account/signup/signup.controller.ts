'use strict';
// @flow
const angular = require('angular');
const studioStaticValues = require('../../studio/studioStaticValues');

interface Studio {
    studioId: string;
    type: string;
    category: string;
    metaDesctription: string;
    logo: string;
    CreatedBy: string;
    keywords: any;
    features: any;
    colors: any;
}

export default class SignupController {
    errors = {};
    httpError;
    formLoading;
    step = 'business';
    Auth;
    $state;


    StudioService;
    SectionsService;
    savedStudioData: Object;
    myStudioValues: Studio;
    studioRegisterStep;
    account: Object;
    createdStudio: Object;
    buildingSectionsLoader: boolean;

  /*@ngInject*/
  constructor(Auth, $state, StudioService, SectionsService) {
    this.Auth = Auth;
    this.$state = $state;
    this.StudioService = StudioService;
    this.SectionsService = SectionsService;
    this.myStudioValues = {
        studioId: null,
        type: null,
        category: null,
        metaDesctription: null,
        logo: null,
        CreatedBy: null,
        keywords: [],
        features: [],
        colors: []
      };

      this.account = {};

      this.savedStudioData = {
          websiteType: studioStaticValues.types,
          websiteCategory: studioStaticValues.categories,
          websiteFeatures: studioStaticValues.sections,
          colors: studioStaticValues.colors,
          suggestedKeywords: ["Food", "Restraurant", "Fresno", "California", "Beer", "Happy hour", "Fine dining"],
      };
  }

  addImage(imageUrl) {
    this.myStudioValues.logo = imageUrl;
  }

    checkStudioNameUnicity() {
        this.errors['business-name'] = {isError: false, msg: ''};
        this.formLoading =  true;
        this.StudioService.isUnique(this.myStudioValues.studioId)
            .then(
                () => {
                    this.formLoading = false;
                    this.studioRegisterStep = 'websiteDescription';
                },
                (err) => {
                    this.formLoading = false;
                    this.errors['business-name'] = {
                        isError: true,
                        msg: (err && err['data'] && err['data']['message']) ? err['data']['message']: ''
                    };
                });
    }

    pushKeyword(keyword) {
        var keywordIndex = this.myStudioValues.keywords.map(item => item.text).indexOf(keyword);
        if(keywordIndex === -1) {
            this.myStudioValues.keywords.push({
                text: keyword
            })
        } else {
            this.myStudioValues.keywords.splice(keywordIndex, 1);
        }
    }

    isKeywordExist(keyword) {
        return this.myStudioValues.keywords.map(item => item.text.toLowerCase()).indexOf(keyword.toLowerCase()) !== -1;
    }

    pushFeature(selectedfeature) {
        let featureIndex = this.myStudioValues.features.map(item => item.name).indexOf(selectedfeature.name);
        if(featureIndex === -1) {
            this.myStudioValues.features.push(selectedfeature)
        } else {
            this.myStudioValues.features.splice(featureIndex, 1);
        }
    }

  pushColor(selectedColor) {
    let colorIndex = this.myStudioValues.colors.indexOf(selectedColor);
    if(colorIndex === -1) {
      if( this.myStudioValues.colors.length < 2) this.myStudioValues.colors.push(selectedColor)
    } else {
      this.myStudioValues.colors.splice(colorIndex, 1);
    }
  }

    isFeatureExist(selectedfeature) {
        return this.myStudioValues.features.map(item => item.name).indexOf(selectedfeature.name) !== -1;
    }

  isColorSelected(selectedColor) {
    return this.myStudioValues.colors.indexOf(selectedColor) !== -1;
  }

    createAccount() {
        this.formLoading = true;
        this.errors['register-account'] = {isError: false, msg: ''};
        this.Auth.createUser(this.account)
            .then(response => {
                this.account['userId'] = (response && response._id) ? response._id : null;
                this.formLoading = false;
                this.studioRegisterStep = 'websiteType';
            })
            .catch(err => {
                this.formLoading = false;
                this.errors['register-account'] = {
                    isError: true,
                    msg: (err && err['data'] && err['data']['message']) ? err['data']['message']: ''
                };
            });
    }

    makeStudio() {
        this.formLoading = true;
        this.errors['register-account'] = {isError: false, msg: ''};

        this.myStudioValues.CreatedBy = this.account['userId'];
        this.StudioService.createStudio(this.myStudioValues)
            .then(
                (createdStudio) => {
                    this.formLoading = false;
                    this.createdStudio = createdStudio;
                    this.studioRegisterStep = 'websiteBuilding';
                },
                (err) => {
                    this.formLoading = false;
                    this.errors['register-studio'] = {
                        isError: true,
                        msg: (err && err['data'] && err['data']['message']) ? err['data']['message']: ''
                    };
                });
    }

  saveSections() {
    console.log(this.myStudioValues.features, this.createdStudio);
    this.buildingSectionsLoader = true;
    if (this.createdStudio && this.createdStudio['section']
      && this.createdStudio && this.createdStudio['section']['_id']) {
      this.SectionsService.update(this.createdStudio['section']['_id'], this.myStudioValues.features)
        .then(
          (updatedStudio) => {
            this.Auth.login({
              email: this.account['email'],
              password: this.account['password']
            }).then(() => {
              // Logged in, redirect to studio
              this.$state.go('studio.templates');
              this.buildingSectionsLoader = false;
            })
              .catch(err => {
                this.errors = err.message;
                this.buildingSectionsLoader = false;
              });
          },
          (err) => {
            this.errors = err.message;
            this.buildingSectionsLoader = false;
          });
    } else {
      this.studioRegisterStep = 'websiteFeatures';
    }
  }
}
