"use strict";

angular.module('RuCourseEvaluator').controller("StudentEvalController",[
	'$scope',
	'$routeParams',
	'$location',
	'evaluationServer',
	'serverResource',
	'sessionCookie', 
	function ($scope, $routeParams, $location, evaluationServer, serverResource, sessionCookie) {
		$scope.teacherQuestions = [];
		$scope.courseQuestions = [];
		$scope.courses = [];
		$scope.semester = [];
		$scope.evalID = '';

		if($routeParams.evalID !== undefined) {

				console.log($routeParams.evalID);
				console.log($routeParams.evalCourse);
				console.log($routeParams.evalSemester);
				serverResource.getCourseEval($routeParams.evalCourse, $routeParams.evalSemester, $routeParams.evalID, sessionCookie.getToken())
				.success(function (response) {
					console.log("success");
					//console.log(response);
					$scope.questions = response;
					for (var tQ in response['TeacherQuestions']) {
						$scope.teacherQuestions.push(response['TeacherQuestions'][tQ]);
					}
					for (var cQ in response['CourseQuestions']) {
						$scope.courseQuestions.push(response['CourseQuestions'][cQ]);
					}
					return {
						restrict: "E",
						scope: {
							ngModel: "="
						},
						templateUrl: "studentEvaluationView.html",
					};
				})
				.error(function (response) {
					console.log("something went wrong: " + response);
				});
			}
		
		$scope.submitEval = function () {
			console.log($scope.tQID);
			serverResource.getCourseEval($routeParams.evalCourse, 
				$routeParams.evalSemester, $routeParams.evalID,  sessionCookie.getToken());
			$location.path('/student');
		};
	}
])
.directive('tMultiQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'tMultiQuestion.html' 
		}
	}
])
.directive('tSingleQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'tSingleQuestion.html'
 		}
	}
])
.directive('tTextQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'tTextQuestion.html'
  		}
	}
])
.directive('cMultiQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'cMultiQuestion.html'
		}
	}
])
.directive('cSingleQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'cSingleQuestion.html'
 		}
	}
])
.directive('cTextQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'cTextQuestion.html'
  		}
	}
]);