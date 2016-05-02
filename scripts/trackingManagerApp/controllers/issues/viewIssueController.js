(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.viewIssueController',
    ['trackingManagerApp.services.commands.issueServices']);

    issuesModule.controller('ViewIssueController', ['$scope', '$q', '$filter', 'issueServices',
        function ($scope, $q, $filter, issueServices) {

            var promise = issueServices.getFilteredIssue()

            promise.then(function success(issue) {
                $scope.issue = issue;
                $scope.issue.DueDate = $filter('date')(issue.DueDate, 'hh:mm dd/MM/yyyy');
            });

            $scope.changeStatus = function changeStatus(event) {
                var statusId = $(event.target).attr('status-id');
                issueServices.changeIssueStatus(statusId);
            }
        }]);
})();