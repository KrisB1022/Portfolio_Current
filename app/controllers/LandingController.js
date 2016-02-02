(function($) {
	"use strict";

angular.module("myPortfolio")
	.controller("LandingController", ["$scope", "$http", "$location", function($scope, $http, $location) {

		$scope.title = "Kris Byrum";
		$scope.introduction = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

		$scope.projects = [];
		$http.get("app/data/featuredProjects.json")
			.then(function(response) {
				$scope.projects = response.data;
			}, function(response) {
				console.log("An error occurred in LandingController: " + response.statusText)
			});


	}]);

})(jQuery);


