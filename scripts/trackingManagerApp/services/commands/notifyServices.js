(function () {

    var notifyModule = angular.module('trackingManagerApp.services.commands.notifyServices', []);

    notifyModule.factory('notifyService', [function () {

        var notifies = {};

        notifies.generateInfoMessage = function generateInfoMessage(message) {
            notifies.notify('success', message);
        }

        notifies.generateErrorMessage = function generateErrorMessage(message) {
            notifies.notify('error', message);
        }

        notifies.generateWarningMessage = function generateWarningMessage(message) {
            notifies.notify('warning', message);
        }

        notifies.generateInfoMessage = function generateInfoMessage(message) {
            notifies.notify('info', message);
        }

        notifies.generateResponseErrorMessage = function generateErrorMessage(response) {
            var message = '',
            openDiv = '<div>',
            closeDiv = '</div>'

            if (typeof (response.data.Message) !== 'undefined') {
                message += openDiv + response.data.Message + closeDiv
            }

            if (typeof (response.data.ModelState) !== 'undefined') {
                for (var property in response.data.ModelState) {
                    message += openDiv + response.data.ModelState[property] + closeDiv;
                }
            }

            if (typeof (response.data.error_description !== 'undefined')) {
                message += openDiv + response.data.error_description + closeDiv;
            }

            if (message.length === 0) {
                message = openDiv + 'Error!' + closeDiv;
            }

            notifies.notify('error', message);
        }

        notifies.notify = function notify(notyType, notice) {
            $('#notifications').noty({
                layout: 'top',
                type: notyType,
                text: notice,
                dismissQueue: true,
                animation: {
                    open: { height: 'toggle' },
                    close: { height: 'toggle' },
                    easing: 'swing',
                    speed: 500
                },
                timeout: 3000
            });
        }

        return notifies;
    }]);

})();