/// <reference path="../src/js/contollers/loginController.js">
"use strict";

describe('loginController tests', function() {
	beforeEach(module('RuCourseEvaluator'));

	var scope, createController, evaluationServer, backend;

	beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
   		scope = $rootScope.$new();
   		backend = $httpBackend;
   		evaluationServer = 	function () {
			evaluationServer.url = function () {
				return "https://www.mammain.gov";
			};	
		};
		$httpBackend.expect()
      	$httpBackend.expect()
      	$httpBackend.expect()
      	createController = function() {
      		return $controller('loginController', {
      			'$scope': scope,
      			'$http': $httpBackend
      			'evaluationServer': evaluationServer
      		});
      	};
    }));

	it('should return success when calling login with bobbi and 123456', function() {
		var controller = createController();
		var loginData = {
			user: "bobbi",
			pass: '12345'
		};
		var expected = "success";
		var result = controller.login(loginData);

		expect(result).toBe(expected);
	});

	it('should return failure when calling login with bobbi and nopass ', function() {
		var controller = createController();
		var loginData = {
			user: "bobbi",
			pass: ''
		};
		var expected = "failure";
		var result = controller.login(loginData);

		expect(result).toBe(expected);
	});

});