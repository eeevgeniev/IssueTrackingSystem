﻿(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.editIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.userServices',
    'trackingManagerApp.services.commands.projectServices']);

    issuesModule.controller('EditIssueController', ['$scope', '$q', '$filter', 'issueServices', 'userServices', 'projectServices',
        function ($scope, $q, $filter, issueServices, userServices, projectServices) {
            $scope.issue = {},
            userPromise = userServices.getUsers(),
            projectPromise = projectServices.getProjects(),
            issuePromise = issueServices.getIssue();

            userPromise.then(function success(response) {
                $scope.users = [];

                response.data.forEach(function (currentUser) {
                    $scope.users.push({ Id: currentUser.Id, Username: currentUser.Username });
                })

                response = null;
                $scope.issue.Assignee = $scope.users[0];
            });

            projectPromise.then(function success(response) {
                $scope.projects = [];

                response.data.forEach(function (currentProject) {
                    $scope.projects.push({ Id: currentProject.Id, Name: currentProject.Name, Priorities: currentProject.Priorities });
                });

                response = null;

                $scope.issue.Project = $scope.projects[0];
                $scope.priorities = $scope.issue.Project.Priorities;
                $scope.issue.Priority = $scope.priorities[0];
            });

            issuePromise.then(function success(response) {
                $scope.issue = response.data;
                $scope.issue.DueDate = $filter('date')(response.data.DueDate, 'hh:mm dd/MM/yyyy');
            })

            $scope.editIssue = function editIssue() {
                issue = issueServices.createIssue($scope.issue);

                issueServices.editIssue(issue);
            };

            $scope.changeProject = function changeProject() {
                $scope.priorities = $scope.issue.Project.Priorities;
                $scope.issue.Priority = $scope.Priorities[0];
            }
        }]);
})();