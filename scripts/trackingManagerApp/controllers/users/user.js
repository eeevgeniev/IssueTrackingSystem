(function () {
    var userModule = angular.module('TrackingManagerApp.Controllers.Users.User', ['TrackingManagerApp.Commands.UserCommands']);

    userModule.controller('UserController', ['$scope', 'Commands', function ($scope, Commands) {

        $scope.heading = 'Welcome guest. Login or register.';

        $scope.login = function login() {
            Commands.loginUser($scope.user);
        }

        $scope.register = function register() {
            Commands.registerUser($scope.newUser);
        };
    } ]);
})();