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
		$scope.imageURL = '';

		if($routeParams.tempObj !== undefined ) {
			serverResource.getTemplate($routeParams.tempObj, sessionCookie.getToken())
			.success(function (response) {
				console.log("success");
				$scope.imageURL = response.ImageURL; 
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
				"Type": qType,
				"Answers": []
			};

			if (sType === 'course') {
				$scope.courseQuestions.push(tmpQ);
			} else {
				$scope.teacherQuestions.push(tmpQ);
			}			
		};

		$scope.addAnswer = function (sType, qId) {
			console.log(qId);
			console.log(sType);
			console.log($scope.courseQuestions);
			console.log(Object.keys($scope.courseQuestions));
			var aId = 0;
			if (sType === 'Course') {
				if($scope.courseQuestions.length <= 0){
					aId = 0;
				} else {
					aId = $scope.courseQuestions[$scope.courseQuestions.length - 1].Answers.length;
				}
			} else {
				if($scope.teacherQuestions.length <= 0){
					aId = 0;
				} else {
					aId = $scope.teacherQuestions[$scope.teacherQuestions.length - 1].Answers.length;
				}
			}
			 
			var answer = {
				"ID": aId,
				"Text": '',
				"TextEN": '',
				"ImageURL": '',
				"Weight": ''
			};

			if (sType === 'Course') {
				var index1 = _.findIndex($scope.courseQuestions, {ID:qId}); 
				$scope.courseQuestions[index1].Answers.push(answer);
			} else {
				var index2 = _.findIndex($scope.teacherQuestions, {ID:qId});
				$scope.teacherQuestions[index2].Answers.push(answer);
			}
		};

		$scope.deletQuestion = function (sType, qId) {

		};

		$scope.submit = function () {
			var template = {
				'ID': 					999, 
				'Title': 				$scope.TemplateTitle,
				'TitleEN': 				$scope.TemplateTitleEN,
				'ImageURL': 			$scope.imageURL,
				'IntroText': 			$scope.introText,
				'IntroTextEN': 			$scope.introTextEN,
				'CourseQuestions': 		$scope.courseQuestions,
				'TeacherQuestions': 	$scope.teacherQuestions
			};

			for (var x in $scope.teacherQuestions) {
				console.log(x);
			}

			for (var y in $scope.courseQuestions) {
				console.log(y);
			}

			serverResource.postTemplate(template, sessionCookie.getToken())
			.success( function (response) {
				console.log("bingo");
				console.log(response);
			})
			.error(function (response) {
				console.log("andskotinn !");
				console.log(response);
			});
		};		
	}
]);