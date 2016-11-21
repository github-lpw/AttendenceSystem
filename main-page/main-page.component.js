'use strict';
angular.module('mainPage')
  .component('mainPage',{
    templateUrl:'main-page/main-page.template.html',
    controller:['$routeParams',
      function mainPageController($routeParams){
        this.userName=$routeParams.userName;
      }
    ]
  });
