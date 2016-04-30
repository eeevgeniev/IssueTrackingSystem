(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.editIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.userServices',
    'trackingManagerApp.services.commands.projectServices']);

    issuesModule.controller('EditIssueController', ['$scope', '$q', '$filter', 'issueServices', 'userServices', 'projectServices',
        function ($scope, $q, $filter, issueServices, userServices, projectServices) {
            $scope.issue = {},
            $scope.title = 'Edit Issue',
            issuePromise = issueServices.getIssue(),
            issueAssignee = null,
            issueProject = null,
            $scope.labels = [];

            issuePromise.then(function success(issue) {
                $scope.issue = issue;
                $scope.issue.DueDate = $filter('date')(issue.DueDate, 'hh:mm dd/MM/yyyy');
                issueAssignee = issue.Assignee;
                issueProject = issue.Project;

                userPromise = userServices.getUsers();
                projectPromise = projectServices.getProjects();

                userPromise.then(function success(users) {
                    $scope.users = users;

                    issueAssignee = $scope.users.find(function (currentUser) {
                        return issueAssignee.Id === currentUser.Id;
                    });

                    $scope.issue.Assignee = typeof (issueAssignee) === 'undefined' ? $scope.users[0] : issueAssignee;
                });

                projectPromise.then(function success(projects) {
                    $scope.projects = projects;

                    $scope.projects.forEach(function (currentProject) {
                        $scope.labels = issueServices.getAvailableLabels($scope.labels, currentProject.Labels);
                    })

                    issueProject = $scope.projects.find(function (currentProject) {
                        return issueProject.Id === currentProject.Id;
                    });

                    $scope.issue.Project = typeof(issueProject) === 'undefined' ? $scope.projects[0] : issueProject;
                    $scope.changeProject();
                });
            });

            $scope.addUpdateIssue = function addUpdateIssue() {
                issue = issueServices.newIssue($scope.issue);
                issueServices.editIssue(issue);
            };

            $scope.changeProject = function changeProject() {
                $scope.priorities = $scope.issue.Project.Priorities;
                $scope.issue.Priority = $scope.priorities[0];
            }
        }]);
})();