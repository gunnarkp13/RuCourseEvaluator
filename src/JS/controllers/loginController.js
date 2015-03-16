angular.module("RuCourseEvaluator")
.constant("evaluationServer", 'https://mammain.gov')
.controller("loginController", [
	'$scope',
	'$http',
	'evaluationServer',
	function ($scope, $http, evaluationServer) {

		this.login = function( loginInfo ) {
			var result;
			$http.post(evaluationServer + '/api/v1/login', loginInfo).success(function () {
				result = 'success';
				return result;
			}).error(function () {
				result = 'failure';
				return result;
			});
		};
	}	
]);