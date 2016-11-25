'use strict';
angular.module('mainPage')
  .component('mainPage',{
    templateUrl:'main-page/main-page.template.html',
    controller:['$routeParams','userInfo',
      function mainPageController($routeParams,userInfo){
        this.userName=userInfo.baseInfo.userName;
      }
    ]
  });
