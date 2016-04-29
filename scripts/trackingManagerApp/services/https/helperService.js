﻿(function () {

    var httpHelper = angular.module('trackingManagerApp.services.https.helperService', []);

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
        UpdateProject: '/Projects/',
        GetLabels: '/labels/'
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