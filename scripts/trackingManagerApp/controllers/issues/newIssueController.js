(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.newIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.userServices',
    'trackingManagerApp.services.commands.projectServices']);

    issuesModule.controller('NewIssueController', ['$scope', '$q', 'issueServices', 'userServices', 'projectServices',
        function ($scope, $q, issueServices, userServices, projectServices) {
            $scope.issue = {},
            $scope.title = 'New Issue',
            $scope.isButtonActive = true;
            userPromise = userServices.getUsers(),
            projectPromise = projectServices.getProjects(),
            $scope.labels = [];

            userPromise.then(function success(users) {
                $scope.users = users;
                $scope.issue.Assignee = $scope.users[0];
            });

            projectPromise.then(function success(projects) {
                $scope.projects = projects;

                $scope.projects.forEach(function (currentProject) {
                    $scope.labels = issueServices.getAvailableLabels($scope.labels, currentProject.Labels);
                })

                $scope.issue.Project = $scope.projects[0];
                $scope.changeProject();
            });

            $scope.addUpdateIssue = function addUpdateIssue() {
                issue = issueServices.newIssue($scope.issue);
                issueServices.createIssue(issue);
                $('.ui-dialog').remove();
                $('#new-issue').addClass('hidden');
            };

            $scope.changeProject = function changeProject() {
                $scope.priorities = $scope.issue.Project.Priorities;
                $scope.issue.Priority = $scope.priorities[0];
            }
        }]);
})();