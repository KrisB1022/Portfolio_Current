(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller('SingleProjectController', ['$scope', '$http', '$templateCache', '$routeParams', '$location', function($scope, $http, $templateCache, $routeParams, $location) {
		
		var projectID = $routeParams.project,
			projectKeys,
			projectIdx,
			prevProject,
			nextProject,
			slideIndex = 0;

		$scope.projects = [];
		$scope.project = [];

		$http({
			method: 'GET',
			url: 'app/data/projects.json',
			cache: $templateCache
		})
		.then(function(response) {
			/* Check if project is valid. If not redirect to 404 */
			$scope.projects = response.data;

			if( projectID in $scope.projects ) {
				$scope.project = $scope.projects[projectID];

				// If true, set prev and next project indx values in scope for pagination
				projectKeys = Object.keys( $scope.projects );
				projectIdx = projectKeys.indexOf(projectID);
				prevProject = projectIdx - 1;
				nextProject = projectIdx + 1;

			} else {
				$location.url('/_404'); // TODO: Add Error/404 Page
			}

		}, function(response) {
			console.log("An error occurred in the SingleProjectController: " + response.statusText)
		});

		/* Pagination for projects */
		$scope.previousProject = function() {
			if(prevProject < 0) {
				$location.url('/project/' + projectKeys[projectKeys.length - 1]);
			} else {
				$location.url('/project/' + projectKeys[prevProject]);
			}
		};

		$scope.nextProject = function() {
			if(nextProject == projectKeys.length) {
				$location.url('/project/' + projectKeys[0]);
			} else {
				$location.url('/project/' + projectKeys[nextProject]);
			}
		};

		/* Pagination for Sliders */
		$scope.slidePosition = function() {
			var left = -(slideIndex * 100) + '%' || 0;
			return left;
		};
		$scope.currentSlide = function() {
			return slideIndex;
		};
		$scope.prevSlide = function() {
			if( slideIndex == 0 ) {
				slideIndex = $('.slide_img').length - 1;
				return;
			}
			slideIndex--;
		};
		$scope.nextSlide = function() {
			if( slideIndex >= $('.slide_img').length - 1 ) {
				slideIndex = 0;
				return;
			}
			slideIndex++;
		};
		$scope.goToSlide = function( indx ) {
			slideIndex = indx;
		};


		$scope.isFirstSlide = function() {
			if( slideIndex <= 0 ) {
				return true;
			} else {
				return false;
			}
		};
		$scope.isLastSlide = function() {
			if( slideIndex >= $('.slide_img').length - 1 ) {
				return true;
			} else {
				return false;
			}
		};



	}]);

})(jQuery);