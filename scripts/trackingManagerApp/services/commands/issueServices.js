(function () {
    var issueCommands = angular.module('trackingManagerApp.services.commands.issueServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices',
    'trackingManagerApp.services.commands.responseGetterServices', 'trackingManagerApp.services.commands.labelServices',
    'trackingManagerApp.services.commands.helperServices']);

    issueCommands.factory('issueServices', ['$rootScope', '$q', 'requests', 'redirect', 'getParameters', 'cookieManager',
    'cookiesNames', 'notifyService', 'responseGetterServices', 'labelServices', 'helperServices', 'IssueCreated',
    function ($rootScope, $q, requests, redirect, getParameters, cookieManager, cookiesNames, notifyService,
    responseGetterServices, labelServices, helperServices, IssueCreated) {
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
                var issue = responseGetterServices.dataGetter(response.data.Issues[0], ['Assignee', 'Author', 'AvailableStatuses',
                    'Description', 'DueDate', 'Id', 'IssueKey', 'Labels', 'Priority', 'Project', 'Status', 'Title', 'AvailableStatuses']);
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
                notifyService.generateSuccessMessage('Issue status updated!');
                redirect.reloadPage();
            }, function (response) {
                notifyService.generateResponseErrorMessage(response);
            });
        }

        commands.createIssue = function createIssue(issue) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                promise = requests.addNewIssue(token, issue);

            promise.then(function success(response) {
                notifyService.generateSuccessMessage('Issue created!');
                $rootScope.$broadcast(IssueCreated);
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
                notifyService.generateSuccessMessage('Issue updated.');
            }, function error(response) {
                redirect.changeLocation('');
                notifyService.generateResponseErrorMessage(response);
            });
        };

        commands.getIssueComments = function getIssueComments() {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                issueId = getParameters.getValue('id'),
                deffered = $q.defer(),
                promise = requests.getIssueComments(token, issueId);

            promise.then(function success(response) {
                var comments = responseGetterServices.getArray(response.data, ['Text', 'CreatedOn', 'Author']);
                response = null;
                deffered.resolve(comments);
            }, function error(response) {
                notifyService.generateResponseErrorMessage(response);
            });

            return deffered.promise;
        }

        commands.addNewIssueComment = function addNewIssueComment(text) {
            var comment = {};
            comment.Text = text;

            var token = cookieManager.getCookie(cookiesNames.Bearer),
                issueId = getParameters.getValue('id'),
                promise = requests.addNewIssueComment(token, issueId, comment);

            promise.then(function success(response) {
                notifyService.generateSuccessMessage('Comment created!');
                redirect.reloadPage();
            }, function error(response) {
                notifyService.generateResponseErrorMessage(response);
            });
        }

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

            issue.DueDate = helperServices.createDate(value.DueDate);
            issue.Labels = labelServices.labelsFromString(issue.Labels, ',');

            return issue;
        }

        commands.redirectToIssue = function redirectToIssue() {
            var issueId = getParameters.getValue('id');
            redirect.changeLocation('/issues/' + issueId);
            notifyService.generateErrorMessage('You don\'t have permission to edit this issue.');
        }

        commands.isUserAssigneeInIssue = function isUserAssigneeInIssue(issues) {
            var user = cookieManager.getObjectCookie(cookiesNames.User);
            var userId = user.Id;

            for (var i = 0; i < issues.length; i++) {
                if (issues[i].Assignee.Id === userId) {
                    return true;
                }
            }

            return false;
        }

        return commands;
    }]);
})();