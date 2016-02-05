(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller("ContactController", ["$scope", "$http", "$window", function($scope, $http, $window) {
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
					console.log("successful " + response)
					console.log("successful " + response.data)
					console.log("successful " + response.statusText)
				}, function(response) {
					console.log("error data: " + response.data)
					console.log("error status: " + response.status)
					console.log("error statusText: " + response.statusText)
				});

			// } else {
			// 	$window.location.href = "https://en.wikipedia.org/wiki/Spamming";
			// }
		};
	}]);


})(jQuery)