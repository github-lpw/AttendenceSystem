'use strict';
angular.module('attendenceSystem').
config(['$locationProvider','$routeProvider',
  function config($locationProvider,$routeProvider){
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/login-page', {
        template: '<login-page></login-page>'
      }).
      when('/main-page/:userName', {
        template: '<main-page></main-page>'
      }).
      otherwise('/login-page');

  }

]);
