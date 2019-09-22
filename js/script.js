'use strict';

import galleryItems from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

galleryItems.map(item => {
  const createLi = document.createElement('li');
  createLi.classList.add('gallery__item');
  createLi.insertAdjacentHTML(
    'afterbegin',
    ` <a
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
  </a>`,
  );
  galleryList.appendChild(createLi);
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox___image');
const lightboxContent = document.querySelector('.lightbox__content');
const linkOpenLightbox = document.querySelector('.gallery');
const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const openLightbox = function(event) {
  const galleryLink = Array.from(document.querySelectorAll('.gallery__link'));
  galleryLink.map(function(item) {
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

linkOpenLightbox.addEventListener('click', openLightbox);
closeLightboxBtn.addEventListener('click', closeLightbox);
lightboxContent.addEventListener('click', function(event) {
  if (event.target === this) closeLightbox();
});
window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) closeLightbox();
});
