angular.module("RuCourseEvaluator").controller("LoginController", [
	'$scope',
	'$http',
	'$location',
	'$rootScope',
	'$routeParams',
	function ($scope, $http, $location, $rootScope, $routeParams) {
		var loginData = {
			user: $scope.Username,
			pass: $scope.Password
		};
		$scope.login = function() {
			$http.post("http://dispatch.hir.is/demo/api/v1/login", loginData)
			.success( function () {
				console.log("Worked!");
				//login.user = loginData.data;
			});
		};
	}	
]);
