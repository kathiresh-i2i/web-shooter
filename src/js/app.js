var app = angular.module('webshooter', ['ngRoute']).config(function ($routeProvider) {
  'use strict';
  $routeProvider.when('/', {
    controller: 'PreviewController',
    templateUrl: 'preview.html',
  });
});
