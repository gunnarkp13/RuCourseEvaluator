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

				//console.log($routeParams.evalID);
				//console.log($routeParams.evalCourse);
				//console.log($routeParams.evalSemester);
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
						//console.log(response[teacher].SSN);
					}

							for(var tT in $scope.teachers) {
			for (var tQ in $scope.teacherQuestions) {
				var tqObject = {
					"ID": $scope.teacherQuestions[tQ].ID,
					"sType": 'teacher',
					"qType": $scope.teacherQuestions[tQ].Type,
					"tSSN": $scope.teachers[tT].SSN,
					"tFullName": $scope.teachers[tT].FullName,
					"qText": $scope.teacherQuestions[tQ].Text,
					"qTextEN": $scope.teacherQuestions[tQ].Text,
					"qAnswers": [],
					"Weight": $scope.teacherQuestions[tQ].Weight,
					"Answer": ''
				};
				for(var ans in $scope.teacherQuestions[tQ].Answers){
					tqObject.qAnswers.push($scope.teacherQuestions[tQ].Answers[ans]);
				}

				console.log(tqObject);
				$scope.evalQuestions.push(tqObject); 
			}
		}	

		for(var cQ in $scope.courseQuestions) {
			var cqObject = {
					"ID": $scope.courseQuestions[cQ].ID,
					"sType": 'course',
					"qType": $scope.courseQuestions[cQ].Type,
					"tSSN": '',
					"tFullName": '',
					"qText": $scope.courseQuestions[cQ].Text,
					"qTextEN": $scope.courseQuestions[cQ].Text,
					"qAnswers": [],
					"Weight": $scope.courseQuestions[cQ].Weight,
					"Answer": ''
				};

				for(var ans2 in $scope.courseQuestions[cQ].Answers){
					cqObject.qAnswers.push($scope.courseQuestions[cQ].Answers[ans2]);
				}
				console.log(cqObject);
				$scope.evalQuestions.push(cqObject);
		}


				})
				.error(function (response) {
					console.log("Hver Þremillinn");
				});
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

