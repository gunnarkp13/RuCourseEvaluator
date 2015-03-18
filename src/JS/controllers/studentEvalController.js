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
		$scope.teachers = [];
		$scope.questionAns = [];

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
				})
				.error(function (response) {
					console.log("something went wrong: " + response);
				});

				serverResource.getCourseTeachers($routeParams.evalCourse, $routeParams.evalSemester, sessionCookie.getToken())
				.success(function (response) {
					console.log("success");
					for(var teacher in response) {
						$scope.teachers.push(response[teacher]);
						console.log(response[teacher].SSN);
					}
				})
				.error(function (response) {
					console.log("Hver Þremillinn");
				});
			}

		$scope.submitQuestion = function (Weight, SSN, qID) {

		};
		
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
		};
	}
])
.directive('tSingleQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'tSingleQuestion.html'
 		};
	}
])
.directive('tTextQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'tTextQuestion.html'
  		};
	}
])
.directive('cMultiQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'cMultiQuestion.html'
		};
	}
])
.directive('cSingleQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'cSingleQuestion.html'
 		};
	}
])
.directive('cTextQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'cTextQuestion.html'
  		};
	}
]);