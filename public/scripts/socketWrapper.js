
angular.module('chatrooms')
    .factory('socketWrapper', function (socketFactory) {
        return socketFactory();
    });