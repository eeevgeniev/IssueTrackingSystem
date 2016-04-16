(function () {
    var httpRequest = angular.module('TrackingManagerApp.Https.Request', ['TrackingManagerApp.Https.Helper']);

    httpRequest.factory('Requests', ['$http', '$q', 'Urls', 'EncodeURIComponent', 'Headers',
        function ($http, $q, Urls, EncodeURIComponent, Headers) {
        var requests = {};

        requests.login = function login(user) {
            var data = 'grant_type=password&username=' +
                EncodeURIComponent.encode(user.email) + '&password=' + EncodeURIComponent.encode(user.password);

            var promise = httpRequest(Urls.DefaultUrl + Urls.Login, Headers.RegisterHeader, 'POST', data);

            return promise;
        }

        requests.register = function register(user) {
            var promise = httpRequest(Urls.DefaultUrl + Urls.Register, Headers.LoginHeader, 'POST', user);

            return promise;
        }

        requests.getUser = function getUser(token) {
            var header = loginHeader(token);
            
            var promise = httpRequest(Urls.DefaultUrl + Urls.Me, header, 'GET', null);

            return promise;
        }

        requests.changePassword = function changePassword(user, token) {
            var header = loginHeader(token);
            
            var promise = httpRequest(Urls.DefaultUrl + Urls.ChangePassword, header, 'POST', user);

            return promise;
        }

        function httpRequest(location, headersData, methodType, bodyData) {
            var deferred = $q.defer();

            $http({
                url: location,
                headers: headersData,
                method: methodType,
                data: bodyData
            })
                .then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        function loginHeader(token){
            var header = Headers.UserHeader
            header.Authorization = token;

            return header;
        }

        return requests;
    }]);
})();
