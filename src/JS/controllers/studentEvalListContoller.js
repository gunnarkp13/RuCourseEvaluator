angular.module('RuCourseEvaluator').controller("studentEvalListController", [
	'$scope',
	'$location',
	'$rootScope',
	'$http',
	'$routeParams',
	'evaluationServer',
	'loginResource',
	'sessionCookie',
	function ($scope, $location, $rootScope, $http, $routeParams, evaluationServer, loginResource, sessionCookie) {
		$scope.evaluations = [];
		$scope.errorMessage = '';
		
		loginResource.getStuEvals(sessionCookie.getToken())
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
}]);