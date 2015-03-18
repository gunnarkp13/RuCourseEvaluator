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
		
		var tempID = $routeParams.tempObj;
		$scope.teacherQuestions = [];
		$scope.courseQuestions = [];
		$scope.templateID = '';
		$scope.TemplateTitle = '';
		$scope.TemplateTitleEN = '';
		$scope.introText = '';
		$scope.introTextEN = '';
		
		console.log("nanan");
		console.log(Object.keys($routeParams.tempObj));

		

		if(tempID !== undefined ) {
			serverResource.getTemplate(tempID, sessionCookie.getToken())
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

		$scope.addQuestion = function(sType, qType ) {

		};

		$scope.deleteQuestion = function (sType, qId) {

		};

		
	}
]);