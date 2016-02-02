(function($) {
	"use strict"

	var currentPage = 'home';

	angular.module("myPortfolio", ['ngRoute'])
		.config(["$routeProvider", "$sceProvider", function($routeProvider, $sceProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'home.html',
				controller: 'LandingController',
				resolve: function() {
					currentPage = 'home';
				}
			})
			.when('/work.html', {
				templateUrl: 'work.html',
				controller: "WorkController",
				resolve: function() {
					currentPage = 'work';
				}
			})
			.otherwise({ redirectTo: '/' });

			$sceProvider.enabled(false);
		}])

		.controller("MainNav", ["$scope", function($scope) {
			/* Dynamically sets nav links on pages */
			var home = {"href": "home.html", "link": "home"},
				contact = {"href": "contact.html", "link": "contact"},
				work = {"href": "work.html", "link": "work"};
			$scope.navLinks = function() {
				if (currentPage ==  'work') {
					return [ home, contact ]; 
				} else if (currentPage == 'contact') {
					return [ home, work ];
				} else {
					return [ work, contact ];
				}
			}();
		}])
		
		;


})(jQuery)