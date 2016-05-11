// NAV AND SCROLLING

jQuery(document).ready(function($){
	var	scrolling = false;
	var contentSections = $('.page-section'),
		verticalNavigation = $('.vertical-nav'),
		navigationItems = verticalNavigation.find('a'),
		navTrigger = $('.nav-trigger'),
		scrollArrow = $('.fixed-scroll-down');

	$(window).on('scroll', checkScroll);

	//NAV SMOOTH SCROLL
	verticalNavigation.on('click', 'a', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
        verticalNavigation.removeClass('open');
    });

    //smooth scroll to the second section
    scrollArrow.on('click', function(event){
    	event.preventDefault();
        smoothScroll($(this.hash));
    });

	// open navigation if user clicks the .nav-trigger - small devices only
    navTrigger.on('click', function(event){
    	event.preventDefault();
    	verticalNavigation.toggleClass('open');
    });

	function checkScroll() {
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
		}
	}

	function updateSections() {
		var halfWindowHeight = $(window).height()/2,
			scrollTop = $(window).scrollTop();
		contentSections.each(function(){
			var section = $(this),
				sectionId = section.attr('id'),
				navigationItem = navigationItems.filter('[href^="#'+ sectionId +'"]');
			( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.height() - halfWindowHeight > scrollTop) )
				? navigationItem.addClass('active')
				: navigationItem.removeClass('active');
		});
		scrolling = false;
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	300
        );
	}
});


// ANIMATED HEADLINES

jQuery(document).ready(function($){
	//set animation timing
	var animationDelay = 2500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect
		revealDuration = 600,
		revealAnimationDelay = 1500;

	initHeadline();


	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.animated-headline.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.animated-headline'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);

			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.animated-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')){
				var spanWrapper = headline.find('.animated-words-wrapper'),
					newWidth = spanWrapper.width() + 10
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ) {
				//assign to .animated-words-wrapper the width of its longest word
				var words = headline.find('.animated-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				//headline.find('.animated-words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);

		if($word.parents('.animated-headline').hasClass('type')) {
			var parentSpan = $word.parent('.animated-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');
			setTimeout(function(){
				parentSpan.removeClass('selected');
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

		} else if($word.parents('.animated-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.animated-headline').hasClass('clip')) {
			$word.parents('.animated-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.animated-headline').hasClass('loading-bar')){
			$word.parents('.animated-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.animated-words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if($word.parents('.animated-headline').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.animated-headline').hasClass('clip')) {
			$word.parents('.animated-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay);
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');

		if(!$letter.is(':last-child')) {
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
		} else if($bool) {
		 	setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		}
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');

		if(!$letter.is(':last-child')) {
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration);
		} else {
			if($word.parents('.animated-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.animated-words-wrapper').addClass('waiting'); }, 200);}
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function takePrev($word) {
		return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
});


// PORTFOLIO SLIDER

$(function(){
  $('#MixItUp1').mixItUp({
    selectors: {
      filter: '.filter-1',
      sort: '.sort-1'
    },
	animation: {
		duration: 200,
		effects: 'fade scale(0.77) translateX(10%) translateY(10%) stagger(64ms)',
		easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
	}
  });

  $('#MixItUp2').mixItUp({
    selectors: {
      filter: '.filter-2',
      sort: '.sort-2'
    },
	animation: {
		duration: 200,
		effects: 'fade scale(0.77) translateX(10%) translateY(10%) stagger(64ms)',
		easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
	}
  });
});


// TIMELINE

// jQuery(document).ready(function($) {
// 	//store service items
// 	var fillingBlocks = $('.cd-service').not('.cd-service-divider');

// 	//store service items top position into an array
// 	var topValueFillingBlocks = [];
// 	fillingBlocks.each(function(index){
// 		var topValue = $(this).offset().top;
// 		topValueFillingBlocks[topValueFillingBlocks.length] = topValue;
// 	});

// 	//add the .focus class to the first service item
// 	fillingBlocks.eq(0).addClass('focus');

// 	$(window).on('scroll', function(){
// 		//check which service item is in the viewport and add the .focus class to it
// 		updateOnFocusItem(fillingBlocks.slice(1));
// 		//evaluate the $(window).scrollTop value and change the body::after and body::before background accordingly (using the new-color-n classes)
// 		bodyBackground(topValueFillingBlocks);
// 	});
// });

// function updateOnFocusItem(items) {
// 	items.each(function(){
// 		( $(this).offset().top - $(window).scrollTop() <= $(window).height()/2 ) ? $(this).addClass('focus') : $(this).removeClass('focus');
// 	});
// }

// function bodyBackground(itemsTopValues) {
// 	var topPosition = $(window).scrollTop() + $(window).height()/2,
// 		servicesNumber = itemsTopValues.length;
// 	$.each(itemsTopValues, function(key, value){
// 		if ( (itemsTopValues[key] <= topPosition && itemsTopValues[key+1] > topPosition) || (itemsTopValues[key] <= topPosition && key+1 == servicesNumber ) ) {
// 			$('body').removeClass('new-color-'+(key-1)+' new-color-'+(key+1)).addClass('new-color-'+key);
// 		}
// 	});
// }




// PARALLAX ANIMATION LIBRARY
skrollr.init();
