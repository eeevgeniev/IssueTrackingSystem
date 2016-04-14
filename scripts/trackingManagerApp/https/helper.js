(function () {

    var httpHelper = angular.module('TrackingManagerApp.Https.Helper', []);

    httpHelper.constant('Urls', {
        DefaultUrl: 'http://softuni-issue-tracker.azurewebsites.net',
        Register: '/api/Account/Register',
        Login: '/api/Token'
    });

    httpHelper.factory('EncodeURIComponent', [function () {
        return {
            encode: function (data) {
                return encodeURIComponent(data);
            }
        }
    }])

})();