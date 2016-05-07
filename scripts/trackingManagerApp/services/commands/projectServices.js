﻿(function () {
    var projectCommands = angular.module('trackingManagerApp.services.commands.projectServices',
    ['trackingManagerApp.services.https.requestService', 'trackingManagerApp.services.commands.cookies.cookieService',
    'trackingManagerApp.routes.routeConfig', 'trackingManagerApp.services.commands.notifyServices',
    'trackingManagerApp.services.commands.responseGetterServices', 'trackingManagerApp.services.commands.labelServices']);

    projectCommands.factory('projectServices', ['$q', 'requests', 'cookieManager', 'cookiesNames',
    'redirect', 'getParameters', 'notifyService', 'responseGetterServices', 'labelServices',
    function ($q, requests, cookieManager, cookiesNames, redirect, getParameters,
    notifyService, responseGetterServices, labelServices) {
        var commands = {};

        commands.getProject = function getProject() {
            var id = getParameters.getValue('id'),
                promise = commands.getProjectById(id)

            return promise;
        }

        commands.getProjectById = function getProjectById(id) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                deffered = $q.defer(),
                promise = requests.getProject(token, id);

            promise.then(function (response) {
                var project = responseGetterServices.dataGetter(response.data, ['Id', 'Labels', 'Lead', 'Name',
                    'Priorities', 'ProjectKey', 'TransitionSchemeId', 'Description']);
                response = null;
                deffered.resolve(project);
            }, function (response) {
                notifyService.generateResponseErrorMessage(response);
                redirect.changeLocation('');
            });

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
                notifyService.generateResponseErrorMessage(response);
                redirect.changeLocation('');
            })

            return deffered.promise;
        }

        commands.createProject = function createProject(project) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
            promise = requests.newProject(token, project);

            promise.then(function success(response) {
                notifyService.generateSuccessMessage('Project created.');
                redirect.changeLocation('/projects/' + response.data.Id);
            }, function error(response) {
                notifyService.generateResponseErrorMessage(response);
                redirect.changeLocation('');
            });
        }

        commands.updateProject = function updateProject(project) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
            id = getParameters.getValue('id'),
            promise = requests.editProject(token, id, project);

            promise.then(function success(response) {
                notifyService.generateSuccessMessage('Project updated.');
            }, function error(response) {
                notifyService.generateResponseErrorMessage(response);
                redirect.changeLocation('');
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

        commands.getProjectIssues = function getProjectIssues() {
            var id = getParameters.getValue('id');

            return commands.getProjectIssuesWithId(id);
        }

        commands.getProjectIssuesWithId = function getProjectIssuesWithId(projectId) {
            var token = cookieManager.getCookie(cookiesNames.Bearer),
                deffered = $q.defer(),
                promise = requests.getProjectIssues(token, projectId);

            promise.then(function (response) {
                var issues = responseGetterServices.getArray(response.data, ['Id', 'Title', 'DueDate', 'Assignee']);
                response = null;
                deffered.resolve(issues);
            }, function (response) {
                notifyService.generateResponseErrorMessage(response);
                redirect.changeLocation('');
            });

            return deffered.promise;
        }

        commands.getNewProject = function getNewProject(value) {
            var project = commands.getEditedProject(value);
            project.ProjectKey = value.ProjectKey;

            return project;
        }

        commands.getEditedProject = function getEditedProject(value) {
            var project = {},
                prioritiesAsString = typeof (value.Priorities) === 'undefined' ? [] : value.Priorities,
                priorities = [];

            if (!Array.isArray(prioritiesAsString)) {
                prioritiesAsString = prioritiesAsString.split(',');

                prioritiesAsString.forEach(function (current) {
                    priorities.push({
                        Name: current.trim()
                    });
                });
            }

            project.Name = value.Name;
            project.Description = value.Description;
            project.Labels = value.Labels;
            project.Priorities = priorities;
            project.LeadId = value.Lead.Id;
            project.Labels = labelServices.labelsFromString(project.Labels);

            return project;
        }

        commands.redirectToProject = function redirectToProject(info) {
            var projectId = getParameters.getValue('id');

            if (info !== null) {
                notifyService.generateInfoMessage(info);
            }

            if (projectId === 'undefined') {
                redirect.changeLocation('');
                return;
            }

            redirect.changeReloadLocation('/projects/' + projectId);
        }

        return commands;
    }]);
})();