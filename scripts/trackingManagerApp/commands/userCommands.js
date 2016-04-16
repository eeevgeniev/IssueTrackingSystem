(function () {
    var commandExecuter = angular.module('TrackingManagerApp.Commands.UserCommands', ['TrackingManagerApp.Https.Request',
    'TrackingManagerApp.Cookies.Cookie', /*'TrackingManagerApp.Routes.Routes'*/]);

    commandExecuter.factory('Commands', ['$q', 'Requests', 'CookieManager', 'CookiesNames', 'Redirect',
    function ($q, Requests, CookieManager, CookiesNames, Redirect) {
        var userCommands = {};

        userCommands.loginUser = function loginUser(user) {
            var promise = Requests.login(user);

            promise.then(function success(response) {
                CookieManager.setCookie(CookiesNames.Bearer, response.data.access_token);
                CookieManager.setCookie(CookiesNames.Username, response.data.userName);
                Redirect.changeLocation('');
            }, function error(response) {
                console.log(response.data['error_description']);
            })
        }

        userCommands.regsiterUser = function registerUser(user) {
            var promise = Requests.register(user);

            promise.then(function success(response) {
                var newUser = {};
                newUser.email = user.email;
                newUser.password = user.password;

                userCommands.loginUser(newUser);
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

        return userCommands;
    } ]);
})();