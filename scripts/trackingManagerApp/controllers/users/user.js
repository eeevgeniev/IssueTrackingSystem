(function () {
    var userModule = angular.module('TrackingManagerApp.Controllers.Users.User', []);

    userModule.controller('UserController', ['$scope', function ($scope) {

        $scope.title = 'Start page';
        $scope.heading = 'Welcome guest. Login or register.';

        $scope.login = function login() {
            console.log(JSON.stringify($scope.user));
        }

        $scope.register = function register() {
            console.log(JSON.stringify($scope.user));
        };
    }]);
})();