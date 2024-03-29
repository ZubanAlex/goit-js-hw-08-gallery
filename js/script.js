'use strict';

import galleryItems from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

const createListItems = galleryItems.reduce((acc, item) => {
  acc += ` <li class='gallery__item'> <a
     class="gallery__link"
     href="${item.original}"
     >
     <img
     class="gallery__image"
     src="${item.preview}"
     data-source="${item.original}"
     alt="${item.description}"
     />
  
     <span class="gallery__icon">
     <i class="material-icons">zoom_out_map</i>
     </span>
     </a></li>`;
  return acc;
}, '');

galleryList.innerHTML = createListItems;

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox___image');
const lightboxContent = document.querySelector('.lightbox__content');
const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const openLightbox = function(event) {
  const galleryLink = Array.from(document.querySelectorAll('.gallery__link'));
  galleryLink.forEach(item => {
    if (
      event.target.getAttribute('data-source') === item.getAttribute('href')
    ) {
      item.removeAttribute('href');
    }
  });

  lightbox.classList.add('is-open');
  lightboxImage.setAttribute('src', event.target.getAttribute('data-source'));
  lightboxImage.setAttribute('alt', event.target.getAttribute('alt'));
};

const closeLightbox = function(event) {
  lightbox.classList.remove('is-open');
  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');
};

const closeLightboxWhitUsingOverlay = function(event) {
  if (event.target === this) closeLightbox();
};

const closeLightboxWhitUsingEsc = function(event) {
  if (event.keyCode === 27) closeLightbox();
};

galleryList.addEventListener('click', openLightbox);
closeLightboxBtn.addEventListener('click', closeLightbox);
lightboxContent.addEventListener('click', closeLightboxWhitUsingOverlay);
window.addEventListener('keydown', closeLightboxWhitUsingEsc);
