"use strict";

//test
angular.module("RuCourseEvaluator", ['ngRoute'])
.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when("/login", {
			templateUrl: "src/html/loginView.html",
			controller: "loginController"
		})
		.otherwise({
			redirectTo: "/login"
		});
	}
])

.factory('loginResource', [
	'$http',
	function ($http) {
		return {
			login: function (loginInfo, evaluationServer) {
			return $http.post(evaluationServer + '/api/v1/login', loginInfo)
		        .success(function(response) {
		        	console.log(response);
		        	return response;
		        });
		    }
		};
	}
])
.constant('evaluationServer', 'http://dispatch.ru.is/demo');