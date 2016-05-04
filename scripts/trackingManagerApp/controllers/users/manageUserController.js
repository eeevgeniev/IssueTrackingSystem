(function () {
    var userModule = angular.module('trackingManagerApp.controllers.users.manageUserController',
    ['trackingManagerApp.services.commands.userServices']);

    userModule.controller('ManageUserController', ['$scope', 'userServices', function ($scope, userServices) {

        $scope.heading = 'Welcome guest. Login or register.';

        $scope.login = function login() {
            userServices.loginUser($scope.user);
        }

        $scope.register = function register() {
            userServices.registerUser($scope.newUser);
        }
    }]);
})();