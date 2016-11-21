angular.module('loginPage')
  .component('loginPage',{
    templateUrl:'login-page/login-page.template.html',
    controller:
      function loginPageController(){
        this.goMainPage=function(){
          window.location.href="#!/main-page/"+this.userName;
        }
      }
});
