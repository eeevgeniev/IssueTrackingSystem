(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.editIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.userServices',
    'trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.filters.getNamesFilter']);

    issuesModule.controller('EditIssueController', ['$scope', '$q', '$filter', 'issueServices', 'userServices', 'projectServices',
        function ($scope, $q, $filter, issueServices, userServices, projectServices) {
            $scope.issue = {},
            $scope.title = 'Edit Issue',
            issuePromise = issueServices.getFilteredIssue(),
            issueAssignee = null,
            issueProject = null,
            $scope.labels = [];

            issuePromise.then(function success(issue) {
                $scope.issue = issue;
                $scope.issue.DueDate = $filter('date')(issue.DueDate, 'dd/MM/yyyy hh:mm');
                $scope.issue.Labels = $filter('getName')(issue.Labels);
                issueAssignee = issue.Assignee;
                issueProject = issue.Project;

                usersPromise = userServices.getUsers();
                projectsPromise = projectServices.getProjects()
                projectPromise = projectServices.getProjectById(issueProject.Id);

                usersPromise.then(function success(users) {
                    $scope.users = users;

                    issueAssignee = $scope.users.find(function (currentUser) {
                        return issueAssignee.Id === currentUser.Id;
                    });

                    $scope.issue.Assignee = typeof (issueAssignee) === 'undefined' ? $scope.users[0] : issueAssignee;
                });

                projectsPromise.then(function success(projects) {
                    $scope.projects = projects;

                    $scope.projects.forEach(function (currentProject) {
                        $scope.labels = issueServices.getAvailableLabels($scope.labels, currentProject.Labels);
                    })

                    issueProject = $scope.projects.find(function (currentProject) {
                        return issueProject.Id === currentProject.Id;
                    });

                    $scope.issue.Project = typeof (issueProject) === 'undefined' ? $scope.projects[0] : issueProject;
                    $scope.changeProject();
                });

                projectPromise.then(function success(project) {
                    $scope.isProjectLead = projectServices.isProjectLeader(project.Lead.Id);
                    $scope.isAssignee = issueServices.isUserIssueAssignee($scope.issue.Assignee.Id);

                    if (!$scope.isProjectLead && !$scope.isAssignee) {
                        issueServices.redirectToIssue();
                        return;
                    }

                    $scope.isButtonActive = $scope.isProjectLead;
                });
            });

            $scope.addUpdateIssue = function addUpdateIssue() {
                issue = issueServices.newIssue($scope.issue);

                var updatedIssue = {};

                for (var property in issue) {
                    if (property !== 'ProjectId') {
                        updatedIssue[property] = issue[property];
                    }
                }

                issueServices.editIssue(updatedIssue);
            };

            $scope.changeProject = function changeProject() {
                $scope.priorities = $scope.issue.Project.Priorities;
                $scope.issue.Priority = $scope.priorities[0];
            }
        }]);
})();