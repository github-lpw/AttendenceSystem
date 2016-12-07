'use strict';
angular.module('mainPage')
    .component('mainPage', {
        templateUrl: 'main-page/main-page.template.html',
        controller: ['$routeParams', '$scope', 'userInfo',
            function mainPageController($routeParams, $scope, userInfo) {
                if (userInfo.baseInfo.office < 3) {
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
                }
                $scope.name = userInfo.baseInfo.name;
                this.userName = userInfo.baseInfo.userName;

                this.templates = {
                    indexClick: 'main-page/apply/newLeave.html',
                    newLeave: 'main-page/apply/newLeave.html',
                    newGoOut: 'main-page/apply/newGoOut.html',
                    leaveRecords: 'main-page/leaveRecords/leaveRecords.html',
                    goOutRecords: 'main-page/leaveRecords/goOutRecords.html',
                    surplusVacationRecords: 'main-page/leaveRecords/surplusVacationRecords.html',
                    leaveCheck: 'main-page/check/leaveCheck.html',
                    goOutCheck: 'main-page/check/goOutCheck.html',
                    leaveDetailCheckClick: 'main-page/check/leaveDetailCheck.html',
                    goOutDetailCheckClick: 'main-page/check/goOutDetailCheckClick.html'
                };
                this.currentTemplate = this.templates['leaveRecords'];

                //页面点击事件
                this.indexClick = function() {
                    this.currentTemplate = this.templates['indexClick'];
                };
                this.newLeaveClick = function() {
                    this.currentTemplate = this.templates['newLeave'];
                };

                this.newGoOutClick = function() {
                    this.currentTemplate = this.templates['newGoOut'];
                };

                this.leaveRecordsClick = function() {
                    this.currentTemplate = this.templates['leaveRecords'];
                };

                this.goOutRecordsClick = function() {
                    this.currentTemplate = this.templates['goOutRecords'];
                };

                this.surplusVacationRecordsClick = function() {
                    this.currentTemplate = this.templates['surplusVacationRecords'];
                };

                this.leaveCheckClick = function() {
                    this.currentTemplate = this.templates['leaveCheck'];
                };

                this.goOutCheckClick = function() {
                    this.currentTemplate = this.templates['goOutCheck'];
                };

                this.leaveDetailCheckClick = function() {
                    this.currentTemplate = this.templates['leaveDetailCheckClick'];
                };
                this.goOutDetailCheckClick = function() {
                    this.currentTemplate = this.templates['goOutDetailCheckClick'];
                };

            }
        ]
    });
