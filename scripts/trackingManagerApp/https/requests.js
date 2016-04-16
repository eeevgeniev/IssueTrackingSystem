(function () {
    var httpRequest = angular.module('TrackingManagerApp.Https.Request', []);

    httpRequest.factory('Requests', ['', function () {
        function request(url, method, success, error, data, headers) {
            headers = headers || { 'Content-type': 'application/json' };

            $http({
                'url': url,
                'headers': headers,
                'method': method,
                'data': data,
            }).then(function (response) {
                success(response);
            }, function (response) {
                error(response);
            });
        }

        return {
            request: request(url, method, success, error, data, headers)
        }
    }]);
})();