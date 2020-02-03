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

  var iife_slider = function () {
    var _ = this;

    _.options = {
      inited: false,
      target: $('.also-like__list')
    }

    _.init();
  }
  iife_slider.prototype.init = function () {
    var _ = this;
    _.matchMediaCheck();
    window.addEventListener('resize', function (){
      _.matchMediaCheck();
    });
  }
  iife_slider.prototype.matchMediaCheck = function () {
    var _ = this;
    if (!_.options.inited && window.matchMedia('(max-width: 767px)').matches) {
      _.create();
    } else if (_.options.inited && window.matchMedia('(min-width: 768px)').matches) {
      _.destroy();
    }
  }
  iife_slider.prototype.create = function () {
    var _ = this;
    _.curSlideIndex = 0;
    _.totalSlides = _.options.target.querySelectorAll('.also-like__list_item');
    _.slidesCount = _.totalSlides.length;
    addClass(_.options.target, 'slider-inited');
    addClass(_.totalSlides[0], 'active-slide');
    _.initArrows();
    _.options.inited = true;
  }
  iife_slider.prototype.destroy = function () {
    var _ = this;
    _.options.arrows.parentNode.removeChild(_.options.arrows);

    var activeSlide = _.options.target.querySelector('.active-slide');
    removeClass(_.options.target, 'slider-inited');
    removeClass(activeSlide, 'active-slide');

    _.options.inited = false;
  }
  iife_slider.prototype.initArrows = function () {
    var _ = this;

    var arrowsBlock = document.createElement('div');
    arrowsBlock.className = 'also-like__arrows';

    var arrowLeft = document.createElement('a');
    arrowLeft.className = 'also-like__arrow also-like__arrow_left';
    arrowLeft.href = '#';
    arrowLeft.addEventListener('click', function (e) {
      if (_.curSlideIndex == 0) {
      _.curSlideIndex = _.slidesCount;
      }
      _.curSlideIndex--;
      _.gotoSlide();
      e.preventDefault();
    });

    var arrowRight = document.createElement('a');
    arrowRight.className = 'also-like__arrow also-like__arrow_right';
    arrowRight.href = '#';
    arrowRight.addEventListener('click', function (e) {
      if (_.curSlideIndex == _.slidesCount - 1) {
        _.curSlideIndex = 0;
      }
      _.curSlideIndex++;
      _.gotoSlide();
      e.preventDefault();
    });


    arrowsBlock.appendChild(arrowLeft);
    arrowsBlock.appendChild(arrowRight);
    _.options.arrows = arrowsBlock;
    _.options.target.parentNode.appendChild(arrowsBlock);

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

