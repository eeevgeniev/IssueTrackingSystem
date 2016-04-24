(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.editIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.userServices',
    'trackingManagerApp.services.commands.projectServices']);

    issuesModule.controller('EditIssueController', ['$scope', '$q', '$filter', 'issueServices', 'userServices', 'projectServices',
        function ($scope, $q, $filter, issueServices, userServices, projectServices) {
            $scope.issue = {},
            issuePromise = issueServices.getIssue(),
            issueAssignee = null,
            issueProject = null;

            issuePromise.then(function success(result) {
                $scope.issue = result;
                $scope.issue.DueDate = $filter('date')(result.DueDate, 'hh:mm dd/MM/yyyy');
                issueAssignee = result.Assignee;
                issueProject = result.Project;

                userPromise = userServices.getUsers();
                projectPromise = projectServices.getProjects();

                userPromise.then(function success(result) {
                    $scope.users = result;

                    $scope.issue.Assignee = issueAssignee === null ? $scope.users[0] : issueAssignee;
                });

                projectPromise.then(function success(result) {
                    $scope.projects = result;

                    issueProject = $scope.projects.find(function (currentProject) {
                        return issueProject.Id === currentProject.Id;
                    })

                    $scope.issue.Project = typeof(issueProject) === 'undefined' ? $scope.projects[0] : issueProject;
                    $scope.changeProject();
                });
            });

            $scope.editIssue = function editIssue() {
                issue = issueServices.createIssue($scope.issue);

                issueServices.editIssue(issue);
            };

            $scope.changeProject = function changeProject() {
                $scope.priorities = $scope.issue.Project.Priorities;
                $scope.issue.Priority = $scope.priorities[0];
            }
        }]);
})();