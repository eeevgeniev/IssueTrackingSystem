﻿(function () {
    var filterModule = angular.module('TrackingManagerApp.Filters.Filter', []);

    filterModule.filter('ShowName', [function () {

        return function (array) {

            if (typeof (array) === 'undefined') {
                return '';
            }

            var i = 0,
                count = array.length,
                result = '';

            for (i; i < count; i++) {
                if (i !== 0) {
                    result += ', ' + array[i].Name;
                } else {
                    result += array[i].Name;
                }
            }

            return result;
        }

    }]);
})();