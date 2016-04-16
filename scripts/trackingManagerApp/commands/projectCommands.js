(function () {
    var projectCommands = angular.module('TrackingManagerApp.Commands.ProjectCommands', ['TrackingManagerApp.Https.Request',
    'TrackingManagerApp.Cookies.Cookie', 'TrackingManagerApp.Routes.Routes']);

    projectCommands.factory('ProjectCommands', ['$q', 'Requests', 'CookieManager', 'CookiesNames', 'Redirect',
    function ($q, Requests, CookieManager, CookiesNames, Redirect) {
        var commands = {};

        commands.getProjects = function getProjects() {
            var token = CookieManager.getCookie(CookiesNames.Bearer);

            var promise = Requests.getProjects(token);

            return promise;
        }

        return commands;
    }]);
})();