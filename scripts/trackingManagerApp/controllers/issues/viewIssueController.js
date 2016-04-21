(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.viewIssueController', 
    ['trackingManagerApp.services.commands.issueServices']);

    issuesModule.controller('ViewIssueController', ['$scope', '$q', 'issueServices', function ($scope, $q, issueServices) {

        var promise = issueServices.getIssue()

        promise.then(function success(response) {
            $scope.issue = response.data;
        }, function error(response) {

        }); 
    }]);
})();