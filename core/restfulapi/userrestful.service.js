angular.module('core.userRestful')
.factory('userRestful',['$resource',
  function($resource){
    return $resource('http://172.23.197.191:3000/users/login',{loginname:'lpw',password:'123456'});
  }
]);
