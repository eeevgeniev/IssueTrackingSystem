(function () {
    var cookie = angular.module('TrackingManagerApp.Cookies.Cookie', ['ngCookie'])

    cookie.factory('TrackingManagerApp.Cookies.CookieManager', ['$cookies', function ($cookies) {
        function getCookie(key) {
            return $cookies.getObject(key);
        }

        function setCookie(key, value) {
            $cookies.put(key, value);
        }

        function setObject(key, value) {
            $cookies.putObject(key, value);
        }

        function deleteCookie(key) {
            $cookies.remove(key);
        }

        return {
            getCookie: getCookie(key),
            setCookie: setCookie(key, value),
            setObject: setObject(key, value),
            deleteCookie: deleteCookie(key)
        }
    }]);
})();