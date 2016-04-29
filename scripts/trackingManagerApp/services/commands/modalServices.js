(function () {
    var modalCommands = angular.module('trackingManagerApp.services.commands.modalServices', []);

    modalCommands.factory('modalServices', [function () {
        var commands = {};

        commands.createModal = function createModal(elementId, modalHeight, modalWidth) {
            var projectDialog = $(elementId).dialog({
                autoOpen: false,
                height: modalHeight,
                width: modalWidth,
                modal: true,
                buttons: {
                    Cancel: function () {
                        projectDialog.dialog("close");
                    }
                }, Close: function () {
                    form[0].reset();
                }
            });

            $(elementId).removeClass('hidden');
            projectDialog.dialog('open');
        }

        return commands;
    }]);
})();