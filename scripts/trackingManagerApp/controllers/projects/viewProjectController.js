(function () {
    var projectModule = angular.module('trackingManagerApp.controllers.projects.viewProjectController',
    ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.filters.getNamesFilter',
        'trackingManagerApp.services.commands.localUserServices', 'trackingManagerApp.services.commands.helperServices']);

    projectModule.constant('ProjectIssuesPerPage', 10);

    projectModule.controller('ViewProjectController', ['$scope', '$filter', 'projectServices',
        'ProjectIssuesPerPage', 'localUserServices', 'helperServices',
        function ($scope, $filter, projectServices, ProjectIssuesPerPage, localUserServices, helperServices) {
            $scope.title = 'View Project',
            $scope.isLoading = true,
            promiseProject = projectServices.getProject(),
            promiseProjectIssues = projectServices.getProjectIssues();
            
            promiseProject.then(function success(project) {
                
                $scope.project = project;
                $scope.project.Priorities = $filter('getName')(project.Priorities);
                $scope.project.Labels = $filter('getName')(project.Labels);
                $scope.isProjectLeader = localUserServices.isProjectLeader(project.Lead.Id);
            });
            

            promiseProjectIssues.then(function success(issues) {
                $scope.isLoading = false;

                if (issues.length === 0) {
                    $scope.hasIssues = false;
                    return;
                }

                issues.sort(function (first, second) {
                    return new Date(second.DueDate) - new Date(first.DueDate);
                });

                $scope.issues = [];
                var issuesPagesCount = Math.ceil(issues.length / ProjectIssuesPerPage),
                    startPosition = Number(helperServices.getPageNumber('issues')),
                    length = startPosition * ProjectIssuesPerPage,
                    start = (startPosition - 1) * ProjectIssuesPerPage,
                    end = length > issues.length ? issues.length : length;

                if (startPosition <= issuesPagesCount) {
                    $scope.hasCurrent = true;
                    $scope.current = startPosition;

                    if (startPosition > 1) {
                        $scope.hasPrevious = true;
                        $scope.previous = startPosition - 1;
                    }

                    if (startPosition < issuesPagesCount) {
                        $scope.hasNext = true;
                        $scope.next = startPosition + 1;
                    }

                    if (startPosition > 2) {
                        $scope.hasFirst = true;
                        $scope.toFirst = 1;
                    }

                    if (startPosition < issuesPagesCount - 1) {
                        $scope.hasLast = true;
                        $scope.toLast = issuesPagesCount;
                    }

                    for (var i = start; i < end; i++) {
                        $scope.issues.push(issues[i]);
                    }

                    $scope.hasIssues = true;
                }

                issues = null;
            });
        }]);
})();