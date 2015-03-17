"use strict";

angular.module('RuCourseEvaluator').controller("studentEvalListController", [
	'$scope',
	'$location',
	'$rootScope',
	'$http',
	'$routeParams',
	'evaluationServer',
	'serverResource',
	'sessionCookie',
	function ($scope, $location, $rootScope, $http, $routeParams, evaluationServer, serverResource, sessionCookie) {
		$scope.evaluations = [];
		$scope.errorMessage = '';
		
		serverResource.getStuEvals(sessionCookie.getToken())
		.success(function (response) {
			console.log("success");
			console.log(response);
			$scope.evaluations = response;
		})
		.error(function (response) {
			$scope.errorMessage = 'Ekki náðist samband eða eitthvað annað fór úrskeiðis';
			console.log("something went wrong: " + response);
		});

		$scope.takeEval = function (evalObj) {
			$location.path('/studentEval/' + evalObj);
		};

		$scope.back = function () {
			sessionCookie.set('','','','');
			$http.defaults.headers.common.Authorization = 'Basic ' + '';
			$location.path('/login');
		};

		$scope.logout = function () {
			sessionCookie.set('','','','');
			$http.defaults.headers.common.Authorization = 'Basic ' + '';
			$location.path('/login');
		};
}]);