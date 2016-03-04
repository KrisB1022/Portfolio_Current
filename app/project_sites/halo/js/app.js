(function ($) {
		// globals
		var week1,
				week2,
				week3,
				week4,
				currentWeek;

	var RESULTS = (function ($) {

		var updateResults = function( vals ) {
			// Set Default Values
			// Définir des valeurs par défaut
			var weekEval = eval('week' + vals.weekNumber);
			weekEval = vals;
			weekEval.totalVotes = weekEval.chiefVotes + weekEval.lockeVotes;
			weekEval.weekNumberClass = '.week' + weekEval.weekNumber;

			/*
			* Voting states: | États votants:
			*		Open for voting; | Ouvrez pour le scrutin;
			*		Has a winner | A un gagnant
			*		No voting yet (default); | Pas encore de vote (par défaut);
			*/
			var week = weekEval.weekNumberClass;
			if( weekEval.openForVoting ) {
				/* For the Prize section | Pour la section Prix */
				currentWeek = weekEval.weekNumber;
				/* Open for voting | Ouvert pour le vote */
				$( week + '.week-wrapper').addClass('open').addClass('votingOpen');			
				activateForm();

			} else {
				/* Has a winner | A un gagnant */
				if( weekEval.totalVotes ) {
					if( !currentWeek ) {
						currentWeek = 5;
					}

					// Set values | Définissez les valeurs
					findWinner( weekEval );
					getPercentages( weekEval );
					updateHTML( weekEval );

					$(week).addClass( weekEval.winner ).addClass('hasWinner');

					$(week).on('click', function() {
						if( !$(week + '.week-wrapper').hasClass('open') ) {
							startAnimations( weekEval );
						} else {
							resetAnimations( weekEval );
						}
					});
				} else {
					return;	/* No voting yet. Do nothing. | Pas encore de vote . Ne fais rien.	*/		
				}
			}
		};

		// Activates form (animations and ajax) | Active formulaire ( animations et AJAX )
		/*
		* This is for the voting data inside the week | 
			Ceci est pour les données de vote à l'intérieur de la semaine

		* Set up as an AJAX request to keep on page and POST data to database |
			Mettre en place comme une requête AJAX de garder sur la page et publier des données sur la base de données
		*/
		var activateForm = function() {
			$('.form-wrapper .label-wrapper').on('click', function() {
				var label = $(this).find('label'),
					labelID = label.attr('for'),
					labelClass = label.attr('class'),
					form = $(this).closest('.form');
					// Set Ajax
					$(form).on('submit', function(e) {
						e.preventDefault();
						$.ajax({
							// url: $(this).attr('action'),
							// type: 'POST',
							// data: $(this).serialize(),
							beforeSend: function() {
								console.log('Sending Response');
							},
							success: function(response) {
								console.log('Data Sent');
							}
						});
					});

					$('#' + labelID).attr('checked', true);

					$(form).submit();
					$(form).hide();
					$(form).closest('.week-wrapper').find('.votingQuestion').hide();
					$(form).closest('.week-wrapper').find('.' + labelClass).fadeIn('fast');
			});
		};

		// Set winner | Set gagnant
		var findWinner = function( weekEval ) {

			if( weekEval.chiefVotes >= weekEval.lockeVotes ) {
				weekEval.winner = 'chief';
				weekEval.loser = 'locke';
			} else {
				weekEval.winner = 'locke';
				weekEval.loser = 'chief';
			}
		};
	
		// calculate percentages | calculer des pourcentages
		var getPercentages = function( weekEval ) { 
			var charLost;
				if( weekEval.winner && weekEval.loser ) {
					// Sets losers percent
					if( weekEval.loser == 'locke' ) {
						charLost = weekEval.lockeVotes;
					} else {
						charLost = weekEval.chiefVotes;
					}

					weekEval.loserPercent = Math.floor( (charLost / weekEval.totalVotes) * 100 );
					weekEval.winnerPercent = 100 - weekEval.loserPercent;
					isAcceptiblePercentage( weekEval );
				} else {
					console.log('findWinner error: No winner or loser set');
				}
		};

		var isAcceptiblePercentage = function( weekEval ) {
			if( weekEval.loserPercent == weekEval.winnerPercent ) {
				weekEval.loserPercent = 49;
				weekEval.winnerPercent = 51;
			}
			if( weekEval.loserPercent == 0 ) {
				weekEval.loserPercent = 1;
				weekEval.winnerPercent = 99;
			}
		};

		// Update results panel | Les résultats de la mise à jour panneau
		var updateHTML = function( weekEval ) {
			var $results = $('.week' + weekEval.weekNumber + ' .results-wrapper'),
					title = $results.find('.title'),
					winnerHash = $results.find('.winner-wrapper .hashTag');
					loserHash = $results.find('.loser-wrapper .hashTag');
			
			$results.hide();
			
			$results.find('.default').hide();

			if( weekEval.winner == 'chief')  {
				title.html( 'MASTER ' + weekEval.winner.toUpperCase() + ' REMPORTE LA BATAILLE' );	
				$results.find('.chiefWins').show();
				winnerHash.html( '#TEAMCHIEF' );
				loserHash.html( '#TEAMLOCKE' );
			} else {
				title.html( weekEval.winner.toUpperCase() + ' REMPORTE LA BATAILLE' );	

				$results.find('.lockeWins').show();
				winnerHash.html( '#TEAMLOCKE' );
				loserHash.html( '#TEAMCHIEF' );
			}
			
			$results.fadeIn();

		};

		// Animations
		var startAnimations = function( weekEval ) {
			var elClassName = weekEval.weekNumberClass;

			$(elClassName + '.week-wrapper').addClass('open');

			$(elClassName + ' .results-wrapper').fadeOut(150, function() {
				$(elClassName + '.week-wrapper').addClass('winner');
				$(this).addClass( weekEval.winner );
				$(elClassName + ' .stats-wrapper').show();
			});

			$( elClassName + ' .results-wrapper').fadeIn(function() {
				setTimeout(function() {
					animateElements( weekEval );
				}, 100);
			});
		};

		var animateElements = function( weekEval ) {
			var $results = $('.week' + weekEval.weekNumber + ' .results-wrapper'),
					winnerPercent = $results.find('.winner-wrapper .percent'),
					loserPercent = $results.find('.loser-wrapper .percent');

			animatePercentage( winnerPercent, weekEval.winnerPercent );
			animatePercentage( loserPercent, weekEval.loserPercent );
			updateBarPercentages( weekEval );
		};

		var updateBarPercentages = function( weekEval ) {
			var $winningBars = $('.week' + weekEval.weekNumber + ' .winner-wrapper .result-bar'),
					$losingBars = $('.week' + weekEval.weekNumber + ' .loser-wrapper .result-bar');

			animateBars( $winningBars, weekEval.winnerPercent );
			animateBars( $losingBars, weekEval.loserPercent );
		};

		var animatePercentage = function( el, targetNumber ) {
			var count = 0;
			var percentage = setInterval(function() {
				$(el).text( count + '%' );
				if( count >= targetNumber ) {
					clearInterval(percentage);
				} else {
					count++;
				}				
			}, 6);
		};

		var animateBars = function( barsToAnimate, percentToFill ) {
			var count = 0;
			var percentage = setInterval(function() {
				$(barsToAnimate).animate({
					width: count + '%'
				}, 0);
				if( count >= percentToFill ) {
					clearInterval(percentage);
				} else {
					count++;
				}
			}, 6);
		};

		// Clear animations
		var resetAnimations = function( weekEval ) {
			var elClassName = weekEval.weekNumberClass;

			$(elClassName + ' .results-wrapper').fadeOut(150, function() {
				$(elClassName + '.week-wrapper').removeClass('winner');
				$(this).removeClass( weekEval.winner );
				$(elClassName + ' .stats-wrapper').hide();	
				$(elClassName + '  .bar').removeClass('winner').removeClass('loser');
				$(elClassName + ' .percent').html('0%');
				$(elClassName + ' .result-bar').width(0);
				$(elClassName + '.week-wrapper').removeClass('open');
			});
			$(elClassName + ' .results-wrapper').fadeIn();
		};

		return {
			update: updateResults
		};

	})(jQuery);

	var PRIZESELECT = (function ($) {
		var init = function() {

			switchPrize( $('.prizes').find( $('#week' + currentWeek) ) );

			$('.prize').on('click', function() {
				var that = $(this);
				switchPrize( that );
			});					
		};

		var switchPrize  = function( el ) {
			var mainImg = $('.currentWeekImg'),
				newImgSrc = el.find('img').attr('src');

			mainImg.attr('src', newImgSrc);
			$('.prize').removeClass('currentWeek');
			el.addClass('currentWeek');
		};

		return { init: init };

	})(jQuery);

	var LOADFRAMES = (function ($) {
		var init = function() {
			setTimeout(function() {
				loadFrames();
			}, 500);
		};

		var urls = [
			'https://www.youtube.com/watch?v=r--wduBEh08',
			'https://www.youtube.com/watch?v=qt8SBvSvaR8',
			'https://www.youtube.com/watch?v=nNt8bo1CQJo',
			'https://www.youtube.com/watch?v=d79tc5qM8Ko'
		];

		var loadFrames = function() {
			var	videoBlocks = $('.video-wrapper .video');

			for(var i = 0, n = videoBlocks.length; i < n; i++) {
				var newUrl = (urls[i].replace(/watch\?v\=/i, 'embed/'));

				$(videoBlocks[i]).html("<iframe src='" + newUrl + "?showinfo=0&rel=0' frameborder='0' allowfullscreen></iframe>");
			}
		};


		return { init: init, videoUrls: urls };

	})(jQuery);

	// Smooth Scrolling | le défilement régulier
	$(function() {
	  $('a[href*=#]:not([href=#])').on('click touchstart', function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - 50
	        }, 650);
	        return false;
	      }
	    }
	  });
	});

	$(document).ready(function() {


		// RESULTS.update({
		 	// weekNumber: 1, 					// <== Numero de la semaine
		 	// chiefVotes: 2100061,		// <==	Chef Votes
		 	// lockeVotes: 6666666,		// <== Votes Locke
			// openForVoting: true		// <== Ouvert pour le vote - vraui || faux
		// });

		RESULTS.update({
			weekNumber: 1,
			chiefVotes: 99,
			lockeVotes: 46,
			// openForVoting: true
		});

		RESULTS.update({
			weekNumber: 2,
			chiefVotes: 10005405,
			lockeVotes: 15484884,
			// openForVoting: true
		});

		RESULTS.update({
			weekNumber: 3,
			// chiefVotes: 60,
			// lockeVotes: 40,
			openForVoting: true
		});

		// RESULTS.update({
		// 	weekNumber: 4,
		// 	chiefVotes: 60000,
		// 	lockeVotes: 60000,
		// 	openForVoting: true
		// });


	// Last Call
		PRIZESELECT.init();
		LOADFRAMES.init();
	});


})(jQuery);