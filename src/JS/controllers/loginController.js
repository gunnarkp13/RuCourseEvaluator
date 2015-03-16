angular.module('RuCourseEvaluator').controller("loginController", [
	'$scope',
	'$http',
	'evaluationServer',
	'loginResource',
	function ($scope, $http, evaluationServer, loginResource) {

		$scope.login = function() {
			console.log($scope.user);
			var loginInfo = {
				user: $scope.user,
				pass: $scope.pass
			};
			loginResource.login(loginInfo, evaluationServer)
			.success(function (data) {
				console.log(data);
				var result = data;
				return result;
			});
		};
	}	
]);


