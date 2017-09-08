'use strict';
const angular = require('angular');
const ngFileUpload = require('ng-file-upload');

export class uploaderComponent {

  Upload;
  $http;
  $scope;
  uploadBoxLabel: any[] = [];
  onImageUploaded: Function;
  

  /*@ngInject*/
  constructor($scope, Upload, $http) {
    this.Upload = Upload;
    this.$http = $http;
    this.$scope = $scope;

    $scope.$watch('file', () => {
      if($scope.file) {
        this.uploadImage($scope.file);
        //this.onImageUploaded({url: 'https://s3.us-east-2.amazonaws.com/mu-upload/bcb5b47b40859fc73f0c395938b0ee068c66693087c404027372f78a700e6903-5sCY1fOm.jpeg'});
      }
    });
  }

  $onInit() {
    // this.uploadBoxLabel[0] = 'Click Or Drop Multiple Files To Upload.';
  }

  uploadToServer(file) {
    this.uploadBoxLabel.push(file.name + ' is selected');
    let index = this.uploadBoxLabel.length - 1; 
    this.$http.get('/s3/policy')
      .then(response => {
        let s3Policy: any = response.data || {};
        let fileName = s3Policy.signature + '-' + file.name;
        this.Upload.upload({
          url: 'https://s3.us-east-2.amazonaws.com/mu-upload/', //S3 upload url including bucket name
          method: 'POST',
          data: {
            key: fileName,
            acl: 'public-read',
            'X-amz-credential': s3Policy.credentials,
            'X-amz-algorithm': 'AWS4-HMAC-SHA256',
            'X-amz-date': s3Policy.date,
            policy: s3Policy.policy, // base64-encoded json policy (see article below)
            'X-amz-signature': s3Policy.signature, // base64-encoded signature based on policy string (see article below)
            "Content-Type": file.type != '' ? file.type : 'application/octet-stream',
            file: file
          }
        }).then(resp => {
          this.uploadBoxLabel[index] =  file.name + ' is uploaded successfully';
          this.onImageUploaded({url: 'https://s3.us-east-2.amazonaws.com/mu-upload/' + fileName});
        }, null, null);
      })
  }

  uploadImage(file) {
    file = file || {};
    for (let singleFile of file) {
      this.uploadToServer(singleFile);
    }
  }
}

export default angular.module('mustudioApp.uploader', [ngFileUpload])
  .component('uploader', {
    template: require('./uploader.html'),
    bindings: {
      onImageUploaded: '&'
    },
    controller: uploaderComponent
  })
  .name;
