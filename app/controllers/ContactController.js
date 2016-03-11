(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller("ContactController", ["$scope", "$http", "$window", "$location", function($scope, $http, $window, $location) {
		$scope.sendSuccess = false;
		$scope.sendError = false;
		$scope.submitted = function() {
			// check if honey pot if empty
			var honeyPot = $scope.winnie_the_pooh;
			if( typeof honeyPot === "undefined" ) {
				var request = $http({
					method: "POST",
					url: "app/templates/contact.php",
					data: {
						firstName: $scope.firstName,
						lastName: $scope.lastName,
						email: $scope.email,
						phoneNumber: $scope.phoneNumber,
						message: $scope.message
					},
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				});

				request.then(function(response) {
					$scope.sendSuccess = true;				
				}, function(response) {
					$scope.sendError = true;
				});

			} else {
				$window.location.href = "https://en.wikipedia.org/wiki/Spamming";
			}
		};
	}]);


})(jQuery);