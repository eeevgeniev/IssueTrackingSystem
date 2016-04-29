(function () {
    var dashboardModule = angular.module('trackingManagerApp.controllers.users.dashboardController', 
    ['trackingManagerApp.services.commands.userServices']);

    dashboardModule.controller('DashboardController', ['$scope', '$q', 'userServices', function ($scope, $q, userServices) {

        var promise = userServices.getUserIssues(10, 1, 'Title');

        promise.then(function success(response) {
            $scope.issues = response.data.Issues;
        }, function error(response) {
            console.log(response);
        });

    }]);
})();