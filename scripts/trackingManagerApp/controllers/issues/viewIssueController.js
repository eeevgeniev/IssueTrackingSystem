(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.viewIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.projectServices']);

    issuesModule.controller('ViewIssueController', ['$scope', '$q', '$filter', 'issueServices', 'projectServices',
        function ($scope, $q, $filter, issueServices, projectServices) {
            $scope.title = 'View Issue',
            promise = issueServices.getFilteredIssue();

            promise.then(function success(issue) {
                $scope.issue = issue;

                $scope.isUserAssignee = issueServices.isUserIssueAssignee(issue.Assignee.Id);

                var projectPromise = projectServices.getProjectById($scope.issue.Project.Id);

                projectPromise.then(function success(project) {
                    $scope.isUserProjectLeader = projectServices.isProjectLeader(project.Lead.Id)
                })
            });

            $scope.changeStatus = function changeStatus(event) {
                var statusId = $(event.target).attr('status-id');
                issueServices.changeIssueStatus(statusId);
            }
        }]);
})();