(function($) {
	"use strict"

	angular.module("myPortfolio", ['ngRoute', 'ngMessages'])
		.config(["$routeProvider", "$sceProvider", function($routeProvider, $sceProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'app/templates/home.html',
				controller: 'LandingController',
			})
			.when('/work', {
				templateUrl: 'app/templates/work.html',
				controller: "WorkController",
			})
			.when('/work/:project', {
				templateUrl: 'app/templates/project_single.html',
				controller: "SingleProjectController"
			})
			.when('/contact', {
				templateUrl: 'app/templates/contact.php',
				controller: "ContactController"
			})
			.when('/404', {
				templateUrl: 'app/templates/404.html',
				controller: "404Controller"
			})
			.otherwise({ redirectTo: '/404' });

			$sceProvider.enabled(false);
		}])

		.controller("MainController", ["$scope", function($scope) {
			/* Dynamically sets nav links on pages */
			var home = {"href": "", "link": "home"},
				contact = {"href": "contact", "link": "contact"},
				work = {"href": "work", "link": "work"};
			$scope.navLinks = [home, work, contact];
		}])
		
		;


})(jQuery)