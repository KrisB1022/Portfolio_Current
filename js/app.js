(function($) {
	"use strict"

	angular.module("myPortfolio", ['ngRoute'])
		.config(["$routeProvider", function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'home.html',
				controller: 'LandingPageController'
			})
			.otherwise('/')
		}])

		.controller("MainNav", ["$scope", function($scope) {

		}])
		.controller("LandingPageController", ['$scope', '$routeParams', function($scope, $routeParams) {
			return;
		}])


})(jQuery)