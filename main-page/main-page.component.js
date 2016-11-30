'use strict';
angular.module('mainPage')
  .component('mainPage',{
    templateUrl:'main-page/main-page.template.html',
    controller:['$routeParams','userInfo',
      function mainPageController($routeParams,userInfo){
        this.userName=userInfo.baseInfo.userName;

        this.templates =
        {
          newLeave:'main-page/apply/newLeave.html',
          newGoOut:'main-page/apply/newGoOut.html',
          leaveRecords:'main-page/leaveRecords/leaveRecords.html',
          goOutRecords:'main-page/leaveRecords/goOutRecords.html',
          surplusVacationRecords:'main-page/leaveRecords/surplusVacationRecords.html',
          leaveCheck:'main-page/check/leaveCheck.html',
          goOutCheck:'main-page/check/goOutCheck.html',
          detailCheck:'main-page/check/detailCheck.html'
        };
        this.currentTemplate = this.templates['leaveRecords'];







        //页面点击事件
        this.newLeaveClick=function(){
          this.currentTemplate = this.templates['newLeave'];
        };

        this.newGoOutClick=function(){
          this.currentTemplate = this.templates['newGoOut'];
        };

        //
        this.leaveRecordsClick=function(){
          this.currentTemplate = this.templates['leaveRecords'];
        };

        this.goOutRecordsClick=function(){
          this.currentTemplate = this.templates['goOutRecords'];
        };

        this.surplusVacationRecordsClick=function(){
          this.currentTemplate = this.templates['surplusVacationRecords'];
        };

        this.leaveCheckClick=function(){
          this.currentTemplate = this.templates['leaveCheck'];
        };

        this.goOutCheckClick=function(){
          this.currentTemplate = this.templates['goOutCheck'];
        };

        this.detailCheckClick=function(){
          this.currentTemplate = this.templates['detailCheck'];
        };

      }
    ]
  });
