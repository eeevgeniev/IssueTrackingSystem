(function () {
    var projectModule = angular.module('TrackingManagerApp.Controllers.Projects.NewProjects',
        ['TrackingManagerApp.Commands.ProjectCommands', 'TrackingManagerApp.Commands.UserCommands']);

    projectModule.controller('NewProjectController', ['$scope', '$q', 'ProjectCommands', 'UserCommands',
        function ($scope, $q, ProjectCommands, UserCommands) {
            $scope.project = {},
            promise = UserCommands.getUsers();

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
                $scope.project.ProjectKey = ProjectCommands.createProjectKey($scope.project.Name);
            }

            $scope.createProject = function createProject() {
                ProjectCommands.createProject($scope.project);
            }
        }]);
})();