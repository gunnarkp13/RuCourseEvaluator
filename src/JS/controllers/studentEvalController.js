"use strict";

angular.module('RuCourseEvaluator').controller("StudentEvalController",[
	'$scope',
	'$routeParams',
	'evaluationServer',
	'serverResource',
	'sessionCookie', 
	function ($scope, $routeParams, evaluationServer, serverResource, sessionCookie) {
		$scope.questions = [];
		$scope.course = [];
		$scope.semester = [];
		$scope.evalID = '';

		serverResource.getMyCourses(sessionCookie.getToken())
		.success(function (response) {
			console.log("success: getMyCourses");
			console.log(response);
			$scope.course = response;
			console.log("test course = " + $scope.course.CourseID);
		})
		.error(function (response) {
			$scope.errorMessage = 'Ekki náðist samband eða eitthvað annað fór úrskeiðis';
			console.log("something went wrong: " + response);
		});


	}
])
.directive("evaluationQuestion", function() {
	return {

		restrict: "E",
		scope: {
			ngModel: "="
		},
		templateUrl: "studentEvaluationView.html",
		link: function(scope, element, attributes) {
			//something
			console.log("question");
		}
	};
});