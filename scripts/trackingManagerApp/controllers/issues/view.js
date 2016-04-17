(function () {
    var issuesModule = angular.module('TrackingManagerApp.Controllers.Issues.ViewIssue', ['TrackingManagerApp.Commands.IssuesCommands']);

    issuesModule.controller('ViewIssueController', ['$scope', '$q', 'IssueCommands', function ($scope, $q, IssueCommands) {

        var promise = IssueCommands.getIssue()

        promise.then(function success(response) {
            $scope.issue = response.data;
        }, function error(response) {

        }); 
    }]);
})();