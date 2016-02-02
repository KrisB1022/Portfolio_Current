(function($) {
	"use strict";

angular.module("myPortfolio")
	.controller("WorkController", ["$scope", "$http", function($scope, $http) {
		$scope.projects = [];
		$http.get("app/data/featuredProjects.json")
			.then(function(response) {
				$scope.projects = response.data;
			}, function(response) {
				console.log("An error occurred in LandingController: " + response.statusText)
			});


	}]);

})(jQuery);


