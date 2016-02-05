(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller("ContactController", ["$scope", "$http", "$window", function($scope, $http, $window) {
		$scope.submitted = function() {
			var formData = {
				"firstName": "Kris",
				"lastName": "Tested",
				"email": "Email here",
				"phoneNumber": "phone number",
				"message": "$scope.message didn't work"
			}
			// check if honey pot if empty
			// var honeyPot = $scope.winnie_the_pooh;
			// if(honeyPot.value == '') {
				// $http.post('app/templates/contact.php', formData)
				// 	.then(function(response) {
				// 		console.log("successful " + response.data)
				// 		console.log("successful " + response.statusText)
				// 		console.log("successful " + response)
				// 	}, function(response) {
				// 		console.log("Error " + response)
				// 		console.log("Error " + response.data)
				// 		console.dir(response)
				// 	});

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
					for(var item in response) {
						console.log(item)
					}
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