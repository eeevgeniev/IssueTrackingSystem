(function () {
    var issueCommands = angular.module('trackingManagerApp.services.commands.issueServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices',
    'trackingManagerApp.services.commands.responseGetterServices', 'trackingManagerApp.services.commands.labelServices',
    'trackingManagerApp.services.commands.helperServices']);

    issueCommands.factory('issueServices', ['$q', 'requests', 'redirect', 'getParameters', 'cookieManager',
    'cookiesNames', 'notifyService', 'responseGetterServices', 'labelServices', 'helperServices',
    function ($q, requests, redirect, getParameters, cookieManager, cookiesNames, notifyService,
    responseGetterServices, labelServices, helperServices) {
        var commands = {};

        commands.getIssue = function getIssue() {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                id = getParameters.getValue('id'),
                deffered = $q.defer(),
                promise = requests.getIssue(token, id);

            promise.then(function (response) {
                var issue = responseGetterServices.dataGetter(response.data, ['Assignee', 'Author', 'AvailableStatuses', 'Description', 'DueDate',
                    'Id', 'IssueKey', 'Labels', 'Priority', 'Project', 'Title']);
                response = null;
                deffered.resolve(issue);
            }, function (response) {
                redirect.changeLocation('');
                notifyService.generateResponseErrorMessage(response);
            });

            return deffered.promise;
        }

        commands.getFilteredIssue = function getFilteredIssue() {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                id = getParameters.getValue('id'),
                deffered = $q.defer(),
                promise = requests.getFilteredIssue(token, id);

            promise.then(function (response) {
                var issue = responseGetterServices.dataGetter(response.data.Issues[0], ['Assignee', 'Author', 'AvailableStatuses', 'Description', 'DueDate',
                    'Id', 'IssueKey', 'Labels', 'Priority', 'Project', 'Status', 'Title', 'AvailableStatuses']);
                response = null;
                deffered.resolve(issue);
            }, function (response) {
                redirect.changeLocation('');
                notifyService.generateResponseErrorMessage(response);
            });

            return deffered.promise;
        }

        commands.changeIssueStatus = function changeIssueStatus(statusId) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                issueId = getParameters.getValue('id'),
                promise = requests.changeIssueStatus(token, issueId, statusId);

            promise.then(function (response) {
                notifyService.generateInfoMessage('Issue status updated!');
                redirect.reloadPage();
            }, function (response) {
                redirect.changeLocation('');
                notifyService.generateResponseErrorMessage(response);
            });
        }

        commands.createIssue = function createIssue(issue) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                promise = requests.addNewIssue(token, issue);

            promise.then(function success(response) {
                redirect.changeLocation('/issues/' + response.data.Id);
                notifyService.generateInfoMessage('Issue created!');
            }, function error(response) {
                redirect.changeLocation('');
                notifyService.generateResponseErrorMessage(response);
            });
        };

        commands.editIssue = function editIssue(issue) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                issueId = getParameters.getValue('id'),
                promise = requests.updateIssue(token, issueId, issue);

            promise.then(function success(response) {
                notifyService.generateInfoMessage('Issue updated.');
            }, function error(response) {
                redirect.changeLocation('');
                notifyService.generateResponseErrorMessage(response);
            });
        };

        commands.newIssue = function newIssue(value) {
            var issue = commands.getEditedIssue(value);
            issue.ProjectId = value.Project.Id;

            return issue;
        }

        commands.getEditedIssue = function getEditedIssue(value) {
            var issue = {};
            issue.Title = value.Title;
            issue.Description = value.Description;
            issue.AssigneeId = value.Assignee.Id;
            issue.PriorityId = value.Priority.Id;
            issue.Labels = value.Labels;

            if (typeof (value.DueDate) === 'undefined') {
                redirect.changeLocation('');
                notifyService.generateErrorMessage('Issue date cannot be empty.')
                return;
            }

            if (typeof (issue.Labels) === 'undefined') {
                redirect.changeLocation('');
                notifyService.generateErrorMessage('Issues labels cannot be empty.')
                return;
            }

            issue.DueDate = helperServices.createDate(value.DueDate, true);
            issue.Labels = labelServices.labelsFromString(issue.Labels, ',');

            return issue;
        }

        commands.redirectToIssue = function redirectToIssue() {
            var issueId = getParameters.getValue('id');
            redirect.changeLocation('/issues/' + issueId);
            notifyService.generateErrorMessage('You don\'t have permission to edit issue.');
        }

        commands.isUserIssueAssignee = function isUserIssueAssignee(issueAssigneeId) {
            var user = cookieManager.getObjectCookie(cookiesNames.User);

            if (typeof (user) === 'undefined') {
                return false;
            }

            return user.Id === issueAssigneeId;
        }

        return commands;
    }]);
})();