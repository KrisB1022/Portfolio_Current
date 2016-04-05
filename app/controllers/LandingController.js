(function($) {
	"use strict";

angular.module("myPortfolio")
	.controller("LandingController", ["$scope", "$http", "$location", 
		function($scope, $http, $location) {

		$scope.title = "Kris - a Seattle area Web Developer";
		$scope.introduction = "Web development is how I express my creativity and where I do my best work. I am a natural leader with proven leadership abilities and work calmly and effectively under pressure. I have a variety of languages and tools under my belt but always strive to continue learning and growing. Angular.js, Javascript, CSS, design, UI, PHP and WordPress are some of my currently favorite languages to develop for.";

		$scope.projects = [];
		$http.get("app/data/projects.json")
			.then(function(response) {
				$scope.projects = response.data;
			}, function(response) {
				console.log("An error occurred in LandingController: " + response.statusText)
			});
	}]);

})(jQuery);


