angular.module('RuCourseEvaluator').controller("adminController", [
	'$scope',
	'$location',
	'$rootScope',
	'$http',
	'$routeParams',
	'evaluationServer',
	'loginResource',
	'sessionCookie',
	function ($scope, $location, $rootScope, $http, $routeParams, evaluationServer, loginResource, sessionCookie) {

		$scope.getTemplateList = function () {
			$http.defaults.headers.common.Authorization = 'Basic ' + sessionCookie.getToken();
			$location.path('/adminList');
		};
	}
]);