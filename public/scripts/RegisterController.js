
angular.module('chatrooms')
    .controller('RegisterController', ["$location", "$scope", "$http", "$rootScope",
        function($location, $scope, $http, $rootScope) {
            $scope.signupUser = function(user) {
                $http.post('/signup', user).then(function(response) {
                    if (response.data) {
                        if (response.data.success) {
                            $rootScope.currentUser = response.data.user;
                            $scope.signupError = null;
                            $location.path('/rooms');
                        } else {
                            $scope.signupError = response.data.reason;
                        }
                    }
                }, function(response) {
                    // login failed
                    $scope.signupError = response.statusText;
                });
            }
        }]);