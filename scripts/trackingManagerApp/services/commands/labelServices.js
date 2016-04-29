﻿(function () {
    var labelModule = angular.module('trackingManagerApp.services.commands.labelServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices',
    'trackingManagerApp.services.commands.responseGetterServices']);

    labelModule.factory('issueServices', ['$q', 'requests', 'redirect', 'cookieManager',
    'cookiesNames', 'notifyService', 'responseGetterServices',
     function ($q, requests, redirect, cookieManager, cookiesNames, notifyService, responseGetterServices) {
         var commands = {};

         commands.getLabels = function getLabels(labelName) {

             var token = cookieManager.getCookie(cookiesNames.Bearer),
                 deffered = $q.defer();

             var promise = requests.getLabels(token, labelName);

             promise.then(function (response) {
                 var result = responseGetterServices.getArray(response.data, ['Id', 'Name']);
                 response = null;

                 deffered.resolve(result);
             }, function (response) {
                 notifyService.generateErrorMessage(response);
             })

             return deffered.promise;
         }

         return commands;
     }]);
})();