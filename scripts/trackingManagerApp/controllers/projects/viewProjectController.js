(function () {
    var projectModule = angular.module('trackingManagerApp.controllers.projects.viewProjectController',
    ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.filters.getNamesFilter']);

    projectModule.controller('ViewProjectController', ['$scope', '$filter', 'projectServices',
    function ($scope, $filter, projectServices) {

        var promise = projectServices.getProject();

        promise.then(function success(response) {
            $scope.project = response.data;
            $scope.project.Priorities = $filter('getName')(response.data.Priorities);
            $scope.project.Labels = $filter('getName')(response.data.Labels);
        });

    } ]);
})();