(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller("404Controller", ["$scope", "$location", "$timeout", function($scope, $location, $timeout) {
		$timeout(function() {
			$location.url('/');
		}, 3500)
	}]);

})(jQuery);