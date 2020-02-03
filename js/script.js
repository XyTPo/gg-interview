"use strict";

function getClosest(elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
	    Element.prototype.matches =
	        Element.prototype.matchesSelector ||
	        Element.prototype.mozMatchesSelector ||
	        Element.prototype.msMatchesSelector ||
	        Element.prototype.oMatchesSelector ||
	        Element.prototype.webkitMatchesSelector ||
	        function(s) {
	            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	                i = matches.length;
	            while (--i >= 0 && matches.item(i) !== this) {}
	            return i > -1;
	        };
	}

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;

};

function $(elem) {
  return document.querySelector(elem);
}
function hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}
function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

var shareClick = $('.product__share-word');
var closeClick = $('.close');

shareClick.addEventListener('click', function (e) {
    addClass(this.parentNode, 'press');
});

closeClick.addEventListener('click', function (e) {
    var parent = getClosest(this, '.product__share');
    removeClass(parent, 'press');
});



var also_like_slider = (function() {

  var iife_slider = function (settings) {
    var _ = this;

    _.options = {
      target: $('.also-like__list'),
      arrowLeft: $('.also-like__arrow_left'),
      arrowRight: $('.also-like__arrow_right')
    }

    _.init();
  }
  iife_slider.prototype.init = function () {
    var _ = this;

    _.curSlideIndex = 0;
    _.totalSlides = _.options.target.querySelectorAll('.also-like__list_item');
    _.slidesCount = _.totalSlides.length;
    addClass(_.totalSlides[0], 'active-slide');
    _.initArrows();
  }
  iife_slider.prototype.initArrows = function () {
    var _ = this;

    if (_.options.arrowLeft != '') {
      _.options.arrowLeft.addEventListener('click', function (e) {
        if (_.curSlideIndex == 0) {
        _.curSlideIndex = _.slidesCount;
        }
        _.curSlideIndex--;
        _.gotoSlide();
        e.preventDefault();
      });
    }

    if (_.options.arrowRight != '') {
      _.options.arrowRight.addEventListener('click', function (e) {
        if (!hasClass(_.options.target, 'isAnimating')) {
          if (_.curSlideIndex == _.slidesCount - 1) {
            _.curSlideIndex = 0;
          }
          _.curSlideIndex++;
          _.gotoSlide();
          e.preventDefault();
        }
      });
    }
  }
  iife_slider.prototype.gotoSlide = function () {
      var _ = this;

      var activeSlide = _.options.target.querySelector('.active-slide');
      removeClass(activeSlide, 'active-slide');

      var targetSlide = _.totalSlides[_.curSlideIndex];
      addClass(targetSlide, 'active-slide');
  }
  return iife_slider;
})();

var slider = new also_like_slider();

