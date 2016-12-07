angular.module('mainPage')
    .controller('leaveDetailController', ['$resource', '$scope', 'userInfo',
        function leaveDetailController($resource, $scope, userInfo) {
            var User = $resource('http://172.23.71.219:3000/leave/showStatus', { id: userInfo.baseInfo.userName });
            User.query({}, function(leaveRecords) {
                if (userInfo.baseInfo.office < 3) {
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
                }
                $(document).ready(function() {
                    var index = leaveRecords.length;
                    for (var i = 0; i <= index - 1; i++) {

                        switch (leaveRecords[i].l_status) {
                            case 0:
                                leaveRecords[i].l_status = "待审批";
                                break;
                            case 1:
                                leaveRecords[i].l_status = "拒绝";
                                break;
                            case 2:
                                leaveRecords[i].l_status = "通过";
                                break;
                            default:
                                leaveRecords[i].l_status = "待审批";
                                break;
                        };
                        switch (leaveRecords[i].l_type) {
                            case 1:
                                leaveRecords[i].l_type = "婚假";
                                break;
                            case 2:
                                leaveRecords[i].l_type = "产假";
                                break;
                            case 3:
                                leaveRecords[i].l_type = "陪产假";
                                break;
                            case 4:
                                leaveRecords[i].l_type = "产检假";
                                break;
                            case 5:
                                leaveRecords[i].l_type = "年假";
                                break;
                            case 6:
                                leaveRecords[i].l_type = "工伤假";
                                break;
                            case 7:
                                leaveRecords[i].l_type = "病假";
                                break;
                            default:
                                leaveRecords[i].l_type = "病假";
                                break;
                        };
                    }
                    $('#example1').dataTable({
                        "data": leaveRecords,
                        "columns": [{
                            data: 'l_date'
                        }, {
                            data: 'l_start'
                        }, {
                            data: 'l_end'
                        }, {
                            data: 'l_day'
                        }, {
                            data: 'l_type'
                        }, {
                            data: 'l_status'
                        }, {
                            data: 'l_status_dm'
                        }, {
                            data: 'l_status_dgm'
                        }, {
                            data: 'l_status_gm'
                        }],
                        "columnDefs": [{
                            "targets": [1, 2, 6, 7, 8],
                            "visible": false
                        }]
                    });
                    $(".sidebar-menu").find("li .active").removeClass('active');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").attr('class', 'active');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 2 + ")").attr('class', 'active');

                    $('#example1 tbody').on('click', 'tr', function() {
                        $('#example1 .active').toggleClass('active');
                        $(".timeline li .timeline-item .timeline-body").html("");
                        $(".timeline li span i").html("");

                        var table = $('#example1').DataTable();
                        $(this).toggleClass('active');
                        var singleData = table.rows('.active').data()[0];

                        $(".timeline li:eq(" + 0 + ") span i").html(singleData.l_date);
                        $(".timeline li:eq(" + 1 + ") span i").html(singleData.l_date);
                        if (singleData.l_status_dm == '0') {
                            $(".timeline li:eq(" + 2 + ")").children('i').attr("class", "fa fa-clock-o bg-gray");
                            $(".timeline li:eq(" + 2 + ") .timeline-item .timeline-body").html("正在等待部门经理审批...");

                        } else if (singleData.l_status_dm == '1') {
                            $(".timeline li:eq(" + 2 + ")").children('i').attr("class", "fa fa-remove bg-maroon");
                            $(".timeline li:eq(" + 2 + ") .timeline-item .timeline-body").html("部门经理审批已拒绝你的申请...");

                        } else {
                            $(".timeline li:eq(" + 2 + ")").children('i').attr("class", "fa fa-check bg-blue");
                            $(".timeline li:eq(" + 2 + ") .timeline-item .timeline-body").html("部门经理审批已通过你的申请...");
                            $(".timeline li:eq(" + 2 + ") span i").html(singleData.l_status_dm);
                        }
                        if (singleData.l_status_dgm == '0') {
                            $(".timeline li:eq(" + 3 + ")").children('i').attr("class", "fa fa-clock-o bg-gray");
                            $(".timeline li:eq(" + 3 + ") .timeline-item .timeline-body").html("正在等待副总经理审批...");
                        } else if (singleData.l_status_dgm == '1') {
                            $(".timeline li:eq(" + 3 + ")").children('i').attr("class", "fa fa-remove bg-maroon");
                            $(".timeline li:eq(" + 3 + ") .timeline-item .timeline-body").html("副总经理审批已拒绝你的申请...");
                        } else {
                            $(".timeline li:eq(" + 3 + ")").children('i').attr("class", "fa fa-check bg-blue");
                            $(".timeline li:eq(" + 3 + ") .timeline-item .timeline-body").html("副总经理审批已通过你的申请...");
                            $(".timeline li:eq(" + 3 + ") span i").html(singleData.l_status_dgm);
                        }
                        if (singleData.l_status_gm == '0') {
                            $(".timeline li:eq(" + 4 + ")").children('i').attr("class", "fa fa-clock-o bg-gray");
                            $(".timeline li:eq(" + 4 + ") .timeline-item .timeline-body").html("正在等待总经理审批...");
                        } else if (singleData.l_status_gm == '1') {
                            $(".timeline li:eq(" + 4 + ")").children('i').attr("class", "fa fa-remove bg-maroon");
                            $(".timeline li:eq(" + 4 + ") .timeline-item .timeline-body").html("总经理审批已拒绝你的申请...");
                        } else {
                            $(".timeline li:eq(" + 4 + ")").children('i').attr("class", "fa fa-check bg-blue");
                            $(".timeline li:eq(" + 4 + ") .timeline-item .timeline-body").html("总经理审批已通过你的申请...");
                            $(".timeline li:eq(" + 4 + ") span i").html(singleData.l_status_gm);
                        }
                        if (singleData.l_status == '待审批') {
                            $(".timeline li:eq(" + 5 + ")").children('i').attr("class", "fa fa-clock-o bg-gray");
                            $(".timeline li:eq(" + 5 + ") .timeline-item .timeline-body").html("你的申请的最终状态为待审批...");
                        } else if (singleData.l_status == '拒绝') {
                            $(".timeline li:eq(" + 5 + ")").children('i').attr("class", "fa fa-remove bg-maroon");
                            $(".timeline li:eq(" + 5 + ") .timeline-item .timeline-body").html("你的申请的最终状态为已拒绝...");
                        } else {
                            $(".timeline li:eq(" + 5 + ")").children('i').attr("class", "fa fa-check bg-blue");
                            $(".timeline li:eq(" + 5 + ") .timeline-item .timeline-body").html("你的申请的最终状态为通过...");
                        }
                        console.log($("div.hidden"));
                        $("div.hidden").removeClass("hidden");
                    });
                });
            });
        }
    ]);



angular.module('mainPage')
    .controller('goOutDetailController', ['$resource', '$scope', 'userInfo',
        function goOutDetailController($resource, $scope, userInfo) {
            var User = $resource('http://172.23.71.219:3000/travel/showStatus', { id: userInfo.baseInfo.userName });
            User.query({}, function(leaveRecords) {
                if (userInfo.baseInfo.office < 3) {
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
                }
                $(document).ready(function() {
                    var index = leaveRecords.length;
                    for (var i = 0; i <= index - 1; i++) {

                        switch (leaveRecords[i].r_status) {
                            case 0:
                                leaveRecords[i].r_status = "待审批";
                                break;
                            case 1:
                                leaveRecords[i].r_status = "拒绝";
                                break;
                            case 2:
                                leaveRecords[i].r_status = "通过";
                                break;
                            default:
                                leaveRecords[i].r_status = "待审批";
                                break;
                        };
                    }
                    $('#example1').dataTable({
                        "data": leaveRecords,
                        "columns": [{
                            data: 'r_date'
                        }, {
                            data: 'r_start'
                        }, {
                            data: 'r_end'
                        }, {
                            data: 'r_day'
                        }, {
                            data: 'r_status'
                        }, {
                            data: 'r_destination'
                        }, {
                            data: 'r_status_dm'
                        }, {
                            data: 'r_status_dgm'
                        }, {
                            data: 'r_status_gm'
                        }],
                        "columnDefs": [{
                            "targets": [1, 2, 6, 7, 8],
                            "visible": false
                        }]
                    });

                    $(".sidebar-menu").find("li .active").removeClass('active');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").attr('class', 'active');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 3 + ")").attr('class', 'active');

                    var trElements = $("#example1 tbody tr");
                    console.log($("#example1").outerHeight());
                    trElements.attr("href", "#target");
                    trElements.attr("data-uk-smooth-scroll", "{offset: -300}");

                    $('#example1 tbody').on('click', 'tr', function() {
                        $('#example1 .active').toggleClass('active');
                        $(".timeline li .timeline-item .timeline-body").html("");
                        $(".timeline li span i").html("");

                        var table = $('#example1').DataTable();
                        $(this).toggleClass('active');
                        var singleData = table.rows('.active').data()[0];

                        $(".timeline li:eq(" + 0 + ") span i").html(singleData.r_date);
                        $(".timeline li:eq(" + 1 + ") span i").html(singleData.r_date);
                        if (singleData.r_status_dm == '0') {
                            $(".timeline li:eq(" + 2 + ")").children('i').attr("class", "fa fa-clock-o bg-gray");
                            $(".timeline li:eq(" + 2 + ") .timeline-item .timeline-body").html("正在等待部门经理审批...");

                        } else if (singleData.r_status_dm == '1') {
                            $(".timeline li:eq(" + 2 + ")").children('i').attr("class", "fa fa-remove bg-maroon");
                            $(".timeline li:eq(" + 2 + ") .timeline-item .timeline-body").html("部门经理审批已拒绝你的申请...");

                        } else {
                            $(".timeline li:eq(" + 2 + ")").children('i').attr("class", "fa fa-check bg-blue");
                            $(".timeline li:eq(" + 2 + ") .timeline-item .timeline-body").html("部门经理审批已通过你的申请...");
                            $(".timeline li:eq(" + 2 + ") span i").html(singleData.r_status_dm);
                        }
                        if (singleData.r_status_dgm == '0') {
                            $(".timeline li:eq(" + 3 + ")").children('i').attr("class", "fa fa-clock-o bg-gray");
                            $(".timeline li:eq(" + 3 + ") .timeline-item .timeline-body").html("正在等待副总经理审批...");
                        } else if (singleData.r_status_dgm == '1') {
                            $(".timeline li:eq(" + 3 + ")").children('i').attr("class", "fa fa-remove bg-maroon");
                            $(".timeline li:eq(" + 3 + ") .timeline-item .timeline-body").html("副总经理审批已拒绝你的申请...");
                        } else {
                            $(".timeline li:eq(" + 3 + ")").children('i').attr("class", "fa fa-check bg-blue");
                            $(".timeline li:eq(" + 3 + ") .timeline-item .timeline-body").html("副总经理审批已通过你的申请...");
                            $(".timeline li:eq(" + 3 + ") span i").html(singleData.r_status_dgm);
                        }
                        if (singleData.r_status_gm == '0') {
                            $(".timeline li:eq(" + 4 + ")").children('i').attr("class", "fa fa-clock-o bg-gray");
                            $(".timeline li:eq(" + 4 + ") .timeline-item .timeline-body").html("正在等待总经理审批...");
                        } else if (singleData.r_status_gm == '1') {
                            $(".timeline li:eq(" + 4 + ")").children('i').attr("class", "fa fa-remove bg-maroon");
                            $(".timeline li:eq(" + 4 + ") .timeline-item .timeline-body").html("总经理审批已拒绝你的申请...");
                        } else {
                            $(".timeline li:eq(" + 4 + ")").children('i').attr("class", "fa fa-check bg-blue");
                            $(".timeline li:eq(" + 4 + ") .timeline-item .timeline-body").html("总经理审批已通过你的申请...");
                            $(".timeline li:eq(" + 4 + ") span i").html(singleData.r_status_gm);
                        }
                        if (singleData.r_status == '待审批') {
                            $(".timeline li:eq(" + 5 + ")").children('i').attr("class", "fa fa-clock-o bg-gray");
                            $(".timeline li:eq(" + 5 + ") .timeline-item .timeline-body").html("你的申请的最终状态为待审批...");
                        } else if (singleData.r_status == '拒绝') {
                            $(".timeline li:eq(" + 5 + ")").children('i').attr("class", "fa fa-remove bg-maroon");
                            $(".timeline li:eq(" + 5 + ") .timeline-item .timeline-body").html("你的申请的最终状态为已拒绝...");
                        } else {
                            $(".timeline li:eq(" + 5 + ")").children('i').attr("class", "fa fa-check bg-blue");
                            $(".timeline li:eq(" + 5 + ") .timeline-item .timeline-body").html("你的申请的最终状态为通过...");
                        }
                        console.log($("div.hidden"));
                        $("div.hidden").removeClass("hidden ");
                    });
                });
            });
        }
    ]);
