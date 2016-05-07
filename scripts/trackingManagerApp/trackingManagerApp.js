(function () {
    var mainModule = angular.module('trackingManagerApp', ['trackingManagerApp.routes.routeConfig', 'trackingManagerApp.controllers.issues.menuController']);

    mainModule.constant('ModalFormClosed', 'modalFormClosed');
    mainModule.constant('UserLoggedLogout', 'userLoggedLogout');
    mainModule.constant('IssueCreated', 'issueCreated');
    mainModule.constant('ProjectCreated', 'projectCreated');
})();