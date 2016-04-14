(function () {
    var userModule = angular.module('TrackingManagerApp.Controllers.Users.User', ['TrackingManagerApp.Https.Request']);

    userModule.controller('UserController', ['$scope', '$q', 'Requests', function ($scope, $q, Requests) {

        $scope.heading = 'Welcome guest. Login or register.';

        $scope.login = function login() {
            var promise = Requests.login($scope.user);

            promise.then(function success(response) {
                var userCredentials = {};
                userCredentials.token = response.data.access_token;
                userCredentials.name = response.data.userName;
                console.log(JSON.stringify(userCredentials));
            }, function error(response) {
                console.log(response.data.ModelState[''][1]);
            })
        }

        $scope.register = function register() {
            var promise = Requests.send($scope.newUser);

            promise.then(function success(response) {
                var user = {};

                user.email = $scope.newUser.email;
                user.password = $scope.newUser.password;

                Requests.login(user);
            }, function error(response) {
                for (var property in response.data.ModelState) {
                    if (property === 'model.Email' || property === 'model.Password' || property === '' || property === 'model.ConfirmPassword') {
                        console.log(response.data.ModelState[property][0]);
                        return;
                    }
                }

                console.log('Error registration');
            })
        };
    }]);
})();