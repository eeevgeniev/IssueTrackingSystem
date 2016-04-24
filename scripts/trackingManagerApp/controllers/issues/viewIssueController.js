(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.viewIssueController', 
    ['trackingManagerApp.services.commands.issueServices']);

    issuesModule.controller('ViewIssueController', ['$scope', '$q', '$filter', 'issueServices', 
        function ($scope, $q, $filter, issueServices) {

        var promise = issueServices.getIssue()

        promise.then(function success(result) {
            $scope.issue = result;
            $scope.issue.DueDate = $filter('date')(result.DueDate, 'hh:mm dd/MM/yyyy');
        }); 
    }]);
})();