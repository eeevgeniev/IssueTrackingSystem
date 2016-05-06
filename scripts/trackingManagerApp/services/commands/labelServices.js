(function () {
    var labelModule = angular.module('trackingManagerApp.services.commands.labelServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices',
    'trackingManagerApp.services.commands.responseGetterServices', 'trackingManagerApp.services.commands.helperServices']);

    labelModule.factory('labelServices', ['$q', 'requests', 'redirect', 'cookieManager',
    'cookiesNames', 'notifyService', 'responseGetterServices', 'helperServices',
     function ($q, requests, redirect, cookieManager, cookiesNames, notifyService, responseGetterServices, helperServices) {
         var commands = {};

         commands.getLabels = function getLabels(labelName) {

             var token = cookieManager.getCookie(cookiesNames.Bearer),
                 deffered = $q.defer();

             var promise = requests.getLabels(token, labelName);

             promise.then(function (response) {
                 var labels = responseGetterServices.getArray(response.data, ['Name']);
                 response = null;
                 deffered.resolve(labels);
             }, function (response) {
                 notifyService.generateResponseErrorMessage(response);
             })

             return deffered.promise;
         }

         commands.labelsFromString = function labelsFromString(labelsAsString) {
             var labels = [];
             var splittedLabels = helperServices.splitString(labelsAsString, ',');

             splittedLabels.forEach(function (currentLabel) {
                 labels.push({ Name: currentLabel.trim() });
             });

             return labels;
         }

         commands.clickedLabel = function clickedLabel(event, labelsAsText) {
             if (typeof (labelsAsText) === 'undefined') {
                 $('#drop-down').css('display', 'none');
                 return '';
             }

             var quoteIndex = labelsAsText.lastIndexOf(','),
                 length = labelsAsText.length,
                 addedLabels = labelsAsText.substr(0, quoteIndex + 1);

             var statusId = $(event.target).attr('label-name');
             $('#drop-down').css('display', 'none');

             return labelsAsText = addedLabels + ' ' + statusId;
         }

         commands.keyPressedLabel = function keyPressedLabel(event, labelsOptions, labelsAsText) {
             var emptyResult = '';

             if (typeof (labelsOptions) !== 'undefined') {
                 if (event.keyCode === 27) {
                     $('#drop-down').css('display', 'none');
                     return emptyResult;
                 } else if (event.keyCode === 40 || event.keyCode === 38) {
                     var indexValue = event.keyCode === 40 ? 1 : -1;

                     for (var i = 0; i < labelsOptions.length; i++) {
                         if (labelsOptions[i].isSelected === true) {
                             var newIndex = i + indexValue;

                             if (newIndex >= labelsOptions.length) {
                                 newIndex = 0;
                             } else if (newIndex < 0) {
                                 newIndex = labelsOptions.length - 1;
                             }

                             labelsOptions[i].isSelected = false;
                             labelsOptions[newIndex].isSelected = true;
                             break;
                         }
                     }

                     return emptyResult;

                 } else if (event.keyCode === 13) {
                     for (var i = 0; i < labelsOptions.length; i++) {
                         if (labelsOptions[i].isSelected === true) {
                             var quoteIndex = labelsAsText.lastIndexOf(','),
                                 length = labelsAsText.length,
                                 addedLabels = labelsAsText.substr(0, quoteIndex + 1);
                             $('#drop-down').css('display', 'none');
                             return addedLabels + ' ' + labelsOptions[i].Name;
                         }
                     }
                 }  
             }

             return emptyResult;
         }

         return commands;
     }]);
})();