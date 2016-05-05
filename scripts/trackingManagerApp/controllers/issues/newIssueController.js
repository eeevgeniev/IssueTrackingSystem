(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.newIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.userServices',
    'trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.services.commands.labelServices']);

    issuesModule.controller('NewIssueController', ['$scope', '$q', 'issueServices', 'userServices',
        'projectServices', 'labelServices',
        function ($scope, $q, issueServices, userServices, projectServices, labelServices) {
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
                issue = issueServices.newIssue($scope.issue),
                issueServices.createIssue(issue),
                $('.ui-dialog').remove(),
                $('#new-issue').addClass('hidden');
            };

            $scope.changeProject = function changeProject() {
                $scope.priorities = $scope.issue.Project.Priorities;
                $scope.issue.Priority = $scope.priorities[0];
            }

            $scope.getLabels = function getLabels() {
                console.log('here');
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
                    if (labels.length > 0) {
                        $scope.labelsOptions = [];

                        for (var i = 0; i < labels.length && i < 10; i++) {
                            labels[i].isSelected = false;
                            $scope.labelsOptions.push(labels[i]);
                        }
                        $('#drop-down').css('display', 'block');
                        $scope.labelsOptions[0].isSelected = true;
                    } else {
                        $('#drop-down').css('display', 'none');
                    }
                });
            }

            $scope.selectOption = function selectOption(event) {
                $scope.issue.Labels = labelServices.clickedLabel(event, $scope.issue.Labels);
            }

            $scope.labelsKeyDown = function labelsKeyDown(event) {
                if (typeof ($scope.issue.Labels) !== 'undefined') {
                    var result = labelServices.keyPressedLabel(event, $scope.labelsOptions, $scope.issue.Labels);

                    $scope.issue.Labels = result === '' ? $scope.issue.Labels : result;
                }
            }
        }]);
})();