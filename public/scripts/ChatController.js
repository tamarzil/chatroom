
angular.module('chatrooms')
    .controller('ChatController', ["$scope", "$rootScope", "$routeParams", "$location", "socketWrapper", "roomService",
        function($scope, $rootScope, $routeParams, $location, socketWrapper, roomService) {

            $scope.msgList = [];
            $scope.participants = [];

            if (!$rootScope.nickname)
                $rootScope.nickname = "moshe" + Math.floor((Math.random() * 100) + 1); // get from login data

            var nickname = $rootScope.nickname;

            roomService.getRoom($routeParams.id).then(function(data) {   // check route param for validity
                var chatroom = data;
                $scope.chatroom = chatroom;    // check that room isn't null
                socketWrapper.emit('joinRoom', { nickname: nickname, room: chatroom.name });
            });

            socketWrapper.on('roomDetails', function (data) {
                console.log("got room details. num users: " + data.participants.length);
                $scope.participants = data.participants;
            });

            socketWrapper.on('userJoined', function (data) {
                $scope.msgList.push({ nickname: '', message: data.nickname + ' has joined the chat'});
                $scope.participants = data.participants;
            });

            socketWrapper.on('userLeft', function (data) {
                $scope.msgList.push({ nickname: '', message: data.nickname + ' has left the chat'});
                $scope.participants = data.participants;
            });

            socketWrapper.on('post', function (data) {
                $scope.msgList.push({ nickname: data.nickname, message: data.message});
            });

            $scope.send = function(msgContent) {
                var chatroom = $scope.chatroom;
                console.log("user sent msg: " + msgContent);
                socketWrapper.emit('send', { nickname: nickname, message: msgContent, room: chatroom.name });
            };

            $scope.leave = function() {
                var chatroom = $scope.chatroom;
                console.log("user is asking to leave room: " + chatroom.name);
                socketWrapper.emit('leaveRoom', { nickname: nickname, room: chatroom.name });
                $location.path('/rooms');
            };

        }]);