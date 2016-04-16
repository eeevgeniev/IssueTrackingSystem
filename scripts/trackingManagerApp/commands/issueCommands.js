(function () {
    var issueCommands = angular.module('TrackingManagerApp.Commands.IssuesCommands', ['TrackingManagerApp.Https.Request',
    'TrackingManagerApp.Cookies.Cookie', 'TrackingManagerApp.Routes.Routes']);

    issueCommands.factory('IssueCommands', ['$q', 'Requests', 'Redirect',
        function ($q, Requests, Redirect) {
        var commands = {};

        commands.createIssue = function createIssue(issue) {
            var datesParams = issue.dueDate.split('/');
            issue.dueDate = new Date(datesParams[2], datesParams[1] - 1, datesParams[0]);
            console.log(issue);
            return;

            var token = CookieManager.getCookie(CookiesNames.Bearer);

            var promise = Requests.addNewIssue(token, issue);
        }

        return commands;
    }]);

})();