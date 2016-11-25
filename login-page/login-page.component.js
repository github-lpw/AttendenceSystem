angular.module('loginPage')
  .component('loginPage',{
    templateUrl:'login-page/login-page.template.html',
    controller:['userRestful','userInfo',
      function loginPageController(userRestful,userInfo){
        this.goMainPage=function(){

            userRestful.query({loginname:this.loginname,password:this.password},function(user){

            userInfo.baseInfo.userName=user[0].loginname;
            userInfo.baseInfo.office=user[0].office;
            userInfo.baseInfo.department=user[0].department;
            userInfo.baseInfo.name=user[0].name;
            userInfo.baseInfo.year_leave_left=user[0].year_leave_lefts;

            //跳转到主页面！
            window.location.href="#!/mainPage/";
          });

        }

      }
    ]

});
