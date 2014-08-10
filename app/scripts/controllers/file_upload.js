'use strict';

/**
 * @ngdoc function
 * @name angularFileUploadClientApp.controller:FileUploadCtrl
 * @description
 * # FileUploadCtrl
 * Controller of the angularFileUploadClientApp
 */
angular.module('angularFileUploadClientApp')
  .controller('FileUploadCtrl', [
    '$scope', 
    '$upload', 
    '$log',
    function ($scope, $upload, $log) {
      $scope.format = 'csv';
      $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
          var file = $files[i];
          $log.debug(file);
          $scope.upload = $upload.upload({
            url: '/api/v1/bulk/device/import.' + $scope.format,
            file: file
          }).progress(function(evt) {
            $log.debug('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }).success(function(data, status, headers, config) {
            $log.debug(status);
          }).error(function() {
            $log.error('Handled error!');
          });
        }
      };    
    }]);
