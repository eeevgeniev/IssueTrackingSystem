﻿(function () {
    var userPassword = angular.module('trackingManagerApp.controllers.users.changePasswordController', 
    ['trackingManagerApp.services.commands.userServices']);

    userPassword.controller('ChangePasswordController', ['$scope', 'userServices', function ($scope, userServices) {

        $scope.heading = 'Change Password.';

        $scope.change = function change() {
            userServices.changePassword($scope.user);
        }
    }]);
})();