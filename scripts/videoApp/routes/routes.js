(function () {
    angular.module('VideoApp.Routes', ['ngRoute', 'VideoApp.Controllers.User', 'VideoApp.Controllers.Projects', 'VideoApp.Controllers.Issues'])
    .config(['$routeProvider', function ($routeProvider) {
        var defaultRoute = {
            templateUrl: '../templates/public/unknownuser.html',
            controller: 'UserController'
        };

        $routeProvider.when('/project', {
            templateUrl: '../templates/administrator/newProject.html',
            controller: 'NewProjectController'
        })

        $routeProvider.when('/issue', {
            templateUrl: '../templates/administrator/newIssue.html',
            controller: 'NewIssueController'
        })

        $routeProvider.otherwise(defaultRoute);
    } ]);
})();