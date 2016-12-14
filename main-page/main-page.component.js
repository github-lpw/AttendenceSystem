'use strict';
angular.module('mainPage')
    .component('mainPage', {
        templateUrl: 'main-page/main-page.template.html',
        controller: ['$sessionStorage', '$routeParams', '$scope',
            function mainPageController($sessionStorage, $routeParams, $scope) {
                var userInfo = $sessionStorage.userInfo;
                if (userInfo.baseInfo.office < 3) {
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
                }
                $scope.name = userInfo.baseInfo.name;
                $scope.department = userInfo.baseInfo.department;
                $scope.office = userInfo.baseInfo.office;
                switch (userInfo.baseInfo.office) {
                    case 1:
                        $scope.office = "普通员工";
                        break;
                    case 2:
                        $scope.office = "项目经理";
                        break;
                    case 3:
                        $scope.office = "部门经理";
                        break;
                    case 4:
                        $scope.office = "副总经理";
                        break;
                    case 5:
                        $scope.office = "总经理";
                        break;
                    default:
                        $scope.office = "普通员工";
                        break;
                };
                switch (userInfo.baseInfo.department) {
                    case "1":
                        $scope.department = "总经理";
                        break;
                    case "2":
                        $scope.department = "综合管理部";
                        break;
                    case "3":
                        $scope.department = "财务部";
                        break;
                    case "4":
                        $scope.department = "行政部";
                        break;
                    case "5":
                        $scope.department = "人力资源部";
                        break;
                    case "6":
                        $scope.department = "技术部";
                        break;
                    case "7":
                        $scope.department = "客服部";
                        break;
                    case "8":
                        $scope.department = "销售部";
                        break;
                    case "9":
                        $scope.department = "工程部";
                        break;
                    case "10":
                        $scope.department = "企划部";
                        break;
                    case "11":
                        $scope.department = "市场部";
                        break;
                    case "12":
                        $scope.department = "采购部";
                        break;
                    case "13":
                        $scope.department = "保管部";
                        break;
                    case "14":
                        $scope.department = "制造部";
                        break;
                };
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
                    goOutDetailCheckClick: 'main-page/check/goOutDetailCheckClick.html',
                    allNotice: 'main-page/notice/notice.html'
                };
                this.currentTemplate = this.templates['newLeave'];

                //页面点击事件
                this.indexClick = function() {
                    this.currentTemplate = this.templates['indexClick'];
                };
                this.newLeaveClick = function() {
                    this.currentTemplate = this.templates['newLeave'];
                    $("body").removeClass('sidebar-open');
                };

                this.newGoOutClick = function() {
                    this.currentTemplate = this.templates['newGoOut'];
                    $("body").removeClass('sidebar-open');
                };

                this.leaveRecordsClick = function() {
                    this.currentTemplate = this.templates['leaveRecords'];
                    $("body").removeClass('sidebar-open');
                };

                this.goOutRecordsClick = function() {
                    this.currentTemplate = this.templates['goOutRecords'];
                    $("body").removeClass('sidebar-open');
                };

                this.surplusVacationRecordsClick = function() {
                    this.currentTemplate = this.templates['surplusVacationRecords'];
                    $("body").removeClass('sidebar-open');
                };

                this.leaveCheckClick = function() {
                    this.currentTemplate = this.templates['leaveCheck'];
                    $("body").removeClass('sidebar-open');
                };

                this.goOutCheckClick = function() {
                    this.currentTemplate = this.templates['goOutCheck'];
                    $("body").removeClass('sidebar-open');
                };

                this.leaveDetailCheckClick = function() {
                    this.currentTemplate = this.templates['leaveDetailCheckClick'];
                    $("body").removeClass('sidebar-open');
                };
                this.goOutDetailCheckClick = function() {
                    this.currentTemplate = this.templates['goOutDetailCheckClick'];
                    $("body").removeClass('sidebar-open');
                };
                this.allNotice = function() {
                    this.currentTemplate = this.templates['allNotice'];
                    $("body").removeClass('sidebar-open');
                };
            }
        ]
    });
