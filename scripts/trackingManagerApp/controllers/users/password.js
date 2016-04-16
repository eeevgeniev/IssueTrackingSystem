(function () {
    var userPassword = angular.module('TrackingManagerApp.Controllers.Users.Password', ['TrackingManagerApp.Commands.UserCommands']);

    userPassword.controller('PasswordController', ['$scope', 'UserCommands', function ($scope, UserCommands) {

        $scope.heading = 'Change Password.';

        $scope.change = function change() {
            UserCommands.changePassword($scope.user);
        }
    }]);
})();