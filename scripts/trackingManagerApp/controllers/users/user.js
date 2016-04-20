(function () {
    var userModule = angular.module('TrackingManagerApp.Controllers.Users.User', ['TrackingManagerApp.Commands.UserCommands']);

    userModule.controller('UserController', ['$scope', 'UserCommands', function ($scope, UserCommands) {

        $scope.heading = 'Welcome guest. Login or register.';

        $scope.login = function login() {
            UserCommands.loginUser($scope.user);
        }

        $scope.register = function register() {
            UserCommands.registerUser($scope.newUser);
        }
    } ]);
})();