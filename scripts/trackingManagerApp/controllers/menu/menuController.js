(function () {
    var menuModule = angular.module('trackingManagerApp.controllers.issues.menuController',
        ['trackingManagerApp.services.commands.userServices', 'trackingManagerApp.services.commands.localUserServices']);

    menuModule.controller('MenuController', ['$scope', '$timeout', 'userServices', 'localUserServices', 'UserLoggedLogout',
        function ($scope, $timeout, userServices, localUserServices, UserLoggedLogout) {
            $scope.isUserLogin = localUserServices.isUserRegistered();

            $scope.$on(UserLoggedLogout, function () {
                $timeout(function () {
                    $scope.isUserLogin = localUserServices.isUserRegistered();
                })
            });
        }]);
})();