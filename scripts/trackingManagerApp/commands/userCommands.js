(function () {
    var userCommands = angular.module('TrackingManagerApp.Commands.UserCommands', ['TrackingManagerApp.Https.Request',
    'TrackingManagerApp.Cookies.Cookie', 'TrackingManagerApp.Routes.Routes']);

    userCommands.factory('UserCommands', ['$q', 'Requests', 'CookieManager', 'CookiesNames', 'Redirect',
    function ($q, Requests, CookieManager, CookiesNames, Redirect) {
        var commands = {};

        commands.loginUser = function loginUser(user) {
            var promise = Requests.login(user);

            promise.then(function success(response) {
                CookieManager.setCookie(CookiesNames.Bearer, response.data.access_token);
                commands.getUser();
            }, function error(response) {
                console.log(response.data['error_description']);
            })
        }

        commands.regsiterUser = function registerUser(user) {
            var promise = Requests.register(user);

            promise.then(function success(response) {
                var newUser = {};
                newUser.email = user.email;
                newUser.password = user.password;

                commands.loginUser(newUser);
            }, function error(response) {
                for (var property in response.data.ModelState) {
                    if (property === 'model.Email' || property === 'model.Password' || property === '' || property === 'model.ConfirmPassword') {
                        console.log(response.data.ModelState[property][0]);
                        return;
                    }
                }

                console.log('Error registration');
            })
        }

        commands.getUser = function getUser() {
            var token = CookieManager.getCookie(CookiesNames.Bearer),
                promise = Requests.getUser(token)

            promise.then(function success(response) {
                CookieManager.setObject(CookiesNames.User, response.data);
                Redirect.changeLocation('/dashboard');
            }, function error(response) {
                console.log(response);
            });
        }

        commands.changePassword = function changePassword(user) {
            var token = CookieManager.getCookie(CookiesNames.Bearer),
                promise = Requests.changePassword(user, token);

            promise.then(function success(response) {
                console.log(response);
            }, function error(response) {
                console.log(response);
            });
        }

        commands.logoutUser = function logoutUser() {
            CookieManager.remove(CookiesNames.Bearer);
            Redirect('');
        }

        commands.getUserIssues = function getUserIssues(pageSize, pageNumber, orderBy) {
            var token = CookieManager.getCookie(CookiesNames.Bearer),
                promise = Requests.getUserIssues(token, pageSize, pageNumber, orderBy)

            return promise;
        }

        commands.getUsers = function getUsers() {
            var token = CookieManager.getCookie(CookiesNames.Bearer),
                promise = Requests.getUsers(token);

            return promise;
        }

        commands.isUserAdmin = function isUserAdmin() {
            var user = CookieManager.getObjectCookie(CookiesNames.User);

            if (typeof(user) === 'undefined') {
                return false;   
            }
            
            return user.isAdmin;
        }

        return commands;
    } ]);
})();