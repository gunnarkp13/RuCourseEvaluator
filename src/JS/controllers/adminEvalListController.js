"use strict";

angular.module('RuCourseEvaluator').controller("adminEvalListController", [
	'$scope',
	'$location',
	'$http',
	'evaluationServer',
	'serverResource',
	'sessionCookie',
	function ($scope, $location, $http, evaluationServer, serverResource, sessionCookie) {
		$scope.evalList = [];

		if (sessionCookie.getRole() === 'admin') {
			serverResource.getEvals(sessionCookie.getToken())
			.success(function (response) {
				$scope.evalList = response;
				console.log("success");
				console.log(response);	
			})
			.error(function (response) {
				console.log("error!!");
			});
		} else {
			$location.path('/login');
		}

	}
]);