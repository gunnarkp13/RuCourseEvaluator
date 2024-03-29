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

		$scope.getEvaluations = function ()	{
			$location.path('/adminEvalList');
		};

		$scope.newEvaluation = function () {
			$location.path('/adminNewEval');
		};	


		$scope.getTemplateList = function () {	
			//$http.defaults.headers.common.Authorization = 'Basic ' + sessionCookie.getToken();
			$location.path('/adminTempList/');
		};

		$scope.createTemplate = function () {
			$location.path('/adminNewTemplate/');
		};
	}
]);