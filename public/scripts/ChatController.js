
angular.module('chatrooms')
    .controller('ChatController', ["$scope", "$rootScope", "$routeParams", "$location", "$window", "socketWrapper", "roomService",
        function($scope, $rootScope, $routeParams, $location, $window, socketWrapper, roomService) {

            $scope.chatHistory = [];
            $scope.msgList = [];
            $scope.participants = [];

            var nickname = $rootScope.currentUser.nickname;

            roomService.getRoom($routeParams.id).then(function(data) {   // check route param for validity
                var chatroom = data;
                $scope.chatroom = chatroom;    // check that room isn't null
                console.log($scope.chatroom.chatHistory);
                socketWrapper.emit('joinRoom', { nickname: nickname, room: chatroom.name });
            }).catch(function(err) {
                console.log(err);
                $location.path('/rooms');
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
                console.log('got post: ' + data.message);
                $scope.msgList.push({ nickname: data.nickname, message: data.message});
            });

            $scope.send = function(msgContent) {
                var chatroom = $scope.chatroom;
                console.log("user sent msg: " + msgContent);
                socketWrapper.emit('send', { nickname: nickname, message: msgContent, room: { id: chatroom.id, name: chatroom.name } });
                $scope.msgContent = "";
            };

            $scope.leave = function() {
                var chatroom = $scope.chatroom;
                console.log("user is asking to leave room: " + chatroom.name);
                socketWrapper.emit('leaveRoom', { nickname: nickname, room: chatroom.name });
                $location.path('/rooms');
            };

            $scope.getType = function(index, msgList) {
                var msgNickname = msgList[index].nickname;
                console.log(nickname);
                return msgNickname.length > 0 ?
                    (msgNickname == $rootScope.currentUser.nickname ? 'mine' : '') : 'info';
            };
        }]);
