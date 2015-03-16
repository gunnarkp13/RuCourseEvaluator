angular.module('RuCourseEvaluator').controller('homeController', [ 
	'$scope',
	'$location',
	'$rootScope',
	'$http',
	'$routeParams',
	'sessionCookie',
	function ($scope, $location, $rootScope, $http, $routeParams, sessionCookie) { 
		$scope.user = sessionCookie.getUser();
		$scope.name = sessionCookie.getFullName();
		$scope.token = sessionCookie.getToken();
		$scope.role = sessionCookie.getRole();

		sessionCookie.observe().then(null, null, function (user) {
	    	$scope.user = sessionCookie.getUser();
			$scope.name = sessionCookie.getFullName();
			$scope.token = sessionCookie.getToken();
			$scope.role = sessionCookie.getRole();
		});

		$scope.logout = function () {
			sessionCookie.set('','','','');
			$http.defaults.headers.common.Authorization = 'Basic ' + '';
			$location.path('/login');
		};
	}
]);