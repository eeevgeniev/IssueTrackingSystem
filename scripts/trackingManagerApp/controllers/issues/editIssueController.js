(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.editIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.userServices',
    'trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.filters.getNamesFilter',
    'trackingManagerApp.services.commands.labelServices', 'trackingManagerApp.services.commands.notifyServices']);

    issuesModule.controller('EditIssueController', ['$scope', '$q', '$filter', 'issueServices', 'userServices',
    'projectServices', 'labelServices', 'localUserServices',
        function ($scope, $q, $filter, issueServices, userServices, projectServices, labelServices, localUserServices) {
            $scope.issue = {},
            $scope.title = 'Edit Issue',
            $scope.buttonTitle = $scope.title,
            issuePromise = issueServices.getFilteredIssue(),
            issueAssignee = null,
            issueProject = null,
            isOverDropDownFocus = false;

            issuePromise.then(function success(issue) {
                $scope.issue = issue;
                $scope.issue.DueDate = $filter('date')(issue.DueDate, 'dd/MM/yyyy HH:mm');
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

                    issueProject = $scope.projects.find(function (currentProject) {
                        return issueProject.Id === currentProject.Id;
                    });

                    $scope.issue.Project = typeof (issueProject) === 'undefined' ? $scope.projects[0] : issueProject;
                    $scope.changeProject();
                });

                projectPromise.then(function success(project) {
                    $scope.isProjectLead = localUserServices.isProjectLeader(project.Lead.Id);
                    $scope.isAssignee = localUserServices.isUserIssueAssignee($scope.issue.Assignee.Id);

                    if (!$scope.isProjectLead && !$scope.isAssignee) {
                        issueServices.redirectToIssue('You don\'t have permission to edit this issue.');
                        return;
                    }

                    $scope.isButtonActive = $scope.isProjectLead;
                });
            });

            $scope.addUpdateIssue = function addUpdateIssue() {
                var issue = issueServices.getEditedIssue($scope.issue);
                issueServices.editIssue(issue);
            };

            $scope.changeStatus = function changeStatus(event) {
                var statusId = $(event.target).attr('status-id');
                issueServices.changeIssueStatus(statusId);
            }

            $scope.changeProject = function changeProject() {
                $scope.priorities = $scope.issue.Project.Priorities;
                $scope.issue.Priority = $scope.priorities[0];
            }

            $scope.getLabels = function getLabels() {
                if (typeof ($scope.issue.Labels) === 'undefined') {
                    $('#drop-down').css('display', 'none');
                    return;
                }

                var quoteIndex = $scope.issue.Labels.lastIndexOf(','),
                        length = $scope.issue.Labels.length,
                        lastLabel = $scope.issue.Labels.substr(quoteIndex + 1, length - quoteIndex);

                lastLabel = lastLabel.trim();

                if (lastLabel === '') {
                    $('#drop-down').css('display', 'none');
                    return;
                }

                labelsPromise = labelServices.getLabels(lastLabel);

                labelsPromise.then(function success(labels) {
                    $scope.labelsOptions = labelServices.showLabels(labels, '#drop-down');
                });
            }

            $scope.selectOption = function selectOption(event) {
                $scope.issue.Labels = labelServices.clickedLabel(event, $scope.issue.Labels, '#drop-down');
            }

            $scope.labelsKeyDown = function labelsKeyDown(event) {
                if (typeof ($scope.issue.Labels) !== 'undefined') {
                    var result = labelServices.keyPressedLabel(event, $scope.labelsOptions, $scope.issue.Labels, '#drop-down');

                    $scope.issue.Labels = result === '' ? $scope.issue.Labels : result;
                }
            }

            $scope.labelsLostFocus = function labelsLostFocus() {

                if (isOverDropDownFocus) {
                    $('#Labels').focus();
                    return;
                }

                isOverDropDownFocus = false;
                $('#drop-down').css('display', 'none');
            }

            $scope.dropDownMouseOver = function dropDownMouseOver() {
                isOverDropDownFocus = true;
            }

            $scope.dropDownMouseLeave = function dropDownMouseLeave() {
                isOverDropDownFocus = false;
            }
        }]);
})();