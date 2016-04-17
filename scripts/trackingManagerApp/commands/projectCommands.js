(function () {
    var projectCommands = angular.module('TrackingManagerApp.Commands.ProjectCommands', ['TrackingManagerApp.Https.Request',
    'TrackingManagerApp.Cookies.Cookie', 'TrackingManagerApp.Routes.Routes']);

    projectCommands.factory('ProjectCommands', ['$q', 'Requests', 'CookieManager', 'CookiesNames', 'Redirect',
    function ($q, Requests, CookieManager, CookiesNames, Redirect) {
        var commands = {};

        commands.getProject = function getProject(id) {
            var token = CookieManager.getCookie(CookiesNames.Bearer);

            var promise = Requests.getProjects(token, id);

            return promise;
        }

        commands.getProjects = function getProjects() {
            var token = CookieManager.getCookie(CookiesNames.Bearer);

            var promise = Requests.getProjects(token);

            return promise;
        }

        commands.newProject = function newProject(project) {
            var token = CookieManager.getCookie(CookiesNames.Bearer);

            var promise = Requests.getProjects(token, project);

            promise.then(function success(response) {

            }, function error(response) {

            });
        }

        commands.updateProject = function updateProjects(id, project) {
            var token = CookieManager.getCookie(CookiesNames.Bearer);

            var promise = Requests.getProjects(token, id, project);

            promise.then(function success(response) {

            }, function error(response) {

            });
        }

        return commands;
    }]);
})();