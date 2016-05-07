(function () {

    var projectAddIssue = angular.module('trackingManagerApp.controllers.projects.projectAddIssueController',
    ['trackingManagerApp.services.commands.projectServices', 'trackingManagerApp.services.commands.userServices',
        'trackingManagerApp.services.commands.modalServices', 'trackingManagerApp.services.commands.localUserServices']);

    projectAddIssue.controller('ProjectAddIssueController', ['$scope', '$q', '$filter', '$timeout', 'projectServices',
    'issueServices', 'modalServices', 'localUserServices', 'ModalFormClosed', 'IssueCreated',
    function ($scope, $q, $filter, $timeout, projectServices, userServices, modalServices, localUserServices,
        ModalFormClosed, IssueCreated) {

        var projectPromise = projectServices.getProject();

        projectPromise.then(function success(project) {

            if (!localUserServices.isProjectLeader(project.Lead.Id)) {
                projectServices.redirectToProject();
                return;
            }

            $scope.project = project;
            $scope.project.Priorities = $filter('getName')(project.Priorities);
            $scope.project.Labels = $filter('getName')(project.Labels);
            modalServices.createModal('#new-issue', 800, 800);
        });

        $scope.$on(ModalFormClosed, function () {
            $timeout(function () {
                projectServices.redirectToProject(null);
            });
        });

        $scope.$on(IssueCreated, function () {
            $timeout(function () {
                projectServices.redirectToProject(null);
            })
        })

        $scope.$on('$destroy', function () {
            $('.ui-dialog').remove();
        });
    }]);
})();