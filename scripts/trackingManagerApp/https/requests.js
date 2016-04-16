(function () {
    var httpRequest = angular.module('TrackingManagerApp.Https.Request', ['TrackingManagerApp.Https.Helper']);

    httpRequest.factory('Requests', ['$http', '$q', 'Urls', 'EncodeURIComponent', function ($http, $q, Urls, EncodeURIComponent) {
        var requests = {};

        requests.login = function login(user) {
            var data = 'grant_type=password&username=' +
                EncodeURIComponent.encode(user.email) + '&password=' + EncodeURIComponent.encode(user.password);

            var promise = httpRequest(Urls.DefaultUrl + Urls.Login, { 'Content-Type': 'application/x-www-form-urlencoded' }, 'POST', data);

            return promise;
        }

        requests.register = function register(user) {
            var promise = httpRequest(Urls.DefaultUrl + Urls.Register, null, 'POST', user);

            return promise;
        }

        function httpRequest(location, headersData, methodType, bodyData) {
            headersData = headersData || { 'Content-type': 'application/json' };

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

        return requests;
    }]);
})();
