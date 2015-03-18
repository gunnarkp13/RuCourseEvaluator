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
		$scope.course = '';
		$scope.semester = '';
		$scope.evalID = '';
		$scope.teachers = [];
		$scope.questionAns = [];
		$scope.evalQuestions = [];

		if($routeParams.evalID !== undefined) {

				console.log($routeParams.evalID);
				console.log($routeParams.evalCourse);
				console.log($routeParams.evalSemester);
				$scope.course = $routeParams.evalCourse;
				$scope.semester = $routeParams.evalSemester;

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

		for(var tT in $scope.teachers) {
			for (var tQ in $scope.teacherQuestions) {
				var tqObject = {
					"ID": tQ.ID,
					"sType": 'teacher',
					"qType": tQ.Type,
					"tSSN": tT.SSN,
					"tFullName": tT.FullName,
					"qText": tQ.Text,
					"qTextEN": tQ.Text,
					"qAnswers": tQ.Answers,
					"Weight": tQ.Weight,
					"Answer": ''
				};

				$scope.evalQuestions.push(tqObject); 
			}
		}	

		for(var cQ in $scope.courseQuestions) {
			var cqObject = {
					"ID": cQ.ID,
					"sType": 'course',
					"qType": cQ.Type,
					"tSSN": '',
					"tFullName": '',
					"qText": cQ.Text,
					"qTextEN": cQ.Text,
					"qAnswers": cQ.Answers,
					"Weight": cQ.Weight,
					"Answer": ''
				};
				$scope.evalQuestions.push(cqObject);
		}

		$scope.submitQuestion = function (Weight, SSN, qID) {
				
		};
		
		$scope.submitEval = function () {
			var submitObject = [];
			for(var question in $scope.evalQuestions) {
				var ans = {
					"QuestionID": question.ID,
					"TeacherSSN": question.tSSN,
					"Value": question.Answer
				};
				submitObject.push(ans);
			}
			serverResource.postCourseEval($scope.course, $scope.semester, $scope.evalID, submitObject, sessionCookie.getToken())
			.success(function (response) {
				console.log("success");
				$location.path('/student');
			})
			.error(function (response) {
				console.log("skrambinn");
			});


			
		};
	}
])
.directive('tMultiQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'src/html/tMultiQuestion.html'
		};
	}
])
.directive('tSingleQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'src/html/tSingleQuestion.html'
 		};
	}
])
.directive('tTextQuestion', [
	function () {
		console.log("tTextQuestion");
		return {
    		restrict: 'A',
    		templateUrl: 'src/html/tTextQuestion.html'

  		};
	}
])
.directive('cMultiQuestion', [
	function () {
		console.log("cMultiQuestion");
		return {
    		restrict: 'A',
    		templateUrl: 'src/html/cMultiQuestion.html'
		};
	}
])
.directive('cSingleQuestion', [
	function () {
		console.log("cSingleQuestion");
		return {
    		restrict: 'A',
    		templateUrl: 'src/html/cSingleQuestion.html'
 		};
	}
])
.directive('cTextQuestion', [
	function () {
		return {
    		restrict: 'A',
    		templateUrl: 'src/html/cTextQuestion.html'
  		};
	}
]);

