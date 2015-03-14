"use strict";

angular.module("RuCourseEvaluator", ['ngRoute'])
.config(['$routeProvider',
	function ($routeProvider){
		$routeProvider
		.when("/loginView", {
			templateUrl: "src/html/loginView.html",
			controller: "LoginController"
		})
		.otherwise({
			redirectTo: "/login"
		});
	}
]);