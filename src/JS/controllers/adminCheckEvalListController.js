angular.module('RuCourseEvaluator').controller("adminCheckEvalListController", [
	'$scope',
	'$location',
	'$http',
	'evaluationServer',
	'loginResource',
	'sessionCookie',
	function ($scope, $location, $http, evaluationServer, loginResource, sessionCookie) {
		var templist = [];
		console.log("hahahahah");
		console.log(sessionCookie.getToken());
			if (sessionCookie.getRole() === 'admin') {
				loginResource.getTemplates(sessionCookie.getToken(), evaluationServer)
				.success(function (response) {
					templist = response;
					console.log("success");
					console.log(response['ID']['Title']['TitleEN']);	
				});
			} else {
				//.error(function(response) 
					console.log("error!!");
					$location.path('/login/');
			}
	}
]);