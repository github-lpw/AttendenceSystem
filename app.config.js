'use strict';
angular.module('attendenceSystem').
config(['$locationProvider', '$routeProvider', '$httpProvider',
    function config($locationProvider, $routeProvider, $httpProvider) {

        $locationProvider.hashPrefix('!');

        $routeProvider.
          when('/loginPage', {
            template: '<login-page></login-page>',
            css:'css/login.css'
          }).
          when('/mainPage/', {
            template: '<main-page></main-page>',
            css:['css/main-page/AdminLTE.min.css',
                 'css/main-page/_all-skins.min.css',
                 'css/main-page/skin-blue-light.min.css',
                 'css/main-page/skin-blue.min.css',
                 'css/main-page/apply/bootstrap3-wysihtml5.min.css',
                 'css/main-page/apply/daterangepicker.css',
                 'css/main-page/leaveRecords/dataTables.bootstrap.css'
               ]
          }).
          otherwise('/loginPage');
    }

]);
