/// <reference path="../src/js/contollers/loginController.js">
"use strict";

describe('loginController tests', function() {
	beforeEach(module('RuCourseEvaluator'));

	var scope, createController;

	beforeEach(inject(function ($rootScope, $controller) {
   		scope = $rootScope.$new();
      	createController = function() {
      		return $controller('loginController', {
      			'$scope': scope
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