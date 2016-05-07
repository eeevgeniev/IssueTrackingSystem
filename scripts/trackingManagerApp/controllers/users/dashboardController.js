(function () {
    var dashboardModule = angular.module('trackingManagerApp.controllers.users.dashboardController',
    ['trackingManagerApp.services.commands.userServices', 'trackingManagerApp.services.commands.modalServices',
    'trackingManagerApp.services.commands.localUserServices']);

    dashboardModule.constant('IssuesPerPage', 5);

    dashboardModule.controller('DashboardController', ['$scope', '$q', 'userServices', 'modalServices',
        'IssuesPerPage', 'localUserServices',
        function ($scope, $q, userServices, modalServices, IssuesPerPage, localUserServices) {
            $scope.isUserAdmin = localUserServices.isUserAdmin(),
            $scope.isLoading = true,
            page = Number(userServices.getDashboardPage('page')),
            promise = userServices.getUserIssues(IssuesPerPage, page, 'DueDate desc');

            promise.then(function success(result) {
                $scope.isLoading = false;

                if (result.Issues.length === 0) {
                    $scope.hasIssues = false;
                    return;
                }

                if (page <= result.TotalPages) {
                    $scope.hasCurrent = true;
                    $scope.current = page;

                    if (page < result.TotalPages) {
                        $scope.hasNext = true;
                        $scope.next = page + 1;
                    }

                    if (page > 1) {
                        $scope.hasPrevious = true;
                        $scope.previous = page - 1;
                    }

                    if (page < result.TotalPages - 1) {
                        $scope.hasLast = true;
                        $scope.toLast = result.TotalPages;
                    }

                    if (page > 2) {
                        $scope.hasFirst = true;
                        $scope.toFirst = 1;
                    }

                    $scope.issues = result.Issues;
                    $scope.hasIssues = true;
                }
            });

            $scope.newProject = function newProject() {
                modalServices.createModal('#new-project', 700, 800);
            }

            $scope.newIssue = function newIssue() {
                modalServices.createModal('#new-issue', 800, 800);
            }

            $scope.$on('$destroy', function () {
                $('.ui-dialog').remove();
            });
        }]);
})();