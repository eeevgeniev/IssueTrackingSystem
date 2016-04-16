(function () {
    var issuesModule = angular.module('TrackingManagerApp.Controllers.Issues.NewIssue', ['TrackingManagerApp.Commands.IssuesCommands',
        'TrackingManagerApp.Commands.UserCommands', 'TrackingManagerApp.Commands.ProjectCommands']);

    issuesModule.controller('NewIssueController', ['$scope', '$q', 'IssueCommands', 'UserCommands', 'ProjectCommands',
        function ($scope, $q, IssueCommands, UserCommands, ProjectCommands) {

            var userPromise = UserCommands.getUsers();
            var projectPromise = ProjectCommands.getProjects();

            userPromise.then(function success(response) {
                $scope.users = response.data;
            }, function error(response) {
                console.log(response);
            });

            projectPromise.then(function success(response) {
                $scope.projects = response.data;
            }, function error(response) {
                console.log(response);
            });

            $scope.createIssue = function createIssue() {
                IssueCommands.createIssue($scope.issue);
            };
        }]);
})();