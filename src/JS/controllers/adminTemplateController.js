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
		var evalObj = $routeParams.evalObj;
		$scope.questions = [];
		$scope.templateID = '';
		$scope.TemplateTitle = '';
		$scope.TemplateTitleEN = '';

		if($routeParams.evalObj !== undefined) {
			$scope.templateID = evalObj.templateID;
			$scope.TemplateTitle = evalObj.TemplateTitle;
			$scope.TemplateTitleEN = evalObj.TemplateTitleEN;		
		}
	}
]);