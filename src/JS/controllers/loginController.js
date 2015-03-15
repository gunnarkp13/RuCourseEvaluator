angular.module("RuCourseEvaluator")
.service("evaluationServer", [ 
	function () {
		var url = function () {
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
			if (loginInfo.user === 'bobbi' && loginInfo.pass === '123456') {
				result = "success";
				return result;
			} else {
				result = "failure";
				return result;
			}
		};
	}	
]);


