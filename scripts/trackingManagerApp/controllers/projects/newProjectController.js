(function () {
    var projectModule = angular.module('trackingManagerApp.controllers.projects.newProjectsController',
        ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.services.commands.userServices',
        'trackingManagerApp.services.commands.labelServices']);

    projectModule.controller('NewProjectController', ['$scope', '$q', 'projectServices', 'userServices', 'labelServices',
        function ($scope, $q, projectServices, userServices, labelServices) {
            $scope.project = {},
            $scope.title = 'New Project',
            $scope.buttonTitle = $scope.title,
            userPromise = userServices.getUsers(),
            isOverDropDownFocus = false;

            userPromise.then(function success(users) {
                $scope.users = users;

                $scope.project.Lead = $scope.users[0];
            });

            $scope.createProjectKey = function createProjectKey() {
                $scope.project.ProjectKey = projectServices.createProjectKey($scope.project.Name);
            }

            $scope.addUpdateProject = function addUpdateProject() {
                var project = projectServices.getNewProject($scope.project);
                projectServices.createProject(project);
                $('.ui-dialog').remove();
                $('#new-project').addClass('hidden');
            }

            $scope.getLabels = function getLabels() {
                if (typeof ($scope.project.Labels) === 'undefined') {
                    $('#drop-down-project').css('display', 'none');
                    return;
                }

                var quoteIndex = $scope.project.Labels.lastIndexOf(','),
                        length = $scope.project.Labels.length,
                        lastLabel = $scope.project.Labels.substr(quoteIndex + 1, length - quoteIndex);

                lastLabel = lastLabel.trim();

                if (lastLabel === '') {
                    $('#drop-down-project').css('display', 'none');
                    return;
                }

                labelsPromise = labelServices.getLabels(lastLabel);

                labelsPromise.then(function success(labels) {
                    $scope.labelsOptions = labelServices.showLabels(labels, '#drop-down-project');
                });
            }

            $scope.selectOption = function selectOption(event) {
                $scope.project.Labels = labelServices.clickedLabel(event, $scope.project.Labels, '#drop-down-project');
            }

            $scope.labelsKeyDown = function labelsKeyDown(event) {
                if (typeof ($scope.project.Labels) !== 'undefined') {
                    var result = labelServices.keyPressedLabel(event, $scope.labelsOptions, $scope.project.Labels, '#drop-down-project');

                    $scope.project.Labels = result === '' ? $scope.project.Labels : result;
                }
            }

            $scope.labelsLostFocus = function labelsLostFocus() {

                if (isOverDropDownFocus) {
                    $('#Labels').focus();
                    return;
                }

                isOverDropDownFocus = false;
                $('#drop-down-project').css('display', 'none');
            }

            $scope.dropDownMouseOver = function dropDownMouseOver() {
                isOverDropDownFocus = true;
            }

            $scope.dropDownMouseLeave = function dropDownMouseLeave() {
                isOverDropDownFocus = false;
            }
        }]);
})();