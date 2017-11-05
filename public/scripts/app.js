
angular.module('chatrooms', ['ngRoute', 'btford.socket-io'])
    .config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {

            $locationProvider.hashPrefix('');
            // $locationProvider.html5Mode({
            //     enabled: true,
            //     requireBase: false
            // });

            $routeProvider
                .when("/login", {
                    templateUrl: "login.html",
                    controller: "LoginController"
                })
                .when("/rooms", {
                    templateUrl: "rooms.html",
                    controller: "RoomsController"
                })
                .when("/chat/:id", {
                    templateUrl: "chat.html",
                    controller: "ChatController"
                })
                .otherwise('/login')
        }]);