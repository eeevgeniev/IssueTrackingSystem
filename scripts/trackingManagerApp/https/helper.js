(function () {

    var httpHelper = angular.module('TrackingManagerApp.Https.Helper', []);

    httpHelper.constant('Urls', {
        DefaultUrl: 'http://softuni-issue-tracker.azurewebsites.net',
        Register: '/api/Account/Register',
        Login: '/api/Token',
        Me: '/users/Me',
        ChangePassword: '/api/Account/ChangePassword',
        GetIssue: '/Issues/',
        UserIssues: '/Issues/me',
        NewIssue: '/Issues',
        UpdateIssue: '/Issues/',
        GetUsers: '/Users',
        GetProject: '/Projects/',
        GetProjects: '/Projects',
        NewProject: '/Projects',
        UpdateProject: '/Projects/'
    });

    httpHelper.constant('Headers', {
        LoginHeader: { 'Content-type': 'application/json' },
        RegisterHeader: { 'Content-Type': 'application/x-www-form-urlencoded' },
        UserHeader: { 'Content-type': 'application/json', 'Authorization': null }
    });

    httpHelper.factory('EncodeURIComponent', [function () {
        return {
            encode: function (data) {
                return encodeURIComponent(data);
            }
        }
    }]);

})();