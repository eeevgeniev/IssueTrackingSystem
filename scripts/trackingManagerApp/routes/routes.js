// to do change routes
(function () {
    var routes = angular.module('TrackingManagerApp.Routes.Routes', ['ngRoute', 'TrackingManagerApp.Controllers.Users.User',
        'TrackingManagerApp.Controllers.Projects.NewProjects', 'TrackingManagerApp.Controllers.Projects.ViewProjects',
        'TrackingManagerApp.Controllers.Projects.EditProjects', 'TrackingManagerApp.Controllers.Issues.NewIssue',
        'TrackingManagerApp.Controllers.Issues.EditIssue', 'TrackingManagerApp.Controllers.Issues.ViewIssue',
        'TrackingManagerApp.Controllers.Users.Dashboard', 'TrackingManagerApp.Controllers.Users.Edit',
        'TrackingManagerApp.Controllers.Users.Password', 'TrackingManagerApp.Controllers.Users.Logout',
        'TrackingManagerApp.Cookies.Cookie']);

    routes.config(['$routeProvider', function ($routeProvider) {
        var defaultRoute = {
            templateUrl: '../templates/user/unknownuser.html',
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

        $routeProvider.when('/dashboard', {
            templateUrl: '../templates/user/dashboard.html',
            controller: 'DashboardController'
        });

        $routeProvider.when('/profile', {
            templateUrl: '../templates/user/edit.html',
            controller: 'EditController'
        });

        $routeProvider.when('/profile/password', {
            templateUrl: '../templates/user/password.html',
            controller: 'PasswordController'
        });

        $routeProvider.when('/profile/password', {
            templateUrl: '../templates/user/password.html',
            controller: 'PasswordController'
        });

        $routeProvider.when('/logout', {
            controller: 'LogoutController'
        });

        $routeProvider.otherwise(defaultRoute);
    } ]);

    routes.factory('Redirect', ['$location', function ($location) {
        var redirect = {};

        redirect.changeLocation = function changeLocation(newPath) {
            $location.path(newPath);
        }

        return redirect;
    } ]);

    routes.factory('GetParameters', ['$routeParams', function ($routeParams) {
        var parameter = {};

        parameter.getValue = function getValue(name) {
            return $routeParams[name];
        }

        return parameter;
    }]);
})();