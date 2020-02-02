"use strict";

const shareClick=document.getElementsByClassName('product__share-word');
const closeClick=document.getElementsByClassName('close');

Array.from(shareClick).forEach(function (element) {
    element.addEventListener('click', function () {
        element.parentNode.classList.add('press');
    });
});
