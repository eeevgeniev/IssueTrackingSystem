(function () {
    var issueCommands = angular.module('trackingManagerApp.services.commands.issueServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices',
    'trackingManagerApp.services.commands.responseGetterServices']);

    issueCommands.factory('issueServices', ['$q', 'requests', 'redirect', 'getParameters', 'cookieManager',
    'cookiesNames', 'notifyService', 'responseGetterServices',
    function ($q, requests, redirect, getParameters, cookieManager, cookiesNames, notifyService, responseGetterServices) {
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
                notifyService.generateErrorMessage(response);
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
                notifyService.generateErrorMessage(response);
            });

            return deffered.promise;
        }

        commands.changeIssueStatus = function changeIssueStatus(statusId) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                issueId = getParameters.getValue('id'),
                promise = requests.changeIssueStatus(token, issueId, statusId);

            promise.then(function (response) {
                notifyService.generateInfoMessage('Issue status succefully updated!');
                redirect.reloadPage();
            }, function (response) {
                redirect.changeLocation('');
                notifyService.generateErrorMessage(response);
            });
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

        commands.editIssue = function editIssue(issue) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                issueId = getParameters.getValue('id'),
                promise = requests.updateIssue(token, issueId, issue);

            promise.then(function success(response) {
                notifyService.generateInfoMessage('Issue updated.');
            }, function error(response) {
                notifyService.generateErrorMessage(response);
            });
        };

        commands.newIssue = function newIssue(value) {
            var issue = {};
            issue.Title = value.Title;
            issue.Description = value.Description;
            issue.ProjectId = value.Project.Id;
            issue.AssigneeId = value.Assignee.Id;
            issue.PriorityId = value.Priority.Id;
            issue.Labels = value.Labels;
            issue.DueDate = new Date();

            if (typeof(value.DueDate) !== 'undefined') {
                var datesParams = value.DueDate.split(/[\s\/:]/);
                issue.DueDate = new Date(datesParams[4], datesParams[3] - 1, datesParams[2], datesParams[0], datesParams[1]);
            }

            return issue;
        }

        commands.redirectToIssue = function redirectToIssue() {
            var issueId = getParameters.getValue('id');
            redirect.changeLocation('/issues/' + issueId);
            notifyService.generateInfoMessage('You don\'t have permission to edit issue.');
        }

        commands.isUserIssueAssignee = function isUserIssueAssignee(issueAssigneeId) {
            var user = cookieManager.getObjectCookie(cookiesNames.User);

            if (typeof (user) === 'undefined') {
                return false;
            }

            return user.Id === issueAssigneeId;
        }

        commands.getAvailableLabels = function getAvailableLabels(addedLabels, labels) {

            for (var i = 0; i < labels.length; i++) {
                var isAdded = false;
                for (var c = 0; c < addedLabels.length; c++) {
                    if (labels[i].Id === addedLabels[c].Id) {
                        isAdded = true;
                        break;
                    }
                }

                if (!isAdded) {
                    addedLabels.push(labels[i]);
                }
            }

            return addedLabels;
        }

        return commands;
    }]);
})();