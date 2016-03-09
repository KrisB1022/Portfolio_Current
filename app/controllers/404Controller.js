(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller("404Controller", ["$scope", "$location", "$interval", function($scope, $location, $interval) {
		$scope.timer = 4;
		$interval(function() {
			$scope.timer--;
			if($scope.timer === 0) {
				$location.url('/');
			}
		}, 1200)
	}]);

})(jQuery);