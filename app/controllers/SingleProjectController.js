(function($) {
	"use strict"

angular.module("myPortfolio")
	.controller('SingleProjectController', 
		['$scope', '$http', '$templateCache', '$routeParams', '$location', 
		function($scope, $http, $templateCache, $routeParams, $location) {
		
		var projectsSubDirectory = '/project/',
			projectID = $routeParams.project,
			projectKeys,
			projectIdx,
			prevProject,
			nextProject,
			slideIndex = 0,
			slidesLength;

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

				// Set prev and next project indx values in scope for pagination
				projectKeys = Object.keys( $scope.projects );
				projectIdx = projectKeys.indexOf(projectID);
				prevProject = projectIdx - 1;
				nextProject = projectIdx + 1;

				// Set global reference
				slidesLength = $scope.project.projectImages ? $scope.project.projectImages.length : null;


			} else {
				$location.url('/_404'); // TODO: Add Error/404 Page
			}

		}, function(response) {
			console.log("SingleProjectController: " + response.statusText)
		});


		/* Pagination Controls for Projects */
		$scope.previousProject = function() {
			if(prevProject < 0) {
				$location.url(projectsSubDirectory + projectKeys[projectKeys.length - 1]);
			} else {
				$location.url(projectsSubDirectory + projectKeys[prevProject]);
			}
		};

		$scope.nextProject = function() {
			if(nextProject == projectKeys.length) {
				$location.url(projectsSubDirectory + projectKeys[0]);
			} else {
				$location.url(projectsSubDirectory + projectKeys[nextProject]);
			}
		};

		/* Controls for Slider */
		$scope.slidePosition = function() {
			return -(slideIndex * 100) + '%' || 0;
		};
		$scope.prevSlide = function() {
			if( slideIndex == 0 ) {
				slideIndex = slidesLength - 1;
				return;
			}
			slideIndex--;
		};
		$scope.nextSlide = function() {
			if( slideIndex >= slidesLength - 1 ) {
				slideIndex = 0;
				return;
			}
			slideIndex++;
		};


		/* Pagination for Sliders */
		$scope.currentSlide = function() {
			return slideIndex;
		};
		$scope.goToSlide = function( indx ) {
			slideIndex = indx;
		};


		/* Slider Display Methods */
		$scope.sliderWidth = function() {
			var width = (slidesLength * 100) + '%';
			return width;
		};
		$scope.slideWidth = function() {
			return (100 / slidesLength ) + '%';
		};
		$scope.isFirstSlide = function() {
			if( slideIndex <= 0 ) {
				return true;
			} else {
				return;
			}
		};
		$scope.isLastSlide = function() {
			if( slideIndex >= slidesLength - 1 ) {
				return true;
			} else {
				return;
			}
		};


	}]);

})(jQuery);