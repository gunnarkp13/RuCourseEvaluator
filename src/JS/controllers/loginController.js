angular.module("RuCourseEvaluator")
.service("evaluationServer", [ 
	function () {
		this.url = function () {
			return "https://www.mammain.gov";
		};	
	}
])
.controller("loginController", [
	'$scope',
	'$http',
	'evaluationServer',
	function ($scope, $http, evaluationServer) {

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


