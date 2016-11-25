angular.module('core.userInfo')
.service('userInfo',SharedData);

function SharedData() {

  this.baseInfo = {
    userName: 'loginname',
    office:'神龍堂',
    department:'玄武门',
    name:'雄霸',
    year_leave_left:'10'
  }

}
