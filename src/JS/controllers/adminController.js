"use strict";

angular.module('RuCourseEvaluator').controller("adminController", [
	'$scope',
	'$location',
	'$rootScope',
	'$http',
	'$routeParams',
	'evaluationServer',
	'serverResource',
	'sessionCookie',
	function ($scope, $location, $rootScope, $http, $routeParams, evaluationServer, serverResource, sessionCookie) {

		$scope.getTemplateList = function () {
			
			$http.defaults.headers.common.Authorization = 'Basic ' + sessionCookie.getToken();
			$location.path('/adminList/');
		};

		$scope.createTemplate = function () {
			$location.path('/admin/createTemplate/');
		};
	}
]);