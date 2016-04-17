(function () {
    var issueCommands = angular.module('TrackingManagerApp.Commands.IssuesCommands', ['TrackingManagerApp.Https.Request',
    'TrackingManagerApp.Cookies.Cookie', 'TrackingManagerApp.Routes.Routes']);

    issueCommands.factory('IssueCommands', ['$q', 'Requests', 'Redirect', 'GetParameters', 'CookieManager', 'CookiesNames',
        function ($q, Requests, Redirect, GetParameters, CookieManager, CookiesNames) {
            var commands = {};

            commands.getIssue = function getIssue() {
                var token = CookieManager.getCookie(CookiesNames.Bearer);

                var id = GetParameters.getValue('id');

                if (id === null) {
                    console.log('error');
                    return;
                }

                var promise = Requests.getIssue(token, id);

                return promise;
            }

            commands.createIssue = function createIssue(issue) {
                var token = CookieManager.getCookie(CookiesNames.Bearer);

                var promise = Requests.addNewIssue(token, issue);

                promise.then(function success(response) {

                }, function error(response) {

                });
            };

            commands.editIssue = function editIssue(id, issue) {
                var token = CookieManager.getCookie(CookiesNames.Bearer);

                var promise = Requests.addNewIssue(token, id, issue);

                promise.then(function success(response) {

                }, function error(response) {

                });
            };

            return commands;
        }]);
})();