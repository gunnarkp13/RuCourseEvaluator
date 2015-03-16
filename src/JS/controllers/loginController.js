angular.module('RuCourseEvaluator').controller("loginController", [
	'$scope',
	'$location',
	'$http',
	'evaluationServer',
	'loginResource',
	'sessionCookie',
	function ($scope, $location, $http, evaluationServer, loginResource, sessionCookie) {

		sessionCookie.set('','','','');
		$http.defaults.headers.common.Authorization = 'Basic ' + '';
		$scope.login = function() {
			console.log($scope.user);
			var loginInfo = {
				user: $scope.user,
				pass: $scope.pass
			};
			loginResource.login(loginInfo, evaluationServer)
			.success(function (response) {
				console.log("success");
				console.log(response['User']['Role']);
		        sessionCookie.set(
		        	response['User']['Username'],
		        	response['Token'],
		        	response['User']['FullName'],
		        	response['User']['Role']
		        );
		        if(response['User']['Role'] === 'admin'){
		        	$location.path('/admin');
		    	} else {
		    		$location.path('/student');
		    	}
		  	})
			.error(function (response) {
		        console.log("error");
		        $location.path('/login'); 
		   	});
		};
	}	
]);
