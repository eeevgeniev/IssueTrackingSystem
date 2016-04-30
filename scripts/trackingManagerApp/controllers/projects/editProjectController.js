(function () {
    var projectModule = angular.module('trackingManagerApp.controllers.projects.editProjectController',
        ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.services.commands.userServices',
            'trackingManagerApp.filters.getNamesFilter']);

    projectModule.controller('EditProjectController', ['$scope', '$q', '$filter', 'projectServices', 'userServices',
        function ($scope, $q, $filter, projectServices, userServices) {
            $scope.project = {},
            $scope.title = 'Edit Project',
            projectPromise = projectServices.getProject(),
            userPromise = userServices.getUsers();

            projectPromise.then(function success(project) {
                $scope.project = project;
                $scope.project.Priorities = $filter('getName')(project.Priorities);
                $scope.project.Labels = $filter('getName')(project.Labels);
            });

            userPromise.then(function success(users) {
                $scope.users = users;

                $scope.project.Lead = $scope.users[0];
            });

            $scope.createProjectKey = function createProjectKey() {
                $scope.project.ProjectKey = projectServices.createProjectKey($scope.project.Name);
            }

            $scope.addUpdateProject = function addUpdateProject() {
                var project = projectServices.newProject($scope.project);
                projectServices.updateProject(project);
            }
        }]);
})();