angular.module('RuCourseEvaluator').controller("adminCheckEvalListController", [
	'$scope',
	'$location',
	'$http',
	'evaluationServer',
	'loginResource',
	'sessionCookie',
	function ($scope, $location, $http, evaluationServer, loginResource, sessionCookie) {
		var templist = [];
		console.log(sessionCookie.getToken());

		if (sessionCookie.getRole() === 'admin') {
			loginResource.getTemplates(sessionCookie.getToken())
			.success(function (response) {
				templist = response;
				console.log("success");
				console.log(response);	
			})
			.error(function (response) {
				console.log("error!!");
			});
		} else {
			$location.path('/login');
		}

		$scope.useTemplate = function (evalObj) {
			%location.path('//' +evalobj);
		};
	}
]);