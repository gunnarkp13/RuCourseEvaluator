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
  		//$scope.startTime = new Date();
  		//$scope.endTime = new Date();
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

  		$scope.$watch('times.startTime', function(newVal, oldVal, scope){
  			console.log("watch  " + newVal + "  " + oldVal);
  			
  				scope.startTime = newVal;

  		}, true);

  		$scope.setTemplate = function (tempID) {
  			$scope.templateID = tempID;
  		};

  		$scope.submitEval = function () {
  			console.log("startTime " + $scope.times.startTime);
  			console.log("endTime " + $scope.times.endTime);
  			console.log("tempID " + $scope.templateID);
  			var tmpTime = $scope.times.startTime.toISOString();
  			var tmpTime2 = $scope.times.endTime.toISOString();
  			console.log("tmpTime " + tmpTime);
  			console.log("tmpTime2 " + tmpTime2);
  			var tmpID = $scope.templateID;
  			tmpID = parseInt(tmpID);
  			console.log("tmpID = " + tmpID);

  			var evalObj = {
  				"TemplateID": tmpID,
  				"StartDate": tmpTime,
  				"EndDate": tmpTime2 
  			};
  			console.log("sending msgobj  " + evalObj);
  			serverResource.postEval(evalObj, sessionCookie.getToken())
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