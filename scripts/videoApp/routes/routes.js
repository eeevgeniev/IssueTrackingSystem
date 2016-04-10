// to do change routes

(function () {
    angular.module('VideoApp.Routes', ['ngRoute', 'VideoApp.Controllers.Users.User', 'VideoApp.Controllers.Projects.NewProjects',
        'VideoApp.Controllers.Projects.ViewProjects', 'VideoApp.Controllers.Projects.EditProjects', 'VideoApp.Controllers.Issues.NewIssue',
        'VideoApp.Controllers.Issues.EditIssue', 'VideoApp.Controllers.Issues.ViewIssue', 'VideoApp.Controllers.Users.Dashboard'])
    .config(['$routeProvider', function ($routeProvider) {
        var defaultRoute = {
            templateUrl: '../templates/public/unknownuser.html',
            controller: 'UserController'
        };

        $routeProvider.when('/project', {
            templateUrl: '../templates/projects/new.html',
            controller: 'NewProjectController'
        });

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: '../templates/projects/edit.html',
            controller: 'EditProjectController'
        });

        $routeProvider.when('/projects/:id', {
            templateUrl: '../templates/projects/view.html',
            controller: 'EditProjectController'
        });

        $routeProvider.when('/issue', {
            templateUrl: '../templates/issues/new.html',
            controller: 'NewIssueController'
        });

        $routeProvider.when('/issues/:id/edit', {
            templateUrl: '../templates/issues/edit.html',
            controller: 'EditIssueController'
        });

        $routeProvider.when('/issues/:id', {
            templateUrl: '../templates/issues/view.html',
            controller: 'ViewIssueController'
        });

        $routeProvider.when('', {
            templateUrl: '../templates/issues/dashboard.html',
            controller: 'DashboardController'
        });

        $routeProvider.otherwise(defaultRoute);
    } ]);
})();