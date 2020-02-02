"use strict";

const shareClick=document.getElementsByClassName('product__share-word');

Array.from(shareClick).forEach(function (element) {
    element.addEventListener('click', function () {
        element.parentNode.classList.add('press');
    });
});