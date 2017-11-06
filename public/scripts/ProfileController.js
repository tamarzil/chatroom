
angular.module('chatrooms')
    .controller('ProfileController', ["$location", "$scope", "$http", "$rootScope",
        function($location, $scope, $http, $rootScope) {
            $scope.logout = function () {
                $http.post('/logout', {}).then(function () {
                    $rootScope.currentUser = null;
                    $location.path('/login');
                });
            }
        }]);