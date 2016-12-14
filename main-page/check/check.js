angular.module('mainPage')
    .controller('leaveCheckController', ['$sessionStorage', '$resource',
        function leaveCheckController($sessionStorage, $resource) {
            var userInfo = $sessionStorage.userInfo;
            var User = $resource('http://172.23.159.61:3000/leave/showApplys', { office: $sessionStorage.userInfo.baseInfo.office, department: $sessionStorage.userInfo.baseInfo.department });
            User.query({}, function(leaveRecords) {
                if (userInfo.baseInfo.office < 3) {
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
                }
                $(document).ready(function() {
                    var index = leaveRecords.length;
                    for (var i = 0; i <= index - 1; i++) {
                        switch (leaveRecords[i].office) {
                            case 1:
                                leaveRecords[i].office = "普通员工";
                                break;
                            case 2:
                                leaveRecords[i].office = "项目经理";
                                break;
                            case 3:
                                leaveRecords[i].office = "部门经理";
                                break;
                            case 4:
                                leaveRecords[i].office = "副总经理";
                                break;
                            case 5:
                                leaveRecords[i].office = "总经理";
                                break;
                            default:
                                leaveRecords[i].office = "普通员工";
                                break;
                        };
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
                        switch (leaveRecords[i].department) {
                            case "1":
                                leaveRecords[i].department = "总经理";
                                break;
                            case "2":
                                leaveRecords[i].department = "综合管理部";
                                break;
                            case "3":
                                leaveRecords[i].department = "财务部";
                                break;
                            case "4":
                                leaveRecords[i].department = "行政部";
                                break;
                            case "5":
                                leaveRecords[i].department = "人力资源部";
                                break;
                            case "6":
                                leaveRecords[i].department = "技术部";
                                break;
                            case "7":
                                leaveRecords[i].department = "客服部";
                                break;
                            case "8":
                                leaveRecords[i].department = "销售部";
                                break;
                            case "9":
                                leaveRecords[i].department = "工程部";
                                break;
                            case "10":
                                leaveRecords[i].department = "企划部";
                                break;
                            case "11":
                                leaveRecords[i].department = "市场部";
                                break;
                            case "12":
                                leaveRecords[i].department = "采购部";
                                break;
                            case "13":
                                leaveRecords[i].department = "保管部";
                                break;
                            case "14":
                                leaveRecords[i].department = "制造部";
                                break;
                        };
                        switch (leaveRecords[i].l_delay) {
                            case 0:
                                leaveRecords[i].l_delay = "否";
                                break;
                            case 1:
                                leaveRecords[i].l_delay = "是";
                                break;
                            default:
                                leaveRecords[i].l_delay = "是";
                                break;
                        };
                        switch (leaveRecords[i].l_crash) {
                            case '0':
                                leaveRecords[i].l_crash = "否";
                                break;
                            case '1':
                                leaveRecords[i].l_crash = "是";
                                break;
                        };
                    }
                    $('#example1').dataTable({
                        "data": leaveRecords,
                        "columns": [{
                            data: 'l_staff'
                        }, {
                            data: 'name'
                        }, {
                            data: 'department'
                        }, {
                            data: 'office'
                        }, {
                            data: 'l_type'
                        }, {
                            data: 'l_date'
                        }, {
                            data: 'l_start'
                        }, {
                            data: 'l_end'
                        }, {
                            data: 'l_delay'
                        }, {
                            data: 'l_status'
                        }, {
                            data: 'l_crash'
                        }, {
                            data: 'l_day'
                        }, {
                            data: 'l_desp'
                        }, {
                            data: 'l_id'
                        }],
                        "columnDefs": [{
                            "targets": [0, 2, 3, 4, 5, 8, 9, 10, 12, 13],
                            "visible": false
                        }]
                    });
                    $(".sidebar-menu").find("li .active").removeClass('active');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").attr('class', 'active');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'active');

                    var trElements = $("#example1 tbody tr");
                    trElements.attr("ezmodal-target", "#example5");
                    $("#example1 tbody .dataTables_empty").parent().removeAttr("ezmodal-target");

                    $('#example1 tbody').on('click', 'tr', function() {
                        var table = $('#example1').DataTable();
                        $(this).toggleClass('active');
                        if ($("#example1 tbody .active").children("td").attr("class") == "dataTables_empty") {
                            $(this).toggleClass('active');
                        } else {
                            var singleData = table.rows('.active').data()[0];
                            $("#example5 table tr:eq(" + 0 + ")").append('<td>' + singleData.l_id + '</td>');
                            $("#example5 table tr:eq(" + 1 + ")").append('<td>' + singleData.l_staff + '</td>');
                            $("#example5 table tr:eq(" + 2 + ")").append('<td>' + singleData.name + '</td>');
                            $("#example5 table tr:eq(" + 3 + ")").append('<td>' + singleData.department + '</td>');
                            $("#example5 table tr:eq(" + 4 + ")").append('<td>' + singleData.office + '</td>');
                            $("#example5 table tr:eq(" + 5 + ")").append('<td>' + singleData.l_type + '</td>');
                            $("#example5 table tr:eq(" + 6 + ")").append('<td>' + singleData.l_date + '</td>');
                            $("#example5 table tr:eq(" + 7 + ")").append('<td>' + singleData.l_start + '</td>');
                            $("#example5 table tr:eq(" + 8 + ")").append('<td>' + singleData.l_end + '</td>');
                            $("#example5 table tr:eq(" + 9 + ")").append('<td>' + singleData.l_delay + '</td>');
                            $("#example5 table tr:eq(" + 10 + ")").append('<td>' + singleData.l_status + '</td>');
                            $("#example5 table tr:eq(" + 11 + ")").append('<td>' + singleData.l_crash + '</td>');
                            $("#example5 table tr:eq(" + 12 + ")").append('<td>' + singleData.l_day + '</td>');
                            $("#example5 table tr:eq(" + 13 + ")").append('<td>' + singleData.l_desp + '</td>');
                        }

                    });
                    $('div .box-body').on('click', function() {
                        var trElements = $("#example1 tbody tr");
                        trElements.attr("ezmodal-target", "#example5");
                        $("#example1 tbody .dataTables_empty").parent().removeAttr("ezmodal-target");
                    });
                    /*pass方法*/
                    $(document).on('click', '[data-pass="ezmodal"]', function() {
                        if ($(this).parent().prev().children("table").length != 0) {
                            var data = $(this).parent().prev().children("table").find("td");
                            if (data[11].textContent == '否') {
                                data[11].textContent = '0';
                            } else {
                                data[11].textContent = '1';
                            }
                            var leaveCheck = $resource('http://172.23.159.61:3000/leave/approval', { id: userInfo.baseInfo.userName, pass: '2', lid: data[0].textContent, office: userInfo.baseInfo.office, day: data[12].textContent, crash: data[11].textContent }).save(function(res) {
                                console.log("已成功审批");
                                $("#callBack").ezmodal('show');
                            });
                            $(this).parent().prev().children("table").find("td").remove();
                            var table = $('#example1').DataTable();
                            table.row($('.active')).remove().draw();

                        } else if ($(this).parent().next().children("table") != 0) {
                            var data = $(this).parent().prev().children("table").find("td");
                            if (data[11].textContent == '否') {
                                data[11].textContent = '0';
                            } else {
                                data[11].textContent = '1';
                            }
                            var leaveCheck = $resource('http://172.23.159.61:3000/leave/approval', { id: userInfo.baseInfo.userName, pass: '2', lid: data[0].textContent, office: userInfo.baseInfo.office, day: data[12].textContent, crash: data[11].textContent }).save(function(res) {
                                console.log("已成功审批");
                                $("#callBack").ezmodal('show');
                            });
                            $(this).parent().next().children("table").find("td").remove();
                            var table = $('#example1').DataTable();
                            table.row($('.active')).remove().draw();
                        }
                        $(this).parent().parent().parent().ezmodal('hide');
                    });
                    /*reject方法*/
                    $(document).on('click', '[data-reject="ezmodal"]', function() {
                        if ($(this).parent().prev().children("table").length != 0) {
                            var data = $(this).parent().prev().children("table").find("td");
                            if (data[11].textContent == '否') {
                                data[11].textContent = '0';
                            } else {
                                data[11].textContent = '1';
                            }
                            var leaveCheck = $resource('http://172.23.159.61:3000/leave/approval', { id: userInfo.baseInfo.userName, pass: '1', lid: data[0].textContent, office: userInfo.baseInfo.office, day: data[12].textContent, crash: data[11].textContent }).save();
                            $(this).parent().prev().children("table").find("td").remove();
                            var table = $('#example1').DataTable();
                            table.row($('.active')).remove().draw();
                        } else if ($(this).parent().next().children("table") != 0) {
                            var data = $(this).parent().prev().children("table").find("td");
                            if (data[11].textContent == '否') {
                                data[11].textContent = '0';
                            } else {
                                data[11].textContent = '1';
                            }
                            var leaveCheck = $resource('http://172.23.159.61:3000/leave/approval', { id: userInfo.baseInfo.userName, pass: '1', lid: data[0].textContent, office: userInfo.baseInfo.office, day: data[12].textContent, crash: data[11].textContent }).save();
                            $(this).parent().next().children("table").find("td").remove();
                            var table = $('#example1').DataTable();
                            table.row($('.active')).remove().draw();
                        }
                        $(this).parent().parent().parent().ezmodal('hide');
                    });
                });
            });
        }
    ]);

angular.module('mainPage')
    .controller('goOutCheckController', ['$sessionStorage', '$resource',
        function goOutCheckController($sessionStorage, $resource) {
            var userInfo = $sessionStorage.userInfo;
            var User = $resource('http://172.23.159.61:3000/travel/showApplys', { office: userInfo.baseInfo.office, department: userInfo.baseInfo.department });
            User.query({}, function(leaveRecords) {
                if (userInfo.baseInfo.office < 3) {
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 0 + ")").attr('class', 'hidden');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'hidden');
                }
                $(document).ready(function() {
                    var index = leaveRecords.length;
                    for (var i = 0; i <= index - 1; i++) {
                        switch (leaveRecords[i].office) {
                            case 1:
                                leaveRecords[i].office = "普通员工";
                                break;
                            case 2:
                                leaveRecords[i].office = "项目经理";
                                break;
                            case 3:
                                leaveRecords[i].office = "部门经理";
                                break;
                            case 4:
                                leaveRecords[i].office = "副总经理";
                                break;
                            case 5:
                                leaveRecords[i].office = "总经理";
                                break;
                            default:
                                leaveRecords[i].office = "普通员工";
                                break;
                        };
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
                        switch (leaveRecords[i].department) {
                            case "1":
                                leaveRecords[i].department = "总经理";
                                break;
                            case "2":
                                leaveRecords[i].department = "综合管理部";
                                break;
                            case "3":
                                leaveRecords[i].department = "财务部";
                                break;
                            case "4":
                                leaveRecords[i].department = "行政部";
                                break;
                            case "5":
                                leaveRecords[i].department = "人力资源部";
                                break;
                            case "6":
                                leaveRecords[i].department = "技术部";
                                break;
                            case "7":
                                leaveRecords[i].department = "客服部";
                                break;
                            case "8":
                                leaveRecords[i].department = "销售部";
                                break;
                            case "9":
                                leaveRecords[i].department = "工程部";
                                break;
                            case "10":
                                leaveRecords[i].department = "企划部";
                                break;
                            case "11":
                                leaveRecords[i].department = "市场部";
                                break;
                            case "12":
                                leaveRecords[i].department = "采购部";
                                break;
                            case "13":
                                leaveRecords[i].department = "保管部";
                                break;
                            case "14":
                                leaveRecords[i].department = "制造部";
                                break;
                        };
                        switch (leaveRecords[i].r_delay) {
                            case 0:
                                leaveRecords[i].r_delay = "否";
                                break;
                            case 1:
                                leaveRecords[i].r_delay = "是";
                                break;
                            default:
                                leaveRecords[i].r_delay = "是";
                                break;
                        };
                        switch (leaveRecords[i].r_crash) {
                            case '0':
                                leaveRecords[i].r_crash = "否";
                                break;
                            case '1':
                                leaveRecords[i].r_crash = "是";
                                break;
                        };
                    }
                    $('#example1').dataTable({
                        "data": leaveRecords,
                        "columns": [{
                            data: 'r_staff'
                        }, {
                            data: 'name'
                        }, {
                            data: 'department'
                        }, {
                            data: 'office'
                        }, {
                            data: 'r_date'
                        }, {
                            data: 'r_start'
                        }, {
                            data: 'r_end'
                        }, {
                            data: 'r_status'
                        }, {
                            data: 'r_delay'
                        }, {
                            data: 'r_crash'
                        }, {
                            data: 'r_day'
                        }, {
                            data: 'r_destination'
                        }, {
                            data: 'r_desp'
                        }, {
                            data: 'r_id'
                        }],
                        "columnDefs": [{
                            "targets": [0, 2, 3, 4, 7, 8, 9, 12, 13],
                            "visible": false
                        }]
                    });
                    $(".sidebar-menu").find("li .active").removeClass('active');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").attr('class', 'active');
                    $(".sidebar-menu").children("li:eq(" + 3 + ")").children('ul').children("li:eq(" + 1 + ")").attr('class', 'active');


                    var trElements = $("#example1 tbody tr");
                    trElements.attr("ezmodal-target", "#example5");
                    $("#example1 tbody .dataTables_empty").parent().removeAttr("ezmodal-target");

                    $('#example1 tbody').on('click', 'tr', function() {
                        var table = $('#example1').DataTable();
                        $(this).toggleClass('active');
                        if ($("#example1 tbody .active").children("td").attr("class") == "dataTables_empty") {
                            $(this).toggleClass('active');
                        } else {
                            var singleData = table.rows('.active').data()[0];
                            $("#example5 table tr:eq(" + 0 + ")").append('<td>' + singleData.r_id + '</td>');
                            $("#example5 table tr:eq(" + 1 + ")").append('<td>' + singleData.r_staff + '</td>');
                            $("#example5 table tr:eq(" + 2 + ")").append('<td>' + singleData.name + '</td>');
                            $("#example5 table tr:eq(" + 3 + ")").append('<td>' + singleData.department + '</td>');
                            $("#example5 table tr:eq(" + 4 + ")").append('<td>' + singleData.office + '</td>');
                            $("#example5 table tr:eq(" + 5 + ")").append('<td>' + singleData.r_start + '</td>');
                            $("#example5 table tr:eq(" + 6 + ")").append('<td>' + singleData.r_end + '</td>');
                            $("#example5 table tr:eq(" + 7 + ")").append('<td>' + singleData.r_delay + '</td>');
                            $("#example5 table tr:eq(" + 8 + ")").append('<td>' + singleData.r_status + '</td>');
                            $("#example5 table tr:eq(" + 9 + ")").append('<td>' + singleData.r_crash + '</td>');
                            $("#example5 table tr:eq(" + 10 + ")").append('<td>' + singleData.r_day + '</td>');
                            $("#example5 table tr:eq(" + 11 + ")").append('<td>' + singleData.r_destination + '</td>');
                            $("#example5 table tr:eq(" + 12 + ")").append('<td>' + singleData.r_desp + '</td>');
                        }
                    });
                    $('div .box-body').on('click', function() {
                        var trElements = $("#example1 tbody tr");
                        trElements.attr("ezmodal-target", "#example5");
                        $("#example1 tbody .dataTables_empty").parent().removeAttr("ezmodal-target");
                    });
                    /*pass方法*/
                    $(document).on('click', '[data-pass="ezmodal"]', function() {
                        if ($(this).parent().prev().children("table").length != 0) {
                            var data = $(this).parent().prev().children("table").find("td");
                            if (data[9].textContent == '否') {
                                data[9].textContent = '0';
                            } else {
                                data[9].textContent = '1';
                            }
                            var leaveCheck = $resource('http://172.23.159.61:3000/travel/approval', { id: userInfo.baseInfo.userName, pass: '2', rid: data[0].textContent, office: userInfo.baseInfo.office, day: data[10].textContent, crash: data[9].textContent }).save();
                            $(this).parent().prev().children("table").find("td").remove();
                            var table = $('#example1').DataTable();
                            table.row($('.active')).remove().draw();
                        } else if ($(this).parent().next().children("table") != 0) {
                            var data = $(this).parent().prev().children("table").find("td");
                            if (data[9].textContent == '否') {
                                data[9].textContent = '0';
                            } else {
                                data[9].textContent = '1';
                            }
                            var leaveCheck = $resource('http://172.23.159.61:3000/travel/approval', { id: userInfo.baseInfo.userName, pass: '2', rid: data[0].textContent, office: userInfo.baseInfo.office, day: data[10].textContent, crash: data[9].textContent }).save();
                            $(this).parent().next().children("table").find("td").remove();
                            var table = $('#example1').DataTable();
                            table.row($('.active')).remove().draw();
                        }
                        $(this).parent().parent().parent().ezmodal('hide');
                    });
                    /*reject方法*/
                    $(document).on('click', '[data-reject="ezmodal"]', function() {

                        if ($(this).parent().prev().children("table").length != 0) {
                            var data = $(this).parent().prev().children("table").find("td");
                            if (data[9].textContent == '否') {
                                data[9].textContent = '0';
                            } else {
                                data[9].textContent = '1';
                            }
                            var leaveCheck = $resource('http://172.23.159.61:3000/travel/approval', { id: userInfo.baseInfo.userName, pass: '1', rid: data[0].textContent, office: userInfo.baseInfo.office, day: data[10].textContent, crash: data[9].textContent }).save();
                            $(this).parent().prev().children("table").find("td").remove();
                            var table = $('#example1').DataTable();
                            table.row($('.active')).remove().draw();
                        } else if ($(this).parent().next().children("table") != 0) {
                            var data = $(this).parent().prev().children("table").find("td");
                            if (data[9].textContent == '否') {
                                data[9].textContent = '0';
                            } else {
                                data[9].textContent = '1';
                            }
                            var leaveCheck = $resource('http://172.23.159.61:3000/travel/approval', { id: userInfo.baseInfo.userName, pass: '1', rid: data[0].textContent, office: userInfo.baseInfo.office, day: data[10].textContent, crash: data[9].textContent }).save();
                            $(this).parent().next().children("table").find("td").remove();
                            var table = $('#example1').DataTable();
                            table.row($('.active')).remove().draw();
                        }
                        $(this).parent().parent().parent().ezmodal('hide');
                    });
                });
            });
        }
    ]);
