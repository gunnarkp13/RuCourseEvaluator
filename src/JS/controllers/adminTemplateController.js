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
				console.log(Object.keys(response));
				$scope.templateID = response.ID;
				$scope.TemplateTitle = response.Title;
				$scope.TemplateTitleEN = response.TitleEN;
				$scope.teacherQuestions = response.TeacherQuestions;
				$scope.courseQuestions = response.CourseQuestions;
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
				qId = $scope.courseQuestions.size();
			} else {
				qId = $scope.teacherQuestions.size();
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
				aId = $scope.courseQuestions[$scope.courseQuestions.size() - 1].Answers.size();
			} else {
				aId = $scope.teacherQuestions[$scope.teacherQuestions.size() - 1].Answers.size();
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