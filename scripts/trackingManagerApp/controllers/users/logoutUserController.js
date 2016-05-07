(function () {
    var userLogout = angular.module('trackingManagerApp.controllers.users.logoutUserController',
    ['trackingManagerApp.services.commands.localUserServices']);

    userLogout.controller('LogoutUserController', ['localUserServices', function (localUserServices) {
        localUserServices.logoutUser();
    }]);
})();