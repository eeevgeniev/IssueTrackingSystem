(function () {
    var userCommands = angular.module('trackingManagerApp.services.commands.userServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices',
    'trackingManagerApp.services.commands.responseGetterServices']);

    userCommands.factory('userServices', ['$q', '$rootScope', 'requests', 'cookieManager', 'cookiesNames', 'redirect',
        'notifyService', 'responseGetterServices', 'getParameters',
        function ($q, $rootScope, requests, cookieManager, cookiesNames, redirect,
        notifyService, responseGetterServices, getParameters) {
            var commands = {};

            commands.getUser = function getUser() {
                var token = cookieManager.getCookie(cookiesNames.Bearer),
                    promise = requests.getUser(token);

                promise.then(function success(response) {
                    cookieManager.setObject(cookiesNames.User, response.data);
                    notifyService.generateInfoMessage('Successfull login.');
                    $rootScope.$broadcast('userLoggedLogout');
                    redirect.reloadPage();
                }, function error(response) {
                    notifyService.generateResponseErrorMessage(response);
                    redirect.changeLocation('');
                });
            }

            commands.loginUser = function loginUser(user) {
                var promise = requests.login(user),
                    accessToken = 'access_token';

                promise.then(function success(response) {
                    var tokenObject = responseGetterServices.dataGetter(response.data, [accessToken]);
                    response = null;
                    cookieManager.setCookie(cookiesNames.Bearer, tokenObject[accessToken]);
                    commands.getUser();
                }, function error(response) {
                    notifyService.generateResponseErrorMessage(response);
                    redirect.changeLocation('');
                })
            }

            commands.registerUser = function registerUser(user) {
                var promise = requests.register(user);

                promise.then(function success(response) {
                    var newUser = {};
                    newUser.email = user.email;
                    newUser.password = user.password;

                    commands.loginUser(newUser);
                    notifyService.generateSuccessMessage('Successfull registration.');
                }, function error(response) {
                    notifyService.generateResponseErrorMessage(response);
                    redirect.changeLocation('');
                })
            }

            commands.changePassword = function changePassword(user) {
                var token = cookieManager.getCookie(cookiesNames.Bearer),
                    promise = requests.changePassword(user, token);

                promise.then(function success(response) {
                    notifyService.generateInfoMessage('Password changed.');
                }, function error(response) {
                    notifyService.generateResponseErrorMessage(response);
                });
            }

            commands.getUserIssues = function getUserIssues(pageSize, pageNumber, orderBy) {
                var token = cookieManager.getCookie(cookiesNames.Bearer),
                    deffered = $q.defer(),
                    promise = requests.getUserIssues(token, pageSize, pageNumber, orderBy);

                promise.then(function success(response) {
                    var result = responseGetterServices.dataGetter(response.data, ['Issues', 'TotalCount', 'TotalPages']);
                    result.Issues = responseGetterServices.getArray(result.Issues, ['Title', 'DueDate', 'Project', 'Id', 'Priority']);
                    response = null;
                    deffered.resolve(result);
                }, function error(response) {
                    notifyService.generateResponseErrorMessage(response);
                    redirect.changeLocation('');
                })

                return deffered.promise;
            }

            commands.getUsers = function getUsers() {
                var token = cookieManager.getCookie(cookiesNames.Bearer),
                    deffered = $q.defer(),
                    promise = requests.getUsers(token);

                promise.then(function success(response) {
                    var result = responseGetterServices.getArray(response.data, ['Id', 'Username']);
                    response = null;
                    deffered.resolve(result);
                }, function error(response) {
                    notifyService.generateResponseErrorMessage(response);
                    redirect.changeLocation('');
                })

                return deffered.promise;
            }

            commands.getDashboardPage = function getDashboardPage(parameter) {
                var page = typeof (getParameters.getValue(parameter)) === 'undefined' ? 1 : getParameters.getValue(parameter);

                return page;
            }

            return commands;
        }]);
})();