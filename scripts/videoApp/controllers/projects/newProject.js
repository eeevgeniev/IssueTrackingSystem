(function () {
    angular.module('VideoApp.Controllers.Projects', [])
    .controller('NewProjectController', ['$scope', function ($scope) {
        $scope.createProject = function createProject() {
            console.log(JSON.stringify($scope.project));
        }
    } ]);
})();