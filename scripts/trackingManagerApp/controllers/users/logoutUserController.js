(function () {
    var userLogout = angular.module('trackingManagerApp.controllers.users.logoutUserController',
    ['trackingManagerApp.services.commands.userServices']);

    userLogout.controller('LogoutUserController', ['userServices', function (userService) {
        userService.logoutUser();
    }]);
})();