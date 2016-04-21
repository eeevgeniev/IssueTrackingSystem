(function () {
    var issueCommands = angular.module('trackingManagerApp.services.commands.issueServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices']);

    issueCommands.factory('issueServices', ['$q', 'requests', 'redirect', 'getParameters', 'cookieManager',
    'cookiesNames', 'notifyService',
    function ($q, requests, redirect, getParameters, cookieManager, cookiesNames, notifyService) {
        var commands = {};

        commands.getIssue = function getIssue() {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                id = getParameters.getValue('id'),
                deffered = $q.defer(),
                promise = requests.getIssue(token, id);

            promise.then(function (response) {
                deffered.resolve(response);
            }, function (response) {
                redirect.changeLocation('');
                notifyService.generateErrorMessage(response);
            })

            return deffered.promise;
        }

        commands.createIssue = function createIssue(issue) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                promise = requests.addNewIssue(token, issue);

            promise.then(function success(response) {
                // to do
                redirect.changeLocation('');
            }, function error(response) {
                // to do
                redirect.changeLocation('');
                notifyService.generateErrorMessage(response);
            });
        };

        commands.editIssue = function editIssue(id, issue) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                promise = requests.addNewIssue(token, id, issue);

            promise.then(function success(response) {
                notifyService.generateInfoMessage('Issue updated.');
            }, function error(response) {
                notifyService.generateErrorMessage(response);
            });
        };

        return commands;
    } ]);
})();