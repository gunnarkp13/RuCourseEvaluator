/// <reference path="../src/js/contollers/loginController.js">
"use strict";
/*
describe('loginController tests', function() {
	beforeEach(module('RuCourseEvaluator'));
	var scope, createController, evaluationServer, backend;


	beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
   		scope = $rootScope.$new();
   		backend = $httpBackend;
   		backend.expect('POST', evaluationServer + '/api/v1/login','').respond(200, []);
   		evaluationServer = 'https://mammain.gov';
      	createController = function() {
      		return $controller('loginController', {
      			'$scope': scope,
      			'$http': backend,
      			'evaluationServer': evaluationServer
      		});
      	};
    }));

    afterEach(function () {
       	backend.verifyNoOutstandingExpectation();
       	backend.verifyNoOutstandingRequest();
  	});

	it('should return success when calling login with bobbi and 123456', function() {
		var controller = createController();
		var loginData = {
			user: "bobbi",
			pass: '123456'
		};

		backend.expect('POST', evaluationServer + '/api/v1/login','').respond(200, [{data: 'sveinhund'}]);
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
		backend.expect('POST', evaluationServer + '/api/v1/login','').respond(401,[{data: 'mammain'}]);
		var expected = "failure";
		var result = controller.login(loginData);

		expect(result).toBe(expected);
		backend.flush();
	});

});*/