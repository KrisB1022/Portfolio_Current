(function($) {
	"use strict";

angular.module("myPortfolio")
	.controller("LandingController", ["$scope", "$http", "$location", 
		function($scope, $http, $location) {

		$scope.title = "Kris - a Seattle area Web Developer";
		$scope.introduction = "I'm a passionate, creative web developer, always looking to learn something new, improve what I got and lend a helping hand. Angular.js, Javascript (jQuery included), CSS, Design, UI/UX, PHP, and WordPress are some favorites, although I have knowledge in other front-end and back-end languages and technologies. Take a peek at a small sample of my work, then reach out.";

		$scope.projects = [];
		$http.get("app/data/projects.json")
			.then(function(response) {
				$scope.projects = response.data;
			}, function(response) {
				console.log("An error occurred in LandingController: " + response.statusText)
			});
	}]);

})(jQuery);


