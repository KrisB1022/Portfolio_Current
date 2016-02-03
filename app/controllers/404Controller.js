(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller("404Controller", ["$scope", "$location", "$timeout", function($scope, $location, $timeout) {
		$timeout(function() {
			$location.url('/work');
		}, 5000)
	}]);

})(jQuery)