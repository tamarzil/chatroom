
angular.module('chatrooms')
    .controller('LoginController', ["$location", "$scope", "$http", "$rootScope",
        function($location, $scope, $http, $rootScope) {

            $scope.loginUser = function(user) {
                $http.post('/login', user).then(function(response) {
                    // login success
                    $rootScope.currentUser = response.data;
                    $scope.loginError = null;
                    $location.path('/rooms');
                }, function(response) {
                    // login failed
                    $scope.loginError = response.statusText;
                });
            };
        }]);