angular.module('RuCourseEvaluator').controller("createTemplateController",[
	'$scope',
	'$location',
	'$rootScope',
	'$http',
	'$routeParams',
	'evaluationServer',
	'loginResource',
	'sessionCookie', 
	function ($scope, $location, $rootScope, $http, $routeParams, evaluationServer, loginResource, sessionCookie) {
		var evalObj = $routeParams.evalObj;
		$scope.questions = [];
		$scope.templateID = '';
		$scope.TemplateTitle = '';
		$scope.TemplateTitleEN = '';
		$scope.StartDate = '';
		$scope.EndDate = '';
		$scope.Status = '';

		if($routeParams.evalObj !== undefined) {
			$scope.templateID = evalObj.templateID;
			$scope.TemplateTitle = evalObj.TemplateTitle;
			$scope.TemplateTitleEN = evalObj.TemplateTitleEN;
			$scope.StartDate = evalObj.StartDate;
			$scope.EndDate = evalObj.EndDate;
			$scope.Status = evalObj.Status;			
		}
	}
]);