(function($) {
	"use strict"

	angular.module("myPortfolio", ['ngRoute', 'ngMessages', 'ngAnimate'])
		.config(["$routeProvider", "$sceProvider", function($routeProvider, $sceProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'app/templates/home.html',
				controller: 'ProjectsController',
			})
			.when('/project/:project', {
				templateUrl: 'app/templates/project_single.html',
				controller: "SingleProjectController"
			})
			.when('/contact', {
				templateUrl: 'app/templates/contact.php',
				controller: "ContactController"
			})
			.when('/_404', {
				templateUrl: 'app/templates/404.html',
				controller: "404Controller"
			})
			.otherwise({ redirectTo: '/_404' });

			$sceProvider.enabled(false);
		}])

		.controller("MainController", ["$scope", "$location", function($scope, $location) {
			/* dynamically attach current page to body */
			$scope.currentPageClass = function() {
				var path = $location.path();
				if(path.slice(1)) {
					return path.slice(1);
				} else {
					return 'home';
				}
			};
			
			/* Mobile Nav hamburger */
			$scope.showMenu = false;
			$scope.mobileNav = function() {
				$scope.showMenu = !$scope.showMenu;
			};
		}])
		
		;


})(jQuery)