angular.module('loginPage')
.component('loginPage',{
  templateUrl:'login-page/login-page.template.html',
  controller:['$sessionStorage','userRestful','userInfo',
    function loginPageController($sessionStorage,userRestful,userInfo){
      this.goMainPage=function(){

          userRestful.query({loginname:this.loginname,password:this.password},function(user){
          
          userInfo.baseInfo.userName=user[0].loginname;
          userInfo.baseInfo.office=user[0].office;
          userInfo.baseInfo.department=user[0].department;
          userInfo.baseInfo.name=user[0].name;
          userInfo.baseInfo.year_leave_left=user[0].year_leave_left;
          userInfo.baseInfo.year_leave_total=user[0].year_leave_total;
          //跳转到主页面！
          console.log('sessionStorage.userInfo:');
          $sessionStorage.userInfo=userInfo;
          console.log($sessionStorage.userInfo);
          window.location.href="#!/mainPage/";
        });

      }

    }
  ]

});
