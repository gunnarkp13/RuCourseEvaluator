angular.module('RuCourseEvaluator').controller("adminCheckEvalListController", [
	'$scope',
	'$location',
	'$http',
	'evaluationServer',
	'serverResource',
	'sessionCookie',
	function ($scope, $location, $http, evaluationServer, serverResource, sessionCookie) {
		$scope.templist = [];
		console.log(sessionCookie.getToken());

		if (sessionCookie.getRole() === 'admin') {
			serverResource.getTemplates(sessionCookie.getToken())
			.success(function (response) {
				$scope.templist = response;
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
			$location.path('//' + evalObj);
		};
	}
]);