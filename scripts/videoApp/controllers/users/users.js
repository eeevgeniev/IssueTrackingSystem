(function () {
    angular.module('VideoApp.Controllers.User', [])
    .controller('UserController', ['$scope', function ($scope) {

        $scope.heading = "Welcome guest. Login or register."

        $scope.login = function login() {
            console.log(JSON.stringify($scope.user));
        }

        $scope.register = function register() {
            console.log(JSON.stringify($scope.user));
        };
    } ]);
})();