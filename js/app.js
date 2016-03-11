(function($) {
	"use strict";

	angular.module("myPortfolio", ['ngRoute', 'ngMessages', 'ngAnimate', 'angular-spinkit'])
		.config(["$routeProvider", "$sceProvider", function($routeProvider, $sceProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'app/templates/home.html',
				controller: 'LandingController',
			})
			.when('/project/:project', {
				templateUrl: 'app/templates/project_single.html',
				controller: "SingleProjectController"
			})
			.when('/contact', {
				templateUrl: 'app/templates/contact.html',
				controller: "ContactController"
			})
			.when('/_404', {
				templateUrl: 'app/templates/404.html',
				controller: "404Controller"
			})
			.otherwise({ redirectTo: '/_404' });

			$sceProvider.enabled(false);
		}])

		/* Sets loading status if page loads (prevention for slow reqs / resp) */ 
		.directive("routeLoading", ["$rootScope", "$timeout", function($rootScope, $timeout) {
			return {
				restrict: "E",
				template: 
					"<div class='spinner-wrapper' ng-if='isRouteLoading' ng-class='{fade: startFade}'>" + 
						"<div class='spinner'>" +
							"<p class='spinner-title'>loading...</p>" +
							"<chasing-dots-spinner></chasing-dots-spinner>" +
						"</div>" +
					"</div>",
				replace: true,
				link: function($scope, $elem, $attrs) {
					$scope.isRouteLoading = false;
					$scope.startFade = false;

					$scope.timeout = function() {
						$scope.startFade = true;
					};
					$scope.destroy = function() {
						$scope.startFade = false;
						$scope.isRouteLoading = false;
						$timeout.cancel($rootScope.timeout);
					};


					$rootScope.$on("$routeChangeStart", function() {
						// Resets >> only run on first load
						// $scope.destroy();

						// Start route transitions
						$scope.isRouteLoading = true;
					});
					$rootScope.$on("$routeChangeSuccess", function() {
						$timeout(function() {
							$scope.timeout();
						}, 2000);
					});
				}
			};
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
			$scope.slideNav = function() {
				$('.nav').slideToggle();
			};

			/* Copywrite Date */
			$scope.date = new Date();


		}])
		
		;


})(jQuery);