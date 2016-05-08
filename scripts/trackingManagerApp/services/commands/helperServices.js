﻿(function () {

    var helperServices = angular.module('trackingManagerApp.services.commands.helperServices',
        ['trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.cookies.cookieService']);

    helperServices.factory('helperServices', ['getParameters', 'redirect', 'cookieManager', function (getParameters, redirect, cookieManager) {
        var commands = {};

        commands.createDate = function createDate(dateAsString) {
            var datesParams = dateAsString.split(/[\s\/:]/);
            var date = new Date(Date.UTC(datesParams[2], datesParams[1] - 1, datesParams[0], datesParams[3], datesParams[4]));

            return date;
        }

        commands.splitString = function splitString(stringValue, separator) {
            var array = stringValue.split(separator);

            return array;
        }

        commands.getPageNumber = function getPageNumber(name) {
            var result = typeof (getParameters.getValue(name)) === 'undefined' ? 1 : getParameters.getValue(name);

            return result;
        }

        commands.reloadPage = function reloadPage() {
            redirect.reloadPage();
        }

        return commands;
    }]);
})();