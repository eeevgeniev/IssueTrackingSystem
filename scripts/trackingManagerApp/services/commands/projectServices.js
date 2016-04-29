(function () {
    var projectCommands = angular.module('trackingManagerApp.services.commands.projectServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices',
    'trackingManagerApp.services.commands.responseGetterServices']);

    projectCommands.factory('projectServices', ['$q', 'requests', 'cookieManager', 'cookiesNames', 
    'redirect', 'getParameters', 'notifyService', 'responseGetterServices', 
    function ($q, requests, cookieManager, cookiesNames, redirect, getParameters, notifyService, responseGetterServices) {
        var commands = {};

        commands.getProject = function getProject() {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
            id = getParameters.getValue('id'),
            deffered = $q.defer(),
            promise = requests.getProject(token, id);

            promise.then(function (response) {
                var project = responseGetterServices.dataGetter(response.data, ['Id', 'Labels', 'Lead', 'Name',
                    'Priorities', 'ProjectKey', 'TransitionSchemeId', 'Description']);
                response = null;
                deffered.resolve(project);
            }, function (response) {
                notifyService.generateErrorMessage(response);
                redirect.changeLocation('');
            })

            return deffered.promise;
        }

        commands.getProjects = function getProjects() {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
            deffered = $q.defer(),
            promise = requests.getProjects(token);

            promise.then(function (response) {
                var result = responseGetterServices.getArray(response.data, ['Id', 'Name', 'Priorities', 'Labels']);
                response = null;

                deffered.resolve(result);
            }, function (response) {
                notifyService.generateErrorMessage(response);
                redirect.changeLocation('');
            })

            return deffered.promise;
        }

        commands.createProject = function createProject(project) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
            promise = requests.newProject(token, project);

            promise.then(function success(response) {
                notifyService.generateInfoMessage('Project created.');
                // to do
            }, function error(response) {
                notifyService.generateErrorMessage(response);
            });
        }

        commands.updateProject = function updateProjects(project) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
            id = getParameters.getValue('id'),
            promise = requests.getProjects(token, id, project);

            promise.then(function success(response) {
                notifyService.generateInfoMessage('Project updated.');
            }, function error(response) {
                notifyService.generateErrorMessage(response);
            });
        }

        commands.createProjectKey = function createProjectKey(projectName) {
            var key = '';

            if (typeof (projectName) !== 'undefined') {
                var names = projectName.split(' ');

                names.forEach(function (currentName) {

                    key += currentName.substr(0, 1).toUpperCase();
                });
            }

            return key;
        }

        commands.newProject = function newProject(value) {
            var project = {};

            project.Name = value.Name;
            project.Description = value.Description;
            project.ProjectKey = value.ProjectKey;
            project.Labels = value.Labels;
            project.Priorities = value.Priorities;
            project.LeadId = value.Lead.Id;

            return project;
        }

        return commands;
    } ]);
})();