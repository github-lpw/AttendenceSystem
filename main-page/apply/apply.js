angular.module("mainPage")
    .controller("newLeaveController", ['$sessionStorage','$resource', '$scope',
        function($sessionStorage,$resource, $scope) {
            var userInfo=$sessionStorage.userInfo;
            $(function() {
                //Date range picker
                // $('#reservation').daterangepicker();
                //Date range picker with time picker
                // $('#reservationtime').daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A'});
                //Date range as a button
                //according to the priviledge of the user to show the different functional button
                if (userInfo.baseInfo.office < 3) {
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
                }
                //to let the new leave apply highlight
                $(".sidebar-menu").find("li .active").removeClass('active');
                $(".sidebar-menu").children("li:eq(" + 1 + ")").attr('class', 'active');
                $(".sidebar-menu").children("li:eq(" + 1 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'active');


                $('#reservationtime').daterangepicker({
                        timePicker: true,
                        timePickerIncrement: 30,
                        format: 'YYYY-MM-DD HH:mm',
                        startDate: moment().subtract(29, 'days'),
                        endDate: moment()
                    },
                    function(start, end) {

                        //处理日期格式
                        var startFormat = start.format('YYYY-MM-DD HH:mm');
                        var endFormat = end.format('YYYY-MM-DD HH:mm');

                        //选出请假时间的当时时间，只有小时
                        var selectStartHour = startFormat.toString().split(" ")[1].split(":")[0];
                        var selectEndHour = endFormat.toString().split(" ")[1].split(":")[0];

                        //设置指定日期
                        var startHour = "";
                        var endHour = "";
                        if (Number(selectStartHour) >= 0 && Number(selectStartHour) <= 12) {
                            startHour = "00:00"
                        } else {
                            startHour = "12:00";
                        }

                        if (Number(selectEndHour) >= 0 && Number(selectEndHour) <= 12) {
                            endHour = "12:00";
                        } else {
                            endHour = "24:00";
                        }

                        $scope.leaveApplyObj.startDate = start.format('YYYY-MM-DD') + " " + startHour;
                        $scope.leaveApplyObj.endDate = end.format('YYYY-MM-DD') + " " + endHour;

                    }
                );

                //Date picker
                $('#datepicker').datepicker({
                    autoclose: true
                });

            });

            $.widget.bridge('uibutton', $.ui.button);

            $scope.reviewClick = function() {
                var leaveType, isDelay, isCrash;
                switch ($scope.leaveApplyObj.leaveType) {
                    case 1:
                        leaveType = "婚假";
                        break;
                    case 2:
                        leaveType = "产假";
                        break;
                    case 3:
                        leaveType = "陪产假";
                        break;
                    case 4:
                        leaveType = "产检假";
                        break;
                    case 5:
                        leaveType = "年假";
                        break;
                    case 6:
                        leaveType = "工伤假";
                        break;
                    case 7:
                        leaveType = "病假";
                        break;
                    default:
                        leaveType = "病假";
                        break;
                };
                switch ($scope.leaveApplyObj.isDelay) {
                    case '0':
                        isDelay = "否";
                        break;
                    case '1':
                        isDelay = "是";
                        break;
                };
                switch ($scope.leaveApplyObj.isCrash) {
                    case '0':
                        isCrash = "否";
                        break;
                    case '1':
                        isCrash = "是";
                        break;
                };
                $("#preview table tr:eq(" + 0 + ")").append('<td>' + userInfo.baseInfo.name + '</td>');
                $("#preview table tr:eq(" + 1 + ")").append('<td>' + $scope.leaveApplyObj.startDate + '</td>');
                $("#preview table tr:eq(" + 2 + ")").append('<td>' + $scope.leaveApplyObj.endDate + '</td>');
                $("#preview table tr:eq(" + 3 + ")").append('<td>' + isDelay + '</td>');
                $("#preview table tr:eq(" + 4 + ")").append('<td>' + isCrash + '</td>');
                $("#preview table tr:eq(" + 5 + ")").append('<td>' + leaveType + '</td>');
                $("#preview table tr:eq(" + 6 + ")").append('<td>' + $scope.leaveApplyObj.desp + '</td>');
                $("#preview").ezmodal('show');
            }

            $scope.submitApplyClick = function() {
                console.log("提交");
                console.log($scope.leaveApplyObj.leaveType);
                console.log($scope.leaveApplyObj.isDelay);
                console.log($scope.leaveApplyObj.isCrash);
                console.log($scope.leaveApplyObj.desp);
                console.log($scope.leaveApplyObj.startDate);
                console.log($scope.leaveApplyObj.endDate);

                var saveApply = $resource("http://172.23.159.61:3000/leave/apply", {
                    id: userInfo.baseInfo.userName,
                    type: $scope.leaveApplyObj.leaveType,
                    start: $scope.leaveApplyObj.startDate,
                    end: $scope.leaveApplyObj.endDate,
                    desp: $scope.leaveApplyObj.desp,
                    delay: $scope.leaveApplyObj.isDelay,
                    crash: $scope.leaveApplyObj.isCrash
                });

                saveApply.save(function(res) {
                    console.log("发送成功");
                    $("#callBack").ezmodal('show');
                });

            }

            $scope.leaveApplyObj = {
                leaveType: 7,
                startDate: "2016-12-01 00:00",
                endDate: "2016-12-02 00:00",
                isDelay: 1,
                isCrash: 1,
                desp: "傻逼"
            }



        }

    ]);

angular.module("mainPage")
    .controller("newGoOutController", ['$sessionStorage','$resource', '$scope',
        function($sessionStorage,$resource, $scope) {
            var userInfo=$sessionStorage.userInfo;
            $(function() {

                if (userInfo.baseInfo.office < 3) {
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
                }
                //to let the new go out apply highlight
                $(".sidebar-menu").find("li .active").removeClass('active');
                $(".sidebar-menu").children("li:eq(" + 1 + ")").attr('class', 'active');
                $(".sidebar-menu").children("li:eq(" + 1 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'active');

                //Date range as a button
                $('#reservationtime').daterangepicker({
                        timePicker: true,
                        timePickerIncrement: 30,
                        format: 'YYYY-MM-DD HH:mm',
                        startDate: moment().subtract(29, 'days'),
                        endDate: moment()
                    },

                    function(start, end) {
                        //处理日期格式
                        var startFormat = start.format('YYYY-MM-DD HH:mm');
                        var endFormat = end.format('YYYY-MM-DD HH:mm');

                        //选出请假时间的当时时间，只有小时
                        var selectStartHour = startFormat.toString().split(" ")[1].split(":")[0];
                        var selectEndHour = endFormat.toString().split(" ")[1].split(":")[0];

                        //设置指定日期
                        var startHour = "";
                        var endHour = "";
                        if (Number(selectStartHour) >= 0 && Number(selectStartHour) <= 12) {
                            startHour = "00:00"
                        } else {
                            startHour = "12:00";
                        }

                        if (Number(selectEndHour) >= 0 && Number(selectEndHour) <= 12) {
                            endHour = "12:00";
                        } else {
                            endHour = "24:00";
                        }

                        $scope.leaveApplyObj.startDate = start.format('YYYY-MM-DD') + " " + startHour;
                        $scope.leaveApplyObj.endDate = end.format('YYYY-MM-DD') + " " + endHour;
                    }

                );
                //Date picker
                $('#datepicker').datepicker({
                    autoclose: true
                });

            });

            $.widget.bridge('uibutton', $.ui.button);

            $scope.leaveApplyObj = {
                startDate: "2016-12-01 00:00",
                endDate: "2016-12-02 00:00",
                isDelay: 1,
                isCrash: 1,
                desp: "出差",
                dest: "天津大学软件学院"
            }

            $scope.reviewClick = function() {
                var leaveType, isDelay, isCrash;

                switch ($scope.leaveApplyObj.isDelay) {
                    case '0':
                        isDelay = "否";
                        break;
                    case '1':
                        isDelay = "是";
                        break;
                };
                switch ($scope.leaveApplyObj.isCrash) {
                    case '0':
                        isCrash = "否";
                        break;
                    case '1':
                        isCrash = "是";
                        break;
                };
                $("#preview table tr:eq(" + 0 + ")").append('<td>' + userInfo.baseInfo.name + '</td>');
                $("#preview table tr:eq(" + 1 + ")").append('<td>' + $scope.leaveApplyObj.startDate + '</td>');
                $("#preview table tr:eq(" + 2 + ")").append('<td>' + $scope.leaveApplyObj.endDate + '</td>');
                $("#preview table tr:eq(" + 3 + ")").append('<td>' + isDelay + '</td>');
                $("#preview table tr:eq(" + 4 + ")").append('<td>' + isCrash + '</td>');
                $("#preview table tr:eq(" + 5 + ")").append('<td>' + $scope.leaveApplyObj.dest + '</td>');
                $("#preview table tr:eq(" + 6 + ")").append('<td>' + $scope.leaveApplyObj.desp + '</td>');
                $("#preview").ezmodal('show');
            }

            $scope.submitApplyClick = function() {
                console.log("提交");
                console.log($scope.leaveApplyObj.dest);
                console.log($scope.leaveApplyObj.isDelay);
                console.log($scope.leaveApplyObj.isCrash);
                console.log($scope.leaveApplyObj.desp);
                console.log($scope.leaveApplyObj.startDate);
                console.log($scope.leaveApplyObj.endDate);

                var saveApply = $resource("http://172.23.159.61:3000/travel/apply", {
                    id: userInfo.baseInfo.userName,
                    dest: $scope.leaveApplyObj.dest,
                    desp: $scope.leaveApplyObj.desp,
                    start: $scope.leaveApplyObj.startDate,
                    end: $scope.leaveApplyObj.endDate,
                    delay: $scope.leaveApplyObj.isDelay,
                    crash: $scope.leaveApplyObj.isCrash
                });

                saveApply.save(function(res) {
                    console.log("发送成功");
                    $("#callBack").ezmodal('show');
                });
            }


        }
    ]);
