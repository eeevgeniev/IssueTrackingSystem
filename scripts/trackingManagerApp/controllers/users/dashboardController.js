(function () {
    var dashboardModule = angular.module('trackingManagerApp.controllers.users.dashboardController',
    ['trackingManagerApp.services.commands.userServices', 'trackingManagerApp.services.commands.modalServices']);

    dashboardModule.controller('DashboardController', ['$scope', '$q', 'userServices', 'modalServices',
        function ($scope, $q, userServices, modalServices) {

            var promise = userServices.getUserIssues(10, 1, 'Title');

            promise.then(function success(response) {
                $scope.issues = response.data.Issues;
            }, function error(response) {
                console.log(response);
            });

            $scope.newProject = function newProject() {
                modalServices.createModal('#new-project', 700, 800);
            }

            $scope.newIssue = function newIssue() {
                modalServices.createModal('#new-issue', 700, 800);
            }

            $scope.$on('$destroy', function () {
                $('.ui-dialog').remove();
            });
        }]);
})();