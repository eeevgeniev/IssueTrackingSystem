(function () {
    var httpRequest = angular.module('trackingManagerApp.services.https.requestService',
    ['trackingManagerApp.services.https.helperService']);

    httpRequest.factory('requests', ['$http', '$q', 'Urls', 'uriComponentEncode', 'headers',
        function ($http, $q, Urls, uriComponentEncode, headers) {
            var requests = {};

            requests.login = function login(user) {
                var data = 'grant_type=password&username=' + uriComponentEncode.encode(user.email) + '&password=' +
                    uriComponentEncode.encode(user.password),
                    promise = httpRequest(Urls.DefaultUrl + Urls.Login, headers.RegisterHeader, 'POST', data);

                return promise;
            }

            requests.register = function register(user) {
                var promise = httpRequest(Urls.DefaultUrl + Urls.Register, headers.LoginHeader, 'POST', user);

                return promise;
            }

            requests.getUser = function getUser(token) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.Me, header, 'GET', null);

                return promise;
            }

            requests.changePassword = function changePassword(user, token) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.ChangePassword, header, 'POST', user);

                return promise;
            }

            requests.getUsers = function getUsers(token) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.GetUsers, header, 'GET', null);

                return promise;
            }

            requests.getIssue = function getIssue(token, id) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.GetIssue + id, header, 'GET', null);

                return promise;
            }

            requests.getUserIssues = function getUserIssues(token, pageSize, pageNumber, orderBy) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.UserIssues +
                    '?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy,
                    header, 'GET', null);

                return promise;
            }

            requests.updateIssue = function updateIssue(token, id, issue) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.UpdateIssue + id, header, 'PUT', issue);

                return promise;
            }

            requests.addNewIssue = function addNewIssue(token, issue) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.NewIssue, header, 'POST', issue);

                return promise;
            }

            requests.getProject = function getProject(token, id) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.GetProject + id, header, 'GET', null);

                return promise;
            }

            requests.getProjects = function getProjects(token) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.GetProjects, header, 'GET', null);

                return promise;
            }

            requests.newProject = function newProject(token, project) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.NewProject, header, 'POST', project);

                return promise;
            }

            requests.editProject = function editProject(token, id, project) {
                var header = loginHeader(token),
                    promise = httpRequest(Urls.DefaultUrl + Urls.UpdateProject + id, header, 'PUT', project);

                return promise;
            }

            requests.getLabels = function getLabels(token, labelName) {
                var header = loginHeader(token),
                    query = labelName === null ? null : uriComponentEncode.encode('?filter={Label.Name ===' + labelName + '}'),
                    promise = httpRequest(Urls.DefaultUrl + Urls.GetLabels + query, header, 'GET', null);

                return promise;
            }

            function httpRequest(location, headersData, methodType, bodyData) {
                var deferred = $q.defer();

                $http({
                    url: location,
                    headers: headersData,
                    method: methodType,
                    data: bodyData
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            }

            function loginHeader(token) {
                var header = headers.UserHeader;
                header.Authorization = "Bearer " + token;

                return header;
            }

            return requests;
        }]);
})();
