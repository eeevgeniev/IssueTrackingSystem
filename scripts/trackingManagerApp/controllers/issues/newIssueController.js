(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.newIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.userServices',
    'trackingManagerApp.services.commands.projectServices']);

    issuesModule.controller('NewIssueController', ['$scope', '$q', 'issueServices', 'userServices', 'projectServices',
        function ($scope, $q, issueServices, userServices, projectServices) {
            $scope.issue = {},
            userPromise = userServices.getUsers(),
            projectPromise = projectServices.getProjects();

            userPromise.then(function success(result) {
                $scope.users = result;

                $scope.issue.Assignee = $scope.users[0];
            });

            projectPromise.then(function success(result) {
                $scope.projects = result;

                $scope.issue.Project = $scope.projects[0];
                $scope.changeProject();
            });

            $scope.createIssue = function createIssue() {
                issue = issueServices.newIssue($scope.issue);
                issueServices.createIssue(issue);
            };

            $scope.changeProject = function changeProject() {
                $scope.priorities = $scope.issue.Project.Priorities;
                $scope.issue.Priority = $scope.priorities[0];
            }
        }]);
})();