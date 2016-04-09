(function () {
    angular.module('VideoApp.Routes', ['ngRoute', 'VideoApp.Controllers.User', 'VideoApp.Controllers.Projects', 'VideoApp.Controllers.Issues'])
    .config(['$routeProvider', function ($routeProvider) {
        var defaultRoute = {
            templateUrl: '../templates/public/unknownuser.html',
            controller: 'UserController'
        };

        $routeProvider.when('/project', {
            templateUrl: '../templates/projects/newProject.html',
            controller: 'NewProjectController'
        });

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: '../templates/projects/editProject.html',
            controller: 'EditProjectController'
        });

        $routeProvider.when('/issue', {
            templateUrl: '../templates/issues/newIssue.html',
            controller: 'NewIssueController'
        });

        $routeProvider.when('/issues/:id/edit', {
            templateUrl: '../templates/issues/editIssue.html',
            controller: 'EditIssueController'
        });

        $routeProvider.otherwise(defaultRoute);
    } ]);
})();