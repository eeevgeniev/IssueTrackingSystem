(function () {
    var responseGetterModule = angular.module('trackingManagerApp.services.commands.responseGetterServices', []);

    responseGetterModule.factory('responseGetterServices', [function () {
        var getter = {};

        getter.dataGetter = function dataGetter(response, properties){
            var result = {};

            for (var currentProperty in properties) {
                result[currentProperty] = response[currentProperty];
            }

            return result;
        }

        return getter;
    }]);
})