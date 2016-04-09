(function () {
    var projectModule = angular.module('VideoApp.Controllers.Projects', []);
    
    projectModule.controller('NewProjectController', ['$scope', function ($scope) {
        $scope.createProject = function createProject() {
            console.log(JSON.stringify($scope.project));
        }
    }]);

    projectModule.controller('EditProjectController', ['$scope', function ($scope) {
        $scope.editProject = function editProject() {
            console.log(JSON.stringify($scope.project));
        }
    }]);
})();