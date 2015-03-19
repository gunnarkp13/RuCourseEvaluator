"use strict";

/*******************************************************************/
/* Sækir lista af öllum kennslumötum sem nemandinn á eftir að taka */
/*******************************************************************/
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
		
		/* kall í serverinn sem skilar lista af kennslumötum */

		serverResource.getMyEvals(sessionCookie.getToken())
		.success(function (response) {
			$scope.evaluations = response;
		})
		.error(function (response) {
			$scope.errorMessage = 'Ekki náðist samband eða eitthvað annað fór úrskeiðis';
		});

		/* þegar nemandi ákveður að taka matið */

		$scope.takeEval = function (evalObj) {
			var gogo = evalObj;
			$location.path('/studentEval/' + evalObj.ID + '/' + evalObj.CourseID + '/' + evalObj.Semester);
		};

		/* ef það er ekkert kennslumat eftir þá birtist takki til að logga sig út */

		$scope.logout = function () {
			sessionCookie.set('','','','');
			$http.defaults.headers.common.Authorization = 'Basic ' + '';
			$location.path('/login');
		};
}]);