﻿(function () {

    var projectAddIssue = angular.module('trackingManagerApp.controllers.projects.projectAddIssueController',
    ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.services.commands.issueServices',
    'trackingManagerApp.services.commands.userServices', 'trackingManagerApp.services.commands.modalServices']);

    projectAddIssue.controller('ProjectAddIssueController', ['$scope', '$q', '$filter', 'projectServices',
    'issueServices', 'userServices', 'modalServices',
    function ($scope, $q, $filter, projectServices, issueServices, userServices, modalServices) {

        var projectPromise = projectServices.getProject();

        projectPromise.then(function success(project) {

            if (!projectServices.isProjectLeader(project.Lead.Id)) {
                projectServices.redirectToProject();
                return;
            }

            $scope.project = project;
            $scope.project.Priorities = $filter('getName')(project.Priorities);
            $scope.project.Labels = $filter('getName')(project.Labels);
            modalServices.createModal('#new-issue', 800, 800);
        });

        $scope.AddUpdateIssue = function AddUpdateIssue() {
            // to do
        }

        $scope.$on('$destroy', function () {
            $('.ui-dialog').remove();
        });
    }]);

})();