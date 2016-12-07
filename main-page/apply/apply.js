angular.module("mainPage")
.controller("newLeaveController",['$resource','$scope','userInfo',
  function($resource,$scope,userInfo){
    $(function () {
        //Date range picker
        // $('#reservation').daterangepicker();
        //Date range picker with time picker
        // $('#reservationtime').daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A'});
        //Date range as a button
        $('#reservationtime').daterangepicker(
                {
                    timePicker: true,
                    timePickerIncrement: 30,
                    format: 'YYYY-MM-DD HH:mm',
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    startDate: moment().subtract(29, 'days'),
                    endDate: moment()
                },
                function (start, end) {

                  //处理日期格式
                  var startFormat=start.format('YYYY-MM-DD HH:mm');
                  var endFormat=end.format('YYYY-MM-DD HH:mm');

                  //选出请假时间的当时时间，只有小时
                  var selectStartHour=startFormat.toString().split(" ")[1].split(":")[0];
                  var selectEndHour=endFormat.toString().split(" ")[1].split(":")[0];

                  //设置指定日期
                  var startHour="";
                  var endHour="";
                  if(Number(selectStartHour)>=0 && Number(selectStartHour)<=12){
                    startHour="00:00"
                  }
                  else{
                    startHour="12:00";
                  }

                  if(Number(selectEndHour)>=0 && Number(selectEndHour)<=12)
                  {
                    endHour="12:00";
                  }
                  else{
                    endHour="24:00";
                  }

                  $scope.leaveApplyObj.startDate=start.format('YYYY-MM-DD')+" "+startHour;
                  $scope.leaveApplyObj.endDate=end.format('YYYY-MM-DD')+" " + endHour;

                }
        );

        //Date picker
        $('#datepicker').datepicker({
            autoclose: true
        });

    });

    $.widget.bridge('uibutton', $.ui.button);

    $scope.reviewClick=function(){
      console.log("预览");
      console.log($scope.leaveApplyObj.leaveType);
      console.log($scope.leaveApplyObj.isDelay);
      console.log($scope.leaveApplyObj.isCrash);
      console.log($scope.leaveApplyObj.desp);
      console.log($scope.leaveApplyObj.startDate);
      console.log($scope.leaveApplyObj.endDate);

    }

    $scope.submitApplyClick=function(){
      console.log("提交");
      console.log($scope.leaveApplyObj.leaveType);
      console.log($scope.leaveApplyObj.isDelay);
      console.log($scope.leaveApplyObj.isCrash);
      console.log($scope.leaveApplyObj.desp);
      console.log($scope.leaveApplyObj.startDate);
      console.log($scope.leaveApplyObj.endDate);

      var saveApply=$resource("http://172.23.71.219:3000/leave/apply",{
        id:userInfo.baseInfo.userName,
        type:$scope.leaveApplyObj.leaveType,
        start:$scope.leaveApplyObj.startDate,
        end:$scope.leaveApplyObj.endDate,
        desp:$scope.leaveApplyObj.desp,
        delay:$scope.leaveApplyObj.isDelay,
        crash:$scope.leaveApplyObj.isCrash});

      saveApply.save(function(res){
        console.log("发送成功");
      });

    }

    $scope.leaveApplyObj={
      leaveType:7,
      startDate:"2016-12-01 00:00",
      endDate:"2016-12-02 00:00",
      isDelay:1,
      isCrash:1,
      desp:"傻逼"
    }



  }

]);

angular.module("mainPage")
.controller("newGoOutController",['$resource','$scope','userInfo',
  function($resource,$scope,userInfo){
      $(function () {

      	//Date range as a button
      	$('#reservationtime').daterangepicker(
          {
          	  timePicker: true,
              timePickerIncrement: 30,
              format: 'YYYY-MM-DD HH:mm',
              ranges: {
                  'Today': [moment(), moment()],
                  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              },
              startDate: moment().subtract(29, 'days'),
              endDate: moment()
          },

		      function (start, end) {
		          //处理日期格式
		          var startFormat=start.format('YYYY-MM-DD HH:mm');
		          var endFormat=end.format('YYYY-MM-DD HH:mm');

		          //选出请假时间的当时时间，只有小时
		          var selectStartHour=startFormat.toString().split(" ")[1].split(":")[0];
		          var selectEndHour=endFormat.toString().split(" ")[1].split(":")[0];

		          //设置指定日期
		          var startHour="";
		          var endHour="";
		          if(Number(selectStartHour)>=0 && Number(selectStartHour)<=12){
		            startHour="00:00"
		          }
		          else{
		            startHour="12:00";
		          }

		          if(Number(selectEndHour)>=0 && Number(selectEndHour)<=12)
		          {
		            endHour="12:00";
		          }
		          else{
		            endHour="24:00";
		          }

		          $scope.leaveApplyObj.startDate=start.format('YYYY-MM-DD')+" "+startHour;
		          $scope.leaveApplyObj.endDate=end.format('YYYY-MM-DD')+" " + endHour;
		      }

      	);

	      //Date picker
	      $('#datepicker').datepicker({
	          autoclose: true
	      });

      });

  		$.widget.bridge('uibutton', $.ui.button);

			$scope.leaveApplyObj={
			  startDate:"2016-12-01 00:00",
			  endDate:"2016-12-02 00:00",
			  isDelay:1,
			  isCrash:1,
			  desp:"出差",
        dest:"天津大学软件学院"
			}

			$scope.reviewClick=function(){
			  console.log("预览");
			  console.log($scope.leaveApplyObj.dest);
			  console.log($scope.leaveApplyObj.isDelay);
			  console.log($scope.leaveApplyObj.isCrash);
			  console.log($scope.leaveApplyObj.desp);
			  console.log($scope.leaveApplyObj.startDate);
			  console.log($scope.leaveApplyObj.endDate);
			}

			$scope.submitApplyClick=function(){
			  console.log("提交");
			  console.log($scope.leaveApplyObj.dest);
			  console.log($scope.leaveApplyObj.isDelay);
			  console.log($scope.leaveApplyObj.isCrash);
			  console.log($scope.leaveApplyObj.desp);
			  console.log($scope.leaveApplyObj.startDate);
			  console.log($scope.leaveApplyObj.endDate);

		  	var saveApply=$resource("http://172.23.71.219:3000/travel/apply",{
		    id:userInfo.baseInfo.userName,
        dest:$scope.leaveApplyObj.dest,
        desp:$scope.leaveApplyObj.desp,
		    start:$scope.leaveApplyObj.startDate,
		    end:$scope.leaveApplyObj.endDate,
		    delay:$scope.leaveApplyObj.isDelay,
		    crash:$scope.leaveApplyObj.isCrash});

		  	saveApply.save(function(res){
            console.log("发送成功");
        });
			}


  }
]);
