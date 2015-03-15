"use strict";
//test
angular.module("RuCourseEvaluator", ['ngRoute']).config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when("/login", {
			templateUrl: "src/html/loginView.html",
			controller: "LoginController"
		})
		.otherwise({
			redirectTo: "/login"
		});
	}
]);