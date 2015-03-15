"use strict";

//test
angular.module("RuCourseEvaluator", ['ngRoute']).config(['$routeProvider',
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
]);