(function () {
    var dashboardModule = angular.module('TrackingManagerApp.Controllers.Users.Dashboard', ['TrackingManagerApp.Commands.UserCommands']);

    dashboardModule.controller('DashboardController', ['$scope', '$q', 'UserCommands', function ($scope, $q, UserCommands) {

        var promise = UserCommands.getUserIssues(0, 100, 'title');

        promise.then(function success(response) {
            $scope.issues = response.data.issues;
        }, function error(response) {
            console.log(response);
        });

    }]);
})();