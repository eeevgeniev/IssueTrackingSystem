(function () {
    var menuModule = angular.module('trackingManagerApp.controllers.issues.menuController', ['trackingManagerApp.services.commands.userServices']);

    menuModule.controller('MenuController', ['$scope', 'userServices', function ($scope, userServices) {
        $scope.isUserLogin = userServices.isUserRegistered();

        $scope.$on('userLoggedLogout', function () {
            $scope.isUserLogin = userServices.isUserRegistered();
        });
    }]);
})();