(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller("ContactController", ["$scope", "$http", "$window", "$location", function($scope, $http, $window, $location) {
		$scope.submission = false;
		$scope.submitted = function() {
			// check if honey pot if empty
			// var honeyPot = $scope.winnie_the_pooh;
			// if(honeyPot.value == '') {
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
					// TEMP - TODO create redirect for success
					alert("Thanks for reaching out! I'll get right back to you!");
					$location.path('/');

				}, function(response) {
					alert("Well this is embarassing. An error occured.");
				});

			// } else {
			// 	$window.location.href = "https://en.wikipedia.org/wiki/Spamming";
			// }
		};
	}]);


})(jQuery);