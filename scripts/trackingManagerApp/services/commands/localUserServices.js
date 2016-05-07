(function () {

    var localUserModule = angular.module('trackingManagerApp.services.commands.localUserServices',
        ['trackingManagerApp.services.commands.cookies.cookieService', 'trackingManagerApp.services.https.requestService',
        'trackingManagerApp.services.commands.notifyServices']);

    localUserModule.factory('localUserServices', ['$rootScope', 'cookieManager',
        'cookiesNames', 'redirect', 'notifyService', 'UserLoggedLogout',
        function ($rootScope, cookieManager, cookiesNames, redirect, notifyService, UserLoggedLogout) {
            var commands = {};

            commands.isUserAdmin = function isUserAdmin() {
                var user = cookieManager.getObjectCookie(cookiesNames.User);

                if (typeof (user) === 'undefined') {
                    return false;
                }

                return user.isAdmin;
            }

            commands.isUserRegistered = function isUserRegistered() {
                var user = cookieManager.getObjectCookie(cookiesNames.User);
                var token = cookieManager.getCookie(cookiesNames.Bearer);

                if (typeof (user) === 'undefined' || typeof (token) === 'undefined') {
                    return false;
                }

                return true;
            }

            commands.invalidCookies = function invalidCookies() {
                commands.destroyUserCookies();
                $rootScope.$broadcast('userLoggedLogout');
                notifyService.generateErrorMessage('Invalid user data.');
                redirect.changeLocation('');
            }

            commands.destroyUserCookies = function destroyUserCookies() {
                cookieManager.deleteCookie(cookiesNames.Bearer);
                cookieManager.deleteCookie(cookiesNames.User);
                $rootScope.$broadcast(UserLoggedLogout);
            }

            commands.logoutUser = function logoutUser() {
                commands.destroyUserCookies();
                notifyService.generateInfoMessage('Successfull logout.');
                redirect.changeLocation('');
            }

            commands.isUserIssueAssignee = function isUserIssueAssignee(issueAssigneeId) {
                var user = cookieManager.getObjectCookie(cookiesNames.User);

                if (typeof (user) === 'undefined') {
                    return false;
                }

                return user.Id === issueAssigneeId;
            }

            commands.isProjectLeader = function isProjectLeader(leaderId) {
                var user = cookieManager.getObjectCookie(cookiesNames.User);

                if (typeof (user) === 'undefined') {
                    return false;
                }

                return user.Id === leaderId;
            }

            return commands;
        }])
})();