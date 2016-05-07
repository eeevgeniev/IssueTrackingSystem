(function () {
    var issuesModule = angular.module('trackingManagerApp.controllers.issues.viewIssueController',
    ['trackingManagerApp.services.commands.issueServices', 'trackingManagerApp.services.commands.projectServices',
    'trackingManagerApp.services.commands.localUserServices', 'trackingManagerApp.services.commands.helperServices']);

    issuesModule.constant('CommentsPerPage', 10);

    issuesModule.controller('ViewIssueController', ['$scope', '$q', '$filter', 'issueServices',
        'projectServices', 'localUserServices', 'CommentsPerPage', 'helperServices',
        function ($scope, $q, $filter, issueServices, projectServices, localUserServices, CommentsPerPage, helperServices) {
            $scope.title = 'View Issue',
            $scope.comment = {},
            $scope.isLoading = true,
            $scope.buttonTitle = 'Add Comment',
            promise = issueServices.getFilteredIssue();

            promise.then(function success(issue) {
                $scope.issue = issue;

                $scope.isUserAssignee = localUserServices.isUserIssueAssignee(issue.Assignee.Id);

                var projectPromise = projectServices.getProjectById($scope.issue.Project.Id);
                var commentsPromise = issueServices.getIssueComments();

                projectPromise.then(function success(project) {
                    $scope.isUserProjectLeader = localUserServices.isProjectLeader(project.Lead.Id);

                    var issueHolderProjectPromise = projectServices.getProjectIssuesWithId(project.Id);

                    issueHolderProjectPromise.then(function success(issues) {
                        $scope.hasIssueInThisProject = issueServices.isUserAssigneeInIssue(issues);
                        issues = null;
                    });
                });

                commentsPromise.then(function success(comments) {
                    $scope.isLoading = false;

                    if (comments.length === 0) {
                        $scope.hasComments = false;
                        return;
                    }

                    comments.sort(function (first, second) {
                        return new Date(second.CreatedOn) - new Date(first.CreatedOn);
                    });

                    $scope.comments = comments;

                    $scope.comments = [];
                    var commentsPagesCount = Math.ceil(comments.length / CommentsPerPage),
                        startPosition = Number(helperServices.getPageNumber('comments')),
                        length = startPosition * CommentsPerPage,
                        start = (startPosition - 1) * CommentsPerPage,
                        end = length > comments.length ? comments.length : length;

                    if (startPosition <= commentsPagesCount) {
                        $scope.hasCurrent = true;
                        $scope.current = startPosition;

                        if (startPosition > 1) {
                            $scope.hasPrevious = true;
                            $scope.previous = startPosition - 1;
                        }

                        if (startPosition < commentsPagesCount) {
                            $scope.hasNext = true;
                            $scope.next = startPosition + 1;
                        }

                        if (startPosition > 2) {
                            $scope.hasFirst = true;
                            $scope.toFirst = 1;
                        }

                        if (startPosition < commentsPagesCount - 1) {
                            $scope.hasLast = true;
                            $scope.toLast = commentsPagesCount;
                        }

                        for (var i = start; i < end; i++) {
                            $scope.comments.push(comments[i]);
                        }

                        $scope.hasComments = true;
                    }

                    comments = null;
                });
            });

            $scope.changeStatus = function changeStatus(event) {
                var statusId = $(event.target).attr('status-id');
                issueServices.changeIssueStatus(statusId);
            }

            $scope.addComment = function addComment() {
                issueServices.addNewIssueComment($scope.comment.Text);
            }
        }]);
})();