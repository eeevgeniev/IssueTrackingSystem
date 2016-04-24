(function () {
    var issueCommands = angular.module('trackingManagerApp.services.commands.issueServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices',
    '']);

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

        commands.createIssue = function createIssue(value) {
            var issue = {};
            issue.Title = value.Title;
            issue.Description = value.Description;
            issue.ProjectId = value.Project.Id;
            issue.AssigneeId = value.Assignee.Id;
            issue.PriorityId = value.Priority.Id;
            issue.List = value.Labels;

            var datesParams = value.DueDate.split(/[\s\/:]/);
            issue.DueDate = new Date(datesParams[4], datesParams[3] - 1, datesParams[2], datesParams[0], datesParams[1]);

            return issue;
        }

        return commands;
    } ]);
})();