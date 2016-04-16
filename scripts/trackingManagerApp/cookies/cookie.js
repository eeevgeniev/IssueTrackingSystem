(function () {
    var cookie = angular.module('TrackingManagerApp.Cookies.Cookie', ['ngCookies'])

    cookie.constant('CookiesNames', {
        Bearer: 'Bearer',
        User: 'User'
    })

    cookie.factory('CookieManager', ['$cookies', function ($cookies) {
        var cookieManager = {};

        cookieManager.getCookie = function getCookie(key) {
            return $cookies.get(key);
        }

        cookieManager.getObjectCookie = function getObjectCookie(key) {
            return $cookies.getObject(key);
        }

        cookieManager.setCookie = function setCookie(key, value) {
            $cookies.put(key, value);
        }

        cookieManager.setObject = function setObject(key, value) {
            $cookies.putObject(key, value);
        }

        cookieManager.deleteCookie = function deleteCookie(key) {
            $cookies.remove(key);
        }

        cookieManager.isCookieSet = function isCookieSet(key) {
            var result = cookieManager.getCookie(key) === null ? false : true;
            return result;
        }

        return cookieManager;
    } ]);
})();