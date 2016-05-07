(function () {
    var modalCommands = angular.module('trackingManagerApp.services.commands.modalServices', []);

    modalCommands.factory('modalServices', ['$rootScope', 'ModalFormClosed', function ($rootScope, ModalFormClosed) {
        var commands = {};

        commands.createModal = function createModal(elementId, modalHeight, modalWidth) {
            var projectDialog = $(elementId).dialog({
                dialogClass: 'no-close',
                autoOpen: false,
                height: modalHeight,
                width: modalWidth,
                modal: true,
                buttons: {
                    Cancel: function () {
                        projectDialog.dialog("close");
                        $rootScope.$broadcast(ModalFormClosed);
                    },
                    Close: function () {
                        projectDialog.dialog("close");
                        $rootScope.$broadcast(ModalFormClosed);
                    }
                }
            });

            $(elementId).removeClass('hidden');
            projectDialog.dialog('open');
        }

        return commands;
    }]);
})();