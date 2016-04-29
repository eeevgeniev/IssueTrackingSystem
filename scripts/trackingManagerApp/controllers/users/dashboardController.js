(function () {
    var dashboardModule = angular.module('trackingManagerApp.controllers.users.dashboardController',
    ['trackingManagerApp.services.commands.userServices', 'trackingManagerApp.services.commands.modalServices']);

    dashboardModule.controller('DashboardController', ['$scope', '$q', 'userServices', 'modalServices',
        function ($scope, $q, userServices, modalServices) {

            var promise = userServices.getUserIssues(10, 1, 'DueDate desc');

            promise.then(function success(result) {
                $scope.issues = result.Issues;
            }, function error(response) {
                console.log(response);
            });

            $scope.newProject = function newProject() {
                modalServices.createModal('#new-project', 800, 800);
            }

            $scope.newIssue = function newIssue() {
                modalServices.createModal('#new-issue', 800, 800);
            }

            $scope.$on('$destroy', function () {
                $('.ui-dialog').remove();
            });
        }]);
})();