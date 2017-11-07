
angular.module('chatrooms', ['ngRoute', 'btford.socket-io', 'ui.bootstrap', 'luegg.directives'])
    .config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {

            $locationProvider.hashPrefix('');

            $routeProvider
                .when("/login", {
                    templateUrl: "login.html",
                    controller: "LoginController"
                })
                .when("/signup", {
                    templateUrl: "register.html",
                    controller: "RegisterController"
                })
                .when("/rooms", {
                    templateUrl: "rooms.html",
                    controller: "RoomsController",
                    resolve: {
                        authenticate: checkLoggedin
                    }
                })
                .when("/chat/:id", {
                    templateUrl: "chat.html",
                    controller: "ChatController",
                    resolve: {
                        authenticate: checkLoggedin
                    }
                })
                .otherwise('/login')
        }]);

function checkLoggedin($q, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').then(function (response) {
        var user = response.data;
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            //User is not Authenticated
            deferred.reject();
            $rootScope.currentUser = null;
            $location.path('/login');
        }
    }, function (response) {
        // login failed
        $scope.loginError = response.statusText;
    });

    return deferred.promise;

}