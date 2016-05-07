(function () {
    var routes = angular.module('trackingManagerApp.routes.routeConfig',
    ['ngRoute', 'trackingManagerApp.controllers.users.manageUserController',
    'trackingManagerApp.controllers.projects.newProjectsController', 'trackingManagerApp.controllers.projects.viewProjectController',
    'trackingManagerApp.controllers.projects.editProjectController', 'trackingManagerApp.controllers.issues.newIssueController',
    'trackingManagerApp.controllers.issues.editIssueController', 'trackingManagerApp.controllers.issues.viewIssueController',
    'trackingManagerApp.controllers.users.dashboardController', 'trackingManagerApp.controllers.users.changePasswordController',
    'trackingManagerApp.controllers.users.logoutUserController', 'trackingManagerApp.services.commands.localUserServices',
    'trackingManagerApp.controllers.projects.projectAddIssueController']);

    routes.config(['$routeProvider', function ($routeProvider) {
        var defaultRoute = {
            templateUrl: 'scripts/trackingManagerApp/templates/user/dashboard.html',
            controller: 'DashboardController'
        }

        $routeProvider.when('/dashboard/:page/', defaultRoute);

        $routeProvider.when('/projects/:id', {
            templateUrl: 'scripts/trackingManagerApp/templates/projects/viewProject.html',
            controller: 'ViewProjectController'
        });

        $routeProvider.when('/projects/:id/issues/:issues', {
            templateUrl: 'scripts/trackingManagerApp/templates/projects/viewProject.html',
            controller: 'ViewProjectController'
        });

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'scripts/trackingManagerApp/templates/projects/updateProject.html',
            controller: 'EditProjectController'
        });

        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'scripts/trackingManagerApp/templates/projects/projectAddNewIssue.html',
            controller: 'ProjectAddIssueController'
        });

        $routeProvider.when('/issues/:id', {
            templateUrl: 'scripts/trackingManagerApp/templates/issues/viewIssue.html',
            controller: 'ViewIssueController'
        });

        $routeProvider.when('/issues/:id/:comments', {
            templateUrl: 'scripts/trackingManagerApp/templates/issues/viewIssue.html',
            controller: 'ViewIssueController'
        });

        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'scripts/trackingManagerApp/templates/issues/updateIssue.html',
            controller: 'EditIssueController'
        });

        $routeProvider.when('/profile/password', {
            templateUrl: 'scripts/trackingManagerApp/templates/user/password.html',
            controller: 'ChangePasswordController'
        });

        $routeProvider.when('/logout', {
            templateUrl: 'scripts/trackingManagerApp/templates/user/logout.html',
            controller: 'LogoutUserController'
        });

        $routeProvider.otherwise(defaultRoute);
    }]);

    routes.run(['$rootScope', '$location', '$route', 'localUserServices', function ($rootScope, $location, $route, localUserServices) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (!localUserServices.isUserRegistered()) {
                next.templateUrl = 'scripts/trackingManagerApp/templates/user/unknownuser.html';
                next.controller = 'ManageUserController';
                $location.path('');
            }
        });
    }]);

    routes.factory('redirect', ['$location', '$route', '$window', function ($location, $route, $window) {
        var redirect = {};

        redirect.changeLocation = function changeLocation(newPath) {
            $location.path(newPath);
        }

        redirect.changeReloadLocation = function changeReloadLocation(newPath) {
            $window.location.href = '#' + newPath;
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