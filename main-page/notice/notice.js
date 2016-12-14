angular.module('mainPage')
    .controller('noticeController', ['$sessionStorage', '$resource', '$scope',
        function noticeController($sessionStorage, $resource, $scope) {
            var userInfo = $sessionStorage.userInfo;
            if (userInfo.baseInfo.office < 3) {
                $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
            }
            var User = $resource('http://172.23.159.61:3000/notice/query', { id: $sessionStorage.userInfo.baseInfo.userName, status: '0' });
            $scope.records = "";
            $('.navbar-nav .messages-menu').on('click', '#notice', function() {
                $(".navbar-nav .messages-menu .dropdown-menu").children('li').not($(".navbar-nav .messages-menu .dropdown-menu").children("li:last")).remove();
                User.query({}, function(leaveRecords) {
                    $scope.records = leaveRecords;
                    var index = $scope.records.length;
                    $('.navbar-nav .messages-menu .dropdown-menu li:last').before("<li class='header'>您有" + index + "条未读消息</li>");
                    for (var i = 0; i <= index - 1; i++) {
                        switch ($scope.records[i].n_type) {
                            case 11:
                                $scope.records[i].n_type = "提交请假申请";
                                break;
                            case 12:
                                $scope.records[i].n_type = "请假申请状态变更";
                                break;
                            case 21:
                                $scope.records[i].n_type = "提交外出申请";
                                break;
                            case 22:
                                $scope.records[i].n_type = "外出申请状态变更";
                                break;
                            default:
                                $scope.records[i].n_type = "系统消息";
                                break;
                        };
                        if (i < 5) {
                            $('.navbar-nav .messages-menu .dropdown-menu li:last').before("<li><ul class='menu'><li><a style='cursor:pointer'><div class='pull-left'><span class='fa fa-user'></span></div><h4>" +
                                $scope.records[i].n_type + "<small><i class='fa fa-clock-o'></i>" + $scope.records[i].n_date + "</small></h4><p>" + $scope.records[i].n_content + "</p></a></li></ul></li>");
                            $(".navbar-nav .messages-menu .dropdown-menu").children("li:eq(" + (i + 1) + ")").data("notice", $scope.records[i]);
                        }
                    }
                    if (index < 5) {
                        $('.navbar-nav .messages-menu .dropdown-menu li:last').addClass('hidden');
                    }
                    $('.navbar-nav .messages-menu .dropdown-menu .menu li').on('click', 'a', function() {
                        var singleData = $(this).parent().parent().parent().data("notice");
                        var haveRead = $resource('http://172.23.159.61:3000/notice/update', { nid: singleData.n_id }).save();
                        if ($scope.noticeLength > 0) {
                            $scope.noticeLength = $scope.noticeLength - 1;
                        }
                        $("#example5 table tr:eq(" + 0 + ")").append('<td>' + singleData.n_id + '</td>');
                        $("#example5 table tr:eq(" + 1 + ")").append('<td>' + singleData.n_content + '</td>');
                        $("#example5 table tr:eq(" + 2 + ")").append('<td>' + singleData.n_type + '</td>');
                        $("#example5 table tr:eq(" + 3 + ")").append('<td>' + singleData.n_date + '</td>');
                        $(this).parent().data("notice", singleData);
                        $("#example5").ezmodal("show");
                        $(".navbar-nav .messages-menu .dropdown-menu").children('li').not($(".navbar-nav .messages-menu .dropdown-menu").children("li:last")).remove();
                    });
                });
            });
            User.query({}, function(leaveRecords) {
                $(document).ready(function() {
                    $scope.records = leaveRecords;
                    $scope.noticeLength = leaveRecords.length;
                });
            });
        }
    ]);


angular.module('mainPage')
    .controller('allNoticeController', ['$sessionStorage', '$resource', '$scope',
        function allNoticeController($sessionStorage, $resource, $scope) {
            var userInfo = $sessionStorage.userInfo;
            if (userInfo.baseInfo.office < 3) {
                $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
            }
            var User = $resource('http://172.23.159.61:3000/notice/query', { id: $sessionStorage.userInfo.baseInfo.userName, status: '0' });
            User.query({}, function(allRecords) {
                $scope.allRecords = allRecords;
                var index = $scope.allRecords.length;
                for (var i = 0; i <= index - 1; i++) {
                    switch ($scope.allRecords[i].n_type) {
                        case 11:
                            $scope.allRecords[i].n_type = "提交请假申请";
                            break;
                        case 12:
                            $scope.allRecords[i].n_type = "请假申请状态变更";
                            break;
                        case 21:
                            $scope.allRecords[i].n_type = "提交外出申请";
                            break;
                        case 22:
                            $scope.allRecords[i].n_type = "外出申请状态变更";
                            break;
                    }
                    $('.box-body .todo-list').append("<li><span class='handle'><i class='fa fa-cog'></i><small>" +
                        $scope.allRecords[i].n_type + "</small></span><span class='text'>" +
                        $scope.allRecords[i].n_content + "</span><a class='label label-primary pull-right'><i class='fa fa-clock-o'></i>" +
                        $scope.allRecords[i].n_date + "</a></li>");
                }

                function readAllNotice() {
                    var haveRead = $resource('http://172.23.159.61:3000/notice/updateAll', { id: userInfo.baseInfo.userName }).save();
                }
            });
        }
    ]);
