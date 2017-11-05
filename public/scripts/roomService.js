angular.module('chatrooms')
    .factory('roomService', ['$http', function($http) {

        const getRoomById = function(id) {
            return $http.get('/api/rooms/' + id)
                .then(function(response){
                    return response.data;
                });
        };

        const getRooms = function() {
            return $http.get('/api/rooms')
                .then(function(response){
                    return response.data;
                });
        };

        const createRoom = function(name) {
            return $http.post('/api/rooms', { name: name })
                .then(function(response){
                    return response.data;
                });
        };


        return {
            getRoom: getRoomById,
            getRooms: getRooms,
            createRoom: createRoom
        };
    }]);