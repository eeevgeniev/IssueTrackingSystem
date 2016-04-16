(function () {
    var userPassword = angular.module('TrackingManagerApp.Controllers.Users.Password', ['TrackingManagerApp.Commands.UserCommands']);

    userPassword.controller('PasswordController', ['$scope', 'Commands', function ($scope, Commands) {

        $scope.heading = 'Change Password.';

        $scope.change = function change() {
            Commands.changePassword($scope.user);
        }
    }]);
})();