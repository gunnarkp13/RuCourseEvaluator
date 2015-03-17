"use strict";

angular.module('RuCourseEvaluator').controller('adminEvalController', [ 
  '$scope',
  '$rootScope', 
  '$location',
  '$http',
  '$routeParams',
  'serverResource',
  'sessionCookie',
  function ($scope, $rootScope, $location, $http, $routeParams, serverResource, sessionCookie) { 
  		$scope.times = {
  			"startTime": new Date(),
  			"endTime": new Date()
  		};
  		$scope.templateID = '';
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
  			$scope.times.startTime = $routeParams.evalObj.startTime;
  			$scope.times.endTime = $routeParams.evalObj.endTime;
  			$scope.TemplateID = $routeParams.evalObj.TemplateID;
  		}

  		$scope.setTemplate = function (tempID) {
  			$scope.templateID = tempID;
  		};

  		$scope.submitEval = function () {
  			var tmpTime = $scope.times.startTime.toISOString();
  			var tmpTime2 = $scope.times.endTime.toISOString();
  			var tmpID = parseInt($scope.templateID);

  			var evalObj = {
  				"TemplateID": tmpID,
  				"StartDate": tmpTime,
  				"EndDate": tmpTime2 
  			};

  			serverResource.postEval(evalObj, sessionCookie.getToken())
  			.success(function (response) {
  				console.log("success");
  				$location.path('/admin');
  			})
  			.error(function (response) {
  				$scope.errorMessage = "Evaluation not submitted - something went wrong !";
  			});
  		};

  		$scope.back = function () {
  			$location.path('/admin');
  		};
	}
]);