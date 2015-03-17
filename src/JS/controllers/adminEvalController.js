"use strict";

angular.module('RuCourseEvaluator').controller('adminEvalController', [ 
  '$scope', 
  '$location',
  '$http',
  '$routeParams',
  'serverResource',
  'sessionCookie',
  function ($scope, $location, $http, $routeParams, serverResource, sessionCookie) { 
  		$scope.startTime = 0;
  		$scope.endTime = 0;
  		$scope.templateID = 0;
  		$scope.templates = [];
  		$scope.errorMessage = '';

  		serverResource.getTemplates(sessionCookie.getToken())
  		.success(function (response) {
  			console.log("success");
  			$scope.templates = response;
  		})
  		.error(function (response) {
  			console.log("error");
  		});

  		if ($routeParams.evalObj !== undefined ) {
  			$scope.startTime = $routeParams.evalObj.startTime;
  			$scope.endTime = $routeParams.evalObj.endTime;
  			$scope.TemplateID = $routeParams.evalObj.TemplateID;
  		}

  		$scope.setTemplate = function (tempID) {
  			$scope.templateID = tempID;
  		};

  		$scope.submitEval = function () {
  			var evalObj = {
  				"TemplateID": $scope.templateID,
  				"startDate": $scope.startTime.toISOString(),
  				"EndDate": $scope.endTime.toISOString() 
  			};

  			serverResource.postEval(evalObj, sessionCookie.getToken)
  			.success(function (response) {
  				console.log("success");
  				$location.path('/admin');
  			})
  			.error(function (response) {
  				$scope.errorMessage = "Evaluation not submitted - something went wrong !";
  			});
  		};
	}
]);