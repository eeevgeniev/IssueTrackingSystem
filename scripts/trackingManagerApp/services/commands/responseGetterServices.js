(function () {
    var responseGetterModule = angular.module('trackingManagerApp.services.commands.responseGetterServices', []);

    responseGetterModule.factory('responseGetterServices', [function () {
        var getter = {};

        getter.dataGetter = function dataGetter(object, properties) {
            var result = {};

            properties.forEach(function (currentProperty) {

                result[currentProperty] = object[currentProperty];

            });

            return result;
        }

        getter.getArray = function getArray(values, properties) {
            var result = [];

            values.forEach(function (currentValue) {
                var newValue = {};

                properties.forEach(function (currentProperty) {
                    newValue[currentProperty] = currentValue[currentProperty];
                });

                result.push(newValue);
            });

            return result;
        }

        return getter;
    }]);
})();