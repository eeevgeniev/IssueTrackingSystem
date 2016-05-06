(function () {

    var helperServices = angular.module('trackingManagerApp.services.commands.helperServices', []);

    helperServices.factory('helperServices', [function () {
        var commands = {};

        commands.createDate = function createDate(dateAsString, removeTimezoneOffset) {
            var datesParams = dateAsString.split(/[\s\/:]/);
            var date = new Date(datesParams[2], datesParams[1] - 1, datesParams[0], datesParams[3], datesParams[4]);

            if (removeTimezoneOffset) {
                var newDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDay(),
                    date.getHours(), date.getMinutes() - date.getTimezoneOffset());
                date = newDate;
            }

            return date;
        }

        commands.splitString = function splitString(stringValue, separator) {
            var array = stringValue.split(separator);

            return array;
        }

        return commands;
    }]);
})();