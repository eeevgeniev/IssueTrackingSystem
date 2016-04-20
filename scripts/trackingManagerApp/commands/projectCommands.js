(function () {
    var projectCommands = angular.module('TrackingManagerApp.Commands.ProjectCommands', ['TrackingManagerApp.Https.Request',
    'TrackingManagerApp.Cookies.Cookie', 'TrackingManagerApp.Routes.Routes']);

    projectCommands.factory('ProjectCommands', ['$q', 'Requests', 'CookieManager', 'CookiesNames', 'Redirect', 'GetParameters',
    function ($q, Requests, CookieManager, CookiesNames, Redirect, GetParameters) {
        var commands = {};

        commands.getProject = function getProject() {
            var token = CookieManager.getCookie(CookiesNames.Bearer),
                id = GetParameters.getValue('id');
                promise = Requests.getProject(token, id);

            return promise;
        }

        commands.getProjects = function getProjects() {
            var token = CookieManager.getCookie(CookiesNames.Bearer),
                promise = Requests.getProjects(token);

            return promise;
        }

        commands.newProject = function newProject(project) {
            var token = CookieManager.getCookie(CookiesNames.Bearer),
                promise = Requests.getProjects(token, project);

            promise.then(function success(response) {

            }, function error(response) {

            });
        }

        commands.updateProject = function updateProjects(project) {
            var token = CookieManager.getCookie(CookiesNames.Bearer),
                id = GetParameters.getValue('id');
                promise = Requests.getProjects(token, id, project);

            promise.then(function success(response) {

            }, function error(response) {

            });
        }

        commands.createProjectKey = function createProjectKey(projectName) {
            var key = '';

            if (typeof (projectName) !== 'undefined') {
                var names = projectName.split(' ');

                names.forEach(function (currentName) {

                    key += currentName.substr(0, 1).toUpperCase();
                });
            }

            return key;
        }

        return commands;
    }]);
})();