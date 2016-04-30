(function () {
    var projectModule = angular.module('trackingManagerApp.controllers.projects.newProjectsController',
        ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.services.commands.userServices']);

    projectModule.controller('NewProjectController', ['$scope', '$q', 'projectServices', 'userServices',
        function ($scope, $q, projectServices, userServices) {
            $scope.project = {},
            $scope.title = 'New Project',
            userPromise = userServices.getUsers();

            userPromise.then(function success(users) {
                $scope.users = users;

                $scope.project.Lead = $scope.users[0];
            });

            $scope.createProjectKey = function createProjectKey() {
                $scope.project.ProjectKey = projectServices.createProjectKey($scope.project.Name);
            }

            $scope.addUpdateProject = function addUpdateProject() {
                var project = projectServices.newProject($scope.project);
                projectServices.createProject(project);
                $('.ui-dialog').remove();
                $('#new-project').addClass('hidden');
            }
        }]);
})();