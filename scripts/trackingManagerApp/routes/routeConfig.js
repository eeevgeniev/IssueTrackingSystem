(function () {
    var routes = angular.module('trackingManagerApp.routes.routeConfig',
    ['ngRoute', 'trackingManagerApp.controllers.users.manageUserController',
    'trackingManagerApp.controllers.projects.newProjectsController', 'trackingManagerApp.controllers.projects.viewProjectController',
    'trackingManagerApp.controllers.projects.editProjectController', 'trackingManagerApp.controllers.issues.newIssueController',
    'trackingManagerApp.controllers.issues.editIssueController', 'trackingManagerApp.controllers.issues.viewIssueController',
    'trackingManagerApp.controllers.users.dashboardController', 'trackingManagerApp.controllers.users.editUserController',
    'trackingManagerApp.controllers.users.changePasswordController', 'trackingManagerApp.controllers.users.logoutUserController',
    'trackingManagerApp.services.commands.userServices', 'trackingManagerApp.services.commands.modalServices']);

    routes.config(['$routeProvider', function ($routeProvider) {
        var defaultRoute = {
            templateUrl: '../templates/user/dashboard.html',
            controller: 'DashboardController'
        }

        $routeProvider.when('/projects/:id', {
            templateUrl: '../templates/projects/viewProject.html',
            controller: 'ViewProjectController'
        });

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: '../templates/projects/updateProject.html',
            controller: 'EditProjectController'
        });

        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: '../templates/projects/projectAddNewIssue.html',
            controller: 'ProjectAddIssueController'
        });

        $routeProvider.when('/issues/:id', {
            templateUrl: '../templates/issues/viewIssue.html',
            controller: 'ViewIssueController'
        });

        $routeProvider.when('/issues/:id/edit', {
            templateUrl: '../templates/issues/updateIssue.html',
            controller: 'EditIssueController'
        });

        $routeProvider.when('/profile/password', {
            templateUrl: '../templates/user/password.html',
            controller: 'ChangePasswordController'
        });

        $routeProvider.when('/logout', {
            templateUrl: '../templates/user/edit.html',
            controller: 'LogoutUserController',
        });

        $routeProvider.otherwise(defaultRoute);
    }]);

    routes.run(['$rootScope', '$location', '$route', 'userServices', function ($rootScope, $location, $route, userServices) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (!userServices.isUserRegistered()) {
                next.templateUrl = '../templates/user/unknownuser.html';
                next.controller = 'ManageUserController';
                $location.path('');
            }
        });
    }]);

    routes.factory('redirect', ['$location', '$route', function ($location, $route) {
        var redirect = {};

        redirect.changeLocation = function changeLocation(newPath) {
            $location.path(newPath);
        }

        redirect.reloadPage = function reloadPage() {
            $route.reload();
        }

        return redirect;
    }]);

    routes.factory('getParameters', ['$routeParams', function ($routeParams) {
        var parameter = {};

        parameter.getValue = function getValue(name) {
            return $routeParams[name];
        }

        return parameter;
    }]);
})();