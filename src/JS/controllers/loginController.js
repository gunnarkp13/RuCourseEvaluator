angular.module("RuCourseEvaluator").controller("loginController", [
	'$scope',
	'$http',
	function ($scope, $http) {

		this.login = function( loginInfo ) {
			var result;
			if (loginInfo.user === 'bobbi' && loginInfo.pass === '12345') {
				result = "success";
				return result;
			} else {
				result = "failure";
				return result;
			}
		};
	}	
]);
