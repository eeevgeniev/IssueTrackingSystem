(function () {

    var httpHelper = angular.module('trackingManagerApp.services.https.helperService', []);

    httpHelper.constant('Urls', {
        DefaultUrl: 'http://softuni-issue-tracker.azurewebsites.net',
        Register: '/api/Account/Register',
        Login: '/api/Token',
        Me: '/users/Me',
        ChangePassword: '/api/Account/ChangePassword',
        GetIssue: '/Issues/',
        GetFilteredIssue: '/issues?pageSize=1&pageNumber=1&filter=Id==',
        UserIssues: '/Issues/me',
        NewIssue: '/Issues',
        UpdateIssue: '/Issues/',
        ChangeIssueStatus: '/changestatus?statusId=',
        GetUsers: '/Users',
        GetProject: '/Projects/',
        GetProjects: '/Projects',
        NewProject: '/Projects',
        UpdateProject: '/Projects/',
        GetLabels: '/labels',
        GetComments: '/comments',
        PostComment: '/comments'
    });

    httpHelper.constant('headers', {
        LoginHeader: { 'Content-type': 'application/json' },
        RegisterHeader: { 'Content-Type': 'application/x-www-form-urlencoded' },
        UserHeader: { 'Content-type': 'application/json', 'Authorization': null }
    });

    httpHelper.factory('uriComponentEncode', [function () {
        return {
            encode: function (data) {
                return encodeURIComponent(data);
            }
        }
    }]);

})();