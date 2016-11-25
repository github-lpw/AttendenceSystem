'use strict';
angular.module('attendenceSystem').
config(['$locationProvider','$routeProvider','$httpProvider',
  function config($locationProvider,$routeProvider,$httpProvider){

    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/loginPage', {
        template: '<login-page></login-page>'
      }).
      when('/mainPage/', {
        template: '<main-page></main-page>'
      }).
      otherwise('/loginPage');

  }

]);
