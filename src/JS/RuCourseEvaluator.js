"use strict";

//test
angular.module("RuCourseEvaluator", ['ngRoute'])
.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when("/studentEval/:evalObj", {
			templateUrl: "src/html/studentEvaluationView.html",
			controller: "StudentEvalController"
		})
		.when("/login", {
			templateUrl: "src/html/loginView.html",
			controller: "loginController"
		})
		.when("/admin", {
			templateUrl: "src/html/adminHomeView.html",
			controller: "adminController"
		})
		.when("/student", {
			templateUrl: "src/html/studentEvalListView.html",
			controller: "studentEvalListController"
		})
		.otherwise({
			redirectTo: "/login"
		});
	}
])

.factory('loginResource', [
	'$http',
	function ($http) {
		return {
			login: function (loginInfo, evaluationServer) {
				return $http.post(evaluationServer + '/api/v1/login', loginInfo);
		    },

		    getStuEvals: function (evaluationServer, token) {
		    	$http.defaults.headers.common.Authorization = 'Basic ' + token;
		    	return $http.get(evaluationServer + '/api/v1/my/evaluations');
		    }
		};
	}
])
.constant('evaluationServer', 'http://dispatch.ru.is/demo')
.service('sessionCookie',['$q',
	function ($q) {
		var self = this, 
			defer = $q.defer();

		/* */
		this.User = '';
		this.Token = '';
		this.FullName = '';
		this.Role = '';

		this.observe = function () {
			return defer.promise;
		};

		this.set = function (user, token, fullname, role) {
			this.User = user;
			this.Token = token;
			this.FullName = fullname;
			this.Role = role;
			defer.notify(self);
			
		};

		this.getUser = function () {
			return this.User;
		};

		this.getToken = function () {
			return this.Token;
		};

		this.getFullName = function () {
			return this.FullName;
		};

		this.getRole = function () {
			return this.Role;
		};
	}
]);
