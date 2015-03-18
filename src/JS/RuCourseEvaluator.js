"use strict";

//test
angular.module("RuCourseEvaluator", ['ngRoute'])
.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when("/editEval/:evalObj", {
			templateUrl: "",
			controller:  ""
		})
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
		.when("/adminNewTemplate", {
			templateUrl: "src/html/adminNewTemplateView.html",
			controller: "adminTemplateController"
		})
		.when("/adminNewTemplate/:tempObj", {
			templateUrl: "src/html/adminNewTemplateView.html",
			controller: "adminTemplateController"
		})
		.when("/adminEvalList",{
			templateUrl: "src/html/adminEvalListView.html",
			controller: "adminEvalListController"
		})
		.when('/adminNewEval',{
			templateUrl: "src/html/adminNewEvalView.html",
			controller: "adminEvalController"
		})
		.when('/adminTempList',{
			templateUrl: "src/html/adminTemplateListView.html",
			controller: "adminTemplateListController"
		})
		.when("/student", {
			templateUrl: "src/html/studentEvalListView.html",
			controller: "studentEvalListController"
		})
		.when("/multi", {
			templateUrl: "src/html/multiChoicePartialView.html",
			controller: "multiController"
		})
		.when("/single", {
			templateUrl: "src/html/singleChoicePartialView.html",
			controller: "singleController"
		})
		.otherwise({
			redirectTo: "/login"
		});
	}
])
.constant('evaluationServer', 'http://dispatch.ru.is/demo')
.factory('serverResource', [
	'$http',
	'evaluationServer',
	function ($http, evaluationServer) {
		return {
			login: function (loginInfo) { 															/**/
				return $http.post(evaluationServer + '/api/v1/login', loginInfo);
		    },
		    getMyCourses: function (token) { 														/**/
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(evaluationServer + "/api/v1/my/courses/");	
			},
		    getMyEvals: function (token) { 															/**/
		    	$http.defaults.headers.common.Authorization = 'Basic ' + token;
		    	return $http.get(evaluationServer + '/api/v1/my/evaluations');
		    },
		    postEval: function (evalObj, token) { 													/**/
		    	$http.defaults.headers.common.Authorization = 'Basic ' + token;
		    	return $http.post(evaluationServer + '/api/v1/evaluations', evalObj);
		    },
			getEvals: function(token) { 															/**/
		    	$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(evaluationServer + '/api/v1/evaluations');
			},
		    getEval: function(id, token) {															/**/
		    	$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(evaluationServer + '/api/v1/evaluations/' + id);
			},
			getTemplates: function(token) { 														/**/
		    	$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(evaluationServer + '/api/v1/evaluationtemplates');
			},
			getTemplate: function (id, token) { 													/**/
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(evaluationServer + '/api/v1/evaluationtemplates/' + id);
			},
			postTemplate: function (template, token) { 												/**/
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.post(evaluationServer + "/api/v1/evaluationtemplates", template);
			},
			getCourseTeachers: function (course, semester, token) { 								/**/
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(evaluationServer + "/api/v1/courses/" + 
				 					course + "/" + semester + "/teachers");
			},
			getCourseEval: function (course, semester, evalID, token) { 							/**/
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.get(evaluationServer + "/api/v1/courses/" +
				 					course + "/" + semester + "/evaluations/" + evalID);	
			},
			postCourseEval: function (course, semester, evalID, evalObj, token) {					/**/
				$http.defaults.headers.common.Authorization = 'Basic ' + token;
				return $http.post(evaluationServer + "/api/v1/courses/" + 
									course + "/" + semester + "/evaluations/" + evalID, evalObj);	
			}
		};
	}
])
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
