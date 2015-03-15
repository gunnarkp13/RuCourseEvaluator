angular.module("RuCourseEvaluator").controller("loginController", [
	'$scope',
	function ($scope) {

		this.login = function( loginInfo ) {
			if (loginInfo.user === 'bobbi' && loginInfo.pass === '12345') {
				var result = "success";
				return result;
			} else {
				var result = "failure";
				return result;
			}
		};
	}	
]);
