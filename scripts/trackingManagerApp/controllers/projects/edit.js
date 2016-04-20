(function () {
    var projectModule = angular.module('TrackingManagerApp.Controllers.Projects.EditProjects',
        ['TrackingManagerApp.Commands.ProjectCommands', 'TrackingManagerApp.Commands.UserCommands',
            'TrackingManagerApp.Filters.Filter']);

    projectModule.controller('EditProjectController', ['$scope', '$q', 'ProjectCommands', 'UserCommands',
        function ($scope, $q, ProjectCommands, UserCommands) {
            $scope.project = {},
            projectPromise = ProjectCommands.getProject(),
            userPromise = UserCommands.getUsers();

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
                $scope.project.ProjectKey = ProjectCommands.createProjectKey($scope.project.Name);
            }

            $scope.editProject = function editProject() {
                console.log($scope.project);
                return;
                ProjectCommands.editProject($scope.project);
            }
        }]);
})();