(function () {
    var projectModule = angular.module('trackingManagerApp.controllers.projects.editProjectController',
        ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.services.commands.userServices',
            'trackingManagerApp.filters.getNamesFilter']);

    projectModule.controller('EditProjectController', ['$scope', '$q', 'projectServices', 'userServices',
        function ($scope, $q, projectServices, userServices) {
            $scope.project = {},
            projectPromise = projectServices.getProject(),
            userPromise = userServices.getUsers();

            projectPromise.then(function success(response) {
                $scope.project = response.data;
            });

            userPromise.then(function success(response) {
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

            $scope.editProject = function editProject() {
                projectServices.updateProject($scope.project);
            }
        }]);
})();