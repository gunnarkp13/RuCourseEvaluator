"use strict";
//controller til að prenta lista af templatum sem eru til.
angular.module('RuCourseEvaluator').controller("adminTemplateListController", [
	'$scope',
	'$location',
	'$http',
	'evaluationServer',
	'serverResource',
	'sessionCookie',
	function ($scope, $location, $http, evaluationServer, serverResource, sessionCookie) {
		$scope.tempList = [];

		if (sessionCookie.getRole() === 'admin') {
			serverResource.getTemplates(sessionCookie.getToken())
			.success(function (response) {
				$scope.tempList = response;
				console.log("success");
				console.log(response);	
			})
			.error(function (response) {
				console.log("error!!");
			});
		} else {
			$location.path('/login');
		}

		$scope.useTemplate = function (tempObj) {
			var test = tempObj.ID;
			console.log("routing tempObj");
			console.log(tempObj);
			$location.path('/adminNewTemplate/' + test);
		};
	}
]);