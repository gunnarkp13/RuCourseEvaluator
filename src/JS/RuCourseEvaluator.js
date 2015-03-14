"use strict";

angular.module("RuCourseEvaluator", ['ngRoute'])
.config(['$routeProvider',
	function ($routeProvider){
		$routeProvider
		.when("/index", {
			templateUrl: "index.html",
			controller: ""
		})
		.otherwise({
			redirectTo: "/index"
		});
	}
]);

