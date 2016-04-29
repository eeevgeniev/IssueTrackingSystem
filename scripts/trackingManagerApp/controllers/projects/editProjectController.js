(function () {
    var projectModule = angular.module('trackingManagerApp.controllers.projects.editProjectController',
        ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.services.commands.userServices',
            'trackingManagerApp.filters.getNamesFilter']);

    projectModule.controller('EditProjectController', ['$scope', '$q', 'projectServices', 'userServices',
        function ($scope, $q, projectServices, userServices) {
            $scope.project = {},
            projectPromise = projectServices.getProject(),
            userPromise = userServices.getUsers();

            projectPromise.then(function success(project) {
                $scope.project = project;
            });

            userPromise.then(function success(users) {
                $scope.users = users;

                $scope.project.Lead = $scope.users[0];
            });

            $scope.createProjectKey = function createProjectKey() {
                $scope.project.ProjectKey = projectServices.createProjectKey($scope.project.Name);
            }

            $scope.editProject = function editProject() {
                var project = projectServices.newProject($scope.project);

                projectServices.updateProject(project);
            }
        }]);
})();