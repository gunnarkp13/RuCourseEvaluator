"use strict";
<<<<<<< HEAD
//controller sem sækir lista a mötum sem eru í gangi fyrir nemanda.
=======

/*******************************************************************/
/* Sækir lista af öllum kennslumötum sem nemandinn á eftir að taka */
/*******************************************************************/
>>>>>>> 1f0e2b8279b0fca85b884c47b32c9bcf076c8830
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
		
<<<<<<< HEAD
		//sækja listan
=======
		/* kall í serverinn sem skilar lista af kennslumötum */
>>>>>>> 1f0e2b8279b0fca85b884c47b32c9bcf076c8830
		serverResource.getMyEvals(sessionCookie.getToken())
		.success(function (response) {
			$scope.evaluations = response;
		})
		.error(function (response) {
			$scope.errorMessage = 'Ekki náðist samband eða eitthvað annað fór úrskeiðis';
		});
<<<<<<< HEAD
		//routa yfir á valið mat.
=======

		/* þegar nemandi ákveður að taka matið */
>>>>>>> 1f0e2b8279b0fca85b884c47b32c9bcf076c8830
		$scope.takeEval = function (evalObj) {
			var gogo = evalObj;
			$location.path('/studentEval/' + evalObj.ID + '/' + evalObj.CourseID + '/' + evalObj.Semester);
		};
<<<<<<< HEAD
		//logout 
=======

		/* ef það er ekkert kennslumat eftir þá birtist takki til að logga sig út */
>>>>>>> 1f0e2b8279b0fca85b884c47b32c9bcf076c8830
		$scope.logout = function () {
			sessionCookie.set('','','','');
			$http.defaults.headers.common.Authorization = 'Basic ' + '';
			$location.path('/login');
		};
}]);