(function($) {
	"use strict"

	angular.module("myPortfolio", ['ngRoute'])
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
				templateUrl: 'app/templates/contact.html',
				controller: "ContactController",
			})
			.otherwise({ redirectTo: '/' });

			$sceProvider.enabled(false);
		}])

		.controller("MainNav", ["$scope", function($scope) {
			/* Dynamically sets nav links on pages */
			var home = {"href": "home", "link": "home"},
				contact = {"href": "contact", "link": "contact"},
				work = {"href": "work", "link": "work"};
			$scope.navLinks = [home, work, contact];
		}])
		
		;


})(jQuery)