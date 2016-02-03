(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller('SingleProjectController', ['$scope', '$http', '$templateCache', '$routeParams', '$location', function($scope, $http, $templateCache, $routeParams, $location) {
		
		var projectID = $routeParams.project;
		$scope.projects = [];
		$scope.project = [];
		$http({
			method: 'GET',
			url: 'app/data/projectsDetails.json',
			cache: $templateCache
		})
		.then(function(response) {
			/* Check if project is valid. If not redirect to 404 */
			$scope.projects = response.data;

			if( projectID in $scope.projects ) {
				console.log('added')
				$scope.project = $scope.projects[projectID];
			} else {
				alert("Sorry, there is no project by that path");
				return;
			}

		}, function(response) {
			console.log("An error occured in the SingleProjectController: " + response.statusText)
		});


	}]);

})(jQuery)