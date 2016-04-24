(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.newIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.userServices',
    'trackingManagerApp.services.commands.projectServices']);

    issuesModule.controller('NewIssueController', ['$scope', '$q', 'issueServices', 'userServices', 'projectServices',
        function ($scope, $q, issueServices, userServices, projectServices) {
            $scope.issue = {},
            userPromise = userServices.getUsers(),
            projectPromise = projectServices.getProjects();

            userPromise.then(function success(response) {
                $scope.users = [];

                response.data.forEach(function (currentUser) {
                    $scope.users.push({ Id: currentUser.Id, Username: currentUser.Username });
                })

                response = null;

                $scope.issue.assignee = $scope.users[0];
            }, function error(response) {
                console.log(response);
            });

            projectPromise.then(function success(response) {
                $scope.projects = [];

                response.data.forEach(function (currentProject) {
                    $scope.projects.push({ Id: currentProject.Id, Name: currentProject.Name, Priorities: currentProject.Priorities });
                });

                response = null;

                $scope.issue.project = $scope.projects[0];

                $scope.priorities = $scope.issue.project.Priorities;
                $scope.issue.priority = $scope.priorities[0];
            }, function error(response) {
                console.log(response);
            });

            $scope.createIssue = function createIssue() {
                issue = issueServices.createIssue($scope.issue);

                issueServices.editIssue(issue);
            };

            $scope.changeProject = function changeProject() {
                $scope.priorities = $scope.issue.project.Priorities;
                $scope.issue.priority = $scope.priorities[0];
            }
        }]);
})();