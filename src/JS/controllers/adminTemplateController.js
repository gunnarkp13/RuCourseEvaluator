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
		var tempObj = $routeParams.tempObj;
		$scope.questions = [];
		$scope.templateID = '';
		$scope.TemplateTitle = '';
		$scope.TemplateTitleEN = '';

		if($routeParams.tempObj !== undefined) {
			$scope.templateID = tempObj.templateID;
			$scope.TemplateTitle = tempObj.TemplateTitle;
			$scope.TemplateTitleEN = tempObj.TemplateTitleEN;		
		}
	}
]);