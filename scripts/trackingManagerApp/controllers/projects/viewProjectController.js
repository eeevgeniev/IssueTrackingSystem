(function () {
    var projectModule = angular.module('trackingManagerApp.controllers.projects.viewProjectController',
    ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.filters.getNamesFilter']);

    projectModule.controller('ViewProjectController', ['$scope', '$filter', 'projectServices',
    function ($scope, $filter, projectServices) {

        $scope.title == 'View Project',
        promiseProject = projectServices.getProject(),
        promiseProjectIssues = projectServices.getProjectIssues();

        promiseProject.then(function success(project) {
            $scope.project = project;
            $scope.project.Priorities = $filter('getName')(project.Priorities);
            $scope.project.Labels = $filter('getName')(project.Labels);
            $scope.isLeader = projectServices.isProjectLeader(project.Lead.Id);
        });

        promiseProjectIssues.then(function success(issues) {
            $scope.issues = issues;
        });
    }]);
})();