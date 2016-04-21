(function () {
    var projectModule = angular.module('trackingManagerApp.controllers.projects.newProjectsController',
        ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.services.commands.userServices']);

    projectModule.controller('NewProjectController', ['$scope', '$q', 'projectServices', 'userServices',
        function ($scope, $q, projectServices, userServices) {
            $scope.project = {},
            promise = userServices.getUsers();

            promise.then(function success(response) {
                $scope.users = [];

                response.data.forEach(function (currentUser) {
                    $scope.users.push({ Id: currentUser.Id, Username: currentUser.Username });
                })

                response = null;

                $scope.project.Lead = $scope.users[0];
            }, function error(response) {

            })

            $scope.createProjectKey = function createProjectKey() {
                $scope.project.ProjectKey = projectServices.createProjectKey($scope.project.Name);
            }

            $scope.createProject = function createProject() {
                projectServices.createProject($scope.project);
            }
        }]);
})();