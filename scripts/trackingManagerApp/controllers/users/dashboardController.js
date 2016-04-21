(function () {
    var dashboardModule = angular.module('trackingManagerApp.controllers.users.dashboardController', 
    ['trackingManagerApp.services.commands.userServices']);

    dashboardModule.controller('DashboardController', ['$scope', '$q', 'userServices', function ($scope, $q, userServices) {

        var promise = userServices.getUserIssues(0, 100, 'title');

        promise.then(function success(response) {
            $scope.issues = response.data.issues;
        }, function error(response) {
            console.log(response);
        });

    }]);
})();