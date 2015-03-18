"use strict";

angular.module('RuCourseEvaluator').controller("adminTemplateController",[
	'$scope',
	'$location',
	'$rootScope',
	'$http',
	'$routeParams',
	'evaluationServer',
	'serverResource',
	'sessionCookie', 
	function ($scope, $location, $rootScope, $http, $routeParams, evaluationServer, serverResource, sessionCookie) {
		
		$scope.teacherQuestions = [];
		$scope.courseQuestions = [];
		$scope.templateID = '';
		$scope.TemplateTitle = '';
		$scope.TemplateTitleEN = '';
		$scope.introText = '';
		$scope.introTextEN = '';

		if($routeParams.tempObj !== undefined ) {
			serverResource.getTemplate($routeParams.tempObj, sessionCookie.getToken())
			.success(function (response) {
				//console.log(Object.keys(response));
				$scope.templateID = response.ID;
				$scope.TemplateTitle = response.Title;
				$scope.TemplateTitleEN = response.TitleEN;
				//console.log(response['TeacherQuestions']);
				for (var tQ in response['TeacherQuestions']) {
					//console.log(response['TeacherQuestions'][tQ]);
					$scope.teacherQuestions.push(response['TeacherQuestions'][tQ]);
				}
				for (var cQ in response['CourseQuestions']) {
					//console.log(cQ);
					$scope.courseQuestions.push(response['CourseQuestions'][cQ]);
				}
				$scope.introText = response.IntroText;
				$scope.introTextEN = response.IntroTextEN;
			})
			.error(function (response) {
				console.log("error");
			});		
		}

		$scope.addQuestion = function (sType, qType) {
			var qId = 0;
			if (sType === 'course') {
				qId = $scope.courseQuestions.length;
			} else {
				qId = $scope.teacherQuestions.length;
			}

			var tmpQ = {
				"ID": qId,
				"Text": '',
				"TextEN": '',
				"ImageURL": '',
				"Type": '',
				"Answers": []
			};

			if (sType === 'course') {
				$scope.courseQuestions.push(tmpQ);
			} else {
				$scope.teacherQuestions.push(tmpQ);
			}			
		};

		$scope.addAnswer = function (sType, qId) {
			var aId = 0;
			if (sType === 'course') {
				aId = $scope.courseQuestions[$scope.courseQuestions.length - 1].Answers.length;
			} else {
				aId = $scope.teacherQuestions[$scope.teacherQuestions.length - 1].Answers.length;
			}
			 
			var answer = {
				"ID": aId,
				"Text": '',
				"TextEN": '',
				"ImageURL": '',
				"Weight": ''
			};

			if (sType === 'course') {
				$scope.courseQuestions[qId].Answers.push(answer);
			} else {
				$scope.teacherQuestions[qId].Answers.push(answer);
			}
		};

		$scope.deletQuestion = function (sType, qId) {

		};		
	}
]);