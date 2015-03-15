"use strict";

angular.module("RuCourseEvaluator", ['ngRoute', 'luegg.directives'])
.config(['$routeProvider',
	function ($routeProvider){
		$routeProvider
		.when("/homeView", {
			templateUrl: "src/html/homeView.html",
			controller: "homeView"
		})
		.when("/loginView", {
			templateUrl: "src/HTML/loginView.html",
			controller: "LoginController"
		})
		.otherwise({
			redirectTo: "/loginView"
		});
	}
]);