
angular.module('chatrooms')
    .controller('RoomsController', ["$scope", 'roomService', function($scope, roomService) {

        var onCreateRoomSuccess = function(data) {
            if (data) {
                console.log("room " + data.name + " was created");
                $scope.createError = '';
                roomService.getRooms().then(function(data) {
                    $scope.rooms = data || [];
                });
            }
        };

        var onCreateRoomError = function(error) {
            // display error message next to text box
            $scope.createError = error.data;
            console.log(error.data);
        };

        roomService.getRooms().then(function(data) {
            $scope.rooms = data || [];
        });

        $scope.createRoom = function(name) {
            console.log("creating room " + name);
            roomService.createRoom(name).then(onCreateRoomSuccess, onCreateRoomError);
        };
    }]);
