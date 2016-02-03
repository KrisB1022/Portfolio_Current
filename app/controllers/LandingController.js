(function($) {
	"use strict";

angular.module("myPortfolio")
	.controller("ProjectsController", ["$scope", "$http", "$location", 
		function($scope, $http, $location) {

		$scope.title = "introduction statement";
		$scope.introduction = "Introduction paragraph about myself, skills, etc.";

		$scope.projects = [];
		$http.get("app/data/projects.json")
			.then(function(response) {
				$scope.projects = response.data;
			}, function(response) {
				console.log("An error occurred in ProjectsController: " + response.statusText)
			});
	}]);

})(jQuery);


