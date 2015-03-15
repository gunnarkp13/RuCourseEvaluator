/// <reference path="../src/js/contollers/loginController.js">
"use strict";

describe('loginController tests', function() {
	beforeEach(module('RuCourseEvaluator'));

	var scope, createController, evaluationServer, backend;


	beforeEach(inject(function ($rootScope, $controller, $httpBackend, evaluationServer) {
   		scope = $rootScope.$new();
   		backend = $httpBackend;
   		evaluationServer = $constant('evaluationServer', 'https://mammain.gov');
      	createController = function() {
      		return $controller('loginController', {
      			'$scope': scope,
      			'$http': $httpBackend,
      			'evaluationServer': evaluationServer
      		});
      	};
    }));


	it('should return success when calling login with bobbi and 123456', function() {
		var controller = createController();
		var loginData = {
			user: "bobbi",
			pass: '123456'
		};
		backend.expect('POST', evaluationServer + '/api/v1/login').respond(200, '{token: rass, role: student}');
		var expected = "success";
		var result = controller.login(loginData);

		expect(result).toBe(expected);
		backend.flush();
	});

	it('should return failure when calling login with bobbi and nopass ', function() {
		var controller = createController();
		var loginData = {
			user: "bobbi",
			pass: ''
		};
		backend.expect('POST', evaluationServer + '/api/v1/login').respond(401, '');
		var expected = "failure";
		var result = controller.login(loginData);

		expect(result).toBe(expected);
		backend.flush();
	});

});