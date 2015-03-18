"use strict";
//controller sem sækir lista a mötum sem eru í gangi fyrir nemanda.
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
		
		//sækja listan
		serverResource.getMyEvals(sessionCookie.getToken())
		.success(function (response) {
			console.log("success");
			console.log(response);
			$scope.evaluations = response;
		})
		.error(function (response) {
			$scope.errorMessage = 'Ekki náðist samband eða eitthvað annað fór úrskeiðis';
		});
		//routa yfir á valið mat.
		$scope.takeEval = function (evalObj) {
			var gogo = evalObj;
			$location.path('/studentEval/' + evalObj.ID + '/' + evalObj.CourseID + '/' + evalObj.Semester);
		};
		//logout 
		$scope.logout = function () {
			sessionCookie.set('','','','');
			$http.defaults.headers.common.Authorization = 'Basic ' + '';
			$location.path('/login');
		};
}]);